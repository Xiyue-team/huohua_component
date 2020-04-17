<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div class="view_space">
        <div id="renderCanvas" :style="'background-image:url('+src+')'">
          <div v-show="blue==1" style="width:100%;height:30px;position: absolute;top:60px;left:0;z-index:999;">
            <div style="font-weight:500;position:absolute;top:0;left:205px;width:120px;height:100%;line-height: 30px;">常温</div>
            <div style="font-weight:500;position:absolute;top:0;right:143px;width:120px;height:100%;line-height: 30px;">90℃水浴加热</div>
          </div>
          <div class="play" v-show="played" @click="blueClick(4)">
            <img src="static/UI/play.png"></div>
        </div>
        <div class="bg" :style="'background-image:url('+img+')'" v-show="target"></div>
      </div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget" id="button1" ></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space">
        <ui-btn size="big" :type="blue1" @click.native="blueClick(1)" id="button2">实验一</ui-btn>
        <ui-btn size="big" :type="blue2" @click.native="blueClick(2)" id="button3">实验二</ui-btn>
        <ui-btn type="radio" :value="radio" @click.native="blueClick(3)" :style="{pointerEvents:pe,opacity:op}">验证</ui-btn>
      </div>
    </div>
  </div>
</template>
<script>
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiGroup from '@/components/UI/uiGroup'; //按钮
export default {
  name: 'app',
  components: { uiHead, uiBtn, uiGroup },
  data() {
    return {
      title: '比较过氧化氢在不同条件下的分解',
      //区域大小
      BtnSpaceStyle: 'flex',
      blue1: '',
      blue2: '',
      blue: 0,
      played: false,
      SET: null,
      timer: null,
      src: './static/img/1.png',
      radio: false,
      src1: './static/img/1.gif?' + Math.random(),
      src2: './static/img/2.gif?' + Math.random(),
      src3: './static/img/3.gif?' + Math.random(),
      pe: 'none',
      op: 0,
      img:'./static/img/bg1.png',
      target:false
    }
  },
  created() {
    document.title = this.title;
  },
  mounted() {
    this.resize();
    this.getViewSize();
    this.setSideStyle();
  },
  methods: {
    blueClick(val) {
      if (this.blue == val || this.blue==3&&val==2) {
        return;
      }
      if (val != 4) {
        this.blue = val;
      }
      this.played = false;
      clearTimeout(this.SET);
      if (this.blue == 1) {
        this.target=true;
        this.img='./static/img/bg1.png';
        clearTimeout(this.timer);
        this.blue1 = 'blue';
        this.blue2 = '';
        this.pe = 'none';
        this.op =0;
        this.radio = false;
        this.imgLi(this.src1, 9000, true);
        this.imgL('./static/img/1.gif', 1);
      } else if (this.blue == 2) {
        this.target=true;
        this.img='./static/img/bg2.png'; 
        this.blue2 = "blue";
        this.blue1 = "";
        this.imgLi(this.src2, 14000, true);
        this.imgL('./static/img/2.gif', 2);
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.op = 1;
          this.pe = 'auto'
        }, 13000);
      } else if (this.blue == 3) {
        this.radio = true;
        this.imgLi(this.src3, 6000, true);
        this.imgL('./static/img/3.gif',3);
      }
    },
    imgLi(src, tim, f) {
      var I = new Image();
      I.src = src;
      I.onload = () => {
        if (this.blue == 0 && f) {
          return;
        }
        this.src = I.src;
        if (tim) {
          this.SET = setTimeout(() => {
            this.played = true;
            clearTimeout(this.SET);
            return;
          }, tim);
        }
      }
    },
    imgL(src, num) {
      var I = new Image();
      I.src = src + '?' + Math.random();
      I.onload = () => {
        this['src' + num] = I.src;
        if (num == 1) {
          this.pe2 = false;
          this.pe3 = false;
        } else if (num == 2) {
          this.pe1 = false;
          this.pe3 = false;
        } else if (num == 3) {
          this.pe1 = false;
          this.pe2 = false;
        }
      }
    },
    //计算侧边
    setSideStyle() {
      const el = document.getElementById('btn_space');
      if (el && el.scrollHeight > el.offsetHeight) {
        this.BtnSpaceStyle = 'block'
      } else {
        this.BtnSpaceStyle = 'flex'
      }
    },
    //计算区块大小
    getViewSize() {
      var w = $('.view_space').width();
      var h = $('.view_space').height();
      var zoom = 1;
      if (w / h > 696 / 406) {
        zoom = h / 406;
      } else {
        zoom = w / 696;
      }
      $('#renderCanvas').css('zoom', zoom);
       $('.bg').css('zoom', zoom);
    },
    //窗口大小更改
    resize() {
      const vm = this;
      window.addEventListener('resize', function() {
        vm.getViewSize(); //计算视图区大小
        vm.setSideStyle(); //计算操作区大小
      })
    },
    //重置
    resetWidget() {
      clearTimeout(this.SET);
      clearTimeout(this.timer);
      this.blue1 = '';
      this.blue2 = '';
      this.blue = 0;
      this.pe = 'none';
      this.op = 0;
      this.img='';
      this.target=false; 
      this.radio =false;
      this.played = false;
      this.imgLi('./static/img/1.png');
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

#renderCanvas {
  width: 696px;
  height: 406px;
  /*border: 1px solid rgba(0, 0, 0, 0.15);*/
  border: 1px solid #D6D6D6;
  box-shadow: 0 1px 3px 0 rgba(168, 168, 168, 0.50);
  border-radius: 6px;
  padding: 10px;
  position: relative;
  background-size: contain;
  background-repeat: no-repeat;
  background-origin: content-box;
  background-position: center;
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

.view_space {
  margin: 40px 22px 84px 22px;
  width: calc(100% - 44px);
  height: calc(100% - 196px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
}

.btn_space .UI-btn {
  margin-bottom: 20px;
}

.space_img_text {
  position: relative;
  bottom: 58px;
}

.play {
  cursor: pointer;
  position: absolute;
  right: 15px;
  bottom: 10px;
  z-index: 9;
}

.play img{
  width: 44px;
  height: 44px;
}
.bg{
  width: 676px;
  height: 386px;
  position: absolute;
  z-index: 8;
}
</style>
