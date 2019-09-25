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
    html: `${req.body}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(400).send('Email could not be sent');
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    res.status(200).send('Email sent');
  });
});

module.exports = router;
