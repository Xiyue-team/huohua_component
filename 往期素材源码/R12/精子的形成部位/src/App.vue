<template>
  <div id="app" class="noselect">
    <!--头部-->
    <ui-head :title="title">
      <ui-btn type="reset1" @click.native="resetWidget" id="rest"></ui-btn>
    </ui-head>
    <!--模型区域-->
    <div class="container">
      <div class="bg">
        <img src="static/UI/befor.png" alt="" class="bgImg" v-show="show == 1">
        <img src="static/UI/after.png" alt="" class="bgImg" v-show="show == 2">
        <img :src="item" alt="" class="bgImg" v-show="show == 3" v-for="(item,index) in imgList"
             :style="gifNum== index?'opacity:1':'opacity:0;position: absolute;'">
      </div>
      <div class="touch1" v-show="show == 1" @click="touchClick(1)">
        <img :src="'static/UI/touch'+num+'.png'" alt="">
      </div>
      <div class="touch2" v-show="show == 2" @click="touchClick(2)">
        <img :src="'static/UI/touch'+num+'.png'" alt="">
      </div>
    </div>
    <div class="textDiv" v-text="show == 1?'睾丸':show == 2?'睾丸内部':'曲细精管'"></div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//头部
  export default {
    name: 'app',
    components: {uiHead, uiBtn},
    data() {
      return {
        title: '精子的形成部位 ',
        show: 1,
        num: 1,
        time: null,
        time1: null,
        gifNum: 1,
        gifTime: null,
        imgList: ['static/UI/1.png', 'static/UI/2.png', 'static/UI/3.png', 'static/UI/4.png', 'static/UI/5.png', 'static/UI/6.png', 'static/UI/7.png', 'static/UI/8.png', 'static/UI/9.png', 'static/UI/10.png', 'static/UI/11.png', 'static/UI/12.png', 'static/UI/13.png', 'static/UI/14.png', 'static/UI/15.png', 'static/UI/16.png', 'static/UI/17.png', 'static/UI/18.png', 'static/UI/19.png', 'static/UI/20.png']
      }
    },
    mounted() {
      document.title = this.title;
      this.setStyle();
      window.onresize = () => {
        this.setStyle();
      };
      let value1 = 1;
      var TM = setInterval(() => {
        if (value1 == 10) {
          value1 = 0;
        }
        value1++;
        var I = new Image();
        I.src = 'static/UI/touch' + value1 + '.png';
        I.onload = () => {
          this.num = value1;
        }
      }, 100);
    },
    computed: {},
    methods: {
      touchGIF() {
        let value1 = 1;
        this.gifTime = setInterval(() => {
          if (value1 == 19) {
            clearInterval(this.gifTime);
            return;
          }
          value1++;
          var I = new Image();
          I.src = 'static/UI/' + value1 + '.png';
          I.onload = () => {
            this.gifNum = value1;
            this.show = 3;
          }
        }, 80);
      },
      //点击放大
      touchClick(val) {
        if (val == 1) {
          $('.touch1').hide();
          var opacity = 1;
          this.time = setInterval(() => {
            if (opacity <= 0.2) {
              clearInterval(this.time);
              opacity = 0.2;
              $('.bgImg:nth-child(1)').css('opacity', opacity);
              $('.bgImg:nth-child(2)').css('opacity', '0.2');
              this.show = 2;
              this.time1 = setInterval(() => {
                if (opacity >= 1) {
                  clearInterval(this.time1);
                  $('.bgImg:nth-child(2)').css('opacity', '1');
                  return;
                }
                opacity += 0.08;
                $('.bgImg:nth-child(2)').css('opacity', opacity);
              }, 70);
              return;
            }
            opacity -= 0.08;
            $('.bgImg:nth-child(1)').css('opacity', opacity);
          }, 70);
        } else {
          this.touchGIF();
        }
      },
      //重置
      resetWidget() {
        this.show = 1;
        this.gifNum = 1;
        this.show = 1;
        clearInterval(this.time);
        clearInterval(this.time1);
        clearInterval(this.gifTime);
        $('.bgImg:nth-child(1)').css('opacity', '1');
        $('.touch1').show();
      },
      //计算窗口
      setStyle() {
        let windowW = window.innerWidth, windowH = window.innerHeight - 72, bgW = 1024, bgH = 576;
        if (windowW / windowH >= 1024 / 576) {
          bgH = windowH;
          bgW = bgH * 1024 / 576;
        } else {
          bgW = windowW;
          bgH = bgW * 576 / 1024;
        }
        $('.bg,.bgImg').css({
          width: bgW,
          height: bgH
        });
        $('.touch1,.touch2').css({
          width: bgH * 100 / 576,
          height: bgH * 100 / 576
        });
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
    touch-action: none;
    -ms-touch-action: none;
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
    width: 100%;
    height: calc(100% - 76px);
  }

  canvas {
    width: 100%;
    height: 100%;
  }

  .bg {
    background: #FFFFFF;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 10px;
    overflow: hidden;
  }

  .touch1 {
    position: absolute;
    top: 44%;
    right: 55%;
    z-index: 9;
    cursor: pointer;
    width: 100px;
    height: 100px;
  }

  .touch1 img, .touch2 img {
    width: 100%;
    height: 100%;
  }

  .touch2 {
    position: absolute;
    top: 47%;
    right: 41%;
    z-index: 9;
    cursor: pointer;
    width: 100px;
    height: 100px;
  }

  .textDiv {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 20px;
    margin: auto;
    height: 50px;
    width: 150px;
    font-size: 28px;
    text-align: right;
  }
</style>
