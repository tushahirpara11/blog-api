const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const routes = require('./route/route');
const app = express();

app.use(bodyparser.text());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/css/'));

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
  if (err) throw err;
  console.log('connection established ..!')
});
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://${process.env.HOSTNAME}:${process.env.PORT}/`);
});