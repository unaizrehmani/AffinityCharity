const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let configVars;
try {
  configVars = require('../config.json');
} catch (err) {
  console.log(err);
}

const agentSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  mediaURL: {
    type: String,
    required: false
  },
  imageID: {
    type: String,
    require: false
  },
  charityID: {
    type: String,
    require: true
  },
  location: {
    type: String,
    require: true
  },
  posts: {
    type: Array,
    require: false
  },
  createdDate: {
    type: Date,
    required: true
  }
});

agentSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

agentSchema.methods.generateAuthToken = () => {
  return jwt.sign(
    { _id: this._id },
    process.env.token_secret || configVars.token_secret
  );
};

agentSchema.statics.authenticate = async function (email, password) {
  try {
    const agent = await this.findOne({ email: email });
    let hashedPassword;
    if (agent) hashedPassword = agent.password;
    else return null;
    const passWordDidMatch = await bcrypt.compare(password, hashedPassword);
    return passWordDidMatch ? agent : null;
  } catch (error) {
    return error;
  }
};

module.exports = mongoose.model('Agent', agentSchema);
