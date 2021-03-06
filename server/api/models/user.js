const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  isAdmin: {
    type: Boolean,
    required: true
  },
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
    required: false
  },
  createdDate: {
    type: Date,
    required: true
  }
});

userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      imageID: this.imageID,
      mediaURL: this.mediaURL
    },
    process.env.JWT_TOKEN_SECRET
  );
};

userSchema.statics.authenticate = async function (email, password) {
  try {
    const user = await this.findOne({
      email: email
    });
    let hashedPassword;
    if (user) hashedPassword = user.password;
    else return null;
    const passWordDidMatch = await bcrypt.compare(password, hashedPassword);
    return passWordDidMatch ? user : null;
  } catch (error) {
    return error;
  }
};

module.exports = mongoose.model('User', userSchema);
