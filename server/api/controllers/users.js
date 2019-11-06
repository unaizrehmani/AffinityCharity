const User = require('../models/user');
const cloudinaryUtil = require('../middleware/cloudinary/cloudinary');
const bcrypt = require('bcryptjs');
const SALTROUNDS = 14;
const cloudinaryPath = `${process.env.CLOUDINARY_PATH}/users`;

/*
 * POST /api/users route to save a new user.
 *
 * REQ.BODY:
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string} password
 * @param {boolean} isAdmin
 *
 * REQ.FILES
 * @param {file} image
 */
exports.insertUser = async (req, res, next) => {
  try {
    const user = await new User(req.body);
    user.createdDate = new Date();
    user.password = await bcrypt.hash(req.body.password, SALTROUNDS);
    const count = await User.findOne({
      email: user.email
    }).countDocuments();
    if (req.files.image && count === 0) {
      await cloudinaryUtil.v2.uploader.upload(
        req.files.image.path,
        {
          folder: cloudinaryPath
        },
        (err, imageInfo) => {
          if (err) {
            res.send(err);
          } else {
            user.imageID = imageInfo.public_id;
            user.mediaURL = imageInfo.url;
          }
        }
      );
    } else {
      user.imageID = '';
      user.mediaURL = '';
    }
    const result = await user.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

/*
 * GET /api/users/:userID route to get a user by ID.
 *
 * REQ.PARAMS:
 * @param {number} userID
 */
exports.getUserByID = async (req, res, next) => {
  try {
    const id = req.params.userID;
    const user = await User.findById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

/*
 * GET /api/users/ route to return all users.
 */
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

/*
 * PATCH /api/users/:userID route to patch a user by ID.
 *
 * REQ.PARAMS:
 * @param {number} userID
 *
 * REQ.BODY
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string} password
 * @param {boolean} isAdmin
 *
 * REQ.FILES:
 * @param {file} image
 */
exports.patchUserByID = async (req, res, next) => {
  const body = {
    ...req.body
  };
  try {
    if (req.files && req.files.image && req.files.image.path) {
      const user = await User.findById(req.params.userID);
      if (user.imageID) {
        await cloudinaryUtil.v2.uploader.destroy(
          user.imageID,
          (error, result) => {
            if (error) res.send(error);
          }
        );
      }
      const uploadResult = await cloudinaryUtil.v2.uploader.upload(
        req.files.image.path,
        {
          folder: cloudinaryPath
        }
      );
      body.imageID = uploadResult.public_id;
      body.mediaURL = uploadResult.url;
    }

    if (body.newPassword) {
      const result = await User.authenticate(body.oldEmail, body.oldPassword);
      if (result == null) throw 'Invalid credentials! Cannot change password';
      body.password = await bcrypt.hash(body.newPassword, SALTROUNDS);
      body.email = body.newEmail;
    } else {
      delete body.password;
      delete body.email;
    }

    const result = await User.findByIdAndUpdate(req.params.userID, body, {
      new: true
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

/*
 * DELETE /api/users/:userID route to delete a user by ID.
 *
 * REQ.PARAMS:
 * @param {number} userID
 */
exports.deleteUserByID = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userID);
    if (user.imageID) {
      await cloudinaryUtil.v2.uploader.destroy(
        user.imageID,
        (error, result) => {
          if (error) {
            console.log('Failed to delete user image with ID: ', user.imageID);
          }
        }
      );
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};
