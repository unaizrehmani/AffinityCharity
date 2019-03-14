const User = require("../models/user");

exports.authToken = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.authenticate(email, password);

  if (!user) {
    return res.status(401).send({ errors: "error generating token" });
  }

  res.send(user.generateAuthToken());
};
