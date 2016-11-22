'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
  mongoose = require('./mongoose'),
  express = require('./express'),
  chalk = require('chalk'),
  seed = require('./seed'),
  graceful = require('graceful');

function seedDB() {
  if (config.seedDB && config.seedDB.seed) {
    console.log(chalk.bold.red('Warning:  Database seeding is turned on'));
    seed.start();
  }
}

// Initialize Models
mongoose.loadModels(seedDB);

module.exports.init = function init(callback) {
  mongoose.connect(function (db) {
    // Initialize express
    var app = express.init(db);
    if (callback) callback(app, db, config);

  });
};

var server = null;
module.exports.start = function start(callback) {
  var _this = this;

  _this.init(function (app, db, config) {

    // Start the app by listening on <port> at <host>
    server = app.listen(config.port, config.host, function () {
      // Create server URL
      var serverUrl = (process.env.NODE_ENV === 'secure' ? 'https://' : 'http://') + config.host + ':' + config.port;
      // Logging initialization
      console.log('--');
      console.log(chalk.green(config.app.title));
      console.log();
      console.log(chalk.green('Environment:     ' + process.env.NODE_ENV));
      console.log(chalk.green('Server:          ' + serverUrl));
      console.log(chalk.green('Database:        ' + config.db.uri));
      console.log(chalk.green('App version:     ' + config.meanjs.version));
      if (config.meanjs['meanjs-version'])
        console.log(chalk.green('NodeBoot.JS version: ' + config.meanjs['meanjs-version']));
      console.log('--');

      if (callback) callback(app, db, config);
    });

    //Graceful shutdown and handler for uncaughtexception

    // listen terminal signal and handle it .e.g. kill
    process.on('SIGTERM', gracefulShutdown);
    // listen INT signal  and handle it. e.g. Ctrl-C
    process.on('SIGINT', gracefulShutdown);
        graceful({
          servers: [app],
          error: function (err) {
            console.error('catch onuncaughtException: ' + err.stack);
          },
          killTimeout: '30s'
        });

  });

};


// this function is called when you want the server to die gracefully
// any other system level destroy function can be applied here
// i.e. wait for existing connections
var gracefulShutdown = function () {
  console.log("Received shutdown signal, shutting down gracefully.");
  server.close();
  mongoose.disconnect();
  process.exit();
  // if after
  setTimeout(function () {
    console.error("Could not close connections in time, forcefully shutting down");
    process.exit();
  }, 10 * 1000);
};


