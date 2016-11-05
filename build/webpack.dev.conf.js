var config = require('../config/config').webpack
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (entries){
  // add hot-reload related code to entry chunks
  Object.keys(entries).forEach(function (name) {
    entries[name] = ['./build/dev-client'].concat(entries[name])
  })

  return merge(baseWebpackConfig, {
    entry: entries,
    module: {
      loaders: utils.styleLoaders({ sourceMap: config.cssSourceMap })
    },
    // eval-source-map is faster for development
    devtool: '#eval-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': config.env
      }),
      // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      // https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true
      })
    ]
  })
}
