const express = require('express')
const router = express.Router();

const userAuth = require('../controller/usersController');
// const { verifyToken } = require('../middleware/middleware');

router.post('/user', userAuth.addUser);

module.exports = router;