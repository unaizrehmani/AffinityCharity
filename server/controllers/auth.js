const User = require("../models/user");
const bcrypt = require("bcrypt");
const SALTROUNDS = 14;

exports.authToken = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.authenticate(email, password);

  if (!user) {
    return res.status(401).send({ errors: ["we will build this later"] });
  }

  res.status(201).send(user.generateAuthToken());
  // User.findOne({ email: email })
  //   .then(user => {
  //     const hashedPassword = user
  //       ? user.password
  //       : `$2b$${SALTROUNDS}$invalidusernameaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;

  //     bcrypt.compare(password, hashedPassword).then(passwordDidMatch => {
  //       if (passwordDidMatch) {
  //         res.send(user.generateAuthToken());
  //       } else {
  //         res.send({ error: "wrong password" });
  //       }
  //     });
  //   })
  //   .catch(err => {
  //     return err;
  //   });
};
