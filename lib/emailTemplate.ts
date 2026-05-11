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
  const timestamp = new Date().toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const fieldRows = Object.entries(fields)
    .map(([key, value]) => {
      const emoji = emojiForField(key);
      const label = labelForField(key);
      const escapedValue = escapeHtml(value).replace(/\n/g, '<br/>');
      
      return `
        <tr>
          <td style="padding: 16px 20px; border-bottom: 1px solid #e5e7eb;" class="content-cell">
            <div style="color: #6b7280; font-size: 13px; margin-bottom: 4px;">
              ${emoji} ${escapeHtml(label)}
            </div>
            <div style="color: #1f2937; font-size: 15px; line-height: 1.5;">
              ${escapedValue}
            </div>
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
  <title>Nouveau message</title>
  <style>
    @media only screen and (max-width: 480px) {
      .container { width: 100% !important; padding: 20px 10px !important; }
      .header, .footer { padding: 24px 20px !important; }
      .content-cell { padding: 12px 16px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6; padding: 40px 20px;" class="container">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #4f7d7d 0%, #6b8e8e 100%); padding: 32px 32px 24px 32px;" class="header">
              <h1 style="margin: 0 0 8px 0; color: #ffffff; font-size: 22px; font-weight: 600;">
                📧 Nouveau message depuis Cigale Conseil
              </h1>
              <p style="margin: 0; color: #e8f5f0; font-size: 14px;">
                ${escapeHtml(fields.firstName || 'Un visiteur')} ${escapeHtml(fields.lastName || '')} vous a contacté
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                ${fieldRows}
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px 32px; border-top: 1px solid #e5e7eb;" class="footer">
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #6b7280;">
                Ce message a été envoyé via le formulaire de contact du site ${sourceUrl ? escapeHtml(sourceUrl.split('/')[2] || 'Cigale Conseil') : 'Cigale Conseil'}
              </p>
              <p style="margin: 0; font-size: 13px; color: #9ca3af;">
                Date : ${escapeHtml(timestamp)}
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
  const { fields, sourceUrl } = data;
  const timestamp = new Date().toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const fullName = [fields.firstName, fields.lastName].filter(Boolean).join(' ') || 'Nom complet';

  const fieldLines = Object.entries(fields)
    .map(([key, value]) => {
      const emoji = emojiForField(key);
      const label = labelForField(key);
      return `${emoji} ${label}\n${value}\n`;
    })
    .join('\n');

  return `
📧 Nouveau message depuis Cigale Conseil

${fullName} vous a contacté

${fieldLines}

─────────────────────────────────
Ce message a été envoyé via le formulaire de contact du site ${sourceUrl ? sourceUrl.split('/')[2] || 'Cigale Conseil' : 'Cigale Conseil'}

Date : ${timestamp}
  `.trim();
}
