import "dotenv/config";

const CONTENT = {
  register: {
    subject: "Verify your email address",
    heading: "Verify your email",
    text: "Use the verification code below to complete your registration.",
  },
  login: {
    subject: "Your login verification code",
    heading: "Confirm your login",
    text: "Use the verification code below to complete your login.",
  },
  update: {
    subject: "Your password update verification code",
    heading: "Update your password",
    text: "Use the verification code below to update your password.",
  },
};

const buildHtml = ({ heading, text }, otp) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${heading}</title>
</head>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f6fb;padding:40px 15px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width:460px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.08);">

          <tr>
            <td align="center" style="padding:35px 25px 20px;background:#ffffff;">
              <div style="width:58px;height:58px;line-height:58px;border-radius:50%;background:#eef2ff;color:#4f46e5;font-size:27px;margin-bottom:18px;">✉</div>
              <h1 style="margin:0;font-size:25px;color:#171923;">${heading}</h1>
              <p style="margin:12px 0 0;font-size:14px;line-height:22px;color:#6b7280;">${text}</p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:15px 25px 30px;">
              <p style="margin:0 0 10px;font-size:13px;color:#6b7280;">Your verification code</p>
              <div style="display:inline-block;padding:15px 28px;background:#f5f6ff;border:1px solid #e0e4ff;border-radius:12px;color:#4f46e5;font-size:32px;font-weight:bold;letter-spacing:8px;">${otp}</div>
              <p style="margin:18px 0 0;font-size:13px;color:#6b7280;">
                This code expires in
                <strong style="color:#171923;">${process.env.OTP_TTL_MINUTES || 10} minutes</strong>.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 25px 30px;">
              <div style="padding:15px;background:#fff8e7;border-radius:10px;border:1px solid #fde7a8;">
                <p style="margin:0;font-size:12px;line-height:19px;color:#7a5b00;">
                  <strong>Security notice:</strong><br>
                  Never share this verification code with anyone. Our team will never ask you for your OTP.
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:22px 20px;background:#f8f9fc;border-top:1px solid #edf0f5;">
              <p style="margin:0;font-size:12px;color:#9ca3af;line-height:19px;">
                If you didn't request this code, you can safely ignore this email.
              </p>
              <p style="margin:10px 0 0;font-size:11px;color:#b0b4bd;">
                © ${new Date().getFullYear()} CodPro Technology
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

export const sendMail = async (to, otp, purpose) => {
  const content = CONTENT[purpose];
  if (!content) throw new Error(`sendMail: unknown purpose "${purpose}"`);

  if (!process.env.BREVO_API_KEY) {
    throw new Error("sendMail: BREVO_API_KEY is not set");
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "CodPro Technology",
        email: process.env.MAIL_FROM || "suicodpro@gmail.com",
      },
      to: [{ email: to }],
      subject: content.subject,
      htmlContent: buildHtml(content, otp),
    }),
  });

  if (!res.ok) {
    throw new Error(`Brevo ${res.status}: ${await res.text()}`);
  }
};
