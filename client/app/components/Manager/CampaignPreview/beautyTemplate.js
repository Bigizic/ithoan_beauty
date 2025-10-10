import { TH_BEAUTY } from "@/constants";

const footer = () => {
  return `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#131417;padding:40px 20px;">
      <tr>
        <td align="center">
          <img src="https://res.cloudinary.com/dduai6ryd/image/upload/v1736088530/ithoan/images/logo/business_logo.png" alt="tohanniee's beauty" width="60" height="60" style="display:block;margin:0 auto 20px;border-radius:50%;">
          <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 20px;">
            <tr>
              <td style="padding:0 10px;">
                <a href=${TH_BEAUTY.instagram}>
                  <img src="https://res.cloudinary.com/dduai6ryd/image/upload/v1737226260/instagram_x3qgso.svg" alt="instagram" width="32" height="32" style="display:block;">
                </a>
              </td>
              <td style="padding:0 10px;">
                <a href=${TH_BEAUTY.whatsapp}>
                  <img src="https://res.cloudinary.com/dduai6ryd/image/upload/v1737226284/whatsapp_gfmhlx.svg" alt="whatsapp" width="32" height="32" style="display:block;">
                </a>
              </td>
              <td style="padding:0 10px;">
                <a href=${TH_BEAUTY.snapchat}>
                  <img src="https://res.cloudinary.com/dduai6ryd/image/upload/v1737226270/snapchat_k3qafv.svg" alt="snapchat" width="32" height="32" style="display:block;filter:invert(1);">
                </a>
              </td>
            </tr>
          </table>
          <p style="margin:0;color:#fff;font-size:14px;font-family:'helvetica neue',helvetica,arial,sans-serif;">
            questions? email <a href="mailto:support@tohannieesskincare.com" style="color:#da3e8e;text-decoration:none;">support@tohannieesskincare.com</a>
          </p>
        </td>
      </tr>
    </table>
  `;
};

export const beautyCampaignTemplate = (campaign) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>tohanniee's beauty newsletter</title>
</head>
<body style="margin:0;padding:0;font-family:'helvetica neue',helvetica,arial,sans-serif;background:#ffffff;">

  <!-- header with logo -->
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#eabe30;padding:15px;">
    <tr>
      <td align="center">
        <img src="https://res.cloudinary.com/dduai6ryd/image/upload/v1759689351/logo_no_bg_wp9uid.png" alt="tohanniees beauty logo" width="60" height="60" style="display:block;border-radius:0%;">
      </td>
    </tr>
  </table>

  <!-- main content -->
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f4f4;padding:20px 20px 50px 20px;margin:30px 0;">
    <tr>
      <td>
        <h1 style="text-align:center;padding:10px 8px 20px 8px;margin:0 0 20px;color:#222;font-size:32px;font-weight:700;font-family:'helvetica neue',helvetica,arial,sans-serif;">
          ${campaign.heading || 'welcome to our spa newsletter'}
        </h1>
        <div style="text-align:justify;color:#444;font-size:14px;padding:10px 8px 20px 8px;line-height:26px;max-width:100%;font-family:'helvetica neue',helvetica,arial,sans-serif;">
          ${campaign.sub_heading || ''}
        </div>
        ${campaign.links ? `
        <table cellpadding="0" cellspacing="0" border="0" style="margin:25px auto 0;">
          <tr>
            <td style="padding:0 15px;">
              <a href="https://beauty.tohannieesskincare.com/" style="color:#da3e8e;text-decoration:none;font-size:14px;font-weight:600;">book a treatment</a>
            </td>
            <td style="color:#999;">|</td>
            <td style="padding:0 15px;">
              <a href="https://beauty.tohannieesskincare.com/services" style="color:#da3e8e;text-decoration:none;font-size:14px;font-weight:600;">our services</a>
            </td>
            <td style="color:#999;">|</td>
            <td style="padding:0 15px;">
              <a href="mailto:support@tohannieesskincare.com" style="color:#da3e8e;text-decoration:none;font-size:14px;font-weight:600;">email us</a>
            </td>
          </tr>
        </table>
        ` : ''}
      </td>
    </tr>
  </table>

  <!-- hero banner image -->
  ${campaign.imageUrl ? `
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr>
      <td align="center">
        <a href="https://beauty.tohannieesskincare.com/">
          <img src="${campaign.imageUrl}" alt="campaign banner" width="600" style="display:block;max-width:100%;height:auto;">
        </a>
      </td>
    </tr>
  </table>
  ` : ''}

  <!-- footer -->
  ${campaign.footer !== false ? footer() : ''}

  <!-- unsubscribe -->
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f4f4;padding:20px;">
    <tr>
      <td align="center">
        <p style="margin:0;color:#666;font-size:12px;font-family:'helvetica neue',helvetica,arial,sans-serif;">
          <a href="%recipient.unsubscribe_link%" style="color:#666;text-decoration:underline;">unsubscribe</a>
        </p>
      </td>
    </tr>
  </table>

</body>
</html>
`;
