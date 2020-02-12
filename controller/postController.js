require('dotenv').config();
const jwt = require('jsonwebtoken');

const postModel = require('../model/postModel');
const { Message } = require('../commonFunction/commonFunction');

async function addPost(req, res) {
  req.body.uid = req.user;
  let postData = new postModel(req.body);
  try {
    await postData.save();
    res.render('addPost', { msg: "Post Added Successfully", email: req.user });
  } catch (err) {
    res.render('addPost', { msg: "Problem While Post Adding.", email: req.user });
  }
}
function Post(req, res) {
  res.render('addPost', { msg: "", email: req.user });
}
async function getPost(req, res) {
  try {
    let post;
    if (req.type == 0) {
      post = await postModel.find({ uid: req.user });
      post.length > 0 ? res.render('viewPost', { msg: "", post: post, email: req.user }) :
        res.render('viewPost', { msg: "No Post Found", email: req.user });
    }
    else {
      post = await postModel.find({});
      post.length > 0 ? res.render('viewPost', { msg: "", post: post, email: req.user }) :
        res.render('viewPost', { msg: "No Post Found", email: req.user });
    }
  } catch (err) {
    res.json(Message(false, "Error", err));
  }
}

module.exports = { addPost, getPost, Post };