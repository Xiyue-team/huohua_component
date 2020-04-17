<template>
  <div id="app" class="noselect">
    <ui-btn id="button1" type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
    <div class="container">
      <!--头部-->
      
      <h3 v-html="title" class="app_title"></h3>
      <!--视图区-->
      <div class="ViewSpace" ref="viewSpace">
        <!-- <div class="viewBox">
          <div class="imgWrap">
            <div class="view_space" :style="'background-image:url(./static/img/a'+num+'.png);'"></div>
          </div></div> -->
          <img ref="mainImg" :src="`static/img/${num}.png`">
      </div>
      <div class="footer">
        <ui-slider id='slider' class="footerSlider" :min="0" :max="200" :title="false" :box="false" :boxHeight="58" :tooltip="false" :speed="0" :timeLine="false" v-model='value'> </ui-slider>
        <div class="footerBtn" @click="played" id="button2"> <img :src="changePlayImg"> </div>
      </div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <ui-btn type='switch' v-model="isShow" class="switch">实验步骤</ui-btn>
    </div>
  </div>
</template>
<script>
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider';
const TOTAL_NUM = 200;
export default {
  name: 'app',
  components: { uiBtn, uiSlider },
  data() {
    return {
      title: 'Fe(OH)<sub>3</sub>胶体的制备',
      BtnSpaceStyle: 'flex',
      zoom: {}, //区域大小
      timer: null,
      isPlayed: false,
      value: 0,
      num: 0,
      timer: null,
      changePlayImg: "static/img/play@2x.png",
      sliderPoint: [0, 65, 145, TOTAL_NUM],
      index: 0,
      isShow: false
    }
  },
  created() {
    document.title = this.title;
  },
  mounted() {
    this.resize();
    // this.getViewSize();
    $('#slider').append('<div id="sliderP"><span id="s1"></span><span id="s2"></span><span id="s3"></span><span id="s4"></span></div>');
    this.setSliderPonint();
    this.getSliderWidth();
    this.setImgAdaptive();
  },
  computed: {},
  watch: {
    value(v) {
      var I = new Image();
      I.src = './static/img/' + v + '.png';
      var thiz = this;
      I.onload = function() {
        thiz.num = v;
      }
      // let indexArr = this.sliderPoint.filter(function(value) {
      //   return value <= v;
      // })
      // let ind = indexArr.length;
      // this.index = indexArr.length - 1;
      // console.log(ind);
      // if (ind == 2) {
      //   $('#sliderP span:lt(' + ind + ')').css('background', '#2066B8')
      //   $('#sliderP span:lt(' + 1 + ')').css('background', '#2066B8')
      // } else if (ind == 3) {
      //   $('#sliderP span:lt(' + ind + ')').css('background', '#0ceaed')
      //   $('#sliderP span:lt(' + 1 + ')').css('background', '#2066B8')
      // } else {
      //   $('#sliderP span:lt(' + ind + ')').css('background', '#09f49e')
      //   $('#sliderP span:lt(' + 5 + ')').css('background', '#0ceaed')
      //   $('#sliderP span:lt(' + 1 + ')').css('background', '#5caefd')
      // }
      // $('#sliderP span:gt(' + (indexArr.length - 1) + ')').css('background', '#f0f0f0')
    }
  },
  methods: {
    //计算滑条各点的位置
    setSliderPonint() {
      let vm = this;
      let sliderW = $('#slider').width();
      $('#sliderP span').each(function() {
        $(this).index();
        $(this).css("left", sliderW * vm.sliderPoint[$(this).index()] / TOTAL_NUM - 7)
      })
      $('.ui-label li').each(function() {
        $(this).index();
        $(this).css("left", sliderW * vm.sliderPoint[$(this).index()] / TOTAL_NUM + 22)
      })
    },
    getSliderWidth() {
      let W = document.querySelector('.ui-piecewise').offsetWidth;
      let processL = document.querySelector('.vue-slider-process');
      processL.style.background = `linear-gradient(to right,#5CAEFD 0px,#5CAEFD ${W*65/TOTAL_NUM}px,#2066B8 ${W*65/TOTAL_NUM}px,#2066B8 ${W*145/TOTAL_NUM}px,#F33636 ${W*145/TOTAL_NUM}px,#F33636 100%)`;
    },
    //计算区块大小
    // getViewSize() {
    //   const W = this.W = window.innerWidth;
    //   const H = this.H = window.innerHeight - 206;
    //   if (W / H >= 1020 / 540) {
    //     this.zoom = {
    //       zoom: H / 540
    //     }
    //   } else {
    //     this.zoom = {
    //       zoom: W / 1020
    //     }
    //   }
    // },
    //图片自适应页面
    setImgAdaptive(){
      let scacleW = this.$refs.viewSpace.clientWidth/1360;
      let scacleH = this.$refs.viewSpace.clientHeight/720;
      if(scacleW>scacleH){
        this.$refs.mainImg.style.width='auto';
        this.$refs.mainImg.style.height='100%';
      }else {
        this.$refs.mainImg.style.width='100%';
        this.$refs.mainImg.style.height='auto%';
      }
    },
    //窗口大小更改
    resize() {
      const vm = this;
      window.addEventListener('resize', function() {
        vm.setImgAdaptive();
        // vm.getViewSize();
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
        if (thiz.value == TOTAL_NUM) {
          thiz.value = 0;
          thiz.index = -1;
        }
        this.timer = setInterval(function() {
          if (thiz.value == TOTAL_NUM) {
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
      this.isShow=false;
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
  width: calc( 100% - 280px);
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
  width: 260px;  height: 100%;
  margin-right:20px;


  /*box-shadow: -0.5px 0 0 rgba(0, 0, 0, 0.12);*/
  display: flex;
  justify-content: center;
  align-items: flex-start;
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
  overflow: hidden;
}
.ViewSpace img {
  width:100%;
  height:auto;
}

.footer {
  display: flex;
  align-items: center;
  margin: 0 20px 24px 70px;
  padding-right: 20px;
  padding-left: 10px;
  height: 110px;
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
  #slider .ui-label li div {
    font-size: 14px;
  }
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
  top: 28px;
  width: calc(100% - 44px);
  height: 14px;
  z-index: 1
}

#slider>div#sliderP>span {
  display: inline-block;
  width: 14px;
  height: 14px;
  /*background: #f0f0f0;*/
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
.switch {
  transform: translateY(200px);
}
#button1 {
  position: fixed;
  right:24px;
  top:24px;
}
#s1,#s4 {
  opacity: 0;
}
#s2 {
  background: #2066B8;
}
#s3 {
  background: #F33636;
}
</style>