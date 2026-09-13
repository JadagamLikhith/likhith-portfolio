import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema, ContactApiResponse } from "@/types/contact";
import { rateLimiter } from "@/lib/rate-limit";
import { emailService } from "@/lib/email";
import { getClientIp } from "@/lib/client-ip";

export async function POST(req: NextRequest): Promise<NextResponse<ContactApiResponse>> {
  try {
    // 1. Resolve Client Identity & Evaluate Rate Limit
    const clientIp = getClientIp(req);
    const rateLimitResult = await rateLimiter.check(clientIp);

    if (!rateLimitResult.success) {
      const retrySeconds = Math.max(
        1,
        Math.ceil((rateLimitResult.reset - Date.now()) / 1000)
      );
      return NextResponse.json(
        {
          success: false,
          error: "Unable to send your message right now. Please try again.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": retrySeconds.toString(),
          },
        }
      );
    }

    // 2. Safe Payload Parsing
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Please check the form fields.",
        },
        { status: 400 }
      );
    }

    // 3. Server-Side Zod Validation
    const parseResult = contactFormSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Please check the form fields.",
          details: parseResult.error.issues,
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // 4. Honeypot Anti-Spam Check (Silent Discard)
    if (data.honeypot && data.honeypot.trim().length > 0) {
      return NextResponse.json(
        {
          success: true,
          message: "Message sent successfully.",
        },
        { status: 200 }
      );
    }

    // 5. Dispatch Email Notification
    const emailResult = await emailService.sendContactNotification(data);
    if (!emailResult.success) {
      console.error("[ContactAPI] Email delivery failure:", emailResult.error);
      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to send your message right now. Please try again or reach out directly by email.",
        },
        { status: 503 }
      );
    }

    // 6. Success Response
    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully.",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Unexpected error";
    console.error("[ContactAPI] Uncaught exception:", errorMsg);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to send your message right now. Please try again.",
      },
      { status: 500 }
    );
  }
}
