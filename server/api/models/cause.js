const mongoose = require('mongoose');
const { Schema } = mongoose;

const causeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
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
  description: {
    type: String,
    required: true
  },
  deletable: {
    type: Boolean,
    required: true
  },
  defaultDesign: {
    type: Object,
    required: true
  },
  donors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Donor',
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
