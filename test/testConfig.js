
const app = require('../index.js')
const request = require("supertest")(app);

// Do this to enable auth persistence
//      https://stackoverflow.com/questions/14001183/how-to-authenticate-supertest-requests-with-passport
const persistedRequest = require("supertest").agent(app);

const expect = require("chai").expect;

module.exports = {
  request,
  persistedRequest,
  expect,
};