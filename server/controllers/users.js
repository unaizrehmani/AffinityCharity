const User = require("../models/user");
const crypto = require("crypto");
const _ = require("lodash");
const cloudinaryUtil = require("../util/cloudinary");

//POST routes
exports.insertUser = (req, res, next) => {
  cloudinaryUtil.v2.uploader.upload(
    req.files.image.path,
    { folder: "users" },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        new User({
          firstName: req.body.firstName,
          mediaURL: result.url,
          imageID: result.public_id,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          createdDate: new Date()
        })
          .save()
          .then(result => {
            res.send(result);
          })
          .catch(err => {
            res.send(err);
          });
      }
    }
  );
};

//GET routes
exports.getUserByID = (req, res, next) => {
  let id = req.params.userID;
  User.findById(id)
    .then(result => {
      result = _.cloneDeep(result._doc);
      delete result.password;
      delete result._id;
      delete result.__v;
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
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
  if (req.body.password) {
    let salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto
      .createHmac("sha512", salt)
      .update(req.body.password)
      .digest("base64");
    req.body.password = salt + "$" + hash;
  }

  User.findOneAndUpdate(req.params.userID, req.body, { new: true })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
};

//DELETE routes
exports.deleteUserByID = (req, res, next) => {
  User.findByIdAndDelete(req.params.userID)
    .then(result => {
      result = _.cloneDeep(result._doc);
      delete result.password;
      delete result._id;
      delete result.__v;
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
};
