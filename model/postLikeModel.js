const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postLikeModal = new Schema({  
  uid: {
    type: Number,
    require: true
  },
  pid: {
    type: Number,
    require: true
  },
  status: {
    type: Number,
    require: true
  }
}, { versionKey: false });

const user = mongoose.model('postLike', postLikeModal);

module.exports = user;