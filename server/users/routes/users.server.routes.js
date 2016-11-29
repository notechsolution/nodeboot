'use strict';
var path = require('path');
var config = require(path.resolve('./config/config'));

module.exports = function (app) {
  // User Routes
  var users = require('../controllers/users.server.controller');

  // Setting up the users profile api
  app.route('/api/users/me').get(users.me);
  app.route('/api/users').put(users.update);
  app.route('/api/users/accounts').delete(users.removeOAuthProvider);
  app.route('/api/users/password').post(users.changePassword);
  app.route('/api/users/picture').post(users.changeProfilePicture);
  app.route('/users').get(function (req,res) {
    res.render('server/users/views/user',{
      menuItems: JSON.stringify(config.utils.getMenuItems(config,req.user)),
      title:config.app.title
    });
  });


  // Finish by binding the user middleware
  app.param('userId', users.userByID);
};
