const orderItemsHtml = (order) => {
  let subTotal = 0;

  const products = order.products.map(item => {
    const itemTotal = item.totalPrice - (item.totalPrice * (item.discountPrice / 100));
    subTotal += itemTotal;

    return `
      <tr style="border-bottom:1px solid #eee;">
        <td style="padding:15px 0;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td width="60">
                <img src="${item.image}" alt="${item.name}" width="50" height="50" style="display:block;border-radius:4px;">
              </td>
              <td style="padding-left:15px;">
                <p style="margin:0 0 5px 0;font-size:16px;font-weight:600;color:#131417;">${item.name}</p>
                <p style="margin:0;font-size:14px;color:#666;">Quantity: ${item.quantity}</p>
              </td>
              <td align="right" style="font-size:16px;font-weight:600;color:#131417;">
                ${order.currency}${itemTotal.toLocaleString()}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
      ${products}
      <tr>
        <td style="padding:20px 0 10px 0;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td align="right" style="padding:5px 0;">
                <span style="font-size:14px;color:#666;margin-right:20px;">Subtotal:</span>
                <span style="font-size:16px;font-weight:600;color:#131417;">${order.currency}${subTotal.toLocaleString()}</span>
              </td>
            </tr>
            <tr>
              <td align="right" style="padding:5px 0;border-top:2px solid #131417;">
                <span style="font-size:16px;font-weight:700;color:#131417;margin-right:20px;">Total:</span>
                <span style="font-size:20px;font-weight:700;color:#da3e8e;">${order.currency}${order.total.toLocaleString()}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
};

exports.orderUpdate = (order, orderMsg) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Update</title>
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
        <h1 style="margin:0 0 10px 0;color:#131417;font-size:32px;font-weight:700;">Order Update</h1>
        <p style="margin:0;color:#131417;font-size:18px;">Hi ${order.user.firstName}, there's an update on your order</p>
      </td>
    </tr>
  </table>

  <!-- Main Content -->
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding:40px 0px;">

              <!-- Update Message -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#d4edda;border-left:4px solid #28a745;padding:15px;margin:0 0 30px 0;border-radius:4px;">
                <tr>
                  <td>
                    <p style="margin:0;font-size:16px;color:#155724;font-weight:600;">${orderMsg}</p>
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
                      <strong style="color:#131417;">Date:</strong> ${new Date(order.created).toDateString()}
                    </p>
                    <p style="margin:0 0 10px 0;font-size:14px;color:#666;">
                      <strong style="color:#131417;">Delivery:</strong> ${order.dispatch}
                    </p>
                    <p style="margin:0;font-size:14px;color:#666;">
                      <strong style="color:#131417;">Shipping Address:</strong><br>
                      ${order.address.address}, ${order.address.city}, ${order.address.state}, ${order.address.country}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Order Items -->
              <h2 style="margin:30px 0 20px 0;font-size:20px;font-weight:700;color:#131417;">Order Summary</h2>
              ${orderItemsHtml(order)}

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
