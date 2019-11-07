const Donor = require('../models/donor');
const mongoose = require('mongoose');

/*
 * POST /api/donors route to add a new donor.
 *
 * REQ.BODY:
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string} password
 * @param {string} phone
 * @param {string} address
 * @param {array} causes
 *
 */
exports.insertDonor = async (req, res) => {
  const { email, firstName, lastName, phone, address } = req.body;
  const causeId = mongoose.Types.ObjectId(req.body.causeId);
  // To-DO check to make sure causeId is a valid cause
  try {
    // Donor already exists so add the cause to their subscription list
    if ((await checkIfUserExists(email)) == true) {
      const donor = await Donor.findOne({ email: email });
      // Don't add duplicate causes to their subscription list
      if (!donor.causes.includes(causeId)) {
        donor.causes.push(causeId);
      }
      const result = await donor.save();
      res.status(200).send(result);
    }
    // Create a new donor and add cause to their subscription list
    else {
      const donor = new Donor({
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        address: address,
        causes: []
      });
      donor.causes.push(causeId);
      donor.createdDate = new Date();
      const result = await donor.save();
      res.status(200).send(result);
    }
  } catch (error) {
    res.send(error);
  }
};

const checkIfUserExists = async email => {
  try {
    const results = await Donor.find({ email: email });
    if (results.length !== 0) return true;
    else return false;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/*
 * GET /api/donors/:donorID route to get an donor by ID.
 *
 * REQ.PARAMS:
 * @param {number} donorID
 */
exports.getDonorByID = async (req, res, next) => {
  try {
    const id = req.params.donorID;
    const donor = await Donor.findById(id).populate('causes', '-__v');
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
    const donors = await Donor.find({}).populate('causes', '-__v');
    console.log(donors);
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
 * @param {string} phone
 * @param {string} address
 * @param {array} causes
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
