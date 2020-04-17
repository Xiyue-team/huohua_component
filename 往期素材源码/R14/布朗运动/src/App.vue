<template>
  <div id="app" class="noselect">
    <ui-head :title="title">
      <ui-btn type="reset1" @click.native="reset">
      </ui-btn>
    </ui-head>
    <div class="Tip" v-if="needTip">建议您在电脑或平板上打开，以获取最佳的演示效果</div>
    <div class="container">
      <div id="animateImg" v-show="play">
        <!--<video :src="videoSrc" preload="auto" x5-video-player-type="h5" x5-video-player-fullscreen="true"-->
        <!--playsinline="true" webkit-playsinline="true" x-webkit-airplay="true"  class="VD" v-if="!isMob" ref="VDS" type="video/mp4">-->
        <!--您的浏览器不支持HTML5 视频-->
        <!--</video>-->
        <video ref="VDS" preload="true" x5-video-player-type="h5" x5-video-player-fullscreen="true" playsinline="true"
               webkit-playsinline="true" x-webkit-airplay="true" v-if="!isSmall">
          <source src="static/img/brown1.mp4" type="video/mp4"></source>
          您的浏览器不支持HTML5 视频
        </video>
        <img src="static/img/start.png" class="cvs" v-show="!isSmall"/>
        <img :src="src" v-show="isSmall">
      </div>


      <div class="Mark" v-show="playBtn">
        <ui-btn type="play" v-model="played" @click.native="playVideoByBtn"></ui-btn>
      </div>
      <div class="View_area"></div>
      <div class="App_slider">
        <div class="mark1" :style="'transform: scale('+zoom+')'">
          <img src="static/img/Mark.png"/>
        </div>
        <div class="Area">


          <div class="box">

            <div class="item1">
              <img src="static/img/Template.png"/>
            </div>

            <div class="item2">
              <img src="static/img/TemplateCore.png"/>
            </div>
            <div class="cover">
              <div :style="{'height':SH+'px'}"></div>
            </div>
          </div>
          <!--竖滑条-->
          <div class="sliders">
            <ui-slider direction="vertical"
                       :boxWidth="50"
                       :boxHeight="240"
                       :title="false"
                       :noBlueProcess="true"
                       :realTime="true"
                       :processWidth="6"
                       :min="0"
                       :max="15"
                       :speed="0"
                       :value="values"
                       :clickable="false"
                       v-model="values">
            </ui-slider>
          </div>
          <div class="sliders1">
            <ui-slider direction="vertical"
                       :boxWidth="50"
                       :boxHeight="240"
                       :title="false"
                       :noBlueProcess="true"
                       :realTime="true"
                       :processWidth="6"
                       :min="0"
                       :max="15"
                       :speed="0"
                       :value="values"
                       :clickable="true"
                       v-model="values">

            </ui-slider>
          </div>

        </div>
      </div>
    </div>
    <div class="hen" v-show="isHp">
      <div><img src="static/img/xuanzhuan.png" alt=""><span>请将屏幕自动旋转功能打开并横屏使用</span></div>
    </div>
    <!--<div class="loading" v-show="isloaded"><span>loading......</span></div>-->
  </div>
</template>
<script type="text/javascript">
  import uiBtn from '@/components/UI/uiBtn'; //按钮
  import tools from '@/common/tools';
  import uiHead from '@/components/UI/uiHead';
  import uiSlider from '@/components/UI/uiSlider';

  export default {
    name: 'app',
    components: {
      uiBtn,
      uiHead,
      uiSlider
    },
    data() {
      return {
        title: '布朗运动',
        blue: '',
        isMob: /iPhone|Android/g.test(navigator.userAgent),
        ballList: [],
        zoom: 1,
        //控制粒子运动的速度
        maxSpeed: 0.1,
        Flag: null,
        R2: 50,
        R1: 50,
        count: 0,
        H: 0,
        values: 2,
        SH: 190,
        videoSrc: null,
        isHp: false,
        needTip: false,
        pollenList: [],
        src: 'static/img/start.png',
        play: true,
        played: true,
        playBtn: true,
        timers: null,
        timers1: null,
        timers2: null,
        To: null,
        isFirst: true,
        isSmall: false
      }
    },
    created() {

    },
    mounted() {

      this.getResize();
      let W1 = window.innerWidth;
      let H1 = window.innerHeight;

      if (W1 > 1500 && H1 > 1200) {
        this.isSmall = false;

      }
      if (W1 < 1500 || H1 < 1200) {
        this.isSmall = true
      }
      if (W1 < 500 || H1 < 500 && this.isMob) {
        this.needTip = true;
        this.SH = 145;
        setTimeout(() => {
          this.needTip = false;
        }, 3000);
      }
      document.title = this.title;
      window.addEventListener('resize', () => {
        this.getResize();
      });

    },

    computed: {},
    watch: {
      values(val) {
        this.maxSpeed = (0.1 + val / 100).toFixed(2);
        if (window.innerWidth < 500 || window.innerHeight < 500) {
          this.SH = 150 - 6.5 * val;
        }
        else {
          this.SH = 210 - 13 * val;
        }
      }
    },
    methods: {
      playVideoByBtn() {
        let that = this;
        let W = window.innerWidth;
        let H = window.innerHeight;
        if (W > 1500 && H > 1200) {

          // let video=$('.VD')[0];
          if (this.$refs.VDS) {
            this.$refs.VDS.currentTime = 0.15;
            this.$refs.VDS.play();
            this.playBtn = false;
            setTimeout(() => {
              $('.cvs').css({'display': 'none'});
            }, 100)

          }

          that.timers1 = setTimeout(() => {
            // this.play=false;
            that.timers2 = setTimeout(() => {
              $('#animateImg').css({'display': 'none'})
            }, 500);

            if (that.isFirst) {
              that.To = that.init();
              that.isFirst = false
            }
          }, 3000)

        }

        else {

          this.playBtn = false;
          let num = Math.random();
          let url="static/img/Brown.gif?"+num;
          that.proloadImg(url).then(() => {
            that.timers1 = setTimeout(() => {

              that.timers2 = setTimeout(() => {
                $('#animateImg').css({'display': 'none'})
              }, 500);
              // this.play=false;
              if (that.isFirst) {
                that.To = that.init();
                that.isFirst = false
              }
            }, 3000)
          })
        }


      },
      init() {
        let scene, camera, renderer;
        let W1 = window.innerWidth;
        let H1 = window.innerHeight;
        let W = $('.View_area').width();
        let H = $('.View_area').height();
        let dom = $('.View_area')[0];
        let ballList = [];
        let that = this;

        function Camerainit() {
          scene = new THREE.Scene();
          renderer = new THREE.WebGLRenderer({
            antialias: true
          });
          if (W1 < 500 || H1 < 500) {
            if (W1 < H1) {
              renderer.setSize(H1, W - 95);
              camera = new THREE.PerspectiveCamera(45, H1 / (W1 - 76), 1, 10000);
              camera.position.set(0, 0, 1000);
              camera.lookAt(new THREE.Vector3(0, 0, 0));
            }
            else {
              renderer.setSize(W, H);
              camera = new THREE.PerspectiveCamera(45, W / H, 1, 10000);
              camera.position.set(0, 0, 1000);
              camera.lookAt(new THREE.Vector3(0, 0, 0));
            }

          }
          else {
            renderer.setSize(W, H);
            camera = new THREE.PerspectiveCamera(45, W / H, 1, 10000);
            camera.position.set(0, 0, 1000);
            camera.lookAt(new THREE.Vector3(0, 0, 0));
          }

          renderer.setPixelRatio(window.devicePixelRatio);
          renderer.setClearColor(0xffffff);
          dom.appendChild(renderer.domElement)
        }

        function addLight() {
          let light = new THREE.AmbientLight(0x404040);
          let light1 = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
          scene.add(light1);
          scene.add(light)
        }

        function addObj() {
          let material1 = new THREE.MeshBasicMaterial({
            color: 0xe8f3ff,
          });
          //圆盘
          // let gemo1=new THREE.PlaneGeometry(140,80);
          let gemo1 = new THREE.CircleGeometry(50, 60, 60);
          let Meshx = new THREE.Mesh(gemo1, material1);
          Meshx.position.set(0, 0, 850);
          scene.add(Meshx);
        }

        Camerainit();
        addObj();

        //随机整数产生函数
        let createRadom = function (min, max, flag) {
          //flag表示是否包含边界
          let range, number;
          if (flag) {
            range = max - min + 1;
            number = Math.floor(Math.random() * range) + min;
          }
          else {
            range = max - min - 1;
            number = Math.ceil(Math.random() * range + min)
          }
          return number
        };

        let addBall = () => {
          let num;
          for (let i = 0; i < 15; i++) {
            num = createRadom(1, 3, true);
            ballList[i] = tools.createBall.call(this, 2.3, 18, `static/img/water${num}.png`, 'plane', 50, 50, 0.15);
            scene.add(ballList[i]);
          }
          for (let j = 0; j < 6; j++) {
            let obj = tools.createBall.call(this, 2.3, 18, 'static/img/pollen.png', 'sphere', 50, 50, 0.15);
            ballList.push(obj);
            scene.add(obj);
          }


          let L = ballList.length;
          for (let i = 0; i < L; i++) {
            ballList[i].getNum(ballList);
          }
        };
        addBall();

        function getDistance(p1, p2) {
          let dx = parseInt(p1.position.x - p2.position.x);
          let dy = parseInt(p1.position.y - p2.position.y);
          return Math.sqrt(dx * dx + dy * dy).toFixed(2);
        }

        function rule2(index) {
          for (let i = 0, L = ballList.length; i < L; i++) {
            let d = getDistance(ballList[i], ballList[index]);
            if (d < 4.1) {
              ballList[index].vx -= ballList[i].position.x - ballList[index].position.x;
              ballList[index].vy -= ballList[i].position.y - ballList[index].position.y;
              ballList[i].vx -= ballList[i].position.x - ballList[i].position.x;
              ballList[i].vy -= ballList[i].position.y - ballList[i].position.y;
            }
          }
        }

        function rule4(index) {
          for (let i = 0, L = ballList.length; i < L; i++) {
            let MAX_SPEED = that.maxSpeed;
            let dx = ballList[index].position.x;
            let dy = ballList[index].position.y;
            let r = Math.sqrt(dx * dx + dy * dy);
            if (r > 31) {
              let sphere = ballList[index];
              let k = 1;
              let forceX = -k * sphere.position.x;
              let forceY = -k * sphere.position.y;
              sphere.vx += forceX;
              sphere.vy += forceY;
              let speed = Math.sqrt(sphere.vx * sphere.vx + sphere.vy * sphere.vy);
              if (speed >= MAX_SPEED) {
                let r = MAX_SPEED / speed;
                sphere.vx *= r;
                sphere.vy *= r;
              }
              sphere.position.x += sphere.vx;
              sphere.position.y += sphere.vy;
            }
          }
        }


        function runBall() {
          let MAX_SPEED = that.maxSpeed;
          for (let i = 0, L = ballList.length; i < L; i++) {
            let sphere = ballList[i];

//                        rule1(i);
            //球体之间碰撞
            rule2(i);
//                        rule3(i);
            // 球体与边界之间碰撞
            rule4(i);
            //速度

            let k = 0.0001, k1;
            if (Math.random() > 0.5) {
              k1 = 1;
            } else {
              k1 = -1;
            }
            let forceX = -k * k1 * sphere.position.x;
            let forceY = -k * k1 * sphere.position.y;
            sphere.vx += forceX;
            sphere.vy += forceY;
            let speed = Math.sqrt(sphere.vx * sphere.vx + sphere.vy * sphere.vy);
            let r = MAX_SPEED / speed;
            sphere.vx *= r;
            sphere.vy *= r;
            sphere.position.x += sphere.vx;
            sphere.position.y += sphere.vy;
          }
        }

        function render() {
          requestAnimationFrame(render);
          renderer.render(scene, camera);
          runBall();
        }

        render();
        return {
          addBall: addBall,
          scene: scene
        }
      },
      getResize() {
        let W1 = window.innerWidth;
        let H1 = window.innerHeight;
        if ((W1 < 500 || H1 < 500) && this.isMob) {
          this.zoom = W1 / 1024;
          if (H1 > W1 && this.isMob) {
            this.isHp = true;
          }
          else {
            this.isHp = false;
          }
        }
      },
      proloadImg(src) {
        let that = this;
        return new Promise(function (resolve, reject) {
          let img = new Image();
          img.src = src;
          img.onload = function () {
            that.src = src;
            resolve();
          }
        });
      },
      reset() {
        let Ani = $('#animateImg');
        let W = window.innerWidth;
        let H = window.innerHeight;
        this.values = 2;
        clearTimeout(this.timers1);
        clearTimeout(this.timers2);
        this.play = true;
        this.played = true;
        this.playBtn = true;
        this.playBtn = true;
        this.src = 'static/img/start.png';
        $('#animateImg').css({'display': 'block'});
        if (W > 1500 && H > 1200) {
          $('.cvs').css({'display': 'block'});
          this.$refs.VDS.currentTime = 0.15;
          this.$refs.VDS.pause();
        }
        let tm = setTimeout(() => {
          Ani.stop();
          Ani.fadeIn(100);
        }, 50);
        tm = null;
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
    outline: none;
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
    background-color: #fff;
    position: relative;
    touch-action: none;
    -ms-touch-action: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .ne {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
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

  .Ui-head {
    background-color: #fff !important;
    border: none !important;
    box-shadow: none !important;
  }

  .Ui-head h3 {
    color: #000 !important;
    font-family: PingFangSC-Medium;
  }

  .container {
    width: 100%;
    height: calc(100% - 76px);
    position: relative;
  }

  .View_area {
    position: relative;
    width: calc(100%);
    height: 100%;
    transform-origin: top left;
  }

  canvas {
    position: absolute;
    left: 0;
    top: 0;
  }

  .App_slider {
    position: absolute;
    right: 0;
    top: 0;
    width: 220px;
    height: 100%;
    overflow: hidden;
    z-index: 10;
  }

  .item1 {
    width: 65px;
    height: 311px;
  }

  .item2 {
    width: 40px;
    height: 280px;
    position: absolute;
    left: 12px;
    top: 17px;
    overflow: hidden;
    z-index: 100;
  }

  .item1 img, .item2 img {
    width: 100%;
    height: 100%;
  }

  .box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
  }

  #animateImg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 200;
    opacity: 1;
  }

  /*.box1{*/
  /*position: relative;*/
  /*display: inline-block;*/
  /*}*/
  .cover {

  }

  #animateImg video, #animateImg img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: 100%;
    pointer-events: none;
    border: none;
  }

  .sliders1 {
    /*visibility: hidden;*/
    opacity: 0;
  }

  .sliders, .sliders1 {
    position: absolute;
    right: 28px;
    top: calc(50% - 40px);
    transform: translateY(-50%);
  }

  .uiSlider, .ui-piecewise, ::after, ::before {
    background-color: white !important;
    box-shadow: none !important;
    border: none !important;
  }

  .dotTxt {
    width: 65px !important;
    padding: 3px !important;
    height: 35px !important;
    border: none !important;
    border-radius: unset !important;
    box-shadow: none !important;
    margin-left: -10px !important;
  }

  .cover {
    position: absolute;
    left: 22px;
    bottom: 60px;
    width: 22px;
    height: 240px;
    z-index: 200;
    overflow: hidden;
  }

  .cover div {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: white;
  }

  .hen {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: #fff;
  }

  .hen div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
  }

  .Tip {
    padding: 0 10px;
    position: fixed;
    display: inline-block;
    width: 450px;
    height: 48px;
    border-radius: 100px;

    border: 2px solid #ddd;
    font-size: 18px;
    color: #333;
    line-height: 46px;
    margin: 0 auto;
    left: 50%;
    background-color: white;
    transform: translateX(-50%);
    z-index: 9999;
  }

  .Mark {
    width: 100px;
    height: 100px;
    z-index: 205;
    position: absolute;
    right: 10px;
    bottom: 10px;
  }

  video {
    height: calc(100% - 5px) !important;
  }

  .cvs {
    z-index: 100;
    background-color: white;
    border: none !important;
    padding: 10px;
    margin-top: -2px;
    border-bottom: 5px solid #fff;
  }

  img {
    pointer-events: none;
  }

  .hides {
    opacity: 0 !important;
    transition: all 1000ms ease;
  }

  .mark1 {
    position: absolute;
    top: 13%;
    right: 10px;
    width: 150px;
    height: 30px;
    z-index: 10;
  }

  .mark1 img {
    width: 100%;
    height: 100%;
  }

  .Area {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .box, .sliders, .sliders1 {
    margin-top: 50px;
  }

  .sliders1 {
    margin-right: 50px;
  }

  .loading {
    width: 100%;
    height: 100%;
    z-index: 9999;
    position: absolute;
    left: 0;
    top: 0;
    background-color: white;
  }

  .loading span {
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
  }

  @media screen and (max-height: 500px) {

    .item1 {
      width: 38px;
      height: 160px;
      margin-left: 10px;
      transform: scale(1);
    }

    .uiSlider {
      margin-top: 20px !important;
      height: 140px !important;
      margin-top: -5px !important;
    }

    .box {
      margin-top: 30px;
    }

    .item2 {
      width: 25px;
      height: 160px;
      position: absolute;
      left: 16px;
      top: -5px;
      overflow: hidden;
      z-index: 100;
      transform: scale(1);
    }

    .item1 img, .item2 img {
      width: 100%;
      height: 100%;
    }

    .dotTxt {
      width: 50px !important;
    }

    .cover {
      position: absolute;
      left: 24px;
      bottom: 10px;
      width: 10px;
      height: 170px;
      z-index: 200;
      overflow: hidden;

      transform: scale(1);
    }

    .cover div {
      position: absolute;
      left: 0;
      top: -20px;
      width: 100%;
      height: 100%;
      background-color: white;
    }

    .uiSlider {
      transform: scale(1) !important;
    }

    .hides {
      /*visibility:hidden !important;*/

      /*z-index: -1 !important;*/
      /*transition:all 1s ease !important;*/
      opacity: 0 !important;
      transition: all 1000ms ease;
    }

    canvas {
      position: absolute;
      left: 0;
      top: -10px;
    }

  }

  @media screen and (min-width: 1500px) {
    .View_area {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 1680px;
      height: 700px;
      transform-origin: top left;
    }

    canvas {
      position: absolute;
      left: 0;
      top: 0;
    }

  }

</style>
