import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Please provide a valid email address")
    .max(255, "Email is too long"),
  subject: z
    .string()
    .trim()
    .max(150, "Subject must be less than 150 characters")
    .optional()
    .default("General Inquiry"),
  message: z
    .string({ required_error: "Message is required" })
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
  honeypot: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface ContactApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  details?: z.ZodIssue[];
}
