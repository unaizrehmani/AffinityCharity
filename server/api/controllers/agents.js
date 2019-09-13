const Agent = require('../models/agent');
const cloudinaryUtil = require('../middleware/cloudinary/cloudinary');
const bcrypt = require('bcryptjs');
const SALTROUNDS = 14;
const cloudinaryPath = `${process.env.CLOUDINARY_PATH}/agents`;

/*
 * POST /api/agents route to add a new agent.
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
exports.insertAgent = async (req, res, next) => {
  try {
    const agent = await new Agent(req.body);
    agent.createdDate = new Date();
    agent.password = await bcrypt.hash(req.body.password, SALTROUNDS);
    const count = await Agent.findOne({
      email: agent.email
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
            agent.imageID = imageInfo.public_id;
            agent.mediaURL = imageInfo.url;
          }
        }
      );
    }
    const result = await agent.save();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

/*
 * GET /api/agents/:agentID route to get an agent by ID.
 *
 * REQ.PARAMS:
 * @param {number} agentID
 */
exports.getAgentByID = async (req, res, next) => {
  try {
    const id = req.params.agentID;
    const agent = await Agent.findById(id)
      .populate({
        path: 'posts',
        populate: {
          path: 'tagged',
          model: 'Profile'
        }
      })
      .populate('charityID');
    res.send(agent);
  } catch (error) {
    res.send(error);
  }
};

/*
 * GET /api/agents route to get all agents.
 */
exports.getAllAgents = async (req, res, next) => {
  try {
    const agents = await Agent.find({})
      .populate({
        path: 'posts',
        populate: {
          path: 'tagged',
          model: 'Profile'
        }
      })
      .populate('charityID');
    res.send(agents);
  } catch (error) {
    res.send(error);
  }
};

/*
 * PATCH /api/agents/:agentID route to patch an agent by ID.
 *
 * REQ.PARAMS:
 * @param {number} agentID
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
exports.patchAgentByID = async (req, res, next) => {
  const body = {
    ...req.body
  };
  try {
    if (req.files && req.files.image && req.files.image.path) {
      const agent = await Agent.findById(req.params.agentID);
      if (agent.imageID) {
        await cloudinaryUtil.v2.uploader.destroy(
          agent.imageID,
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
    const result = await Agent.findByIdAndUpdate(req.params.agentID, body, {
      new: true
    });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

/*
 * DELETE /api/agents/:agentID route to delete an agent by ID.
 *
 * REQ.PARAMS:
 * @param {number} agentID
 */
exports.deleteAgentByID = async (req, res, next) => {
  try {
    const agent = await Agent.findByIdAndDelete(req.params.agentID);
    if (agent.imageID) {
      await cloudinaryUtil.v2.uploader.destroy(
        agent.imageID,
        (error, result) => {
          if (error) console.log('Failed to delete agent: ', agent.imageID);
        }
      );
    }
    res.send(agent);
  } catch (err) {
    res.send(err);
  }
};
