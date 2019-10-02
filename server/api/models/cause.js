const mongoose = require('mongoose');
const { Schema } = mongoose;

const causeSchema = new Schema({
  name: {
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
  defaultDesign: {
    type: JSON,
    required: true
  },
  charityID: {
    type: String,
    required: true
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false
    }
  ],
  createdDate: {
    type: Date,
    required: true
  }
});

causeSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Cause', causeSchema);
