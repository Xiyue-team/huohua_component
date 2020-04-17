<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div class="contain">
        <div class="View" :style="'width:'+ViewW+'px;height:'+ViewH+'px'">
          <div class="ViewSpace" :style="'transform: scale('+zoomF+')'" v-model='isPlay' @click='play'>
            <img :src="src" draggable="false">
          </div>
          <div class="mask" :style="'transform: scale('+zoomF+')'" v-if="isReplay">
            <div class="playBtn" v-model="rePlayed" @click='Replay'>
              <img :src="playSrc" draggable="false">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget" id="button1"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space">
        <div class="btnClick">
          <ui-btn size="big" :type="blue1" id="button2" @click.native="btnClick(1)">细胞生物</ui-btn>
          <ui-btn size="big" :type="blue2" id="button3" @click.native="btnClick(2)">非细胞生物</ui-btn>
        </div>
        <div class="btnRadio" :style="{pointerEvents:pe,opacity:op}">
          <ui-group type="radio" :groups="groups" v-model="radio"></ui-group>
        </div>
        <div class="btnHover" :style="{pointerEvents:pe1,opacity:op1}">
          <ui-btn :type="dblue1" id="button4" @click.native="dbtnClick(1)" :style="{pointerEvents:pe2}">A. 自我复制</ui-btn>
          <ui-btn :type="dblue2" id="button5" @click.native="dbtnClick(2)">B. 逆转录</ui-btn>
        </div>
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
  components: {
    uiHead,
    uiBtn,
    uiGroup
  },
  data() {
    return {
      title: '中心法则',
      //区域大小
      BtnSpaceStyle: 'flex',
      blue: 0,
      dblue: 0,
      blue1: '',
      blue2: '',
      dblue1: '',
      dblue2: '',
      radio: "",
      isPlay: true,
      isReplay: false,
      rePlayed: false,
      zoomF: 0,
      ViewW: 0,
      ViewH: 0,
      groups: [{
        name: 'dna',
        txt: 'DNA病毒'
      }, {
        name: 'rna',
        txt: 'RNA病毒'
      }],
      timer: null,
      pe: 'none',
      op: 0,
      src: "static/img/0.png",
      playSrc: "static/UI/play.png",
      pe1: 'none',
      op1: 0,
      pe2:'none',
      num: 1,
      totalNum: 80,
      prefix: 'a',
      prefixO: ''
    }
  },
  created() {
    document.title = this.title;
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.getViewSize();
    });
    this.getViewSize();
    this.src = 'static/img/0.png';
  },
  watch: {
    radio(val) {
      this.isReplay = false;
      this.isPlay = true;
      if (this.radio == '') {
        return;
      }
      if(this.radio!=''){
        this.radio=val;
      }
      clearTimeout(this.timer);

      if (val == 'dna') {
        this.dblue1 = '';
        this.dblue2 = '';
        this.pe1 = 'none';
        this.op1 = 0;       
        this.totalNum = 100;
        this.prefix = 'b';
        this.imgAni('b');
      } else if(val == 'rna'){
        this.pe1 = 'auto';
        this.op1 = 1;
        this.pe2='none';
        this.dblue=1;
        this.dblue1 = 'dblue';
        this.dblue2 = '';
        this.totalNum = 75;
        this.prefix = 'c';
        this.imgAni('c');   
      }
    },

  },
  methods: {
    play() {
      if (this.blue1 == 'blue' || this.blue2 == 'blue') {
        if (this.isPlay) {
          clearTimeout(this.timer);
          this.isPlay = false;
        } else {
          this.isPlay = true;
          this.imgAni(this.prefixO);
        }
      }
    },
    Replay() {
      if (!this.rePlayed) {
        this.num = 1;
        this.imgAni(this.prefixO);
        this.isReplay = false;
      }
    },

    //生物细胞---非生物细胞
    btnClick(val) {
      if (this.blue == val) {
        return;
      }
      clearTimeout(this.timer);
      if (val != 3) { 
        this.blue = val;
      }
      this.isReplay = false;
      this.isPlay = true;
      if (val == 1) {
        this.blue1 = 'blue';
        this.blue2 = '';
        this.op = 0;
        this.pe = 'none';
        this.op1 = 0;
        this.pe1 = 'none';
        this.radio = '';
        this.totalNum = 80;
        this.prefix = 'a';
        this.imgAni('a');
      } else {
        this.blue2 = 'blue';
        this.blue1 = '';
        this.op = 1;
        this.pe = 'auto';
        this.radio = 'dna';
      }
    },
    //自我复制---逆转录 
    dbtnClick(val) {
      if (this.dblue == val) {
        return;
      }
      clearTimeout(this.timer);
      if (val != 3) {
        this.dblue = val;
      }
      this.isPlay = true;
      this.isReplay = false;
      if (val == 1) {
         event.stopPropagation();
        this.dblue1 = 'dblue';
        this.dblue2 = '';
        this.totalNum = 75;
        this.prefix = 'c';
        this.imgAni('c');
      } else if(val == 2){
        this.pe2='auto';
        this.dblue1 = '';
        this.dblue2 = 'dblue';
        this.totalNum = 100;
        this.prefix = 'd';
        this.imgAni('d');
      }
    },
    imgAni(type) {
      let thiz = this;
      if (type != this.prefixO) {
        this.num = 1;
      }
      this.prefixO = type;

      function ani() {
        if (thiz.num > thiz.totalNum) {
          thiz.num = 1;
          clearTimeout(thiz.timer);
          thiz.timer=null;
          thiz.isReplay = true;
          return;
        }
        thiz.preloadImage(`static/img/${thiz.prefix+thiz.num}.png`).then((path) => {
          if(thiz.timer!=null){
            thiz.src = path;
          }
        });
        thiz.num++;
        thiz.timer = setTimeout(ani, 60);
      }
      ani();
    },

    preloadImage(path) {
      return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => resolve(path);
        image.onerror = reject;
        image.src = path;
      })
    },

    //计算区块大小
    getViewSize() {
      var W = window.innerWidth - 280;
      var H = window.innerHeight - 72;
      if (W / H > 700 / 432) {
        this.ViewW = parseInt(700 * H / 432);
        this.ViewH = H;
        this.zoomF = (H - 70) / 392;
      } else {
        this.ViewW = W;
        this.ViewH = parseInt(432 * W / 700);
        this.zoomF = (W - 40) / 660;
      }
    },
    //重置
    resetWidget() {
      clearTimeout(this.timer);
      this.timer=null;
      this.src="static/img/0.png";
      this.num = 1;    
      this.blue = 0;
      this.dblue = 0;
      this.blue1 = '';
      this.blue2 = '';
      this.dblue1 = '';
      this.dblue2 = '';
      this.radio = "";
      this.isPlay = true;
      this.isReplay = false;
      this.rePlayed = false;
      this.pe = 'none';
      this.op = 0;
      this.pe1 = 'none';
      this.pe2 = 'none';
      this.op1 = 0;
      this.totalNum = 80;
      this.prefix = 'a';
      this.prefixO = '';
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

.contain {
  width: 100%;
  height: calc(100% - 72px);
  position: relative;
}

.View {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 0 20px 60px 20px;
  margin: auto;
}

.ViewSpace {
  width: 660px;
  height: 392px;
  padding: 10px;
  transform-origin: top left;
  border: 0 solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
}

.ViewSpace img {
  width: 640px;
  height: 372px;
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

.btnClick {
  margin-bottom: 20px;
}

.btnClick .UI-btn,
.btnRadio .UI-btn {
  margin-bottom: 12px;
}

.btnHover {
  width: 100%;
  margin-top: 10px;
}

.btnHover div:first-child {
  float: left;
}

.btnHover div:last-child {
  float: right;
}

.space_img_text {
  position: relative;
  bottom: 58px;
}

.mask {
  width: 660px;
  height: 392px;
  padding: 10px;
  position: absolute;
  /*left: 0;*/
  top: 0;
  background: transparent;
  transform-origin: top left;
}

.playBtn {
  position: absolute;
  z-index: 999999;
  width: 60px;
  height: 60px;
  right: 10px;
  bottom: 10px;
  cursor: pointer;
}

.playBtn img {
  display: block;
  width: 100%;
  height: 100%;
}

</style>
