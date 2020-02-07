const express = require('express')
const router = express.Router();

const userAuth = require('../controller/usersController');
const userPost = require('../controller/postController');
const { verifyToken } = require('../middleware/middleware');

router.get('/user', userAuth.login);
router.post('/login', userAuth.authenticate);
router.post('/user', userAuth.addUser);
router.post('/post/user', verifyToken, userPost.addPost);
router.get('/post/user', verifyToken, userPost.getPost);


module.exports = router;