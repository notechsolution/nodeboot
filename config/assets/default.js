'use strict';

/* eslint comma-dangle:[0, "only-multiline"] */

module.exports = {
  client: {
    entries: ['client/entries/**/*.js','client/entries/*.js']
  },
  server: {
    gulpConfig: ['gulpfile.js'],
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'server/*/models/**/*.js',
    routes: ['server/!(core)/routes/**/*.js', 'server/core/routes/**/*.js'],
    sockets: 'server/*/sockets/**/*.js',
    config: ['server/*/config/*.js'],
    policies: 'server/*/policies/*.js',
    views: ['server/*/views/*.html']
  }
};
