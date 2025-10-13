const { TH_BEAUTY } = require('../../../constants')

exports.bookingConfirm = (booking) => {
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
<title>Appointment Confirmed</title>
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
.alert-box{background-color:#fff3cd;border-left:4px solid #eabe30;padding:15px;margin:20px 0;border-radius:5px;}
.alert-title{margin:0 0 10px;font-weight:600;color:#856404;}
.alert-text{margin:0;font-size:14px;color:#856404;line-height:20px;}
.info-box{background-color:#d1ecf1;border-left:4px solid #17a2b8;padding:15px;margin:20px 0;border-radius:5px;}
.info-title{margin:0 0 10px;font-weight:600;color:#0c5460;}
.info-text{margin:0;font-size:14px;color:#0c5460;line-height:20px;}
.locate-us{margin-top:40px;text-align:center;}
.locate-us h2{font-family:'Bricolage Grotesque',Helvetica,Arial,sans-serif;color:#1c1c1c;font-size:22px;margin-bottom:10px;}
.locate-us p{font-size:14px;color:#555;margin-bottom:15px;}
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
            <h1>Your Appointment is Confirmed!</h1>
            <p>Hi ${booking.customerInfo.fullName},</p>
            <p>Great news! Your appointment with <strong>Tohanniees Beauty</strong> has been confirmed by our team.</p>

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
                <span class="detail-value">₦${booking.price?.toLocaleString()}</span>
              </div>
            </div>

            <p>We are excited to see you on <strong>${dateTime}</strong> at <strong>${booking.bookingTime}</strong>. Please arrive on time for your scheduled appointment.</p>

            <div class="alert-box">
              <p class="alert-title">⏰ Important: Punctuality Policy</p>
              <p class="alert-text">
                Please arrive on time for your appointment. If you arrive <strong>more than 15 minutes late</strong> after your scheduled appointment time, a penalty fee of <strong>₦5,000</strong> will be charged. We appreciate your understanding and cooperation.
              </p>
            </div>

            <div class="info-box">
              <p class="info-title">📋 Medical History Requirement</p>
              <p class="info-text">
                As part of our policy, you will be asked to complete a brief medical questionnaire before your treatment. This helps us ensure your safety and provide the best possible service tailored to your needs. Please review our full policy <a href="${TH_BEAUTY}/policy" style="color:#0c5460;font-weight:600;">here</a>.
              </p>
            </div>

            <p style="margin-top:20px;">If you need to reschedule or have any questions about your appointment, please contact us as soon as possible.</p>

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
