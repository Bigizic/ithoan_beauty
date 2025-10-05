exports.adminBookingConfirmation = (booking) =>
`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>New Booking Notification</title>
<style>
body{background-color:#f4f4f4;margin:0;padding:0;font-family:Arial,sans-serif;}
table{border-collapse:collapse;}
.email-container{max-width:600px;margin:0 auto;background-color:#ffffff;}
.header{background-color:#1c1c1c;padding:20px;text-align:center;color:#ffffff;}
.content{padding:30px;}
h1{color:#1c1c1c;font-size:24px;margin:0 0 20px;}
p{color:#333;font-size:14px;line-height:22px;margin:0 0 10px;}
.booking-details{background-color:#f9f9f9;border:1px solid #e0e0e0;border-radius:8px;padding:20px;margin:20px 0;}
.detail-row{padding:8px 0;border-bottom:1px solid #e0e0e0;}
.detail-row:last-child{border-bottom:none;}
.detail-label{font-weight:600;color:#666;width:150px;display:inline-block;}
.detail-value{color:#1c1c1c;}
.alert{background-color:#eabe30;color:#1c1c1c;padding:15px;border-radius:5px;margin:20px 0;font-weight:600;}
.footer{background-color:#f4f4f4;padding:15px;text-align:center;font-size:12px;color:#666;}
</style>
</head>
<body>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0">
  <tr>
    <td align="center" style="padding:20px 0;">
      <table role="presentation" class="email-container" width="600" cellspacing="0" cellpadding="0">
        <tr>
          <td class="header">
            <h1 style="color:#ffffff;margin:0;">New Booking Received</h1>
          </td>
        </tr>
        <tr>
          <td class="content">
            <div class="alert">
              A new booking has been made and payment has been received!
            </div>

            <div class="booking-details">
              <div class="detail-row">
                <span class="detail-label">Booking ID:</span>
                <span class="detail-value">#${booking.bookingHash}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Customer Name:</span>
                <span class="detail-value">${booking.customerInfo.fullName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Customer Email:</span>
                <span class="detail-value">${booking.customerInfo.email}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Customer Phone:</span>
                <span class="detail-value">${booking.customerInfo.phoneNumber}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Service:</span>
                <span class="detail-value">${booking.serviceName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Sub-Service:</span>
                <span class="detail-value">${booking.subServiceName}</span>
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
              <div class="detail-row">
                <span class="detail-label">Booked On:</span>
                <span class="detail-value">${new Date(booking.created).toLocaleString()}</span>
              </div>
            </div>

            <p style="margin-top:20px;">
              Please reach out to the customer to confirm the appointment details.
            </p>
          </td>
        </tr>
        <tr>
          <td class="footer">
            <p>Tohanniees Skincare Admin Notification</p>
            <p>&copy; ${new Date().getFullYear()} Tohanniees Skincare</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>
`
