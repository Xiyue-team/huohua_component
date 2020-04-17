// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
const glob = require('glob')
var webpack = require('webpack')

//pages 下的目录对应的app.js全路径
var entries = {
    //main:'./src/main.ts'
    //vendor
/*
   vendor:['three']
*/
}

//pages 下的目录名
var chunks = []

console.log("current package module :"+process.env.npm_config_target);
console.log("folder : " + process.env.npm_config_folder);
if(process.env.npm_config_target){
    glob.sync(`./${process.env.npm_config_folder}/${process.env.npm_config_target}/main.ts`).forEach(function(widgetPath ){
        console.log(widgetPath)
        console.log(path.normalize(widgetPath))
        console.log('split:' +  path.normalize(widgetPath).split(`${process.env.npm_config_folder}`));

        const normalPath =  path.normalize(widgetPath);
        console.log(normalPath.split(path.sep))
        const tempArry = normalPath.split(path.sep);
        //const chunk = normalPath.split(`${process.env.npm_config_folder}`)[1].split('main')[0]
        const chunk = tempArry[tempArry.length - 2];
        console.log(chunk);
        entries[chunk] = "./" + normalPath
        chunks.push(chunk)
        console.log("chunk:"+chunk + " | " + normalPath);
    })
}else{
    glob.sync('./'+process.env.npm_config_folder+'/**/main.ts').forEach(function(widgetPath ){
        const chunk = widgetPath.split('./'+process.env.npm_config_folder+'/')[1].split('/main')[0]
        entries[chunk] = widgetPath
        chunks.push(chunk)
        console.log("chunk:"+chunk + " | " + widgetPath);
    })
}

/*动态查找所有components*/
/*var comps = [];
glob.sync('./src/component/!**!/!*.vue').forEach(function(path ){
    comps.push(path);
});
console.log(comps)
var compsEntry = {components: comps};
entries = Object.assign({}, entries, compsEntry);*/

/* 核心类 */
/*var webgl = glob.sync('./src/three/!*.ts');
var coresEntry = {webgl: webgl.concat("three","three-gltf-loader","three-mtl-loader","three-obj-loader","three-orbitcontrols")};
entries = Object.assign({}, entries, coresEntry);*/

/*配置类*/
/*var config  = glob.sync('./src/config/!*.ts');
var configEntry = {config: config};
entries = Object.assign({}, entries, configEntry);*/

/* model类 */
/*var models = glob.sync('./src/model/!*.ts');
var modelEntry = {model: models};
entries = Object.assign({}, entries, modelEntry);*/

/* util类 */
/*var util = glob.sync('./src/util/!*.ts');
var utilEntry = {util: util};
entries = Object.assign({}, entries, utilEntry);*/

/*var thirdPartLib = {
    konva:["konva"]
}
entries = Object.assign({}, entries, thirdPartLib);*/

console.log(entries);
console.log(chunks.length);


//chunks.push("main")
module.exports = {
  build: {
    env: require('./prod.env'),
    projectRoot:path.resolve(__dirname, '../dist/'),
    index: path.resolve(__dirname, '../dist/'+process.env.npm_config_target+'/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist/'+process.env.npm_config_target),
    assetsSubDirectory: process.env.npm_config_single ? '' : '[name]' ,
    assetsPublicPath: './',
    widgetRoot:path.resolve(__dirname, '../widget'),
    productionSourceMap: false,
    entries:entries,
    chunks:chunks,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
      plugins: [ new webpack.ProvidePlugin({
          ENV: "./env/"
      })]
  },
  dev: {
    env: require('./dev.env'),
    port: 8081,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
