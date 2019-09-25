const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send-email', (req, res, next) => {
  const user = process.env.CLIENT_EMAIL;
  const pass = process.env.CLIENT_PASSWORD;
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user,
      pass
    }
  });
  const mailOptions = {
    to: 'unaizrehmani@gmail.com',
    subject: 'Hello ',
    text: 'Hello world ',
    html:
      '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js'
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
});

module.exports = router;
