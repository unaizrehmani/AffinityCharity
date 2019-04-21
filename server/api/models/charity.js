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
  },
  agents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Agent'
    }
  ]
});

module.exports = mongoose.model('Charity', charitySchema);
