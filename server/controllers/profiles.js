const Profile = require('../models/profile');
const cloudinaryUtil = require('../middleware/cloudinary/cloudinary');

// POST profiles
exports.insertProfile = async (req, res, next) => {
  try {
    const profile = new Profile(req.body);
    profile.createdDate = new Date();
    profile.posts = [];
    const result = await profile.save();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

// GET profiles
exports.getProfileByID = async (req, res, next) => {
  try {
    let id = req.params.profileID;
    const profile = await Profile.findById(id);
    res.send(profile);
  } catch (error) {
    res.send(error);
  }
};

exports.getAllProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find({});
    res.send(profiles);
  } catch (error) {
    res.send(error);
  }
};

// PATCH routes
exports.patchProfileByID = async (req, res, next) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.profileID, req.body, {
      new: true
    });
    res.send(profile);
  } catch (error) {
    res.send(error);
  }
};

// DELETE routes
exports.deleteProfileByID = async (req, res, next) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.profileID);
    await cloudinaryUtil.v2.uploader.destroy(profile.imageID, (error, result) => {
      if (error) console.log('Failed to delete profile: ', profile.imageID);
    });
    res.send(profile);
  } catch (err) {
    res.send(err);
  }
};