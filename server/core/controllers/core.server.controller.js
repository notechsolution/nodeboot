'use strict';

var validator = require('validator'),
  path = require('path'),
  config = require(path.resolve('./config/config'));

/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
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

  res.render('server/core/views/index', {
    user: JSON.stringify(safeUserObject),
    sharedConfig: JSON.stringify(config.shared),
    menuItems: JSON.stringify(config.utils.getMenuItems(config,req.user)),
    title:config.app.title
  });
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('server/core/views/error', {
    menuItems: JSON.stringify(config.utils.getMenuItems(config,req.user)),
    title:config.app.title,
    user:JSON.stringify(req.user),
    errorView:'error_500'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  return res.status(400).render('server/core/views/error', {
    menuItems: JSON.stringify(config.utils.getMenuItems(config,req.user)),
    title:config.app.title,
    user:JSON.stringify(req.user),
    errorView:'error_400'
  });

};
