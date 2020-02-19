const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const flash = require('req-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const layout = require('express-ejs-layouts');
require('dotenv').config();

const routes = require('./route/route');

const app = express();

app.use(layout);
app.use(bodyparser.text());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  saveUninitialized: true,
  secret: 'adjhalfj!@',
  resave: true,
}));

app.use(flash());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/css'));

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
  if (err)
    console.log("Connection String Error. DB not conected");
  else
    console.log('Connection established ..!')
});
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://${process.env.HOSTNAME}:${process.env.PORT}/`);
});