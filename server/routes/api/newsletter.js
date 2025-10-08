const express = require('express');
const router = express.Router();
const multer = require('multer');
const keys = require('../../config/keys');

const mailchimp = require('../../services/mailchimp');
const mailgun = require('../../services/mailgun');
const emailService = require('../../services/emailService');
const Newsletter = require('../../models/newsletter');
const Campaign = require('../../models/campaign');
const Product = require('../../models/product');
const productCount = require('../../models/productCount');
const Users = require('../../models/user');

const role = require('../../middleware/role');
const auth = require('../../middleware/auth');
const { ROLES } = require('../../constants');

const uploadType = keys.upload.type;
const cloudinaryFileStorage = require('../../utils/cloud_file_manager.js');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const { news, domain_unsubscribe } = keys.mailgun;


router.post('/unsubscribe/:email', async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ error: 'You must enter an email.' });
    }

    const findUser = await Newsletter.findOne({ email });

    if (!findUser) {
      return res.status(400).json({
        error:
          'No email address found for user!'
      });
    }
    if (!findUser.subscribed) {
      return res.status(400).json({
        error: "Not subscribed"
      })
    }
    const update = {
      $set: {
        subscribed: false,
      }
    }
    await Newsletter.findOneAndUpdate({ email }, update);

    const mailgunUpdate = await mailgun.updateMember(email, { subscribed: false });
    return mailgunUpdate && res.status(200).json({
      success: true,
      message:
        'Your changes are updated and you will no longer receive marketing emails from us'
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


router.get('/mailing_list_details',
  auth,
  role.check(ROLES.Admin),
  async (req, res) => {
    try {
      // fetch mailing list
      const opendEmailDetails = await mailgun.getAnalyticsData();
      const mailingListDetails = await mailgun.getMailingListMembersCount();
      const mailingListSubscribers = await mailgun.getMailingListDetails();
      let opened = 0;
      if (opendEmailDetails && opendEmailDetails.totalOpens) {
        opened = opendEmailDetails.totalOpens
      }
      return res.status(200).json({
        success: true,
        data: {
          members: mailingListDetails,
          subscribed: mailingListSubscribers,
          opens: opened,
        }
      })
    } catch (error) {
      return res.status(400).json({
        error: 'Error fetching mailing list details Please try again.'
      });
    }
  })


router.get('/subscribers',
  auth,
  role.check(ROLES.Admin),
  async (req, res) => {
    try {
      const subscribers = await Newsletter.find({ subscribed: true })
        .select('email created')
        .sort({ created: -1 });

      const subscribersWithUserData = await Promise.all(
        subscribers.map(async (subscriber) => {
          const user = await Users.findOne({ email: subscriber.email })
            .select('firstName lastName');

          return {
            _id: subscriber._id,
            email: subscriber.email,
            name: user ? `${user.firstName} ${user.lastName}` : null,
            created: subscriber.created
          };
        })
      );

      return res.status(200).json({
        success: true,
        subscribers: subscribersWithUserData
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Error fetching subscribers. Please try again.'
      });
    }
  })


router.post('/subscribe', async (req, res) => {
  try {
    let email = req.body.email;

    if (!email) {
      return res.status(400).json({ error: 'You must enter an email address.' });
    }

    email = email.trim().toLowerCase();

    // Check if email is valid
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validEmail = regex.test(email);
    if (!validEmail) {
      return res.status(400).json({ error: 'Use a valid email next time' });
    }

    // Check if email already exists and user is subscribed
    const existingEmail = await Newsletter.findOne({ email });
    if (existingEmail && existingEmail.subscribed) {
      return res
        .status(400)
        .json({ error: 'You have already subscribed to the newsletter' });
    } else if (existingEmail && !existingEmail.subscribed) {
      await Newsletter.findOneAndUpdate({ email }, { $set: { subscribed: true } });
      const mailgunUpdate = await mailgun.updateMember(email, { subscribed: true });

      return mailgunUpdate && res
        .status(200)
        .json({
          success: true,
          message: 'You have successfully subscribed to the newsletter',
        })
    }

    // Save the new email to the database
    const news = new Newsletter({
      email: email,
    });
    await news.save();

    // Add user email to Mailgun mailing list
    const sm = email.split('@')[0];
    let name = sm.charAt(0).toUpperCase() + sm.slice(1)
    name = name.replace(/[^a-zA-z]/g, '')
    await mailgun.createMember(email, name, '');

    // Send subscription confirmation email
    await emailService.sendEmail(email, 'newsletter-subscription', null);

    return res.status(200).json({
      success: true,
      message: 'You have successfully subscribed to the newsletter',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'An error occurred while processing your subscription. Please try again later.',
    });
  }
});



// return all created campaign message
router.get('/', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const camp = await Campaign.find().sort({ created: -1 });
    const keys = ['discounted_products', 'best_selling_products', 'new_arrivals'];

    keys.forEach((key) => {
      if (camp[key] && Array.isArray(camp[key])) {
        // Parse each JSON string in the array into an object
        camp[key] = camp[key].map((item) => {
          try {
            return JSON.parse(item);
          } catch (error) {
            return null;
          }
        }).filter(Boolean); // Remove any null values (failed parsing)
      }
    });

    return res.status(200).json({
      success: true,
      campaigns: camp
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Error fetching campaigns Please try again.'
    });
  }
});


// return a campaign message
router.get('/:campaignId', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const id = req.params.campaignId
    const camp = await Campaign.findById(id);
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
    return res.status(200).json({
      success: true,
      campaign: camp
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Error fetching campaign Please try again.'
    });
  }
});


// deletes a campaign
router.delete('/delete/:id', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const campaign = await Campaign.deleteOne({ _id: req.params.id });

    return res.status(200).json({
      success: true,
      message: `Campaign has been deleted successfully!`,
      campaign
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Error deleting campaign Please try again.'
    });
  }
})


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

      const mailingListEmails = await mailgun.fetchMembers(); // fetch members from newsletter
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
              unsubscribe_link: `${domain_unsubscribe}/${cBase}`,
              name: name,
            },
          })
        }
      }
      if (suppressedList.length > 0) {
        // create multiple members
        await mailgun.createMembers(suppressedList);
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
          type: 'newsletter-specified',
          data: camp
        }))
        await emailService.sendBulkEmails(emailObject)
        await Campaign.findOneAndUpdate({ _id: camp._id }, { sent: true })
        return res.status(200).json({
          success: true,
          message: `sent!!`,
        });
      } else {
        await emailService.sendEmail(news, 'newsletter', camp);
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


/**
 * sends email
 */
/*const mailGunSender = async(emailList, campaign) => {
  try {
    const emailLength = emailList.length;

    if (emailLength === 0) {
      throw new Error('No emails to send.');
    }

    const batchSize = 1000;
    const doubleEmailList = [];

    for (let i = 0; i < emailList.length; i += batchSize) {
      doubleEmailList.push(emailList.slice(i, i + batchSize));
    }

    await sendEmailBatch(doubleEmailList, campaign)
  } catch (error) {
    throw new Error (error)
  }
}

const sendEmailBatch = async (batch, campaign) => {
  for (const list of batch) {
    let emailJSON = {}
    for (const c of list) {
      const e_mail = Object.keys(c)
      emailJSON[e_mail] = c[e_mail]
    }
    await mailgun.sendEmail(emailJSON, 'newsletter', campaign)
  }
  await Campaign.findOneAndUpdate({ _id: campaign._id }, { sent: true })
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}; */


// create and store a caomapign message to db
router.post('/create',
  auth,
  role.check(ROLES.Admin),
  upload.single('image'),
  async (req, res) => {
    try {
      const {
        heading, subHeading,
        isBestSellingSelected, isDiscountedSelected,
        isNewArrivalsSelected, footer, links,
      } = req.body;
      const image = req.file;

      if (!heading || !subHeading) {
        return res
          .status(400)
          .json({ error: 'You must enter heading & sub heading.' });
      }

      let imageUrl, imageKey = null;
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

      if (isBestSellingSelected === 'true') {
        // grab best selling products
        bestSellingProducts = await fetchBestSelling()
      }
      if (isDiscountedSelected === 'true') {
        const fetchDiscount = await fetchDiscounted()
        discountedProducts = fetchDiscount;
      }
      if (isNewArrivalsSelected === 'true') {
        const newA = await fetchNewArrivals()
        newArrivals = newA
      }
      const newCampaign = new Campaign({
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


/**
 * generates unique code
 */
const generateUniqueCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //const characters = '0123456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code
}


/**
 * 
 */
const fetchDiscounted = async () => {
  const products = await Product.find().sort({ discountPrice: -1 }).limit(4)
  const res = []
  for (const items of products) {
    res.push(JSON.stringify(items))
  }
  if (res) { return res }
}


/**
 * 
 */
const fetchNewArrivals = async () => {
  const newArrivals = await Product.find().sort({ created: -1 }).limit(4);
  const res = []
  for (const items of newArrivals) {
    res.push(JSON.stringify(items))
  }
  if (res) { return res }
}


/**
 * 
 * @returns 
 */
const fetchBestSelling = async () => {
  const products = await productCount.find();

  // Group products and sum up count and boughtCount
  const productMap = new Map();
  products.forEach(product => {
    const productId = product.product.toString();
    if (!productMap.has(productId)) {
      productMap.set(productId, {
        product: product.product,
        count: product.count,
        boughtCount: product.boughtCount
      });
    } else {
      const existingProduct = productMap.get(productId);
      existingProduct.count += product.count;
      existingProduct.boughtCount += product.boughtCount;
    }
  });
  const groupedProducts = Array.from(productMap.values());

  // Sort by count in descending order
  let newProduct = groupedProducts.sort((a, b) => b.count - a.count);

  // Fetch product details
  let fetchedProducts = [];
  for (const item of newProduct) {
    const tempProduct = await Product.findById(item.product);
    if (tempProduct && tempProduct.isActive) {
      fetchedProducts.push({
        ...tempProduct.toObject(),
        count: item.count,
        boughtCount: item.boughtCount
      });
    }
  }

  // here we want to return 4 products as best selling
  // otherwise return 4 recent products, if products bought
  // hasn't added up to 4 different ones
  if (fetchedProducts.length >= 4) {
    fetchedProducts = fetchedProducts.slice(0, 4)
  } else {
    const products = await Product.find().limit(4);
    fetchedProducts = products
  }

  const res = []
  for (const items of fetchedProducts) {
    res.push(JSON.stringify(items))
  }
  if (res) { return res }
};

module.exports = router;
