const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postModal = new Schema({
  pid: {
    type: Number,
    require: true
  },
  uid: {
    type: Number,
    require: true
  },
  title: {
    type: String,
    require: true,
    maxlength: 15
  },
  discription: {
    type: String,
    require: true,    
  }
});

const post = mongoose.model('Post', postModal);

module.exports = post;