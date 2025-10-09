import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { name, number, email, message } = await req.json();
    console.log("📨 Sending email with Resend...");

    const data = await resend.emails.send({
      from: `Studio Solace <${process.env.FROM_EMAIL}>`,
      to: process.env.TO_EMAIL!,
      subject: `📩 New Contact from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>New Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${number}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="border-left: 4px solid #ccc; padding-left: 10px;">
            ${message}
          </blockquote>
        </div>
      `,
    });

    console.log("✅ Resend response:", data);
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error("❌ Email send error:", error);

    let message = "Unknown error";
    if (error instanceof Error) message = error.message;

    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
