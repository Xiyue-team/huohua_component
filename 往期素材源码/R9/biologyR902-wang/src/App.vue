<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <ui-btn id="button1" type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div class="ViewSpace">
        <div class="viewBox">
          <div class="imgWrap" :style="'background-image:url(./static/img/bg.png);'">
            <div class="view_space" :style="'background-image:url(./static/img/a'+num+'.png);'"></div>
          </div>
        </div>
      </div>
      <div class="footer">
        <ui-slider id='slider' class="footerSlider" :min="0" :max="400" :title="false" :box="false" :boxHeight="58" :tooltip="false" :speed="0" :timeLine="false" v-model='value' :label="[['间期',''],['前期',''],['中期',' '],['后期',''],['末期',' ']]"> </ui-slider>
        <div class="footerBtn" @click="played" id="button2"> <img :src="changePlayImg"> </div>
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
      title: '植物细胞的有丝分裂 ',
      BtnSpaceStyle: 'flex',
      zoom: {}, //区域大小
      timer: null,
      isPlayed: false,
      value: 0,
      num: 0,
      timer: null,
      changePlayImg: "static/img/play@2x.png",
      sliderPoint: [0, 80, 160, 240, 320, 400],
      index: 0,
      colorArr: ['#5caefd', '#16C6F6', '#09F4E3', '#09F442', '#D0F409','lightgreen'],
      pre:-1,
    }
  },
  created() {
    document.title = this.title;
  },
  mounted() {
    this.resize();
    this.getViewSize();
    $('#slider').append('<div id="sliderP"><span id="s1"></span><span id="s2"></span><span id="s3"></span><span id="s4"></span><span id="s5"></span><span id="s6"></div>');
    this.setSliderPonint();
    this.getSliderWidth();
  },
  computed: {},
  watch: {
    value(v) {
      var I = new Image();
      I.src = './static/img/a' + v + '.png';
      var thiz = this;
      I.onload = function() {
        thiz.num = v;
      }
      if (Math.trunc(v / 80) == this.pre) return;
      console.log(1);
      this.pre = (v / 80) | 0;
      let indexArr = this.sliderPoint.forEach(function(value,index) {
        if(value<=v){
          $('#sliderP span').eq(index).css('background', thiz.colorArr[index]);
        }else {
          $('#sliderP span').eq(index).css('background', '#f0f0f0');
        }
      })
    }
  },
  methods: {
    //计算滑条各点的位置
    setSliderPonint() {
      let vm = this;
      let sliderW = $('#slider').width();
      $('#sliderP span').each(function() {
        $(this).index();
        $(this).css("left", sliderW * vm.sliderPoint[$(this).index()] / 400 - 7)
      })
      $('.ui-label li').each(function() {
        $(this).index();
        $(this).css("left", sliderW * vm.sliderPoint[$(this).index()] / 400 + 22)
      })
    },
    getSliderWidth() {
      let W = document.querySelector('.ui-piecewise').offsetWidth;
      let processL = document.querySelector('.vue-slider-process');
      processL.style.background = `linear-gradient(to right,#5caefd 0px,#5caefd ${W*80/400}px,#16C6F6 ${W*80/400}px,#16C6F6 ${W*160/400}px,#09F4E3 ${W*160/400}px,#09F4E3 ${W*240/400}px,#09F442 ${W*240/400}px,#09F442 ${W*320/400}px,#D0F409 ${W*320/400}px,#D0F409 100%)`;
    },
    //计算区块大小
    getViewSize() {
      const W = this.W = window.innerWidth;
      const H = this.H = window.innerHeight - 206;
      if (W / H >= 1020 / 540) {
        this.zoom = {
          zoom: H / 540
        }
      } else {
        this.zoom = {
          zoom: W / 1020
        }
      }
    },
    //窗口大小更改
    resize() {
      const vm = this;
      window.addEventListener('resize', function() {
        vm.getViewSize();
        vm.setSliderPonint();
        clearTimeout(vm.timer);
        //若直接调用该函数，会出现当窗口大小改变过快时，js获取的滑条宽度和实际滑条宽度不一样，从而导致渐变色不在需求点上，
        //分析原因可能为函数调用栈顺序出错；开启延时定时器，让函数进入队列，永远在resize事件后闲时触发；
        vm.timer = setTimeout(function() {
          vm.getSliderWidth();
        }, 20)
      })
    },
    //play按钮
    played() {
      var thiz = this;
      if (!this.isPlayed) {
        this.changePlayImg = 'static/img/pause@2x.png';
        if (thiz.value == 400) {
          thiz.value = 0;
          thiz.index = -1;
        }
        this.timer = setInterval(function() {
          if (thiz.value == 400) {
            thiz.isPlayed = false;
            thiz.index = -1;
            thiz.changePlayImg = 'static/img/play@2x.png'
            clearInterval(thiz.timer);
          } else {
            thiz.value++;
          }
        }, 60)
      } else {
        clearInterval(thiz.timer);
        this.changePlayImg = 'static/img/play@2x.png'
      }
      this.isPlayed = !this.isPlayed;
    },
    //重置
    resetWidget() {
      clearInterval(this.timer);
      this.value = 0;
      this.isPlayed = false;
      this.changePlayImg = 'static/img/play@2x.png'
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
  margin: 16px 24px 10px;
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
  height: calc(100% - 196px);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ViewSpace .viewBox {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px 0;
  margin: 0 24px 0;
}

.viewBox .imgWrap {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  padding: 10px;
  background-repeat: no-repeat;
  background-position: center;
  background-clip: content-box;
  background-size:cover;
  
  
  border: 1px solid rgba(121, 121, 121, 0.27);
  box-shadow: 0 1px 3px 0 rgba(168, 168, 168, 0.60);
  border-radius: 6px;
}

.imgWrap .describeText {
  position: absolute;
  top: 100px;
  right: 50px;
  width: 300px;
  padding: 16px 20px;
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
  background-position: center;
  background-clip: content-box;
  background-size: 100% auto ;
}

.footer {
  display: flex;
  align-items: center;
  margin: 0 24px 24px 100px;
  padding-right: 20px;
  padding-left: 10px;
  height: 100px;
  font-size: 16px;
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
  border: solid 0.5px rgba(0, 0, 0, 0.06);
}

.footerSlider {
  margin: 0 30px;
}

.vue-slider {
  /* margin:45px auto !important;*/
}

.ui-label {
  width: 95% !important;
}

@media screen and (max-width: 834px) {
  .footerSlider {
    padding: 0 22px !important;
    margin: 0;
  }
}

#slider>div#sliderP {
  position: absolute;
  background: transparent;
  top: 16px;
  width: calc(100% - 44px);
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

.footerSlider {
  flex-grow: 1;
  font-size: 16px;
}

.footerBtn {
  position: relative;
  z-index: 10;
  width: 70px;
  height: 87px;
  cursor: pointer;
}

.footerBtn img {
  width: 100%;
  height: 100%;
}
</style>