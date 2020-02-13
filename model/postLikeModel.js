const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postLikeModal = new Schema({  
  uid: {
    type: String,
    require: true
  },
  pid: {
    type: String,
    require: true
  },
  status: {
    type: Number,
    require: true,
    default: 1
  }
}, { versionKey: false });

const likePost = mongoose.model('postLike', postLikeModal);

module.exports = likePost;