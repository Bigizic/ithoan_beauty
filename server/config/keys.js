module.exports = {
  app: {
    name: 'TOHANNIEES SKINCARE',
    apiURL: `${process.env.BASE_API_URL}`,
    clientURL: process.env.CLIENT_URL
  },
  port: process.env.PORT || 3000,
  database: {
    HOST: process.env.MONGO_HOST,
    PORT: process.env.MONGO_PORT,
    NAME: process.env.MONGO_DB_NAME,
    USER: process.env.MONGO_USER,
    PASS: process.env.MONGO_USER_PASS,
    AUTH_SOURCE: process.env.MONGO_AUTH_SOURCE,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    tokenLife: '7d'
  },
  mailchimp: {
    key: process.env.MAILCHIMP_KEY,
    listKey: process.env.MAILCHIMP_LIST_KEY
  },
  mailgun: {
    key: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN,
    sender: process.env.MAILGUN_EMAIL_SENDER,
    support: process.env.MAILGUN_EMAIL_SUPPORT,

    host: process.env.HOST,

    order: process.env.MAILGUN_EMAIL_ORDER_SENDER,
    security: process.env.MAILGUN_EMAIL_SECURITY_SENDER,
    auth: process.env.MAILGUN_EMAIL_AUTH_SENDER,
    management: process.env.MAILGUN_EMAIL_MANAGEMENT_SENDER,
    mailingKey: process.env.MAILGUN_ACCOUNT_KEY,

    news: process.env.MAILGUN_EMAIL_NEWS_SENDER,
    test_news: process.env.MAILGUN_EMAIL_TEST_NEWS,
    domain_unsubscribe: process.env.MAILGUN_DOMAIN_UNSUBSCRIBE,
    domain_beauty_unsubscribe: process.env.MAILGUN_BEAUY_DOMAIN_UNSUBSCRIBE,
    
    booking: process.env.MAILGUN_BOOKING_EMAIL,
    beautyNews: process.env.MAILGUN_BEAUTY_NEWS_EMAIL
  },
  adminEmail: {
    adminEmail: process.env.ADMIN_EMAIL,
    secondAdminEmail: process.env.TEMP_ADMIN_EMAIL
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucketName: process.env.AWS_BUCKET_NAME
  },
  // 2-12-24
  cloudinary: {
    homeDir: process.env.CLOUDINARY_HOME_DIR,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecretKey: process.env.CLOUDINARY_API_SECRET_KEY,
  },
  upload: {
    type: process.env.UPLOAD_TYPE,
  },
  paystack: {
    apiSecretKey: process.env.PAYSTACK_SECRET_KEY
  }
};
