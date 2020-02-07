require('dotenv').config();
const jwt = require('jsonwebtoken');

const userModel = require('../model/userModel');
const { Message } = require('../commonFunction/commonFunction');

function login(req, res) {
  res.render('index');
}

async function addUser(req, res) {
  const count = await userModel.find({ userName: req.body.userName, contact: req.body.contact })
  if (count.length != 1) {
    let addUser = new userModel(req.body);
    try {
      const userData = await addUser.save();
      res.json(Message(200, "true", "User Added", userData));
    } catch (err) {
      res.json(Message("false", "Error", err));
    }
  } else {
    res.json(Message("false", "Data already Exists"));
  }
}
function cookiesVerify(req, res, token) {
  if (req.cookies[req.body.userName] === undefined) {
    res.send(Message(200, "true", "OK", token, 'Token Generated')).
      cookie(req.body.userName, token, { maxAge: 900000, httpOnly: true });
  } else {
    res.json(Message(400, "false", "You ar0e already logged in", ''));
  }
}

async function authenticate(req, res) {
  try {
    const user = await userModel.findOne({ userName: req.body.userName, password: req.body.password }, { password: 0 });
    if (user != null) {
      jwt.sign({ user }, process.env.SECRET_KEY, function (err, token) {
        if (token) {
          cookiesVerify(req, res, token);
        }
      });
    } else {
      res.json(Message(400, "false", 'OK', 'User Not Found'));
    }
  } catch (err) {
    res.json(Message(400, "false", 'Bad Request', ''));
  }
}

module.exports = { addUser, authenticate, login };