<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <ui-btn id="button0" type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div class="ViewSpace">
        <div :style="[zoom]" class="viewBox">
          <div class="imgWrap">
            <!-- </div> -->
            <!-- <img :src="'static/img/a'+num+'.png'"> -->
            <div class="describeText" v-if="!value&&!isPlayed">
              精原细胞减数第一次分裂中期
            </div>
            <div class="view_space" :style="'background-image:url('+src+');'"></div>
          </div>
        </div>
      </div>
      <div class="footer" :style="'zoom:'+zoomF+';margin-left:'+marginL+'px;'">
        <ui-slider id='slider' :zoom="zoomF" class="footerSlider" :realTime="true" :min="0" :max="201" :title="false" :box="false" :boxWidth="480" :boxHeight="108" :tooltip="false" :speed="0" v-model='value' :label="[['','初级精母细胞'],['','次级精母细胞'],['','精细胞']]">
        </ui-slider>
        <div class="choose">
          <div class="mask" v-if="masked"></div>
          <ui-btn size="big" type="switch" v-model="checked1" id="button1">减I异常</ui-btn>
          <ui-btn size="big" type="switch" v-model="checked2" id="button2">减II异常</ui-btn>
        </div>
        <div class="footerBtn" @click="played" id="button3">
          <img :src="changePlayImg">
        </div>
      </div>
    </div>
    <!--侧边按钮区-->
  </div>
</template>
<script>
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider';
export default {
  name: 'app',
  components: { uiBtn, uiSlider },
  data() {
    return {
      title: '减数分裂中的异常',
      BtnSpaceStyle: 'flex',
      zoom: {}, //区域大小
      timer: null,
      isPlayed: false,
      value: 0,
      src:'./static/1/a0.png',
      changePlayImg: "static/img/play@2x.png",
      sliderPoint: [0, 99, 201],
      index: 0,
      checked1: false,
      checked2: false,
      masked: false,
      zoomF:window.innerWidth-170>860?1:(window.innerWidth-170)/860,
      marginL:window.innerWidth-170>860?(window.innerWidth-860)/2:118/(window.innerWidth-170)/860
    }
  },
  created() {
    document.title = this.title;
  },
  mounted() {
    this.resize();
    this.getViewSize();
    $('#slider').append('<div id="sliderP"><span id="s1"></span><span id="s2"></span><span id="s3">');
    this.setSliderPonint();
//    this.getSliderWidth();
  },
  watch: {
    // 1:减12正常 2：减1异常 3：减2异常 4：减12异常
    value() {
      this.secChange();
      let indexArr = this.sliderPoint.filter((value)=>{
        return value <= this.value;
      })
      let ind = indexArr.length;
      this.index = indexArr.length - 1;
      $('#sliderP span:lt(' + ind + ')').css('background', '#5caefd')
      $('#sliderP span:gt(' + (indexArr.length - 1) + ')').css('background', '#f0f0f0')
    },
    checked1(){
        this.secChange();
    },
    checked2(){
        this.secChange();
    }
  },
  methods: {
      secChange(){
          var I = new Image();
          var fileNum;
          if (!this.checked1 && !this.checked2) {
              fileNum = 'a';
          } else if (this.checked1 && !this.checked2) {
              fileNum = 'b';
          } else if (!this.checked1 && this.checked2) {
              fileNum = 'c';
          } else {
              fileNum = 'd';
          }
          I.src = './static/1/'+fileNum + this.value + '.png';
          I.onload = ()=>{
              this.src=I.src;
          }
      },
    //计算滑条各点的位置
    setSliderPonint() {
      let vm = this;
      let sliderW = $('#slider').width();
      $('#sliderP span').each(function() {
        $(this).index();
        $(this).css("left", sliderW * vm.sliderPoint[$(this).index()] / 201 - 7)
      })
      $('.ui-label li').each(function() {
        $(this).index();
        $(this).css("left", sliderW * vm.sliderPoint[$(this).index()] / 201 + 47)
      })

    },
//    getSliderWidth() {
//      let W = document.querySelector('.ui-piecewise').offsetWidth;
//      let processL = document.querySelector('.vue-slider-process');
//      // processL.style.background = `linear-gradient(to right,#5caefd 0px,#5caefd ${W*63/568}px,#0ceaed ${W*63/568}px,#0ceaed ${W*351/568}px,#09f49e ${W*315/568}px,#09f49e 100%)`;
//    },

    //计算区块大小
    getViewSize() {
      const W = window.innerWidth;
      const H = window.innerHeight - 206;
      if (W / H >= 1020 / 540) {
        this.zoom = {
          zoom: H / 540
        }
      } else {
        this.zoom = {
          zoom: W / 1020
        }
      }
      if (window.innerWidth-170>860) {
          this.zoomF = 1;
          this.marginL=(window.innerWidth-860)/2;
      } else {
          this.zoomF = (window.innerWidth-170)/860;
          this.marginL=115/this.zoomF;
      }
    },

    //窗口大小更改
    resize() {
      const vm = this;
      window.addEventListener('resize', function() {
        vm.getViewSize();
        vm.setSliderPonint();
        //若直接调用该函数，会出现当窗口大小改变过快时，js获取的滑条宽度和实际滑条宽度不一样，从而导致渐变色不在需求点上，
        //分析原因可能为函数调用栈顺序出错；开启延时定时器，让函数进入队列，永远在resize事件后闲时触发；
//        vm.timer = setTimeout(function() {
//          vm.getSliderWidth();
//        }, 20)
      })
    },

    //play按钮
    played() {
      if (!this.isPlayed) {
        this.masked = true;
        this.changePlayImg = 'static/img/pause@2x.png';
        if (this.value == 201) {
          this.value = 0;
          this.index = -1;
        }
        this.timer = setInterval(()=>{
          if (this.value == 201) {
            this.isPlayed = false;
            this.masked = false;
            this.index = -1;
            this.changePlayImg = 'static/img/play@2x.png';
            clearInterval(this.timer);
          } else {
            this.value++;
          }
        }, 60)
      } else {
        clearInterval(this.timer);
        this.masked = false;
        this.changePlayImg = 'static/img/play@2x.png';
      }
      this.isPlayed = !this.isPlayed;
    },

    //重置
    resetWidget() {
      clearInterval(this.timer);
      this.value = 0;
      this.isPlayed = false;
      this.changePlayImg = 'static/img/play@2x.png';
      this.checked1 = false;
      this.checked2 = false;
      this.masked = false;
    },
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
  width: 100%;
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
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
}

.btn_space .UI-btn {
  margin-bottom: 15px;
  line-height: 35px;
}

.btn_space .UI-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn_space h3 {
  font-size: 18px;
  font-weight: normal;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
}

.UI-btn.btn-blue {
  color: #000;
}

sup {
  font-size: 14px;
  color: #373334;
}

sup.small {
  color: #FF546B;
}


/*视图区*/

.ViewSpace {
  width: 100%;
  height: calc(100% - 206px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ViewSpace .viewBox {
  position: relative;
  width: 1020px;
  height: 540px;
  padding: 20px 0;
}

.viewBox .imgWrap {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 1020px;
  height: 540px;
}

.imgWrap .describeText {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 20px;
  line-height: 26px;
  font-size: 16px;

  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
  border: solid 0.5px rgba(0, 0, 0, 0.06);
}

.imgWrap .describeText p:first-child {
  margin-bottom: 16px;
}

.imgWrap .view_space {
  display: inline-block;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: 90% 50%;
}

.footer {
  /*margin-left: 115px;*/
  width:860px;
  /*display: flex;*/
  align-items: center;
  height: 110px;
  font-size: 16px;
  position: fixed;
  bottom:24px;
}
.footer>div{
  float: left;
}
.footerSlider {
  /*flex-grow: 1;*/
  font-size: 16px;
  width:480px;
  height: 108px;
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
  border: solid 0.5px rgba(0, 0, 0, 0.06);
}

.choose {
  width: 240px;
  position: relative;
  z-index: 5;
  margin: 0 35px;
  margin-top: 5px;
}

.choose .mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
}
.vue-slider {
  /* margin:45px auto !important;*/
}

.ui-label {
  width: 95% !important;
}

/*@media screen and (max-width: 834px) {*/
  /*#slider .ui-label li {*/
    /*font-size: 12px;*/
  /*}*/
/*}*/

/*@media screen and (max-width: 834px) {*/

  /*.choose,*/
  /*#button1,*/
  /*#button2 {*/
    /*width: 180px;*/
  /*}*/
/*}*/

#slider>div#sliderP {
  position: absolute;
  background: transparent;
  top: 56px;
  width: calc(100% - 84px);
  height: 14px;
  z-index: 1
}

#slider>div#sliderP>span {
  display: inline-block;
  width: 14px;
  height: 14px;
  background: #f0f0f0;
  border-radius: 50%;
  position: absolute;
}

.footerBtn {
  position: relative;
  z-index: 10;
  width: 70px;
  height: 87px;
  margin-top: 10px;
  cursor: pointer;
}

.footerBtn img {
  width: 100%;
  height: 100%;
}

.itemlist-enter-active,
.itemlist-leave-active {
  transition: all 2s;
}

.itemlist-enter,
.itemlist-leave-active {
  opacity: 0;
}
</style>
