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
          <div class="slider_style">
            <div class="label"  v-html="btntext[1]"></div>
            <div class="sliderstyle">
              <vue-slider
                ref="slider1"
                v-model="sliderNumber"
                v-bind="sliderOption1"
                @change="formatterR"
              >
                <template slot="tooltip" slot-scope="tooltip">
                  <div class="custom-tooltip" style="color: #fff">{{tooltip.value}}</div>
                </template>
              </vue-slider>
            </div>
          </div>
          <div class="slider_style">
            <div class="label" v-html="btntext[0]"></div>
            <div class="sliderstyle">
              <vue-slider
                ref="slider2"
                v-model="sliderNumber2"
                v-bind="sliderOption2"
                @change="formatterN">
                <template slot="tooltip" slot-scope="tooltip">
                  <div class="custom-tooltip" style="color: #fff">{{tooltip.value}}</div>
                </template>
              </vue-slider>
            </div>
          </div>
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
import VueSlider from '../../../../src/component/ui/slider/vue-slider-component.umd.min.js';
import '../../../../src/component/ui/slider/default.css';
@Component({
  components: {
    fullScreensLayout,
    VueSlider
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
  position: absolute;
  left: 0;
  right: 348px;
  top: 40px;
  bottom: 0;
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

.buttonG {
  position: absolute;
  width: 264px;
  height: 100px;
  bottom: 50%;
  right: 84px;
}

.slider_style {
  width: 100%;
  height: 26px;
  margin-top: 50px;
}

.sliderstyle {
  width: 180px;
  height: 26px;
  margin-left: 10px;
  float: left;
}

.label {
  width: 74px;
  height: 20px;
  color: #fff;
  font-size: 20px;
  line-height: 20px;
  margin-top: 3px;
  float: left;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: top right;
  background-size: contain;
}

.custom-tooltip {
  min-width: 24px;
  font-size: 14px;
  padding: 5px;
  font-family: "Times New Roman";
  color: #373737 !important;
  text-align: center;
  background: #FFFFFF;
  border: 0 solid rgba(0,0,0,0.10);
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
  border-radius: 4px;
}

#Container {
  background-color: #333333;
}
@media screen and (min-height: 450px) and (max-height: 599px) {
  .buttonG {
    right: 34px;
  }
  #Container3d{
    right: 298px;
  }
}
@media screen and (max-height: 449px) {
  #Container3d{
    right: 298px;
  }
  .buttonG {
    width: 224px;
    right: 24px;
  }
  .label {
    width: 74px;
    height: 18px;
    color: #fff;
    font-size: 18px;
    line-height: 18px;
    margin-top: 3px;
  }
  .sliderstyle {
    width: 140px;
    height: 26px;
    margin-left: 10px;
    float: left;
  }
}



</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
.vue-slider-dot-handle{
  border: 0px !important;
}
</style>
