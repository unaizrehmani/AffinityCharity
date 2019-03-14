const User = require("../models/user");

exports.authToken = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.authenticate(email, password);
    res.send(user.generateAuthToken());
  } catch (error) {
    res.send(error);
  }
};
