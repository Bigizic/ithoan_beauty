const router = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const addressRoutes = require('./address');
const newsletterRoutes = require('./newsletter');
const productRoutes = require('./product');
const categoryRoutes = require('./category');
const brandRoutes = require('./brand');
const contactRoutes = require('./contact');
const merchantRoutes = require('./merchant');
const cartRoutes = require('./cart');
const orderRoutes = require('./order');
const reviewRoutes = require('./review');
const wishlistRoutes = require('./wishlist');
const bannerRoutes = require('./banner');
const currencyRate = require('./currency_rates');
const currencyRoute = require('./currency');
const productCount = require('./productCount');
const adminAccountBank = require('./account');
const websiteVisit = require('./visit');
const settings = require('./setting');
const getServerStatus = require('./status');
const queueRoutes = require('./queue');
const servicesRoute = require('./services');
const serviceRoute = require('./service');
const bookingRoute = require('./booking');
const surveyRoute = require('./survey');
const newsletterBeautyRoutes = require('./newsletter_beauty');

// api status
router.use('/status', getServerStatus)

// auth routes
router.use('/auth', authRoutes);

// user routes
router.use('/user', userRoutes);

// address routes
router.use('/address', addressRoutes);

// newsletter routes
router.use('/newsletter', newsletterRoutes);

// product routes
router.use('/product', productRoutes);

// category routes
router.use('/category', categoryRoutes);

// brand routes
router.use('/brand', brandRoutes);

// contact routes
router.use('/contact', contactRoutes);

// merchant routes
router.use('/merchant', merchantRoutes);

// cart routes
router.use('/cart', cartRoutes);

// order routes
router.use('/order', orderRoutes);

// Review routes
router.use('/review', reviewRoutes);

// Wishlist routes
router.use('/wishlist', wishlistRoutes);

// banner routes
router.use('/banner', bannerRoutes);

// currency Rate Route
router.use('/currency_rate', currencyRate);

// Currency Route
router.use('/currency', currencyRoute);

// product count
router.use('/product_count', productCount);

// banks route
router.use('/admin_account_bank', adminAccountBank);

// website visit route
router.use('/visit', websiteVisit);

// maintenance mode route
router.use('/setting', settings);

// email queue management routes
router.use('/queue', queueRoutes);

// services route
router.use('/services', servicesRoute);

// service route
router.use('/service', serviceRoute);

// booking routes
router.use('/booking', bookingRoute);

// survey routes
router.use('/survey', surveyRoute);

// beauty newsletter routes
router.use('/newsletter/beauty', newsletterBeautyRoutes);

module.exports = router;
