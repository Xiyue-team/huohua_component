<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <span class="title_induction">{{lang.title}}</span>
        <div class="videoShowPage">

          <!--初始界面三张图-->
          <div class="threeImage" v-show="!showVideo">
            <div class="leftImage" @click="leftImageClickEvent">
              <img src="./sub_static/image/leftImage.png"/>
              <span>{{lang.imageText[0]}}</span>
            </div>

            <div class="centerImage" @click="centerImageClickEvent">
              <img src="./sub_static/image/centerImage.png"/>
              <span>{{lang.imageText[1]}}</span>
            </div>

            <div class="rightImage" @click="rightImageClickEvent">
              <img src="./sub_static/image/rightImage.png"/>
              <span>{{lang.imageText[2]}}</span>
            </div>
          </div>

          <!--提示文字-->
          <span class="tipText" v-show="!showVideo">{{lang.tipText}}</span>

          <!--视频区-->
          <div class="centerVideo" v-show="showVideo">
            <!--三个视频-->
            <div style="width: 100%; height: 100%; position: absolute; overflow: hidden">
              <video id="leftVideo" class="video-js myVideo vjs-default-skin only-play-button"
                     x-webkit-airplay="true"
                     preload="auto"
                     x5-playsinline playsinline
                     webkit-playsinline
                     ref="icon"
                     style="object-fit: fill; outline: auto">
                <source id="sourceId1" ref="icon" src="./sub_static/video/video1.mp4" type="video/mp4">
              </video>
              <div class="videoPlayControlImage" @click="clickVideoPlayControlImage" v-show="showPlayControlImage">
                <img src="./sub_static/image/playControlImage.png"/>
              </div>
            </div>
            <!--三个视频的封面-->
            <div style="width: 100%; height: 100%; position: absolute; z-index: 9" v-show="currentCoverIndex == 1">
              <img src="./sub_static/image/leftCover.png"/>
            </div>

            <div style="width: 100%; height: 100%; position: absolute; z-index: 9" v-show="currentCoverIndex == 2">
              <img src="./sub_static/image/centerCover.png"/>
            </div>

            <div style="width: 100%; height: 100%; position: absolute; z-index: 9" v-show="currentCoverIndex == 3">
              <img src="./sub_static/image/rightCover.png"/>
            </div>
          </div>

          <!--视频下方控件区-->
          <div class="controlDiv">
            <div class="controlImage" v-show="showVideo">
              <div class="leftImage" @click="leftControlClickEvent" v-bind:class="{'controlImageGray': currentIndex == 1}">
                <img src="./sub_static/image/leftImage.png"/>
              </div>

              <div class="centerImage" @click="centerControlClickEvent" v-bind:class="{'controlImageGray': currentIndex == 2}">
                <img src="./sub_static/image/centerImage.png"/>
              </div>

              <div class="rightImage" @click="rightControlClickEvent" v-bind:class="{'controlImageGray': currentIndex == 3}">
                <img src="./sub_static/image/rightImage.png"/>
              </div>
            </div>
          </div>

        </div>
      </template>
    </fullScreens_layout>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreens_layout from '../../../../src/component/layout/fullScreens_layout.vue';
import { ViewModel } from './ViewModel';
import Component from 'vue-class-component';
require('./sub_static/video/video-js.css');
require('video.js/dist/video.js');


@Component({
  components: {
    fullScreens_layout
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
  .title_induction{
    min-width: 24px;
    min-height: 24px;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #000000;
    line-height: 24px;
    position: absolute;
    left: 24px;
    top: 24px;
  }

  .videoShowPage {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .threeImage {
    width: 890px;
    height: 270px;
    position: absolute;
    top: 50%;
    margin-top: -135px;
    left: 50%;
    margin-left: -445px;
  }

  .threeImage div {
    width: 270px;
    height: 100%;
    position: absolute;
  }

  .threeImage div img {
    height: 100%;
    position: absolute;
    border-radius: 6px;
    box-shadow: 0px 0 4px 0px rgba(0, 0, 0, 0.2);
  }

  .threeImage div span {
    position: absolute;
    left: 24px;
    top: 18px;
    font-size: 15px;
    font-weight: bold;
  }

  .leftImage {
    left: 0;
  }

  .centerImage {
    left: 0;
    right: 0;
    margin: auto;
  }

  .rightImage {
    right: 0;
  }

  .centerVideo {
    width: 711px;
    height: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -356px;
    margin-top: -200px;
    border-radius: 0px;
  }

  .centerVideo img {
    position: absolute;
    height: 100%;
  }

  .myVideo {
    position: absolute;
    width: 100%;
    height:100%;
    border-radius: 0px;
    object-fit: cover;
  }

  .videoPlayControlImage {
    width: 56px;
    height: 56px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .controlDiv {
    width: 100%;
    height: calc((100% - 400px) / 2);
    position: absolute;
    bottom: 0;
  }

  .controlImage {
    width: 198px;
    height: 50px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -25px;
    margin-left: -99px;
  }

  .controlImage div {
    position: absolute;
    width: 50px;
    height: 100%;
  }

  .controlImage img {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .controlImageGray {
    pointer-events: none;
    box-sizing: border-box;
    border: 1px #0199ff solid;
  }

  .tipText {
    min-width: 96px;
    min-height: 22px;
    position: absolute;
    font-size: 16px;
    color: #9B9B9B;
    text-align: center;
    left: 0;
    right: 0;
    bottom: 17.6%;
    margin: auto;
  }

  @media screen and (min-width: 1800px) and (max-width: 3000px) {
    .threeImage, .centerVideo, .controlImage, .tipText {
      transform: scale(1.5);
    }

    .controlDiv {
      height: calc((100% - 400px  * 1.5) / 2);
    }
  }

  @media screen and (max-width: 1200px) {
    .threeImage, .centerVideo, .controlImage, .tipText {
      transform: scale(1);
    }

    .controlDiv {
      height: calc((100% - 400px  * 1) / 2);
    }
  }

  @media (min-width: 800px) and (max-width: 860px) {
    .threeImage, .centerVideo, .controlImage, .tipText {
      transform: scale(0.6);
    }

    .controlDiv {
      height: calc((100% - 400px  * 0.6) / 2);
    }
  }

  @media (min-width: 0px) and (max-width: 800px) {
      .threeImage, .centerVideo, .controlImage, .tipText {
          transform: scale(0.4);
      }

      .controlDiv {
          height: calc((100% - 400px  * 0.4) / 2);
      }
  }
</style>
<style>
</style>
