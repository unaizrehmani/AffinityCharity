const User = require("../models/user");
const crypto = require("crypto");
const _ = require("lodash");

exports.insertUser = (req, res, next) => {
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$" + hash;

  new User(req.body)
    .save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      console.log("Could not add user");
    });
};

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
      console.log(err);
      console.log("Could not find user");
    });
};

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
      console.log(err);
      throw err;
    });
};

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
      console.log(err);
      throw err;
    });
};
