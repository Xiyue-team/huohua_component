<template>
  <div id="app" class="noselect">
    <!--头部-->
    <ui-head :title="title">
      <ui-btn type="reset1" @click.native="resetWidget" id="rest"></ui-btn>
    </ui-head>
    <!--模型区域-->
    <div class="container">
      <div class="bg">
        <div class="bgDIV">
          <img src="static/UI/bg1.png" alt="" class="bgImg" v-show="show == 1">
          <img src="static/UI/dong1.gif" alt="" class="bgImg" :style="'z-index:'+show == 2?10:-10">
          <img src="static/UI/dong2.gif" alt="" class="bgImg" v-show="show == 3">
          <img src="static/UI/dong3.gif" alt="" class="bgImg" v-show="show == 4">
          <img src="static/UI/touch.gif" alt="" class="touch1" @click="touchClick(1)" v-show="show == 1">
          <img src="static/UI/touch.gif" alt="" class="touch2" @click="touchClick(2)" v-show="show == 1">
        </div>
      </div>
      <img src="static/UI/biao1.png" v-show="show == 2" alt="" class="prompt1">
      <img src="static/UI/biao2.png" v-show="show == 3" alt="" class="prompt2">
      <img src="static/UI/biao3.png" v-show="show == 4" alt="" class="prompt3">
    </div>
    <ui-btn type="play" v-model="played" style="position: absolute;bottom: 20px;right: 20px"
            @click.native="play" v-show="show <= 2" id="playBtn"></ui-btn>
  </div>
</template>

<script>
  import $ from 'jquery'
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  export default {
    name: 'app',
    components: {uiHead, uiBtn},
    data() {
      return {
        title: '细胞与内环境的物质交换 ',
        played: true,
        show: 1
      }
    },
    mounted() {
      document.title = this.title;
      this.setStyle();
      window.onresize = () => {
        this.setStyle();
      }
    },
    computed: {},
    methods: {
      //点击放大
      touchClick(val) {
        $('#rest').css('pointer-events', 'none');
        $('#playBtn').css('pointer-events', 'none');
        if (val == 1) {
          this.played = true;
          $('.touch1,.touch2').hide();
          $('.bgImg:nth-child(1)').addClass('enlarge');
          var opacity = 1, time = setInterval(() => {
            if (opacity <= 0.1) {
              clearInterval(time);
              opacity = 0.1;
              $('.bgImg:nth-child(3)').css('opacity', opacity);
              this.show = 3;
              $('.bgImg:nth-child(2)').hide();
              var time1 = setInterval(() => {
                if (opacity >= 1) {
                  clearInterval(time1);
                  $('#rest').css('pointer-events', 'auto');
                  $('#playBtn').css('pointer-events', 'auto');
                  $('.bgImg:nth-child(3)').css('opacity', '1');
                  return;
                }
                opacity += 0.03;
                $('.bgImg:nth-child(3)').css('opacity', opacity);
              }, 20);
              $('.bgImg:nth-child(1)').removeClass('enlarge');
              return;
            }
            opacity -= 0.03;
            $('.bgImg:nth-child(1)').css('opacity', opacity);
          }, 20);
        } else {
          this.played = true;
          $('.touch1,.touch2').hide();
          $('.bgImg:nth-child(1)').addClass('enlarge1');
          var opacity = 1, time = setInterval(() => {
            if (opacity <= 0.1) {
              clearInterval(time);
              opacity = 0.1;
              $('.bgImg:nth-child(4)').css('opacity', opacity);
              this.show = 4;
              $('.bgImg:nth-child(2)').hide();
              var time1 = setInterval(() => {
                if (opacity >= 1) {
                  clearInterval(time1);
                  $('#rest').css('pointer-events', 'auto');
                  $('#playBtn').css('pointer-events', 'auto');
                  $('.bgImg:nth-child(4)').css('opacity', '1');
                  return;
                }
                opacity += 0.03;
                $('.bgImg:nth-child(4)').css('opacity', opacity);
              }, 20);
              $('.bgImg:nth-child(1)').removeClass('enlarge1');
              return;
            }
            opacity -= 0.03;
            $('.bgImg:nth-child(1)').css('opacity', opacity);
          }, 20);
        }
      },
      //播放
      play() {
        if (this.played) {
          this.show = 1;
        } else {
          this.show = 2;
          $('.bgImg:nth-child(2)').show();
        }
      },
      //重置
      resetWidget() {
        this.show = 1;
        this.played = true;
        $('.bgImg').removeClass('enlarge');
        $('.bgImg').removeClass('enlarge1');
        $('.bgImg:nth-child(1)').css('opacity', '1');
        $('.touch1,.touch2').show();
      },
      //计算窗口
      setStyle() {
        let windowW = window.innerWidth - 60, windowH = window.innerHeight - 200, bgW = 976, bgH = 410;
        if (windowW / windowH >= 976 / 410) {
          bgH = windowH;
          bgW = bgH * 976 / 410;
        } else {
          bgW = windowW;
          bgH = bgW * 410 / 976;
        }
        $('.bg').css({
          width: bgW,
          height: bgH
        });
        $('.bgDIV,.bgImg').css({
          width: bgW - 20,
          height: bgH - 20
        });
        $('.touch1').css({
          width: bgH * 51 / 410,
          height: bgH * 51 / 410
        });
        $('.touch2').css({
          width: bgH * 51 / 410,
          height: bgH * 51 / 410
        })
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

  /*ui*/
  .UI-camera {
    width: 80px;
    height: 80px;
    cursor: pointer;
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
    border: 1px solid rgba(121, 121, 121, 0.27);
    box-shadow: 0 1px 3px 0 rgba(168, 168, 168, 0.60);
    border-radius: 6px;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }

  .bgDIV {
    position: relative;
    margin: 10px;
    overflow: hidden;
  }

  .touch1 {
    position: absolute;
    top: 44%;
    right: 50%;
    z-index: 9;
    cursor: pointer;
  }

  .touch2 {
    position: absolute;
    top: 32%;
    right: 18%;
    z-index: 9;
    cursor: pointer;
  }

  .prompt1 {
    width: 294px;
    height: 16px;
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
    margin: 0 auto;
  }

  .prompt2 {
    width: 429px;
    height: 16px;
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
    margin: 0 auto;
  }

  .prompt3 {
    width: 128px;
    height: 16px;
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
    margin: 0 auto;
  }

  /*.enlarge {*/
  /*-webkit-transition: all 1s;*/
  /*-moz-transition: all 1s;*/
  /*-o-transition: all 1s;*/
  /*-webkit-transform: scale(2.4);*/
  /*-moz-transform: scale(2.4);*/
  /*-o-transform: scale(2.4);*/
  /*transform-origin: 45% 55%;*/
  /*}*/

  /*.enlarge1 {*/
  /*-webkit-transition: all 1s;*/
  /*-moz-transition: all 1s;*/
  /*-o-transition: all 1s;*/
  /*-webkit-transform: scale(2);*/
  /*-moz-transform: scale(2);*/
  /*-o-transform: scale(2);*/
  /*transform-origin: 99% 20%;*/
  /*}*/

  .enlarge {
    animation: myfirst 1s;
    -moz-animation: myfirst 1s; /* Firefox */
    -webkit-animation: myfirst 1s; /* Safari 和 Chrome */
    -o-animation: myfirst 1s; /* Opera */
  }

  .enlarge1 {
    animation: myfirst1 1s;
    -moz-animation: myfirst1 1s; /* Firefox */
    -webkit-animation: myfirst1 1s; /* Safari 和 Chrome */
    -o-animation: myfirst1 1s; /* Opera */
  }

  @keyframes myfirst {
    0% {
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -o-transform: scale(1);
      transform-origin: 45% 55%;
    }
    100% {
      -webkit-transform: scale(2.4);
      -moz-transform: scale(2.4);
      -o-transform: scale(2.4);
      transform-origin: 45% 55%;
    }
  }

  @keyframes myfirst1 {
    0% {
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -o-transform: scale(1);
      transform-origin: 100% 19%;
    }
    100% {
      -webkit-transform: scale(2);
      -moz-transform: scale(2);
      -o-transform: scale(2);
      transform-origin: 100% 19%;
    }
  }
</style>
