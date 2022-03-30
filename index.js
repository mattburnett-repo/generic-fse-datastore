// git push heroku main

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require('express');
var app = express();

const loaders = require('./loaders');
loaders(app); 

var PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)

module.exports = app;