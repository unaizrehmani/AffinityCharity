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
    const userResult = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: user.generateAuthToken()
    };
    res.send(userResult);
  } catch (error) {
    res.send(error);
  }
};
