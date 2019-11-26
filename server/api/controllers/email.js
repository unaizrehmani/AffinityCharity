const User = require('../models/user');
const Email = require('../models/email');

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

exports.getEmailById = async (req, res, next) => {
  try {
    const id = req.params.emailID;
    const emailPost = await Email.findById(id).populate('user');
    res.status(200).send(emailPost);
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
