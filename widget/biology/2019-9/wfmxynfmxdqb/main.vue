<template>
  <div class="aspectration root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox" slot-scope="viewBox">
        <div id="title" class="title_text">{{title}}</div>
        <div class="content" :style="{'background-image': 'url(\'' +bg+'\')'}">
          <div
            class="videobox"
            style="z-index:2"
            :style="{zoom:zoom1,'background-image': 'url(\'' +bg+'\')'}"
          >
            <div>
              <img src="./sub_static/UI/1.png" v-show="active1===1" />
            </div>
          </div>
          <div style="width:100%;height:100%;z-index: 9;position: absolute;" :style="{zoom:zoom1}">
            <div class="linebox" v-show="(active1===2) && (isChecked==true)">
              <img src="./sub_static/UI/line2.png" width="100%" height="100%" />
              <p class="text1">{{buttonAll[2]}}</p>
              <p class="text2">{{buttonAll[3]}}</p>
              <p class="text3">{{buttonAll[4]}}</p>
            </div>
            <div class="linebox" v-show="(active1===4) && (isChecked==true)">
              <img src="./sub_static/UI/line3.png" width="100%" height="100%" />
              <p class="text4">{{buttonAll[5]}}</p>
              <p class="text5">{{buttonAll[3]}}</p>
              <p class="text6">{{buttonAll[4]}}</p>
            </div>
          </div>
          <div class="videobox" id="video1">
            <div>
              <video
                muted
                id="icon1"
                class="video-js myVideo vjs-default-skin vjs-big-play-none"
                x-webkit-airplay="true"
                preload="auto"
                x5-playsinline
                playsinline
                webkit-playsinline
                data-setup="{}"
                x5-video-player-type="h5"
                x5-video-player-fullscreen="true"
                x5-video-orientation="landscape"
                ref="icon"
                :poster="video2"
                style="object-fit: fill;"
              >
                <source type="video/mp4" ref="icon" src="./sub_static/UI/1.mp4" />
              </video>
            </div>
          </div>
          <div class="videobox" id="video2">
            <div>
              <video
                muted
                id="icon2"
                class="video-js myVideo vjs-default-skin vjs-big-play-none"
                x-webkit-airplay="true"
                preload="auto"
                x5-playsinline
                playsinline
                webkit-playsinline
                data-setup="{}"
                x5-video-player-type="h5"
                x5-video-player-fullscreen="true"
                x5-video-orientation="landscape"
                ref="icon"
                :poster="video2"
                style="object-fit: fill;"
              >
                <source type="video/mp4" ref="icon" src="./sub_static/UI/2.mp4" />
              </video>
            </div>
          </div>
          <div class="btnbox">
            <button @click="getChange(2)" :class="{btnclick: active1 === 2}">{{buttonAll[0]}}</button>
            <br />
            <button @click="getChange(4)" :class="{btnclick: active1 === 4}">{{buttonAll[1]}}</button>
          </div>
        </div>
        <label
          for="checkbox-1"
          id="s1"
          class="control-block_div_border switch"
          v-show="(active1===2) || (active1===4)"
        >
          <input
            type="checkbox"
            name="checkbox-cats[]"
            id="checkbox-1"
            v-model="isChecked"
            @click="getChange(6)"
          />
          <label for="checkbox-1">
            <span style="font-size: 22px;color: #FFFFFF;display: block !important;">{{buttonAll[6]}}</span>
          </label>
        </label>
      </template>
      <template slot="controlPanel" slot-scope="controlPanel">
        <div id="controlPanel"></div>
      </template>
    </fullScreensLayout>
  </div>
</template>
<script lang="ts">
import "../../../../src/assets/css/core.css";
import "../../../../src/assets/css/layout.css";
import fullScreensLayout from "../../../../src/component/layout/fullScreens_layout.vue";
import Component from "vue-class-component";
import { MainVueComponent } from "./mainVueComponent";
require("video.js/dist/video-js.css");
@Component({
  components: {
    fullScreensLayout
  }
})
export default class App extends MainVueComponent {}
</script>

<style scoped='scoped'>
* {
  margin: 0;
  padding: 0;
  touch-acion: none;
}
body {
  overflow: hidden !important;
  overflow-x: hidden;
  overflow-y: hidden;
}
video {
  width: 100%;
  height: auto;
  border-radius: 8px;
}
.control_div_resetBtn {
  z-index: 2999 !important;
}
.control_div_resetBtn img {
  z-index: 2999 !important;
}
.title_text {
  line-height: 24px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 9;
  font-size: 24px;
  text-align: justify;
  color: #fff;
}
.content {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  z-index: 6;
}
.videobox {
  width: 100%;
  height: 100%;
  z-index: 1;
  background-size: cover;
  background-position: center center;
  position: absolute;
}
.videobox div {
  width: 100%;
  height: 100%;
}
.videobox div img {
  width: 596px;
  height: 276px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.videobox_video {
  width: 100%;
  height: 100%;
  outline: none !important;
  position: absolute !important;
  outline: none !important;
}
.btnbox {
  width: 94px;
  position: fixed;
  top: 50%;
  right: 24px;
  transform: translate(-10px, -50%);
  z-index: 10;
}
.btnbox button {
  width: 94px;
  font-family: SourceHanSansSC-Medium;
  background: #fff;
  border-radius: 40px;
  line-height: 38px;
  border: 1px solid #fff;
  margin-bottom: 30px;
  font-size: 14px;
  color: #000;
  text-align: center;
}
.btnclick {
  background: #0291ff !important;
  color: #fff !important;
}
.video-js {
  width: 100%;
  height: 100%;
  outline: none !important;
}
.video-js .vjs-tech {
  outline: none;
}
span {
  display: none !important;
}
.vjs-control-text {
  display: none !important;
}
.linebox {
  width: 100%;
  height: 100%;
  z-index: 9;
}
.linebox > p {
  font-family: SourceHanSansSC-Medium;
  font-size: 18px;
  color: #ffffff;
  position: absolute;
}
.text1 {
  top: 40.5%;
  left: 29%;
}
.text2 {
  top: 49%;
  left: 68.2%;
}
.text3 {
  top: 64%;
  left: 68.2%;
}
.text4 {
  top: 43.5%;
  left: 30.5%;
}
.text5 {
  top: 55%;
  left: 67%;
}
.text6 {
  top: 67%;
  left: 67%;
}
#s1 {
  position: absolute;
  width: 100px;
  right: 2.3%;
  bottom: 13.4%;
  background: none;
  box-shadow: none;
  z-index: 99;
}
.switch input[type="checkbox"] + label:before,
.switch input[type="checkbox"] + label:after {
  transition: none;
}

/*适配各种设备*/

@media (max-height: 400px) {
  .title_text {
    line-height: 18px;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 18px;
    left: 24px;
    z-index: 9;
    font-size: 18px;
  }
}
@media (max-width: 730px) {
  .btnbox {
    transform: translate(0, -50%);
  }
  @media (max-width: 640px) {
    .btnbox {
      right: 20px;
    }
  }
}
@media (max-width: 1027px) {
  .text2 {
    top: 49.5%;
  }
  .text3 {
    top: 64.5%;
  }
  .text4 {
    top: 44%;
  }
  .text5 {
    top: 55.5%;
  }
}
@media (max-width: 1027px) {
  .text1 {
    top: 41%;
  }
}
@media (max-width: 818px) {
  .text1 {
    top: 40.5%;
  }
}
@media (max-width: 730px) {
  .btnbox button {
    transform: scale(0.9);
    margin-bottom: 20px;
  }
}
</style>
