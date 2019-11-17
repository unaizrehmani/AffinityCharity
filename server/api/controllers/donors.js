const Donor = require('../models/donor');
const Cause = require('../models/cause');
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
  try {
    const cause = await Cause.findById(causeId);
    if (cause === null) throw new Error('No cause with such ID.');
    // Donor already exists so add the cause to their subscription list
    if ((await checkIfUserExists(email)) === true) {
      const donor = await Donor.findOne({ email: email });
      // Don't add duplicate causes to their subscription list
      if (!donor.causes.includes(causeId)) {
        donor.causes.push(causeId);
      }
      // Add to causes donor list if its not already there
      cause.donors.push(donor._id);
      await cause.save();
      const result = await donor.save();
      res.status(200).send(result);
    } else {
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
      cause.donor.push(result._id);
      await cause.save();
      res.status(200).send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
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
 * PATCH /api/donors/unsubscribe route to patch an donor by ID.

 * REQ.BODY:
 * @param {string} email
 * @param {string} causeId
 */
exports.unsubscribeDonorByEmail = async (req, res, next) => {
  const { email, causeId } = req.body;
  try {
    const donor = await Donor.findOne({ email: email });
    if (!donor) throw new Error('No user found.');
    // Remove causeId (type ObjectID) from donors subscription list
    donor.causes = donor.causes.filter(item => item.toString() !== causeId);
    // Remove email from causes donor list
    const cause = await Cause.findById(causeId);
    if (!cause) throw new Error('No cause found.');
    cause.donors = cause.donors.filter(item => item.toString() !== donor.id);
    await donor.save();
    await cause.save();
    return res.status(200).json({ message: 'Successfully unsubscribed user.' });
  } catch (err) {
    return res.status(400).json({ message: err.message });
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
    res.status(200).send(donor);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

/*
 * GET /api/donors route to get all donors.
 */
exports.getAllDonors = async (req, res, next) => {
  try {
    const donors = await Donor.find({}).populate('causes', '-__v');
    res.status(200).send(donors);
  } catch (err) {
    return res.status(400).json({ message: err.message });
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
  } catch (err) {
    res.status(400).json({ message: err.message });
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
    res.status(400).json({ message: err.message });
  }
};
