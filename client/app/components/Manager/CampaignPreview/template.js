const campaignProductList = (type, products) => {
  if (!products || products.length === 0) return '';

  const sectionTitles = {
    best_selling: 'Our Best Sellers',
    discount: 'Special Offers',
    new_arrivals: 'New Arrivals'
  };

  const productsHTML = products.map(item => {
    const finalPrice = item.price - (item.price * (item.discountPrice / 100));
    const hasDiscount = item.discountPrice > 0;

    return `
      <td style="width:50%;padding:15px;" valign="top">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td>
              <a href="https://tohannieesskincare.com/product/${item.slug}" style="display:block;">
                <img src="${item.imageUrl}" alt="${item.name}" width="100%" style="display:block;max-height:280px;object-fit:cover;border:0;">
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:20px;">
              <h3 style="margin:0 0 12px 0;font-size:16px;font-weight:600;color:#131417;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                ${item.name}
              </h3>
              ${hasDiscount ? `
                <p style="margin:0 0 8px 0;">
                  <span style="color:#999;font-size:14px;text-decoration:line-through;margin-right:8px;">₦${item.price.toLocaleString()}</span>
                  <span style="background:#fb0000;color:#fff;padding:3px 8px;border-radius:4px;font-size:12px;font-weight:600;">${item.discountPrice.toFixed(0)}% OFF</span>
                </p>
              ` : ''}
              <p style="margin:0 0 15px 0;color:#da3e8e;font-size:20px;font-weight:700;">₦${finalPrice.toLocaleString()}</p>
              <a href="https://tohannieesskincare.com/product/${item.slug}" style="display:inline-block;padding:12px 28px;background:#da3e8e;color:#fff;text-decoration:none;border-radius:4px;font-size:14px;font-weight:600;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                Shop Now
              </a>
            </td>
          </tr>
        </table>
      </td>
    `;
  }).join('');

  // Split products into rows of 2
  let rowsHTML = '';
  for (let i = 0; i < products.length; i += 2) {
    const row = products.slice(i, i + 2).map(item => {
      const finalPrice = item.price - (item.price * (item.discountPrice / 100));
      const hasDiscount = item.discountPrice > 0;
      return `
        <td style="width:50%;padding:15px;" valign="top">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
            <tr>
              <td>
                <a href="https://tohannieesskincare.com/product/${item.slug}" style="display:block;">
                  <img src="${item.imageUrl}" alt="${item.name}" width="100%" style="display:block;max-height:280px;object-fit:cover;border:0;">
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:20px;">
                <h3 style="margin:0 0 12px 0;font-size:16px;font-weight:600;color:#131417;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                  ${item.name}
                </h3>
                ${hasDiscount ? `
                  <p style="margin:0 0 8px 0;">
                    <span style="color:#999;font-size:14px;text-decoration:line-through;margin-right:8px;">₦${item.price.toLocaleString()}</span>
                    <span style="background:#fb0000;color:#fff;padding:3px 8px;border-radius:4px;font-size:12px;font-weight:600;">${item.discountPrice.toFixed(0)}% OFF</span>
                  </p>
                ` : ''}
                <p style="margin:0 0 15px 0;color:#da3e8e;font-size:20px;font-weight:700;">₦${finalPrice.toLocaleString()}</p>
                <a href="https://tohannieesskincare.com/product/${item.slug}" style="display:inline-block;padding:12px 28px;background:#da3e8e;color:#fff;text-decoration:none;border-radius:4px;font-size:14px;font-weight:600;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                  Shop Now
                </a>
              </td>
            </tr>
          </table>
        </td>
      `;
    }).join('');
    rowsHTML += `<tr>${row}</tr>`;
  }

  return `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f8f9fa;padding:40px 20px;">
      <tr>
        <td align="center">
          <h2 style="margin:0 0 10px 0;font-size:28px;font-weight:700;color:#131417;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
            ${sectionTitles[type]}
          </h2>
          <p style="margin:0 0 30px 0;font-size:16px;color:#666;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
            ${type === 'best_selling' ? 'Customer favorites that deliver results' :
      type === 'discount' ? 'Exclusive discounts on premium skincare' :
        'Discover our latest skincare innovations'}
          </p>
          <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;">
            ${rowsHTML}
          </table>
        </td>
      </tr>
    </table>
  `;
};

const footer = () => {
  return `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#131417;padding:40px 20px;">
      <tr>
        <td align="center">
          <img src="https://res.cloudinary.com/dduai6ryd/image/upload/v1736088530/ithoan/images/logo/business_logo.png" alt="Tohanniee's Skincare" width="60" height="60" style="display:block;margin:0 auto 20px;border-radius:50%;">
          <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 20px;">
            <tr>
              <td style="padding:0 10px;">
                <a href="https://www.instagram.com/tohanniees_skincare/?igsh=ODB2cDI1dTFrb2Jo">
                  <img src="https://res.cloudinary.com/dduai6ryd/image/upload/v1737226260/instagram_x3qgso.svg" alt="Instagram" width="32" height="32" style="display:block;">
                </a>
              </td>
              <td style="padding:0 10px;">
                <a href="https://wa.me/2349077692506">
                  <img src="https://res.cloudinary.com/dduai6ryd/image/upload/v1737226284/whatsapp_gfmhlx.svg" alt="WhatsApp" width="32" height="32" style="display:block;">
                </a>
              </td>
              <td style="padding:0 10px;">
                <a href="https://snapchat.com/t/VE8G18OV">
                  <img src="https://res.cloudinary.com/dduai6ryd/image/upload/v1737226270/snapchat_k3qafv.svg" alt="Snapchat" width="32" height="32" style="display:block;filter:invert(1);">
                </a>
              </td>
            </tr>
          </table>
          <p style="margin:0;color:#fff;font-size:14px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
            Questions? Email <a href="mailto:support@tohannieesskincare.com" style="color:#da3e8e;text-decoration:none;">support@tohannieesskincare.com</a>
          </p>
        </td>
      </tr>
    </table>
  `;
};

export const campaignTemplate = (campaign) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tohanniee's Skincare Newsletter</title>
</head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background:#ffffff;">

  <!-- Header with Logo -->
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#da3e8e;padding:25px 20px 0px 20px;">
    <tr>
      <td align="center">
        <img src="https://res.cloudinary.com/dduai6ryd/image/upload/v1759836789/logo_no_bg_ibdm3t.png" alt="Logo" width="120" height="120" style="display:block;margin:0 auto 15px;border-radius:0%;">
        <!--<img src="https://res.cloudinary.com/dduai6ryd/image/upload/v1737231689/Tohanniees_skincare_2_ypliyr.png" alt="Tohanniee's Skincare" width="280" height="65" style="display:block;margin:0 auto;">-->
      </td>
    </tr>
  </table>

  <!-- Main Content Section -->
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#da3e8e;padding:10px 20px 50px 20px;">
    <tr>
      <td>
        <h1 style="text-align:center;padding:10px 8px 20px 8px;margin:0 0 20px 0;color:#fff;font-size:36px;font-weight:700;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
          ${campaign.heading || 'Welcome to Our Newsletter'}
        </h1>
        <div style="text-align:justify;color:#fff;font-size:18px;padding:10px 8px 20px 8px;line-height:24px;max-width:100%;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
          ${campaign.sub_heading || ''}
        </div>
        ${campaign.links ? `
        <table cellpadding="0" cellspacing="0" border="0" style="margin:25px auto 0;">
          <tr>
            <td style="padding:0 15px;">
              <a href="https://tohannieesskincare.com/shop" style="color:#fff;text-decoration:none;font-size:14px;font-weight:600;">Shop</a>
            </td>
            <td style="color:#fff;">|</td>
            <td style="padding:0 15px;">
              <a href="https://tohannieesskincare.com/shop/category/all" style="color:#fff;text-decoration:none;font-size:14px;font-weight:600;">All Categories</a>
            </td>
            <td style="color:#fff;">|</td>
            <td style="padding:0 15px;">
              <a href="mailto:support@tohannieesskincare.com" style="color:#fff;text-decoration:none;font-size:14px;font-weight:600;">Email Us</a>
            </td>
          </tr>
        </table>
        ` : ''}
      </td>
    </tr>
  </table>

  <!-- Hero Banner Image -->
  ${campaign.imageUrl ? `
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr>
      <td align="center">
        <a href="https://tohannieesskincare.com/">
          <img src="${campaign.imageUrl}" alt="Campaign Banner" width="600" style="display:block;max-width:100%;height:auto;">
        </a>
      </td>
    </tr>
  </table>
  ` : ''}

  <!-- Products Sections -->
  ${campaign.best_selling_products && campaign.best_selling_products.length > 0 ? campaignProductList('best_selling', campaign.best_selling_products) : ''}

  ${campaign.discounted_products && campaign.discounted_products.length > 0 ? campaignProductList('discount', campaign.discounted_products) : ''}

  ${campaign.new_arrivals && campaign.new_arrivals.length > 0 ? campaignProductList('new_arrivals', campaign.new_arrivals) : ''}

  <!-- Footer -->
  ${campaign.footer !== false ? footer() : ''}

  <!-- Unsubscribe -->
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f8f9fa;padding:20px;">
    <tr>
      <td align="center">
        <p style="margin:0;color:#666;font-size:12px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
          <a href="%recipient.unsubscribe_link%" style="color:#666;text-decoration:underline;">Unsubscribe</a>
        </p>
      </td>
    </tr>
  </table>

</body>
</html>
`;
