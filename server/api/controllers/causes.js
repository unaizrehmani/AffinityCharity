const Cause = require('../models/cause');
const cloudinaryUtil = require('../middleware/cloudinary/cloudinary');
const cloudinaryPath = `${process.env.CLOUDINARY_PATH}/causes`;
const defaultJSON = require('../util/default.json');
const nodemailer = require('nodemailer');

/*
 * POST /api/causes route to save a new cause.
 *
 * REQ.BODY:
 * @param {string} name
 * @param {string} location
 * @param {string} charityID
 *
 * REQ.FILES
 * @param {file} image
 */
exports.insertCause = async (req, res, next) => {
  try {
    const cause = new Cause({ ...req.body });
    cause.createdDate = new Date();
    if (!cause.donors) cause.donors = [];
    cause.defaultDesign = defaultJSON;
    if (req.files && req.files.image && req.files.image.path) {
      await cloudinaryUtil.v2.uploader.upload(
        req.files.image.path,
        {
          folder: cloudinaryPath
        },
        (err, imageInfo) => {
          if (err) {
            res.send(err);
          } else {
            cause.imageID = imageInfo.public_id;
            cause.mediaURL = imageInfo.url;
          }
        }
      );
    } else {
      cause.imageID = '';
      cause.mediaURL = '';
    }
    const result = await cause.save();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

/*
 * GET /api/causes/:causeID route to get a cause by ID.
 *
 * REQ.PARAMS:
 * @param {number} causeID
 */
exports.getCauseByID = async (req, res, next) => {
  try {
    const id = req.params.causeID;
    const cause = await Cause.findById(id).populate('donors', '-password -__v');
    res.send(cause);
  } catch (error) {
    res.send(error);
  }
};

/*
 * GET /api/causes route to get all causes.
 */
exports.getAllCauses = async (req, res, next) => {
  try {
    const causes = await Cause.find({}).populate('donors', '-password -__v');
    res.send(causes);
  } catch (error) {
    res.send(error);
  }
};

/*
 * PATCH /api/causes/:causeID route to patch a cause by ID.
 *
 * REQ.PARAMS:
 * @param {number} causeID
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
exports.patchCauseByID = async (req, res, next) => {
  const body = {
    ...req.body
  };
  try {
    if (req.files && req.files.image && req.files.image.path) {
      const cause = await Cause.findById(req.params.causeID);
      if (cause.imageID) {
        await cloudinaryUtil.v2.uploader.destroy(
          cause.imageID,
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
    const result = await Cause.findByIdAndUpdate(req.params.causeID, body, {
      new: true
    });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

/*
 * DELETE /api/causes/:causeID route to delete a cause by ID.
 *
 * REQ.PARAMS:
 * @param {number} causeID
 */
exports.deleteCauseByID = async (req, res, next) => {
  try {
    const cause = await Cause.findByIdAndDelete(req.params.causeID);
    if (cause.imageID) {
      await cloudinaryUtil.v2.uploader.destroy(
        cause.imageID,
        (error, result) => {
          if (error) console.log('Failed to delete cause: ', cause.imageID);
        }
      );
    }
    res.send(cause);
  } catch (err) {
    res.send(err);
  }
};

/*
 * POST /api/causes/send-email route to send email to all cause recepients
 *
 * REQ.BODY:
 * @param {string} email
 * @param {string} html
 * @param {string} subject
 */
exports.sendEmail = (req, res, next) => {
  const user = process.env.CLIENT_EMAIL;
  const pass = process.env.CLIENT_PASSWORD;
  const { email, subject, html } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user,
      pass
    }
  });
  const mailOptions = {
    bcc: email,
    subject: subject,
    text: 'Trouble viewing this email?',
    html: `${html}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(400).send('Email could not be sent');
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    res.status(200).send('Email sent');
  });
};
