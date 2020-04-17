var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var env = config.build.env
var MinifyPlugin = require('babel-minify-webpack-plugin');
var JavaScriptObfuscator = require('webpack-obfuscator');
// var RemoveWebpackPlugin = require('remove-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var metaJson = JSON.parse(utils.metaInfo());


var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,//path.resolve(__dirname, '../dist'),
    filename: utils.assetsPath('js/[name].js?a=[chunkhash]'),
    chunkFilename: utils.assetsPath('js/[id].js?a=[chunkhash]')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),

    // new MinifyPlugin({},{comments: false}),

   /*new UglifyJSPlugin({
      compress: {
        warnings: false,
          unused: false
      },
       uglifyOptions: {
           output: {
               comments: false,
               beautify: false,
           }
       },
           parallel: true,
      sourceMap: false
    }),*/
    // extract css into its own file
    new ExtractTextPlugin({
        filename: utils.assetsPath('css/[name].css?st=[contenthash]'),
        allChunks: true
    }) ,
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
   /* new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),*/
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
        names: ['components','model','util','config']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',

  /*    chunks:config.build.chunks,
      minChunks:  config.build.chunks.length*/
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../' + process.env.npm_config_folder + '/' + process.env.npm_config_target + '/sub_static/lang'),
        to: config.build.assetsRoot + '/lang',
        toType: 'dir',
      }
    ]),

    // new JavaScriptObfuscator({
    //   rotateUnicodeArray: true
    // }, ['**.js']),

    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: [
        config.build.assetsRoot+'/*.lang',
        config.build.assetsRoot + '/' + process.env.npm_config_folder + '/' + process.env.npm_config_target + '/lang']
    })
  ]
})
webpackConfig.plugins =  webpackConfig.plugins.concat(utils.HtmlWebpackLoaders());

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

//根据meta.json传入值判断是否需要压缩或加密文件
if(metaJson.config.isCompression !== undefined) {
  if(metaJson.config.isCompression === true) {
    webpackConfig.plugins.push( new MinifyPlugin({},{comments: false}));
  }
} else {
  webpackConfig.plugins.push( new MinifyPlugin({},{comments: false}));
}

if(metaJson.config.isConfuseCode !== undefined) {
  if(metaJson.config.isConfuseCode === true) {
    webpackConfig.plugins.push( new JavaScriptObfuscator({rotateUnicodeArray: true }, ['**.js']));
  }
} else {
  webpackConfig.plugins.push( new JavaScriptObfuscator({rotateUnicodeArray: true }, ['**.js']));
}


if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}


/*
webpackConfig.plugins.push(new RemoveWebpackPlugin(
  [config.build.assetsRoot + '/zh.json']
))*/
module.exports = webpackConfig
