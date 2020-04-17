<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <span class="title_induction">美丽中国——地貌景观</span>
        <div id="box" style="width: 100%; height: 100%" v-show="showBox">

        </div>
        <div class="videoShowPage" v-show="showVideoShowPage">
          <!--关闭按钮-->
          <div class="closeButton" @click="closeVideoDivCenter">
            <img src="./sub_static/closeButton.png" class="closeButtonImage"/>
          </div>
          <!--中间内容区-->
          <div class="videoDivCenter">
            <!--左侧视频区-->
            <div class="leftVideo">
              <img src="./sub_static/posterImage/posterImage1.png" style="width: 100%; height: 100%" v-show="currentIndex2 == 1"/>
              <img src="./sub_static/posterImage/posterImage2.png" style="width: 100%; height: 100%" v-show="currentIndex2 == 2"/>
              <img src="./sub_static/posterImage/posterImage3.png" style="width: 100%; height: 100%" v-show="currentIndex2 == 3"/>
              <img src="./sub_static/posterImage/posterImage4.png" style="width: 100%; height: 100%" v-show="currentIndex2 == 4"/>
              <img src="./sub_static/posterImage/posterImage5.png" style="width: 100%; height: 100%" v-show="currentIndex2 == 5"/>
              <img src="./sub_static/posterImage/posterImage6.png" style="width: 100%; height: 100%" v-show="currentIndex2 == 6"/>
              <!--<video id="video" :src="videoUrl" v-show="showVideo" controls="controls"></video>-->

              <div style="width: 100%; height: 100%" v-show="showVideo">
                <div style="width: 100%; height: 100%" v-show="currentIndex == 1">
                  <video id="myvideo1" class="video-js myVideo vjs-default-skin only-play-button" controls preload="auto" webkit-playsinline playsinline x5-playsinline
                         data-setup="{}" >
                    <source src="./sub_static/video/video1.mp4" type='video/mp4'>
                  </video>
                </div>

                <div style="width: 100%; height: 100%" v-show="currentIndex == 2">
                  <video id="myvideo2" class="video-js myVideo" controls preload="auto" webkit-playsinline playsinline x5-playsinline
                         data-setup="{}" >
                    <source src="./sub_static/video/video2.mp4" type='video/mp4'>
                  </video>
                </div>

                <div style="width: 100%; height: 100%" v-show="currentIndex == 3">
                  <video id="myvideo3" class="video-js myVideo" controls preload="auto" webkit-playsinline playsinline x5-playsinline
                         data-setup="{}" >
                    <source src="./sub_static/video/video3.mp4" type='video/mp4'>
                  </video>
                </div>

                <div style="width: 100%; height: 100%" v-show="currentIndex == 4">
                  <video id="myvideo4" class="video-js myVideo" controls preload="auto" webkit-playsinline playsinline x5-playsinline
                         data-setup="{}" >
                    <source src="./sub_static/video/video4.mp4" type='video/mp4'>
                  </video>
                </div>

                <div style="width: 100%; height: 100%" v-show="currentIndex == 5">
                  <video id="myvideo5" class="video-js myVideo" controls preload="auto" webkit-playsinline playsinline x5-playsinline
                         data-setup="{}" >
                    <source src="./sub_static/video/video5.mp4" type='video/mp4'>
                  </video>
                </div>

                <div style="width: 100%; height: 100%" v-show="currentIndex == 6">
                  <video id="myvideo6" class="video-js myVideo" controls preload="auto" webkit-playsinline playsinline x5-playsinline
                         data-setup="{}" >
                    <source src="./sub_static/video/video6.mp4" type='video/mp4'>
                  </video>
                </div>
              </div>
            </div>

            <!--右侧图片区-->
            <div class="rightPhoto">
              <!--降雨量图片-->
              <div class="rightTopPhoto">
                <img src="./sub_static/image/rainfall1.png" style="width: 100%; height: 100%"/>
                <div class="imageWidthHeight labelPoint1" v-show="currentIndex == 1">
                  <img src="./sub_static/labelPoint.png" style="width: 100%;"/>
                </div>
                <div class="imageWidthHeight labelPoint2" v-show="currentIndex == 2">
                  <img src="./sub_static/labelPoint.png" style="width: 100%;"/>
                </div>
                <div class="imageWidthHeight labelPoint3" v-show="currentIndex == 3">
                  <img src="./sub_static/labelPoint.png" style="width: 100%;"/>
                </div>
                <div class="imageWidthHeight labelPoint4" v-show="currentIndex == 4">
                  <img src="./sub_static/labelPoint.png" style="width: 100%;"/>
                </div>
                <div class="imageWidthHeight labelPoint5" v-show="currentIndex == 5">
                  <img src="./sub_static/labelPoint.png" style="width: 100%;"/>
                </div>
                <div class="imageWidthHeight labelPoint6" v-show="currentIndex == 6">
                  <img src="./sub_static/labelPoint.png" style="width: 100%;"/>
                </div>
              </div>
              <!--地图图片-->
              <div class="rightBottomPhoto">
                <img src="./sub_static/image/map1.png" style="width: 100%; height: 100%"/>
                <div class="imageWidthHeight labelBottomPoint1" v-show="currentIndex == 1">
                  <img src="./sub_static/labelPoint.png" style="width: 100%;"/>
                </div>
                <div class="imageWidthHeight labelBottomPoint2" v-show="currentIndex == 2">
                  <img src="./sub_static/labelPoint.png" style="width: 100%;"/>
                </div>
                <div class="imageWidthHeight labelBottomPoint3" v-show="currentIndex == 3">
                  <img src="./sub_static/labelPoint.png" style="width: 100%;"/>
                </div>
                <div class="imageWidthHeight labelBottomPoint4" v-show="currentIndex == 4">
                  <img src="./sub_static/labelPoint.png" style="width: 100%;"/>
                </div>
                <div class="imageWidthHeight labelBottomPoint5" v-show="currentIndex == 5">
                  <img src="./sub_static/labelPoint.png" style="width: 100%;"/>
                </div>
                <div class="imageWidthHeight labelBottomPoint6" v-show="currentIndex == 6">
                  <img src="./sub_static/labelPoint.png" style="width: 100%;"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template slot="controlPanel" slot-scope="controlPanel">
        <div  id="controlPanel" >

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
require('video.js/dist/video-js.css');
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
    width: 520px;
    height:100px;
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
    z-index: 10;
  }

  .videoDivCenter {
    width: 88.0%;
    height: 64.2%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .leftVideo {
    width: 72.8889%;
    height: 100%;
    position: absolute;
    left: 0;
    border-radius: 9px;
  }

  .myVideo {
    width: 100%;
    height:100%;
    border-radius: 9px;
    object-fit: cover;
  }

  .rightPhoto {
    width: 25.7778%;
    height: 100%;
    position: absolute;
    right: 0;
  }

  .rightTopPhoto {
    width: 100%;
    height: 48.65%;
    position: absolute;
    top: 0;
  }

  .rightBottomPhoto {
    width: 100%;
    height: 48.65%;
    position: absolute;
    bottom: 0;
  }

  .imageWidthHeight {
    width: 6.034%;
    height: 8.889%;
  }

  .closeButton {
    width: 48px;
    height: 48px;
    position: absolute;
    right: 16px;
    top: 16px;
  }

  .closeButtonImage {
    width: 100%;
    height: 100%;
  }

  .labelPoint1{
    position: absolute;
    left: 21.983%;
    top: 25%;
  }

  .labelPoint2{
    position: absolute;
    left: 29.5%;
    top: 27%;
  }

  .labelPoint3{
    position: absolute;
    left: 68.5%;
    top: 29.444%;
  }

  .labelPoint4{
    position: absolute;
    left: 14%;
    top: 53%;
  }

  .labelPoint5{
    position: absolute;
    left: 42.241%;
    top: 70%;
  }

  .labelPoint6{
    position: absolute;
    left: 58.621%;
    top: 70%;
  }

  .labelBottomPoint1{
    position: absolute;
    left: 26.45%;
    top: 25%;
  }

  .labelBottomPoint2{
    position: absolute;
    left: 35%;
    top: 27.5%;
  }

  .labelBottomPoint3{
    position: absolute;
    left: 76.5%;
    top: 31%;
  }

  .labelBottomPoint4{
    position: absolute;
    left: 15%;
    top: 56%;
  }

  .labelBottomPoint5{
    position: absolute;
    left: 46.1206%;
    top: 75%;
  }

  .labelBottomPoint6{
    position: absolute;
    left: 65.5172%;
    top: 73%;
  }

</style>
<style>

  .konvajs-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
