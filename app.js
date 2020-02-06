const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require('./route/route');
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
  if(err) throw err;
  console.log('connection established ..!')
});
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://${process.env.HOSTNAME}:${process.env.PORT}/`);
});