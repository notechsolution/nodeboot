// https://github.com/shelljs/shelljs
require('shelljs/global')
var webpack = require('webpack')
var config = require('../config/config')
var path = require('path')
var utils = require('./utils')


module.exports.package = function (app, callback) {

  var entries = utils.getEntries(config.files.client.entries);
  initDistFolder(entries);

  var webpackConfig = process.env.NODE_ENV === 'development'
    ? require('./webpack.dev.conf')(entries)
    : require('./webpack.prod.conf')(entries)

  var compiler = webpack(webpackConfig)
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
      hotMiddleware.publish({ action: 'reload' })
      cb()
    })
  })

// serve webpack bundle output
  app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
  app.use(hotMiddleware)


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
    var views = config.utils.getGlobbedPaths(viewPath+'/**/*.server.view.html');
    views.forEach(function (viewHtmlPath) {

      var viewName = viewHtmlPath.substring((viewHtmlPath.lastIndexOf("/")+1),viewHtmlPath.lastIndexOf(".server.view.html"));
      if(entries[viewName]){
        // inject the dependency js file into ejs file
        var scriptCode = '<script src="/dist/'+viewName+'.js"></script>';
        sed('-i',/<inject-scripts>/, scriptCode+'\r\n',viewHtmlPath);
      }

    });
  }
}
