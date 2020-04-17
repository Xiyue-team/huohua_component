<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">
                      {{title}}
                  </div>
                  <div id="3dContainer" style="width: 100%; height: 100%">
                  </div>
                  <div class="videoArea">
                      <div class="videoPoster">
                          <img src="./sub_static/videoPosterArea.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                      </div>

                      <div class="videoBox" v-show="active1">
                          <video id="my-video1" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                     x-webkit-airplay="true"
                                     preload="auto"
                                     x5-playsinline
                                     playsinline
                                     webkit-playsinline
                                     ref="icon"
                                     style="border-radius:5px;object-fit:fill">
                               <source id="sourceId1" ref="icon" src="./sub_static/video/melt.mp4" type="video/mp4">
                          </video>
                          <div class="play_button" @click="playVideo()" v-show="showPlayButton">
                              <img src="./sub_static/play.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                          </div>
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
import Component from 'vue-class-component';
require('video.js/dist/video-js.css');

@Component({
  components: {
    fullScreensLayout
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_text {
        font-size: 24px;
        color: #FFFFFF;
        transparent: true;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }

    .videoArea {
        width: 478px;
        height: 271px;
        position: absolute;
        right: 14%;
        top: 36%;
    }

    .videoPoster {
        width: 478px;
        height: 271px;
        position: relative;
        margin-top: 0;
    }

    .play_button {
        position: absolute;
        width: 60px;
        height: 60px;
        left: calc(50% - 30px);
        top: calc(50% - 30px);
        cursor: pointer;
        z-index: 5;
    }

    /*关于视频的样式*/
    .videoBox {
        width: 478px;
        height: 271px;
        position: absolute;
        top: 0;
        border-radius: 5px;
        overflow: hidden;
    }

    .myVideo {
        width: 100%;
        height:100%;
    }

    @media screen and (min-width: 1300px) {
        .videoPoster, .videoArea {
            transform-origin: center;
            transform: scale(1.2, 1.2);
        }

        .videoBox {
            transform-origin: center;
            transform: scale(1.2, 1.2);
        }
    }

    @media screen and (min-width: 900px) and (max-width: 1290px) {
        .videoPoster, .videoArea {
            transform-origin: center;
            transform: scale(0.9, 0.9);
            right: 5%;
            top: 23%;
        }

        .videoBox {
            transform-origin: center;
            transform: scale(0.9, 0.9);
            right: 5%;
            top: 23%;
        }
    }
    
    @media screen and (max-width: 875px) and (min-width: 750px) {
        .videoPoster, .videoArea {
            transform-origin: center;
            transform: scale(0.8, 0.8);
            right: -5%;
            top: 20%;
        }
        .videoBox {
            transform-origin: center;
            transform: scale(0.8, 0.8);
            right: -5%;
            top: 20%;
        }
    }

    @media screen and (max-width: 740px) {
        .videoPoster, .videoArea {
            transform-origin: center;
            transform: scale(0.7, 0.7);
            right: -5%;
            top: 5%;
        }
        .videoBox {
            transform-origin: center;
            transform: scale(0.7, 0.7);
            right: -5%;
            top: 5%;
        }
    }
</style>
<style>
    .vjs-poster {
        background-color: transparent !important;
        background-size: 100% 100% !important;
    }
</style>
