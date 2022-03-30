var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

// CORS docs: https://expressjs.com/en/resources/middleware/cors.html
var cors = require('cors');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

module.exports = (app) => {
    const corsOptions = {
        origin: process.env.REACT_APP_APP_BASE_URL,
        credentials: true
      };

    app.use(cors(corsOptions));

    app.use(favicon(path.join(__dirname, '../public/images', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use(express.static(path.join(__dirname, '../public')));

    return app;
}