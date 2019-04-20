const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  mediaURL: {
    type: String,
    required: false
  },
  imageID: {
    type: String,
    required: false
  },
  charityID: {
    type: String,
    required: true
  },
  taggedPosts: [{
    type: Schema.Types.ObjectId,
    required: false
  }],
  createdDate: {
    type: Date,
    required: true
  }
});

profileSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Profile', profileSchema);
