const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userModal = new Schema({
  uid: {
    type: Number,
    require: true
  },
  fname: {
    type: String,
    require: true,
    maxlength: 15
  },
  lname: {
    type: String,
    require: true,
    maxlength: 15
  },
  userName: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true    
  },
  contact: {
    type: String,
    require: true,
    maxlength: 13
  },
  type: {
    type: Number,
    default: 0,
    require: true,
    maxlength: 1
  }
}, { versionKey: false });

const user = mongoose.model('User', userModal);

module.exports = user;