import { NextRequest, NextResponse } from 'next/server';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { buildHtmlTemplate, buildTextTemplate } from '@/lib/emailTemplate';

// Rate limiting - simple in-memory store (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeString(str: string, maxLength: number = 10000): string {
  return str.slice(0, maxLength).trim();
}

interface EmailRequestBody {
  formId: string;
  sourceUrl?: string;
  recipient?: string;
  fields: Record<string, string>;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = getClientIp(request);
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { ok: false, error: 'Trop de requêtes. Veuillez réessayer plus tard.' },
        { status: 429 }
      );
    }

    // Parse and validate request
    let body: EmailRequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: 'Invalid JSON' },
        { status: 400 }
      );
    }

    const { formId, fields, sourceUrl } = body;

    // Validate required fields
    if (!formId || typeof formId !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'formId is required' },
        { status: 400 }
      );
    }

    if (!fields || typeof fields !== 'object') {
      return NextResponse.json(
        { ok: false, error: 'fields object is required' },
        { status: 400 }
      );
    }

    // Validate email if present
    if (fields.email && !validateEmail(fields.email)) {
      return NextResponse.json(
        { ok: false, error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Sanitize all field values
    const sanitizedFields: Record<string, string> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (typeof value === 'string') {
        sanitizedFields[key] = sanitizeString(value);
      }
    }

    // Check environment variables
    const requiredEnvVars = [
      'AWS_REGION',
      'AWS_ACCESS_KEY_ID',
      'AWS_SECRET_ACCESS_KEY',
      'SES_FROM_EMAIL',
      'SES_TO_EMAIL',
    ];

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        console.error(`Missing environment variable: ${envVar}`);
        return NextResponse.json(
          { ok: false, error: 'Configuration serveur manquante' },
          { status: 500 }
        );
      }
    }

    // Initialize SES client
    const sesClient = new SESClient({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    // Build email templates
    const templateData = {
      formId,
      fields: sanitizedFields,
      sourceUrl,
    };

    const htmlBody = buildHtmlTemplate(templateData);
    const textBody = buildTextTemplate(templateData);

    // Build subject
    const firstName = sanitizedFields.firstName || sanitizedFields.prenom || '';
    const subject = `[Contact Cigale Conseil] Nouveau message${firstName ? ` de ${firstName}` : ''}`;

    // Prepare email parameters
    const destination = process.env.SES_TO_EMAIL!;
    const replyTo = sanitizedFields.email || undefined;

    const params = {
      Source: process.env.SES_FROM_EMAIL!,
      Destination: {
        ToAddresses: [destination],
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: htmlBody,
            Charset: 'UTF-8',
          },
          Text: {
            Data: textBody,
            Charset: 'UTF-8',
          },
        },
      },
      ...(replyTo && {
        ReplyToAddresses: [replyTo],
      }),
    };

    // Send email with retry logic
    let lastError: Error | null = null;
    const maxRetries = 3;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const command = new SendEmailCommand(params);
        const result = await sesClient.send(command);

        // Success
        console.log('Email sent successfully', {
          messageId: result.MessageId,
          formId,
          recipient: destination,
          clientIp,
        });

        return NextResponse.json({
          ok: true,
          message: 'Email envoyé avec succès',
          meta: {
            messageId: result.MessageId,
          },
        });
      } catch (error) {
        lastError = error as Error;
        console.error(`Email send attempt ${attempt + 1} failed`, {
          error: lastError.message,
          formId,
          attempt: attempt + 1,
        });

        // If it's a client error (4xx), don't retry
        if (lastError.name === 'MessageRejected' || lastError.name === 'InvalidParameterValue') {
          break;
        }

        // Wait before retry (exponential backoff)
        if (attempt < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

    // All retries failed
    console.error('Email sending failed after all retries', {
      error: lastError?.message,
      formId,
      clientIp,
    });

    return NextResponse.json(
      {
        ok: false,
        error: 'Échec de l\'envoi de l\'email. Veuillez réessayer plus tard.',
      },
      { status: 500 }
    );
  } catch (error) {
    console.error('Unexpected error in send-email route', error);
    return NextResponse.json(
      { ok: false, error: 'Erreur serveur inattendue' },
      { status: 500 }
    );
  }
}
