import { Resend } from "resend";
import {
  resetPasswordEmailTemplate,
  resetSuccessEmailTemplate,
  verificationEmailTemplate,
  welcomeEmailTemplate,
} from "./template";

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined");
}

export async function sendVerificationEmail(
  recipient: string,
  verificationToken: string
): Promise<unknown> {
  try {
    const { data, error }: { data: unknown; error: Error | null } =
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: recipient,
        subject: "Verify your email",
        html: verificationEmailTemplate.replace(
          "{{VERIFICATION_CODE}}",
          verificationToken
        ),
      });

    if (error) {
      console.error("Email send error:", error);
      throw new Error("Failed to send verification email");
    }

    return data;
  } catch (err) {
    console.error("Unexpected error while sending email:", err);
    throw err;
  }
}

export async function sendWelcomeEmail(
  recipient: string,
  name: string
): Promise<unknown> {
  try {
    const htmlContent = welcomeEmailTemplate
      .replace("{{NAME}}", name)
      .replace("{{DASHBOARD_URL}}", "https://yourdomain.com/dashboard");

    const { data, error }: { data: unknown; error: Error | null } =
      await resend.emails.send({
        from: "no-reply@yourdomain.com",
        to: recipient,
        subject: "Welcome to Our Platform 🎉",
        html: htmlContent,
      });

    if (error) {
      console.error("Email send error:", error);
      throw new Error("Failed to send welcome email");
    }

    return data;
  } catch (err) {
    console.error("Unexpected error while sending welcome email:", err);
    throw err;
  }
}

export async function sendPasswordResetEmail(
  recipient: string,
  resetUrl: string
): Promise<unknown> {
  try {
    const htmlContent = resetPasswordEmailTemplate.replace(
      "{{RESET_URL}}",
      resetUrl
    );

    const { data, error }: { data: unknown; error: Error | null } =
      await resend.emails.send({
        from: "no-reply@yourdomain.com",
        to: recipient,
        subject: "Reset your password",
        html: htmlContent,
      });

    if (error) {
      console.error("Email send error:", error);
      throw new Error("Failed to send password reset email");
    }

    return data;
  } catch (err) {
    console.error("Unexpected error while sending password reset email:", err);
    throw err;
  }
}

export async function sendResetSuccessEmail(
  recipient: string
): Promise<unknown> {
  try {
    const htmlContent = resetSuccessEmailTemplate.replace(
      "{{LOGIN_URL}}",
      `${process.env.CLIENT_URL}/login`
    );

    const { data, error }: { data: unknown; error: Error | null } =
      await resend.emails.send({
        from: "no-reply@yourdomain.com",
        to: recipient,
        subject: "Password Reset Successful ✅",
        html: htmlContent,
      });

    if (error) {
      console.error("Email send error:", error);
      throw new Error("Failed to send reset success email");
    }

    return data;
  } catch (err) {
    console.error("Unexpected error while sending reset success email:", err);
    throw err;
  }
}
