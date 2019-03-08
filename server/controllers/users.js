const User = require("../models/user");

exports.addUser = (req, res, next) => {
  let firstName = req.params.firstName;
  let lastName = req.params.lastName;
  let email = req.params.email;
  let password = req.params.password;
  let profileURL = req.params.profileURL;
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
      console.log(result);
    })
    .catch(err => {
      console.log(err);
      console.log("Could not add user to database");
    });
};
