const mongoose = require('mongoose');

const standup = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  yesterday: {
    type: String,
    required: true
  },
  today: {
    type: String,
    required: true
  },
  blockers: {
    type: String,
    required: true
  },
  shoutouts: {
    type: String,
    required: true
  },
  fellowID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'fellows',
    required: true
  }
});

const Standup = mongoose.model('standups', standup);

module.exports = Standup;
