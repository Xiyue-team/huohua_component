var path = require('path')
const glob = require('glob')
var config = require('../config')
var fs     = require('fs')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackPathAssetsFix = require('html-webpack-plugin-assets-fix')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var webpack = require('webpack')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
    //assetsSubDirectory = _path.indexOf("images/")>-1 ? "" : assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path);
}

exports.singleWidgetAssetsPath = function(_path){
    let assetsPath = path.posix.join(process.env.npm_config_folder + "/" + process.env.npm_config_target + "/static", _path);
    /*console.log("assetsPath : " + assetsPath);*/
    return assetsPath;
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

const htmlTemplate = './index.html'
exports.HtmlWebpackLoaders = function(){
    var htmlWebpack = [];
    //模板html
    var htmlPath = "**";
    if(process.env.npm_config_target){
        htmlPath = process.env.npm_config_target;
    }
    glob.sync('./'+process.env.npm_config_folder+'/'+htmlPath+'/main.ts').forEach(function(widgetPath){


        widgetPath =  path.normalize(widgetPath);
        const tempArry = widgetPath.split(path.sep);

        //const chunk = widgetPath.split(process.env.npm_config_folder)[1].split('main.ts')[0];
        const chunk = tempArry[tempArry.length - 2];;
        const metaJsonPath = './' + process.env.npm_config_folder + '/' + htmlPath + '/meta.json';
        let metaJson;
        if(fs.existsSync(metaJsonPath)){
            //jxg webgl konva hammerjs gsap
            metaJson = JSON.parse(fs.readFileSync(metaJsonPath,"utf8"));
            console.log("title:"+metaJson.title);
        }


        let filename = "";
        if(process.env.npm_config_single){
            //独立打包
            filename = 'index.html';
        }else{
            //使用模块名做文件夹
            filename = chunk + '/index.html';
        }
        const customHtmlTemplate = widgetPath.replace("main.ts","index.html");
        //如果每个模块内存在独立的index.html则使用独立模块的模板html
        const template = fs.existsSync(customHtmlTemplate) ? customHtmlTemplate : htmlTemplate;
        const htmlConf = {
            filename: filename,
            meta:metaJson.meta,
            title:metaJson.title,
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            template: template,
            favicon: './src/assets/huohua.ico',
            chunksSortMode: 'dependency',
            chunks: ['vendor','manifest', chunk],
            fixAssets: true,
            /*hash: process.env.NODE_ENV === 'production',
            chunks: ['vendors', chunk]*/
        }
        htmlWebpack.push(new HtmlWebpackPlugin(htmlConf))

       /* if(fs.existsSync(config.build.widgetRoot + '/'+chunk + '/static/img')){
            const copyConf = {
                from: config.build.widgetRoot + '/'+chunk + '/static/img',
                to: config.build.assetsRoot + '/' + chunk +'/img',
                force:true
            }
            console.log("from:"+copyConf.from);
            console.log("to:"+copyConf.to);
            htmlWebpack.push(new CopyWebpackPlugin([copyConf]));
        }*/

    });
    htmlWebpack.push(new HtmlWebpackPathAssetsFix());


 /*   var rootHtmlWebpack = {
        filename:'root.html',
        template:htmlTemplate,
        inject:true,
        favicon: './src/assets/logo.png',
        chunksSortMode: 'dependency'
    };*/

    //htmlWebpack.push(rootHtmlWebpack);

    return htmlWebpack;
}

exports.metaInfo = function() {
  var htmlPath = "**";
  if(process.env.npm_config_target){
    htmlPath = process.env.npm_config_target;
  }
  const metaJsonPath = './' + process.env.npm_config_folder + '/' + htmlPath + '/meta.json';
  let metaJson;
  if(fs.existsSync(metaJsonPath)){
    //jxg webgl konva hammerjs gsap
    metaJson = fs.readFileSync(metaJsonPath,"utf8");
    const tempConfig = JSON.parse(metaJson);
    tempConfig.path = process.env.npm_config_folder + '/' + htmlPath;

    if(!tempConfig.config) {
        tempConfig.config = {
            isEncryption : true
        }
    };

    if(process.env.NODE_ENV === 'development' ) {
        tempConfig.config.isEncryption = false;
        tempConfig.config.dev = true;
        tempConfig.langArray = this.readAllLangJson();
    } else {
      tempConfig.config.dev = false;
    }
    metaJson = JSON.stringify(tempConfig);
  }

  return metaJson;
}


/**
 * 1.读取lang文件夹下所有json
 * 2.读取所有json 内容到内存中
 * 3.将所有语言包json对象放到metaJson对象中；
 * 4.微件在运行时根据环境取对应metaJson中的语言数据
 */

exports.readAllLangJson = function(){
  var htmlPath = "**";
  if(process.env.npm_config_target){
    htmlPath = process.env.npm_config_target;
  }
  const langDir = './' + process.env.npm_config_folder + '/' + htmlPath + '/sub_static/lang/';
  if (fs.existsSync(langDir)) {
    const langArray = fs.readdirSync(langDir);
    console.log('langArray', langArray);
    let langObj = {};
    for (let i = 0; i < langArray.length; i++) {
      const langPath = langArray[i];
      const langKey = langPath.substring(langPath.lastIndexOf(path.sep) ,langPath.lastIndexOf('.'));

      langObj[langKey] = fs.readFileSync(langDir + langArray[i], "utf8");
    }
    console.log('lang obj:')
    console.log(JSON.stringify(langObj));

    return langObj;
  } else {
    console.log('lang文件夹不存在');
  }
}
