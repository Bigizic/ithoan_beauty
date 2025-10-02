export const API_URL = process.env.API_URL;
export const PAYSTACK_KEY = process.env.PAYSTACK_PUBLIC_KEY;
export const OPEN_EXCHANGE_API_KEY = process.env.OPEN_EXCHANGE_RATES_KEY;
export const STORE_NAME = "Tohanniees Skincare"
export const CURRENCY = "₦"
export const TH_BEAUTY_LINK="https://beauty.tohannieesskincare.com";
export const INSTAGRAM_LINK="https://www.instagram.com/tohanniees_skincare";
export const SNAPCHAT_LINK="https://snapchat.com/t/VE8G18OV";
export const WHATSAPP_URL="https://wa.me/2349077692506";

export const SOCKET_URL =
  window.location.host.indexOf('localhost') >= 0
    ? 'http://127.0.0.1:3000'
    : window.location.host;

export const ROLES = {
  Admin: 'ROLE ADMIN',
  Member: 'ROLE MEMBER',
  Merchant: 'ROLE MERCHANT'
};

export const CART_ITEMS = 'cart_items';
export const CART_TOTAL = 'cart_total';
export const CART_ID = 'cart_id';

export const CART_ITEM_STATUS = {
  Processing: 'Processing',
  Shipped: 'Shipped',
  Delivered: 'Delivered',
  Cancelled: 'Cancelled',
  Not_processed: 'Not processed'
};

export const MERCHANT_STATUS = {
  Rejected: 'Rejected',
  Approved: 'Approved',
  Waiting_Approval: 'Waiting Approval'
};

export const REVIEW_STATUS = {
  Rejected: 'Rejected',
  Approved: 'Approved',
  Waiting_Approval: 'Waiting Approval'
};

export const EMAIL_PROVIDER = {
  Email: 'Email',
  Google: 'Google',
  Facebook: 'Facebook'
};
