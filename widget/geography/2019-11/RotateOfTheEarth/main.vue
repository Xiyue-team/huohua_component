<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="Container3d" style="width: 100%; height: 100%;">
          <canvas id="renderCanvas" touch-action="none" width="1080" height="1080" tabindex="1" style="opacity: 1;"></canvas>
        </div>
        <div class="button_class" @click="selfRotate()">
          <SwitchButton v-bind:valueV="isSelfRotate">{{btntext}}</SwitchButton>
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
import SwitchButton from '../../../babylon/template/ui/SwitchButton.vue';
@Component({
  components: {
    fullScreensLayout,
    SwitchButton
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

.button_class {
  position: absolute;
  width: 90px;
  height: 42px;
  right: 44px;
  bottom: 24px;
}

@media screen and (min-height: 600px) and (max-height: 800px), screen and (min-width: 950px) and (max-width: 1500px)  {
}

@media screen and (min-height: 450px) and (max-height: 599px), screen and (min-width: 700px) and (max-width: 949px)  {

}

@media screen and (max-height: 449px), screen and (max-width: 699px) {

}
</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
</style>
