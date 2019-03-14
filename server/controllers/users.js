const User = require("../models/user");
const cloudinaryUtil = require("../util/cloudinary");
const bcrypt = require("bcrypt");
const SALTROUNDS = 14;

//POST routes
exports.insertUser = (req, res, next) => {
  cloudinaryUtil.v2.uploader.upload(
    req.files.image.path,
    { folder: "users" },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        bcrypt.hash(req.body.password, SALTROUNDS).then(password => {
          const user = new User({
            firstName: req.body.firstName,
            mediaURL: result.url,
            imageID: result.public_id,
            lastName: req.body.lastName,
            email: req.body.email,
            password,
            createdDate: new Date()
          });

          user
            .save()
            .then(result => {
              res.send(result);
            })
            .catch(err => {
              res.send(err);
            });
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
      res.status(201).send(result);
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
