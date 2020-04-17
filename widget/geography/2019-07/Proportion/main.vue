<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div id="Container" style="width: 100%; height: 100%;">
          <div class="title_text">{{title_text}}</div>
          <div id="Container3d" style="width: 100%; height: 100%;">
            <canvas
              id="renderCanvas"
              touch-action="none"
              width="1920"
              height="1080"
              tabindex="1"
              style="opacity: 1;"
            ></canvas>
          </div>
        </div>
        <div class="buttonG">
          <div class="right_title" :style="`background-image: url(${bg})`"></div>
          <div class="right_container">{{right_container}}</div>
        </div>
      </template>

      <template slot="controlPanel">
        <div id="controlPanel"></div>
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
import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
@Component({
  components: {
    vueSlider,
    fullScreensLayout
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped="scoped">
body {
  overflow: hidden !important;
}
.title_text {
  font-size: 24px;
  line-height: 24px;
  color: #333333;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 3;
}
#renderCanvas {
  width: 100%;
  height: 100%;
  outline: 0;
}

.buttonG {
  position: absolute;
  width: 184px;
  background-color: #ffffff;
  border-radius: 5px;
  height: auto;
  right: 24px;
  bottom: 24px;
  padding: 20px;
}
.right_title {
  width: 100%;
  height: 72px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.right_container {
  width: 166px;
  height: auto;
  color: #4a4a4a;
  font-size: 18px;
  line-height: 24px;
  display: flex;
  margin-left: 11px;
  white-space: pre-wrap;
}

@media screen and (min-height: 300px) and (max-height: 449px) {
   .buttonG {
    width: 121px;
    right: 12px;
    bottom: 12px;
    padding: 8px;
  }
  .right_container {
    width: 110px;
    font-size: 14px;
    line-height: 18px;
    margin-left: 11px;
  }
}
</style>
