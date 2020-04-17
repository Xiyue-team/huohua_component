<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <div class="contain">
        <div class="View" :style="'width:'+ViewW+'px;height:'+ViewH+'px'">
          <div class="ViewSpace">
            <img :src="'static/img/'+num+'.jpg'" alt="">
          </div>
          <img src="static/UI/play.png" alt="" v-show="btnShow" class="imgBtn" @click="btnFun">
        </div>
      </div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space">
        <ui-btn :type="blue1" size="big" @click.native="blueClick('adsorbent')">吸附</ui-btn>
        <ui-btn :type="blue2" size="big" @click.native="blueClick('injection')">注入</ui-btn>
        <ui-btn :type="blue3" size="big" @click.native="blueClick('synthesis')">合成</ui-btn>
        <ui-btn :type="blue4" size="big" @click.native="blueClick('assemble')">组装</ui-btn>
        <ui-btn :type="blue5" size="big" @click.native="blueClick('release')">释放</ui-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  export default {
    name: 'app',
    components: {uiHead, uiBtn},
    data() {
      return {
        title: '噬菌体侵染细菌的过程',
        blue1: '',
        blue2: '',
        blue3: '',
        blue4: '',
        blue5: '',
        ViewW: 0,
        ViewH: 0,
        num: 1,
        clickIndex: '',
        played: true,
        btnShow: false,
        maxNum: 14,
        minNum: 0,
        TM: null
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
    },
    computed: {},
    watch: {},
    methods: {
      blueClick(val) {
        if (this.clickIndex === val) {
          return;
        }
        clearInterval(this.TM);
        this.clickIndex = val;
        this.blue1 = '';
        this.blue2 = '';
        this.blue3 = '';
        this.blue4 = '';
        this.blue5 = '';
        if (val === 'adsorbent') {
          this.blue1 = 'blue';
          this.minNum = 0;
          this.maxNum = 14;
        } else if (val === 'injection') {
          this.blue2 = 'blue';
          this.minNum = 20;
          this.maxNum = 77;
        } else if (val === 'synthesis') {
          this.blue3 = 'blue';
          this.minNum = 78;
          this.maxNum = 154;
        } else if (val === 'assemble') {
          this.blue4 = 'blue';
          this.minNum = 154;
          this.maxNum = 213;
        } else if (val === 'release') {
          this.blue5 = 'blue';
          this.minNum = 213;
          this.maxNum = 310;
        }
        this.playIMG();
      },
      playIMG() {
        this.btnShow = false;
        this.TM = setInterval(() => {
          if (this.minNum >= this.maxNum) {
            this.btnShow = true;
            clearInterval(this.TM);
          }
          this.minNum++;
          this.numChange(this.minNum);
        }, 100);
      },
      btnFun() {
        if (this.clickIndex === 'adsorbent') {
          this.minNum = 0;
          this.maxNum = 14;
        } else if (this.clickIndex === 'injection') {
          this.minNum = 20;
          this.maxNum = 77;
        } else if (this.clickIndex === 'synthesis') {
          this.minNum = 78;
          this.maxNum = 154;
        } else if (this.clickIndex === 'assemble') {
          this.minNum = 154;
          this.maxNum = 213;
        } else if (this.clickIndex === 'release') {
          this.minNum = 213;
          this.maxNum = 310;
        }
        this.playIMG();
      },
      numChange(v) {
        var I = new Image();
        I.src = 'static/img/' + v + '.jpg';
        I.onload = () => {
          if(this.TM==null)return;
          this.num = v;
        }
      },
      //计算区块大小
      getViewSize() {
        var W = window.innerWidth - 280;
        var H = window.innerHeight - 72;
        if (W / H > 750 / 432) {
          this.ViewW = parseInt(750 * H / 432);
          this.ViewH = H;
        } else {
          this.ViewW = W;
          this.ViewH = parseInt(432 * W / 750);
        }
      },
      //重置
      resetWidget() {
        clearInterval(this.TM);
        this.TM = null;
        this.clickIndex ='';
        this.blue1 = '';
        this.blue2 = '';
        this.blue3 = '';
        this.blue4 = '';
        this.blue5 = '';
        this.num = 1;
        this.played = true;
        this.btnShow = false;
        this.maxNum = 14;
        this.minNum = 0;
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

  html, body, #app {
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
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently not supported by any browser */
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

  .aside_reset {
    margin: 20px 24px;
    float: right;
  }

  .btn_space {
    width: 260px;
    height: 340px;
    position: absolute;
    top: 80px;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .btn_space .UI-btn {
    margin-bottom: 20px;
  }

  .describeText p:first-child {
    margin-bottom: 2.5vh;
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
    padding: 0 25px 60px 25px;
    margin: auto;
  }

  .ViewSpace {
    width: 100%;
    height: 100%;
    transform-origin: top left;
    border: 0 solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  }

  .ViewSpace img {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    margin: 10px;
  }

  .imgBtn {
    width: 50px;
    height: 50px;
    position: absolute;
    bottom: 65px;
    right: 32px;
    cursor: pointer;
  }
</style>
