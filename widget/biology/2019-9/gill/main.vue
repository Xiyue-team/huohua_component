<template>
  <div class="aspectration bg_white covered root_div_container " style="background: #53585F">
      <fullScreensLayout >
              <template slot="viewBox" slot-scope="viewBox" >
                  <div class="title_text">{{title}}</div>
                  <div style="width: 100%; height: 100%;position: absolute">
                      <img src="./sub_static/background.png" style="width: 100%; height: 100%">
                  </div>
                  <div class="videoBox" v-show="videoActive">
                      <video id="tongueVideo" class="video-js VideoStyle vjs-default-skin vjs-big-play-none"
                             autoplay muted
                             x-webkit-airplay="true"
                             preload="auto"
                             x5-playsinline playsinline
                             webkit-playsinline
                             ref="icon"
                             style="border-radius:10px;object-fit:fill">
                          <source id="sourceId1" ref="icon" src="./sub_static/video/gill.mp4" type="video/mp4">
                      </video>
                      <img src="./sub_static/border.png" style="width: 100%; height: 100%; position: absolute; top: 0px;"
                           v-show="isOriginal">
                      <div class="hitLine" v-show="isOriginal"></div>
                      <div class="hitCircle" @click="startEvent" v-show="isOriginal"></div>
                  </div>
                  <div id="3dContainer" v-show="imageActive" style="width: 100%; height: 100%;">
                        <canvas id="canvas" width="100%" height="100%"></canvas>
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
require('video.js/dist/video-js.css');
require('video.js/dist/video.js');
require('swiper/dist/css/swiper.css');

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
    .backgroundStyle{
        width: 100%;
        height: 100%;
        position: absolute;
    }
    /*视频的样式*/
    .videoBox {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .VideoStyle {
        width: 100%;
        height:100%;
        outline: none;
    }
    .markButton{
        position: absolute;
        top:42%;
        left:30.2%;
        width: 6.3%;
        height:17.2%;
        background: rgba(30,30,30,0.25);
        border: 2px solid #FFFFFF;
        border-radius: 5px;
    }
    .hitLine{
        position: absolute;
        top:50.6%;
        left:17.4%;
        width: 12.9%;
        height:0.2%;
        background: #FFFFFF;
    }
    .hitCircle{
        position: absolute;
        top:49%;
        left:15.8%;
        width: 1.5%;
        border-radius: 50%;
        border: 1px solid #FFFFFF;
        cursor: pointer;
    }
    .hitCircle:hover{
        cursor: pointer;
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
.canvas-container {
    margin: 0 auto;
}
@media screen and (max-width: 610px), screen and (max-height: 610px) {
    .control_div_resetBtn {
        right: 12px;
        top: 0;
        transform: scale(0.7);
    }
}
</style>
