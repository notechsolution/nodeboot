var path = require('path')
var generalConfig = require('../config/config')
var config = require('../config/config').webpack
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var webpackConfigs = function (entries) {
  var views = getViews();
  var webpackConfigArray = [];
  Object.keys(entries).forEach(function (name) {
    var entry = {};
    entry[name] = entries[name];

    var webpackConfig = merge(baseWebpackConfig, {
      entry: entry,
      module: {
        loaders: utils.styleLoaders({sourceMap: config.productionSourceMap, extract: true})
      },
      devtool: config.productionSourceMap ? '#source-map' : false,
      output: {
        path: config.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
      },
      vue: {
        loaders: utils.cssLoaders({
          sourceMap: config.productionSourceMap,
          extract: true
        })
      },
      plugins: [
        // http://vuejs.github.io/vue-loader/workflow/production.html
        new webpack.DefinePlugin({
          'process.env': config.env
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        // extract css into its own file
        new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin

        new HtmlWebpackPlugin({
          filename: views[name],
          template: views[name],
          inject: true,
          minify: {
            removeComments: false,
            collapseWhitespace: true,
            removeAttributeQuotes: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
          },
          // necessary to consistently work with multiple chunks via CommonsChunkPlugin
          chunksSortMode: 'dependency'
        }),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks: function (module, count) {
            // any required modules inside node_modules are extracted to vendor
            return (
              module.resource &&
              /\.js$/.test(module.resource) &&
              module.resource.indexOf(
                path.join(__dirname, '../node_modules')
              ) === 0
            )
          }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
          name: 'manifest',
          chunks: ['vendor']
        })
      ]
    });

    if (config.productionGzip) {
      var CompressionWebpackPlugin = require('compression-webpack-plugin')

      webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
            '\\.(' +
            config.productionGzipExtensions.join('|') +
            ')$'
          ),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }

    webpackConfigArray.push(webpackConfig);
  })

  return webpackConfigArray;
}

var getViews = function(){
  var viewPath = path.join(config.assetsRoot, config.assetsViewDirectory)
  var srcViews = generalConfig.utils.getGlobbedPaths(viewPath + '/**/*.server.view.html');
  var views = {};
  srcViews.forEach(function (srcView) {
    var fileName = srcView.substring(srcView.lastIndexOf('/')+1);
    var entryName = fileName.substring(0,fileName.indexOf('.'));
    views[entryName] = srcView;
  });
  return views;

}

module.exports = webpackConfigs
