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
    res.redirect(`/users/${req.user}/posts`);
  } catch (err) {
    req.flash('error', "Problem While Post Adding.");
    res.redirect(`/users/post`);
  }
}
function Post(req, res) {
  res.render('addPost', { msg: req.flash('error'), email: req.user });
}
async function getPost(req, res) {
  try {
    let post, like, cntLike, likeCounter = [], a = {};
    if (req.type == 0) {
      try {
        post = await postModel.find({ uid: req.user });
        try {
          like = await postLikeModel.find({});
        } catch (err) {
          res.send(Message(400, false, `Error occured while finding post's like: ${err}`));
        }
        try {
          for (let i = 0; i < post.length; i++) {
            cntLike = await postLikeModel.aggregate([{
              "$match": { pid: { $eq: "" + post[i]._id } }
            }, { $group: { _id: post[i]._id, count: { $sum: 1 } } }]);
            if (cntLike.length) {
              likeCounter.push(cntLike);
            } else {
              likeCounter.push([a]);
            }
          }
        } catch (err) {
          res.send(Message(400, false, `Error occured while couting post's like: ${err}`));
        }
      }
      catch (err) {
        res.send(Message(400, false, `Error occured while finding post by user: ${err}`));
      }
      post.length > 0 ? res.render('viewPost', {
        success: req.flash('success'),
        msg: "", like: like, likeCount: likeCounter.flat(), post: post, email: req.user
      }) : res.render('viewPost', {
        success: req.flash('success'), like: like, likeCount: likeCounter.flat(),
        post: post, msg: "No Post Found", email: req.user
      });
    }
    else {
      try {
        post = await postModel.find({});
        try {
          like = await postLikeModel.find({});
        } catch (err) {
          res.send(Message(400, false, `Error occured while finding post's like: ${err}`));
        }
        try {
          for (let i = 0; i < post.length; i++) {
            cntLike = await postLikeModel.aggregate([{ "$match": { pid: { $eq: "" + post[i]._id } } }
              , { $group: { _id: post[i]._id, count: { $sum: 1 } } }]);
            if (cntLike.length) {
              likeCounter.push(cntLike);
            } else {
              likeCounter.push([a]);
            }
          }
        } catch (err) {
          res.send(Message(400, false, `Error occured while couting post's like: ${err}`));
        }
      }
      catch (err) {
        res.send(Message(400, false, `Error occured while finding post: ${err}`));
      }
      post.length > 0 ? res.render('viewPost', {
        success: req.flash('success'), msg: "", like: like, likeCount: likeCounter.flat(),
        post: post, email: req.user
      }) :
        res.render('viewPost', {
          success: req.flash('success'), like: like, likeCount: likeCounter.flat(),
          post: post, msg: "No Post Found", email: req.user
        });
    }
  } catch (err) {
    res.json(Message(false, "Error", err));
  }
}

async function like(req, res) {
  let resData, flag = 0;
  try {
    const likeExists = await postLikeModel.findOne({
      pid: req.body.pid, uid: req.body.uid
    });
    if (likeExists) {
      try {
        resData = await postLikeModel.remove({ pid: req.body.pid, uid: req.body.uid });
        if (resData) {
          flag = 0;
        }
      } catch (err) {
        res.send(Message(400, false, `Error occured while liking a post ${err}`));
      }
    } else {
      try {
        data = new postLikeModel(req.body);
        resData = await data.save();
        if (resData) {
          flag = 1;
        }
      } catch (err) {
        res.send(Message(400, false, `Error occured while liking a post: ${err}`));
      }
    }
    res.json(flag);
  } catch (err) {
    res.send(Message(400, false, `Error occured while liking a post: ${err}`));
  }
}

module.exports = { addPost, getPost, Post, like };