require('dotenv').config();
const jwt = require('jsonwebtoken');

const postModel = require('../model/postModel');
const { Message } = require('../commonFunction/commonFunction');

async function addPost(req, res) {
  req.body.uid = req.user;
  let postData = new postModel(req.body);
  try {
    const post = await postData.save();
    res.json(Message(200, "true", "Post Added", post));
  } catch (err) {
    res.json(Message(false, "Error", err));
  }
}
function Post(req,res) {
  res.render('addPost');
}
async function getPost(req, res) {
  try {
    let post;
    if (req.type == 0) {
      post = await postModel.find({ uid: req.user });
      post.length > 0 ? res.json(Message(200, "true", "Post Found", post)) :
        res.json(Message(200, "false", "Post Not Found"));
    }
    else {
      post = await postModel.find({});
      post.length > 0 ? res.json(Message(200, "true", "Post Found", post)) :
        res.json(Message(200, "false", "Post Not Found"));
    }
  } catch (err) {
    res.json(Message(false, "Error", err));
  }
}

module.exports = { addPost, getPost, Post };