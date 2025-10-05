const { orderSuccess } = require("./htmlTemplates/orderSuccess");
const { adminOrderSuccess } = require("./htmlTemplates/adminOrderSuccess");
const { campaignTemplate } = require("./htmlTemplates/newsletterTemplate");
const { orderUpdate } = require("./htmlTemplates/orderUpdate");
const { orderProductsUpdate } = require("./htmlTemplates/orderProductsUpdate");
const { orderShippingInfoUpdate } = require("./htmlTemplates/orderShippingInfoUpdate");
const { bookingConfirmation } = require("./htmlTemplates/bookingConfirmation");
const { adminBookingConfirmation } = require("./htmlTemplates/adminBookingConfirmation");
const { bookingConfirm } = require("./htmlTemplates/bookingConfirm"); 


exports.newsLetterEmail = (campaignData) => {
  const message = {
    subject: campaignData.heading,
    text: campaignData.heading,
    html: campaignTemplate(campaignData),
    headers: { 'Content-Type': 'text/html' },
  }
  return message
}


exports.resetEmail = (host, resetToken) => {
  const message = {
    subject: 'Reset Password',
    text:
      `${
        'You are receiving this because you have requested to reset your password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' 
      }${host}/reset-password/${resetToken}\n\n` +
      `If you did not request this, please ignore this email and your password will remain unchanged.\n`
  };

  return message;
};

exports.confirmResetPasswordEmail = () => {
  const message = {
    subject: 'Password Changed',
    text:
      `You are receiving this email because you changed your password. \n\n` +
      `If you did not request this change, please contact us immediately.`
  };

  return message;
};

exports.merchantSignup = (host, { resetToken, email }) => {
  const message = {
    subject: 'Merchant Registration',
    text: `${
      'Congratulations! Your application has been accepted. Please complete your Merchant account signup by clicking on the link below. \n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      'http://'
    }${host}/merchant-signup/${resetToken}?email=${email}\n\n`
  };

  return message;
};

exports.merchantWelcome = name => {
  const message = {
    subject: 'Merchant Registration',
    text:
      `Hi ${name}! Congratulations! Your application for merchant account has been accepted. \n\n` +
      `It looks like you already have a member account with us. Please sign in with your member credentials and you will be able to see your merchant account.`
  };

  return message;
};

exports.signinEmail = user => {
  const message = {
    subject: 'Sucessful Sigin ',
    text: `Hi ${user.firstName} ${user.lastName}! you've successfully signed in!. If this wasn't you please let us know`
  };

  return message;
}

exports.signupEmail = name => {
  const message = {
    subject: 'Account Registration',
    text: `Hi ${name.firstName} ${name.lastName}! Thank you for creating an account with us!.`
  };

  return message;
};

exports.newsletterSubscriptionEmail = () => {
  const message = {
    subject: 'Newsletter Subscription',
    text:
      `You are receiving this email because you subscribed to our newsletter. \n\n` +
      `If you did not request this change, please contact us immediately.`
  };

  return message;
};

exports.contactEmail = () => {
  const message = {
    subject: 'Contact Us',
    text: `We received your message! Our team will contact you soon. \n\n`
  };

  return message;
};

exports.merchantApplicationEmail = () => {
  const message = {
    subject: 'Sell on MERN Store',
    text: `We received your request! Our team will contact you soon. \n\n`
  };

  return message;
};

exports.merchantDeactivateAccount = () => {
  const message = {
    subject: 'Merchant account on MERN Store',
    text:
      `Your merchant account has been disabled. \n\n` +
      `Please contact admin to request access again.`
  };

  return message;
};

exports.orderConfirmationEmail = order => {
  const message = {
    subject: `Order Confirmation #${order._id}`,
    text:
      `Hi ${order.user.firstName}! Thank you for your order!. \n\n`,
    html: orderSuccess(order),
    headers: { 'Content-Type': 'text/html' },
  };

  return message;
};

exports.adminOrderConfirmationEmail = order => {
  const message = {
    subject: `YOU HAVE A NEW ORDER #${order._id}`,
    text:
      `You Have A New Order \n\n`,
    html: adminOrderSuccess(order),
    headers: { 'Content-Type': 'text/html' },
  };

  return message;
}

exports.orderUpdateEmail = order => {
  let msg = null;
  if (order.status === 'Delivered' || order.status === 'Cancelled' || order.status === 'Shipped') {
    msg = `has been ${order.status}`
  } else if (order.status === 'Processing') {
    msg = `has been confirmed`
  } else {
    msg = `cannot be processed`
  }
  const message = {
    subject: `Update on your order #${order._id}`,
    text:`Hi ${order.user.firstName}!`,
    html: orderUpdate(order, `Hi ${order.user.firstName}! Your order ${msg}`),
    headers: { 'Content-Type': 'text/html' },
  };

  return message;
};

exports.orderProductsUpdateEmail = (order, selectedProductsLength) => {
  const message = {
    subject: `${selectedProductsLength} new ${selectedProductsLength > 1 ? "products" : "product"} added to your order!!`,
    text: `Hi ${order.user.firstName}!`,
    html: orderProductsUpdate(order, `${selectedProductsLength} new ${selectedProductsLength > 1 ? "products" : "product"} have been added to your order!`),
    headers: { 'Content-Type': 'text/html' }
  }
  return message;
}

  exports.orderShippingInfoUpdateEmail = (order) => {
    const message = {
      subject: `Your Order #${order._id} Shipping Info Has Changed!`,
      text: `Hi ${order.user.firstName}!`,
      html: orderShippingInfoUpdate(order),
      headers: { 'Content-Type': 'text/html' }
    }
    return message;
  }

exports.bookingConfirmationEmail = (booking) => {
  const message = {
    subject: 'Your Appointment is Confirmed!',
    text: `Hi ${booking.customerInfo.fullName}! Your appointment has been confirmed.`,
    html: bookingConfirmation(booking),
    headers: { 'Content-Type': 'text/html' }
  };
  return message;
};

exports.adminBookingConfirmationEmail = (booking) => {
  const message = {
    subject: `New Booking Received - #${booking.bookingHash}`,
    text: `New booking from ${booking.customerInfo.fullName}`,
    html: adminBookingConfirmation(booking),
    headers: { 'Content-Type': 'text/html' }
  };
  return message;
};

exports.bookingConfirmEmail = (booking) => {
  const message = {
    subject: 'Your Appointment is Confirmed!',
    text: `Hi ${booking.customerInfo.fullName}! Your appointment has been confirmed by our team.`,
    html: bookingConfirm(booking),
    headers: { 'Content-Type': 'text/html' }
  };
  return message;
};