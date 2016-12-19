'use strict';

/**
 * Module dependencies.
 */

process.env.NODE_ENV = 'production';
var app = require('../config/lib/app');
var webpack = require('./webpack-build')

webpack.package(null,function(){
  app.start();
})

