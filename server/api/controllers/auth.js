const User = require('../models/user');

/*
 * POST /api/auth/token route to get a JWT.
 *
 * REQ.BODY:
 * @param {string} email
 * @param {string} password
 */
exports.authToken = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.authenticate(email, password);
    res.send(user.generateAuthToken());
  } catch (error) {
    res.send(error);
  }
};
