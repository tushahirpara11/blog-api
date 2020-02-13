const express = require('express')
const router = express.Router();

const userAuth = require('../controller/usersController');
const userPost = require('../controller/postController');
const { verifyToken } = require('../middleware/middleware');

router.get('/', userAuth.login);
router.get('/user/login', userAuth.login);
router.get('/user/register', userAuth.register);
router.post('/user/register', userAuth.addUser);
router.post('/authenticate', userAuth.authenticate);
router.get('/user/logout', userAuth.logout);

router.get('/user/post', verifyToken, userPost.Post);
router.get('/post/user', verifyToken, userPost.getPost);
router.post('/post/user', verifyToken, userPost.addPost);
router.post('/post/like', verifyToken, userPost.like);

module.exports = router;