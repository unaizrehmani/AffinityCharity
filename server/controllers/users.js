const User = require("../models/user");

exports.addUser = (req, res, next) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;
  let profileURL = req.body.profileURL;
  const user = new User({
    firstName,
    lastName,
    email,
    password,
    profileURL
  });
  user
    .save()
    .then(result => {
      console.log("Added user");
    })
    .catch(err => {
      console.log(err);
      console.log("Could not add user to database");
    });
};

exports.getUserByID = (req, res, next) => {
  let id = req.params.userID;
  User.findById(id)
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
};
