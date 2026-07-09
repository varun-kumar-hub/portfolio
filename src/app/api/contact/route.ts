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

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
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
        <div style="background-color: #07070a; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <div style="max-width: 560px; margin: 0 auto; background-color: #0e0e17; border: 1px solid #1f1f2e; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.4);">
            
            <!-- Header Banner -->
            <div style="background: linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%); padding: 30px 24px; text-align: center; border-bottom: 1px solid #1f1f2e;">
              <span style="display: inline-block; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2em; background-color: rgba(255,255,255,0.15); color: #93c5fd; padding: 6px 12px; border-radius: 99px; margin-bottom: 12px; border: 1px solid rgba(255,255,255,0.1);">
                Portfolio Inquiry
              </span>
              <h2 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">
                New Message Received
              </h2>
            </div>
            
            <!-- Body Content -->
            <div style="padding: 32px 24px; color: #e2e8f0;">
              
              <!-- Sender Info Cards -->
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="width: 50%; padding-right: 8px;">
                    <div style="background-color: #161622; border: 1px solid #27273a; padding: 14px; border-radius: 10px;">
                      <p style="margin: 0 0 4px 0; font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Sender Name</p>
                      <p style="margin: 0; font-size: 14px; font-weight: 600; color: #f8fafc;">${name}</p>
                    </div>
                  </td>
                  <td style="width: 50%; padding-left: 8px;">
                    <div style="background-color: #161622; border: 1px solid #27273a; padding: 14px; border-radius: 10px;">
                      <p style="margin: 0 0 4px 0; font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Email Address</p>
                      <p style="margin: 0; font-size: 14px; font-weight: 600; color: #3b82f6; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                        <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
              
              <!-- Message Text -->
              <div style="margin-bottom: 32px;">
                <p style="margin: 0 0 8px 0; font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Message Body</p>
                <div style="background-color: #161622; border: 1px solid #27273a; border-left: 4px solid #3b82f6; padding: 18px; border-radius: 4px 10px 10px 4px; font-size: 14px; line-height: 1.6; color: #cbd5e1; white-space: pre-wrap; min-height: 80px;">${message}</div>
              </div>
              
              <!-- Action Button -->
              <div style="text-align: center;">
                <a href="mailto:${email}" style="display: inline-block; background-color: #2563eb; color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 99px; transition: background-color 0.2s; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);">
                  Reply Direct to Email
                </a>
              </div>

            </div>
            
            <!-- Footer -->
            <div style="background-color: #0b0b12; border-top: 1px solid #1f1f2e; padding: 16px 24px; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #475569; letter-spacing: 0.02em;">
                Automated notification from your portfolio contact form.
              </p>
            </div>
            
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
