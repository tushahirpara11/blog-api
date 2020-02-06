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

module.exports = {addUser};