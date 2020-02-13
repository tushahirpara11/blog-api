require('dotenv').config();
const jwt = require('jsonwebtoken');
const bycrpt = require('bcrypt');

const userModel = require('../model/userModel');
const { Message } = require('../commonFunction/commonFunction');

function login(req, res) {
  res.render('login', { msg: req.flash('error'), credential: req.flash('credential'),register: req.flash('register'), email: req.userName });
}

function register(req, res) {
  res.render('register', { email: req.userName });
}

async function addUser(req, res) {
  const count = await userModel.findOne({ userName: req.body.userName, contact: req.body.contact })
  if (count === null) {
    req.body.password = await bycrpt.hash(req.body.password, 10);
    let addUser = new userModel(req.body);
    try {
      await addUser.save();
      req.flash('register', 'User Created Successfully..');
      res.redirect('/user/login');
    } catch (err) {
      res.json(Message("false", "Error", err));
    }
  } else {
    req.flash('error', 'User already exists..!');
    res.redirect('/user/login');
  }
}

function cookiesVerify(req, res, token) {
  if (req.cookies.token === undefined) {
    res.cookie('token', token, { maxAge: 900000, httpOnly: true }).redirect('/post/user');
  } else {
    req.flash('error', 'User already logged in');
    res.redirect('/user/post');
  }
}

function logout(req, res) {
  res.clearCookie('token').redirect('/user/login');
}

function authenticate(req, res) {
  new Promise(function (resolve, reject) {
    userModel.findOne({ userName: req.body.userName }, function (err, data) {
      if (data) {
        return resolve(data);
      }
      if (err) {
        return reject(new Error(err));
      }
    });
  }).then(function (data) {
    if (bycrpt.compareSync(req.body.password, data.password)) {
      jwt.sign({ data }, process.env.SECRET_KEY, function (err, token) {
        cookiesVerify(req, res, token);
      });
    } else {
      req.flash('error', 'Invalid credential');
      res.redirect('/user/login');
    }
  }).catch(function (err) {
    throw err;
  })
}

module.exports = { addUser, authenticate, login, register, logout };