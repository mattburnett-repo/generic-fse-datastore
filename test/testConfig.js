
// var express = require('express');
// var app = express();

// const loaders = require('../loaders');
// loaders(app); 

// app.listen(() => {
//   console.log(`Server listening on port ${PORT}`);
// })

const app = require('../index.js')

const request = require('supertest')(app)

// Do this to enable auth persistence
//      https://stackoverflow.com/questions/14001183/how-to-authenticate-supertest-requests-with-passport
const persistedRequest = require("supertest").agent(app);

const expect = require("chai").expect;

module.exports = {
  request,
  persistedRequest,
  expect,
};