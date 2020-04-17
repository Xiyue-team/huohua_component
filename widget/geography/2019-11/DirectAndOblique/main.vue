<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div class="msg_text" v-show="msgShow">
          <div>{{text}}</div>
        </div>
        <div id="Container3d" style="width: 100%; height: 100%;">
          <canvas  id="renderCanvas"  touch-action="none"  width="1080"  height="1080"  tabindex="1"  style="opacity: 1;"></canvas>
        </div>
        <div id="msg" v-show="msgShow">
          <div class="imagebutton_image"  :style="`background-image: url(${arrow})`"/>
        </div>

      </template>
    </fullScreensLayout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
import Component from 'vue-class-component';
import { ViewModel } from './ViewModel';
import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';

@Component({
  components: {
    fullScreensLayout,
    buttonPrimary
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped="scoped">
body {
  overflow: hidden !important;
}
#renderCanvas {
  width: 100%;
  height: 100%;
  outline: 0;
}
.title_text {
  font-size: 24px;
  line-height: 24px;
  color: #fff;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 3;
}
#msg {
  position: absolute;
  width: 0;
  height: 0;
}
.imagebutton_image {
  position: absolute;
  margin-top: -6.75px;
  margin-left: -34.5px;
  height: 13.5px;
  width: 69px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  pointer-events: none;
}
.msg_text{
    position: absolute;
    left: 50%;
    top: 24px;
    margin-left: -150px;
    height: 16px;
    width: 300px;
}
.msg_text div{
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    color: #FFD621;
}
@media screen and (max-height: 449px), screen and (max-width: 699px) {
  .imagebutton_image {
    margin-top: -6.75px;
    margin-left: -34.5px;
    height: 13.5px;
    width: 69px;
  }
  .msg_text{
    margin-left: -125px;
    height: 14px;
    width: 250px;
  }
  .msg_text div{
    font-size: 14px;
  }
}
</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
</style>