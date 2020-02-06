const express = require('express')
const router = express.Router();

const userAuth = require('../controller/usersController');
const userPost = require('../controller/postController');
const { verifyToken } = require('../middleware/middleware');

router.post('/user', userAuth.addUser);
router.post('/login', userAuth.authenticate);
router.post('/user/post', verifyToken, userPost.addPost);

module.exports = router;