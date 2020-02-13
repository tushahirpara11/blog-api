require('dotenv').config();

const postModel = require('../model/postModel');
const postLikeModel = require('../model/postLikeModel');
const { Message } = require('../commonFunction/commonFunction');

async function addPost(req, res) {
  req.body.uid = req.user;
  let postData = new postModel(req.body);
  try {
    await postData.save();
    req.flash('success', "Post Added Successfully");
    res.redirect('/post/user');
  } catch (err) {
    req.flash('error', "Problem While Post Adding.");
    res.redirect('/user/post');
  }
}
function Post(req, res) {
  res.render('addPost', { msg: req.flash('error'), email: req.user });
}
async function getPost(req, res) {
  try {
    let post;
    if (req.type == 0) {
      post = await postModel.find({ uid: req.user });
      let like = await postLikeModel.find({});      
      post.length > 0 ? res.render('viewPost', { success: req.flash('success'), msg: "", like: like, post: post, email: req.user }) :
        res.render('viewPost', { success: req.flash('success'), msg: "No Post Found", email: req.user });
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

async function like(req, res) {
  try {
    console.log(req.body)
    const likeExists = await postLikeModel.findOne({ pid: req.body.pid, uid: req.body.uid, status: { $eq: 1 } });    
    if (likeExists) {
      await postLikeModel.updateOne({ pid: req.body.pid, uid: req.body.uid },
        { $set: { pid: req.body.pid, uid: req.body.uid, status: 0 } },
        { upsert: true });
    } else {
      await postLikeModel.updateOne({ pid: req.body.pid, uid: req.body.uid },
        { $set: { pid: req.body.pid, uid: req.body.uid, status: 1 } },
        { upsert: true }
      );
    }
    res.redirect('/post/user');
  } catch (err) {
    console.log("Error occured while liking a post", err);
  }
}

module.exports = { addPost, getPost, Post, like };