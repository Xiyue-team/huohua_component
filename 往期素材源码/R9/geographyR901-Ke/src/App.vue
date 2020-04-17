<template>

  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <!-- <div class="times" :style="'transform:scale(1.1);background-color:transparent;z-index:999;padding-top:20px;width:120px;height:305px;position:absolute;left:45px;top:0;bottom:0;margin:auto 0;'"> -->
          <!-- <div> -->
              <!--<img src="static/image/1.png">-->
              <!--<p>{{Time}}</p>-->
          <!-- </div> -->
          <!-- <div> -->
              <!--<img src="static/image/2.png">-->
              <!--<p>{{Time1}}</p>-->
          <!-- </div> -->
          <!-- <div> -->
              <!--<img src="static/image/3.png">-->
              <!--<p>{{Time2}}</p>-->
          <!-- </div> -->
          <!-- <div> -->
              <!--<img src="static/image/4.png">-->
              <!--<p>{{Time3}}</p>-->
          <!-- </div> -->
      <!-- </div> -->
      <div class="viewBox" v-if="target">
         <div id="leftGif">
          <img :src='img' :class="{op:!imgF}" ondragstart="return false;" class="bg">
          <img :src="img1" class="close" ondragstart="return false;" @click="btnClose">
        </div>
      </div>

      <canvas id="renderCanvas" touch-action="none" tabindex="1" ></canvas>
      <h3 v-text="title" class="app_title"></h3>
    </div>
    <!--侧边按钮区-->
    <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget" :style="'position:absolute;'"></ui-btn>
      <!--清除浮动-->
    <div id="notSupported">loading...</div>
  </div>
</template>
<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  import uiGroup from '@/components/UI/uiGroup';//单选组
  import uiSlider from '@/components/UI/uiSlider';//滑块
  var imgL=(src)=> {
      var img = new Image();
      img.src = src;
  }
  imgL('./static/image/1.gif');
  imgL('./static/image/2.gif');
  imgL('./static/image/3.gif');
  export default {
    name: 'app',
    components: {uiHead, uiBtn, uiGroup, uiSlider},
    data() {
      return {
        title: '洋流的成因（3D）',
        reset_on : false,
        close_on: false,
        img:'./static/image/1.gif',
        img1:'static/image/close.png',
        target:false,
        checked:true,
        checkedN:0,
        imgF:false
      }
    },
    created() {
      document.title = this.title;

    },
    mounted() {
      //页面加载检测是否支持babylon
      if (!BABYLON.Engine.isSupported()) {
        alert('不支持BABYLON')
      } else {
        this.init();
      }
    },
    methods: {
      //初始化
      init() {
        this.canvas = document.getElementById("renderCanvas");
        //创建模型
        this.createScene();
      },
      //创建模型
      createScene() {
        var earthFragmentShader = "precision highp float;\r\n" +
          "varying vec3 vPosition;\r\n" +
          "varying vec3 vNormal;\r\n" +
          "varying vec2 vUV;\r\n" +
          "uniform mat4 world;\r\n" +
          "uniform vec3 cameraPosition;\r\n" +
          "uniform vec3 lightVectorW;\r\n" +
          "uniform sampler2D daySampler;\r\n" +
          "uniform sampler2D nightSampler;\r\n" +
          "uniform float intsmooth;\r\n" +
          "uniform float intsmootht;\r\n" +
          "void main(void) {\r\n" +
          "vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));\r\n" +
          "vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));\r\n" +
          "vec3 viewDirectionW = normalize(cameraPosition - vPositionW);\r\n" +
          "vec4 daycolor = texture2D(daySampler, vUV).rgba;\r\n" +
          "vec4 nightcolor = texture2D(nightSampler, vUV).rgba;\r\n" +
          "float ndl = max(0., dot(vNormalW, lightVectorW)) * intsmooth;\r\n" +
          "float ndlt = max(0., dot(vNormalW, lightVectorW)) * intsmootht;\r\n" +
          "vec3 angleW = normalize(viewDirectionW + lightVectorW);\r\n" +
          "float specComp = max(0., dot(vNormalW, angleW));\r\n" +
          "specComp = pow(specComp, max(1., 64.)) *0.1;\r\n" +
          "vec4 color=vec4(0.,0.,0.,0.);\r\n" +
          "if (nightcolor.r*(1.-ndlt)>=0.3) {\r\n" +
          "nightcolor.rgb=nightcolor.rgb*1.5;\r\n" +
          "nightcolor.rg=nightcolor.rg+vec2(0.2,0.2);\r\n" +
          "\r\n}else{\r\n" +
          "nightcolor.rgb=nightcolor.rgb*0.1;\r\n" +
          "\r\n}" +
          "daycolor.rgb =nightcolor.rgb*(1.-ndl)+ daycolor.rgb* ndl + vec3(specComp);\r\n" +
          "gl_FragColor = vec4(daycolor);\r\n}\r\n";
        var customVertexShader = "precision highp float;\r\n" +
          "attribute vec3 position;\r\n" +
          "attribute vec3 normal;\r\n" +
          "attribute vec2 uv;\r\n" +
          "uniform mat4 worldViewProjection;\r\n" +
          "varying vec3 vPosition;\r\n" +
          "varying vec3 vNormal;\r\n" +
          "varying vec2 vUV;\r\n" +
          "void main(void) {\r\n" +
          "vec4 outPosition = worldViewProjection * vec4(position, 1.0);\r\n" +
          "gl_Position = outPosition;\r\n" +
          "vUV = uv;\r\n" +
          "vPosition = position;\r\n" +
          "vNormal = normal;\r\n}\r\n";
        var customFragmentShader = "precision highp float;\r\n" +
          "varying vec3 vPosition;\r\n" +
          "varying vec3 vNormal;\r\n" +
          "varying vec2 vUV;\r\n" +
          "uniform mat4 world;\r\n" +
          "uniform vec3 cameraPosition;\r\n" +
          "uniform vec3 lightVectorW;\r\n" +
          "uniform sampler2D textureSampler;\r\n" +
          "uniform float mixsmooth;\r\n" +
          "uniform float intsmooth;\r\n" +
          "uniform float time;\r\n" +
          "void main(void) {\r\n" +
          "vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));\r\n" +
          "vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));\r\n" +
          "vec3 viewDirectionW = normalize(cameraPosition - vPositionW);\r\n" +
          // "vec2 UV = vec2(vUV.x+sin(time)*0.1+sin(vPosition.x)*0.01,vUV.y);\r\n" +
          "vec4 color = texture2D(textureSampler, vUV).rgba;\r\n" +
          "float ndl = max(0., dot(vNormalW, lightVectorW)) * intsmooth;\r\n" +
          "vec3 angleW = normalize(viewDirectionW + lightVectorW);\r\n" +
          "float specComp = max(0., dot(vNormalW, angleW));\r\n" +
          "specComp = pow(specComp, max(1., 64.)) * 0.1;\r\n" +
          "color.rgb =color.rgb + vec3(specComp);\r\n" +
          "gl_FragColor = vec4(color);\r\n}\r\n";

        var customVertexShader111 = "precision highp float;\r\nattribute vec3 position;\r\nattribute vec3 normal;\r\nattribute vec2 uv;\r\nuniform mat4 worldViewProjection;\r\nvarying vec3 vPosition;\r\nvarying vec3 vNormal;\r\nvarying vec2 vUV;\r\nvoid main(void) {\r\nvec4 outPosition = worldViewProjection * vec4(position, 1.0);\r\ngl_Position = outPosition;\r\nvUV = uv;\r\nvPosition = position;\r\nvNormal = normal;\r\n}\r\n";
        var customFragmentShader222 = "precision highp float;\r\nvarying vec3 vPosition;\r\nvarying vec3 vNormal;\r\nvarying vec2 vUV;\r\nuniform mat4 world;\r\nuniform sampler2D textureSampler;\r\nvoid main(void) {\r\n vec4 color = texture2D(textureSampler, vUV).rgba;\r\ngl_FragColor = vec4(color);\r\n}\r\n";

        var r = 3;//球的半径
        //设置引擎
        var engine = new BABYLON.Engine(this.canvas, true);
        //设置场景
        var scene = new BABYLON.Scene(engine);
        console.log(scene)
        //设置灯光
        var HemisphericLight = new BABYLON.HemisphericLight("HemisphericLight", new BABYLON.Vector3(0, -1, 0), scene);
        HemisphericLight.intensity = 0.5;
        var light1 = new BABYLON.HemisphericLight("HemisphericLight", new BABYLON.Vector3(0, 1, 0), scene);
        light1.intensity = 1;
        //设置相机
        // var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 20,new BABYLON.Vector3(-1,0,0), scene);
        var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 20, BABYLON.Vector3.Zero(), scene);
        // camera.attachControl(this.canvas, false);
        camera.lowerRadiusLimit = 20;
        camera.upperRadiusLimit = 20;
        camera.minZ = 1.0;
        camera.inputs.clear();
        camera.layerMask = 0x20000000;
        scene.clearColor = new BABYLON.Color3(0, 0, 0.6);

        camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
        var sb = engine.getRenderHeight() / engine.getRenderWidth();
        camera.orthoTop = sb*8;
        camera.orthoBottom = -sb*8;
        camera.orthoLeft = -8;
        camera.orthoRight = 8;

        var camera1 = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI / 2, 20, BABYLON.Vector3.Zero(), scene);
        camera1.attachControl(this.canvas, false);
        camera1.lowerRadiusLimit = 20;
        camera1.upperRadiusLimit = 20;
        // camera1.minZ = 1.0;
        // camera1.inputs.clear();
        camera1.layerMask = 0x40000000;
        scene.activeCameras.push(camera1,camera);
        // Skybox
        var tex = new BABYLON.Texture("static/SPACE006SX.jpg", scene);
        var material2 = new BABYLON.StandardMaterial("kosh2", scene);
        var skybox = BABYLON.Mesh.CreateSphere("skyBox", 50, 2000, scene);
        material2.diffuseTexture = tex;
        material2.emissiveTexture = tex;
        material2.backFaceCulling = false;
        skybox.material = material2;
        skybox.layerMask = 0x40000000;

        //地球node
        var earthgroup = new BABYLON.Mesh("g", scene);
        earthgroup.layerMask = 0x20000000;
        earthgroup.position = new BABYLON.Vector3(0, 0, 0);
        //地球node
        var earthgroupcloud = new BABYLON.Mesh("g", scene);
        earthgroupcloud.layerMask = 0x20000000;
        earthgroupcloud.position = new BABYLON.Vector3(0, 0, 0);
        //地球角度偏移node
        var earthgroupAngle = new BABYLON.Mesh("g", scene);
        earthgroupAngle.layerMask = 0x20000000;
        earthgroupAngle.position = new BABYLON.Vector3(0, 0, 0);

        function createtext(mesh, name) {
          var plane = BABYLON.Mesh.CreatePlane("plane", 8);
          plane.layerMask = 0x20000000;
          plane.rotation = mesh.rotation;
          plane.parent = mesh;
          var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);
          var panel2 = new BABYLON.GUI.StackPanel();
          panel2.top = "0px";
          advancedTexture2.addControl(panel2);
          var text1 = new BABYLON.GUI.TextBlock();
          text1.text = name;
          text1.fontSize = "14px"
          text1.color = "#fff";
          panel2.addControl(text1);
        }

        function createWefttext(mesh, name) {
          var plane = BABYLON.Mesh.CreatePlane("plane", 8);
          plane.layerMask = 0x20000000;
          plane.rotation = new BABYLON.Vector3(mesh.rotation.x, -Math.PI / 2, 0);
          if (name == "国际日期变更线") {
            plane.rotation = new BABYLON.Vector3(Math.PI + mesh.rotation.x, -Math.PI / 2, Math.PI / 2);
          } else if (name == "本初子午线") {
            plane.rotation = new BABYLON.Vector3(Math.PI + mesh.rotation.x, Math.PI / 2, Math.PI / 2);
          }
          var plane1 = new BABYLON.Mesh("plane", scene);
          plane1.layerMask = 0x20000000;
          plane1.rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
          plane.setParent(plane1);
          mesh.rotation = new BABYLON.Vector3(0, 0, 0);
          plane1.parent = mesh;
          var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);
          var panel2 = new BABYLON.GUI.StackPanel();
          panel2.top = "0px";
          advancedTexture2.addControl(panel2);
          var text1 = new BABYLON.GUI.TextBlock();
          text1.text = name;
          text1.fontSize = "14px";
          text1.color = "#fff";
          panel2.addControl(text1);
        }

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
        function setvertices(r, value, y, axis) {
          var vertices = [];
          for (var i = 0; i <= value; i += 3 / r) {
            vertices.push(drawcircle(r, i, y, axis));
          }
          vertices.push(drawcircle(r, value, y, axis));
          return vertices;
        }

        //画出可更新的圆，并设置颜色
        function createCircle(r, value, y, color, scene, axis) {
          var vertices = setvertices(r, value, y, axis);
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
        function createDashedCircle(r, value, y, color, scene, axis) {
          var vertices = setvertices(r, value, y, axis);
          var Dashedcircle = BABYLON.Mesh.CreateDashedLines("lines", vertices, 10, 10, vertices.length, scene, true, Dashedcircle);
          Dashedcircle.layerMask = 0x20000000;
          Dashedcircle.color = color;
          return Dashedcircle;
        }

        var i;

        //创建纬线
        function CreateWeft(r, percentPI, color) {
          for (i = 0; i < 90; i += percentPI) {
            if (i == 0) {
              CreateWeftLine(i, r, 360, color);
            } else {
              CreateWeftLine(i, r, 360, color);
              CreateWeftLine(i, r, 360, color, true);
            }
          }
        }

        //创建纬线标签
        function CreateWeftLabel(r, percentPI) {
          for (i = 0; i < 90; i += percentPI) {
            if (i == 0) {
              //CreateWeftLineLabel(i, r);
            } else {
              CreateWeftLineLabel(i, r);
              CreateWeftLineLabel(i, r, true);
            }
          }
        }

        function CreateWeftLineLabel(earthangle, r, pos) {
          //earthangle地球从赤道开始角度
          var x = Math.cos(earthangle * Math.PI / 180) * r;//所算出x值
          var rot = new BABYLON.Vector3(earthangle * Math.PI / 180, 0, 0);
          if (pos) {
            var y = Math.sqrt(r * r - x * x);//所算出y值
          } else {
            var y = -Math.sqrt(r * r - x * x);//所算出y值
            rot = new BABYLON.Vector3(-earthangle * Math.PI / 180, 0, 0);
          }

          var circledot = new BABYLON.Mesh("g", scene);
          circledot.layerMask = 0x20000000;
          circledot.rotation = rot;
          circledot.position = new BABYLON.Vector3(x, y, 0);


          if (earthangle == 23.26 && pos) {
            createWefttext(circledot, "北回归线");
          } else if (earthangle == 23.26 && !pos) {
            createWefttext(circledot, "南回归线");
          } else if (earthangle == 66.74 && pos) {
            createWefttext(circledot, "北极圈");
          } else if (earthangle == 66.74 && !pos) {
            createWefttext(circledot, "南极圈");
          } else if (earthangle == 31.1 && pos) {
            circledot.position = new BABYLON.Vector3(-x, y, 0);
            circledot.rotation = new BABYLON.Vector3(-earthangle * Math.PI / 180, Math.PI, 0);
            createWefttext(circledot, "国际日期变更线");
          } else if (earthangle == 7.2 && pos) {
            circledot.rotation = new BABYLON.Vector3(-earthangle * Math.PI / 180, Math.PI, 0);
            createWefttext(circledot, "本初子午线");
          } else {
            createWefttext(circledot, earthangle + "°");
          }

          circledot.setParent(earthgroup);
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
          circle.layerMask = 0x20000000;
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
          Dashedcircle.layerMask = 0x20000000;
          Dashedcircle.setParent(earthgroup);
        }

        //创建经线
        function createWarp(r, percentPI, color) {

          for (i = 0; i < 2 * Math.PI; i += Math.PI / percentPI) {
            var ncircles = createCircle(r, 360, 0, color, scene, "x");
            ncircles.layerMask = 0x20000000;
            var rot = new BABYLON.Vector3(0, i, 0);
            ncircles.rotation = rot;
            ncircles.setParent(earthgroup);
          }
        }

        //设置将要画国际日期变更线的坐标集
        function setDateChangevertices(r, value, y) {
          var verty = [];
          for (var i = 0; i <= value; i++) {
            var varr = r / 180 * 2 * i - r;
            var yv = Math.sqrt(r * r - varr * varr);
            verty.push(yv);
          }
          var rotangle = 0;
          var vertices = [];
          for (var i = 0; i <= value; i++) {
            var va = r / 180 * 2 * i - r;
            if (i >= 20 && i < 25) {
              rotangle = rotangle + 1;
            } else if (i >= 60 && i < 70) {
              rotangle = rotangle - 0.5;
            } else if (i >= 160 && i < 163) {
              rotangle = rotangle - 2.8;
            } else if (i >= 163 && i < 169) {
              rotangle = rotangle + 1.77;
            } else if (i >= 169 && i < 174) {
              rotangle = rotangle + 1.80;
            } else if (i >= 177 && i < 178) {
              rotangle = rotangle - 11;
            }
            vertices.push(drawcircle(verty[i], rotangle, va));
          }
          return vertices;
        }

        //创建国际日期变更线
        function createDateChangeLine(r, value, y, color, scene) {
          var vertices = setDateChangevertices(r, value, y);
          var circle = BABYLON.MeshBuilder.CreateLines("lines", {
            points: vertices, updatable: true, instance: circle
          }, scene);
          circle.layerMask = 0x20000000;
          circle.color = color;
          circle.rotation.y = Math.PI;
          circle.setParent(earthgroup);
        }


        //创建经线
        function createWarpLabel(r, percentPI) {
          var anglev = 0;
          for (i = 0; i < 2 * Math.PI; i += Math.PI / percentPI) {
            var vall = i / 2 + Math.PI / 4;
            var rot = new BABYLON.Vector3(0, -vall, 0);
            var x = r * Math.cos(i);
            var z = r * Math.sin(i);

            var circledot = new BABYLON.Mesh("g", scene);
            circledot.rotation = rot;
            circledot.position = new BABYLON.Vector3(x, 0, z);

            if (anglev < 180 && anglev > 0) {
              createtext(circledot, anglev + "°");
            } else if (anglev == 180) {
              var va = 360 - anglev;
              createtext(circledot, "东经" + va + "°西经");
            } else if (anglev == 0) {
              createtext(circledot, "西经" + anglev + "°东经");
            } else {
              var va = 360 - anglev;
              createtext(circledot, va + "°");
            }
            circledot.setParent(earthgroup);
            anglev += 6 / percentPI * 30;
          }
        }

        //画地轴
        function CreateAxisLine(radius, parent) {
          var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 2 * radius, 0.05, 0.05, 16, 1, scene);
          cylinder.layerMask = 0x20000000;
          var cylinderMat = new BABYLON.StandardMaterial("cylinder", scene);
          cylinderMat.emissiveColor = BABYLON.Color3.Gray();
          cylinder.material = cylinderMat;
          cylinder.setParent(parent);
        }

        var linecolor = new BABYLON.Color3(1, 1, 1);
        var DashedLineColor = new BABYLON.Color3(1, 1, 0);
        var lineradius = r + 0.01;
        CreateAxisLine(r + 0.3, earthgroup);
        CreateWeft(lineradius, 15, linecolor);//创建纬线：0°至南北纬90°，间隔15°；
        // CreateWeft(lineradius,30, linecolor);//创建纬线：0°至南北纬90°，间隔30°；
        CreateDashedWeft(23.26, lineradius, 360, DashedLineColor, true);//创建回归线：0°至南北纬90°，间隔30°；
        CreateDashedWeft(23.26, lineradius, 360, DashedLineColor);
        CreateDashedWeft(66.74, lineradius, 360, DashedLineColor);//创建极圈：0°至南北纬90°，间隔30°；
        CreateDashedWeft(66.74, lineradius, 360, DashedLineColor, true);
        createWarp(lineradius, 12, linecolor);//创建经线：起始线0°至180°，间隔30°；

//        CreateWeftLabel(lineradius, 15);
//        CreateWeftLineLabel(23.26, lineradius);
//        CreateWeftLineLabel(23.26, lineradius, true);
//        CreateWeftLineLabel(66.74, lineradius);
//        CreateWeftLineLabel(66.74, lineradius, true);
//        createWarpLabel(lineradius, 12);//创建经线标签：起始线0°至180°，间隔30°；
//        CreateWeftLineLabel(31.1, lineradius, true);//国际日期变更线
//        CreateWeftLineLabel(7.2, lineradius, true);//本初子午线
        createDateChangeLine(r + 0.02, 180, 0, DashedLineColor, scene);

        //画地球
        var daySampler = new BABYLON.Texture("static/earth/earth8k.jpg", scene);
        var earthforMaterial = new BABYLON.StandardMaterial("texture", scene);
        earthforMaterial.diffuseTexture =daySampler;
        earthforMaterial.specularColor = new BABYLON.Color3(0,0,0);
        earthforMaterial.backFaceCulling = false;

        var earth = BABYLON.Mesh.CreateSphere("earth", 32, 2 * r, scene);
        earth.layerMask = 0x20000000;
        earth.material = earthforMaterial;
        earth.rotation = new BABYLON.Vector3(0, 0, Math.PI);
        earth.setParent(earthgroup);

        //画地球云图
        // var planTexture = new BABYLON.Texture("./static/earth/cloud.png", scene);
        // BABYLON.Effect.ShadersStore["planVertexShader"] = customVertexShader;
        // BABYLON.Effect.ShadersStore["planFragmentShader"] = customFragmentShader;
        // var cloudMaterial = new BABYLON.ShaderMaterial("shader", scene, {
        //   vertex: "plan",
        //   fragment: "plan",
        // }, {
        //   attributes: ["position", "normal", "uv"],
        //   uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
        //   needAlphaBlending: true
        // });
        // cloudMaterial.setTexture("textureSampler", planTexture);
        // cloudMaterial.setVector3("cameraPosition", scene.activeCamera.position);
        // cloudMaterial.setFloat("mixsmooth", 0.1);//云图阴影叠加值
        // cloudMaterial.setFloat("intsmooth", 3.);//晨昏线明显度
        // cloudMaterial.setFloat("time", 0);//晨昏线明显度
        // cloudMaterial.setVector3("lightVectorW", new BABYLON.Vector3(-light1.direction.x, -light1.direction.y, -light1.direction.z));
        // cloudMaterial.backFaceCulling = false;

        // var cloud = BABYLON.Mesh.CreateSphere("earth", 32, 2 * r + 0.1, scene);
        // cloud.layerMask = 0x20000000;
        // cloud.material = cloudMaterial;
        // cloud.isVisible=false;
        // cloud.rotation = new BABYLON.Vector3(0, 0, Math.PI);
        // cloud.setParent(earthgroupcloud);
        // earthgroupcloud.setParent(earthgroup);
        //地球偏移node偏移
        earthgroup.setParent(earthgroupAngle);
        // earthgroupAngle.position.x=-0.8;
        var groupG = new BABYLON.Mesh("g", scene);
        groupG.layerMask = 0x20000000;
        groupG.position.x=0;
        earthgroupAngle.setParent(groupG);

        var alpha = 0;
        scene.registerBeforeRender(function () {

          earthgroupcloud.rotation = new BABYLON.Vector3(0, alpha * 0.2, 0);

          // alpha -=1/180*Math.PI/4;
          groupG.rotation = new BABYLON.Vector3(0, camera1.alpha, camera1.beta-Math.PI/2);
          earthgroup.rotation = new BABYLON.Vector3(0, alpha, 0);

        });

        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui1");
        //补偿流
        var sphere1 = BABYLON.Mesh.CreateSphere("sphere1", 16.0, 0.6, scene);
        var mat = new BABYLON.StandardMaterial("", scene);
        mat.diffuseColor =  new BABYLON.Color3(0, 0, 0);
        mat.specularColor = new BABYLON.Color3(0, 0, 0);
        mat.emissiveColor = BABYLON.Color3.White();
        sphere1.material = mat;
        // sphere1.position = new BABYLON.Vector3(0.68,-1.14,-2.48);
        sphere1.position = new BABYLON.Vector3(0.65,-1.1,-2.78);
        // sphere1.material.alpha=0;
        sphere1.layerMask = 0x20000000;
        sphere1.setParent(earthgroup);
        // var label1=this.createLabel(advancedTexture,sphere1,"sphere1");
        advancedTexture.layer.layerMask = 0x20000000;
        mat.alpha=0;
        //克隆球体1
        var mat1 = new BABYLON.StandardMaterial("", scene);
        mat1.diffuseColor =  new BABYLON.Color3(0, 0, 0);
        mat1.specularColor = new BABYLON.Color3(0, 0, 0);
        mat1.emissiveColor = BABYLON.Color3.White();
        var clone1 = sphere1.clone();
        clone1.material=mat1;
        clone1.position = new BABYLON.Vector3(0.59,-1,-2.48);

        var sphere2 = BABYLON.Mesh.CreateSphere("sphere2", 16.0, 0.6, scene);
        var mat = new BABYLON.StandardMaterial("", scene);
        mat.diffuseColor =  new BABYLON.Color3(0, 0, 0);
        mat.specularColor = new BABYLON.Color3(0, 0, 0);
        mat.emissiveColor = BABYLON.Color3.White();
        sphere2.material = mat;
        // sphere2.position = new BABYLON.Vector3(-3.1,0.4,-1.75);
        sphere2.position = new BABYLON.Vector3(-2.94,0.45,-1.17);
        sphere2.layerMask = 0x20000000;
        sphere2.setParent(earthgroup);
        mat.alpha=0;
        // var label2=this.createLabel(advancedTexture,sphere2,"sphere2");
        advancedTexture.layer.layerMask = 0x20000000;
         //克隆球体2
        var mat1 = new BABYLON.StandardMaterial("", scene);
        mat1.diffuseColor =  new BABYLON.Color3(0, 0, 0);
        mat1.specularColor = new BABYLON.Color3(0, 0, 0);
        mat1.emissiveColor = BABYLON.Color3.White();
        var clone2 = sphere2.clone();
        clone2.material=mat1;
        clone2.position = new BABYLON.Vector3(-2.52,0.35,-1);


        var sphere3 = BABYLON.Mesh.CreateSphere("sphere3", 16.0, 0.6, scene);
        var mat = new BABYLON.StandardMaterial("", scene);
        mat.diffuseColor =  new BABYLON.Color3(0, 0, 0);
        mat.specularColor = new BABYLON.Color3(0, 0, 0);
        mat.emissiveColor = BABYLON.Color3.White();
        sphere3.material = mat;
        sphere3.position = new BABYLON.Vector3(2.42, 1.92,-0.2);
        sphere3.layerMask = 0x20000000;
        sphere3.setParent(earthgroup);
        // var label3=this.createLabel(advancedTexture,sphere3,"sphere3");
        advancedTexture.layer.layerMask = 0x20000000;
        mat.alpha=0;
        //克隆球体3
        var mat1 = new BABYLON.StandardMaterial("", scene);
        mat1.diffuseColor =  new BABYLON.Color3(0, 0, 0);
        mat1.specularColor = new BABYLON.Color3(0, 0, 0);
        mat1.emissiveColor = BABYLON.Color3.White();
        var clone3 = sphere3.clone();
        clone3.material=mat1;
        clone3.position = new BABYLON.Vector3(2.15, 1.67,-0.18);

        var onPointerDown = (evt)=> {
          var pickInfo = scene.pick(scene.pointerX, scene.pointerY);
          if (pickInfo.hit) {
            var currentMesh = pickInfo.pickedMesh;
            if(currentMesh.name == "sphere1"){
              if(this.checkedN!=1&&this.checkedN!=0)return;
                  this.checkedN=1;
                  this.target=true;
                  this.imgL('./static/image/1.gif',(src)=>{
                    this.imgF=true;
                    this.img=src;
                  });
                  groupG.position.x = 3
                  clone1.material.emissiveColor = BABYLON.Color3.Red();
            }
            if(currentMesh.name == "sphere2"){
              if(this.checkedN!=2&&this.checkedN!=0)return;
                  this.checkedN=2;
                  this.target=true;
                  this.imgL('./static/image/2.gif',(src)=>{
                    this.imgF=true;
                    this.img=src;
                  })
                  groupG.position.x = 3;
                  clone2.material.emissiveColor = BABYLON.Color3.Red();

            }
            if(currentMesh.name == "sphere3"){
              if(this.checkedN!=3&&this.checkedN!=0)return;
                this.checkedN=3;
                this.target=true;
                this.imgL('./static/image/3.gif',(src)=>{
                  this.imgF=true;
                  this.img=src;
                })
                groupG.position.x = 3
                clone3.material.emissiveColor = BABYLON.Color3.Red();
            }
          }
          if(currentMesh.name.indexOf('sphere')>-1){
            this.checked=false;
          }
        };

          var onPointerUp = function () {

          };
          var onPointerMove = function (evt) {

          };


          this.canvas.addEventListener("pointerdown", onPointerDown, false);
          this.canvas.addEventListener("pointerup", onPointerUp, false);
          this.canvas.addEventListener("pointermove", onPointerMove, false);
          scene.onDispose = function () {
              this.canvas.removeEventListener("pointerdown", onPointerDown);
              this.canvas.removeEventListener("pointerup", onPointerUp);
              this.canvas.removeEventListener("pointermove", onPointerMove);
          };


          //启动
        var renderTimes=0;
        engine.runRenderLoop(() => {
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
                      document.getElementById("notSupported").className = "hidden";
                  }
              }
          }

           //自转
          if(this.checked){
            alpha -=1/180*Math.PI/4;
            // camera.attachControl(this.canvas, false);
            camera1.attachControl(this.canvas, false);
          }else{
            // alpha=0;
            // camera.detachControl(this.canvas);
            camera1.detachControl(this.canvas);
          }

          //重置
          if (this.reset_on) {
            alpha = 0;
            groupG.position.x = 0;
            clone1.material.emissiveColor = BABYLON.Color3.White();
            clone2.material.emissiveColor = BABYLON.Color3.White();
            clone3.material.emissiveColor = BABYLON.Color3.White();
            // camera.attachControl(this.canvas, false);
            camera1.attachControl(this.canvas, false);
            this.imgF=false;
            camera.alpha= -Math.PI / 2;
            camera.beta=Math.PI / 2;
            camera1.alpha=0;
            camera1.beta= Math.PI / 2;
            this.target=false;
            this.reset_on = false;
            this.checkedN=0;
            this.checked=true;
            groupG.rotation = new BABYLON.Vector3(0, 0,0);
           // earthgroup.rotation = new BABYLON.Vector3(0, alpha, 0);
          }
          if(this.close_on){
            groupG.position.x = 0;
            clone1.material.emissiveColor = BABYLON.Color3.White();
            clone2.material.emissiveColor = BABYLON.Color3.White();
            clone3.material.emissiveColor = BABYLON.Color3.White();
            camera1.attachControl(this.canvas, false);
            this.target=false;
            this.close_on = false;
            this.imgF=false;
            this.checkedN=0;
            this.checked=true;
          }
        });
        engine.resize();
        //窗口更改大小
          window.addEventListener('resize', () => {
            engine.resize();
            var sb = engine.getRenderHeight() / engine.getRenderWidth();
            camera.orthoTop = sb*8;
            camera.orthoBottom = -sb*8;
            camera.orthoLeft = -8;
            camera.orthoRight = 8;
        })
        //打开调试器
//                this.scene.debugLayer.show();
      },
      //重置
      resetWidget() {
        this.reset_on = true;
      },
      imgL(src, callback) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
          callback && callback(img.src);
        }
      },
      btnClose(){
          this.close_on=true;
      },
    },
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  input, button {
    outline: none;
    -webkit-appearance: none;
    border-radius: 0;
  }

  canvas {
    width: 100%;
    height: 100%;
    outline: none;
    position: absolute;
    top:0;
    left: 0;
    right:0;
    bottom:0;
    margin: auto;
  }

  /*盒模型，padding尺寸不用再减去*/
  *,
  *:before,
  *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  }

  html, body, #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    touch-action: none;
    -ms-touch-action: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently not supported by any browser */
  }

  /*ui*/
  .UI-camera {
    width: 80px;
    height: 80px;
    cursor: pointer;
  }

  /*内容区*/
  .container {
    width: calc(100% - 280px);
    float: left;
    height: 100%;
  }

  .container h3 {
    font-size: 24px;
    color: #FFF;
    line-height: 1.0;
    padding: 24px;
    font-weight: normal;
    position: absolute;
  }

  .app_aside {
    float: left;
    width: 280px;
    height: 100%;
    position: absolute;
    top:0;
    left: auto;
    right:0;
    bottom:0;
  }
  .mainDiv{
    position: relative;
    height:calc(100% - 72px);
  }
  .mainDiv .left {
    height: 100%;
    width:100%;
    padding:30px;
    position: absolute;
    top:0;
    left: 0;
    right:0;
    bottom:0;
    margin: auto;
  }

  .insp-wrapper {
    width: 100%;
    height: 100%;
  }
  .ui_btn>div{
      float: right;
  }
  .aside_reset {
    margin: 20px 24px;
    right:0;
  }

  .btn_space {
    padding: 20px;
    width: 100%;
    height: 100%;
    clear: both;
    /*display: flex;*/
    /*align-items: center;*/
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    overflow-y: auto;
  }

  .btn_space .ui_btn{
    height: 256px;
  }
  .ui_btn .btn1{
    margin-bottom: 15px;
  }
  .ui_btn .btn2{
    margin-bottom: 15px;
  }
  .ui_btn .btn3{
    margin-bottom: 50px;
  }
  .times div{
     width:120px;
     height:60px;
      margin-bottom:15px;
      position: relative;
      /*background-position: center;*/
      /*background-repeat: no-repeat;*/
      /*background-size: contain;*/
  }
  .times div img{
      width: 100%;
      height: auto;
  }
  .times div p{
      width:54px;
      left:0;
      right:0;
      color:#fff;
      position:absolute;
      bottom:10px;
      margin: auto;
      font-size:12px;
  }
  #notSupported {
      color: #232F32;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      right: 0;
      background-color: #ffffff;
      text-align: center;
      padding-top: 0;
      font-size: 30px;
      z-index: 999;
      cursor: default
  }
  .hidden {
      display: none
  }
   .viewBox{
    position: absolute;
    left: 25px;
    top: 0;
    bottom: 0;
    z-index: 999;
    width: 40%;
    height: auto;
    justify-content:center;
    align-items:center;
    display:-webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
  }

  #leftGif{
    position: relative;
    width: 100%;
    height: auto;
    padding: 10px;
    box-shadow: 0 1px 2px 0 hsla(0,0%,42%,.34);
    border: 1px solid hsla(0,0%,79%,.26);
    border-radius: 6px;
    background-color: #fff;
  }
   #leftGif img.bg{
    display: block;
    width: 100%;
    height: auto;
}

  img.close{
    position: absolute;
    top: 5px;
    right: 5px;
    width: 6%;
    cursor: pointer;
  }
    .op{
        opacity: 0;
    }
</style>
