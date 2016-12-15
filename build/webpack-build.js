// https://github.com/shelljs/shelljs
require('shelljs/global')
var webpack = require('webpack')
var config = require('../config/config')
var path = require('path')
var utils = require('./utils')
var async = require('async')


module.exports.package = function (app, callback) {

  var entries = utils.getEntries(config.files.client.entries);
  initDistFolder(entries);

  var webpackConfig = process.env.NODE_ENV === 'development'
    ? require('./webpack.dev.conf')(entries)
    : require('./webpack.prod.conf')(entries)

  if (process.env.NODE_ENV === 'development') {
    var compiler = webpack(webpackConfig);
    var devMiddleware = require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true,
        chunks: false
      }
    })

    var hotMiddleware = require('webpack-hot-middleware')(compiler)
    // force page reload when html-webpack-plugin template changes
    compiler.plugin('compilation', function (compilation) {
      compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({action: 'reload'})
        cb()
      })
    })

    // serve webpack bundle output
    app.use(devMiddleware)

    // enable hot-reload and state-preserving
    // compilation error display
    app.use(hotMiddleware);

    if (callback) {
      callback();
    }
  } else {
    // webpackConfig.forEach(function (webpackConfigItem){
    //   console.log(JSON.stringify(webpackConfigItem));
    //   webpack(webpackConfigItem, function (err, stats) {
    //     // spinner.stop()
    //     if (err) throw err
    //     process.stdout.write(stats.toString({
    //         colors: true,
    //         modules: false,
    //         children: false,
    //         chunks: false,
    //         chunkModules: false
    //       }) + '\n')
    //   });
    // })

    async.eachLimit(webpackConfig,5, function(webpackConfigItem, callback) {

      // Perform operation on file here.
      console.log('Processing entry ' + JSON.stringify(webpackConfigItem.entry));
      webpack(webpackConfigItem, function (err, stats) {
        // spinner.stop()
        if (err){
          callback(err);
          return;
        }
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
          }) + '\n');

        callback();
      });

    }, function(err) {
      // if any of the file processing produced an error, err would equal that error
      if( err ) {
        // One of the iterations produced an error.
        // All processing will now stop.
        console.log('one entry failed failed to process');
      } else {
        console.log('All entries have been processed successfully');
      }
    });


  }


}

var initDistFolder = function (entries) {
  var assetsPath = path.join(config.webpack.assetsRoot, config.webpack.assetsSubDirectory)
  var viewPath = path.join(config.webpack.assetsRoot, config.webpack.assetsViewDirectory)
  //clear dist folder
  rm('-rf', config.webpack.assetsRoot)

  //prepare view and static folder
  mkdir('-p', assetsPath)
  mkdir('-p', viewPath)

  // copy static content into dist
  cp('-R', 'static/', assetsPath)

  //copy views from server folders
  var folders = ls('-d', 'server/*')
  folders.forEach(function (folder) {
    if (test('-d', folder + '/views/')) {
      var dest = viewPath + '/' + folder + '/views';
      mkdir('-p', dest);
      cp('-Rf', folder + '/views/', dest)
    }
  });

  //inject js into view file for development mode, for production env, inject via webpack directly
  if (process.env.NODE_ENV === 'development') {
    var views = config.utils.getGlobbedPaths(viewPath + '/**/*.server.view.html');
    views.forEach(function (viewHtmlPath) {

      var viewName = viewHtmlPath.substring((viewHtmlPath.lastIndexOf("/") + 1), viewHtmlPath.lastIndexOf(".server.view.html"));
      if (entries[viewName]) {
        // inject the dependency js file into ejs file
        var scriptCode = '<script src="/dist/' + viewName + '.js"></script>';
        // sed('-i',/<inject-scripts>/, scriptCode+'\r\n',viewHtmlPath);
        sed('-i', /<injected-scripts\/>/, scriptCode + '\r\n', viewHtmlPath);
      }

    });
  }
}
