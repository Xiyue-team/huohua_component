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
        <div class="slider_style">
            <div class="label">k</div>
            <div class="sliderstyle">
              <vue-slider
                ref="slider"
                v-model="sliderNumber"
                v-bind="sliderOption"
                :formatter="formatter"
              >
                <template slot="tooltip" scope="tooltip">
                  <div class="custom-tooltip" style="color: #fff">{{tooltip.value}}</div>
                </template>
              </vue-slider>
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
        <div v-if="buttonActived" id="tip" :style="`background-image: url(${pictip})`">
        </div>
      </template>

      <template slot="controlPanel">
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
import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
@Component({
  components: {
    fullScreensLayout,
    buttonPrimary,
    vueSlider
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
#Container3d{
  width: 60%;
  height: 100%;
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
  width: 200px;
  height: 42px;
  bottom: 50%;
  margin-bottom: -21px;
  right: 24px;
}

.slider_style {
  position: absolute;
  width: 204px;
  height: 26px;
  padding-bottom: 9px;
  bottom: 50%;
  margin-bottom: 33px;
  right: 24px;
}

.sliderstyle {
  width: 180px;
  height: 26px;
  float:left;
}

.label{
  width: 24px;
  height: 24px;
  color: #fff;
  font-size: 24px;
  font-family: 'Times New Roman';
  font-style: italic;
  float:left;
}

.custom-tooltip{
  width: 60px;
  text-align: center;
  font-size: 24px;
  font-family: 'Times New Roman';
}

#tip {
  position: absolute;
  width: 200px;
  height: 24px;
  top: 50%;
  margin-top: 38px;
  right: 24px;
  background-repeat: no-repeat;
  background-position: top;
  background-size: contain;
  pointer-events: none;
}

@media screen and (min-width: 801px) and (max-width: 1024px) {

}

@media screen and (min-width: 480px) and (max-width: 800px) {

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
