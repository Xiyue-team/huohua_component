<template>
  <div id="app">
    <div class="control-container">
      <p>日食</p>
      <i id="clear"><img class="btn" src="static/image/chongzhi.png"/></i>
    </div>
    <div class="renderCanvas-container">
      <canvas id="renderCanvas" touch-action="none" width="1920" height="1080" tabindex="1"
              style="opacity: 1;"></canvas>
      <ui-slider id="ctrl"
                 v-model="value"
                 :min="90"
                 :max="270"
                 :noBlueProcess="true"
                 :title="'月球位置'"></ui-slider>
    </div>
    <div id="notSupported" class="hidden">loading...</div>
  </div>
</template>

<script>
  import uiSlider from '@/components/UI/uiSlider';
  export default {
    components: {
      uiSlider
    },
    data() {
      return {
        isMob: /iPad|Android/g.test(navigator.userAgent),
        canvas: null,
        value:90
      };
    },
    methods: {
      init() {
        this.canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(this.canvas, true, {preserveDrawingBuffer: true, stencil: true});
        if (!BABYLON.Engine.isSupported()) {
        } else {
          var scene = this.loadCustomScene(this.createScene, (scene) => {
          }, engine);
          var renderTimes=0;
          var renderFunction = function () {
            var sceneChecked = null;
            if (scene) {
              if (scene.activeCamera) {
                renderTimes++;
                if(renderTimes%4!=0)return;
                scene.render();
              }
              if (scene.useDelayedTextureLoading) {
                var waiting = scene.getWaitingItemsCount();
                if (waiting <= 0) {
                  document.getElementById("notSupported").className = "hidden";
                }
              } else if (!sceneChecked) {
                var remaining = scene.getWaitingItemsCount();
                if (remaining == 0) {
                  sceneChecked = true;
                  document.getElementById("notSupported").className = "hidden";
                }
              }
            }
          };
          engine.runRenderLoop(renderFunction);
          $('.renderCanvas-container').height($(window).height());
          engine.resize();
          window.addEventListener("resize", () => {
            $('.renderCanvas-container').height($(window).height());
            engine.resize();
          });
        }
      },
      loadCustomScene(demoConstructor, then, engine) {
        document.getElementById("notSupported").className = "";
        var scene = demoConstructor(engine);
        if (scene.activeCamera) {
          scene.activeCamera.attachControl(this.canvas, false);
        }
        scene.executeWhenReady(() => {
          this.canvas.style.opacity = 1;
          if (then) {
            then(scene);
          }
        });
        return scene;
      },
      createScene(engine) {
        var earthFragmentShader = `precision highp float;
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec2 vUV;
                uniform mat4 world;
                uniform sampler2D daySampler;
                 uniform vec3 color;
                void main(void) {
                vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
                vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
                vec4 daycolor = texture2D(daySampler, vUV).rgba;
                gl_FragColor =vec4(color,1)* vec4(daycolor);}`;

                var planFragmentShader = `precision highp float;
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec2 vUV;
                uniform mat4 world;
                 uniform vec3 color;
                void main(void) {
                vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
                vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
                vec4 glcolor;
                if(distance(vPosition,vec3(0.,0.,0.))<270.){
                  glcolor=vec4(color,distance(vPosition,vec3(0.,0.,0.))/266.);
                }else if(distance(vPosition,vec3(0.,0.,0.))==270.){
                   glcolor=vec4(color,0.001);
                }else{
                   glcolor=vec4(0.,0.,0.,0);
                }

                gl_FragColor=glcolor; }`;

        var customVertexShader = `precision highp float;
                attribute vec3 position;
                attribute vec3 normal;
                attribute vec2 uv;
                uniform mat4 worldViewProjection;
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec2 vUV;
                void main(void) {
                vec4 outPosition = worldViewProjection * vec4(position, 1.0);
                gl_Position = outPosition;
                vUV = uv;
                vPosition = position;
                vNormal = normal;}`;

        var thiz = this;
        var r = 7.5;
        var PI = Math.PI / 180;
        var linecolor = new BABYLON.Color3(0.8, 0.8, 0.8);

        this.canvas = engine.getRenderingCanvas();
        engine.enableOfflineSupport = false;
        var scene = new BABYLON.Scene(engine);

        var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(1, 0, 0), scene);
        light.position = new BABYLON.Vector3(-100, 0, 0);
          light.intensity = 1.0;


        var camera = new BABYLON.ArcRotateCamera("Camera", -1.5, 0.86, 100, BABYLON.Vector3.Zero(), scene);
        camera.lowerRadiusLimit = 50;
        camera.upperRadiusLimit = 600;
        camera.layerMask=1;

        var cameraForDetail = new BABYLON.FreeCamera("Camera", BABYLON.Vector3.Zero(), scene);
        cameraForDetail.viewport = new BABYLON.Viewport(0.65, 0.65, 0.3, 0.3) ;
        cameraForDetail.layerMask=2;

        scene.activeCameras.push(camera);
        scene.activeCameras.push(cameraForDetail);
        scene.clearColor.set(0, 0, 0.3, 1);

        //地球node
        var earthgroup = new BABYLON.Mesh("g", scene);
        earthgroup.position = new BABYLON.Vector3(0, 0, 0);
        //地球角度偏移node
        var earthgroupAngle = new BABYLON.Mesh("g", scene);
        earthgroupAngle.position = new BABYLON.Vector3(0, 0, 0);

        //根据半径、角度求圆上的点，并设置坐标轴及轴上的值
        function drawcircle(r, ang, axisvalue, axis) {
          var x = r * Math.cos(ang * Math.PI / 180);
          var y = r * Math.sin(ang * Math.PI / 180);
          if (axis == "x") {
            return new BABYLON.Vector3(axisvalue, x, y);
          } else if (axis == "z") {
            return new BABYLON.Vector3(x, y, axisvalue);
          } else {
            return new BABYLON.Vector3(x, axisvalue, y);
          }
        }

        //设置将要画圆的坐标集
        function setvertices(step,r, value, y, axis) {
          var vertices = [];
          for (var i = 0; i <= value; i += step) {
            vertices.push(drawcircle(r, i, y, axis));
          }
          vertices.push(drawcircle(r, value, y, axis));
          return vertices;
        }

        //画出可更新的圆，并设置颜色
        function createCircle(step,r, value, y, color, scene, axis) {
          var vertices = setvertices(step,r, value, y, axis);
          var circle = BABYLON.MeshBuilder.CreateLines("lines", {
            points: vertices,
            updatable: true,
            instance: circle
          }, scene);
          circle.color = color;
          return circle;
        }

        function CreateWeftLine(earthangle, r, angle, color, pos) {
          //earthangle地球从赤道开始角度
          var x = Math.cos(earthangle * Math.PI / 180) * r;//所算出x值
          if (pos) {
            var y = Math.sqrt(r * r - x * x);//所算出y值
          } else {
            var y = -Math.sqrt(r * r - x * x);//所算出y值
          }
          var circle = createCircle(4,x, angle, y, color);
          circle.setParent(earthgroup);
        }
        var lineradius = r + .1;
        CreateWeftLine(180, lineradius, 360, linecolor, true);

        BABYLON.Effect.ShadersStore["customVertexShader"] = customVertexShader;
        BABYLON.Effect.ShadersStore["earthFragmentShader"] = earthFragmentShader;
        BABYLON.Effect.ShadersStore["planFragmentShader"] = planFragmentShader;
        //画地球
        var daySampler = new BABYLON.Texture("./static/earth/earth8k.jpg", scene);
        var earthforMaterial = new BABYLON.StandardMaterial("earthforMaterial", scene);
        earthforMaterial.diffuseTexture = daySampler;
        earthforMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        earthforMaterial.specularPower = 0;
        earthforMaterial.backFaceCulling = false;

        var earth = BABYLON.Mesh.CreateSphere("earth", 32, 2 * r, scene);
        earth.material = earthforMaterial;
        earth.rotation = new BABYLON.Vector3(0, 0, Math.PI);
        earth.setParent(earthgroup);

        // 地轴
        var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 19, 0.3, 0.3, 8, 1, scene);
        var cylinderMat = new BABYLON.StandardMaterial("cylinder", scene);
        cylinderMat.emissiveColor = BABYLON.Color3.Gray();
        cylinder.material = cylinderMat;
        cylinder.setParent(earthgroupAngle);

        //地球偏移node偏移
        earthgroup.setParent(earthgroupAngle);
        earthgroupAngle.rotation = new BABYLON.Vector3(0, 0, -Math.PI / 180 * 23.26);

        var sunSampler = new BABYLON.Texture("./static/earth/sun.jpg", scene);
        var sun = BABYLON.Mesh.CreateSphere("earth", 32, 150, scene);
        sun.position = new BABYLON.Vector3(-270, 0, 0);

        var sunforMaterial = new BABYLON.ShaderMaterial("shader", scene, { vertex: "custom", fragment: "earth", }, { attributes: ["position", "normal", "uv"], uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"] });
        sunforMaterial.setTexture("daySampler", sunSampler);
        sunforMaterial.setVector3("color", new BABYLON.Vector3(2.5,2.5,2.5));
        sun.material = sunforMaterial;

        var moonSampler = new BABYLON.Texture("./static/earth/moon.jpg", scene);
        var moonforMaterial = new BABYLON.StandardMaterial("shader", scene);
        moonforMaterial.diffuseTexture = moonSampler;
        moonforMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        moonforMaterial.specularPower = 0;
        moonforMaterial.backFaceCulling = false;

        var moon = BABYLON.Mesh.CreateSphere("earth", 32, 3, scene);
        moon.material = moonforMaterial;
        moon.rotation = new BABYLON.Vector3(0, 0, Math.PI);

        var shadowGenerator2 = new BABYLON.ShadowGenerator(512, light);
        shadowGenerator2.getShadowMap().renderList.push(moon);
        // shadowGenerator2.usePoissonSampling = true;
        // shadowGenerator.useVarianceShadowMap = true;

        earth.receiveShadows = true;

        var moonCir=createCircle(4,20, 360, 0, linecolor, scene, "y");

        var tex = new BABYLON.Texture("static/sb.jpg", scene);
        var material2 = new BABYLON.StandardMaterial("kosh2", scene);
        var skybox = BABYLON.Mesh.CreateSphere("skyBox", 36, 2000, scene);
        material2.diffuseTexture = tex;
        material2.emissiveTexture = tex;
        material2.backFaceCulling = false;
        skybox.material = material2;

        //黄道面
        var HD = BABYLON.Mesh.CreateGround("ground",540, 540, 1, scene);
        var HDSampler = new BABYLON.Texture("./static/earth/plan.png", scene);
        var HDforMaterial = new BABYLON.ShaderMaterial("shader", scene, { vertex: "custom", fragment: "plan", }, { attributes: ["position", "normal", "uv"], uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],needAlphaBlending: true });
        HDforMaterial.setVector3("color", new BABYLON.Vector3(0.6,0.6,0));
        HDforMaterial.backFaceCulling = false;
        HD.position.set(-270,0,0);
        HD.rotation=new BABYLON.Vector3(5*PI, 0, 0);
        HD.material=HDforMaterial;
        HD.layerMask=1;

        //地月轨道面
        var DY = BABYLON.Mesh.CreateGround("ground",40, 40, 1, scene);
        var DYSampler = new BABYLON.Texture("./static/earth/plan.png", scene);
        var DYforMaterial = new BABYLON.ShaderMaterial("shader", scene, { vertex: "custom", fragment: "earth", }, { attributes: ["position", "normal", "uv"], uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],needAlphaBlending: true });
        DYforMaterial.setTexture("daySampler", DYSampler);
        DYforMaterial.setVector3("color", new BABYLON.Vector3(0.8,0.8,0.8));
        DYforMaterial.backFaceCulling = false;
        DY.material=DYforMaterial;

        function reset() {
            thiz.value=90;
            camera.alpha=-1.5;
            camera.beta=0.86;
            camera.radius=100;
        }

        cameraForDetail.position = drawcircle(15, 180, 0, "y");
        var alpha = 0;
        scene.registerBeforeRender(function () {
          alpha=thiz.value;
          // cameraForDetail.position = drawcircle(15, alpha, 0, "y");
          moon.position = drawcircle(20, alpha, 0, "y");
          moon.rotation = new BABYLON.Vector3(0, -alpha * PI, 0);
          cameraForDetail.setTarget(sun.position);
          earthgroup.rotation = new BABYLON.Vector3(0, -alpha * PI * 27.34, 0);
        });
        if (this.isMob) {
          $('#clear').on('touchstart', reset);
        } else {
          $('#clear').on('click', reset);
        }
        return scene;
      }
    },
    mounted() {
      this.init();
    }
  }
</script>

<style>
  html, body, h1, h2, h3, h4, h5,
  h6, hr, p, iframe, dl,
  dt, dd, ul, ol, li, pre,
  form, button, input,
  textarea, th, td, fieldset {
    margin: 0;
    padding: 0;
    border: none;
  }

  html {
    font: 14px/1.5 "微软雅黑", "宋体", "sans-serif";
    background-color: #ffffff;
    word-break: break-all;
    color: #545454;
    overflow-y: scroll;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  ol, ul {
    list-style: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  img {
    width: 100%;
    border: 0;
  }

  a {
    text-decoration: none;
    color: #545454;
  }

  .control-container {
    position: absolute;
    top: 0;
    width: 100%;
    height: 76px;
    padding: 0;
    margin: 0;
    color: #fff;
    z-index: 999;
    background-color: transparent;
  }

  .control-container p {
    position: absolute;
    left: 24px;
    top: 24px;
    font-size: 24px;
  }

  .btn {
    position: absolute;
    width: 48px;
    height: 40px;
    right: 20px;
    top: 18px;
    cursor: pointer;
  }

  body, html {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    border: none;
    overflow: hidden;
    position: fixed;
    font-family: "Segoe WP", "Segoe UI", Verdana, Arial;
    touch-action: none;
    -ms-touch-action: none
  }

  .renderCanvas-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  #notSupported {
    color: #232F32;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: #ffffff;
    text-align: center;
    padding-top: 0;
    font-size: 30px;
    z-index: 3;
    cursor: default
  }

  #renderCanvas {
    width: 100%;
    height: 100%;
    outline: 0
  }

  .hidden {
    display: none
  }
  #ctrl{
    position:absolute;
    bottom:20px;
    right:20px;
    z-index: 999;
    background: rgba(74,74,74,0.60);
    border: 0 solid rgba(0,0,0,0.10);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
    border-radius: 6px;
  }
</style>
