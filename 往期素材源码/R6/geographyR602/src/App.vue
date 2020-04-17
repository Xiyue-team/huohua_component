<template>

  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <div class="times" :style="'transform:scale(1.1);background-color:transparent;z-index:999;padding-top:20px;width:120px;height:305px;position:absolute;left:45px;top:0;bottom:0;margin:auto 0;'">
          <div>
              <img src="static/image/1.png">
              <p>{{Time}}</p>
          </div>
          <div>
              <img src="static/image/2.png">
              <p>{{Time1}}</p>
          </div>
          <div>
              <img src="static/image/3.png">
              <p>{{Time2}}</p>
          </div>
          <div>
              <img src="static/image/4.png">
              <p>{{Time3}}</p>
          </div>
      </div>
      <canvas id="renderCanvas" touch-action="none" tabindex="1" ></canvas>
      <h3 v-text="title" class="app_title"></h3>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget" :style="'position:absolute;'"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
        <div class="ui_btn">
            <ui-btn class="btn1" ref="btn1" :type="blue1" size="big" @click.native="btnClick(1)">北极俯视</ui-btn>
            <ui-btn class="btn2" ref="btn2" :type="blue2" size="big" @click.native="btnClick(2)">南极俯视</ui-btn>
            <ui-btn class="btn3" ref="btn3" :type="blue3" size="big" @click.native="btnClick(3)">侧视</ui-btn>
            <ui-btn type="switch" v-model="switch_checked1">自转</ui-btn>
        </div>
      </div>
    </div>
    <div id="notSupported">loading...</div>
  </div>
</template>
<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  import uiGroup from '@/components/UI/uiGroup';//单选组
  import uiSlider from '@/components/UI/uiSlider';//滑块
  export default {
    name: 'app',
    components: {uiHead, uiBtn, uiGroup, uiSlider},
    data() {
      return {
        title: '时间的“早”与“晚”',
        played: true,
        BtnSpaceStyle: 'flex',
        reset_on : false,
        blue1:'blue',
        blue2:'',
        blue3:'',
        switch_checked1:true,
        on_btn1:false,
        on_btn2:false,
        on_btn3:false,
        isBtnDown1:false,
        isBtnDown2:false,
        isBtnDown3:false,
        BH:19,
        BF:50,
        Time:'',
        Time1:'',
        Time2:'',
        Time3:'',
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
      this.setSideStyle()
    },
    methods: {
      //计算侧边
      setSideStyle() {
        const el = document.getElementById('btn_space')
        if (el && el.scrollHeight > el.offsetHeight) {
          this.BtnSpaceStyle = 'block'
        } else {
          this.BtnSpaceStyle = 'flex'
        }
        var btn_space=document.getElementById('btn_space');
        if(window.innerHeight<540){
            btn_space.style.zoom='0.9';
        }else{
            btn_space.style.zoom='1';
        }
      },

      //初始化
      init() {
        this.canvas = document.getElementById("renderCanvas");
        //创建模型
        this.createScene();

      },

      createLabel(advancedTexture,mesh, name) {
        var label = new BABYLON.GUI.Rectangle(name);
        label.height = "30px";
        label.alpha = 1;
        label.width = "200px";
        label.cornerRadius = 20;
        label.thickness = 0;
        label.linkOffsetY = 20;
        label.linkOffsetX = 0;
        advancedTexture.addControl(label);
        label.linkWithMesh(mesh);

        var text1 = new BABYLON.GUI.TextBlock();
        text1.text = name;
        text1.color = "white";
        text1.fontSize='14px';
        label.addControl(text1);
        return label;
      },
      changeTime(rand,HH,FF){
          var F=rand*4;
          var H=Math.floor(F/60);
          var FS=F%60;
          H=HH-H;
          F=FF-FS;
          if(F<0){
             H--;
             F=F+60;
          }
          if(H<0){
              H=H+24;
          }
          H=H<10?'0'+H:H;
          F=F<10?'0'+F:F;
          return H+'时'+F+'分';
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
          "color.rgb =color.rgb*mixsmooth+ color.rgb* ndl + vec3(specComp);\r\n" +
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
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.1;
        var light1 = new BABYLON.DirectionalLight("Omni2", new BABYLON.Vector3(-1, 0, 0), scene);
        light1.intensity = 1;
        //设置相机
        var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 20, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(this.canvas, false);
        camera.lowerRadiusLimit = 20;
        camera.upperRadiusLimit = 20;
        camera.minZ = 1.0;
        camera.inputs.clear();
        camera.layerMask = 0x20000000;
        scene.clearColor = new BABYLON.Color3(0, 0, 0.6);

        camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
        var sb = engine.getRenderHeight() / engine.getRenderWidth();
        camera.orthoTop = sb*10;
        camera.orthoBottom = -sb*10;
        camera.orthoLeft = -10;
        camera.orthoRight = 10;

        var camera1 = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI / 2, 20, BABYLON.Vector3.Zero(), scene);
        camera1.attachControl(this.canvas, false);
        camera1.lowerRadiusLimit = 20;
        camera1.upperRadiusLimit = 20;
        camera1.minZ = 1.0;
        camera1.inputs.clear();
        camera1.layerMask = 0x40000000;
        scene.activeCameras.push(camera1);
        scene.activeCameras.push(camera);
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

        var linecolor = new BABYLON.Color3(0.5, 0.5, 0.5);
        var DashedLineColor = new BABYLON.Color3(0.8, 0.8, 0);
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
//        var diffusetex = new BABYLON.Texture("./static/earth/earth8k.jpg", scene);
        var daySampler = new BABYLON.Texture("./static/earth/earth8k.jpg", scene);
        var nightSampler = new BABYLON.Texture("./static/earth/night.jpg", scene);
//        var NRMtex = new BABYLON.Texture("./static/earth/earth8k_NRM.jpg", scene);

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
        earth.layerMask = 0x20000000;
        earth.material = earthforMaterial;
        earth.rotation = new BABYLON.Vector3(0, 0, Math.PI);
        earth.setParent(earthgroup);

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
        cloud.layerMask = 0x20000000;
        cloud.material = cloudMaterial;
        cloud.rotation = new BABYLON.Vector3(0, 0, Math.PI);
        cloud.setParent(earthgroupcloud);
        earthgroupcloud.setParent(earthgroup);
        //地球偏移node偏移
        earthgroup.setParent(earthgroupAngle);
        earthgroupAngle.position.x=-0.8;

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
          if(sphere1.getWorldMatrix().getTranslation().z>0.58){
              label1.isVisible=false;
          }else{
              label1.isVisible=true;
          }
          if(sphere2.getWorldMatrix().getTranslation().z>0.58){
              label2.isVisible=false;
          }else{
              label2.isVisible=true;
          }
          if(sphere3.getWorldMatrix().getTranslation().z>0.58){
              label3.isVisible=false;
          }else{
              label3.isVisible=true;
          }
          if(sphere4.getWorldMatrix().getTranslation().z>0.58){
              label4.isVisible=false;
          }else{
              label4.isVisible=true;
          }
        });

        var earth_copy = new BABYLON.Mesh("p", scene);
        earth_copy.position = new BABYLON.Vector3(0, 0, 0);

        earthgroupAngle.setParent(earth_copy);
        earth_copy.layerMask = 0x20000000;

        var plane = BABYLON.Mesh.CreatePlane("plane", 10.0, scene);
        plane.position = new BABYLON.Vector3( -0.8, 0, 0);
        plane.rotation = new BABYLON.Vector3( Math.PI, Math.PI, Math.PI);

        var planTexture1 = new BABYLON.Texture("./static/image/bjs.png", scene);
        BABYLON.Effect.ShadersStore["plan1VertexShader"] = customVertexShader111;
        BABYLON.Effect.ShadersStore["plan1FragmentShader"] = customFragmentShader222;
        var materialplans = new BABYLON.ShaderMaterial("shader", scene, { vertex: "plan1", fragment: "plan1", }, { attributes: ["position", "normal", "uv"], uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"], needAlphaBlending: true });
        materialplans.setTexture("textureSampler", planTexture1);
        materialplans.backFaceCulling = false;
        plane.material = materialplans;
        plane.setParent(earth_copy);
        plane.layerMask = 0x20000000;
        plane.isVisible=true;

        var plane1 = BABYLON.Mesh.CreatePlane("plane", 10.0, scene);
        plane1.position = new BABYLON.Vector3( -0.8, 0, 0);
        plane1.rotation = new BABYLON.Vector3( Math.PI, Math.PI, Math.PI);

        var planTexture1 = new BABYLON.Texture("./static/image/njs.png", scene);
        BABYLON.Effect.ShadersStore["plan1VertexShader"] = customVertexShader111;
        BABYLON.Effect.ShadersStore["plan1FragmentShader"] = customFragmentShader222;
        var materialplans = new BABYLON.ShaderMaterial("shader", scene, { vertex: "plan1", fragment: "plan1", }, { attributes: ["position", "normal", "uv"], uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"], needAlphaBlending: true });
        materialplans.setTexture("textureSampler", planTexture1);
        materialplans.backFaceCulling = false;
        plane1.material = materialplans;
        plane1.setParent(earth_copy);
        plane1.layerMask = 0x20000000;
        plane1.isVisible=false;

        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui1");
        var sphere1 = BABYLON.Mesh.CreateSphere("sphere1", 10.0, .15, scene);
        var mat = new BABYLON.StandardMaterial("", scene);
        mat.diffuseColor =  new BABYLON.Color3(0, 0, 0);
        mat.specularColor = new BABYLON.Color3(0, 0, 0);
        mat.emissiveColor = BABYLON.Color3.Red();
        sphere1.material = mat;
        sphere1.position = new BABYLON.Vector3(1.3-0.8, -1.7, -2.1);
        sphere1.layerMask = 0x20000000;
        sphere1.setParent(earth);
        var label1=this.createLabel(advancedTexture,sphere1,"布宜诺斯艾利斯");
        advancedTexture.layer.layerMask = 0x20000000;

        var sphere2 = BABYLON.Mesh.CreateSphere("sphere2", 10.0, .15, scene);
        var mat = new BABYLON.StandardMaterial("", scene);
        mat.diffuseColor =  new BABYLON.Color3(0, 0, 0);
        mat.specularColor = new BABYLON.Color3(0, 0, 0);
        mat.emissiveColor = BABYLON.Color3.Red();
        sphere2.material = mat;
        sphere2.position = new BABYLON.Vector3(2.35-0.8, -1.7, .8);
        sphere2.layerMask = 0x20000000;
        sphere2.setParent(earth);
        var label2=this.createLabel(advancedTexture,sphere2,"开普敦");
        advancedTexture.layer.layerMask = 0x20000000;

        var sphere3 = BABYLON.Mesh.CreateSphere("sphere3", 10.0, .15, scene);
        var mat = new BABYLON.StandardMaterial("", scene);
        mat.diffuseColor =  new BABYLON.Color3(0, 0, 0);
        mat.specularColor = new BABYLON.Color3(0, 0, 0);
        mat.emissiveColor = BABYLON.Color3.Red();
        sphere3.material = mat;
        sphere3.position = new BABYLON.Vector3(-1.85, 1.915, 2.05);
        sphere3.layerMask = 0x20000000;
        sphere3.setParent(earth);
        var label3=this.createLabel(advancedTexture,sphere3,"北京");
        advancedTexture.layer.layerMask = 0x20000000;

        var sphere4 = BABYLON.Mesh.CreateSphere("sphere4", 10.0, .15, scene);
        var mat = new BABYLON.StandardMaterial("", scene);
        mat.diffuseColor =  new BABYLON.Color3(0, 0, 0);
        mat.specularColor = new BABYLON.Color3(0, 0, 0);
        mat.emissiveColor = BABYLON.Color3.Red();
        sphere4.material = mat;
        sphere4.position = new BABYLON.Vector3(-1.9, 2.18, -1.78);
        sphere4.layerMask = 0x20000000;
        sphere4.setParent(earth);
        var label4=this.createLabel(advancedTexture,sphere4,"西雅图");
        advancedTexture.layer.layerMask = 0x20000000;

        earthgroupAngle.rotation.x=-Math.PI/2;
        //启动
        engine.runRenderLoop(() => {
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
                      document.getElementById("notSupported").className = "hidden";
                  }
              }
          }
          scene.render();
          //北极俯视
          if(this.on_btn1){
            if(this.isBtnDown1) {
              earthgroupAngle.rotation.x=-Math.PI/2;
              plane.isVisible=true;
              plane.rotation.x=0;
              plane1.isVisible=false;
              this.isBtnDown1 =false;
              label1.isVisible=false;
              label2.isVisible=false;
              label3.isVisible=true;
              label4.isVisible=true;
            }
          }
          //南极俯视
          if(this.on_btn2){
            if(this.isBtnDown2) {
              earthgroupAngle.rotation.x=+Math.PI/2;
              plane1.isVisible=true;
              plane.isVisible=false;
              this.isBtnDown2 =false;
              label1.isVisible=true;
              label2.isVisible=true;
              label3.isVisible=false;
              label4.isVisible=false;
            }
          }
          //侧视
          if(this.on_btn3){
            if(this.isBtnDown3) {
              earthgroupAngle.rotation.x=0;
              plane1.isVisible=false;
              plane.rotation.x=Math.PI*48/180;
              plane.isVisible=true;
              this.isBtnDown3 =false;
              label1.isVisible=true;
              label2.isVisible=true;
              label3.isVisible=true;
              label4.isVisible=true;
            }
          }
          //自转
          if(this.switch_checked1){
            alpha -=1/180*Math.PI/4;
            var BH=this.BH,BF=this.BF;
            BF+=1;
            if(BF>=60){
                BF-=60;
                BH++;
            }
            if(BH>=24){
                BH-=24;
            }
            this.BH=BH;
            this.BF=BF;
            BH=BH<10?'0'+BH:BH;
            BF=BF<10?'0'+BF:BF;
            this.Time=BH+'时'+BF+'分';
            this.Time1=this.changeTime(238,this.BH,this.BF);
            this.Time2=this.changeTime(174,this.BH,this.BF);
            this.Time3=this.changeTime(98,this.BH,this.BF);
          }

          //重置
          if (this.reset_on) {
            this.blue1 = 'blue';
            this.blue2 = '';
            this.blue3 = '';
            this.on_btn1 = false;
            this.on_btn2 = false;
            this.on_btn3 = false;
            this.isBtnDown1 = false;
            this.isBtnDown2 = false;
            this.isBtnDown3 = false;
            this.switch_checked1 = true;
            earthgroupAngle.rotation.x=-Math.PI/2;
            plane.rotation.x=0;
            plane.isVisible=true;
            plane1.isVisible=false;
            this.reset_on = false;
            this.BH=19;
            this.BF=50;
            alpha=0;
            label1.isVisible=true;
            label2.isVisible=true;
            label3.isVisible=true;
            label4.isVisible=true;
          }
        });
        engine.resize();
        //窗口更改大小
        window.addEventListener('resize', () => {
          engine.resize();
            var sb = engine.getRenderHeight() / engine.getRenderWidth();
            camera.orthoTop = sb*10;
            camera.orthoBottom = -sb*10;
            camera.orthoLeft = -10;
            camera.orthoRight = 10;
            this.setSideStyle();
        })
        //打开调试器
//                this.scene.debugLayer.show();
      },
      //重置
      resetWidget() {
        this.reset_on = true;
      },
      //按钮
      btnClick(n) {
        if (n == '1') {
          this.blue1 = 'blue';
          this.blue2 = '';
          this.blue3 = '';
          this.on_btn1 = true;
          this.on_btn2 = false;
          this.on_btn3 = false;
          this.isBtnDown1 = true;
        } else if (n == '2') {
          this.blue2 = 'blue';
          this.blue1 = '';
          this.blue3 = '';
          this.on_btn2 = true;
          this.on_btn1 = false;
          this.on_btn3 = false;
          this.isBtnDown2 = true;
        }else if (n == '3') {
          this.blue3 = 'blue';
          this.blue1 = '';
          this.blue2 = '';
          this.on_btn3 = true;
          this.on_btn2 = false;
          this.on_btn1 = false;
          this.isBtnDown3 = true;
        }
      }
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
</style>
