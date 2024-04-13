import mongoose from 'mongoose';

const url = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true
  },
  redirectUrl: {
    type: String,
    required: true
  },
  visitHistory: [ {timestamp: Number} ],
}, {timestamps: true})

const urlModel = mongoose.model('url', url);

export default urlModel;