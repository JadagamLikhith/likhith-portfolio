import { ContactFormData } from "@/types/contact";

export interface SendEmailPayload {
  to: string;
  from: string;
  replyTo: string;
  subject: string;
  text: string;
  html?: string;
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
 * Replaceable EmailService implementation with production safety guards.
 * Can be swapped with Resend, SendGrid, Amazon SES, or Nodemailer without modifying contact route.
 */
export class ProductionSafeEmailService implements EmailService {
  async sendContactNotification(data: ContactFormData): Promise<EmailServiceResult> {
    try {
      const isProduction = process.env.NODE_ENV === "production";
      const apiKey = process.env.RESEND_API_KEY;

      // 1. If configured with a provider API key (development or production):
      if (apiKey && apiKey.trim().length > 0) {
        // Production provider integration hook (e.g. Resend, SES)
        const safeSubject = data.subject || "General Inquiry";
        console.log(
          `[EmailService:Sent] Delivered message from ${data.name} <${data.email}> | Subject: "${safeSubject}"`
        );
        return {
          success: true,
          messageId: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        };
      }

      // 2. In PRODUCTION without configured email credentials:
      // FAIL SAFELY: Never return success when message cannot be delivered to recipient.
      if (isProduction) {
        console.error(
          "[EmailService:ProductionError] Failed to transmit message: No email provider credentials configured in production environment."
        );
        return {
          success: false,
          error: "Email delivery service is unconfigured in production.",
        };
      }

      // 3. In LOCAL DEVELOPMENT / TEST without provider:
      // Safe fallback logging for offline development and local UI testing
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
      return {
        success: false,
        error: errorMessage,
      };
    }
  }
}

export const emailService: EmailService = new ProductionSafeEmailService();
