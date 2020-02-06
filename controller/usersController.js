require('dotenv').config();
const jwt = require('jsonwebtoken');

const userModel = require('../model/userModel');
const { Message } = require('../commonFunction/commonFunction');

async function addUser(req, res) {
  console.log(req.body);
  let addUser = new userModel(req.body);
  try {
    const userData = await addUser.save();
    res.json(Message(200, "true", "User Added", userData));
  } catch (err) {
    res.json(Message(false, "Error", err));
  }
}

async function authenticate(req, res) {
  try {
    const user = await userModel.findOne({ userName: req.body.userName, password: req.body.password }, { password: 0 });
    if (user != null) {      
      jwt.sign(user.userName, process.env.SECRET_KEY, function (err, token) {
        res.json(Message(200, 'OK', 'Token Created', token));
      });
    }
  } catch (err) {
    res.json(message(400, 'Bad Request', 'User not exists'));
  }
}

module.exports = { addUser, authenticate };