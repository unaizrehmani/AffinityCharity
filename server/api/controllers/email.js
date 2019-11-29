const User = require('../models/user');
const Email = require('../models/email');
const nodemailer = require('nodemailer');

exports.insertEmail = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userID);
    const emailPost = new Email(req.body);
    emailPost.createdDate = new Date();
    emailPost.user = user._id;
    emailPost.isApproved = false;
    const result = await emailPost.save();
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getEmails = async (req, res, next) => {
  try {
    const result = await Email.find({}).populate('user');
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getApprovedEmails = async (req, res, next) => {
  try {
    const result = await Email.find({ isApproved: true }).populate('user');
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getUnapprovedEmails = async (req, res, next) => {
  try {
    const result = await Email.find({ isApproved: false }).populate('user');
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getEmailById = async (req, res, next) => {
  try {
    const id = req.params.emailID;
    const emailPost = await Email.findById(id).populate('user');
    res.status(200).send(emailPost);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.patchEmailById = async (req, res, next) => {
  try {
    const id = req.params.emailID;
    const result = await Email.findByIdAndUpdate(
      id,
      { ...req.body },
      {
        new: true
      }
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteEmailById = async (req, res, next) => {
  try {
    const id = req.params.emailID;
    const result = await Email.findByIdAndDelete(id);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.approveAndSendEmail = async (req, res, next) => {
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
    bcc: email,
    subject: subject,
    text: 'Trouble viewing this email?',
    html: `${html}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(400).send('Email could not be sent');
    }
    res.status(200).send('Email sent');
  });
  try {
    const result = await Email.findByIdAndUpdate(
      req.body.emailID,
      { isApproved: true, html },
      {
        new: true
      }
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};
