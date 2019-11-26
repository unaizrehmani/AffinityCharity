const mongoose = require('mongoose');
const { Schema } = mongoose;

const emailPostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  subject: {
    type: String,
    required: false
  },
  donorEmails: [
    {
      type: Schema.Types.String,
      required: true
    }
  ],
  createdDate: {
    type: Date,
    required: true
  },
  editorJSON: {
    type: JSON,
    required: true
  },
  isApproved: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Email', emailPostSchema);
