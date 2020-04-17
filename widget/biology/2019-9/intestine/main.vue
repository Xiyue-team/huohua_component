<template>
  <div class="aspectration bg_white covered root_div_container " style="background: #53585F">
      <fullScreensLayout >
              <template slot="viewBox" slot-scope="viewBox" >
                  <div class="title_text">{{title}}</div>
                  <div style="width: 100%; height: 100%;position: absolute">
                      <img src="./sub_static/background.png" style="width: 100%; height: 100%">
                  </div>
                  <div id="3dContainer" style="position: absolute;width: 100%; height: 100%;z-index: 1">
                        <canvas id="canvas" width="1024" height="576"></canvas>
                  </div>
                  <div class="videoBox" v-show="videoActive">
                      <video id="intestineVideo" class="video-js VideoStyle vjs-default-skin vjs-big-play-none"
                             x-webkit-airplay="true"
                             preload="auto"
                             x5-playsinline playsinline
                             webkit-playsinline
                             ref="icon"
                             style="border-radius:10px;object-fit:fill">
                          <source id="sourceId1" ref="icon" src="./sub_static/video/intestine.mp4" type="video/mp4">
                      </video>
                  </div>

              </template>

              <template slot="controlPanel" slot-scope="controlPanel">

              </template>
          </fullScreensLayout>

  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
import { ViewModel } from './ViewModel';
import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';
import Component from 'vue-class-component';
require('./sub_static/video-js.css');

@Component({
  components: {
    fullScreensLayout,
    buttonPrimary
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_text{
        font-size: 24px;
        color: #ffffff;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
        z-index: 99;
    }
    /*视频的样式*/
    .videoBox {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
    .VideoStyle {
        width: 100%;
        height:100%;
        outline: none;
    }
    @media screen and (max-width: 610px), screen and (max-height: 610px) {
        .title_text {
            top: 12px;
            left: 12px;
            line-height: 18px;
            font-size: 18px;
        }
    }
</style>
<style>
/*.canvas-container {*/
    /*margin: 0 auto;*/
/*}*/
@media screen and (max-width: 610px), screen and (max-height: 610px) {
    .control_div_resetBtn {
        right: 12px;
        top: 0;
        transform: scale(0.7);
    }
}
</style>
