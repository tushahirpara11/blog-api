require('dotenv').config();
const jwt = require('jsonwebtoken');
const bycrpt = require('bcrypt');

const userModel = require('../model/userModel');
const { Message } = require('../commonFunction/commonFunction');

function login(req, res) {
  res.render('login', {
    msg: req.flash('error'),
    credential: req.flash('credential'),
    register: req.flash('register'),
    email: req.user
  });
}

function index(req, res) {
  res.render('index', {
    msg: req.flash('error'),
    credential: req.flash('credential'),
    register: req.flash('register'),
    email: req.user
  });
}

function register(req, res) {
  res.render('register', { email: req.user });
}

async function addUser(req, res) {
  try {
    const count = await userModel.findOne({
      userName: req.body.userName,
      contact: req.body.contact
    });
    if (count === null) {
      req.body.password = await bycrpt.hash(req.body.password, 10);
      let addUser = new userModel(req.body);
      try {
        addUser.save();
        req.flash('register', 'User Created Successfully..');
        res.redirect('/users/login');
      } catch (err) {
        res.send(Message(400, false, `Error occured while registering user: ${err}`));
      }
    } else {
      req.flash('error', 'User already exists..!');
      res.redirect('/users/login');
    }
  } catch (err) {
    res.send(Message(400, false, `Error occured in userModel while finding user: ${err}`));
  }
}

function cookiesVerify(req, res, token, id) {
  if (req.cookies.token === undefined) {
    res.cookie('token', token, { maxAge: 900000, httpOnly: true }).redirect(`/users/${id}/posts`);
  } else {
    req.flash('error', 'User already logged in');
    res.redirect(`/users/${id}/posts`);
  }
}

function logout(req, res) {
  res.clearCookie('token').redirect('/users/login');
}

async function authenticate(req, res) {
  try {
    await userModel.findOne({ userName: req.body.userName }, function (err, data) {
      if (data) {
        if (bycrpt.compareSync(req.body.password, data.password)) {
          jwt.sign({ data }, process.env.SECRET_KEY, function (err, token) {
            if (!err) {
              cookiesVerify(req, res, token, data.userName);
            } else {
              res.send(Message(400, false, `Error occured while signing a token: ${err}`));
            }
          });
        } else {
          req.flash('error', 'Invalid credential');
          res.redirect('/users/login');
        }
      }
    });
  } catch (err) {
    res.send(Message(400, false, `Error occured in userModel while finding user: ${err}`));
  }
}

module.exports = { addUser, authenticate, index, login, register, logout };