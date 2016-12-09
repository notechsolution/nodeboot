'use strict';

var path = require('path'),
  config = require(path.resolve('./config/config')),
  _ = require('lodash');

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller.js');

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/').get(core.renderIndex);

  // Define application route
  app.route('/*').get(function(req,res,next){
    var staticPath = config.webpack.assetsPublicPath;
    if(_.startsWith(req.originalUrl,staticPath) || _.startsWith(req.originalUrl,'/__webpack_hmr')){
      next();
    } else {
      core.renderNotFound(req,res);
    }
  });
};
