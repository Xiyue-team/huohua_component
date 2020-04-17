<template>
  <div class="aspectration bg_white covered root_div_container " style="background: #53585F">
      <fullScreensLayout >
              <template slot="viewBox" slot-scope="viewBox" >
                  <div class="title_text">{{lang.title}}</div>
                  <div class="background_style">
                  </div>
                  <div id="3dContainer" style="position: absolute; width:100%; height:100%; z-index: 7">
                        <canvas id="canvas" width="1024" height="576"></canvas>
                  </div>
                      <div class="videoBox">
                          <video id="tongueVideo" class="video-js VideoStyle vjs-default-skin vjs-big-play-none"
                                 x-webkit-airplay="true"
                                 autoplay muted
                                 preload="auto"
                                 x5-playsinline playsinline
                                 webkit-playsinline
                                 x5-video-player-type="h5"
                                 x5-video-player-fullscreen="true"
                                 x5-video-orientation="landscape"
                                 ref="icon"
                                 :poster="videoOnePoster"
                                 style="object-fit:fill">
                              <source id="sourceId1" ref="icon" src="./sub_static/video/ys_start.mp4" type="video/mp4">
                          </video>
                      </div>
                      <div class="gill_mask_class">
                          <img src="./sub_static/gill_mask.png" style="width: 100%; height: 100%;"/>
                      </div>
                  <div class="videoBox22" v-show="videoActive_end">
                      <video id="ys_endVideo" class="video-js VideoStyle vjs-default-skin vjs-big-play-none"
                             x-webkit-airplay="true"
                             preload="auto"
                             autoplay muted
                             x5-playsinline playsinline
                             webkit-playsinline
                             x5-video-player-type="h5"
                             x5-video-player-fullscreen="true"
                             x5-video-orientation="landscape"
                             ref="icon"
                             :poster="videoTwoPoster"
                             style="object-fit:fill">
                          <source id="sourceId2" ref="icon" src="./sub_static/video/ys_end.mp4" type="video/mp4">
                      </video>
                  </div>
                  <div class="video_annotation" v-show="videoActive_end">
                      <span style="color: #ffffff; font-size: 20px">{{lang.video_annotationTitle}}</span>
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
        z-index: 8;
    }

    .background_style {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: #484547
    }

    /*视频的样式*/
    .videoBox {
        position: absolute;
        width: 1024px;
        height: 576px;
        z-index: 5;
        top: calc(50% - 288px);
        left: calc(50% - 512px);
        overflow: hidden;
        opacity: 1;
        transition: opacity 1s linear;
    }

    .gill_mask_class {
        width: 1024px;
        height: 576px;
        position: absolute;
        top: calc(50% - 288px);
        left: calc(50% - 512px);
        z-index: 6;
        opacity: 1;
        transition: opacity 1s linear;
    }

    .videoBox22 {
        position: absolute;
        width: 1024px;
        height: 576px;
        z-index: 6;
        top: calc(50% - 288px);
        left: calc(50% - 512px);
    }

    .VideoStyle {
        width: 100.5%;
        height:100.5%;
    }

    .video_annotation {
        position: absolute;
        text-align: left;
        width: 665px;
        height: 62px;
        left: calc(50% - 227px);
        bottom: 7.5%;
        z-index: 10;
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
@media screen and (max-width: 610px), screen and (max-height: 610px) {
    .control_div_resetBtn {
        right: 12px;
        top: 0;
        transform: scale(0.7);
    }
}

    .video-js .vjs-tech {
        top: -2px !important;
        left: -2px !important;
    }

    .video-js {
        overflow: hidden !important;
    }
</style>
