
const mongoose = require('mongoose');

const todoTaskSchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    required: [true, 'content is missing'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: false,
    enum: [true, false],
  },
}, { strict: true });


module.exports = mongoose.model('Task', todoTaskSchema);
