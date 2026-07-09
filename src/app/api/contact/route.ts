import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Simple validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // Create transporter using Gmail SMTP service
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        // This must be a Gmail 16-character App Password, NOT your regular password
        pass: process.env.GMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_USER, // Sender address (must be your Gmail address)
      to: "cvarunkumar455@gmail.com", // Destination email
      replyTo: email, // Reply directly to the sender's email
      subject: `💼 Portfolio Contact: Message from ${name}`,
      text: `You have received a new contact form message from your portfolio.\n\n` +
            `Sender Name: ${name}\n` +
            `Sender Email: ${email}\n\n` +
            `Message:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #2563eb; padding: 20px; color: white; text-align: center;">
            <h2 style="margin: 0; font-size: 20px;">Portfolio Contact Message</h2>
          </div>
          <div style="padding: 24px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <div style="background-color: #f9fafb; padding: 16px; border-left: 4px solid #2563eb; border-radius: 4px; white-space: pre-wrap;">${message}</div>
          </div>
          <div style="background-color: #f3f4f6; padding: 12px; text-align: center; font-size: 11px; color: #666;">
            Sent from your portfolio contact form.
          </div>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Nodemailer contact error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to send message." },
      { status: 500 }
    );
  }
}
