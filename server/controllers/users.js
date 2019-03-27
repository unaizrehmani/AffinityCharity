const User = require('../models/user');
const cloudinaryUtil = require('../middleware/cloudinary/cloudinary');
const bcrypt = require('bcrypt');
const SALTROUNDS = 14;

// POST routes
exports.insertUser = async (req, res, next) => {
  try {
    const user = await new User(req.body);
    user.createdDate = new Date();
    user.password = await bcrypt.hash(req.body.password, SALTROUNDS);
    let count = await User.findOne({
      email: user.email
    }).countDocuments();
    if (req.files.image && count === 0) {
      await cloudinaryUtil.v2.uploader.upload(
        req.files.image.path, {
          folder: 'users'
        },
        (err, imageInfo) => {
          if (err) {
            res.send(err);
          } else {
            user.imageID = imageInfo.public_id;
            user.mediaURL = imageInfo.url;
          }
        }
      );
    } else {
      user.imageID = "";
      user.mediaURL = "";
    }
    const result = await user.save();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

// GET routes
exports.getUserByID = async (req, res, next) => {
  try {
    let id = req.params.userID;
    const user = await User.findById(id);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.send(error);
  }
};

// PATCH routes
exports.patchUserByID = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userID, req.body, {
      new: true
    });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};

// DELETE routes
exports.deleteUserByID = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userID);
    if (user.imageID) {
      await cloudinaryUtil.v2.uploader.destroy(user.imageID, (error, result) => {
        if (error) console.log('Failed to delete user image with ID: ', user.imageID);
      });
    }
    res.send(user);
  } catch (err) {
    res.send(err);
  }
};