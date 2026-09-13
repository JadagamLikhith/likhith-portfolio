import { describe, it, expect } from "vitest";
import { contactFormSchema } from "@/types/contact";

describe("Contact Form Zod Schema Validation", () => {
  it("passes with valid contact data", () => {
    const validData = {
      name: "Alex Rivera",
      email: "alex.rivera@example.com",
      subject: "Project Collaboration Inquiry",
      message: "Hi Likhith, we'd like to discuss a potential full stack engineering opportunity.",
    };

    const result = contactFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Alex Rivera");
      expect(result.data.email).toBe("alex.rivera@example.com");
    }
  });

  it("trims whitespace from incoming fields", () => {
    const dataWithWhitespace = {
      name: "   Alex Rivera   ",
      email: "  alex.rivera@example.com  ",
      subject: "   Collaboration   ",
      message: "   This is a message with leading and trailing whitespace.   ",
    };

    const result = contactFormSchema.safeParse(dataWithWhitespace);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Alex Rivera");
      expect(result.data.email).toBe("alex.rivera@example.com");
      expect(result.data.subject).toBe("Collaboration");
      expect(result.data.message).toBe(
        "This is a message with leading and trailing whitespace."
      );
    }
  });

  it("fails when name is missing or too short", () => {
    const missingName = {
      email: "alex@example.com",
      message: "This is a valid length message for testing.",
    };
    const emptyName = {
      name: " ",
      email: "alex@example.com",
      message: "This is a valid length message for testing.",
    };

    expect(contactFormSchema.safeParse(missingName).success).toBe(false);
    expect(contactFormSchema.safeParse(emptyName).success).toBe(false);
  });

  it("fails when email is missing or malformed", () => {
    const missingEmail = {
      name: "Alex Rivera",
      message: "This is a valid length message for testing.",
    };
    const malformedEmail = {
      name: "Alex Rivera",
      email: "not-a-valid-email",
      message: "This is a valid length message for testing.",
    };

    expect(contactFormSchema.safeParse(missingEmail).success).toBe(false);
    expect(contactFormSchema.safeParse(malformedEmail).success).toBe(false);
  });

  it("fails when message is missing or too short", () => {
    const missingMessage = {
      name: "Alex Rivera",
      email: "alex@example.com",
    };
    const shortMessage = {
      name: "Alex Rivera",
      email: "alex@example.com",
      message: "Too short",
    };

    expect(contactFormSchema.safeParse(missingMessage).success).toBe(false);
    expect(contactFormSchema.safeParse(shortMessage).success).toBe(false);
  });

  it("fails on excessive input lengths", () => {
    const oversizedName = {
      name: "A".repeat(101),
      email: "alex@example.com",
      message: "Valid message content here.",
    };
    const oversizedEmail = {
      name: "Alex Rivera",
      email: `${"a".repeat(250)}@example.com`,
      message: "Valid message content here.",
    };
    const oversizedSubject = {
      name: "Alex Rivera",
      email: "alex@example.com",
      subject: "S".repeat(151),
      message: "Valid message content here.",
    };
    const oversizedMessage = {
      name: "Alex Rivera",
      email: "alex@example.com",
      message: "M".repeat(2001),
    };

    expect(contactFormSchema.safeParse(oversizedName).success).toBe(false);
    expect(contactFormSchema.safeParse(oversizedEmail).success).toBe(false);
    expect(contactFormSchema.safeParse(oversizedSubject).success).toBe(false);
    expect(contactFormSchema.safeParse(oversizedMessage).success).toBe(false);
  });

  it("handles optional honeypot field safely", () => {
    const withHoneypot = {
      name: "Alex Rivera",
      email: "alex@example.com",
      message: "Valid message content here.",
      honeypot: "spam-bot-value",
    };

    const result = contactFormSchema.safeParse(withHoneypot);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.honeypot).toBe("spam-bot-value");
    }
  });
});
