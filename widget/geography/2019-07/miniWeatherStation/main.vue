<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="Container3d" style="width: 100%; height: 100%;">
          <canvas
            id="renderCanvas"
            touch-action="none"
            width="1080"
            height="1080"
            tabindex="1"
            style="opacity: 1;"
          ></canvas>
        </div>
        <div class="button1" @click="check()">
          <buttonPrimary
            style="width: 100%"
            v-bind:title="buttonTitle1"
            v-bind:actived="buttonActived"
            type="ellipse"
          ></buttonPrimary>
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

.button1 {
  position: absolute;
  width: 160px;
  height: 42px;
  bottom: 24px;
  right: 24px;
}

</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
 padding: 0px !important;
}
</style>