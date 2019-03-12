const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  image: {
    data: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model("Post", postSchema);
