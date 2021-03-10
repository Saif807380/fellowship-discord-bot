const mongoose = require('mongoose');

const standup = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  body: {
    type: String,
    required: true
  },
  discordID: {
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
