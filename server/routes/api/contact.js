const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Contact = require('../../models/contact');
const emailService = require('../../services/emailService');

router.post('/add', async (req, res) => {
  try {
    const name = req.body.name;
    let email = req.body.email;
    const message = req.body.message;

    email = email.trim().toLowerCase();

    if (!email) {
      return res
        .status(400)
        .json({ error: 'You must enter an email address.' });
    }

    if (!name) {
      return res
        .status(400)
        .json({ error: 'You must enter description & name.' });
    }

    if (!message) {
      return res.status(400).json({ error: 'You must enter a message.' });
    }

    const existingContact = await Contact.findOne({ email });

    if (existingContact) {
      return res
        .status(400)
        .json({ error: 'A request already existed for same email address' });
    }

    const contact = new Contact({
      name,
      email,
      message
    });

    const contactDoc = await contact.save();

    await emailService.sendEmail(email, 'contact', null);

    // send contact email to admin
    await emailService.sendEmail(email, 'admin-contact', [ name, message ]);

    return res.status(200).json({
      success: true,
      message: `We receved your message, we will reach you on your email address ${email}!`,
      contact: contactDoc
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

module.exports = router;
