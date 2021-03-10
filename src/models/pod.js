const mongoose = require('mongoose');

const pod = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  channelID: {
    type: String,
    required: true
  },
  githubTeamLink: {
    type: String,
    required: true
  },
  fellows: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'fellows',
    required: true
  }],
  standups: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'standups'
    }],
    default: []
  }
});

const Pod = mongoose.model('pods', pod);

module.exports = Pod;
