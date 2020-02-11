require('dotenv').config();
const jwt = require('jsonwebtoken');

const userModel = require('../model/userModel');
const { Message } = require('../commonFunction/commonFunction');

function login(req, res) {
  res.render('login', { email: req.userName });
}

function register(req, res) {
  res.render('register', { email: req.userName });
}

async function addUser(req, res) {
  const count = await userModel.find({ userName: req.body.userName, contact: req.body.contact })
  if (count.length != 1) {
    let addUser = new userModel(req.body);
    try {
      await addUser.save();
      res.redirect('/user/login');
    } catch (err) {
      res.json(Message("false", "Error", err));
    }
  } else {
    res.redirect('/user/login');
  }
}

function cookiesVerify(req, res, token) {
  if (req.cookies.token === undefined) {
    res.cookie('token', token, { maxAge: 900000, httpOnly: true }).redirect('/post/user');
  } else {  
    res.json(Message(400, "false", 'OK', 'User Already Login'));    
  }
}

function logout(req, res) {
  res.clearCookie('token').redirect('/user/login');
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
      res.redirect('/user/login');
    }
  } catch (err) {
    res.json(Message(400, "false", 'Bad Request', ''));
  }
}

module.exports = { addUser, authenticate, login, register, logout };