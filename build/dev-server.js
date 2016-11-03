'use strict';

/**
 * Module dependencies.
 */
var app = require('../config/lib/app');
var webpack = require('./webpack-build')
app.start(function(app){
  webpack.package(app)
});
