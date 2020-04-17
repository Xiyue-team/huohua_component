var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')



function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: config.build.entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },{
          test: /\.js$/,
          loader: 'babel-loader?cacheDirectory=true',
            options: {
                presets: ['es2015']
            },
          include: config.build.projectRoot,
          exclude: /node_modules/
        },
        /* 微件子目录静态资源 */
      {
        test: /\.(png|jpe?g|gif|svg|gltf|glb|bin|dds|hdr|mtl|obj|babylon|fontJson|zip|fbx|webp|lang|env)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10,
          name: utils.assetsPath('[path][name].[ext]'),
        },
        exclude:  [resolve("static") ]
      },
        /* 公用目录静态资源 */
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10,
            name: utils.assetsPath('images/[name].[ext]'),
        },
        exclude:  resolve(process.env.npm_config_folder + "/" + process.env.npm_config_target + "/sub_static")
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
    /*  {
        a: /\.(bin?|gltf|obj|mtl|fbx|dae|jpg|png|svg|gif|jpeg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: utils.assetsPath('[name].[ext]'),
            publicPath: './dist/'
        }
      },*/
     /* { a: /\.(gltf|bin)$/, loader: 'raw-loader', exclude: /node_modules/ }*/
    ]
  },
  plugins: [
    new webpack.DefinePlugin({'process.env.component' : utils.metaInfo()})
  ]
}
