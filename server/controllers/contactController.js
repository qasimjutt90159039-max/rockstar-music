const ContactMessage = require('../models/ContactMessage');

// @desc    Submit a message to Rockstar Musical Instruments Shop
// @route   POST /api/contact
// @access  Public
const submitContactMessage = async (req, res, next) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Please provide your name, phone number, and message' });
    }

    const newMessage = await ContactMessage.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      subject: subject ? subject.trim() : 'Inquiry about musical instruments',
      message: message.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received by Rockstar Musical Instruments Shop. We will contact you soon.',
      data: newMessage
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  submitContactMessage
};
