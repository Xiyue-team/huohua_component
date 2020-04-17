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

        </div>
      </div>
      <ui-slider > </ui-slider>
    </div>
    <ui-btn type="play" v-model="played" style="position: absolute;bottom: 20px;right: 20px" @click.native="play" id="playBtn"></ui-btn>
  </div>
</template>

<script>
  import $ from 'jquery'
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  import uiSlider from '@/components/UI/uiSlider';//滑条
  export default {
    name: 'app',
    components: {uiHead, uiBtn, uiSlider},
    data() {
      return {
        title: '湖泊的演变 ',
        played: true,
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
      //播放
      play() {
        if (this.played) {

        } else {

        }
      },
      //重置
      resetWidget() {

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
</style>
