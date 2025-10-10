const { TH_BEAUTY } = require('../../../constants');

exports.beautyNewsletterOtp = (otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="width:100%;margin:0;padding:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background:#f8f9fa;">

  <!-- header with logo -->
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#eabe30;padding:15px;">
    <tr>
      <td align="center">
        <img src="https://res.cloudinary.com/dduai6ryd/image/upload/v1759689351/logo_no_bg_wp9uid.png" alt="tohanniees beauty logo" width="60" height="60" style="display:block;border-radius:0%;">
      </td>
    </tr>
  </table>


  <!-- Main Content -->
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;background:#fff;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding:40px 30px;">
            <h1 style="margin:20px 0 0 0;color:#1c1c1c;text-align:center;margin:18px 0px;font-size:28px;font-weight:700;">Verify Your Email</h1>

              <!-- Welcome Message -->
              <p style="margin:0 0 20px 0;font-size:18px;color:#1c1c1c;line-height:1.6;">
                Welcome to our wellness community! 🌟
              </p>

              <p style="margin:0 0 30px 0;font-size:16px;color:#666;line-height:1.6;">
                We're excited to have you join us on this journey to transform your wellness.
                To complete your newsletter subscription, please verify your email address using the code below:
              </p>

              <!-- OTP Box -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:linear-gradient(135deg, #eabe30 0%, #d4a82a 100%);border-radius:12px;padding:30px;margin:30px 0;">
                <tr>
                  <td align="center">
                    <p style="margin:0 0 10px 0;font-size:14px;color:#1c1c1c;font-weight:600;text-transform:uppercase;letter-spacing:1px;">
                      Your Verification Code
                    </p>
                    <p style="margin:0;font-size:48px;color:#1c1c1c;font-weight:700;letter-spacing:8px;font-family:'Courier New',monospace;">
                      ${otp}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Important Notes -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff9e6;border-left:4px solid #eabe30;border-radius:8px;padding:20px;margin:30px 0;">
                <tr>
                  <td>
                    <p style="margin:0 0 10px 0;font-size:14px;color:#1c1c1c;font-weight:600;">
                      ⏱️ Important:
                    </p>
                    <p style="margin:0;font-size:14px;color:#666;line-height:1.6;">
                      This code will expire in <strong style="color:#1c1c1c;">10 minutes</strong>.
                      If you didn't request this code, you can safely ignore this email.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- What to Expect -->
              <h3 style="margin:30px 0 15px 0;font-size:18px;font-weight:700;color:#1c1c1c;">
                What to Expect:
              </h3>

              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 20px 0;">
                <tr>
                  <td style="padding:10px 0;">
                    <p style="margin:0;font-size:14px;color:#666;line-height:1.6;">
                      ✨ <strong style="color:#1c1c1c;">Exclusive Offers:</strong> Be the first to know about special promotions
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <p style="margin:0;font-size:14px;color:#666;line-height:1.6;">
                      💡 <strong style="color:#1c1c1c;">Wellness Tips:</strong> Expert advice on your wellness journey
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <p style="margin:0;font-size:14px;color:#666;line-height:1.6;">
                      🎁 <strong style="color:#1c1c1c;">Early Access:</strong> Get access to new products before anyone else
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#1c1c1c;padding:40px 20px;">
    <tr>
      <td align="center">

        <!-- Social Links -->
        <table cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px 0;">
          <tr>
            <td style="padding:0 15px;">
              <a href=${TH_BEAUTY.instagram}
                 style="color:#eabe30;text-decoration:none;font-size:14px;font-weight:600;">Instagram</a>
            </td>
            <td style="padding:0 15px;">
              <a href=${TH_BEAUTY.whatsapp}
                 style="color:#eabe30;text-decoration:none;font-size:14px;font-weight:600;">WhatsApp</a>
            </td>
            <td style="padding:0 15px;">
              <a href=${TH_BEAUTY.snapchat}
                 style="color:#eabe30;text-decoration:none;font-size:14px;font-weight:600;">Snapchat</a>
            </td>
          </tr>
        </table>

        <!-- Contact Info -->
        <p style="margin:0 0 5px 0;color:#fff;font-size:14px;">
          Questions? Email <a href="mailto:support@tohannieesskincare.com" style="color:#eabe30;text-decoration:none;">support@tohannieesskincare.com</a>
        </p>

        <p style="margin:0;color:#999;font-size:12px;">
          © ${new Date().getFullYear()} Tohanniee's Beauty & Wellness. All rights reserved.
        </p>

      </td>
    </tr>
  </table>

</body>
</html>
`;
