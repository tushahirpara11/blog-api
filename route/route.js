const express = require('express')
const router = express.Router();

const userAuth = require('../controller/usersController');
const userPost = require('../controller/postController');
const { verifyToken } = require('../middleware/middleware');

router.get('/login', userAuth.login);
router.post('/authenticate', userAuth.authenticate);
router.post('/user', userAuth.addUser);

router.get('/user/post', verifyToken, userPost.Post);
router.get('/post/user', verifyToken, userPost.getPost);
router.post('/post/user', verifyToken, userPost.addPost);
// router.get('/post/user', verifyToken, userPost.getPost);

module.exports = router;