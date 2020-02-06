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

module.exports = { addPost };