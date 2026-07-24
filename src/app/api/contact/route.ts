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

    // Create transporter using service: "gmail"
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    console.log("Nodemailer: Processing message submission...");
    console.log(`Sender: ${name} <${email}>`);

    // 1. Notification Email sent to Site Owner
    const ownerMailOptions = {
      from: `"${name} (Portfolio Inquiry)" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `💼 Portfolio Contact: Message from ${name}`,
      text: `You received a new portfolio message.\n\n` +
            `Sender Name: ${name}\n` +
            `Sender Email: ${email}\n\n` +
            `Message:\n${message}`,
      html: `
        <div style="background-color: #f8fafc; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a;">
          <div style="max-width: 540px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.035);">
            <div style="height: 4px; background: linear-gradient(90deg, #3b82f6 0%, #4f46e5 100%);"></div>
            <div style="padding: 36px 32px;">
              <div style="margin-bottom: 28px;">
                <span style="display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #4f46e5; background-color: #eeebff; padding: 4px 10px; border-radius: 6px;">
                  Portfolio Inquiry
                </span>
                <h1 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 16px 0 0 0;">
                  New Message Received
                </h1>
              </div>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 28px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding-bottom: 12px;">
                      <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748b; display: block;">Sender Name</span>
                      <span style="font-size: 14px; font-weight: 600; color: #0f172a;">${name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="border-top: 1px solid #e2e8f0; padding-top: 12px;">
                      <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748b; display: block;">Email Address</span>
                      <span style="font-size: 14px; font-weight: 600;">
                        <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                      </span>
                    </td>
                  </tr>
                </table>
              </div>
              <div style="margin-bottom: 32px;">
                <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 8px;">Message Body</span>
                <div style="font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; background-color: #ffffff; border: 1px solid #e2e8f0; border-left: 3px solid #4f46e5; padding: 16px 20px; border-radius: 8px;">${message}</div>
              </div>
              <div style="text-align: center;">
                <a href="mailto:${email}" style="display: inline-block; background-color: #4f46e5; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px;">
                  Reply Direct to ${email}
                </a>
              </div>
            </div>
            <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 32px; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #64748b;">
                Automated notification sent from your portfolio website contact form.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // 2. Automated Confirmation Email sent to the Visitor (the entered email)
    const visitorMailOptions = {
      from: `"Varun Kumar" <${gmailUser}>`,
      to: email,
      replyTo: gmailUser,
      subject: `Thank you for reaching out, ${name}!`,
      text: `Hi ${name},\n\nThank you for reaching out via my portfolio! I have received your message and will get back to you shortly.\n\nYour message:\n"${message}"\n\nBest regards,\nVarun Kumar`,
      html: `
        <div style="background-color: #f8fafc; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a;">
          <div style="max-width: 540px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.035);">
            <div style="height: 4px; background: linear-gradient(90deg, #10b981 0%, #3b82f6 100%);"></div>
            <div style="padding: 36px 32px;">
              <div style="margin-bottom: 24px;">
                <h1 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0 0 8px 0;">
                  Message Received!
                </h1>
                <p style="font-size: 14px; color: #475569; margin: 0; line-height: 1.5;">
                  Hi <strong>${name}</strong>, thank you for reaching out through my portfolio. I have received your message and will get back to you as soon as possible.
                </p>
              </div>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 28px;">
                <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 6px;">Copy of Your Message</span>
                <p style="font-size: 13px; line-height: 1.6; color: #334155; margin: 0; white-space: pre-wrap; font-style: italic;">"${message}"</p>
              </div>
              <p style="font-size: 14px; color: #0f172a; font-weight: 600; margin: 0;">
                Best regards,<br/>Varun Kumar
              </p>
            </div>
            <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 32px; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #64748b;">
                This is an automated confirmation sent to ${email}.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Send both emails simultaneously
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(visitorMailOptions),
    ]);

    console.log(`Nodemailer: Successfully sent notification to owner and confirmation to ${email}`);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Nodemailer contact error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to send message." },
      { status: 500 }
    );
  }
}
