var webpack = require('webpack')
var webpackConfig = process.env.NODE_ENV === 'development'
  ? require('./webpack.dev.conf')
  : require('./webpack.prod.conf')

module.exports.package = function(app,callback){

// Define HTTP proxies to your custom API backend
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
