<template>
  <div id="app">
    <div class="control-container">
      <p>黄赤交角</p>
      <i id="clear"><img class="btn" src="static/image/chongzhi.png"/></i>
    </div>
    <div class="renderCanvas-container">
      <canvas id="renderCanvas" touch-action="none" width="1920" height="1080" tabindex="1"
              style="opacity: 1;"></canvas>
    </div>
    <div id='checktwo'>
      <div>公转</div>
      <span>
                <span></span>
            </span>
    </div>
    <div id='check'>
      <div>自转</div>
      <span>
                <span></span>
            </span>
    </div>
    <div id="ctrl" v-if="sliderF">
      <div id="title">公转时间（月份）</div>
      <ui-slider v-model="value"
                 :min="0"
                 :max="360"
                 :boxWidth="444"
                 :boxHeight="98"
                 :title="false"
                 :tooltip="false"
                 :piecewise="true"
                 :interval="0.1"
                 :speed="0"
                 :timeLine="true" :label="['1','2','3','4','5','6','7','8','9','10','11','12','1']">
      </ui-slider>
    </div>
    <div id="notSupported" class="hidden">loading...</div>

  </div>
</template>

<script>
  import uiSlider from '@/components/UI/uiSlider'; //头部
  export default {
    components: {
      uiSlider
    },
    data() {
      return {
        isMob: /iPad|Android/g.test(navigator.userAgent),
        canvas: null,
        value:0,
        sliderF:true
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
          var renderFunction = function () {
            var sceneChecked = null;
            if (scene) {
              if (scene.activeCamera) {
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
        console.log("Create By APEN");
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

        var shadowFragmentShader =
          `precision highp float;
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec2 vUV;
                uniform mat4 world;
                uniform vec3 cameraPosition;
                uniform vec3 vLightPosition;
                uniform sampler2D daySampler;
                uniform sampler2D nightSampler;
                void main(void) {
                    vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
                    vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
                    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
                    vec4 daycolor = texture2D(daySampler, vUV).rgba;
                    vec4 nightcolor = texture2D(nightSampler, vUV).rgba;
                    vec3 lightVectorW = normalize(vLightPosition - vPositionW);
                    float ndl = max(0., dot(vNormalW, lightVectorW)) * 1.;
                    vec3 angleW = normalize(viewDirectionW + lightVectorW);
                    daycolor.rgb =nightcolor.rgb*(1.-ndl)+ daycolor.rgb* ndl;
                    gl_FragColor = vec4(daycolor);
                }`;

        var thiz = this;
        var colorindex = 0.2;
        var r = 3;
        this.canvas = engine.getRenderingCanvas();
        engine.enableOfflineSupport = false;
        var scene = new BABYLON.Scene(engine);
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.1;

        var camera = new BABYLON.ArcRotateCamera("Camera",0, Math.PI / 4, 100, BABYLON.Vector3.Zero(), scene);
        camera.lowerRadiusLimit = 80;
        camera.upperRadiusLimit = 120;
        camera.setPosition(new BABYLON.Vector3(0,80,-80));
        camera.setTarget(BABYLON.Vector3.Zero());

        camera.layerMask = 0x20000000;
        var cameraForDetail = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 140, BABYLON.Vector3.Zero(), scene);
        cameraForDetail.viewport = new BABYLON.Viewport(0.7, 0.7, 0.25, 0.25);
        cameraForDetail.setPosition(BABYLON.Vector3.Zero());
        cameraForDetail.layerMask = 0x20000000;
        // cameraForDetail.fov = 3;
        scene.activeCameras.push(camera);
        scene.activeCameras.push(cameraForDetail);
        scene.clearColor.set(0, 0, 0.3, 1);

        //地球node
        var earthgroup = new BABYLON.Mesh("g", scene);
        earthgroup.position = new BABYLON.Vector3(0, 0, 0);

        var earthp = new BABYLON.Mesh("p", scene);
        earthp.position = new BABYLON.Vector3(0, 0, 0);

        var earthpangle = new BABYLON.Mesh("p", scene);
        earthpangle.position = new BABYLON.Vector3(0, 0, 0);

        earthgroup.setParent(earthpangle);
        earthpangle.setParent(earthp);
        //画地球
        BABYLON.Effect.ShadersStore["customVertexShader"] = customVertexShader;
        BABYLON.Effect.ShadersStore["earthFragmentShader"] = earthFragmentShader;
        BABYLON.Effect.ShadersStore["shadowFragmentShader"] = shadowFragmentShader;

        var sunSampler = new BABYLON.Texture("./static/earth/sun.jpg", scene);
        var earthdaySampler = new BABYLON.Texture("./static/earth/earthday.jpg", scene);
        var earthnightSampler = new BABYLON.Texture("./static/earth/earthnight.jpg", scene);
        var sunforMaterial = new BABYLON.ShaderMaterial("shader", scene, {
          vertex: "custom",
          fragment: "earth",
        }, {
          attributes: ["position", "normal", "uv"],
          uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
        });
        sunforMaterial.setTexture("daySampler", sunSampler);
        sunforMaterial.setVector3("color", new BABYLON.Vector3(2.5, 2.5, 2.5));
        sunforMaterial.emissiveColor = new BABYLON.Color3(0.6,0.4,0);
        sunforMaterial.backFaceCulling = true;

        var sun = BABYLON.Mesh.CreateSphere("earth", 32, 10, scene);
        sun.material = sunforMaterial;
        sun.position=new BABYLON.Vector3(0,0,0);
        sun.layerMask = 0x20000000;
        var sundirSampler = new BABYLON.Texture("./static/earth/sun.jpg", scene);

        var gl = new BABYLON.GlowLayer("glow", scene, { mainTextureSamples: 4});
            gl.addIncludedOnlyMesh(sun);
            var helper = scene.createDefaultEnvironment();
            helper.setMainColor(BABYLON.Color3.Gray());

        var sundirMaterial = new BABYLON.ShaderMaterial("shader", scene, {
          vertex: "custom",fragment: "earth",}, {
          attributes: ["position", "normal", "uv"],
          uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]});
        sundirMaterial.setTexture("daySampler", sundirSampler);
        sundirMaterial.backFaceCulling = true;

        var sundirdot = BABYLON.Mesh.CreateSphere("earth", 32, 0.1, scene);
        sundirdot.material = sundirMaterial;
        sundirdot.layerMask = 0x20000000;

        var earthforMaterial = new BABYLON.ShaderMaterial("shader", scene, {
          vertex: "custom",
          fragment: "shadow",
        }, {
          attributes: ["position", "normal", "uv"],
          uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
        });
        earthforMaterial.setTexture("daySampler", earthdaySampler);
        earthforMaterial.setTexture("nightSampler", earthnightSampler);
        earthforMaterial.setVector3("cameraPosition", camera.position);
        earthforMaterial.setVector3("vLightPosition", sun.position);
        earthforMaterial.backFaceCulling = false;

        var earth2 = BABYLON.Mesh.CreateSphere("earth", 32, 2 * r, scene);
        earth2.material = earthforMaterial;
        earth2.layerMask = 0x20000000;
        earth2.rotation = new BABYLON.Vector3(0, 0, Math.PI);
        earth2.setParent(earthgroup);

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

        //根据半径、角度求圆上的点，并设置坐标轴及轴上的值
        function tdrawcircle(ra, rb, ang, axisvalue, axis) {
          var x = ra * Math.cos(ang * Math.PI / 180);
          var y = rb * Math.sin(ang * Math.PI / 180);
          if (axis == "x") {
            return new BABYLON.Vector3(axisvalue, x, y);
          } else if (axis == "z") {
            return new BABYLON.Vector3(x, y, axisvalue);
          } else {
            return new BABYLON.Vector3(x, axisvalue, y);
          }
        }

        //设置将要画圆的坐标集
        function tsetvertices(ra, rb, value, y, axis) {
          var vertices = [];
          for (var i = 0; i <= value; i += 3 / r) {
            vertices.push(tdrawcircle(ra, rb, i, y, axis));
          }
          vertices.push(tdrawcircle(ra, rb, value, y, axis));
          return vertices;
        }

        //设置将要画圆的坐标集
        function setvertices(r, value, y, axis) {
          var vertices = [];
          for (var i = 0; i <= value; i++) {
            vertices.push(drawcircle(r, i, y, axis));
          }
          vertices.push(drawcircle(r, value, y, axis));
          return vertices;
        }

        //画出可更新的圆，并设置颜色
        function tcreateCircle(ra, rb, value, y, color, scene, axis) {
          var vertices = tsetvertices(ra, rb, value, y, axis);
          var circle = BABYLON.MeshBuilder.CreateLines("lines", {
            points: vertices,
            updatable: true,
            instance: circle
          }, scene);
          circle.layerMask = 0x20000000;
          circle.color = color;
          return circle;
        }

        //画出可更新的圆，并设置颜色
        function createCircle(r, value, y, color, scene, axis) {
          var vertices = setvertices(r, value, y, axis);
          var circle = BABYLON.MeshBuilder.CreateLines("lines", {
            points: vertices,
            updatable: true,
            instance: circle
          }, scene);
          circle.color = color;
          circle.layerMask = 0x20000000;
          return circle;
        }


        //画出可更新的圆，并设置颜色
        function createDashedCircle(r, value, y, color, scene, axis) {
          var vertices = setvertices(r, value, y, axis);
          var Dashedcircle = BABYLON.Mesh.CreateDashedLines("lines", vertices, 10, 10, vertices.length, scene, true, Dashedcircle);
          Dashedcircle.color = color;
          Dashedcircle.layerMask = 0x20000000;
          return Dashedcircle;
        }

        function CreateWeftLine(earthangle, r, angle, color, pos) {
          //earthangle地球从赤道开始角度
          var x = Math.cos(earthangle * Math.PI / 180) * r;//所算出x值
          if (pos) {
            var y = Math.sqrt(r * r - x * x);//所算出y值
          } else {
            var y = -Math.sqrt(r * r - x * x);//所算出y值
          }
          var circle = createCircle(x, angle, y, color);
          circle.setParent(earthgroup);
        }

        //创建纬线（虚线）
        function CreateDashedWeft(earthangle, r, angle, color, pos) {
          //earthangle地球从赤道开始角度
          var x = Math.cos(earthangle * Math.PI / 180) * r;//所算出x值
          if (pos) {
            var y = Math.sqrt(r * r - x * x);//所算出y值
          } else {
            var y = -Math.sqrt(r * r - x * x);//所算出y值
          }
          var Dashedcircle = createDashedCircle(x, angle, y, color);
          Dashedcircle.setParent(earthgroup);
        }

        var linecolor = new BABYLON.Color3(1, 1, 1);
        var lineradius = r + 0.01;
        var cra = 40;
        var crb = 30;

        CreateDashedWeft(23.26, lineradius, 360, linecolor, true);//创建回归线：0°至南北纬90°，间隔30°；
        CreateDashedWeft(23.26, lineradius, 360, linecolor);
        CreateDashedWeft(66.74, lineradius, 360, linecolor);//创建极圈：0°至南北纬90°，间隔30°；
        CreateDashedWeft(66.74, lineradius, 360, linecolor, true);
        CreateWeftLine(0, lineradius, 360, linecolor);//赤道
        tcreateCircle(cra, crb, 360, 0, linecolor, scene, "y");

        function CreateSunLine(earthangle, r, angle, color, pos) {
          //earthangle地球从赤道开始角度
          var x = Math.cos(earthangle * Math.PI / 180) * r;//所算出x值
          if (pos) {
            var y = Math.sqrt(r * r - x * x);//所算出y值
          } else {
            var y = -Math.sqrt(r * r - x * x);//所算出y值
          }
          var circle = createCircle(x, angle, y, color);
          circle.setParent(earthgroup);
          return circle;
        }
 var ylinecolor = new BABYLON.Color3(1, 1, 0);
        var suncircle = CreateSunLine(0, lineradius, 360, ylinecolor);

        var tex = new BABYLON.Texture("static/sb.jpg", scene);
        var material2 = new BABYLON.StandardMaterial("kosh2", scene);
        material2.diffuseTexture = tex;
        material2.emissiveTexture = tex;
        material2.backFaceCulling = false;

        var skybox = BABYLON.Mesh.CreateSphere("skyBox", 50, 2000, scene);
        skybox.material = material2;
        skybox.layerMask = 0x20000000;
        // Events
        var sliderR = r + 0.6;
        var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 2 * sliderR + 0.6, 0.05, 0.05, 16, 1, scene);
        var cylinderMat = new BABYLON.StandardMaterial("cylinder", scene);

        cylinderMat.emissiveColor = BABYLON.Color3.Gray();
        cylinder.material = cylinderMat;
        cylinder.setParent(earthgroup);
        cylinder.layerMask = 0x20000000;

        function reset() {
          this.value=0;
          thiz.value = 0;
          boolshowslider = true;
          thiz.sliderF=true;
          $("#checktwo>span").css('background', '#F0F0F0').children().css({'left': '2px', 'right': 'auto'});
          booldraw = false;
          $("#check>span").css('background', '#F0F0F0').children().css({'left': '2px', 'right': 'auto'});
          camera.setPosition(new BABYLON.Vector3(0,80,-80));
          camera.setTarget(BABYLON.Vector3.Zero());
        }

        function PublicRotation() {
          if (boolshowslider) {
            boolshowslider = false;
            thiz.sliderF=false;
            $("#checktwo>span").css('background', '#5CAEFD').children().css({'right': '2px', 'left': 'auto'});
          } else {
            boolshowslider = true;
            thiz.sliderF=true;
            $("#checktwo>span").css('background', '#F0F0F0').children().css({'left': '2px', 'right': 'auto'});
          }
        }

        function PrivateRotation() {
          if (booldraw) {
            $("#check>span").css('background', '#F0F0F0').children().css({'left': '2px', 'right': 'auto'});
            booldraw = false;
          } else {
            booldraw = true;
            $("#check>span").css('background', '#5CAEFD').children().css({'right': '2px', 'left': 'auto'});
          }
        }

        earthpangle.rotation = new BABYLON.Vector3(0, 0,- Math.PI / 180 * 23.6);
        earthp.position = new BABYLON.Vector3(0, 0, 100);

        function onValueChange(value) {
          var sb = sundirdot.clone("sb");
          sb.setParent(earth2);
          var ty = sb.position.y;
          sb.dispose();
          suncircle = BABYLON.MeshBuilder.CreateLines("lines", {
            points: setvertices(Math.sqrt(r * r - ty * ty), 360, -ty),
            instance: suncircle
          });
        }

        var sunline = BABYLON.MeshBuilder.CreateLines("lines", {
          points: [new BABYLON.Vector3(0, 0, 8), new BABYLON.Vector3(0, 0, 100)],
          updatable: true,instance: sunline}, scene);
        sunline.layerMask = 0x20000000;
        var boolrotate = true;
        var booldraw = false;
        var boolshowslider = true;
        var alpha=0;
        var offset=8;//时间与角度偏移
        scene.registerBeforeRender(function () {
          earthgroup.rotation = new BABYLON.Vector3(0, -alpha + Math.PI / 180, 0);
          var earthpos = tdrawcircle(cra, crb, thiz.value+offset, 0, "y");
          earthp.position = earthpos;
          var pos= earthpos.subtract(sun.position).normalize();
          var newpos=new BABYLON.Vector3(pos.x*r, pos.y*r, pos.z*r);
          sundirdot.position =earthpos.subtract(newpos);
          cameraForDetail.setPosition(earthpos.subtract(new BABYLON.Vector3(pos.x*9, pos.y*9, pos.z*9)));
          cameraForDetail.setTarget(earthpos);

          $('#slider1').value = thiz.value;
          $('.s1 .sliderLeft').width(thiz.value);
          $('.s1 .xdsoft_range2dslider_runner').css('left', thiz.value + 'px');
          $('.s1 .xdsoft_slider_label').text(thiz.value + '');

          onValueChange(-(thiz.value - 180+offset) / 90 * 23.26 - 23.26);
          sunline = BABYLON.MeshBuilder.CreateLines("lines", {
            points: [sun.position, sundirdot.position], instance: sunline
          });
          if (boolshowslider == false) {
            thiz.value += 0.1;
            if (thiz.value > 360) {
              thiz.value = thiz.value - 360;
            }
          }
          if (booldraw == true) {
            alpha += 0.1;
          }

        });

        if (this.isMob) {
          $('#clear').on('touchstart', reset);
          $('#check').on('touchstart', PrivateRotation);
          $('#checktwo').on('touchstart', PublicRotation);
        } else {
          $('#clear').on('click', reset);
          $('#check').on('click', PrivateRotation);
          $('#checktwo').on('click', PublicRotation);
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
    -ms-touch-action: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
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

  #fps {
    position: absolute;
    right: 20px;
    top: 5em;
    font-size: 20px;
    color: #fff;
    text-shadow: 2px 2px 0 #000
  }

  #check {
    background: rgba(74, 74, 74, 0.6);
    border: 0 solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    height: 44px;
    font-size: 14px;
    color: #fff;
    line-height: 48px;
    width: 140px;
    text-indent: 1em;
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 999;
    cursor: pointer;
  }

  #check > span {
    width: 40px;
    height: 24px;
    background: #F0F0F0;
    opacity: 0.6;
    border-radius: 13px;
    position: absolute;
    right: 12px;
    top: 11px;
  }

  #check > span > span {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #4A4A4A;
    border: 0 solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    position: absolute;
    top: 2px;
    left: 2px;
  }

  #checktwo {
    background: rgba(74, 74, 74, 0.6);
    border: 0 solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    height: 44px;
    font-size: 14px;
    color: #fff;
    line-height: 48px;
    width: 140px;
    text-indent: 1em;
    position: fixed;
    right: 20px;
    bottom: 74px;
    z-index: 999;
    cursor: pointer;
  }

  #checktwo > span {
    width: 40px;
    height: 24px;
    opacity: 0.6;
    background: #F0F0F0;
    border-radius: 13px;
    position: absolute;
    right: 12px;
    top: 11px;
  }

  #checktwo > span > span {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #4A4A4A;
    border: 0 solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    position: absolute;
    top: 2px;
    left: 2px;
  }

  .hidden {
    display: none
  }

  #ctrl {
    width: 584px;
    height: 98px;
    background: rgba(74,74,74,0.60);
    border: 0 solid rgba(0,0,0,0.10);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
    border-radius: 6px;
    position: absolute;
    right: 172px;
    bottom: 20px;
    z-index: 999;
  }
  #ctrl #title {
    float: left;
    font-size: 16px;
    color: #FFFFFF;
    font-weight: 100;
    margin: 39px 0 0 12px;
  }
  #ctrl .uiSlider {
    float: right;
  }

</style>
