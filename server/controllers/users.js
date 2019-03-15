const User = require("../models/user");
const cloudinaryUtil = require("../util/cloudinary");
const bcrypt = require("bcrypt");
const SALTROUNDS = 14;

//POST routes
exports.insertUser = async (req, res, next) => {
  try {
    const user = await new User(req.body);
    user.createdDate = new Date();
    user.password = await bcrypt.hash(req.body.password, SALTROUNDS);
    let count = await User.findOne({ email: user.email }).countDocuments();
    if (req.files.image && count == 0) {
      await cloudinaryUtil.v2.uploader.upload(
        req.files.image.path,
        { folder: "users" },
        (err, imageInfo) => {
          if (err) {
            res.send(err);
          } else {
            user.imageID = imageInfo.public_id;
            user.mediaURL = imageInfo.url;
          }
        }
      );
    }
    const result = await user.save();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

//GET routes
exports.getUserByID = async (req, res, next) => {
  try {
    let id = req.params.userID;
    const user = await User.findById(id);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};

exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
};

//PATCH routes
exports.patchUserByID = (req, res, next) => {
  User.findOneAndUpdate(req.params.userID, req.body, { new: true })
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => {
      res.send(err);
    });
};

//DELETE routes
exports.deleteUserByID = (req, res, next) => {
  User.findByIdAndDelete(req.params.userID)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
};
