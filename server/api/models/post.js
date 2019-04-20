const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  mediaURL: {
    type: String,
    required: true
  },
  mediaID: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  tagged: [{
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Agent',
    required: true
  },
  createdDate: {
    type: String,
    required: true
  }
});

postSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Post', postSchema);
