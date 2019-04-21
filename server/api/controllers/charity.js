const Charity = require('../models/charity');
// const Agent = require('../models/Agent');
// const cloudinaryUtil = require('../middleware/cloudinary/cloudinary');
// const cloudinaryPath = `${process.env.CLOUDINARY_PATH}/charity`;

/*
 * POST /api/charity route to create a new charity.
 *
 * REQ.BODY:
 * @param {string} name
 * @param {string} location
 *
 */
exports.insertCharity = async (req, res, next) => {
  try {
    const charity = new Charity(req.body);
    console.log(charity);
    const result = await charity.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

/*
 * GET /api/charity/:charityID route to get a charity by ID.
 *
 * REQ.PARAMS:
 * @param {number} charityID
 */
exports.getCharityByID = async (req, res, next) => {
  try {
    const charity = await Charity.findById(req.params.charityID).populate(
      'agents'
    );
    res.status(200).send(charity);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllCharities = async (req, res, next) => {
  try {
    const charities = await Charity.find({}).populate('agents');
    res.status(200).send(charities);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.patchCharityByID = async (req, res, next) => {
  try {
    const charity = await Charity.findByIdAndUpdate(
      req.params.charityID,
      req.body,
      { new: true }
    );
    res.status(200).send(charity);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteCharityByID = async (req, res, next) => {
  try {
    const charity = await Charity.findByIdAndDelete(req.params.charityID);
    res.status(200).send(charity);
  } catch (error) {
    res.status(400).send(error);
  }
};
