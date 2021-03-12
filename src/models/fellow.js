const mongoose = require('mongoose');

const fellow = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  discordID: {
    type: String,
    required: true,
    unique: true,
  },
  githubUsername: {
    type: String,
    required: true,
    unique: true,
  },
  podID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pods',
    required: true
  },
  standups: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'standups'
    }],
    default: []
  }
});

const Fellow = mongoose.model('fellows', fellow);

module.exports = Fellow;
