const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const passport = require('passport');

const auth = require('../../middleware/auth');

// Bring in Models & Helpers
const User = require('../../models/user');
const Newsletter = require('../../models/newsletter');
const mailchimp = require('../../services/mailchimp');
const emailService = require('../../services/emailService');
const keys = require('../../config/keys');
const { EMAIL_PROVIDER, JWT_COOKIE } = require('../../constants');
const { OAuth2Client } = require('google-auth-library');
const { clientID } = keys.google
const client = new OAuth2Client(clientID);
const { secret, tokenLife } = keys.jwt;


/**
 * 
 * @param {*} token 
 * @returns 
 */
const verifyGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: clientID,
  });
  const payload = ticket.getPayload();
  return payload;
};


router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ error: 'You must enter an email address.' });
    }

    if (!password) {
      return res.status(400).json({ error: 'You must enter a password.' });
    }

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ error: 'No user found for this email address.' });
    }

    if (user && user.provider !== EMAIL_PROVIDER.Email) {
      return res.status(400).send({
        error: `That email address is already in use using ${user.provider} provider.`
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Password Incorrect'
      });
    }

    const payload = {
      id: user.id
    };

    const token = jwt.sign(payload, secret, { expiresIn: tokenLife });

    if (!token) {
      throw new Error();
    }

    await emailService.sendEmail(
      user.email,
      'signin',
      user
    );

    return res.status(200).json({
      success: true,
      token: `Bearer ${token}`,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.post('/register', async (req, res) => {
  try {
    let { email, firstName, lastName, password, isSubscribed, phoneNumber } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ error: 'You must enter an email address.' });
    }

    if (!firstName || !lastName) {
      return res.status(400).json({ error: 'You must enter your full name.' });
    }

    if (!password) {
      return res.status(400).json({ error: 'You must enter a password.' });
    }
    if (!phoneNumber) {
      return res.status(400).json({ error: 'You must enter a phone number.' });
    }

    email = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'That email address is already in use.' });
    }

    let subscribed = false;
    if (isSubscribed) {
      // add user to newsteller as they are subscribed
      const news = new Newsletter({
        email
      })
      await news.save();
      // also add user email to mailgun mailing list
      mailgun.createMember(email, firstName, lastName)
      subscribed = true;
    }

    const user = new User({
      email,
      password,
      firstName,
      lastName,
      phoneNumber
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    const registeredUser = await user.save();

    const payload = {
      id: registeredUser.id
    };

    await emailService.sendEmail(
      registeredUser.email,
      'signup',
      registeredUser
    );

    const token = jwt.sign(payload, secret, { expiresIn: tokenLife });

    return res.status(200).json({
      success: true,
      subscribed,
      token: `Bearer ${token}`,
      user: {
        id: registeredUser.id,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        email: registeredUser.email,
        role: registeredUser.role
      }
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.post('/forgot', async (req, res) => {
  try {
    let { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ error: 'You must enter an email address.' });
    }

    email = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(400)
        .send({ error: 'No user found for this email address.' });
    }

    // stops users that didn't register with email provider from resetting password
    if (existingUser && existingUser.provider !== EMAIL_PROVIDER.Email) {
      return res.status(400).send({
        error: `Your email cannot perfrom this action`
      });
    }

    const buffer = crypto.randomBytes(48);
    const resetToken = buffer.toString('hex');

    existingUser.resetPasswordToken = resetToken;
    existingUser.resetPasswordExpires = Date.now() + 3600000;

    await existingUser.save();

    await emailService.sendEmail(
      existingUser.email,
      'reset',
      resetToken,
    );

    return res.status(200).json({
      success: true,
      message: 'Please check your email for the link to reset your password.'
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.post('/reset/:token', async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'You must enter a password.' });
    }

    const resetUser = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!resetUser) {
      return res.status(400).json({
        error:
          'Your token has expired. Please attempt to reset your password again.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    resetUser.password = hash;
    resetUser.resetPasswordToken = undefined;
    resetUser.resetPasswordExpires = undefined;

    await resetUser.save();

    await emailService.sendEmail(resetUser.email, 'reset-confirmation', null);

    return res.status(200).json({
      success: true,
      message:
        'Password changed successfully. Please login with your new password.'
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// change password for logged in user when user goes to profile settings from frontend
router.post('/reset', auth, async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const email = req.user.email;

    if (!email) {
      return res.status(401).send('Unauthenticated');
    }

    if (!password) {
      return res.status(400).json({ error: 'You must enter a password.' });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ error: 'That email address is already in use.' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ error: 'Please enter your correct old password.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(confirmPassword, salt);
    existingUser.password = hash;
    await existingUser.save();

    await emailService.sendEmail(existingUser.email, 'reset-confirmation', null);

    return res.status(200).json({
      success: true,
      message:
        'Password changed successfully. Please login with your new password.'
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


// for google sign up
router.post('/register/google', async (req, res) => {
  try {
    const { isSubscribed, credential, phoneNumber } = req.body;
    const user = await verifyGoogleToken(credential);

    if (!phoneNumber) {
      return res.status(400).json({ error: 'You must enter a phone number.' });
    }

    // check if user email already exist
    const email = user.email.trim().toLowerCase()
    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return res.status(400).json({
        error: 'That email address is already in use.'
      })
    }
    let subscribed = false;
    if (isSubscribed) {
      // add user to newsteller as they are subscribed
      const news = new Newsletter({
        email
      })
      await news.save();
      // also add user email to mailgun mailing list
      mailgun.createMember(email, firstName, lastName)
      subscribed = true
    }

    const newUser = new User({
      email: email,
      firstName: user.given_name,
      lastName: user.family_name,
      phoneNumber: phoneNumber,
      googleId: user.sub,
      provider: EMAIL_PROVIDER.Google,
      avatar: user.picture,
    })

    const registeredUser = await newUser.save();

    const payload = {
      id: registeredUser.id
    };

    await emailService.sendEmail(
      registeredUser.email,
      'signup',
      registeredUser
    );

    const token = jwt.sign(payload, secret, { expiresIn: tokenLife });

    return res.status(200).json({
      success: true,
      subscribed,
      token: `Bearer ${token}`,
      user: {
        id: registeredUser.id,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        email: registeredUser.email,
        role: registeredUser.role
      }
    });
  } catch (error) {
    return res.status(400).json({
      error: "Error Creating google account"
    })
  }
})


router.post('/google/signin', async (req, res) => {
  try {
    const { credential } = req.body;
    const user = await verifyGoogleToken(credential);

    if (!user.email) {
      return res.status(400).json({ error: 'You must login with an email.' });
    }

    // check if user email already exist
    const email = user.email.trim().toLowerCase()
    const existingEmail = await User.findOne({ email })

    if (!existingEmail) {
      return res
        .status(400)
        .send({ error: 'No user found for this email address.' });
    }

    if (existingEmail && existingEmail.provider !== EMAIL_PROVIDER.Google) {
      return res.status(400).send({
        error: `That email address is already in use using ${existingEmail.provider} Account.`
      });
    }

    const payload = {
      id: existingEmail.id
    };

    const token = jwt.sign(payload, secret, { expiresIn: tokenLife });

    if (!token) {
      throw new Error();
    }

    await emailService.sendEmail(
      existingEmail.email,
      'signin',
      existingEmail
    );

    return res.status(200).json({
      success: true,
      token: `Bearer ${token}`,
      user: {
        id: existingEmail.id,
        firstName: existingEmail.firstName,
        lastName: existingEmail.lastName,
        email: existingEmail.email,
        role: existingEmail.role
      }
    });
  } catch (eror) {
    return res.status(400).json({
      error: "Error logging ing with google account"
    })
  }
});

/*router.get(
  '/facebook',
  passport.authenticate('facebook', {
    session: false,
    scope: ['public_profile', 'email']
  })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: `${keys.app.clientURL}/login`,
    session: false
  }),
  (req, res) => {
    const payload = {
      id: req.user.id
    };
    const token = jwt.sign(payload, secret, { expiresIn: tokenLife });
    const jwtToken = `Bearer ${token}`;
    res.redirect(`${keys.app.clientURL}/auth/success?token=${jwtToken}`);
  }
);*/

module.exports = router;
