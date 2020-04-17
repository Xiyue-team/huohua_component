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
          <div class="dropDown" @click="dropDown()">
            <BaseSelect @change="selectChange" :picList="picList" :currentShow="current" :isOpen="boolOpen" :dropIcon="dropIcon"></BaseSelect>
            </div>
          <div class="button_style" @click="ButtonEventX()">
            <buttonRadius
              style="width: 100%"
              v-bind:title="buttonTitle1"
              v-bind:actived="buttonActivedX"
            ></buttonRadius>
          </div>
          <div class="button_style" @click="ButtonEventY()">
            <buttonRadius
              style="width: 100%"
              v-bind:title="buttonTitle2"
              v-bind:actived="buttonActivedY"
            ></buttonRadius>
          </div>
          <div class="button_style" @click="ButtonEvent2()">
            <buttonRadius
              style="width: 100%"
              v-bind:title="buttonTitle3"
              v-bind:actived="buttonActived1"
            ></buttonRadius>
          </div>
        </div>
        <div v-show="buttonActivedX" class="slider_style">
          <div class="label"  :style="`background-image: url(${picw})`"></div>
          <div class="sliderstyle">
            <vue-slider
              ref="slider1"
              v-model="sliderNumber"
              v-bind="sliderOption"
              @change="formatter"
            >
              <template slot="tooltip" slot-scope="tooltip">
                <div class="custom-tooltip" style="color: #fff">{{ tooltip.value > 10 ? Math.floor(tooltip.value / 10) :tooltip.value / 10}}</div>
              </template>
            </vue-slider>
          </div>
        </div>
        <div v-show="buttonActivedY" class="slider_style2">
          <div class="label"  :style="`background-image: url(${pica})`"></div>
          <div class="sliderstyle">
            <vue-slider
              ref="slider2"
              v-model="sliderNumber2"
              v-bind="sliderOption"
              @change="formatter2"
            >
              <template slot="tooltip" slot-scope="tooltip">
                <div class="custom-tooltip" style="color: #fff">{{ tooltip.value > 10 ? Math.floor(tooltip.value / 10) :tooltip.value / 10}}</div>
              </template>
            </vue-slider>
          </div>
        </div>
        <div id="tip" v-if="buttonActived1" :style="`background-image: url(${picmsg})`">
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
import buttonRadius from '../../../babylon/template/ui/buttonRadius.vue';
import VueSlider from '../../../../src/component/ui/slider/vue-slider-component.umd.min.js';
import '../../../../src/component/ui/slider/default.css';
import BaseSelect from '../../../babylon/template/ui/baseSelect.vue';
@Component({
  components: {
    fullScreensLayout,
    buttonRadius,
    VueSlider,
    BaseSelect
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
#Container3d{
  width: 60%;
  height: 100%;
  margin-left: 20px;
}
.buttonG {
  position: absolute;
  width: 160px;
  height: 222px;
  bottom: 50%;
  right: 32px;
}
.dropDown {
  width: 100%;
  height: 42px;
  margin-top: 111px;
}
.button_style {
  width: 100%;
  height: 42px;
  margin-top: 18px;
}

.slider_style {
  position: absolute;
  width: 204px;
  height: 26px;
  padding-bottom: 9px;
  bottom: 50%;
  right: 202px;
}
.slider_style2 {
  position: absolute;
  width: 204px;
  height: 26px;
  padding-top: 30px;
  top: 50%;
  right: 202px;
}
.sliderstyle {
  width: 160px;
  height: 26px;
  margin-left: 10px;
  float: left;
}
#tip {
  position: absolute;
  width: 135px;
  height: 40px;
  top: 50%;
  right: 202px;
  margin-top: 69px;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: top right;
  background-size: contain;
}
.label {
  width: 26px;
  height: 26px;
  color: #fff;
  font-size: 24px;
  line-height: 26px;
  text-align: center;
  font-family: "Times New Roman";
  font-style: italic;
  float: left;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: top right;
  background-size: contain;
}

.custom-tooltip {
  font-size: 24px;
  font-family: "Times New Roman";
}
@media screen and (min-height: 600px) and (max-height: 800px) {

}
@media screen and (min-height: 450px) and (max-height: 599px) {
 .buttonG {
    right: 12px;
  }
  #Container3d{
    width: 50%;
    height: 100%;
    margin-left: 5px;
  }
}

@media screen and (min-height: 300px) and (max-height: 449px) {
  .buttonG {
    width: 140px;
    height: 204px;
    right: 14px;
    top: 80px;
  }
  #Container3d{
    width: 50%;
    height: 100%;
    margin-left: 5px;
  }
  .custom-tooltip {
    font-size: 18px;
    line-height: 18px;
  }
  .dropDown {
    margin-top: 0px;
  }
  .button_style {
    margin-top: 12px;
  }
  #tip {
    top: 0px;
    right: 164px;
    margin-top: 242px;
  }
  .slider_style {
    width: 164px;
    top: 0px;
    margin-top: 150px;
    padding-bottom: 0px;
    right: 164px;
  }
  .slider_style2 {
    width: 164px;
    top: 0px;
    margin-top: 204px;
    padding-top: 0px;
    right: 164px;
  }
  .sliderstyle {
    width: 120px;
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

.vue-slider-dot-handle{
  border: 0px !important;
}
</style>
