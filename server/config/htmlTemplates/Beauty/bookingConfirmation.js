const { TH_BEAUTY } = require('../../../constants')

exports.bookingConfirmation = (booking) => {
  const bkD = new Date(booking.bookingDate)
  const dateTime = bkD.toLocaleDateString('en-NG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Africa/Lagos'
  })
  return (
    `
<!DOCTYPE html>
<html lang="en" dir="ltr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" style="color-scheme:light dark;supported-color-schemes:light dark;">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width,initial-scale=1 user-scalable=yes">
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
<title>Booking Received</title>
<style>
body{background-color:#f4f4f4;margin:0;padding:0;}
table{border-collapse:collapse;}
.email-container{max-width:600px;margin:0 auto;background-color:#ffffff;}
.header{background-color:#eabe30;padding:15px;text-align:center;}
.header img{width:60px;height:60px;border-radius:0%;}
.content{padding:40px 30px;}
h1{color:#1c1c1c;font-family:'Bricolage Grotesque',Helvetica,Arial,sans-serif;font-size:28px;margin:0 0 20px;}
p{color:#1c1c1c;font-family:'Poppins',Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;margin:0 0 15px;}
.booking-details{background-color:#f9f9f9;border-radius:10px;padding:20px;margin:20px 0;}
.detail-row{margin:10px 0;}
.detail-label{font-weight:600;color:#666;}
.detail-value{color:#1c1c1c;}
.button{background-color:#eabe30;color:#1c1c1c;padding:12px 30px;text-decoration:none;border-radius:5px;display:inline-block;font-weight:600;margin:20px 0;}
.footer{background-color:#f4f4f4;padding:20px;text-align:center;font-size:14px;color:#666;}
</style>
</head>
<body>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0">
  <tr>
    <td align="center" style="padding:20px 0;">
      <table role="presentation" class="email-container" width="600" cellspacing="0" cellpadding="0">
        <tr>
          <td class="header">
            <img src="https://res.cloudinary.com/dduai6ryd/image/upload/v1759689351/logo_no_bg_wp9uid.png" alt="Tohanniees Beauty Logo">
          </td>
        </tr>
        <tr>
          <td class="content">
            <h1>Booking Received!</h1>
            <p>Hi ${booking.customerInfo.fullName},</p>
            <p>thank you for choosing <strong>Tohanniees Beauty</strong>. we’re pleased to let you know that your appointment request has been successfully received.  
            our team will review and confirm your booking shortly. You’ll receive a notification once your appointment is officially confirmed.
            </p>

            <div class="booking-details">
              <div class="detail-row">
                <span class="detail-label">Booking Number:</span>
                <span class="detail-value">#${booking.bookingHash}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Service:</span>
                <span class="detail-value">${booking.serviceName} - ${booking.subServiceName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Appointment Date:</span>
                <span class="detail-value">${dateTime}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Appointment Time:</span>
                <span class="detail-value">${booking.bookingTime}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Amount:</span>
                <span class="detail-value">₦${booking.price.toLocaleString()}</span>
              </div>
            </div>

            <div style="background-color:#fff3cd;border-left:4px solid #eabe30;padding:15px;margin:20px 0;border-radius:5px;">
              <p style="margin:0 0 10px;font-weight:600;color:#856404;">Important: Punctuality Policy</p>
              <p style="margin:0;font-size:14px;color:#856404;line-height:20px;">
                Please arrive on time for your appointment. If you arrive <strong>more than 15 minutes late</strong> after your scheduled appointment time, a penalty fee of <strong>₦5,000</strong> will be charged. We appreciate your understanding and cooperation.
              </p>
            </div>

            <center>
              <a href="${TH_BEAUTY.link}/services" class="button">View Services</a>
            </center>

            <div class="locate-us">
              <h2>Locate Us</h2>
               <p>you can find our spa here:<a href="https://maps.google.com/?q=Tohanniees+Beauty" style="color:#eabe30;">view on google maps</a></p>
            </div>

            <p style="margin-top:30px;font-size:14px;color:#666;">
              Questions? Contact us at
              <a href="mailto:support@tohannieesskincare.com" style="color:#eabe30;">support@tohannieesskincare.com</a>
              or WhatsApp us at
              <a href=${TH_BEAUTY.whatsapp} style="color:#eabe30;">+234 907 769 2506</a>
            </p>
          </td>
        </tr>
        <tr>
          <td class="footer">
            <p>Tohanniees Beauty &copy; ${new Date().getFullYear()}</p>
            <p>
              <a href=${TH_BEAUTY.instagram} style="color:#eabe30;text-decoration:none;">Instagram</a> |
              <a href=${TH_BEAUTY.link} style="color:#eabe30;text-decoration:none;">Website</a>
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
  )
}
