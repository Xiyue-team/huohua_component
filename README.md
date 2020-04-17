# 微件主体框架

> A Vue.js Typescript project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build --target=targetModul()

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


##项目描述
``` bash
# 组件(ui控件模块)  webpack打包时会独立到 dist/components/(css|js)/components.(css|js)
src/component/**..vue

# 配置类 组件或者3d等一些项目运行配置文件   webpack打包时会独立到 dist/config/js/config.js
src/config/**Config.ts

# 工具类 常用工具类   webpack打包时会独立到 dist/util/js/util.js
src/util/**.ts

# model类 框架使用的模型类   webpack打包时会独立到 dist/model/js/model.js
src/model/**.Config.ts

# 3d相关类  webpack打包时会独立到(three.js也会被打入此js) dist/three/js/three.js
src/three/**.ts

```

##meta.json使用说明
```

//jxg webgl konva hammerjs gsap
```


```
src
│  App.vue
│  main.js
│  main.js.map
│  main.ts
│  vue.sfc.js
│  vue.sfc.js.map
│  vue.sfc.ts
│  
├─assets
│  │  logo.png
│  │  
│  └─css
│          core.css
│          layout.css
│          ui.css
│          
├─component
│      button.vue
│      counter.vue
│      Hello.vue
│      slider.vue
│      switch.vue
│      
├─config
│      SliderConfig.js
│      SliderConfig.js.map
│      SliderConfig.ts
│      
├─model
│      BrowserInfo.js
│      BrowserInfo.js.map
│      BrowserInfo.ts
│      
├─router
│      index.js
│      index.js.map
│      index.ts
│      
├─three
│      3DHelper.js
│      3DHelper.js.map
│      3DHelper.ts
│      Gltf3DModel.js
│      Gltf3DModel.js.map
│      Gltf3DModel.ts
│      Simple3DModel.js
│      Simple3DModel.js.map
│      Simple3DModel.ts
│      ThreeBase.js
│      ThreeBase.js.map
│      ThreeBase.ts
│      
└─util
        BrowserUtil.js
        BrowserUtil.js.map
        BrowserUtil.ts
        Detector.js
        Detector.js.map
        Detector.ts
        
```
