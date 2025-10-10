const { TH_BEAUTY } = require('../../../constants');

exports.beautyNewsletterWelcome = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our Community</title>
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

              <!-- Success Message -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:linear-gradient(135deg, #eabe30 0%, #d4a82a 100%);border-radius:12px;padding:30px;margin:0 0 30px 0;text-align:center;">
                <tr>
                  <td align="center">
                    <p style="margin:0;font-size:64px;line-height:1;">✨</p>
                    <p style="margin:15px 0 0 0;font-size:20px;color:#1c1c1c;font-weight:700;">
                      You're Successfully Subscribed!
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Welcome Message -->
              <p style="margin:0 0 20px 0;font-size:18px;color:#1c1c1c;font-weight:600;">
                Thank you for joining our wellness community!
              </p>

              <p style="margin:0 0 30px 0;font-size:16px;color:#666;line-height:1.6;">
                We're thrilled to have you on board. Get ready to receive exclusive updates,
                wellness tips, and special offers tailored just for you.
              </p>

              <!-- Benefits Section -->
              <h3 style="margin:0 0 20px 0;font-size:20px;font-weight:700;color:#1c1c1c;text-align:center;">
                Here's What You'll Get:
              </h3>

              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 30px 0;">
                <tr>
                  <td style="padding:20px;background:#fff9e6;border-radius:8px;margin-bottom:15px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="50" style="vertical-align:top;">
                          <div style="width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;">
                            🎁
                          </div>
                        </td>
                        <td style="padding-left:15px;">
                          <p style="margin:0 0 5px 0;font-size:16px;font-weight:700;color:#1c1c1c;">
                            Exclusive Offers
                          </p>
                          <p style="margin:0;font-size:14px;color:#666;line-height:1.6;">
                            Be the first to know about special promotions, discounts, and limited-time deals.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 30px 0;">
                <tr>
                  <td style="padding:20px;background:#f0f8ff;border-radius:8px;margin-bottom:15px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="50" style="vertical-align:top;">
                          <div style="width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;">
                            💡
                          </div>
                        </td>
                        <td style="padding-left:15px;">
                          <p style="margin:0 0 5px 0;font-size:16px;font-weight:700;color:#1c1c1c;">
                            Wellness Tips & Advice
                          </p>
                          <p style="margin:0;font-size:14px;color:#666;line-height:1.6;">
                            Expert guidance on skincare, beauty routines, and wellness practices for your best self.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 30px 0;">
                <tr>
                  <td style="padding:20px;background:#f0fff4;border-radius:8px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="50" style="vertical-align:top;">
                          <div style="width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;">
                            🚀
                          </div>
                        </td>
                        <td style="padding-left:15px;">
                          <p style="margin:0 0 5px 0;font-size:16px;font-weight:700;color:#1c1c1c;">
                            Early Access
                          </p>
                          <p style="margin:0;font-size:14px;color:#666;line-height:1.6;">
                            Get exclusive early access to new product launches and collections before anyone else.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:30px 0;">
                <tr>
                  <td align="center">
                    <a href="https://tohannieesskincare.com/shop"
                       style="display:inline-block;padding:16px 40px;background:linear-gradient(135deg, #eabe30 0%, #d4a82a 100%);color:#1c1c1c;text-decoration:none;border-radius:8px;font-size:16px;font-weight:700;box-shadow:0 4px 12px rgba(234,190,48,0.3);">
                      Start Shopping
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #eee;margin:30px 0;">

              <!-- Additional Info -->
              <p style="margin:0 0 15px 0;font-size:14px;color:#666;line-height:1.6;">
                We respect your privacy and will never share your information with third parties.
                You can unsubscribe at any time by clicking the unsubscribe link in any of our emails.
              </p>

              <p style="margin:0;font-size:14px;color:#666;line-height:1.6;">
                Have questions or feedback? We'd love to hear from you!
                Reply to this email or reach out to us at
                <a href="mailto:support@tohannieesskincare.com" style="color:#eabe30;text-decoration:none;">support@tohannieesskincare.com</a>
              </p>

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
        <p style="margin:0 0 15px 0;color:#fff;font-size:16px;font-weight:600;">
          Connect With Us
        </p>

        <table cellpadding="0" cellspacing="0" border="0" style="margin:0 0 25px 0;">
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

        <p style="margin:0 0 15px 0;color:#999;font-size:12px;">
          © ${new Date().getFullYear()} Tohanniee's Beauty & Wellness. All rights reserved.
        </p>

        <p style="margin:0;color:#666;font-size:12px;">
          You're receiving this email because you subscribed to our newsletter.
        </p>

      </td>
    </tr>
  </table>

</body>
</html>
`;
