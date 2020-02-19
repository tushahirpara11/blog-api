const express = require('express')
const router = express.Router();

const userAuth = require('../controller/usersController');
const userPost = require('../controller/postController');
const { verifyToken } = require('../middleware/middleware');

router.get('/', verifyToken, userAuth.index);
router.get('/users/login', userAuth.login);
router.get('/users/register', userAuth.register);
router.post('/users/register', userAuth.addUser);
router.post('/authenticate', userAuth.authenticate);
router.get('/user/:id/logout', userAuth.logout);

router.get('/users/:id/post', verifyToken, userPost.Post);
router.get('/users/:id/posts', verifyToken, userPost.getPost);
router.post('/users/:id/post', verifyToken, userPost.addPost);
router.post('/users/:id/posts/:id/like', verifyToken, userPost.like);

module.exports = router;