exports.bookingConfirmation = (booking) =>
`
<!DOCTYPE html>
<html lang="en" dir="ltr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" style="color-scheme:light dark;supported-color-schemes:light dark;">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width,initial-scale=1 user-scalable=yes">
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
<title>Booking Confirmation</title>
<style>
body{background-color:#f4f4f4;margin:0;padding:0;}
table{border-collapse:collapse;}
.email-container{max-width:600px;margin:0 auto;background-color:#ffffff;}
.header{background-color:#eabe30;padding:30px;text-align:center;}
.header img{width:100px;height:100px;border-radius:50%;}
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
            <img src="https://res.cloudinary.com/dduai6ryd/image/upload/v1736088530/ithoan/images/logo/business_logo.png" alt="Tohanniees Skincare Logo">
          </td>
        </tr>
        <tr>
          <td class="content">
            <h1>Booking Confirmed!</h1>
            <p>Hi ${booking.customerInfo.fullName},</p>
            <p>Thank you for booking with <strong>Tohanniees Skincare</strong>. Your appointment has been confirmed.</p>

            <div class="booking-details">
              <div class="detail-row">
                <span class="detail-label">Booking Number:</span>
                <span class="detail-value">#${booking._id}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Service:</span>
                <span class="detail-value">${booking.serviceName} - ${booking.subServiceName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Appointment Date:</span>
                <span class="detail-value">${new Date(booking.bookingDate).toDateString()}</span>
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

            <p>We've received your payment and your appointment is confirmed. We look forward to seeing you!</p>

            <center>
              <a href="https://beauty.tohannieesskincare.com" class="button">View Services</a>
            </center>

            <p style="margin-top:30px;font-size:14px;color:#666;">
              Questions? Contact us at
              <a href="mailto:support@tohannieesskincare.com" style="color:#eabe30;">support@tohannieesskincare.com</a>
              or WhatsApp us at
              <a href="https://wa.me/2349077692506" style="color:#eabe30;">+234 907 769 2506</a>
            </p>
          </td>
        </tr>
        <tr>
          <td class="footer">
            <p>Tohanniees Skincare &copy; ${new Date().getFullYear()}</p>
            <p>
              <a href="https://www.instagram.com/tohanniees_skincare" style="color:#eabe30;text-decoration:none;">Instagram</a> |
              <a href="https://tohannieesskincare.com" style="color:#eabe30;text-decoration:none;">Website</a>
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