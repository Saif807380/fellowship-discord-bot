const mongoose = require('mongoose');

const pod = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  channelID: {
    type: [{
      type: String,
      required: true
    }],
    required: true
  },
  fellows: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'fellows',
    }],
    default: []
  },
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
