const jwt = require('jsonwebtoken');

const { Message } = require('../commonFunction/commonFunction');

exports.verifyToken = function (req, res, next) {
  const headers = req.cookies.token;
  if (typeof headers != 'undefined') {
    jwt.verify(headers, process.env.SECRET_KEY, (err, decode) => {
      if (err) res.json(Message("false", "Invalid Token"));
      req.user = decode.data.userName;
      req.type = decode.data.type;
      next();
    });
  } else {
    req.flash('credential','User must be login..!')
    res.redirect('/users/login');
  }
}