<template>
  <div>
    <div class="title">
      <h2>太阳回归运动与节气</h2>
      <i id="reset"><img class="btn" src="static/image/reset.png"/></i>
    </div>
    <div class="main" ref="main">
      <div class="main-left">
        <canvas id="renderCanvas" touch-action="none" tabindex="1" ref="renderCanvas"></canvas>
      </div>
      <div class="main-right" ref="mainRight">
        <div>
          <div class="ctrl" ref="ctrl">
            <div class="bg" ref="bg">
              <div style="bottom:-8px;left: 30px;" class="bgq">
                <span style="left: -0.2em;bottom:-0.8em;">立春</span>
              </div>
              <div style="bottom:-30px;left: 138.5px;background-image: url(./static/image/q.png)" class="bgq bgq-one">
                <span style="left: 0.5em;bottom:-1.1em;">春分</span>
              </div>
              <div style="bottom:-8px;right: 30px;" class="bgq">
                <span style="right: -0.2em;bottom:-0.8em;">立夏</span>
              </div>
              <div style="top:70px;right: -30px;" class="bgq">
                <span style="right: -2.5em;top:0.8em;">夏至</span>
              </div>
              <div style="top:-8px;right: 30px;" class="bgq">
                <span style="right: -0.2em;top:-1.1em;">立秋</span>
              </div>
              <div style="top:-30px;left: 138.5px;" class="bgq">
                <span style="left: 0.5em;top:-1.2em;">秋分</span>
              </div>
              <div style="top:-8px;left: 30px;" class="bgq">
                <span style="left: -0.2em;top:-1.1em;">立冬</span>
              </div>
              <div style="top:70px;left: -30px;" class="bgq">
                <span style="left: -2em;top:0.8em;">冬至</span>
              </div>
              <div
                style="top:57px;left: 88px;width: 70px;height: 70px;pointer-events:none;background-image: url(./static/image/t.png)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="notSupported">loading...</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isMob: '',
        choose: {
          1: Math.tan(11.75 * Math.PI / 180),
          2: 0,
          3: Math.tan(-11.75 * Math.PI / 180),
          4: Math.tan(-23.5 * Math.PI / 180),
          5: Math.tan(-11.75 * Math.PI / 180),
          6: 0,
          7: Math.tan(11.75 * Math.PI / 180),
          8: Math.tan(23.5 * Math.PI / 180)
        }
      };
    },
    methods: {
      init1: function () {
        this.isMob = /iPad|Android/g.test(navigator.userAgent);
        this.$refs.main.style.height = window.innerHeight + 'px';
        var mainRight = this.$refs.mainRight;
        var W = parseInt(mainRight.offsetWidth * 0.875);
        var H = parseInt(mainRight.offsetHeight);
        var zoom = 1;
        if (W > H) {
          zoom = H / 512;
        } else {
          zoom = W / 512;
        }
        this.$refs.ctrl.style.zoom = zoom;
        $('.main-left canvas').width(window.innerWidth).height(H);
      },
      init: function () {
        var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, true);
        engine.enableOfflineSupport = false;
        var scene = new BABYLON.Scene(engine);
        scene.clearColor.set(1, 1, 1, 1);
        this.createScene(scene, canvas);
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
                document.getElementById("notSupported").className = "hidden";
              }
            }
          }
        }
        engine.runRenderLoop(renderFunction);
        window.onresize = () => {
          this.init1();
          engine.resize();
        }
      },
      createScene: function (scene, canvas) {
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
          "color.rgb =color.rgb*mixsmooth+ color.rgb* ndl + vec3(specComp);\r\n" +
          "gl_FragColor = vec4(color);\r\n}\r\n";

        var r = 3;
        var linecolor = new BABYLON.Color3(0.5, 0.5, 0.5);
        var DashedLineColor = new BABYLON.Color3(0.8, 0.8, 0);

        var thiz = this;
        var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", Math.PI / 2, Math.PI / 2, 12, new BABYLON.Vector3(0, 0, 0), scene);
        camera.upperRadiusLimit = 12;
        camera.lowerRadiusLimit = 12;
        camera.attachControl(canvas, true);
        camera.layerMask = 0x20000000;

        camera.viewport = new BABYLON.Viewport(-0.2, 0, 1, 1);

        var camera2 = new BABYLON.ArcRotateCamera("ArcRotateCamera", Math.PI / 2, Math.PI / 2, 12, new BABYLON.Vector3(0, 0, 0), scene);
        camera2.upperRadiusLimit = 12;
        camera2.lowerRadiusLimit = 12;
        camera2.layerMask = 0x40000000;
        camera2.attachControl(canvas, true);
        scene.activeCameras.push(camera2, camera);

        var changelight = new BABYLON.DirectionalLight("Dir", new BABYLON.Vector3(1, 0, 0), scene);
        changelight.intensity = 0;
        changelight.diffuse = new BABYLON.Color3(1, 0.8, 0.6);
        changelight.specular = new BABYLON.Color3(1, 0.8, 0.6);
        var light1 = changelight;
        var lights = new BABYLON.HemisphericLight("sss", new BABYLON.Vector3(0, 1, 0), scene);
        lights.intensity = 0.2;
        var lights = new BABYLON.HemisphericLight("sss", new BABYLON.Vector3(0, -1, 0), scene);
        lights.intensity = 0.2;
        var tex = new BABYLON.Texture("./static/image/textures/bg.jpg", scene);
        var material2 = new BABYLON.StandardMaterial("kosh", scene);
        material2.diffuseTexture = tex;
        material2.emissiveTexture = tex;
        material2.backFaceCulling = false;
        var skybox = BABYLON.Mesh.CreateSphere("skyBox", 50, 2000, scene);
        skybox.material = material2;
        skybox.layerMask = 0x40000000;

        //地球node
        var earthgroup = new BABYLON.Mesh("g", scene);
        earthgroup.position = new BABYLON.Vector3(0, 0, 0);
        //地球node
        var earthgroupcloud = new BABYLON.Mesh("g", scene);
        earthgroupcloud.position = new BABYLON.Vector3(0, 0, 0);
        //地球角度偏移node
        var earthgroupAngle = new BABYLON.Mesh("g", scene);
        earthgroupAngle.position = new BABYLON.Vector3(0, 0, 0);

        function createtext(mesh, name) {
          var plane = BABYLON.Mesh.CreatePlane("plane", 8);
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
          plane.rotation = new BABYLON.Vector3(mesh.rotation.x, -Math.PI / 2, 0);
          if (name == "国际日期变更线") {
            plane.rotation = new BABYLON.Vector3(Math.PI + mesh.rotation.x, -Math.PI / 2, Math.PI / 2);
          } else if (name == "本初子午线") {
            plane.rotation = new BABYLON.Vector3(Math.PI + mesh.rotation.x, Math.PI / 2, Math.PI / 2);
          }
          var plane1 = new BABYLON.Mesh("plane", scene);
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
          text1.fontSize = "14px"
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
          circledot.layerMask = 0x20000000;
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
//                    circle.position.x=220;
//                    circle.scaling=new BABYLON.Vector3(0.965, 1, 0.965);
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
//                    Dashedcircle.position.x=220;
//                    Dashedcircle.scaling=new BABYLON.Vector3(0.965, 1, 0.965);
          Dashedcircle.setParent(earthgroup);
        }

        //创建经线
        function createWarp(r, percentPI, color) {

          for (i = 0; i < Math.PI; i += Math.PI / percentPI) {
            var ncircles = createCircle(r, 360, 0, color, scene, "x");
            var rot = new BABYLON.Vector3(0, i, 0);
            ncircles.rotation = rot;
            ncircles.setParent(earthgroup);
            ncircles.layerMask = 0x20000000;
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
          circle.color = color;
          circle.rotation.y = Math.PI;
          circle.setParent(earthgroup);
          circle.layerMask = 0x20000000;
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

//                //画地轴
//                function CreateAxisLine(radius, parent) {
//                    var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 2 * radius, 0.05, 0.05, 16, 1, scene);
//                    var cylinderMat = new BABYLON.StandardMaterial("cylinder", scene);
//                    cylinderMat.emissiveColor = BABYLON.Color3.Gray();
//                    cylinder.material = cylinderMat;
//                    cylinder.setParent(parent);
//                }
//
//                CreateAxisLine(r+1, earthgroup);
        var lineradius = r + 0.01;
        CreateWeft(lineradius, 15, linecolor);//创建纬线：0°至南北纬90°，间隔15°；
        // CreateWeft(lineradius,30, linecolor);//创建纬线：0°至南北纬90°，间隔30°；
        CreateDashedWeft(23.26, lineradius, 360, DashedLineColor, true);//创建回归线：0°至南北纬90°，间隔30°；
        CreateDashedWeft(23.26, lineradius, 360, DashedLineColor);
        CreateDashedWeft(66.74, lineradius, 360, DashedLineColor);//创建极圈：0°至南北纬90°，间隔30°；
        CreateDashedWeft(66.74, lineradius, 360, DashedLineColor, true);
        createWarp(lineradius, 12, linecolor);//创建经线：起始线0°至180°，间隔30°；

//                CreateWeftLabel(lineradius, 15);
//                CreateWeftLineLabel(23.26, lineradius);
//                CreateWeftLineLabel(23.26, lineradius, true);
//                CreateWeftLineLabel(66.74, lineradius);
//                CreateWeftLineLabel(66.74, lineradius, true);
//                createWarpLabel(lineradius, 12);//创建经线标签：起始线0°至180°，间隔30°；
//                CreateWeftLineLabel(31.1, lineradius, true);//国际日期变更线
//                CreateWeftLineLabel(7.2, lineradius, true);//本初子午线
        createDateChangeLine(r + 0.02, 180, 0, DashedLineColor, scene);

        //画地球
        var daySampler = new BABYLON.Texture("./static/earth/earth8k.jpg", scene);
        var nightSampler = new BABYLON.Texture("./static/earth/night.jpg", scene);

        BABYLON.Effect.ShadersStore["earthVertexShader"] = customVertexShader;
        BABYLON.Effect.ShadersStore["earthFragmentShader"] = earthFragmentShader;
        var earthforMaterial = new BABYLON.ShaderMaterial("shader", scene, {
          vertex: "earth",
          fragment: "earth",
        }, {
          attributes: ["position", "normal", "uv"],
          uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
        });
        earthforMaterial.setTexture("daySampler", daySampler);
        earthforMaterial.setTexture("nightSampler", nightSampler);
        earthforMaterial.setVector3("cameraPosition", scene.activeCamera.position);
        earthforMaterial.setFloat("intsmooth", 1);//晨昏线明显度
        earthforMaterial.setFloat("intsmootht", 5);//晨昏线明显度
        earthforMaterial.setVector3("lightVectorW", new BABYLON.Vector3(-light1.direction.x, -light1.direction.y, -light1.direction.z));
        earthforMaterial.backFaceCulling = false;

        // var earthMaterial = new BABYLON.StandardMaterial("earth", scene);
        // earthMaterial.diffuseTexture = diffusetex;
        // earthMaterial.specularColor = new BABYLON.Color3(0., 0., 0.);

        var earth = BABYLON.Mesh.CreateSphere("earth", 32, 2 * r, scene);
        earth.material = earthforMaterial;
        earth.rotation = new BABYLON.Vector3(0, 0, Math.PI);
        earth.setParent(earthgroup);
        earth.layerMask = 0x20000000;

        //画地球云图
        var planTexture = new BABYLON.Texture("./static/earth/cloud.png", scene);
        BABYLON.Effect.ShadersStore["planVertexShader"] = customVertexShader;
        BABYLON.Effect.ShadersStore["planFragmentShader"] = customFragmentShader;
        var cloudMaterial = new BABYLON.ShaderMaterial("shader", scene, {
          vertex: "plan",
          fragment: "plan",
        }, {
          attributes: ["position", "normal", "uv"],
          uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
          needAlphaBlending: true
        });
        cloudMaterial.setTexture("textureSampler", planTexture);
        cloudMaterial.setVector3("cameraPosition", scene.activeCamera.position);
        cloudMaterial.setFloat("mixsmooth", 0.1);//云图阴影叠加值
        cloudMaterial.setFloat("intsmooth", 3.);//晨昏线明显度
        cloudMaterial.setFloat("time", 0);//晨昏线明显度
        cloudMaterial.setVector3("lightVectorW", new BABYLON.Vector3(-light1.direction.x, -light1.direction.y, -light1.direction.z));
        cloudMaterial.backFaceCulling = false;

        var cloud = BABYLON.Mesh.CreateSphere("earth", 32, 2 * r + 0.1, scene);
        cloud.material = cloudMaterial;
        cloud.rotation = new BABYLON.Vector3(0, 0, Math.PI);
        cloud.setParent(earthgroupcloud);
        cloud.layerMask = 0x20000000;
        earthgroupcloud.setParent(earthgroup);
        //地球偏移node偏移
        earthgroup.setParent(earthgroupAngle);
//                earthgroupAngle.rotation = new BABYLON.Vector3(0, 0, Math.PI / 180 * 23.26);

        var alpha = 0;
        scene.registerBeforeRender(function () {
          var activeCameraPosition = scene.activeCamera.position;
          var direction = new BABYLON.Vector3(-light1.direction.x, -light1.direction.y, -light1.direction.z);
          cloudMaterial.setVector3("cameraPosition", activeCameraPosition);
          cloudMaterial.setVector3("lightVectorW", direction);
          cloudMaterial.setFloat("time", alpha);//晨昏线明显度
          earthforMaterial.setVector3("cameraPosition", activeCameraPosition);
          earthforMaterial.setVector3("lightVectorW", direction);

          earthgroupcloud.rotation = new BABYLON.Vector3(0, alpha * 0.2, 0);
          earthgroup.rotation = new BABYLON.Vector3(0, alpha, 0);
          alpha -= 0.002;
        });

        function reset() {
          changelight.direction.set(1, 0, 0);
          camera.radius = 12;
          camera.alpha = Math.PI / 2;
          camera.beta = Math.PI / 2;
          camera2.radius = 12;
          camera2.alpha = Math.PI / 2;
          camera2.beta = Math.PI / 2;
          $('.bg>div.bgq').css('background-image', 'url(./static/image/k.png)');
          $('.bgq-one').css('background-image', 'url(./static/image/q.png)');
        }

        function chooseEarth() {
          $('.bg>div.bgq').css('background-image', 'url(./static/image/k.png)');
          $(this).css('background-image', 'url(./static/image/q.png)');
          var index = $(this).index();
          changelight.direction.set(1, thiz.choose[index + 1], 0);
        }

        var resetB = document.getElementById("reset");
        if (this.isMob) {
          resetB.addEventListener('touchstart', reset);
          $('.bg>div').on('touchstart', chooseEarth);
          ;
        } else {
          resetB.addEventListener('click', reset);
          $('.bg>div').on('click', chooseEarth);
        }
      },
    },
    mounted() {
      this.init1();
      this.init();
      $('.bg').css('background-image', 'url(./static/image/bg.png)');
      $('.bg>div.bgq').css('background-image', 'url(./static/image/k.png)');
      $('.bg>div.bgq-one').css('background-image', 'url(./static/image/q.png)');
    }
  }
</script>

<style>
  .title {
    height: 76px;
    width: 100%;
    background: transparent;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.12);
    position: absolute;
    z-index: 999;
  }

  .title h2 {
    padding: 26px 24px;
    font-size: 24px;
    line-height: 24px;
    height: 24px;
    color: #fff;
  }

  #reset {
    position: absolute;
    right: 20px;
    bottom: 18px;
  }

  #reset img {
    width: 49px;
    height: 41px;
    cursor: pointer;
  }

  .main {
    position: relative;
  }

  .main > div {
    /*width: 50%;*/
    height: 100%;
    float: left;
  }

  .main-left {
    /*width:calc(100% - 280px);*/
    width: 60%;
  }

  .main-left canvas {
    outline: none;
    position: absolute;
    top: 0;
  }

  .main-right {
    /*width:280px;*/
    width: 35%;
    padding-right: 5%;
  }

  .main-right > div {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .main-right .ctrl {
    width: 490px;
    height: 490px;
    padding: 11px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .bg {
    width: 337px;
    height: 200px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .bg > div {
    width: 60px;
    height: 60px;
    position: absolute;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
    font-size: 20px;
  }

  .bg > div > span {
    display: inline-block;
    width: 2.5em;
    height: 1em;
    position: absolute;
    cursor: default;
    color: #fff;
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

  .hidden {
    display: none
  }

  @media (max-width: 720px) {
    .title h2 {
      font-size: 22px;
    }
  }

  @media (max-width: 655px) {
    .title h2 {
      font-size: 20px;
    }
  }
</style>
