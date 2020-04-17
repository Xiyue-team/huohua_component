require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
/** 必须指定文件夹打包 **/
var beginTime = new Date().getTime();
if(!process.env.npm_config_folder){
    throw new Error("need parameter '--folder=xxxx' to appoint build folder");
    return;
}
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
    var endTime = new Date().getTime();
    var costTime = ((endTime - beginTime)/1000).toFixed(2);
    console.log(chalk.cyan('  Build complete.\n'))
      console.log(chalk.cyan('  Build taking ' +costTime+'s \n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
