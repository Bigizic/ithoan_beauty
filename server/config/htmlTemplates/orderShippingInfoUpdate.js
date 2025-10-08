exports.orderShippingInfoUpdate = (order) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shipping Information Updated</title>
</head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background:#f8f9fa;">

  <!-- Header with Logo -->
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#da3e8e;padding:0px 20px;">
    <tr style="width:100%;" width="100%">
      <td style="width:100%;" width="100%" align="center">
        <img src="https://res.cloudinary.com/dduai6ryd/image/upload/v1759836789/logo_no_bg_ibdm3t.png" alt="Logo" width="120" height="120" style="display:block;margin:0 auto 15px;border-radius:0%;">
      </td>
    </tr>
  </table>

  <!-- Update Banner -->
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="padding:40px 20px;">
    <tr>
      <td align="center">
        <h1 style="margin:0 0 10px 0;color:#131417;font-size:32px;font-weight:700;">Shipping Information Updated</h1>
        <p style="margin:0;color:#131417;font-size:18px;">Hi ${order.user.firstName}, your shipping details have been updated</p>
      </td>
    </tr>
  </table>

  <!-- Main Content -->
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:100%;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding:40px 0px;">

              <!-- Update Message -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#d1ecf1;border-left:4px solid #0c5460;padding:15px;margin:0 0 30px 0;border-radius:4px;">
                <tr>
                  <td>
                    <p style="margin:0;font-size:16px;color:#0c5460;font-weight:600;">Your shipping address has been updated successfully.</p>
                  </td>
                </tr>
              </table>

              <!-- Order Info -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f8f9fa;border-radius:8px;padding:20px;margin:20px 0;">
                <tr>
                  <td>
                    <p style="margin:0 0 10px 0;font-size:14px;color:#666;">
                      <strong style="color:#131417;">Order ID:</strong> #${order._id}
                    </p>
                    <p style="margin:0 0 10px 0;font-size:14px;color:#666;">
                      <strong style="color:#131417;">Order Date:</strong> ${new Date(order.created).toDateString()}
                    </p>
                    <p style="margin:0;font-size:14px;color:#666;">
                      <strong style="color:#131417;">Delivery Method:</strong> ${order.dispatch}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- New Shipping Address -->
              <h2 style="margin:30px 0 20px 0;font-size:20px;font-weight:700;color:#131417;">Updated Shipping Address</h2>
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f8f9fa;border-radius:8px;padding:20px;margin:20px 0;">
                <tr>
                  <td>
                    <p style="margin:0 0 5px 0;font-size:16px;font-weight:600;color:#131417;">${order.user.firstName} ${order.user.lastName}</p>
                    <p style="margin:0;font-size:15px;color:#666;line-height:1.6;">
                      ${order.address.address}<br>
                      ${order.address.city}, ${order.address.state}<br>
                      ${order.address.country}
                    </p>
                    ${order.address.zipCode ? `<p style="margin:5px 0 0 0;font-size:15px;color:#666;">ZIP: ${order.address.zipCode}</p>` : ''}
                    ${order.user.phoneNumber ? `<p style="margin:5px 0 0 0;font-size:15px;color:#666;">Phone: ${order.user.phoneNumber}</p>` : ''}
                  </td>
                </tr>
              </table>

              <!-- Action Button -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:30px 0;">
                <tr>
                  <td align="center">
                    <a href="https://tohannieesskincare.com/order/${order._id}" style="display:inline-block;padding:14px 32px;background:#da3e8e;color:#fff;text-decoration:none;border-radius:4px;font-size:16px;font-weight:600;">
                      View Order Details
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Support Note -->
              <p style="margin:30px 0 0 0;font-size:14px;color:#666;text-align:center;">
                If you didn't make this change or have any questions, please contact our support team.
              </p>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- footer -->
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#131417;padding:40px 20px;">
  <tr>
    <td align="center">

      <!-- social links as text -->
      <table cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px 0;">
        <tr>
          <td style="padding:0 10px;">
            <a href="https://www.instagram.com/tohanniees_skincare/?igsh=ODB2cDI1dTFrb2Jo" 
               style="color:#da3e8e;text-decoration:none;font-size:14px;font-weight:600;">Instagram</a>
          </td>
          <td style="padding:0 10px;">
            <a href="https://wa.me/2349077692506" 
               style="color:#da3e8e;text-decoration:none;font-size:14px;font-weight:600;">Whatsapp</a>
          </td>
          <td style="padding:0 10px;">
            <a href="https://snapchat.com/t/VE8G18OV" 
               style="color:#da3e8e;text-decoration:none;font-size:14px;font-weight:600;">Snapchat</a>
          </td>
        </tr>
      </table>

      <!-- contact info -->
      <p style="margin:0 0 5px 0;color:#fff;font-size:14px;">
        Questions? email <a href="mailto:support@tohannieesskincare.com" style="color:#da3e8e;text-decoration:none;">support@tohannieesskincare.com</a>
      </p>

      <p style="margin:0;color:#999;font-size:12px;">
        © 2025 tohanniee's skincare. all rights reserved.
      </p>

    </td>
  </tr>
</table>

</body>
</html>
`;
