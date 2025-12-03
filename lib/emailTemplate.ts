// Email template builder utilities

const EMOJI_MAP: Record<string, string> = {
  email: '✉️',
  phone: '📞',
  telephone: '📞',
  phonenumber: '📞',
  message: '💬',
  note: '💬',
  comment: '💬',
  firstname: '👤',
  lastname: '👤',
  name: '👤',
  fullname: '👤',
  prenom: '👤',
  nom: '👤',
  company: '🏢',
  entreprise: '🏢',
  societe: '🏢',
  subject: '🏷️',
  sujet: '🏷️',
  service: '🔧',
  prestation: '🔧',
  date: '📅',
  preferreddate: '📅',
  rdv: '📅',
  budget: '💶',
  price: '💶',
  newsletter: '✅',
  attachment: '📎',
  structure: '🏢',
  typedestructure: '🏢',
};

const LABEL_MAP: Record<string, string> = {
  firstname: 'Prénom',
  lastname: 'Nom',
  email: 'Email',
  phone: 'Téléphone',
  message: 'Message',
  company: 'Entreprise',
  subject: 'Sujet',
  prenom: 'Prénom',
  nom: 'Nom',
  telephone: 'Téléphone',
  entreprise: 'Entreprise',
  typedestructure: 'Type de structure',
};

function emojiForField(key: string): string {
  const normalized = key.toLowerCase().replace(/[_\s-]/g, '');
  return EMOJI_MAP[normalized] || '🔹';
}

function labelForField(key: string): string {
  const normalized = key.toLowerCase().replace(/[_\s-]/g, '');
  return LABEL_MAP[normalized] || humanize(key);
}

function humanize(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, char => map[char]);
}

interface EmailTemplateData {
  formId: string;
  fields: Record<string, string>;
  sourceUrl?: string;
  timestamp?: string;
}

export function buildHtmlTemplate(data: EmailTemplateData): string {
  const { formId, fields, sourceUrl } = data;
  const timestamp = new Date().toISOString();

  const fieldRows = Object.entries(fields)
    .map(([key, value]) => {
      const emoji = emojiForField(key);
      const label = labelForField(key);
      const escapedValue = escapeHtml(value).replace(/\n/g, '<br/>');
      
      return `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; width: 200px;">
            ${emoji} ${escapeHtml(label)}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">
            ${escapedValue}
          </td>
        </tr>
      `;
    })
    .join('');

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau message - ${escapeHtml(formId)}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #4f7d7d 0%, #6b8e8e 100%); padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                Cigale Conseil
              </h1>
              <p style="margin: 8px 0 0 0; color: #e8f5f0; font-size: 14px;">
                Nouveau message — ${escapeHtml(formId)}
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 24px 0; color: #111827; font-size: 20px; font-weight: 600;">
                📬 Détails du message
              </h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
                ${fieldRows}
              </table>
            </td>
          </tr>
          
          <!-- Meta -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; font-size: 13px; color: #6b7280;">
                <p style="margin: 0 0 8px 0;"><strong>📄 Formulaire :</strong> ${escapeHtml(formId)}</p>
                ${sourceUrl ? `<p style="margin: 0 0 8px 0;"><strong>🌐 Page d'origine :</strong> ${escapeHtml(sourceUrl)}</p>` : ''}
                <p style="margin: 0;"><strong>🕒 Horodatage :</strong> ${escapeHtml(timestamp)}</p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                © ${new Date().getFullYear()} Cigale Conseil - Expert-comptable
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function buildTextTemplate(data: EmailTemplateData): string {
  const { formId, fields, sourceUrl } = data;
  const timestamp = new Date().toISOString();

  const fieldLines = Object.entries(fields)
    .map(([key, value]) => {
      const emoji = emojiForField(key);
      const label = labelForField(key);
      return `${emoji} ${label}: ${value}`;
    })
    .join('\n');

  return `
═══════════════════════════════════════
CIGALE CONSEIL - Nouveau message
═══════════════════════════════════════

Formulaire: ${formId}
${sourceUrl ? `Page d'origine: ${sourceUrl}` : ''}
Horodatage: ${timestamp}

───────────────────────────────────────
DÉTAILS DU MESSAGE
───────────────────────────────────────

${fieldLines}

───────────────────────────────────────
© ${new Date().getFullYear()} Cigale Conseil
Expert-comptable
═══════════════════════════════════════
  `.trim();
}
