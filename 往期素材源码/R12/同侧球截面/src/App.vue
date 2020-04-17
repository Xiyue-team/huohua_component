<template>
  <div id="app" class="noselect">

    <ui-head :title="title">
      <ui-btn type="reset1" @click.native="reset">


      </ui-btn>
    </ui-head>

    <div class="container" :style="'height:'+H+'px'">
      <div class="box" :style="'width:'+VW+'px;height:'+VH+'px'">
        <div class="ViewSpace" :style="'transform: scale('+zooms+')'">
          <div class="TextDesc" >
            <img :src="src"/>
          </div>
          <div class="canvas-context" v-show="isStart"></div>

          <div class="btn-control" style="border: 1px blue" v-if="isStart">
            <ui-slider value="value"
                       :boxWidth="500"
                       :boxHeight="60"
                       :zoom="zooms"
                       :title="false"
                       :piecewise="true"
                       :piecewiseLabel="false"
                       :tooltip="false"
                       :noBlueProcess="false"
                       :clickable="false"
                       :dragable="isDrag"
                       :data="[1,2,3,4]"
                       :speed="0"
                       v-model="value" class="slider">
            </ui-slider>
          </div>

          <div class="mask" v-show="!isStart" @click="begin">
            <div class="clickArea">
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
  import uiBtn from '@/components/UI/uiBtn'
  import uiHead from '@/components/UI/uiHead'
  import tools from '@/components/tools/tools'

  export default {
    name: 'App',
    components: {uiSlider, uiBtn, uiHead},
    data() {
      return {
        title: '同侧球截面',
        isStart: false,
        value: 1,
        timer1: null,
        src:'static/img/Tp1.png',
        H: window.innerHeight - 76,
        VW: window.innerWidth / (window.innerHeight - 76) ? 1024 * window.innerHeight / 550 : window.innerWidth,
        VH: window.innerWidth / (window.innerHeight - 76) ? window.innerHeight : 550 * window.innerHeight / 1024,
        zooms: window.innerWidth / (window.innerHeight - 76) ? (window.innerHeight - 76) / 550 : window.innerWidth / 1024,
        isDrag:true
      }
    },
    created() {

      this.scene = null;
      this.camera = null;
      this.renderer = null;
      //记录每一步所创建的几何体
      this.obj = {
        phase1: [],
        phase2: [],
        phase3: [],
        phase4: [],
      };
      //回退前进控制标志
      this.repeat = {
        item1: false,
        item2: false,
        item3: false,
        item4: false,
      };
      //所有动画控制的标志
      this.isOver = false;
      //第三步结束标志
      this.step3Over = false;
      this.W1 = window.innerWidth;
      this.H1 = window.innerWidth;
      this.getViewSize();
    },
    watch: {

      value(val) {
        if (val !== 3 && val !== 4) {
          this.camera.position.set(224, 63, 681);
          this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        }
        setTimeout(()=>{
            switch (val) {
                case 1:

                    if (this.isStart) {
                        this.src = "static/img/Tp2.png";
                    }
                    if (this.repeat.item1) {
                        for (let v in this.obj) {
                            if (v != 'phase1' && this.obj[v].length > 0) {
                                this.scene.remove(...this.obj[v]);
                                this.obj[v] = [];
                            }
                        }
                        this.repeat.item2 = false;
                        this.repeat.item3 = false;
                        this.repeat.item4 = false;
                    }
                    else {
                        this.firstStep();
                    }
                    break;
                case 2:
                    this.step3Over = false;
                    this.LoadImg("static/img/Tp3.png",()=>{
                        this.src = "static/img/Tp3.png";
                    });
                    if (this.repeat.item2) {
                        for (let v in this.obj) {
                            if (v != 'phase2' && v != 'phase1' && this.obj[v].length > 0) {
                                this.scene.remove(...this.obj[v]);
                                this.obj[v] = [];
                            }
                        }
                        this.repeat.item3 = false;
                        this.repeat.item4 = false;
                    }
                    else {
                        this.secondStep();
                    }
                    break;
                case 3:
                    this.LoadImg("static/img/Tp4.png",()=>{
                        this.src = "static/img/Tp4.png";
                    });
                    if (this.repeat.item3) {
                      tools.adjustCamera(this.camera, new THREE.Vector3(80, 32, 634), 16);
                        for (let v in this.obj) {
                            if (v == 'phase4' && this.obj[v].length > 0) {
                                this.scene.remove(...this.obj[v]);
                                this.obj[v] = [];
                            }

                            if (this.step3Over) {
                                var Parm = this.thirdStep.outPutParm();
                                var r1 = Parm.lineR1;
                                var r2 = Parm.lineR2;
                                var lineO1O2 = Parm.o1o2;
                                var O1AO2B = Parm.O1AO2B;

                                for (var j in O1AO2B) {
                                    if (O1AO2B[j].name == 'shixian') {
                                        O1AO2B[j].material.color.set(0xf30000);
                                    }
                                }
                                for (var i = 0; i < lineO1O2.length; i++) {
                                    lineO1O2[i].material.color.set(0x9013FE);
                                }
                                r1.material.color.set(0x0DB2FF);
                                r2.material.color.set(0x0DB2FF);
                            }
                        }
                        this.repeat.item4 = false;

                    }
                    else {

                        this.thirdStep();
                    }
                    break;
                case 4:
                    this.LoadImg("static/img/Tp5.png",()=>{
                        this.src = "static/img/Tp5.png";
                    });
                    var that = this;
                    that.lastStep();
                    break;
            }
        },150);

      }

    },
    methods: {
      init: function () {
        var controls = null;
        const W = $('.canvas-context').width();
        const H = $('.canvas-context').height();

        this.renderer = new THREE.WebGLRenderer({
          antialias: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio*this.zooms);
        this.renderer.setSize(W, H);
        this.renderer.setClearColor(0xffffff);
        $('.canvas-context').append(this.renderer.domElement);
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-W / 1.5, W / 1.5, H / 1.5, H / -1.5, 10, 10000);
        this.camera.position.set(132, 170, 689);
        this.camera.zoom=0.7;
        this.camera.updateProjectionMatrix();
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.7);
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 0, 0);
        //加灯光
        this.scene.add(hemiLight);
        //灯光
        var dirLight1 = new THREE.DirectionalLight(0xf0f0f0, 0.5);
        dirLight1.position.set(200, 200, 100);
        var dirLight2 = new THREE.DirectionalLight(0xf0f0f0, 0.5);
        dirLight2.position.set(-200, -200, -100);
        this.scene.add(dirLight1, dirLight2);

        var initControls = () => {
          controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
          // 如果使用animate方法时，将此函数删除
          //controls.addEventListener( 'change', render );
          // 使动画循环使用时阻尼或自转 意思是否有惯性
          controls.enableDamping = true;
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
          controls.enablePan = false;
          controls.maxZoom=1.0;
          controls.minZoom=0.4;

        };
        initControls();
        var render = () => {
          this.renderer.render(this.scene, this.camera);
          requestAnimationFrame(render)
        };
        render();
      },

//第一步
      firstStep() {
        this.repeat.item1 = true;
        var ball = tools.createSphere(250, 36, 36, 0x8EC4F0, 0.4);
        // 画图上O点
        var pointO = tools.drawPoint(6, 0xf30000, [0, 0, 0]);
        //加文字
        var text = tools.createText('O', -20, 20, 0, '#000', 30);
        this.scene.add(pointO);
        this.obj.phase1.push(pointO);
        this.scene.add(ball);
        this.obj.phase1.push(ball);
        this.obj.phase1.push(text);
        this.scene.add(text);
      },
      //第二步
      secondStep() {
        if (!this.repeat.item1) {
          this.firstStep()
        }

        this.isDrag=false;
        this.step3Over = false;
        this.repeat.item2 = true;
        var W = $('.canvas-context')[0].clientWidth;
        var r1 = Math.sqrt(Math.pow(250, 2) - Math.pow(120, 2));
        var r2 = Math.sqrt(Math.pow(250, 2) - Math.pow(180, 2));
        var plane1 = tools.drawPlane(500, 500, 0xf30000, 0.3 , [-W / 4, 120, 0]);
        var plane2 = tools.drawPlane(500, 500, 0xf30000, 0.3, [-W / 4, 180, 0]);
        var circleSection1 = tools.drawCirclePlane(r1, 0xFF6A79, [0, 120, 0]);
        var circleSection2 = tools.drawCirclePlane(r2, 0xFF6A79, [0, 180, 0]);


        plane1.rotateX(90 / 180 * Math.PI);
        plane2.rotateX(90 / 180 * Math.PI);

        this.obj.phase2.push(circleSection1);
        this.obj.phase2.push(circleSection2);
        circleSection1.material.opacity = 0;
        circleSection2.material.opacity = 0;
        circleSection1.position.set(0, 120, 0);
        circleSection2.position.set(0, 180, 0);


        this.scene.add(circleSection1, circleSection2, plane1, plane2);
        var step = 0;
        var that = this;
        var promise = new Promise(function (resolve, reject) {
          function run() {
            step += 5;
            if ((-W / 4 + step) <= 0) {
              plane1.position.set(-W / 4 + step, 120, 0);
              plane2.position.set(-W / 4 + step, 180, 0);
            }
            that.timer1 = setTimeout(run, 16);
            if (that.isOver) {
              clearTimeout(that.timer1);
              that.scene.remove(plane1);
              that.scene.remove(plane2);
              return
            }
            if ((-W / 4 + step) > 0) {
              setTimeout(function () {
                that.scene.remove(plane1);
                that.scene.remove(plane2);
                circleSection1.material.opacity = 0.3;
                circleSection2.material.opacity = 0.3;
                circleSection1.rotateX(92 / 180 * Math.PI);
                circleSection2.rotateX(92 / 180 * Math.PI);
                resolve();
                that.isDrag=true;
              }, 800);
              clearTimeout(that.timer1);

            }
          }

          run();
        });
        this.secondStep.callBackPro = function () {
          return promise
        }
      },

//第三步
      thirdStep() {

        if (!this.repeat.item2) {
          this.secondStep();
        }
        this.repeat.item3 = true;
        this.isDrag=false;
        var that = this;
        //保存O1O2虚线的数组
        var o1o2 = [];

        //动态画实线函数
        let drawSolidLineAnimate = function (point1, point2, time, color, opacity) {
          var x1 = point1.x;
          var y1 = point1.y;
          var x2 = point2.x;
          var y2 = point2.y;
          var z=point1.z;
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

          var line = tools.drawLine([x1,y1,0],[(x1 + Math.cos(a) * 10),(y1 + Math.sin(a) * 10),0],color,opacity,3,false);

          line.name = 'shixian';
          that.obj.phase3.push(line);
          that.scene.add(line);

          var timer = null;
          var s = 1;
          var pro = new Promise(function (resolve, reject) {
            run();

            function run() {
              s += 0.3;
              var l = s * 10;
              line.scale.set(s, s, 1);
              timer = setTimeout(run, time);
              line.position.set(-s * x1 + x1, -s * y1 + y1, 0);
              if (that.isOver || that.value !== 3) {
                if (that.value !== 4) {
                  that.scene.remove(line);
                  clearTimeout(timer);
                }
              }
              if (l >= L) {
                clearTimeout(timer);
                resolve();
              }
            }
          });
          return pro
        };
        //动态画虚线函数
        let drawDashAnimate = (point1, point2, time, color, opacity, isSave) => {
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
          else if (t1 == 0 && t2 < 0) {
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

          var line = tools.drawLine([x1,y1,z],[(x1 + Math.cos(a) * 2),(y1 + Math.sin(a) * 2),z],color,opacity,5,false);
          line.name = 'xuxian';
          that.scene.add(line);
          if (isSave) {
            o1o2.push(line)
          }
          that.obj.phase3.push(line);
          var tm = null;
          var s = 0;
          var pro = new Promise(function (resolve, reject) {
            run();

            function run() {
              var g = line.clone();
              g.translateX((s * Math.cos(a)));
              g.translateY((s * Math.sin(a)));
              s += 15;
              that.obj.phase3.push(g);
              if (isSave) {
                o1o2.push(g)
              }
              that.scene.add(g);
              tm = setTimeout(run, time);
              if (that.isOver || that.value !== 3) {
                if (that.value !== 4) {
                  clearTimeout(tm);
                  that.scene.remove(...that.obj.phase3)
                }
              }
              if (s >= L) {
                clearTimeout(tm);
                resolve()
              }
            }
          });
          return pro
        };
        //画圆心和半径
        var pointO1 = tools.drawPoint(6, 0xf30000, [0, 120, 0]);
        var pointO2 = tools.drawPoint(6, 0xf30000, [0, 180, 0]);
        var textO1 = tools.createText('O₁', -30, 140, 0, '#000', 30);
        var textO2 = tools.createText('O₂', -30, 210, 0, '#000', 30);
        this.obj.phase3.push(textO1, textO2, pointO1, pointO2);
        //画两个半径
        var r1 = Math.sqrt(Math.pow(250, 2) - Math.pow(120, 2));
        var r2 = Math.sqrt(Math.pow(250, 2) - Math.pow(182, 2));
        //OA,OB

        var lineR1 = tools.drawLine([0, 0, 0], [r1, 120, 0], 0x0DB2FF, 0,2 ,false);
        var lineR2 = tools.drawLine([0, 0, 0], [r2, 180, 0], 0x0DB2FF, 0,2, false);
        this.obj.phase3.push(lineR1, lineR2);
        this.scene.add(lineR1, lineR2);
        //A,B两点
        var pointA = tools.drawPoint(6, 0xf30000, [r1, 120, 0]);
        var pointB = tools.drawPoint(6, 0xf30000, [r2, 180, 0]);
        var textA = tools.createText('A', r1 + 25, 120, 0, '#000', 30);
        var textB = tools.createText('B', r2 + 25, 220, 0, '#000', 30);
        this.obj.phase3.push(textA, textB, pointA, pointB);
        //逻辑是先加O1O2于视图,在画虚线，再画同时直线O1A,O2B并标注AB文字，最后连接OA,OB
        //第二步执行完毕

        this.secondStep.callBackPro().then(function () {
          if (!that.isOver) {
            that.scene.add(pointO1, pointO2, textO1, textO2);

            tools.adjustCamera(that.camera, new THREE.Vector3(80, 32, 634), 16).then(function () {

              //虚线部分
              drawDashAnimate(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 120, 0), 80, 0x9013FE, 1).then(function () {
                //O1O2这条线
                drawDashAnimate(new THREE.Vector3(0, 120, 0), new THREE.Vector3(0, 180, 0), 120, 0x9013FE, 1, true).then(function () {

                    //O1A,O2B直线
                    drawSolidLineAnimate(new THREE.Vector3(0, 120, 0), new THREE.Vector3(r1, 120, 0), 16, 0xff0000, 0.9).then(function () {
                      if (!that.isOver) {
                        that.scene.add(pointA, textA);
                      }
                      setTimeout(function () {
                        if (!that.isOver) {
                          that.scene.add(lineR1, lineR2);
                          tools.createIncreTimer(lineR1, 0.05, 1, 30).then(function () {
                            tools.createIncreTimer(lineR2, 0.05, 1, 30).then(function () {
                              that.step3Over = true;
                              that.isDrag=true;
                              if (that.value == 4) {
                                that.lastStep();
                              }
                            });
                          });
                        }
                      }, 300)
                    });

                  drawSolidLineAnimate(new THREE.Vector3(0, 180, 0), new THREE.Vector3(r2, 180, 0), 16, 0xff0000, 0.8).then(function () {
                    if (!that.isOver) {
                      that.scene.add(pointB, textB);
                    }
                  });

                }, 300)
              });

            });
          }
        });

        //输出所创建的几何体，以便第四步及其他场合使用
        this.thirdStep.outPutParm = function () {
          return {
            lineR1: lineR1,
            lineR2: lineR2,
            o1o2: o1o2,
            O1AO2B: that.obj.phase3
          }
        }
      },
      //第四步
      lastStep() {

        var that = this;
        if (!this.repeat.item3) {
          this.thirdStep();
        }
        this.isDrag=false;
        var textX = tools.createText('x', -20, 84, 0, '#1500FF', 30);
        var textR1 = tools.createText('R', 88, 90, 0, '#1500FF', 30);
        var textR2 = tools.createText('R', 140, 70, 0, '#1500FF', 30);
        var textnumber9 = tools.createText('9', -20, 180, 0, '#1500FF', 30);
        this.obj.phase4.push(textX, textR1, textR2, textnumber9);
        var Parm = this.thirdStep.outPutParm();
        var r1 = Parm.lineR1;
        var r2 = Parm.lineR2;
        var lineO1O2 = Parm.o1o2;
        var O1AO2B = Parm.O1AO2B;


        tools.adjustCamera(this.camera, new THREE.Vector3(80, 32, 634), 16).then(function () {
          if (that.step3Over) {
            for (var i in lineO1O2) {
              lineO1O2[i].material.color.set(0x00ff00)
            }
            for (var j in O1AO2B) {
              if (O1AO2B[j].name == 'shixian') {
                O1AO2B[j].material.color.set(0x0DB2FF);
              }
            }

            r1.material.color.set(0x9013FE);
            r2.material.color.set(0x9013FE);
            var timer = setTimeout(function () {
              if (!that.isOver && that.value === 4) {
                that.scene.add(textX, textR1, textR2, textnumber9);
                that.isDrag=true
              }
            }, 800);
            timer = null;
          }

        });

        this.repeat.item4 = true;
      },
      reset: function () {
       this.LoadImg('static/img/Tp1.png',()=>{
         this.src = 'static/img/Tp1.png';
       });
        this.isStart = false;
        this.value = 1;
        //相机归位
        this.camera.position.set(132, 170, 689);
        this.camera.zoom=0.7;
        this.camera.updateProjectionMatrix();
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.isOver = true;
        this.isDrag=true;
      },

      begin() {
        this.src = "static/img/Tp2.png";
        this.isStart = true;
        this.isOver = false;
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

      },
      //图片预加载
     LoadImg(src, callback) {
       var img = new Image();
       img.src = src;
       img.onload = function () {
         callback && callback(img.src);
       }
     }
    },
    mounted() {
       this.init();
        var that = this;
      window.addEventListener('resize', function () {
        that.getViewSize();
      });
    this.firstStep();
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
    margin: 0;
    padding: 0;
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

  div.Ui-head {
    background-color: #fff;
    --webkit-box-shadow: none;
    box-shadow: none;
    position: relative;
  }

  .Ui-head h3 {
    position: absolute;
    left: 30px;
    top:0;
  }

  .container {
    width: 100%;
    position: relative;
  }

  .box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;

  }

  .ViewSpace {
    width: 1024px;
    height: 550px;
    transform-origin: top left;
    padding: 35px 0;
    position: absolute;

  }

  .TextDesc {
    width: 360px;
    border: 1.2px solid #ddd;
    border-radius: 5px;
    height: 400px;
    position: absolute;
    left: 0;

    margin-left: 15px;
  }

  .TextDesc img {
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
    font-size: 24px;
    line-height: 400px;
    cursor: pointer;
  }

  .canvas-context {

    width: 580px;
    height: 400px;
    position: absolute;
    right: 0;
    top: 35px;
  }

  .btn-control {
    display: inline-block;
    position: absolute;
    right: 30px;
    bottom: 30px;
  }

  canvas {
    width: 100%;
    height: 100%;
  }
</style>
