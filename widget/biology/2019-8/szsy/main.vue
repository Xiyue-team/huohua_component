<template>
  <div class="aspectration root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox" slot-scope="viewBox">
        <div id="title" class="title_text">{{title}}</div>
        <div
          style="width:100%;height:100%; background-size: cover;background-position: center center;z-index:6"
          :style="{'background-image': 'url(\'' +bg+'\')'}"
        >
          <div class="videobox" style="z-index:2000" v-show="active==0">
            <div>
              <div class="supernatant"></div>
            </div>
          </div>
          <div class="videobox" id="videobox1" style="z-index=3">
            <video
              muted
              id="icon1"
              preload="auto"
              class="video-js myVideo vjs-default-skin vjs-big-play-none videobox_video"
              x5-playsinline
              playsinline
              webkit-playsinline
              data-setup="{}"
              ref="icon"
              :poster="img1"
              style="object-fit:cover"
            >
              <source type="video/mp4" ref="icon" src="./sub_static/UI/2.mp4" />
            </video>
          </div>
          <div class="videobox" id="videobox2">
            <video
              muted
              id="icon2"
              preload="auto"
              class="video-js myVideo vjs-default-skin vjs-big-play-none videobox_video"
              x5-playsinline
              playsinline
              webkit-playsinline
              data-setup="{}"
              ref="icon"
              :poster="img1"
              style="object-fit:cover"
            >
              <source type="video/mp4" ref="icon" src="./sub_static/UI/3.mp4" />
            </video>
          </div>
          <div class="videobox" id="videobox3">
            <video
              muted
              id="icon3"
              preload="auto"
              class="video-js myVideo vjs-default-skin vjs-big-play-none videobox_video"
              x5-playsinline
              playsinline
              webkit-playsinline
              data-setup="{}"
              ref="icon"
              :poster="img1"
              style="object-fit:cover"
            >
              <source type="video/mp4" ref="icon" src="./sub_static/UI/4.mp4" />
            </video>
          </div>

          <div class="play" v-show="showPlay" @click="getplay()">
            <img src="./sub_static/UI/bt.png" style="width: 100%;height: 100%" />
          </div>
          <div class="btnbox">
            <button @click="getChange(1)" :class="{btnclick: active === 1}">{{btn1}}</button>
            <br />
            <button @click="getChange(2)" :class="{btnclick: active === 2}">{{btn2}}</button>
            <br />
            <button @click="getChange(3)" :class="{btnclick: active === 3}">{{btn3}}</button>
          </div>
        </div>
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
import "./sub_static/video/video-js.1.css";
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
#videobox1 {
  z-index: 2;
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
}
.play {
  width: 90px;
  height: 90px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 2001;
}
.videobox {
  width: 1433px;
  height: 804px;
  position: absolute;
  border-radius: 8px;
  z-index: 1;
  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, -50%) !important;
}
.videobox div {
  width: 100%;
  height: 100%;
}

.videobox_video {
  width: 100%;
  height: 100%;
  outline: none !important;
  position: absolute !important;
  outline: none !important;
}
.btnbox {
  width: 163px;
  position: fixed;
  top: 50%;
  right: 10px;
  transform: translate(-10px, -50%);
  z-index: 999;
  z-index: 2001;
}
.btnbox button {
  width: 163px;
  font-family: SourceHanSansSC-Medium;
  background: #fff;
  border-radius: 40px;
  border: 1px solid #fff;
  padding: 10px 0;
  margin-bottom: 1.2vw;
  font-size: 16px;
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
  background-color: rgba(0, 0, 0, 0) !important;
  outline: none !important;
}
.vjs-icon-fullscreen-enter {
  opacity: 0 !important;
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
.supernatant {
  width: 100%;
  height: auto;
  z-index: 2000;
  color: #ffffff;
  position: absolute;
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
@media (max-width: 1600px) {
  .supernatant {
    transform: scale(0.75);
  }
  .videobox_video {
    transform: scale(0.75);
  }
  .play {
    transform: translate(-50%, -50%) scale(0.8);
  }
}
@media (max-width: 1280px) {
  .supernatant {
    transform: scale(0.58);
  }
  .videobox_video {
    transform: scale(0.58);
  }
  .play {
    transform: translate(-50%, -50%) scale(0.8);
  }
  @media (max-width: 1226px) {
    .supernatant {
      transform: scale(0.5);
    }
    .videobox_video {
      transform: scale(0.5);
    }
  }
}
/* ipad mini4 */
@media (max-width: 1027px) {
  .supernatant {
    transform: scale(0.45);
  }
  .videobox_video {
    transform: scale(0.45);
  }

  .btnbox {
    width: 148px;
  }
  .btnbox button {
    transform: scale(0.8);
  }
}
@media (max-width: 854px) {
  .supernatant {
    transform: scale(0.4);
  }
  .videobox_video {
    transform: scale(0.4);
  }
  .btnbox {
    width: 116px;
  }
  .btnbox button {
    transform: scale(0.6);
    margin-bottom: 3px;
  }
  .play {
    transform: translate(-50%, -50%) scale(0.7);
  }
}

@media (max-width: 818px) {
  .supernatant {
    transform: scale(0.4);
  }
  .videobox_video {
    transform: scale(0.4);
  }
  .btnbox {
    width: 116px;
  }
  .btnbox button {
    transform: scale(0.6);
    margin-bottom: 0;
  }
  .play {
    transform: translate(-50%, -50%) scale(0.7);
  }
}
@media (max-width: 730px) {
  .supernatant {
    transform: scale(0.3);
  }
  .videobox_video {
    transform: scale(0.3);
  }
  .play {
    transform: translate(-50%, -50%) scale(0.6);
  }
}
@media (max-width: 668px) {
  .supernatant {
    transform: scale(0.27);
  }
  .videobox_video {
    transform: scale(0.27);
  }
  .play {
    transform: translate(-50%, -50%) scale(0.5);
  }
  .btnbox {
    width: 116px;
  }
  .btnbox button {
    width: 155px;
    transform: scale(0.68);
    margin-bottom: 0;
  }
}
</style>
