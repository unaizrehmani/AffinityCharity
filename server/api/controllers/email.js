const nodemailer = require('nodemailer');

exports.sendEmail = (req, res, next) => {
  const user = process.env.CLIENT_EMAIL;
  const pass = process.env.CLIENT_PASSWORD;
  const { email, subject, html } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user,
      pass
    }
  });
  const mailOptions = {
    to: email,
    subject: subject,
    text: 'Trouble viewing this email?',
    html: `${html}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(400).send('Email could not be sent');
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    res.status(200).send('Email sent');
  });
};
