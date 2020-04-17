<template>
  <div
    class="aspectration bg_white root_div_container"
    data-ratio="16:9"
  >
    <fullScreensLayout>
      <template
        slot="viewBox"
        slot-scope="viewBox"
      >
        <!-- <div
          id="title"
          class="title_text"
        >世界干极的形成</div> -->

        <div class="videoCenter">
          <!-- <div
            class="leftVideo"
            id="left"
          > -->
          <video
            id="video"
            x5-playsinline
            playsinline
            webkit-playsinline
            data-setup="{}"
            :poster="imgUrl"
            muted
            autoplay
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
            x5-video-orientation="landscape"
            x-webkit-airplay="true"
            class="video-js myVideo vjs-default-skin vjs-big-play-none "
            style="object-fit:fill"
          >
            <source
              :src="videoUrl"
              type='video/mp4'
            ></video>
          <div
            style="width:100%;bottom: 10%; position: absolute;height:30px;display:flex;justify-content:center"
            v-if="mc"
          >
            <VueSliderComponent
              class="kz"
              style="z-index:20"
              :width="width"
              v-model="valueTime"
              :max='max'
              :interval='interval'
              :tooltip='false'
            ></VueSliderComponent>
          </div>

        </div>
      </template>
    </fullScreensLayout>
  </div>
</template>

<script lang="ts">
import "../../../../src/assets/css/core.css";
import "../../../../src/assets/css/layout.css";
import fullScreensLayout from "../../../../src/component/layout/fullScreens_layout.vue";
import Component from "vue-class-component";
import { MainVueComponent } from "./MainVueComponent.ts";
import VueSliderComponent from "../../../../src/component/ui/vue2-slider";
import h_button from "../../../../src/component/ui/buttonEllipse.vue";
import "./sub_static/video/video-js.css";

@Component({
  components: {
    fullScreensLayout,
    VueSliderComponent,
    h_button
  }
})
export default class App extends MainVueComponent {}
</script>

<style scoped="scoped">
* {
  margin: 0;
  padding: 0;
}

body {
  overflow: hidden !important;
  overflow-x: hidden;
  overflow-y: hidden;
}

ul,
ol,
li {
  list-style: none;
}

.title_text {
  font-size: 24px;
  color: #000;
  line-height: 24px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 14px;
  left: 24px;
  z-index: 9;
}
#video {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  /* border-radius: 9px; */
  object-fit: cover;
}

.videoCenter {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: #000;
}
.leftVideo {
  width: auto;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: 9px;
}
video {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  /* border-radius: 9px; */
  object-fit: cover;
}
.rightBtn {
  width: 100px;
  height: 400px;
  position: absolute;
  right: 20px;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
button {
  background: #ffffff;
  /* transform: scale(0.9); */
  /* border: 3 solid rgba(92, 174, 253, 1); */
  border-style: solid;
  text-shadow: 0 0.5px 0 #7d7d7d;
  border-width: 3px;
  border-color: rgba(0, 0, 0, 0.12);
  box-shadow: 2px 2px 2px #7d7d7d;
  border-radius: 100px;
  padding: 12px 16px;
  font-size: 16px;
  line-height: 16px;
  color: #8c96a0;
  text-shadow: 0.5px 0.5px 0.5px #fff;
  border: 1px solid #dce1e6;
  box-shadow: 0.5px 0.5px 0.5px #fff inset, 0 0 0 #a8abae inset;
  background: #ffffff;
  font-weight: bold;
}
button:hover {
  cursor: pointer;
  /* background: #ffffff;
  border: 0px solid #fff; */
}

/*.button:active{*/
/*background: #5CAEFD;*/
/*color: #FFFFFF;*/
/*}*/

.active {
  background: #5caefd;
  color: #ffffff;
  text-shadow: 0 0.1px 0 #7d7d7d;
}
.kz {
  left: 0;
  right: 0;
  margin-left: 0;
  margin-right: 0;
}
</style>
