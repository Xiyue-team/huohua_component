<template>
  <div id="app" class="noselect">
    <ui-head :title="title">
      <ui-btn type="reset1" @click.native="reset">
      </ui-btn>
    </ui-head>
    <div class="Tip" v-if="needTip">建议您在电脑或平板上打开，以获取最佳的演示效果</div>
    <div class="container">
      <div class="View_area">

      </div>

      <div class="App_slider">
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
            >

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
            >

          </ui-slider>
        </div>
      </div>
    </div>
    <div class="hen" v-show="isHp">
      <div><img src="static/img/xuanzhuan.png" alt=""><span>请将屏幕自动旋转功能打开并横屏使用</span></div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import uiBtn from '@/components/UI/uiBtn';
  import tools from './common/tools';
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
        title: '分子扩散',
        blue: '',
        isMob: /iPhone|Android/g.test(navigator.userAgent),
        L: 0,
        zoom: 1,
        Speed: 50,
        Flag: null,
        R2: 200,
        R1: 160,
        obj: null,
        OutBall: [],
        H: 0,
        To: null,
        values: 1,
        SH: 190,
        isHp: false,
        needTip: false,
        maxSpeed: 0.5
      }
    },
    created() {

    },
    mounted() {
      this.getResize();
      this.To = this.init();

      let W1 = window.innerWidth;
      let H1 = window.innerHeight;


      let ballList = [];
      if (W1 < 500 || H1 < 500 && this.isMob) {
        this.SH = 130;
        this.needTip = true;
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
        this.maxSpeed = (0.35 + val / 30).toFixed(2);


        if (window.innerWidth < 500 || window.innerHeight < 500) {
          this.SH = 140 - 9.4 * val;
        }
        else {
          this.SH = 210 - 13.2 * val;
        }
      },
    },
    methods: {
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
          renderer = new THREE.WebGLRenderer({
            antialias: true
          });

          scene = new THREE.Scene();

          if (W1 < 500 || H1 < 500) {

            if (W1 < H1) {
              renderer.setSize(H1, W - 76);
              camera = new THREE.PerspectiveCamera(55, H1 / (W - 76), 1, 10000);
              camera.position.set(0, -80, 1000);
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
            color: 0xbebaba,
          });
          //圆盘
          let gemo1 = new THREE.CircleGeometry(150, 60);
          let Meshx = new THREE.Mesh(gemo1, material1);
          Meshx.position.set(0, 0, 580);
          scene.add(Meshx);
        }

        Camerainit();
        addLight();
        addObj();
        //外圆盘
        let gemo2 = new THREE.RingGeometry(142, 180, 100, 60);
        let material2 = new THREE.MeshBasicMaterial({
          color: 0x000
        });
        let Mesh1 = new THREE.Mesh(gemo2, material2);
        Mesh1.position.set(0, 0, 600);
        scene.add(Mesh1);


        let addBall = () => {

          for (let i = 0; i < 15; i++) {
            ballList[i] = tools.createBall.call(this, 8, 36, 'static/img/ball1.png', 160, 30, 0.3);
            scene.add(ballList[i]);
          }
          for (let i = 0; i < 15; i++) {
            ballList[i].getNum(ballList);
          }

        };
        addBall();


        function getDistance(p1, p2) {
          let dx = parseInt(p1.position.x - p2.position.x);
          let dy = parseInt(p1.position.y - p2.position.y);
          return Math.sqrt(dx * dx + dy * dy);
        }


        function rule2(index) {
          for (let i = 0, L = ballList.length; i < L; i++) {
            let d = getDistance(ballList[i], ballList[index]);
            if (d < 17 && d > 10) {
              ballList[index].vx -= ballList[i].position.x - ballList[index].position.x;
              ballList[index].vy -= ballList[i].position.y - ballList[index].position.y;
            }
          }
        }


        function rule4(index) {

          for (let i = 0, L = ballList.length; i < L; i++) {
            let MAX_SPEED = that.maxSpeed;
            let dx = ballList[index].position.x;
            let dy = ballList[index].position.y;
            let r = Math.sqrt(dx * dx + dy * dy);
            if (r > 164) {
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
            // if (speed >= MAX_SPEED) {
            let r = MAX_SPEED / speed;
            sphere.vx *= r;
            sphere.vy *= r;
            // }

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
          scene: scene,

        }
      },
      getResize() {
        let W1 = window.innerWidth;
        let H1 = window.innerHeight;
        if ((W1 < 500 || H1 < 500) && this.isMob) {

          if (H1 > W1 && this.isMob) {
            this.isHp = true;
          }
          else {
            this.isHp = false;
          }


          // if (W1 / H1 > 568 / 320) {
          //   this.zoom = W1 / 568
          // }
          // else {
          //   this.zoom = H1 / 320
          // }
        }

      },
      reset() {
        this.values = 1;
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
    background-color: #000 !important;
  }

  .Ui-head h3 {
    color: #fff !important;
    font-family: PingFangSC-Medium;
  }

  .container {
    width: 100%;
    height: calc(100% - 76px);
    background-color: black;
    position: relative;
  }

  .View_area {
    position: relative;
    width: 100%;
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
    width: 240px;
    height: 100%;
    overflow: hidden;
    z-index: 10;
  }

  .item1 {
    width: 65px;
    height: 311px;
  }

  .item2 {
    width: 45px;
    height: 280px;
    position: absolute;
    left: 10px;
    top: 18px;
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

  .sliders, .sliders1 {
    position: absolute;
    right: 32px;
    top: calc(50% - 50px);
    transform: translateY(-50%);
  }

  .uiSlider, .ui-piecewise, ::after, ::before {
    background-color: black !important;

  }

  .sliders1 {
    left: 75px;
    width: 72px;
    opacity: 0;
  }

  .dotTxt {
    width: 60px !important;
    height: 35px !important;
    border-radius: unset !important;
  }

  .cover {
    position: absolute;
    left: 22px;
    bottom: 85px;
    width: 22px;
    height: 220px;
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
    z-index: 200;
    border: 2px solid #ddd;
    font-size: 18px;
    color: #333;
    line-height: 46px;
    margin: 0 auto;
    left: 50%;
    background-color: white;
    transform: translateX(-50%);
  }

  img {
    pointer-events: none;
  }

  @media screen and (max-height: 500px) {

    .item1 {
      width: 42px;
      height: 200px;
      /*transform: scale(0.7);*/
    }

    .box {
      margin-top: 5px;

    }

    .sliders {
      position: absolute;
      right: 50px;
      top: calc(50% - 50px);
      transform: translateY(-50%);
    }

    .item2 {
      width: 30px;
      height: 182px;
      position: absolute;
      left: 6px;
      top: 10px;
      overflow: hidden;
      z-index: 100;

    }

    .item1 img, .item2 img {
      width: 100%;
      height: 100%;
    }

    .cover {
      position: absolute;
      left: 12px;
      bottom: 20px;
      width: 20px;
      height: 175px;
      z-index: 200;
      overflow: hidden;
      transform: scaleX(0.7);
    }

    .cover div {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: white;
    }

    .sliders {
      width: 68px;
    }

    .uiSlider {
      margin-top: 60px !important;
      height: 185px !important;
      width: 50px !important;

      /*transform: scale(0.7) !important;*/
    }

    .dotTxt {
      width: 50px !important;
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
