const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALTROUNDS = 14;

let configVars;
try {
  configVars = require("../config.json");
} catch (err) {
  console.log(err);
}

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

userSchema.methods.generateAuthToken = () => {
  return jwt.sign(
    { _id: this._id },
    process.env.token_secret || configVars.token_secret
  );
};

userSchema.statics.authenticate = async function(email, password) {
  const user = await this.findOne({ email: email });
  const hashedPassword = user
    ? user.password
    : `$2b$${SALTROUNDS}$invalidusernameinvalidusernameinvalidusernameinvalidu`;
  const passwordDidMatch = await bcrypt.compare(password, hashedPassword);

  return passwordDidMatch ? user : null;
};

module.exports = mongoose.model("User", userSchema);
