const User = require("../models/user");
const crypto = require("crypto");

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
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      console.log("Could not find user");
    });
};
