<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div id="3dContainer"></div>
                  <audio id="cicada" loop preload="auto">
                      <source src="./sub_static/cicada.mp3">
                  </audio>
                  <audio id="bird" loop preload="auto">
                      <source src="./sub_static/bird.mp3" >
                  </audio>
                  <audio id="fish" loop preload="auto">
                      <source src="./sub_static/fish.mp3" >
                  </audio>
                  <audio id="duck" loop preload="auto">
                      <source src="./sub_static/duck.mp3" >
                  </audio>
                  <audio id="frog" loop preload="auto">
                      <source src="./sub_static/frog.mp3" >
                  </audio>
                  <div style="width: 100%;height: 100%;">
                      <video id="my-video" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                             x-webkit-airplay="true"
                             preload="auto"
                             autoplay
                             muted
                             loop
                             x5-playsinline playsinline
                             x5-video-player-type="h5"
                             x5-video-player-fullscreen="true"
                             x5-video-orientation="landscape"
                             webkit-playsinline
                             ref="icon"
                             style="object-fit:fill">
                          <source id="sourceId5" ref="icon" src="./sub_static/background.mp4" type="video/mp4">
                      </video>
                      <div class="zrjzdsy_play" style="left: 9.9%;top: 21.5%;" @click="playEvent1()">
                          <img :src="play" class="buttonStyle" alt="" ondragstart="return false;" v-show="isPlay1">
                          <img :src="stop" class="buttonStyle" alt="" ondragstart="return false;" v-show="!isPlay1">
                      </div>
                      <div class="zrjzdsy_play" style="left: 24.9%; top: 23.4%;" @click="playEvent2()">
                          <img :src="play" class="buttonStyle" alt="" ondragstart="return false;" v-show="isPlay2">
                          <img :src="stop" class="buttonStyle" alt="" ondragstart="return false;" v-show="!isPlay2">
                      </div>
                      <div class="zrjzdsy_play" style="left: 15.1%; top: 69.2%;" @click="playEvent3()">
                          <img :src="play" class="buttonStyle" alt="" ondragstart="return false;" v-show="isPlay3">
                          <img :src="stop" class="buttonStyle" alt="" ondragstart="return false;" v-show="!isPlay3">
                      </div>
                      <div class="zrjzdsy_play" style="left: 50.3%; top: 51.6%;" @click="playEvent4()">
                          <img :src="play" class="buttonStyle" alt="" ondragstart="return false;" v-show="isPlay4">
                          <img :src="stop" class="buttonStyle" alt="" ondragstart="return false;" v-show="!isPlay4">
                      </div>
                      <div class="zrjzdsy_play" style="left: 82.8%; top: 60.3%;" @click="playEvent5()">
                          <img :src="play" class="buttonStyle" alt="" ondragstart="return false;" v-show="isPlay5">
                          <img :src="stop" class="buttonStyle" alt="" ondragstart="return false;" v-show="!isPlay5">
                      </div>
                  </div>
                  <div class="title_text">{{title}}</div>
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
    .title_text{
        font-size: 24px;
        color: #342D2D;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }

    .myVideo {
        width: 100%;
        height: 100%;
        position: absolute;
        pointer-events: none;
        z-index: 0!important;
    }

    .zrjzdsy_play {
        position: absolute;
        cursor: pointer;
        width: 44px;
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media screen and (max-width: 806px) {
        .zrjzdsy_play {
            width: 33px;
            height: 33px;
        }
    }

    .buttonStyle {
        width: 100%;
        height: 100%;
    }
</style>
<style>

</style>
