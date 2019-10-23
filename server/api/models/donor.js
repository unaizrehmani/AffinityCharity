const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const donorSchema = new Schema({
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
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  causes: [
    {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'Cause'
    }
  ],
  createdDate: {
    type: Date,
    required: true
  }
});

donorSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

donorSchema.methods.generateAuthToken = () => {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.JWT_TOKEN_SECRET
  );
};

donorSchema.statics.authenticate = async function (email, password) {
  try {
    const donor = await this.findOne({
      email: email
    }).populate('causes');
    let hashedPassword;
    if (donor) hashedPassword = donor.password;
    else return null;
    const passWordDidMatch = await bcrypt.compare(password, hashedPassword);
    return passWordDidMatch ? donor : null;
  } catch (error) {
    return error;
  }
};

module.exports = mongoose.model('Donor', donorSchema);
