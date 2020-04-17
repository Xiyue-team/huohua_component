<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div id="3dContainer"></div>
                  <div class="background">
                      <div class="mainContainer">
                          <div class="mainContent">
                              <div class="playButton" @click="play()" v-show="playButton"></div>
                              <div class="candle" v-show="!isPlay"></div>
                              <div class="eye" v-show="!isPlay"></div>
                              <div class="light" id="light" v-show="!isPlay"></div>
                              <div class="candleImage" v-show="isShowCandleImage && !isPlay"></div>
                              <div class="videoBox" v-show="isPlay">

                                  <video id="my-video1" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                         x-webkit-airplay="true"
                                         preload="auto"
                                         x5-playsinline playsinline
                                         x5-video-player-type="h5"
                                         x5-video-player-fullscreen="true"
                                         x5-video-orientation="landscape"
                                         webkit-playsinline
                                         ref="icon"
                                         style="object-fit:fill">
                                      <source id="sourceId1" ref="icon" src="./sub_static/video.mp4" type="video/mp4">
                                  </video>
                                  <div class="textStyle" id="tips">{{config.videoTips}}</div>
                              </div>
                          </div>

                      </div>
                      <div class="sliderPosition">
                          <div  v-bind:class="{'event_disabled': disableSlider}">
                              <vue-slider ref="slider"  v-model="sliderNumber"  v-bind="sliderOption" :marks="marks" style="cursor: pointer">
                                  <template slot="tooltip" scope="tooltip">
                                      <div class="custom-tooltip" style="color: #1A1A1A; font-size: 22px; display: none">
                                      </div>
                                  </template>
                                  <template slot="dot" scope="dot">
                                      <div class="custom-dot dotStyle">
                                      </div>
                                  </template>
                              </vue-slider>
                          </div>
                      </div>

                  </div>
                  <div class="title_text">{{title}}</div>
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
import Component from 'vue-class-component';
import vueSlider from 'vue-slider-component/dist-css/vue-slider-component.common.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'
require('video.js/dist/video-js.css');

@Component({
  components: {
    fullScreensLayout, vueSlider
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_text{
        font-size: 24px;
        color: #FFFFFF;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }

    .background {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #474547;
    }

    .playButton{
        width: 44px;
        height: 44px;
        background: url("./sub_static/play.png");
        background-size: 100% 100%;
        position: absolute;
        left: 370px;
        bottom: 327px;
        z-index: 3;
        cursor: pointer;
    }

    .mainContent{
        width: 1024px;
        height: 576px;
        transform-origin: center;
    }


    .videoBox{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .myVideo {
        width: 100%;
        height: 100%;
        background: #474547;
        position: absolute;
        pointer-events: none;
    }


    .sliderPosition {
        position: absolute;
        bottom: 8%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1024px;
        height: 60px;
        left: calc(50% - 512px);
        z-index: 3;
    }

    @media screen and (max-height: 375px){
        .sliderPosition{
            bottom: 1%;
        }
    }

    .mainContainer {
        position: relative;
        width: 1024px;
        height: 576px;
        transform-origin: center;
        display: flex;
        justify-content: center;
        align-items: center;

    }

    .dotStyle {
        width: 25px;
        height: 25px;
        border-radius: 25px;
        background: #DEDEDE;
        box-shadow: 0 0 2px 2px rgba(153,153,153,0.38);
    }

    .candle {
        width: 34px;
        height: 105px;
        background: url("./sub_static/candle.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 134px;
        bottom: 298px;
    }

    .candleImage {
        width: 20px;
        height: 59px;
        background: url("./sub_static/candeImage.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 905px;
        bottom: 315px;
        z-index: 2;
    }

    .eye {
        width: 373px;
        height: 370px;
        background: url("./sub_static/eye.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        bottom: 156px;
        left: 572px;
        z-index: 2;
    }

    .light {
        width: 0px;
        height: 126px;
        background: url("./sub_static/light.png") no-repeat;
        background-size: auto 100%;
        position:absolute;
        left: 146px;
        bottom: 286px;
        z-index: 1;
    }

    .textStyle {
        width: 100%;
        height: 24px;
        font-size: 16px;
        color: #FFFFFF;
        position: absolute;
        bottom: 146px;
        left: 237px;
        z-index: 3;
    }
</style>
<style>

</style>
