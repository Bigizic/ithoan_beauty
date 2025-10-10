const Bull = require('bull');
const Redis = require('ioredis');
const mailgun = require('../services/mailgun');

// Create Redis connection
const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: 3,
  retryDelayOnFailover: 100,
  enableReadyCheck: false,
  lazyConnect: true,
});

// Create email queue
const emailQueue = new Bull('email queue', {
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
  },
  defaultJobOptions: {
    removeOnComplete: 10,
    removeOnFail: 5,
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
  },
});

// Process email jobs
emailQueue.process('send-email', async (job) => {
  const { email, type, data, selectedProductsLength } = job.data;
  
  try {
    //console.log(`Processing email job: ${type} to ${email}`);
    
    // Call the mailgun service to send email
    const result = await mailgun.sendEmail(email, type, data, selectedProductsLength);
    
    //console.log(`Email sent successfully: ${type} to ${email}`);
    return result;
  } catch (error) {
    //console.error(`Failed to send email: ${type} to ${email}`, error);
    throw error;
  }
});

// Add job to queue
const addEmailJob = async (email, type, data, selectedProductsLength = null) => {
  try {
    const jobData = {
      email,
      type,
      data,
      selectedProductsLength
    };

    const job = await emailQueue.add('send-email', jobData, {
      priority: getEmailPriority(type),
      delay: getEmailDelay(type),
    });

    //console.log(`Email job added to queue: ${type} to ${email}, Job ID: ${job.id}`);
    return job;
  } catch (error) {
    //console.error('Failed to add email job to queue:', error);
    throw error;
  }
};

// Get email priority based on type
const getEmailPriority = (type) => {
  const priorities = {
    'reset': 1, // Highest priority
    'signin': 2,
    'signup': 2,
    'order-confirmation': 3,
    'admin-order-confirmation': 3,
    'update-order': 4,
    'order-products-update': 4,
    'order-address-change': 4,
    'newsletter': 1,
    'newsletter-specified': 1,
    'contact': 5,
    'merchant-application': 6,
    'merchant-signup': 3,
    'merchant-welcome': 4,
    'merchant-deactivate-account': 4,
    'newsletter-subscription': 7,
    'reset-confirmation': 2,
    'admin-contact': 3,

    'beauty-newsletter-otp': 1,
    'admin-booking-confirmation': 3,
    'booking-confirm': 2,
    'booking-confirmation': 3,
    'beauty-newsletter-specified': 1,
    'beauty-newsletter': 1,
    'beauty-newsletter-welcome': 1
  };

  return priorities[type] || 5; // Default priority
};

// Get email delay based on type
const getEmailDelay = (type) => {
  const delays = {
    'newsletter': 100, // 100 mmsecond delay for newsletters
    'contact': 1000, // 1 second delay for contact emails
    'merchant-application': 2000, // 2 second delay
  };
  
  return delays[type] || 0; // No delay by default
};

// Queue event listeners
emailQueue.on('completed', (job, result) => {
  //console.log(`Email job completed: ${job.id}`);
});

emailQueue.on('failed', (job, err) => {
  //console.error(`Email job failed: ${job.id}`, err);
});

emailQueue.on('stalled', (job) => {
  //console.warn(`Email job stalled: ${job.id}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Shutting down email worker...');
  await emailQueue.close();
  await redis.disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('Shutting down email worker...');
  await emailQueue.close();
  await redis.disconnect();
  process.exit(0);
});

module.exports = {
  emailQueue,
  addEmailJob
};