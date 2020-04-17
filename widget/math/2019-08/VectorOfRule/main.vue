<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="Container" style="width: 100%; height: 100%;">
          <div id="Container3d">
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
          <div class="button_style1" @click="ButtonEvent(1)">
            <buttonPrimary
              style="width: 100%"
              v-bind:title="buttonTitle"
              v-bind:actived="buttonActived===1"
              type="ellipse"
            ></buttonPrimary>
          </div>
          <div class="button_style2" @click="ButtonEvent(2)">
            <buttonPrimary
              style="width: 100%"
              v-bind:title="buttonTitle2"
              v-bind:actived="buttonActived===2"
              type="ellipse"
            ></buttonPrimary>
          </div>
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

#Container3d{
  width: 80%;
  height: 100%;
}
.buttonG {
  position: absolute;
  width: 124px;
  height: 102px;
  bottom: 50%;
  right: 32px;
}
.button_style1 {
  margin-top: 51px;
  width: 124px;
  height: 42px;
}

.button_style2 {
  width: 124px;
  height: 42px;
  margin-top: 18px;
}

@media screen and (min-width: 801px) and (max-width: 1024px) {
  .buttonG {
    right: 24px;
  }
}
@media screen and (min-width: 480px) and (max-width: 800px) {
  .buttonG {
    right: 24px;
  }
}

#Container {
  background-color: #333333;
}
</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
 padding: 0px !important;
}
</style>
