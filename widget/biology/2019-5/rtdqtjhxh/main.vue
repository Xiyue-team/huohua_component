<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox" slot-scope="viewBox">
        <div id="title" class="title_text">人体的气体交换循环</div>
        <div class="videobox">
          <div>
            <video
              muted
              id="icon1"
              preload="auto"
              class="video-js myVideo vjs-default-skin vjs-big-play-none videobox_video"
              x5-playsinline
              playsinline
              webkit-playsinline
              data-setup="{}"
              :poster="img1" 
              ref="icon"
            >
            <source v-show="active1===1" type="video/mp4" ref="icon" src="./sub_static/UI/1.mp4">
            </video>
          </div>
        </div>

        <div class="btnbox">
          <button @click="getChange(2)" :class="(active1==2||active1==3)?'btnclick':""">
            肺泡与外界
            <br>气体交换
          </button>
          <br>
          <button @click="getChange(4)" :class="(active1==4||active1==5)?'btnclick':""">
            肺泡里的
            <br>气体交换
          </button>
          <br>
          <button @click="getChange(6)" :class="(active1==6||active1==7)?'btnclick':""">
            组织里的
            <br>气体交换
          </button>
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

<style scoped="scoped">
@font-face {
  font-family: fontt;
  src: url("./sub_static/fonts/SourceHanSansCN-Regular.otf");
}
* {
  margin: 0;
  padding: 0;
  touch-acion: none;
  font-family: fontt !important;
}
body {
  overflow: hidden !important;
  overflow-x: hidden;
  overflow-y: hidden;
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
  color: #000;
}

.content {
  width: 100%;
  height: 100%;
}
.videobox {
  width: 70VW;
  height: 39.3VW;
  position: absolute;
  left: 47% !important;
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
  width: 133px;
  position: fixed;
  top: 50%;
  right: 10px;
  transform: translate(-10px, -50%);
  z-index: 999;
}
.btnbox button {
  width: 133px;
  background: 0;
  border-radius: 40px;
  border: 1px solid #999;
  padding: 12px 0;
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
  outline: none !important;
}
.video-js .vjs-tech {
  outline: none;
}
span{
  display: none!important;
}
.vjs-control-text{
display: none!important;
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
/* ipad mini4 */
@media (max-width: 1027px) {
  .videobox_video {
    transform: scale(0.9);
  }
  .btnbox button {
    transform: scale(0.9);
  }
}
@media (max-width: 818px) {
  .videobox_video {
    transform: scale(0.6);
  }
  .btnbox{
        width: 116px;
  }
  .btnbox button {
    transform: scale(0.6);
    margin-bottom: 0;
  }
}
@media (max-width: 668px) {
  .videobox_video {
    transform: scale(0.5);
  }
  .btnbox{
        width: 116px;
  }
  .btnbox button {
    transform: scale(0.68);
    margin-bottom: 0;
  }
}
</style>
