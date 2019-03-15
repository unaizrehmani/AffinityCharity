const User = require("../models/user");

exports.authToken = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.authenticate(email, password);
    res.send(user.generateAuthToken());
  } catch (error) {
    res.send(error);
  }
};
