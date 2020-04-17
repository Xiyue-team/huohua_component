<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div class="mainDiv" ref="mainDiv">
        <div class="left" ref="left">
          <canvas id="renderCanvas" touch-action="none" tabindex="1"></canvas>
          <div class="time">
            <h2>时间</h2>
            <div>
              <span class="m" ref="m"></span>月
              <span class="d" ref="d"></span>日
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
        <ui-btn class="btn1" ref="btn1" :type="blue1" size="big" @click.native="btnClick(1)">夏半年</ui-btn>
        <ui-btn class="btn2" ref="btn2" :type="blue2" size="big" @click.native="btnClick(2)">冬半年</ui-btn>
        <ui-slider class="UI-slider" :interval="value_one" :min="Min" :max="Max" title="太阳直射点H纬度" :noStart="noStart" :speed="0" v-model="value" :canCLick="false" :label="['23°26′N','23°26′S']" :formatter="formatter" :noBlueProcess="true" dotTxt="H"></ui-slider>
        <ui-btn type="switch" v-model="switch_checked1">太阳直射点移动</ui-btn>
      </div>
    </div>
    <div id="notSupported">loading...</div>
  </div>
</template>
<script>
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiGroup from '@/components/UI/uiGroup'; //单选组
import uiSlider from '@/components/UI/uiSlider'; //滑块
export default {
  name: 'app',
  components: {
    uiHead,
    uiBtn,
    uiGroup,
    uiSlider
  },
  data() {
    return {
      camera: null,
      canvas: null,
      engine: null,
      scene: null,
      light: null,
      title: '太阳直射点的移动',
      played: true,
      BtnSpaceStyle: 'flex',
      switch_checked1: false,
      reset_on: false,
      blue1: '',
      blue2: '',
      value_one: 0.25,
      on_btn1: false,
      on_btn2: false,
      Min: -23.44,
      Max: 23.44,
      value: 0,
      noStart: true,
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
  computed: {},
  watch: {
    switch_checked1() {
      if (this.switch_checked1) {
        this.blue2 = '';
        this.blue1 = '';
        this.on_btn1 = false;
        this.on_btn2 = false;
        this.noStart = true;
        this.reset_on = true;
      } else {
        this.value = 0;
        this.reset_on = true;
      }
    }
  },
  methods: {
    //度转度分
    formatDegree(value) {
      value = Math.abs(value);
      var v1 = Math.floor(value); //度
      var v2 = Math.floor((value - v1) * 60); //分
      var v3 = Math.round((value - v1) * 3600 % 60); //秒
      if (v2 === 0) {
        return v1 + '°';
      } else {
        v1 = v1 < 10 ? '0' + v1 : v1;
        v2 = v2 < 10 ? '0' + v2 : v2;
        return v1 + '°' + v2 + '′';
      }
    },

    //转换显示
    formatter(value) {
      return this.formatDegree(value)
    },
    //计算侧边
    setSideStyle() {
      const el = document.getElementById('btn_space')
      if (el && el.scrollHeight > el.offsetHeight) {
        this.BtnSpaceStyle = 'block'
      } else {
        this.BtnSpaceStyle = 'flex'
      }
      var H = window.innerHeight - 72;
      var W = window.innerWidth - 280;
      var zoom = 1;
      if (W / H > 724 / 776) {
        zoom = H / 776;
      } else {
        zoom = W / 724;
      }
      this.$refs.left.style.zoom = zoom;
    },

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
        "color.rgb =color.rgb*mixsmooth+ color.rgb* ndl + vec3(specComp);\r\n" +
        "gl_FragColor = vec4(color);\r\n}\r\n";
      var r = 2.75;
      //设置引擎
      var engine = new BABYLON.Engine(this.canvas, true);
      //设置场景
      var scene = new BABYLON.Scene(engine);
      scene.clearColor = new BABYLON.Color3(1, 1, 1);
      //设置灯光
      var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 0, 0), scene);
      light.diffuseColor = new BABYLON.Color3(0, 5, 5);
      var light1 = new BABYLON.DirectionalLight("Omni2", new BABYLON.Vector3(-1, 0, 0), scene);
      light1.intensity = 20;
      light1.direction = new BABYLON.Vector3(0, 0, 1);

      //设置相机
      //        var camera = new BABYLON.ArcRotateCamera('ArcRotateCamera',
      //          Math.PI, Math.PI / 2, 10, new BABYLON.Vector3(0,-0.4,-6.5), scene);
      var camera = new BABYLON.ArcRotateCamera('ArcRotateCamera',
        Math.PI, Math.PI / 2, 10, new BABYLON.Vector3(0, 0, 0), scene);
      camera.viewport = new BABYLON.Viewport(-.5, 0, 1, 1);

      camera.attachControl(this.canvas, true);
      camera.lowerRadiusLimit = 8;
      camera.upperRadiusLimit = 8;
      camera.minZ = 1.0;
      camera.layerMask = 0x20000000;
      camera.inputs.clear();

      scene.activeCameras.push(camera);

      //地球node
      var earthgroup = new BABYLON.Mesh("g", scene);
      earthgroup.layerMask = 0x20000000;
      earthgroup.position = new BABYLON.Vector3(0, 0, 0);
      //地球node
      var earthgroupcloud = new BABYLON.Mesh("g", scene);
      earthgroupcloud.position = new BABYLON.Vector3(0, 0, 0);
      earthgroupcloud.layerMask = 0x20000000;
      //地球角度偏移node
      var earthgroupAngle = new BABYLON.Mesh("g", scene);
      earthgroupAngle.position = new BABYLON.Vector3(0, 0, 0);
      earthgroupAngle.layerMask = 0x20000000;

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
        var x = Math.cos(earthangle * Math.PI / 180) * r; //所算出x值
        var rot = new BABYLON.Vector3(earthangle * Math.PI / 180, 0, 0);
        if (pos) {
          var y = Math.sqrt(r * r - x * x); //所算出y值
        } else {
          var y = -Math.sqrt(r * r - x * x); //所算出y值
          rot = new BABYLON.Vector3(-earthangle * Math.PI / 180, 0, 0);
        }

        var circledot = new BABYLON.Mesh("g", scene);
        circledot.rotation = rot;
        circledot.position = new BABYLON.Vector3(x, y, 0);
        circledot.layerMask = 0x20000000;


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
        var x = Math.cos(earthangle * Math.PI / 180) * r; //所算出x值
        if (pos) {
          var y = Math.sqrt(r * r - x * x); //所算出y值
        } else {
          var y = -Math.sqrt(r * r - x * x); //所算出y值
        }
        var circle = createCircle(x, angle, y, color);
        circle.layerMask = 0x20000000;
        circle.setParent(earthgroup);
      }
      //创建纬线（虚线）
      function CreateDashedWeft(earthangle, r, angle, color, pos) {
        //earthangle地球从赤道开始角度
        var x = Math.cos(earthangle * Math.PI / 180) * r; //所算出x值
        if (pos) {
          var y = Math.sqrt(r * r - x * x); //所算出y值
        } else {
          var y = -Math.sqrt(r * r - x * x); //所算出y值
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
          points: vertices,
          updatable: true,
          instance: circle
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
          circledot.layerMask = 0x20000000;
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
        var cylinderMat = new BABYLON.StandardMaterial("cylinder", scene);
        cylinderMat.emissiveColor = BABYLON.Color3.Gray();
        cylinder.material = cylinderMat;
        cylinder.setParent(parent);
        cylinder.layerMask = 0x20000000;
      }
      var linecolor = new BABYLON.Color3(0.5, 0.5, 0.5);
      var DashedLineColor = new BABYLON.Color3(0.8, 0.8, 0);
      var lineradius = r + 0.01;
      CreateAxisLine(r + 1, earthgroup);
      CreateWeft(lineradius, 15, linecolor); //创建纬线：0°至南北纬90°，间隔15°；
      // CreateWeft(lineradius,30, linecolor);//创建纬线：0°至南北纬90°，间隔30°；
      CreateDashedWeft(23.26, lineradius, 360, DashedLineColor, true); //创建回归线：0°至南北纬90°，间隔30°；
      CreateDashedWeft(23.26, lineradius, 360, DashedLineColor);
      CreateDashedWeft(66.74, lineradius, 360, DashedLineColor); //创建极圈：0°至南北纬90°，间隔30°；
      CreateDashedWeft(66.74, lineradius, 360, DashedLineColor, true);
      createWarp(lineradius, 12, linecolor); //创建经线：起始线0°至180°，间隔30°；

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
      earthforMaterial.setFloat("intsmooth", 1); //晨昏线明显度
      earthforMaterial.setFloat("intsmootht", 5); //晨昏线明显度
      earthforMaterial.setVector3("lightVectorW", new BABYLON.Vector3(-light1.direction.x, -light1.direction.y, -light1.direction.z));
      earthforMaterial.backFaceCulling = false;


      //创建地球
      var earth = BABYLON.Mesh.CreateSphere("earth", 32, 2 * r, scene);
      //        earth.scaling = new BABYLON.Vector3(.9,.9,.9);
      //        var materialeEarth = new BABYLON.StandardMaterial("texture", scene);
      //        materialeEarth.diffuseTexture = new BABYLON.Texture("./static/image/earthTextureMesh.png", scene);
      //        materialeEarth.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
      //        materialeEarth.emissiveColor = BABYLON.Color3.White();
      //        materialeEarth.specularColor = BABYLON.Color3.Black();
      //        materialeEarth.backFaceCulling = true;
      //        earth.material = materialeEarth;
      earth.material = earthforMaterial;
      earth.rotation.x = Math.PI;
      earth.layerMask = 0x20000000;
      //        earth.position.y =.2;
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
      cloudMaterial.setFloat("mixsmooth", 0.1); //云图阴影叠加值
      cloudMaterial.setFloat("intsmooth", 3.); //晨昏线明显度
      cloudMaterial.setFloat("time", 0); //晨昏线明显度
      cloudMaterial.setVector3("lightVectorW", new BABYLON.Vector3(-light1.direction.x, -light1.direction.y, -light1.direction.z));
      cloudMaterial.backFaceCulling = false;

      var cloud = BABYLON.Mesh.CreateSphere("earth1", 32, 2 * r + 0.01, scene);
      cloud.layerMask = 0x20000000;
      cloud.material = cloudMaterial;
      cloud.rotation = new BABYLON.Vector3(0, 0, Math.PI);
      cloud.setParent(earthgroupcloud);
      earthgroupcloud.setParent(earthgroup);
      //地球偏移node偏移
      earthgroup.setParent(earthgroupAngle);
      earthgroupAngle.rotation = new BABYLON.Vector3(0, 0, 0);
      //        $('#clear').on('click', function() {
      //
      //        });

      var alpha = 0;
      scene.registerBeforeRender(function() {
        var activeCameraPosition = scene.activeCamera.position;
        var direction = new BABYLON.Vector3(-light1.direction.x, -light1.direction.y, -light1.direction.z);
        cloudMaterial.setVector3("cameraPosition", activeCameraPosition);
        cloudMaterial.setVector3("lightVectorW", direction);
        cloudMaterial.setFloat("time", alpha); //晨昏线明显度
        earthforMaterial.setVector3("cameraPosition", activeCameraPosition);
        earthforMaterial.setVector3("lightVectorW", direction);

        earthgroupcloud.rotation = new BABYLON.Vector3(0, alpha * 0.2, 0);
        earthgroup.rotation = new BABYLON.Vector3(0, alpha, 0);
        alpha -= 0.001;
      });


      var earth_copy = new BABYLON.Mesh("p", scene);
      earth_copy.position = new BABYLON.Vector3(0, 0, 0);

      //        var ground = BABYLON.Mesh.CreateGround("ground", 3, 1, 2, scene);
      ////        ground.position = earth.position;
      //        ground.rotation = new BABYLON.Vector3(-Math.PI / 2, 0, Math.PI / 2);
      //        ground.scaling = new BABYLON.Vector3(.3, .3, .3);
      //
      //        ground.setParent(earth_copy);
      ////        console.log(ground.position.y)
      //        ground.position = new BABYLON.Vector3(earth_copy.position.x, 0, -3.45);
      //
      ////        console.log(earth_copy.position.y)
      //
      //        var materialePlane = new BABYLON.StandardMaterial("texture1", scene);
      //        materialePlane.diffuseTexture = new BABYLON.Texture("./static/image/jiantou.png", scene);
      //        materialePlane.diffuseTexture.hasAlpha = true;
      //        materialePlane.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
      //        materialePlane.emissiveColor = BABYLON.Color3.White();
      //        materialePlane.specularColor = BABYLON.Color3.Black();
      //        materialePlane.backFaceCulling = true;
      //        ground.material = materialePlane;
      //        ground.layerMask =0x20000000;

      var cone1 = BABYLON.MeshBuilder.CreateCylinder("cylinder", {
        height: 0.22,
        diameterTop: .03,
        diameterBottom: .03,
        tessellation: 10
      }, scene);
      cone1.layerMask = 0x20000000;
      cone1.position.z = -3.08;
      cone1.position.y = 0.19;
      cone1.rotation.x = Math.PI / 2;
      var cone2 = BABYLON.MeshBuilder.CreateCylinder("cylinder", {
        height: 0.2,
        diameterTop: .03,
        diameterBottom: .03,
        tessellation: 10
      }, scene);
      cone2.layerMask = 0x20000000;
      cone2.position.z = -3.18;
      cone2.position.y = 0.1;
      var mat = new BABYLON.StandardMaterial("1", scene);
      mat.diffuseColor = new BABYLON.Color3(0, 0, 0);
      mat.specularColor = new BABYLON.Color3(0, 0, 0);
      mat.emissiveColor = new BABYLON.Color3(0.9, 0.6, 0);
      mat.sideOrientation = true;
      cone1.material = mat;
      cone2.material = mat;
      cone1.setParent(earth_copy);
      cone2.setParent(earth_copy);

      var arrow_parent1 = createArrow(1.98, scene);
      arrow_parent1.position = new BABYLON.Vector3(0, 0, -4.02);

      var arrow_parent2 = createArrow(2.17, scene);
      arrow_parent2.position = new BABYLON.Vector3(0, 1, -3.93);

      var arrow_parent3 = createArrow(2.74, scene);
      arrow_parent3.position = new BABYLON.Vector3(0, 2, -3.63);

      var arrow_parent4 = createArrow(4.9, scene);
      arrow_parent4.position = new BABYLON.Vector3(0, 3, -2.55);

      var arrow_parent5 = createArrow(2.17, scene);
      arrow_parent5.position = new BABYLON.Vector3(0, -1, -3.93);

      var arrow_parent6 = createArrow(2.74, scene);
      arrow_parent6.position = new BABYLON.Vector3(0, -2, -3.63);

      var arrow_parent7 = createArrow(4.9, scene);
      arrow_parent7.position = new BABYLON.Vector3(0, -3, -2.55);

      function createArrow(l, scene) {
        var mat = new BABYLON.StandardMaterial("1", scene);
        mat.diffuseColor = new BABYLON.Color3(0, 0, 0);
        mat.specularColor = new BABYLON.Color3(0, 0, 0);
        mat.emissiveColor = new BABYLON.Color3(0.9, 0.6, 0);
        var cone = BABYLON.MeshBuilder.CreateCylinder("cone", {
          height: .2,
          diameterTop: 0,
          diameterBottom: .1,
          tessellation: 10
        }, scene);
        cone.layerMask = 0x20000000;

        cone.material = mat;
        cone.position = new BABYLON.Vector3(0, 0, l / 2);
        cone.rotation.x = Math.PI / 2;

        var cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", {
          height: l,
          diameterTop: .04,
          diameterBottom: .04,
          tessellation: 10
        }, scene);
        cylinder.layerMask = 0x20000000;
        cylinder.material = mat;
        cylinder.position = new BABYLON.Vector3(0, 0, 0);
        cylinder.rotation.x = Math.PI / 2;
        var arrow_parent = new BABYLON.Mesh("p", scene);
        arrow_parent.position = new BABYLON.Vector3(0, 0, 0);
        cone.setParent(arrow_parent);
        cylinder.setParent(arrow_parent);
        arrow_parent.setParent(earth_copy);
        return arrow_parent;
      }

      var m = this.$refs.m;
      var d = this.$refs.d;

      m.innerText = '3';
      d.innerText = '21';

      var day1 = 0;
      var month = parseInt(m.innerText)
      var r = 21;
      var day2 = 0;
      var day3 = 0;
      var renderTimes = 0;
      //启动
      engine.runRenderLoop(() => {
        var sceneChecked = null;
        if (scene) {
          if (scene.activeCamera) {
            renderTimes++;
            if (renderTimes % 4 != 0) return;
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

        //太阳直射点自动移动
        if (this.switch_checked1) {
          var time1 = this.transferCouponValueTime('2017/3/21', day1);
          if (day1 < 94) {
            earth_copy.rotation.x += 26 / 180 * Math.PI / 93;
            light1.direction.y -= 23.5 / 180 * Math.PI / 93;
            day1++;
            //              console.log(time1 + "=1=" + day1)
            month = time1[0];
            r = time1[1];
            //              console.log(month + "==" + r)
            m.innerText = month.toString();
            d.innerText = r.toString();
            this.value -= this.value_one;
          } else if (day1 >= 94 && day1 < 186) {
            earth_copy.rotation.x -= 26 / 180 * Math.PI / 92;
            light1.direction.y += 23.5 / 180 * Math.PI / 92;
            day1++;
            //              console.log(time1 + "=2=" + day1)
            month = time1[0];
            r = time1[1];
            m.innerText = month.toString();
            d.innerText = r.toString();
            this.value += this.value_one;
          } else if (day1 >= 186 && day1 < 277) {
            earth_copy.rotation.x -= 26 / 180 * Math.PI / 90;
            light1.direction.y += 23.5 / 180 * Math.PI / 90;
            day1++;
            //              console.log(time1 + "=3=" + day1)
            month = time1[0];
            r = time1[1];
            m.innerText = month.toString();
            d.innerText = r.toString();
            this.value += this.value_one;
          } else if (day1 >= 277 && day1 < 365) {
            earth_copy.rotation.x += 26 / 180 * Math.PI / 90;
            light1.direction.y -= 23.5 / 180 * Math.PI / 90;
            day1++;
            //              console.log(time1 + "=4=" + day1)
            month = time1[0];
            r = time1[1];
            m.innerText = month.toString();
            d.innerText = r.toString();
            this.value -= this.value_one;
          } else {
            day1 = 0;
            this.switch_checked1 = false;
          }
        }

        //夏半球
        if (this.on_btn1) {
          var time2 = this.transferCouponValueTime('2017/9/23', day2);

          if (this.value < 0) {
            day2 = -Math.abs(parseInt(this.value / this.value_one));
            //              console.log(time2 + "=1=" + day2)
            earth_copy.rotation.x = -26 / 180 * Math.PI / 93 * day2;
            light1.direction.y = 23.5 / 180 * Math.PI / 93 * day2;
          } else if (this.value > 0) {
            day2 = Math.abs(parseInt(this.value / this.value_one));
            //              console.log(time2 + "=1=" + day2)
            if (day2 > 90) {
              day2 = 90;
            }
            earth_copy.rotation.x = -26 / 180 * Math.PI / 90 * day2;
            light1.direction.y = 23.5 / 180 * Math.PI / 90 * day2;
          }
          month = time2[0];
          r = time2[1];
          m.innerText = month.toString();
          d.innerText = r.toString();

        }
        //          冬半球
        if (this.on_btn2) {
          var time3 = this.transferCouponValueTime('2017/3/21', day3);
          if (this.value < 0) {
            day3 = Math.abs(parseInt(this.value / this.value_one));
            //              console.log(time2 + "=1=" + day3)
            light1.direction.y = -23.5 / 180 * Math.PI / 93 * day3;
            earth_copy.rotation.x = 26 / 180 * Math.PI / 93 * day3;
          } else if (this.value > 0) {
            day3 = -Math.abs(parseInt(this.value / this.value_one));
            //              console.log(time2 + "=1=" + day3)
            if (day3 < -89) {
              day3 = -89;
            }
            light1.direction.y = -23.5 / 180 * Math.PI / 89 * day3;
            earth_copy.rotation.x = 26 / 180 * Math.PI / 89 * day3;
          }
          month = time3[0];
          r = time3[1];
          m.innerText = month.toString();
          d.innerText = r.toString();
        }

        //恢复
        if (this.reset_on) {
          this.Min = -23.44;
          this.Max = 23.44;
          this.value = 0;
          this.value_one = 0.25;
          day1 = 0;
          day2 = 0;
          day3 = 0;
          earth_copy.rotation = new BABYLON.Vector3(0, 0, 0);
          r = 21;
          month = 3;
          m.innerText = month.toString();
          d.innerText = r.toString();
          light1.direction = new BABYLON.Vector3(0, 0, 1);
          this.reset_on = false;
        }

      });

      engine.resize();
      //窗口更改大小
      window.addEventListener('resize', () => {
        engine.resize();
        this.setSideStyle();
      })

      //打开调试器
      //                this.scene.debugLayer.show();
    },



    transferCouponValueTime(startDate, valueTime) {
      var date = new Date(startDate);
      var newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + valueTime);
      var month = newDate.getMonth() + 1;
      month = month > 9 ? month : '0' + month;
      var day = newDate.getDate();
      day = day > 9 ? day : '0' + day;
      return [month, day];
    },

    //重置
    resetWidget() {
      this.switch_checked1 = false;
      this.on_btn1 = false;
      this.on_btn2 = false;
      this.blue1 = '';
      this.blue2 = '';
      this.noStart = true;
      this.reset_on = true;
    },


    btnClick(n) {
      this.reset_on = true;
      this.noStart = false;
      if (n == '1') {
        this.blue1 = 'blue';
        this.blue2 = '';
        this.on_btn1 = true;
        this.on_btn2 = false;
      } else if (n == '2') {
        this.blue1 = '';
        this.blue2 = 'blue';
        this.on_btn1 = false;
        this.on_btn2 = true;
      }
      this.switch_checked1 = false;
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

input,
button {
  outline: none;
  -webkit-appearance: none;
  border-radius: 0;
}

canvas {
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  outline: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: #FFFFFF;
  border: 0 solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 3px 3px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
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

html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  touch-action: none;
  -ms-touch-action: none;
  background-color: #fff;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.noselect {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Chrome/Safari/Opera */
  -khtml-user-select: none;
  /* Konqueror */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently not supported by any browser */
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
  color: #000;
  line-height: 1.0;
  padding: 24px;
  font-weight: normal;
}

.app_aside {
  float: left;
  width: 280px;
  background-color: #F7F7F7;
  height: 100%;
  box-shadow: -0.5px 0 0 rgba(0, 0, 0, 0.12);
}

.mainDiv {
  position: relative;
  height: calc(100% - 72px);
}

.mainDiv .left {
  height: 724px;
  width: 776px;
  padding: 30px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  zoom: 1;
  /*background: #FFFFFF;*/
  /*border: 0 solid rgba(0,0,0,0.12);*/
  /*box-shadow: 0 0 3px 3px rgba(0,0,0,0.15);*/
  /*border-radius: 6px;*/
}


.time {
  position: absolute;
  font-family: PingFangSC-Medium;
  right: 70px;
  top: calc( 50% - 60px);
  font-size: 16px;
  color: #4A4A4A;
}

.time h2 {
  font-size: 16px;
  color: #4A4A4A;
  line-height: 16px;
  text-align: center;
  margin-bottom: 20px;
}

.time span {
  background: #FFFFFF;
  border: 0 solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  display: inline-block;
  font-size: 20px;
  color: #000000;
  text-align: center;
  line-height: 44px;
  width: 48px;
  height: 44px;
  margin-right: 5px;
}


.insp-wrapper {
  width: 100%;
  height: 100%;
}

.aside_reset {
  margin: 20px 24px;
  float: right;
}

.btn_space {
  padding: 20px;
  width: 100%;
  height: calc(100% - 80px);
  clear: both;
  /*display: flex;*/
  /*align-items: center;*/
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
}

.btn1 {
  margin-bottom: 20px;
}

.btn2 {
  margin-bottom: 20px;
}

.btn_space .UI-slider {
  height: 120px;
  margin-bottom: 20px;
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

</style>
