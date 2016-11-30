'use strict';
var path = require('path');
var config = require(path.resolve('./config/config'));
var validator = require('validator')

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
    var safeUserObject = null;
    if (req.user) {
      safeUserObject = {
        displayName: validator.escape(req.user.displayName),
        provider: validator.escape(req.user.provider),
        username: validator.escape(req.user.username),
        created: req.user.created.toString(),
        roles: req.user.roles,
        profileImageURL: req.user.profileImageURL,
        email: validator.escape(req.user.email),
        lastName: validator.escape(req.user.lastName),
        firstName: validator.escape(req.user.firstName),
        additionalProvidersData: req.user.additionalProvidersData
      };
    }
    res.render('server/users/views/user',{
      user: JSON.stringify(safeUserObject),
      menuItems: JSON.stringify(config.utils.getMenuItems(config,req.user)),
      title:config.app.title
    });
  });


  // Finish by binding the user middleware
  app.param('userId', users.userByID);
};
