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

    // Ensure env vars are set
    const gmailUser = process.env.GMAIL_USER?.trim();
    const gmailPass = process.env.GMAIL_PASS?.trim();

    if (!gmailUser || !gmailPass) {
      console.error("Missing GMAIL_USER or GMAIL_PASS environment variables");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact the site owner." },
        { status: 500 }
      );
    }

    // Create transporter using explicit Gmail SMTP settings
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        // This must be a Gmail 16-character App Password, NOT your regular password
        pass: gmailPass,
      },
    });

    // Email options
    const mailOptions = {
      from: gmailUser, // Sender address (must be your Gmail address)
      to: "cvarunkumar455@gmail.com", // Destination email
      replyTo: email, // Reply directly to the sender's email
      subject: `💼 Portfolio Contact: Message from ${name}`,
      text: `You have received a new contact form message from your portfolio.\n\n` +
            `Sender Name: ${name}\n` +
            `Sender Email: ${email}\n\n` +
            `Message:\n${message}`,
      html: `
        <div style="background-color: #f8fafc; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #0f172a;">
          <div style="max-width: 540px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.035);">
            
            <!-- Top Decorative line -->
            <div style="height: 4px; background: linear-gradient(90deg, #3b82f6 0%, #4f46e5 100%);"></div>
            
            <!-- Content wrapper -->
            <div style="padding: 36px 32px;">
              
              <!-- Logo / Header -->
              <div style="margin-bottom: 28px;">
                <span style="display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #4f46e5; background-color: #eeebff; padding: 4px 10px; border-radius: 6px;">
                  Portfolio Inquiry
                </span>
                <h1 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 16px 0 0 0; letter-spacing: -0.01em;">
                  New Message Received
                </h1>
              </div>
              
              <!-- Sender Info Cards -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 28px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding-bottom: 12px;">
                      <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; display: block; margin-bottom: 2px;">Sender Name</span>
                      <span style="font-size: 14px; font-weight: 600; color: #0f172a;">${name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="border-top: 1px solid #e2e8f0; padding-top: 12px;">
                      <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; display: block; margin-bottom: 2px;">Email Address</span>
                      <span style="font-size: 14px; font-weight: 600;">
                        <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; word-break: break-all;">${email}</a>
                      </span>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- Message Text -->
              <div style="margin-bottom: 32px;">
                <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; display: block; margin-bottom: 8px;">Message Body</span>
                <div style="font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; background-color: #ffffff; border: 1px solid #e2e8f0; border-left: 3px solid #4f46e5; padding: 16px 20px; border-radius: 8px; min-height: 80px;">${message}</div>
              </div>
              
              <!-- Action Button -->
              <div style="text-align: center;">
                <a href="mailto:${email}" style="display: inline-block; background-color: #4f46e5; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15); transition: background-color 0.2s;">
                  Reply Direct to Email
                </a>
              </div>
        
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 32px; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #64748b;">
                Automated notification sent from your portfolio website contact form.
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
