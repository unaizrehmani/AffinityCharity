const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
    required: true
  },
  location: {
    type: String,
    required: true
  },
  posts: {
    type: Array,
    required: false
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
  return jwt.sign({
      _id: this._id
    },
    process.env.JWT_TOKEN_SECRET
  );
};

agentSchema.statics.authenticate = async function (email, password) {
  try {
    const agent = await this.findOne({
      email: email
    });
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