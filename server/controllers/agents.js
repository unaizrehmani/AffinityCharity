const Agent = require('../models/agent');
const cloudinaryUtil = require('../middleware/cloudinary/cloudinary');
const bcrypt = require('bcrypt');
const SALTROUNDS = 14;
const cloudinaryPath = process.env.CLOUDINARY_PATH;

// POST routes
exports.insertAgent = async (req, res, next) => {
  try {
    const agent = await new Agent(req.body);
    agent.createdDate = new Date();
    agent.password = await bcrypt.hash(req.body.password, SALTROUNDS);
    let count = await Agent.findOne({
      email: agent.email
    }).countDocuments();
    if (req.files.image && count === 0) {
      await cloudinaryUtil.v2.uploader.upload(
        req.files.image.path, {
          folder: `${cloudinaryPath}/agents`
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

// GET routes
exports.getAgentByID = async (req, res, next) => {
  try {
    let id = req.params.agentID;
    const agent = await Agent.findById(id);
    res.send(agent);
  } catch (error) {
    res.send(error);
  }
};

exports.getAllAgents = async (req, res, next) => {
  try {
    const agents = await Agent.find({});
    res.send(agents);
  } catch (error) {
    res.send(error);
  }
};

// PATCH routes
exports.patchAgentByID = async (req, res, next) => {
  try {
    const agent = await Agent.findByIdAndUpdate(req.params.agentID, req.body, {
      new: true
    });
    res.send(agent);
  } catch (error) {
    res.send(error);
  }
};

// DELETE routes
exports.deleteAgentByID = async (req, res, next) => {
  try {
    const agent = await Agent.findByIdAndDelete(req.params.agentID);
    await cloudinaryUtil.v2.uploader.destroy(agent.imageID, (error, result) => {
      if (error) console.log('Failed to delete agent: ', agent.imageID);
    });
    res.send(agent);
  } catch (err) {
    res.send(err);
  }
};