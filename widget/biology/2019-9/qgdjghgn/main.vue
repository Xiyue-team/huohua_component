<template>
  <div class="aspectration bg_white covered root_div_container " style="background: #53585F">
      <fullScreensLayout >
              <template slot="viewBox" slot-scope="viewBox" >
                  <div class="title_text">{{lang.title}}</div>
                  <div style="width: 100%; height: 100%; position: absolute">
                      <img src="./sub_static/background.png" style="width: 100%; height: 100%" ondragstart="return false">
                  </div>
                  <div id="3dContainer" style="position: absolute; width:100%; height:100%">
                        <canvas id="canvas" width="1024" height="576"></canvas>
                  </div>
                  <div class="videoBox" v-show="videoActive_start">
                      <video id="tongueVideo" class="video-js VideoStyle vjs-default-skin vjs-big-play-none"
                             x-webkit-airplay="true"
                             preload="auto"
                             x5-playsinline
                             playsinline
                             webkit-playsinline
                             ref="icon"
                             :poster="videoPoster"
                             style="object-fit:fill">
                          <source id="sourceId1" ref="icon" src="./sub_static/video/trachea.mp4" type="video/mp4">
                      </video>
                      <div class="video_annotationText">
                        <span>{{lang.video_annotationTitle}}</span>
                      </div>
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
        z-index: 7;
    }

    /*视频的样式*/
    .videoBox {
        position: absolute;
        width: 452px;
        height: 398px;
        top: calc(50% - 200px);
        left: calc(50% - 225px);
        overflow: hidden;
    }

    .VideoStyle {
        width: 100%;
        height:100%;
    }

    .video_annotationText {
        position: absolute;
        top: 23px;
        left: 44px;
        color: #ffffff;
        font-size: 16px;
    }

    @media screen and (max-width: 740px) {
        .title_text {
            top: 12px;
            left: 12px;
            line-height: 18px;
            font-size: 18px;
        }

        .video_annotationText {
            font-size: 18px;
            top: 14px;
            left: 18px;
        }
    }
</style>
<style>
@media screen and (max-width: 610px), screen and (max-height: 610px) {
    .control_div_resetBtn {
        right: 12px;
        top: 0;
        transform: scale(0.7);
    }
}
</style>
