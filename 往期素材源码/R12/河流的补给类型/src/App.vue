<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <div class="contain">
        <div class="View" :style="'width:'+ViewW+'px;height:'+ViewH+'px'">
          <div class="ViewSpace">
            <img :src="'static/img/'+num+'.png'" alt="">
            <span class="textSpan">注：模拟河流单一补给形式下的流量过程曲线</span>
          </div>
          <ui-slider :box="false"
                     :boxHeight="50"
                     v-model="value"
                     :title="false"
                     :min="0"
                     :max="64"
                     :interval="1"
                     :tooltip="false"
                     :speed="0"
                     id="uislider"
                     :style="[zoomF]"
                     :zoom="ZOOM"
                     :boxWidth="silderWidth"></ui-slider>
          <ui-btn type="play" v-model="played" class="imgBtn" :style="[zoomF]"></ui-btn>
        </div>
      </div>
    </div>
    <!--侧边按钮区-->
    <div class="rightSide">
      <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
      <img src="static/img/left.png" alt="" class="leftImg" v-show="switch_checked1">
      <ui-btn type="switch" v-model="switch_checked1" style="position: absolute;bottom: 70px">
        图例
      </ui-btn>
    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  import uiSlider from '@/components/UI/uiSlider';//按钮
  export default {
    name: 'app',
    components: {uiHead, uiBtn, uiSlider},
    data() {
      return {
        title: '河流的补给类型',
        ViewW: 0,
        ViewH: 0,
        num: 1,
        played: true,
        TM: null,
        value: 0,
        silderWidth: 530,
        switch_checked1: false,
        zoomF: {},
        ZOOM: 1
      }
    },
    created() {
      document.title = this.title;
      this.getViewSize();
    },
    mounted() {
      window.addEventListener('resize', () => {
        this.getViewSize();
      });
      $('#uislider').append('<div id="sliderP"><span id="s1"></span><span id="s2"></span><span id="s3"></span><span id="s4"></span><span id="s5"></span><span id="s6"></span><span id="s7"></span><span id="s8"></span><span id="s9"></span><span id="s10"></span><span id="s11"></span><span id="s12"></span><span id="s13"></span><span id="s14"></span></div>');
      $('#uislider').css('left', this.ViewW * 13 / 272 + 'px');
      $('.imgBtn').css('right', this.ViewW * 30 / 272 + 'px');
    },
    computed: {},
    watch: {
      value(v) {
        var I = new Image();
        I.src = 'static/img/' + (v + 1) + '.png';
        var thiz = this;
        I.onload = function () {
          thiz.num = v + 1;
        };
        if (v <= 65 && v > 60) {
          $('#s2').css('background', '#5caefd');
          $('#s3').css('background', '#5caefd');
          $('#s4').css('background', '#5caefd');
          $('#s5').css('background', '#5caefd');
          $('#s6').css('background', '#5caefd');
          $('#s7').css('background', '#5caefd');
          $('#s8').css('background', '#5caefd');
          $('#s9').css('background', '#5caefd');
          $('#s10').css('background', '#5caefd');
          $('#s11').css('background', '#5caefd');
          $('#s12').css('background', '#5caefd');
          $('#s13').css('background', '#5caefd');
        } else if (v <= 60 && v > 55) {
          $('#s2').css('background', '#5caefd');
          $('#s3').css('background', '#5caefd');
          $('#s4').css('background', '#5caefd');
          $('#s5').css('background', '#5caefd');
          $('#s6').css('background', '#5caefd');
          $('#s7').css('background', '#5caefd');
          $('#s8').css('background', '#5caefd');
          $('#s9').css('background', '#5caefd');
          $('#s10').css('background', '#5caefd');
          $('#s11').css('background', '#5caefd');
          $('#s12').css('background', '#5caefd');
          $('#s13').css('background', '#f0f0f0');
        } else if (v <= 55 && v > 50) {
          $('#s2').css('background', '#5caefd');
          $('#s3').css('background', '#5caefd');
          $('#s4').css('background', '#5caefd');
          $('#s5').css('background', '#5caefd');
          $('#s6').css('background', '#5caefd');
          $('#s7').css('background', '#5caefd');
          $('#s8').css('background', '#5caefd');
          $('#s9').css('background', '#5caefd');
          $('#s10').css('background', '#5caefd');
          $('#s11').css('background', '#5caefd');
          $('#s12').css('background', '#f0f0f0');
          $('#s13').css('background', '#f0f0f0');
        } else if (v <= 50 && v > 45) {
          $('#s2').css('background', '#5caefd');
          $('#s3').css('background', '#5caefd');
          $('#s4').css('background', '#5caefd');
          $('#s5').css('background', '#5caefd');
          $('#s6').css('background', '#5caefd');
          $('#s7').css('background', '#5caefd');
          $('#s8').css('background', '#5caefd');
          $('#s9').css('background', '#5caefd');
          $('#s10').css('background', '#5caefd');
          $('#s11').css('background', '#f0f0f0');
          $('#s12').css('background', '#f0f0f0');
          $('#s13').css('background', '#f0f0f0');
        } else if (v <= 45 && v > 40) {
          $('#s2').css('background', '#5caefd');
          $('#s3').css('background', '#5caefd');
          $('#s4').css('background', '#5caefd');
          $('#s5').css('background', '#5caefd');
          $('#s6').css('background', '#5caefd');
          $('#s7').css('background', '#5caefd');
          $('#s8').css('background', '#5caefd');
          $('#s9').css('background', '#5caefd');
          $('#s10').css('background', '#f0f0f0');
          $('#s11').css('background', '#f0f0f0');
          $('#s12').css('background', '#f0f0f0');
          $('#s13').css('background', '#f0f0f0');
        } else if (v <= 40 && v > 35) {
          $('#s2').css('background', '#5caefd');
          $('#s3').css('background', '#5caefd');
          $('#s4').css('background', '#5caefd');
          $('#s5').css('background', '#5caefd');
          $('#s6').css('background', '#5caefd');
          $('#s7').css('background', '#5caefd');
          $('#s8').css('background', '#5caefd');
          $('#s9').css('background', '#f0f0f0');
          $('#s10').css('background', '#f0f0f0');
          $('#s11').css('background', '#f0f0f0');
          $('#s12').css('background', '#f0f0f0');
          $('#s13').css('background', '#f0f0f0');
        } else if (v <= 35 && v > 30) {
          $('#s2').css('background', '#5caefd');
          $('#s3').css('background', '#5caefd');
          $('#s4').css('background', '#5caefd');
          $('#s5').css('background', '#5caefd');
          $('#s6').css('background', '#5caefd');
          $('#s7').css('background', '#5caefd');
          $('#s8').css('background', '#f0f0f0');
          $('#s9').css('background', '#f0f0f0');
          $('#s10').css('background', '#f0f0f0');
          $('#s11').css('background', '#f0f0f0');
          $('#s12').css('background', '#f0f0f0');
          $('#s13').css('background', '#f0f0f0');
        } else if (v <= 30 && v > 25) {
          $('#s2').css('background', '#5caefd');
          $('#s3').css('background', '#5caefd');
          $('#s4').css('background', '#5caefd');
          $('#s5').css('background', '#5caefd');
          $('#s6').css('background', '#5caefd');
          $('#s7').css('background', '#f0f0f0');
          $('#s8').css('background', '#f0f0f0');
          $('#s9').css('background', '#f0f0f0');
          $('#s10').css('background', '#f0f0f0');
          $('#s11').css('background', '#f0f0f0');
          $('#s12').css('background', '#f0f0f0');
          $('#s13').css('background', '#f0f0f0');
        } else if (v <= 25 && v > 20) {
          $('#s2').css('background', '#5caefd');
          $('#s3').css('background', '#5caefd');
          $('#s4').css('background', '#5caefd');
          $('#s5').css('background', '#5caefd');
          $('#s6').css('background', '#f0f0f0');
          $('#s7').css('background', '#f0f0f0');
          $('#s8').css('background', '#f0f0f0');
          $('#s9').css('background', '#f0f0f0');
          $('#s10').css('background', '#f0f0f0');
          $('#s11').css('background', '#f0f0f0');
          $('#s12').css('background', '#f0f0f0');
          $('#s13').css('background', '#f0f0f0');
        } else if (v <= 20 && v > 15) {
          $('#s2').css('background', '#5caefd');
          $('#s3').css('background', '#5caefd');
          $('#s4').css('background', '#5caefd');
          $('#s5').css('background', '#f0f0f0');
          $('#s6').css('background', '#f0f0f0');
          $('#s7').css('background', '#f0f0f0');
          $('#s8').css('background', '#f0f0f0');
          $('#s9').css('background', '#f0f0f0');
          $('#s10').css('background', '#f0f0f0');
          $('#s11').css('background', '#f0f0f0');
          $('#s12').css('background', '#f0f0f0');
          $('#s13').css('background', '#f0f0f0');
        } else if (v <= 15 && v > 10) {
          $('#s2').css('background', '#5caefd');
          $('#s3').css('background', '#5caefd');
          $('#s4').css('background', '#f0f0f0');
          $('#s5').css('background', '#f0f0f0');
          $('#s6').css('background', '#f0f0f0');
          $('#s7').css('background', '#f0f0f0');
          $('#s8').css('background', '#f0f0f0');
          $('#s9').css('background', '#f0f0f0');
          $('#s10').css('background', '#f0f0f0');
          $('#s11').css('background', '#f0f0f0');
          $('#s12').css('background', '#f0f0f0');
          $('#s13').css('background', '#f0f0f0');
        } else if (v <= 10 && v > 5) {
          $('#s2').css('background', '#5caefd');
          $('#s3').css('background', '#f0f0f0');
          $('#s4').css('background', '#f0f0f0');
          $('#s5').css('background', '#f0f0f0');
          $('#s6').css('background', '#f0f0f0');
          $('#s7').css('background', '#f0f0f0');
          $('#s8').css('background', '#f0f0f0');
          $('#s9').css('background', '#f0f0f0');
          $('#s10').css('background', '#f0f0f0');
          $('#s11').css('background', '#f0f0f0');
          $('#s12').css('background', '#f0f0f0');
          $('#s13').css('background', '#f0f0f0');
        } else if (v <= 5 && v >= 0) {
          $('#s2').css('background', '#f0f0f0');
          $('#s3').css('background', '#f0f0f0');
          $('#s4').css('background', '#f0f0f0');
          $('#s5').css('background', '#f0f0f0');
          $('#s6').css('background', '#f0f0f0');
          $('#s7').css('background', '#f0f0f0');
          $('#s8').css('background', '#f0f0f0');
          $('#s9').css('background', '#f0f0f0');
          $('#s10').css('background', '#f0f0f0');
          $('#s11').css('background', '#f0f0f0');
          $('#s12').css('background', '#f0f0f0');
          $('#s13').css('background', '#f0f0f0');
        }
      },
      played() {
        if (this.played) {
          clearInterval(this.TM);
        } else {
          if (this.value == 64) {
            this.value = 0;
          }
          this.TM = setInterval(() => {
            if (this.value == 63) {
              this.played = true;
              clearInterval(this.TM);
            }
            this.value++;
          }, 100)
        }
      }
    },
    methods: {
      //计算区块大小
      getViewSize() {
        var W = window.innerWidth - 160;
        var H = window.innerHeight - 72;
        if (W / H > 680 / 410) {
          this.ViewW = parseInt(680 * H / 410);
          this.ViewH = H;
          this.zoomF = {
            'transform': 'scale(' + H / 410 + ')',
            'transform-origin': 'left top',
            '-moz-transform': 'scale(' + H / 410 + ')',
            '-moz-transform-origin': 'left top',
          };
          this.ZOOM = H / 410;
        } else {
          this.ViewW = W;
          this.ViewH = parseInt(420 * W / 680);
          this.zoomF = {
            'transform': 'scale(' + W / 680 + ')',
            'transform-origin': 'left top',
            '-moz-transform': 'scale(' + W / 680 + ')',
            '-moz-transform-origin': 'left top',
          };
          this.ZOOM = W / 680;
        }
        $('.ViewSpace').height(this.ViewW * 9 / 17 + 'px');
        $('#uislider').css('left', this.ViewW * 13 / 272 + 'px');
        $('.imgBtn').css('right', this.ViewW * 30 / 272 + 'px');
      },
      //重置
      resetWidget() {
        clearInterval(this.TM);
        this.value = 0;
        this.num = 1;
        this.played = true;
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
    width: calc(100% - 60px);
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

  .aside_reset {
    margin: 20px 24px;
    float: right;
  }

  .btn_space .UI-btn {
    margin-bottom: 15px;
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
    bottom: 40px;
    margin: auto;
  }

  .ViewSpace {
    width: 100%;
  }

  .ViewSpace img {
    width: 100%;
    height: 100%;
  }

  .imgBtn {
    position: relative;
    float: right;
  }

  .leftImg {
    width: 130px;
    height: 109px;
    position: absolute;
    right: 30px;
    bottom: 160px;
  }

  #uislider {
    position: absolute;
  }

  #uislider > div#sliderP {
    position: absolute;
    background: transparent;
    top: 16px;
    left: 17px;
    width: 461px;
    height: 14px;
    z-index: 1;
  }

  #uislider > div#sliderP > span {
    width: 12px;
    height: 12px;
    background: #f0f0f0;
    border-radius: 50%;
    position: absolute;
    top: -1px;
  }

  #sliderP h5 {
    font-weight: 500;
    margin-top: -4px;
    width: 30px;
    height: 20px;
    margin-left: 25px;
    text-align: center;
    display: none;
  }

  #uislider > div#sliderP > span#s1 {
    left: 0;
    top: 1px;
    background: #5caefd;
  }

  #uislider > div#sliderP > span#s2 {
    left: 36px;
    top: 1px;
  }

  #uislider > div#sliderP > span#s3 {
    left: 73px;
    top: 1px;
  }

  #uislider > div#sliderP > span#s4 {
    left: 110px;
    top: 1px;
  }

  #uislider > div#sliderP > span#s5 {
    left: 148px;
    top: 1px;
  }

  #uislider > div#sliderP > span#s6 {
    left: 185px;
    top: 1px;
  }

  #uislider > div#sliderP > span#s7 {
    left: 223px;
    top: 1px;
  }

  #uislider > div#sliderP > span#s8 {
    left: 264px;
    top: 1px;
  }

  #uislider > div#sliderP > span#s9 {
    left: 300px;
    top: 1px;
  }

  #uislider > div#sliderP > span#s10 {
    left: 337px;
    top: 1px;
  }

  #uislider > div#sliderP > span#s11 {
    left: 376px;
    top: 1px;
  }

  #uislider > div#sliderP > span#s12 {
    left: 412px;
    top: 1px;
  }

  #uislider > div#sliderP > span#s13 {
    left: 449px;
    top: 1px;
  }

  #uislider > div#sliderP > span#s14 {
    left: 485px;
    top: 1px;
  }

  .rightSide {
    width: 160px;
    height: 100%;
    float: right;
  }

  .textSpan {
    top: 85%;
    position: absolute;
    font-size: 15px;
    margin-left: 5%;
  }
</style>
