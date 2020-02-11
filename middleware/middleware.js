const jwt = require('jsonwebtoken');

const { Message } = require('../commonFunction/commonFunction');

exports.verifyToken = function (req, res, next) {
  const headers = req.cookies.token;
  if (typeof headers != 'undefined') {
    jwt.verify(headers, process.env.SECRET_KEY, (err, decode) => {
      if (err) res.json(Message("false", "Invalid Token"));
      req.user = decode.user.userName;
      req.type = decode.user.type;
      next();
    });
  } else {    
    res.redirect('/user/login');
  }
}