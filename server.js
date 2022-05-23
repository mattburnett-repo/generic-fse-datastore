
var express = require('express');
var app = express();

const loaders = require('./loaders');
loaders(app); 

module.exports = app;