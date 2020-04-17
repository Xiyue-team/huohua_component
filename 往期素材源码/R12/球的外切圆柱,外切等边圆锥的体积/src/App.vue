<template>
  <div id="app" class="noselect">
    <ui-head :title="title">
      <ui-btn type="reset1" @click.native="reset"></ui-btn>
    </ui-head>

    <div class="container" :style="'height:'+H+'px'">

      <div class="box" :style="'width:'+VW+'px;height:'+VH+'px'">
        <div class="ViewSpace"
             :style="'transform: scale('+zooms+')'">
          <div class="TextDesc" @click="todoit" >
            <img :src="src"/>
          </div>
          <div class="canvas-context" v-show="isStart"></div>
          <div class="btn-control" v-if="isStart">
            <ui-slider value="value"
                       :boxWidth="500"
                       :boxHeight="50"
                       :zoom="zooms"
                       :title="false"
                       :piecewise="true"
                       :piecewiseLabel="false"
                       :tooltip="false"
                       :noBlueProcess="false"
                       :clickable="false"
                       :dragable="isDrag"
                       :speed="0.1"
                       :data="[1,2,3,4]" v-model="value"
                       @callback="ChangeVal"
                       class="slider">
            </ui-slider>
          </div>
          <div class="mask" v-show="!isStart" @click="begin">
            <div class="clickArea" style="cursor: pointer;">
              点击开始
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
  import uiSlider from '@/components/UI/uiSlider'
  import uiHead from '@/components/UI/uiHead'
  import uiBtn from '@/components/UI/uiBtn'
  import tools from '@/components/tools/tools'
  export default {
    name: 'App',
    components: {uiSlider, uiBtn, uiHead},
    data() {
      return {
        title: '球的外切圆柱、外切等边圆锥的体积',
        isStart: false,
        value: 0,
        src: 'static/img/Tp1.png',
        H: window.innerHeight - 76,
        VW: 0,
        VH:0,
        zooms: 0,
        isDrag: true,
      }
    },
    created() {
      this.getViewSize();
      this.Fn = null;
      this.controls = null;
      //标志要重置停止所有动画
      this.isOver = false;
      this.Flags={
        fg1:false,
        fg2:false,
        fg3:false,
        fg4:false
      };
      this.renderer=null;
    },
    mounted() {
      this.Fn = this.init();
      var that = this;
      this.Fn.renderer.setPixelRatio(window.devicePixelRatio * this.zooms);
      this.Fn.firstStep();
      window.addEventListener('resize', function () {
        that.getViewSize();
      })
    },
    watch: {},
    methods: {
      init: function () {
        const W = $('.canvas-context').width();
        const H = $('.canvas-context').height();
        var renderer, camera, scene;
        var obj={
          obj1:[],
          obj2:[],
          obj3:[],
          obj4:[],
        };



        renderer = new THREE.WebGLRenderer({
          antialias: true
        });
        renderer.setPixelRatio(window.devicePixelRatio * this.zooms);
        renderer.setSize(W, H);
        renderer.setClearColor(0xffffff);
        $('.canvas-context').append(renderer.domElement);

        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(-W / 0.75, W / 0.75, H / 0.75, H / -0.75, 10, 10000);
       camera.position.set(-616, -203, 1126);

        camera.zoom = 0.8;
        camera.updateProjectionMatrix();
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.7);
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 0, 0);
        //加灯光
        scene.add(hemiLight);
        //灯光
        var dirLight1 = new THREE.DirectionalLight(0xf0f0f0, 0.5);
        dirLight1.position.set(200, 200, 100);
        var dirLight2 = new THREE.DirectionalLight(0xf0f0f0, 0.5);
        dirLight2.position.set(-200, -200, -100);
        scene.add(dirLight1, dirLight2);
        renderer.setPixelRatio(window.devicePixelRatio*this.zooms);
        //创建所需的物体
        //第一步物体
        //虚线内截面和球
        var plane = tools.SolidCircle(248, 100, 0xFFF, 0.5, [0, 0, 0]);
        var ball = tools.createSphere(250, 100, 100, 0x8EC4F0, 0.4);
        // 画图上O点
        var pointO = tools.drawPoint(8, 0xf30000, [0, 0, 0]);
        //加文字
        var textO = tools.createText('O', -35, 50, 0, '#000', 40);
        ball.position.set(0, 0, 0);
        plane.rotateX(90 / 180 * Math.PI);

        //第二步物体

        //圆柱体
        var Cylinder = tools.drawCylinder(12.5, 12.5, 25, 30, 30, [0, 0, 0], 0x4198EC, 0.3);

        //第三步物体

        //画圆锥
        var r = Math.floor(Math.sqrt(3) * 250);

        var Cylinder1 = tools.drawCylinder(0, 17.3, 29.8 , 36, 36, [0, 123, 0], 0xFF6A79, 0.2);

        //第四步物体

        //文字SAB
        var textS = tools.createText('S', -30, 540, 0, '#000', 50);
        var textA = tools.createText('A', -Math.sqrt(3) * 250 - 10, -258, 0, '#000', 50);
        var textB = tools.createText('B', Math.sqrt(3) * 250 + 10, -258, 0, '#000', 50);
        //文字C C1 D D1
        var textC = tools.createText('C', -260, -260, 0, '#000', 50);
        var textC1 = tools.createText('C₁', -290, 300, 0, '#000', 50);
        var textD = tools.createText('D', 255, -258, 0, '#000', 50);
        var textD1 = tools.createText('D₁', 290, 300, 0, '#000', 50);
        //文字o1
        var textO1 = tools.createText('O₁', 0, -258, 0, '#000', 50);
        var textR = tools.createText('R', -30, -120, 0, '#1500FF', 50);
        var text30 = tools.createText('30°', 270, -175, 0, '#1500FF', 50);



        //画表示角度的弧线
        var gemo2 = new THREE.Geometry();
        var arr = [];
        var R = -100;
        var material = new THREE.LineBasicMaterial({
          color: 0x1500FF,
          depthTest: false,
          opacity: 0.8,
          transparent: true,
        });

        for (var i = 0; i <= 27; i++) {
          var x = Math.cos(i / 180 * Math.PI) * R;
          var y = Math.sin(i / 180 * Math.PI) * R;
          arr.push(new THREE.Vector3(x, y, 0));
        }
        gemo2.vertices = arr;

        var descCircle = new THREE.Line(gemo2, material);
        descCircle.position.set(435, -255, 0);
        descCircle.rotateZ(-30 / 180 * Math.PI);

        var initControls = () => {
          var controls = new THREE.OrbitControls(camera, renderer.domElement);
          // 如果使用animate方法时，将此函数删除
          //controls.addEventListener( 'change', render );
          // 使动画循环使用时阻尼或自转 意思是否有惯性
          controls.enableDamping =true;
          //动态阻尼系数 就是鼠标拖拽旋转灵敏度
          controls.dampingFactor = 0.25;
          //是否可以缩放
          controls.enableZoom = true;
          //是否自动旋转
          controls.autoRotate = false;
          //设置相机距离原点的最远距离
          controls.minDistance = 50;
          //设置相机距离原点的最远距离
          controls.maxDistance = 10000;
          //是否开启右键拖拽
          controls.enablePan =false;
          // controls.maxZoom = 1.0;
          // controls.minZoom = 0.6;


          return controls;
        };
        var Controls=initControls();

        var that = this;

        //缩放动画
        let ScaleAnimate = (obj, step, t, endScale) => {
          var timer = 0;
          var s =1;

          var promise = new Promise(function (resolve, reject) {
            function run() {
                s += step;
               obj.scale.set(s,s,s);
              timer = requestAnimationFrame(run);
              if (that.isOver) {
                window.cancelAnimationFrame(timer);
              }
              if (s >= endScale) {
                window.cancelAnimationFrame(timer);
                resolve();
              }
            }

            run();
          });

          return promise
        };

        //第一步
        var firstStep = () => {
          this.Flags.fg1 = true;
          obj.obj1.push(plane, ball, textO, pointO);
          scene.add(plane, ball, textO, pointO);
        };

        //第二步
        var secondStep = () => {
          this.Flags.fg2 = true;
          obj.obj2.push(Cylinder);
          scene.add(Cylinder);
        this.isDrag = false;

        //圆柱渐变增大
        ScaleAnimate(Cylinder, 0.5, 16, 20).then(function () {
          var tm=setTimeout(function () {
            that.isDrag = true;
          }, 100);
          tm=null;
        });
      };
  //第三步
  var thirdStep = () => {
    this.Flags.fg3 = true;
    obj.obj3.push(Cylinder1);
    scene.add(Cylinder1);
    this.isDrag = false;
      ScaleAnimate(Cylinder1, 0.5, 16, 25).then(function () {
        var tm1=setTimeout(function () {
            that.isDrag = true;
        }, 100);
        tm1=null;
      });
  };


  //第四步
  var lastStep = () => {
    this.isDrag = false;
    obj.obj4.push(textS, textA, textB, textD, textD1, textC, textC1, textO1, textR, text30, descCircle);
    //动态虚线，函数封装

    var t = 0;
    let drawDashAnimate = (point1, point2, time, color, opacity) => {
      var x1 = point1.x;
      var x2 = point2.x;
      var y1 = point1.y;
      var y2 = point2.y;
      var z = point1.z;
      var t1 = x2 - x1;
      var t2 = y2 - y1;
      var L = Math.sqrt(Math.pow(t2, 2) + Math.pow(t1, 2));
      var a = 0;
      if (t1 == 0 && t2 > 0) {
        a = 90 / 180 * Math.PI;
      }
      else if (t == 0 && t2 < 0) {
        a = -90 / 180 * Math.PI
      }
      else if (t2 == 0 && t1 > 0) {
        a = 0 / 180 * Math.PI;
      }
      else if (t2 == 0 && t1 < 0) {
        a = 180 / 180 * Math.PI;
      }
      else {
        a = Math.atan(t2 / t1);
      }


      var line = tools.drawLine([x1, y1, z], [(x1 + Math.cos(a) * 2), (y1 + Math.sin(a) * 2), z], color, opacity, 4, false);

      var tm = null;
      var s = 5;
      var pro = new Promise(function (resolve, reject) {


        function run() {
          var g = line.clone();
          g.translateX((s * Math.cos(a)));
          g.translateY((s * Math.sin(a)));
          s += 20;
          obj.obj4.push(g);
          scene.add(g);
          tm = setTimeout(run, time);
          if (that.isOver|| (that.value == 3)) {
            clearTimeout(tm);
            scene.remove(...obj.obj4)
          }
          if (s >= L) {
            clearTimeout(tm);
            resolve()
          }
        }
        run();
      });
      return pro
    };

    camera.lookAt(0, 0, 0);

    //线OB
    let drawSolidLineAnimate = function (point1, point2, time, color, opacity) {

      var x1 = point1.x;
      var y1 = point1.y;
      var x2 = point2.x;
      var y2 = point2.y;
      var z = point1.z;
      var Px = x2 - x1;
      var Py = y2 - y1;
      var L = Math.sqrt(Math.pow(Px, 2) + Math.pow(Py, 2));
      var a = 0;
      if (Px == 0 && Py > 0) {
        a = 90 / 180 * Math.PI;
      }
      else if (Px == 0 && Py < 0) {
        a = -90 / 180 * Math.PI
      }
      else if (Py == 0 && Px > 0) {
        a = 0 / 180 * Math.PI;
      }
      else if (Py == 0 && Px < 0) {
        a = 180 / 180 * Math.PI;
      }
      else {
        a = Math.atan(Py / Px);
      }

      var line = tools.drawLine([x1, y1, z], [(x1 + Math.cos(a) * 10), (y1 + Math.sin(a) * 10), z], color, opacity, 3, false);
      line.name = 'shixian';
      obj.obj4.push(line);
      scene.add(line);
      var timer = null;
      var s = 1;
      var pro = new Promise(function (resolve, reject) {
        run();
        function run() {
          s += 0.5;
          var l = s * 10;
          line.scale.set(s, s, 1);
          timer = setTimeout(run, time);
          line.position.set(-s * x1 + x1, -s * y1 + y1, 0);
          if (that.isOver || that.value !== 4) {
            scene.remove(line);
            clearTimeout(timer);

          }
          if (l >= L) {
            clearTimeout(timer);

            resolve();
          }
        }
      });
      return pro
    };
    Controls.enableRotate=false;
    tools.adjustCamera(camera, new THREE.Vector3(0, 1, 1000), 40).then(function () {

      Controls.enableRotate=true;
      if (that.value === 4 && !that.isOver) {
        scene.add(textS, textA, textB, textD, textD1, textC, textC1);
      }
      new Promise(function (resolve, reject) {
        setTimeout(function () {
          if (!that.isOver && (that.value === 4)) {
            resolve()
          }
        }, 500)
      })
        .then(function () {
          var isover = drawDashAnimate(new THREE.Vector3(0, 496, 0), new THREE.Vector3(0, -249, 0), 20, 0x9900FF, 1);
          isover.then(function () {
            scene.add(textO1);
            //O1B
            drawSolidLineAnimate(new THREE.Vector3(-1, -249, 0), new THREE.Vector3(Math.sqrt(3) * 247, -249, 0), 16, 0x0DB2FF, 1);
            drawSolidLineAnimate(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(Math.sqrt(3) * 248, -248, 0), 16, 0x0DB2FF, 1).then(function () {
              setTimeout(function () {
                //0B，R,30度字逐渐显示
                if (that.value === 4 && !that.isOver) {
                  scene.add(textR, text30, descCircle);
                  that.isDrag = true;
                }
              }, 200);
            })
          })
        })
    });

  };
  var reset=()=> {
          this.isDrag=true;
          this.src = 'static/img/Tp1.png';
          this.isStart = false;
          camera.position.set(-616, -203, 1126);
          camera.zoom=0.8;
          camera.updateProjectionMatrix();
          camera.lookAt(new THREE.Vector3(0, 0, 0));
          this.value = 1;
          this.isOver = true;
          for(var v in obj){
            if(v!='obj1'&&obj[v].length>0){
              scene.remove(...obj[v])
            }
          }
          this.Flags.fg2=false;
          this.Flags.fg3=false;
          this.Flags.fg4=false;
        };
    var render = () => {
      renderer.render(scene, camera);

      requestAnimationFrame(render)
    };
    render();

    return {
      camera: camera,
      scene: scene,
      renderer: renderer,
      firstStep: firstStep,
      secondStep: secondStep,
      thirdStep: thirdStep,
      lastStep: lastStep,
      obj:obj,
      reset:reset
    }


  },

      ChangeVal(val) {


        setTimeout(() => {
          if (val !== 4) {
            this.Fn.camera.position.set(-616, -203, 1126);
            this.Fn.camera.lookAt(new THREE.Vector3(0, 0, 0));
          }
          switch (val) {

            case 1:
              if (this.isStart) {
                this.src = 'static/img/Tp2.png';
              }

              if(this.Flags.fg1){
                if(this.Fn.obj.obj2.length>0){
                  this.Fn.scene.remove(...this.Fn.obj.obj2);
                  this.Fn.obj.obj2=[];
                }
                this.Flags.fg2=false;
                this.Flags.fg3=false;
                this.Flags.fg4=false;
                }

                else {
                this.Fn.firstStep();


              }
                break;
            case 2:

              this.src = 'static/img/Tp3.png';

              if(this.Flags.fg2){

                if(this.Fn.obj.obj3.length>0){
                  this.Fn.scene.remove(...this.Fn.obj.obj3);
                  this.Fn.obj.obj3=[];
                }
                this.Flags.fg3=false;
                this.Flags.fg4=false;

              }
              else {
                this.Fn.secondStep();

              }
              break;
            case 3:
              this.src = 'static/img/Tp4.png';
              if(this.Flags.fg3){
                if(this.Fn.obj.obj4.length>0) {
                  this.Fn.scene.remove(...this.Fn.obj.obj4);
                  this.Fn.obj.obj4=[];
                }
                this.Flags.fg4=false;
              }
              else {

                this.Fn.thirdStep();

              }
              break;
            case 4:
              this.src = 'static/img/Tp5.png';
              this.Fn.lastStep();
              break;
          }
        }, 100)


      },

      begin() {
        this.Fn.renderer.setPixelRatio(window.devicePixelRatio * this.zooms);
        this.isStart = true;
        this.isOver = false;
        this.src = 'static/img/Tp2.png';
        this.value = 1;

      },

      todoit(){
        console.log(this.Fn.camera.position)
      },

reset(){

        this.Fn.reset();
},

      getViewSize() {
        var W = window.innerWidth;
        var H = window.innerHeight - 76;
        this.H = H;
        if (W / H > 1024 / 550) {
          this.zooms = (H / 550).toFixed(2);
          this.VW = 1024 * H / 550;
          this.VH = H;
        } else {
          this.zooms = (W / 1024).toFixed(2);
          this.VW = W;
          this.VH = 550 * W / 1024;
        }

      }
    }

  }
</script>

<style>
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
    font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans- serif;
    background-color: #fff;
    touch-action: none;
    -ms-touch-action: none;
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
    user-select: none;
  }

  div.Ui-head {
    background-color: #fff;
    --webkit-box-shadow: none;
    box-shadow: none;
    line-height: 76px;
    position: relative;
  }

  .Ui-head h3 {
    position: absolute;
    left: 20px;
    top: 0;
    padding: 0;
  }

  .container {
    width: 100%;
    position: relative;
  }

  .box {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;

  }

  .ViewSpace {
    width: 1024px;
    height: 550px;
    transform-origin: top left;
    position: absolute;
    left: 0;
    padding: 35px 0;
    overflow: hidden;
  }

  .TextDesc {
    width: 360px;
    border: 1.2px solid #ddd;
    border-radius: 5px;
    height: 400px;
    position: absolute;
    margin-left: 15px;
  }

  .TextDesc img {
    margin-top: 35px;
    width: 100%;

  }

  .mask {
    position: absolute;
    right: 20px;

    width: 580px;
    border: 1.2px solid #ddd;
    border-radius: 5px;
    height: 400px;
    z-index: 999;
    background-color: #fff;
    text-align: center;
    font-size: 20px;
    line-height: 400px;

  }

  .canvas-context {
    width: 580px;
    height: 400px;
    position: absolute;
    right: 0;
  }

  .btn-control {
    display: inline-block;
    position: absolute;
    right: 30px;
    bottom: 30px;
  }

  .canvas-context canvas {
    width: 100%;
    height: 100%;

  }
</style>
