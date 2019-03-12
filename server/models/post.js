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

module.exports = mongoose.model("Post", postSchema);
