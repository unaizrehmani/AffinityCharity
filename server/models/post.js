const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  profileArray: {
    type: Array,
    required: false
  },
  createdDate: {
    type: String,
    required: true
  }
});

postSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model("Post", postSchema);
