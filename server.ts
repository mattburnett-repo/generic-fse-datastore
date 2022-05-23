
var express = require('express');
var server = express();

const loaders = require('./loaders/index.ts');
loaders(server); 

module.exports = server;