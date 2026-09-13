import { Resend } from "resend";
import { ContactFormData } from "@/types/contact";

export interface SendEmailPayload {
  to: string;
  from: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}

export interface EmailServiceResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface EmailService {
  sendContactNotification(data: ContactFormData): Promise<EmailServiceResult>;
}

/**
 * Escapes special characters to prevent HTML injection/XSS in email clients.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Resend Email Service implementation with production safety guards.
 * Reads configuration strictly from server-side environment variables.
 */
export class ResendEmailService implements EmailService {
  async sendContactNotification(data: ContactFormData): Promise<EmailServiceResult> {
    try {
      const isProduction = process.env.NODE_ENV === "production";
      const apiKey = process.env.RESEND_API_KEY;
      const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL;
      const fromEmail = process.env.CONTACT_FROM_EMAIL;

      const hasApiKey = Boolean(apiKey && apiKey.trim().length > 0);
      const hasNotificationEmail = Boolean(
        notificationEmail && notificationEmail.trim().length > 0
      );
      const hasFromEmail = Boolean(fromEmail && fromEmail.trim().length > 0);

      // 1. Production Mode Safety: Fail safely if any required configuration is missing
      if (isProduction) {
        if (!hasApiKey) {
          console.error(
            "[EmailService:ProductionError] Failed to transmit message: RESEND_API_KEY is not configured."
          );
          return {
            success: false,
            error: "Email delivery service is unconfigured in production (missing API key).",
          };
        }
        if (!hasNotificationEmail) {
          console.error(
            "[EmailService:ProductionError] Failed to transmit message: CONTACT_NOTIFICATION_EMAIL is not configured."
          );
          return {
            success: false,
            error: "Email delivery service is unconfigured in production (missing recipient).",
          };
        }
        if (!hasFromEmail) {
          console.error(
            "[EmailService:ProductionError] Failed to transmit message: CONTACT_FROM_EMAIL is not configured."
          );
          return {
            success: false,
            error: "Email delivery service is unconfigured in production (missing sender).",
          };
        }
      }

      // 2. Transmit via Resend if credentials are fully configured
      if (hasApiKey && hasNotificationEmail && hasFromEmail) {
        const resend = new Resend(apiKey);
        const subject = data.subject?.trim() || "General Inquiry";
        const emailSubject = `[Portfolio Inquiry] ${subject} - from ${data.name}`;

        const textBody = [
          "New Contact Form Submission",
          "--------------------------------------------------",
          `Name:    ${data.name}`,
          `Email:   ${data.email}`,
          `Subject: ${subject}`,
          "",
          "Message:",
          data.message,
          "--------------------------------------------------",
          `Reply directly to this email to contact ${data.name} at ${data.email}.`,
        ].join("\n");

        const htmlBody = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(emailSubject)}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f17; color: #f1f5f9; padding: 24px; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 24px;">
    <div style="border-bottom: 1px solid #1f2937; padding-bottom: 16px; margin-bottom: 20px;">
      <h2 style="color: #6366f1; margin: 0 0 4px 0; font-size: 20px; font-weight: 700;">New Portfolio Contact Message</h2>
      <p style="color: #94a3b8; margin: 0; font-size: 13px;">Received via Jadagam Likhith's Portfolio</p>
    </div>

    <div style="margin-bottom: 16px;">
      <span style="color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px; font-weight: 600;">Sender Information</span>
      <p style="margin: 0; font-size: 15px; color: #f1f5f9;"><strong>${escapeHtml(data.name)}</strong> (&lt;<a href="mailto:${escapeHtml(data.email)}" style="color: #38bdf8; text-decoration: none;">${escapeHtml(data.email)}</a>&gt;)</p>
    </div>

    <div style="margin-bottom: 16px;">
      <span style="color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px; font-weight: 600;">Subject</span>
      <p style="margin: 0; font-size: 15px; color: #f1f5f9;">${escapeHtml(subject)}</p>
    </div>

    <div style="margin-bottom: 24px;">
      <span style="color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px; font-weight: 600;">Message</span>
      <div style="background-color: #0b0f17; border: 1px solid #1f2937; border-radius: 8px; padding: 16px; color: #e2e8f0; font-size: 14px; white-space: pre-wrap; word-break: break-word;">${escapeHtml(data.message)}</div>
    </div>

    <div style="border-top: 1px solid #1f2937; padding-top: 16px; font-size: 12px; color: #64748b;">
      Reply directly to this email to respond to <strong>${escapeHtml(data.name)}</strong> (${escapeHtml(data.email)}).
    </div>
  </div>
</body>
</html>`;

        const response = await resend.emails.send({
          from: fromEmail!,
          to: notificationEmail!,
          replyTo: data.email,
          subject: emailSubject,
          text: textBody,
          html: htmlBody,
        });

        if (response.error) {
          console.error(
            "[EmailService:ResendError] Failed to deliver email:",
            response.error.message
          );
          return {
            success: false,
            error: response.error.message || "Failed to deliver email through Resend.",
          };
        }

        if (response.data?.id) {
          console.log(
            `[EmailService:Sent] Delivered contact message via Resend (ID: ${response.data.id})`
          );
          return {
            success: true,
            messageId: response.data.id,
          };
        }

        return {
          success: false,
          error: "Resend did not return a message confirmation ID.",
        };
      }

      // 3. In LOCAL DEVELOPMENT / TEST without complete Resend configuration:
      // Safe fallback logging for offline development and testing
      const safeSubject = data.subject || "General Inquiry";
      console.log(
        `[EmailService:DevFallback] From: ${data.name} <${data.email}> | Subject: "${safeSubject}"`
      );

      return {
        success: true,
        messageId: `dev_fallback_${Date.now()}`,
      };
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal email service error";
      console.error("[EmailService:Exception]", errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }
}

export const emailService: EmailService = new ResendEmailService();

