<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <ui-btn id="button1" type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div class="ViewSpace">
        <div :style="[zoom]" class="viewBox">
          <div class="imgWrap">
            <div class="describeText" v-if="dynamicText[index]&&value!=0">
              <p v-if v-for="item in dynamicText[index]">{{item}}</p>
            </div>
            <!-- </div> -->
            <!-- <img :src="'static/img/a'+num+'.png'"> -->
            <div class="view_space" :style="'background-image:url(./static/img/a'+num+'.png);'"></div>
          </div>
        </div>
      </div>
      <div class="footer">
        <ui-slider id='slider' class="footerSlider" :min="0" :max="719" :title="false" :box="false" :boxHeight="58" :tooltip="false" :speed="0" :timeLine="false" v-model='value' :label="[[' ','精原细胞'],['',''],['',' '],['减数第一次分裂',''],['',' '],['','次级精母细胞'],['',' '],['减数第二次分裂',''],['',' '],[' ','精细胞']]">
        </ui-slider>
        <div class="footerBtn" @click="played" id="button2">
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
        title: '精原细胞的减数分裂',
        BtnSpaceStyle: 'flex',
        zoom: {}, //区域大小
        timer: null,
        isPlayed: false,
        value: 0,
        num: 0,
        timer: null,
        changePlayImg: "static/img/play@2x.png",
        sliderPoint: [0, 80, 180, 248, 312, 395, 470, 530, 630, 719],
        index: 0,
        dynamicText: [
          ['分裂间期', '占细胞周期时间的90%-95%', '精原细胞的体积增大', '染色体复制'],
          ['减数第一次分裂前期', '同源染色体两两配对'],
          ['减数第一次分裂中期', '各对同源染色体排列在赤道板上，每条染色体的着丝点附着在纺锤丝上'],
          ['减数第一次分裂后期', '在纺锤丝的牵引下，配对的同源染色体彼此分离，分别向细胞的两极移动'],
          ['减数第一次分裂末期', '一个初级精母细胞分裂成了两个次级精母细胞'],
          ['减数第二次分裂前期'],
          ['减数第二次分裂中期', '染色体排列在赤道板上，每条染色体的着丝点附着在纺锤丝上'],
          ['减数第二次分裂后期', '每条染色体的着丝点分裂，两条姐妹染色单体也随之分开，成为两条染色体。在纺锤丝的牵引下，这两条染色体分别向细胞的两极移动'],
          ['减数第二次分裂末期', '两个次级精母细胞经过减数第二次分裂，形成了四个精细胞'],
          ''
        ]
      }
    },
    created() {
      document.title = this.title;
    },
    mounted() {
      this.resize();
      this.getViewSize();
      $('#slider').append('<div id="sliderP"><span id="s1"></span><span id="s2"></span><span id="s3"></span><span id="s4"></span><span id="s5"></span><span id="s6"></span><span id="s7"></span><span id="s8"></span><span id="s9"></span><span id="s10"></span></div>');

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
        let indexArr = this.sliderPoint.filter(function(value) {
          return value <= v;
        })
        let ind = indexArr.length;
        this.index = indexArr.length - 1;
        if (ind < 2) {
          $('#sliderP span:lt(' + ind + ')').css('background', '#5caefd')
        } else if (ind < 6) {
          $('#sliderP span:lt(' + ind + ')').css('background', '#0ceaed')
          $('#sliderP span:lt(' + 1 + ')').css('background', '#5caefd')
        } else {
          $('#sliderP span:lt(' + ind + ')').css('background', '#09f49e')
          $('#sliderP span:lt(' + 5 + ')').css('background', '#0ceaed')
          $('#sliderP span:lt(' + 1 + ')').css('background', '#5caefd')
        }
        $('#sliderP span:gt(' + (indexArr.length - 1) + ')').css('background', '#f0f0f0')

      }

    },
    methods: {

      //计算滑条各点的位置
      setSliderPonint() {
        let vm = this;
        let sliderW = $('#slider').width();
        $('#sliderP span').each(function() {
          $(this).index();
          $(this).css("left", sliderW * vm.sliderPoint[$(this).index()] / 719 - 7)
        })
        $('.ui-label li').each(function() {
          $(this).index();
          $(this).css("left", sliderW * vm.sliderPoint[$(this).index()] / 719 + 22)
        })

      },
      getSliderWidth() {
        let W = document.querySelector('.ui-piecewise').offsetWidth;
        let processL = document.querySelector('.vue-slider-process');
        processL.style.background = `linear-gradient(to right,#5caefd 0px,#5caefd ${W*80/719}px,#0ceaed ${W*80/719}px,#0ceaed ${W*395/719}px,#09f49e ${W*395/719}px,#09f49e 100%)`;
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
          if (thiz.value == 719) {
            thiz.value = 0;
            thiz.index = -1;
          }
          this.timer = setInterval(function() {
            if (thiz.value == 719) {
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
    top: -10px;
    right: 20px;
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
    background: #f0f0f0;
    border-radius: 50%;
    position: absolute;
  }

  #s3,
  #s4,
  #s5,
  #s7,
  #s8,
  #s9 {
    opacity: 0;
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
