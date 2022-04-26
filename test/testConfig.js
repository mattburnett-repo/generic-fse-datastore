
// var express = require('express');
// var app = express();

// const loaders = require('../loaders');
// loaders(app); 

// app.listen((0), () => {
//   console.log(`Server listening`);
// })

const app = require('../index.js')
// const app = require('../testServer.js') // identical to ../index.js, but on random port, not 4000  
// const app = require ('../server.js')

const request = require('supertest')(app)  
// const request = require('supertest')   

// Do this to enable auth persistence
//      https://stackoverflow.com/questions/14001183/how-to-authenticate-supertest-requests-with-passport
// const persistedRequest = require("supertest").agent(app);

const expect = require("chai").expect;

module.exports = {
  // app,
  request,
  // persistedRequest,
  expect,
};