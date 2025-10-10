const express = require('express');
const router = express.Router();
const multer = require('multer');
const Newsletter = require('../../models/beauty_newsletter');
const Users = require('../../models/user');
const emailService = require('../../services/emailService');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const { ROLES } = require('../../constants');
const keys = require('../../config/keys');
const cloudinaryFileStorage = require('../../utils/cloud_file_manager.js');
const Campaign = require('../../models/campaign')
const uploadType = keys.upload.type;
const storage = multer.memoryStorage();
const upload = multer({ storage });
const mailgun = require('../../services/mailgun');
const { news, domain_beauty_unsubscribe, beautyNews } = keys.mailgun;

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// sends campaign
router.post('/send',
  auth,
  role.check(ROLES.Admin),
  async (req, res) => {

    try {
      const { campaignId, newsletterSelected, userSelected, specificEmails = [] } = req.body;

      let fetchedUsers = [], fetchedNewsLetter = [], specificEmailList = [];

      // fetch users if users is selected
      if (userSelected.userSelected) { fetchedUsers = await Users.find() }

      if (newsletterSelected.newsletterSelected) { fetchedNewsLetter = await Newsletter.find() }

      // handle specific emails
      if (specificEmails && specificEmails.length > 0) {
        specificEmailList = specificEmails.filter(email => {
          const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return regex.test(email);
        });
      }

      // fetch campaign data
      const camp = await Campaign.findById(campaignId);
      const keys = ['discounted_products', 'best_selling_products', 'new_arrivals'];

      keys.forEach((key) => {
        if (camp[key] && Array.isArray(camp[key])) {
          camp[key] = camp[key].map((item) => {
            try {
              return JSON.parse(item);
            } catch (error) {
              return null;
            }
          }).filter(Boolean);
        }
      });

      const emails = [
        ...fetchedNewsLetter.map((item) => item.email),
        ...fetchedUsers.map((item) => item.email),
        ...specificEmailList
      ]

      // to avoid duplicates
      const newEmails = []
      for (const email of emails) {
        if (newEmails.includes(email)) {
          continue
        } else { newEmails.push(email) }
      }

      // create receipients variables
      /*let emailsList = [];
      newEmails.forEach((email, index) => {
        emailsList.push(
          {
            [email]: { unique_id: index * 2 }
          }
        )
      })*/
      // fetch mailing list from mailgun and compare my mailing list emails
      // with newEmails, fetch emails from newEmails that don't exist in mailing list email
      // add the new emails to mailing list then send email, if no new user to add to mailing
      // list, skip the entire adding to mailing list

      const mailingListEmails = await mailgun.fetchMembers(beautyNews); // fetch members from newsletter
      const suppressedList = []
      for (const c of newEmails) {
        if (mailingListEmails.includes(c)) {
          continue // if your email is in the members of the newsletter pass
        } else { // otherwise create your profile to the newsletter
          const sm = c.split('@')[0];
          let name = sm.charAt(0).toUpperCase() + sm.slice(1)
          name = name.replace(/[^a-zA-z]/g, '')
          const cBase = Buffer.from(c).toString('base64');
          suppressedList.push({
            address: c,
            name: name,
            subscribed: true,
            vars: {
              unsubscribe_link: `${domain_beauty_unsubscribe}/${cBase}`,
              name: name,
            },
          })
        }
      }
      if (suppressedList.length > 0) {
        // create multiple members
        await mailgun.createMembers(suppressedList, beautyNews);
      }


      // send receipients to mailgun
      // check if length of emailsJson > 1000 as mailgun process
      // 1000 emails at once
      // await mailGunSender(emailsList, camp)
      // await mailgun.sendEmail(news, 'newsletter', camp)
      if (specificEmailList.length > 0) // send to specified user or users not mailing list
      {
        const emailObject = specificEmailList.map((i) => ({
          email: i,
          type: 'beauty-newsletter-specified',
          data: camp
        }))
        await emailService.sendBulkEmails(emailObject)
        await Campaign.findOneAndUpdate({ _id: camp._id }, { sent: true })
        return res.status(200).json({
          success: true,
          message: `sent!!`,
        });
      } else {
        await emailService.sendEmail(beautyNews, 'beauty-newsletter', camp);
        await Campaign.findOneAndUpdate({ _id: camp._id }, { sent: true })
        return res.status(200).json({
          success: true,
          message: `sent!!`,
        });
      }

    } catch (error) {
      return res.status(400).json({
        error: 'Error sending campaign Please try again.'
      })
    }
  })

// create and store a caomapign message to db
router.post('/create',
  auth,
  role.check(ROLES.Admin),
  upload.single('image'),
  async (req, res) => {
    try {
      const {
        type = 'beauty', heading, subHeading,
        isBestSellingSelected, isDiscountedSelected,
        isNewArrivalsSelected, footer, links,
      } = req.body;
      const image = req.file;

      if (!heading || !subHeading) {
        return res
          .status(400)
          .json({ error: 'You must enter heading & sub heading.' });
      }

      let imageUrl = null, imageKey = null;
      let bestSellingProducts = [], discountedProducts = [], newArrivals = [];
      if (image) {
        if (uploadType === 'cloud_storage' && image) {
          try {
            const result = await cloudinaryFileStorage(image, 'email/')
            imageUrl = result.imageUrl;
            imageKey = result.imageKey;
          } catch (error) {
            return res.status(400).json({
              error: 'Error uploading image Please try again.'
            })
          }
        } else if (image) {
          const { imageUrl: s3ImageUrl, imageKey: s3ImageKey } = await s3Upload(image);
          imageUrl = s3ImageUrl;
          imageKey = s3ImageKey;
        }
      }
      const newCampaign = new Campaign({
        type,
        heading,
        sub_heading: subHeading,
        footer,
        links,
        imageUrl,
        imageKey,
        best_selling_products: bestSellingProducts,
        discounted_products: discountedProducts,
        new_arrivals: newArrivals,
      });

      const savedCampaign = await newCampaign.save();

      return res.status(200).json({
        success: true,
        message: 'Campaign has been created successfully!, You can preview and send it',
        campaign: savedCampaign
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Error creating campaign Please try again.'
      });
    }
  });

router.post('/send-otp', async (req, res) => {
  try {
    let email = req.body.email;

    if (!email) {
      return res.status(400).json({ error: 'You must enter an email address.' });
    }

    email = email.trim().toLowerCase();

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validEmail = regex.test(email);
    if (!validEmail) {
      return res.status(400).json({ error: 'Use a valid email next time' });
    }

    const existingEmail = await Newsletter.findOne({ email, type: 'beauty' });
    if (existingEmail && existingEmail.subscribed) {
      return res.status(400).json({ error: 'You have already subscribed to the newsletter' });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    if (existingEmail && !existingEmail.subscribed) {
      existingEmail.otp = otp;
      existingEmail.otpExpiry = otpExpiry;
      await existingEmail.save();
    } else {
      const newsletter = new Newsletter({
        email,
        type: 'beauty',
        subscribed: false,
        otp,
        otpExpiry
      });
      await newsletter.save();
    }

    await emailService.sendEmail(email, 'beauty-newsletter-otp', { otp });

    return res.status(200).json({
      success: true,
      message: 'OTP sent to your email'
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({
      error: 'An error occurred while processing your request. Please try again later.'
    });
  }
});

router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const newsletter = await Newsletter.findOne({ email: trimmedEmail, type: 'beauty' });

    if (!newsletter) {
      return res.status(400).json({ error: 'Email not found' });
    }

    if (newsletter.subscribed) {
      return res.status(400).json({ error: 'You are already subscribed' });
    }

    if (!newsletter.otp || !newsletter.otpExpiry) {
      return res.status(400).json({ error: 'No OTP found. Please request a new one' });
    }

    if (new Date() > newsletter.otpExpiry) {
      return res.status(400).json({ error: 'OTP has expired. Please request a new one' });
    }

    if (newsletter.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    newsletter.subscribed = true;
    newsletter.otp = undefined;
    newsletter.otpExpiry = undefined;
    newsletter.updated = new Date();
    await newsletter.save();

    // Add user email to Mailgun mailing list
    const sm = email.split('@')[0];
    let name = sm.charAt(0).toUpperCase() + sm.slice(1)
    name = name.replace(/[^a-zA-z]/g, '')
    await mailgun.createMember(email, name, '', beautyNews);

    await emailService.sendEmail(trimmedEmail, 'beauty-newsletter-welcome', null);

    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed to the newsletter'
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({
      error: 'An error occurred while verifying OTP. Please try again later.'
    });
  }
});

router.post('/unsubscribe/:email', async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ error: 'You must enter an email.' });
    }

    const findUser = await Newsletter.findOne({ email, type: 'beauty' });

    if (!findUser) {
      return res.status(400).json({
        error: 'No email address found for user!'
      });
    }

    if (!findUser.subscribed) {
      return res.status(400).json({
        error: "Not subscribed"
      });
    }

    const update = {
      $set: {
        subscribed: false,
      }
    };
    await Newsletter.findOneAndUpdate({ email, type: 'beauty' }, update);

    return res.status(200).json({
      success: true,
      message: 'Your changes are updated and you will no longer receive marketing emails from us'
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.get('/subscribers',
  auth,
  role.check(ROLES.Admin),
  async (req, res) => {
    try {
      const subscribers = await Newsletter.find({ subscribed: true, type: 'beauty' })
        .select('email created')
        .sort({ created: -1 });

      return res.status(200).json({
        success: true,
        subscribers
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Error fetching subscribers. Please try again.'
      });
    }
  }
);

module.exports = router;
