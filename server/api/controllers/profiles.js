const Profile = require('../models/profile');
const cloudinaryUtil = require('../middleware/cloudinary/cloudinary');
const cloudinaryPath = `${process.env.CLOUDINARY_PATH}/profiles`;

/*
 * POST /api/profiles route to save a new profile.
 *
 * REQ.BODY:
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} location
 * @param {string} charityID
 *
 * REQ.FILES
 * @param {file} image
 */
exports.insertProfile = async (req, res, next) => {
  try {
    const profile = new Profile(req.body);
    profile.createdDate = new Date();
    profile.posts = [];
    if (req.files.image && req.files.image.path) {
      await cloudinaryUtil.v2.uploader.upload(
        req.files.image.path,
        {
          folder: cloudinaryPath
        },
        (err, imageInfo) => {
          if (err) {
            res.send(err);
          } else {
            profile.imageID = imageInfo.public_id;
            profile.mediaURL = imageInfo.url;
          }
        }
      );
    } else {
      profile.imageID = '';
      profile.mediaURL = '';
    }
    const result = await profile.save();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

/*
 * GET /api/profiles/:profileID route to get a profile by ID.
 *
 * REQ.PARAMS:
 * @param {number} profileID
 */
exports.getProfileByID = async (req, res, next) => {
  try {
    const id = req.params.profileID;
    const profile = await Profile.findById(id).populate('taggedPosts');
    res.send(profile);
  } catch (error) {
    res.send(error);
  }
};

/*
 * GET /api/profiles route to get all profiles.
 */
exports.getAllProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find({}).populate('taggedPosts');
    res.send(profiles);
  } catch (error) {
    res.send(error);
  }
};

/*
 * PATCH /api/profiles/:profileID route to patch a profile by ID.
 *
 * REQ.PARAMS:
 * @param {number} profileID
 *
 * REQ.BODY:
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} location
 * @param {string} charityID
 *
 * REQ.FILES
 * @param {file} image
 */
exports.patchProfileByID = async (req, res, next) => {
  const body = {
    ...req.body
  };
  try {
    if (req.files && req.files.image && req.files.image.path) {
      const profile = await Profile.findById(req.params.profileID);
      if (profile.imageID) {
        await cloudinaryUtil.v2.uploader.destroy(
          profile.imageID,
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
    const result = await Profile.findByIdAndUpdate(req.params.profileID, body, {
      new: true
    });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

/*
 * DELETE /api/profiles/:profileID route to delete a profile by ID.
 *
 * REQ.PARAMS:
 * @param {number} profileID
 */
exports.deleteProfileByID = async (req, res, next) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.profileID);
    if (profile.imageID) {
      await cloudinaryUtil.v2.uploader.destroy(
        profile.imageID,
        (error, result) => {
          if (error) console.log('Failed to delete profile: ', profile.imageID);
        }
      );
    }
    res.send(profile);
  } catch (err) {
    res.send(err);
  }
};
