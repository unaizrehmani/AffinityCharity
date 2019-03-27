const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
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

userSchema.methods.generateAuthToken = () => {
  return jwt.sign({
      _id: this._id
    },
    process.env.token_secret
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