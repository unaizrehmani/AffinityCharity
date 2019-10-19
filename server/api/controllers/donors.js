const Donor = require('../models/donor');
const bcrypt = require('bcryptjs');
const SALTROUNDS = 14;

/*
 * POST /api/donors route to add a new donor.
 *
 * REQ.BODY:
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string} password
 * @param {string} charityID
 * @param {string} location
 *
 * REQ.FILES
 * @param {file} image
 */
exports.insertDonor = async (req, res, next) => {
  try {
    const donor = await new Donor(req.body);
    donor.createdDate = new Date();
    donor.password = await bcrypt.hash(req.body.password, SALTROUNDS);
    const result = await donor.save();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

/*
 * GET /api/donors/:donorID route to get an donor by ID.
 *
 * REQ.PARAMS:
 * @param {number} donortID
 */
exports.getDonorByID = async (req, res, next) => {
  try {
    const id = req.params.donorID;
    const donor = await Donor.findById(id).populate('causes');
    res.send(donor);
  } catch (error) {
    res.send(error);
  }
};

/*
 * GET /api/donors route to get all donors.
 */
exports.getAllDonors = async (req, res, next) => {
  try {
    const donors = await Donor.find({}).populate('causes');
    res.send(donors);
  } catch (error) {
    res.send(error);
  }
};

/*
 * PATCH /api/donors/:donorID route to patch an donor by ID.
 *
 * REQ.PARAMS:
 * @param {number} donorID
 *
 * REQ.BODY:
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string} password
 * @param {string} charityID
 * @param {string} location
 *
 * REQ.FILES
 * @param {file} image
 */
exports.patchDonorByID = async (req, res, next) => {
  const body = {
    ...req.body
  };
  try {
    const result = await Donor.findByIdAndUpdate(req.params.donorID, body, {
      new: true
    });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

/*
 * DELETE /api/donors/:donorID route to delete an donor by ID.
 *
 * REQ.PARAMS:
 * @param {number} donorID
 */
exports.deleteDonorByID = async (req, res, next) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.donorID);
    res.send(donor);
  } catch (err) {
    res.send(err);
  }
};
