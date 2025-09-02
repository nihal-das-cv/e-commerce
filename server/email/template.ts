export const verificationEmailTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Email Verification</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f9fafb;font-family:Arial,sans-serif;color:#111827;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
            <tr>
              <td align="center" style="font-size:20px;font-weight:bold;color:#111827;">
                Verify your email
              </td>
            </tr>
            <tr>
              <td style="padding:16px 0;font-size:14px;color:#374151;text-align:center;line-height:1.5;">
                Thanks for signing up! Please confirm your email by entering the code below.
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:24px 0;">
                <div style="display:inline-block;padding:12px 24px;background-color:#2563eb;color:#ffffff;
                            font-size:20px;font-weight:700;letter-spacing:3px;border-radius:8px;">
                  {{VERIFICATION_CODE}}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding-top:16px;font-size:12px;color:#6b7280;text-align:center;line-height:1.4;">
                If you didn’t request this, you can safely ignore this email.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;

export const welcomeEmailTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Welcome Email</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f9fafb;font-family:Arial,sans-serif;color:#111827;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
            
            <tr>
              <td align="center" style="font-size:22px;font-weight:bold;color:#111827;">
                🎉 Welcome to Our Platform!
              </td>
            </tr>

            <tr>
              <td style="padding:16px 0;font-size:14px;color:#374151;text-align:center;line-height:1.5;">
                Hi <strong>{{NAME}}</strong>, we’re so excited to have you join us!  
                Your account has been successfully verified and you’re all set to explore.
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:24px 0;">
                <a href="{{DASHBOARD_URL}}" 
                   style="display:inline-block;padding:12px 24px;background-color:#10b981;color:#ffffff;
                          font-size:16px;font-weight:600;text-decoration:none;border-radius:8px;">
                  Go to Dashboard
                </a>
              </td>
            </tr>

            <tr>
              <td style="padding-top:16px;font-size:12px;color:#6b7280;text-align:center;line-height:1.4;">
                If you have any questions, feel free to reach out to our support team anytime.  
                We’re here to help you succeed 🚀
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;

export const resetPasswordEmailTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Reset Password</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f9fafb;font-family:Arial,sans-serif;color:#111827;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.05);">

            <tr>
              <td align="center" style="font-size:20px;font-weight:bold;color:#111827;">
                Reset your password
              </td>
            </tr>

            <tr>
              <td style="padding:16px 0;font-size:14px;color:#374151;text-align:center;line-height:1.5;">
                We received a request to reset your password.  
                Click the button below to set a new one.  
                This link will expire in 1 hour.
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:24px 0;">
                <a href="{{RESET_URL}}" 
                   style="display:inline-block;padding:12px 24px;background-color:#2563eb;color:#ffffff;
                          font-size:16px;font-weight:600;text-decoration:none;border-radius:8px;">
                  Reset Password
                </a>
              </td>
            </tr>

            <tr>
              <td style="padding-top:16px;font-size:12px;color:#6b7280;text-align:center;line-height:1.4;">
                If you didn’t request this, you can safely ignore this email.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;

export const resetSuccessEmailTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Password Reset Successful</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f9fafb;font-family:Arial,sans-serif;color:#111827;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.05);">

            <tr>
              <td align="center" style="font-size:20px;font-weight:bold;color:#111827;">
                Your password has been reset ✅
              </td>
            </tr>

            <tr>
              <td style="padding:16px 0;font-size:14px;color:#374151;text-align:center;line-height:1.5;">
                Hi there, your password was successfully updated.  
                If this wasn’t you, please reset your password again immediately or contact support.
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:24px 0;">
                <a href="{{LOGIN_URL}}" 
                   style="display:inline-block;padding:12px 24px;background-color:#10b981;color:#ffffff;
                          font-size:16px;font-weight:600;text-decoration:none;border-radius:8px;">
                  Login Now
                </a>
              </td>
            </tr>

            <tr>
              <td style="padding-top:16px;font-size:12px;color:#6b7280;text-align:center;line-height:1.4;">
                If you didn’t request this change, please secure your account.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;
