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
  useName: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true,
    maxlength: 15
  },
  contact: {
    type: String,
    require: true,
    maxlength: 13
  },
  type: {
    type: Number,
    require: true,
    maxlength: 1
  }
});

const user = mongoose.model('user', userModal);

module.exports = { user };