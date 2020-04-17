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
        <div class="buttonG">
        <div class="button_style1" @click="ButtonEvent1()">
          <buttonImage
            v-bind:actived="buttonActived1"
            v-bind="Option1"
          ></buttonImage>
        </div>
        <div class="button_style" @click="ButtonEvent2()">
          <buttonImage
            v-bind:actived="buttonActived2"
            v-bind="Option2"
          ></buttonImage>
        </div>
        <div class="button_style" @click="ButtonEvent3()">
          <buttonImage
            v-bind:actived="buttonActived3"
            v-bind="Option3"
          ></buttonImage>
        </div>
        <div class="button_style" @click="ButtonEvent4()">
          <buttonImage
            v-bind:actived="buttonActived4"
            v-bind="Option4"
          ></buttonImage>
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
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
import Component from 'vue-class-component';
import { ViewModel } from './ViewModel';
import buttonImage from '../../../babylon/template/ui/buttonImage.vue';

@Component({
  components: {
    fullScreensLayout,
    buttonImage
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

.buttonG {
  position: absolute;
  width: 88px;
  height: 222px;
  bottom: 50%;
  right: 82px;
}

.button_style1 {
  margin-top: 111px;
  width: 88px;
  height: 42px;
}
.button_style {
  width: 88px;
  height: 42px;
  margin-top: 18px;
}

@media screen and (min-width: 480px) and (max-width: 800px) {
  .buttonG {
    height: 192px;
    right: 24px;
  }
  .button_style1 {
    margin-top: 96px;
  }
  .button_style {
    margin-top: 8px;
  }
}

#Container {
  background-color: #333333;
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