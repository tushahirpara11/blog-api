require('dotenv').config();

const postModel = require('../model/postModel');
const postLikeModel = require('../model/postLikeModel');
const { Message } = require('../commonFunction/commonFunction');

function addPost(req, res) {
  req.body.uid = req.user;
  let postData = new postModel(req.body);
  try {
    postData.save();
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
    let post, like;
    if (req.type == 0) {
      try {
        post = await postModel.find({ uid: req.user });
        try {
          like = await postLikeModel.find({});
        } catch (err) {
          res.send(Message(400, false, `Error occured while finding post's like: ${err}`));
        }
      }
      catch (err) {
        res.send(Message(400, false, `Error occured while finding post by user: ${err}`));
      }
      post.length > 0 ? res.render('viewPost', {
        success: req.flash('success'),
        msg: "", like: like, post: post, email: req.user
      }) : res.render('viewPost', {
        success: req.flash('success'), like: like,
        post: post, msg: "No Post Found", email: req.user
      });
    }
    else {
      post = await postModel.find({});
      like = await postLikeModel.find({});
      post.length > 0 ? res.render('viewPost', {
        success: req.flash('success'), msg: "", like: like,
        post: post, email: req.user
      }) :
        res.render('viewPost', {
          success: req.flash('success'), like: like,
          post: post, msg: "No Post Found", email: req.user
        });
    }
  } catch (err) {
    res.json(Message(false, "Error", err));
  }
}

async function like(req, res) {
  try {
    const likeExists = await postLikeModel.findOne({
      pid: req.body.pid, uid: req.body.uid,
      status: { $eq: 1 }
    });
    if (likeExists) {
      try {
        await postLikeModel.updateOne({ pid: req.body.pid, uid: req.body.uid },
          { $set: { status: 0 } });
      } catch (err) {
        res.send(Message(400, false, `Error occured while liking a post ${err}`));
      }
    } else {
      try {
        await postLikeModel.updateOne({ pid: req.body.pid, uid: req.body.uid },
          { $set: { status: 1 } },
          { upsert: true });
      } catch (err) {
        res.send(Message(400, false, `Error occured while liking a post: ${err}`));
      }
    }
    res.redirect('/post/user');
  } catch (err) {
    res.send(Message(400, false, `Error occured while liking a post: ${err}`));
  }
}

module.exports = { addPost, getPost, Post, like };