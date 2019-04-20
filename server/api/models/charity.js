const mongoose = require('mongoose');
const { Schema } = mongoose;

const charitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Charity', charitySchema);
