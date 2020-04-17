<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox" slot-scope="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="Container" style="width: 100%; height: 100%;">
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
        <div class="button_style1" @click="ButtonEvent()">
            <buttonPrimary
              style="width: 100%"
              v-bind:title="buttonTitle"
              v-bind:actived="buttonActived"
              type="ellipse"
            ></buttonPrimary>
        </div>
        <div id="tip" :style="`background-image: url(${pictip})`">
        </div>
      </template>

      <template slot="controlPanel" slot-scope="controlPanel">
        <div id="controlPanel">
          
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
  pointer-events: none;
}
.button_style1 {
  position: absolute;
  width: 80px;
  height: 42px;
  bottom: 50%;
  right: 24px;
}
#tip {
  position: absolute;
  width: 414px;
  height: 183px;
  top: 55%;
  right: 24px;
      background-repeat: no-repeat;
    background-position: top;
    background-size: contain;
    pointer-events: none;
  display: none;
}

@media screen and (min-width: 801px) and (max-width: 1024px) {
#tip {
  width: 311px;
  height: 137px;
}
}

@media screen and (min-width: 480px) and (max-width: 800px) {
#tip {
  width: 207px;
  height: 91.5px;
}
}

#Container {
  background-color: #333333;
}
.checkbtn {
  width: 100%;
  height: 100%;
}
img {
  width: 100%;
  height: 100%;
}

</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
</style>