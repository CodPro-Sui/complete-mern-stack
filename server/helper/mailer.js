import nodemailer from "nodemailer";
import "dotenv/config";
const transpoter = nodemailer.createTransport({
host: process.env.SMTP_HOST,
port: Number(process.env.SMTP_PORT),
secure: process.env.SMTP_PORT === 465,
family: 4,
auth:{
user: process.env.SMTP_USER,
pass: process.env.SMTP_PASS
}
});

export const sendMail = async (to,otp,purpose) =>{
let subject = "";
switch (purpose){
case "register":
subject = "Verify your email address";
break;
case "login":
subject = "Your login verification code";
break;
case "update":
subject = "Your password update verification code"
break;
default :
subject = "oops"
}
await transpoter.sendMail({
from: `"CodPro Technology" <${process.env.SMTP_USER}>`,
to,
subject,
html:`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Verify Your Email</title>
</head>

<body style="
  margin:0;
  padding:0;
  background:#f4f6fb;
  font-family:Arial,Helvetica,sans-serif;
">

  <table width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background:#f4f6fb;padding:40px 15px;">

    <tr>
      <td align="center">

        <!-- Main Card -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width:460px;
            background:#ffffff;
            border-radius:18px;
            overflow:hidden;
            box-shadow:0 8px 30px rgba(0,0,0,0.08);
          "
        >

          <!-- Header -->
          <tr>
            <td align="center"
              style="
                padding:35px 25px 20px;
                background:#ffffff;
              "
            >

              <div style="
                width:58px;
                height:58px;
                line-height:58px;
                border-radius:50%;
                background:#eef2ff;
                color:#4f46e5;
                font-size:27px;
                margin-bottom:18px;
              ">
                ✉
              </div>

              <h1 style="
                margin:0;
                font-size:25px;
                color:#171923;
              ">
                Verify your email
              </h1>

              <p style="
                margin:12px 0 0;
                font-size:14px;
                line-height:22px;
                color:#6b7280;
              ">
                Use the verification code below to complete
                your registration.
              </p>

            </td>
          </tr>

          <!-- OTP Section -->
          <tr>
            <td align="center"
              style="padding:15px 25px 30px;">

              <p style="
                margin:0 0 10px;
                font-size:13px;
                color:#6b7280;
              ">
                Your verification code
              </p>

              <!-- OTP -->
              <div style="
                display:inline-block;
                padding:15px 28px;
                background:#f5f6ff;
                border:1px solid #e0e4ff;
                border-radius:12px;
                color:#4f46e5;
                font-size:32px;
                font-weight:bold;
                letter-spacing:8px;
              ">
                ${otp}
              </div>

              <p style="
                margin:18px 0 0;
                font-size:13px;
                color:#6b7280;
              ">
                This code expires in
                <strong style="color:#171923;">
                  ${process.env.OTP_TTL_MINUTES} minutes
                </strong>.
              </p>

            </td>
          </tr>

          <!-- Security Notice -->
          <tr>
            <td style="
              padding:0 25px 30px;
            ">

              <div style="
                padding:15px;
                background:#fff8e7;
                border-radius:10px;
                border:1px solid #fde7a8;
              ">

                <p style="
                  margin:0;
                  font-size:12px;
                  line-height:19px;
                  color:#7a5b00;
                ">
                  <strong>Security notice:</strong><br>
                  Never share this verification code with anyone.
                  Our team will never ask you for your OTP.
                </p>

              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center"
              style="
                padding:22px 20px;
                background:#f8f9fc;
                border-top:1px solid #edf0f5;
              "
            >

              <p style="
                margin:0;
                font-size:12px;
                color:#9ca3af;
                line-height:19px;
              ">
                If you didn't request this code, you can safely
                ignore this email.
              </p>

              <p style="
                margin:10px 0 0;
                font-size:11px;
                color:#b0b4bd;
              ">
                © ${new Date().getFullYear()} CodPro Technologies Pvt. Ltd.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>

  </table>

</body>
</html>
`
})
}
