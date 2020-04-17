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
        <div class="panel">
          <div class="buttonG">
            <div class="button_style" @click="switchGraphic(1)">
              <buttonRadius
                style="width: 100%"
                v-bind:title="btntext[0]"
                v-bind:actived="buttonActived===1"
              ></buttonRadius>
            </div>
            <div class="button_style" @click="switchGraphic(2)">
              <buttonRadius
                style="width: 100%"
                v-bind:title="btntext[1]"
                v-bind:actived="buttonActived===2"
              ></buttonRadius>
            </div>
            <div class="button_style" @click="switchGraphic(3)">
              <buttonRadius
                style="width: 100%"
                v-bind:title="btntext[2]"
                v-bind:actived="buttonActived===3"
              ></buttonRadius>
            </div>
          </div>
          <div class="slider_style">
            <div class="label"  v-html="btntext[3]"></div>
            <div class="sliderstyle">
              <vue-slider
                ref="slider1"
                v-model="rotateNumber"
                v-bind="sliderOption1"
                @change="formatterRotation">
              </vue-slider>
            </div>
          </div>
          <div class="slider_style">
            <div class="label" v-html="btntext[4]"></div>
            <div class="sliderstyle">
              <vue-slider
                ref="slider2"
                v-model="sizeNumber"
                v-bind="sliderOption2"
                @change="formatterSize">
              </vue-slider>
            </div>
          </div>
          <div class="verification_style" @click="verificationEvent()">
              <buttonPrimary
                style="width: 100%"
                v-bind:title="btntext[5]"
                v-bind:actived="verificationActived"
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

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
import Component from 'vue-class-component';
import { ViewModel } from './ViewModel';
import buttonRadius from './ui/buttonRadius.vue';
import VueSlider from '../../../../src/component/ui/slider/vue-slider-component.umd.min.js';
import '../../../../src/component/ui/slider/default.css';
import buttonPrimary from '../../../babylon/template/ui/buttonPrimary.vue';

@Component({
  components: {
    fullScreensLayout,
    VueSlider,
    buttonRadius,
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
#Container3d{
  position: absolute;
  left: 0;
  right: 404px;
  height: 100%;
}

.panel {
  position: absolute;
  width: 372px;
  height: 300px;
  bottom: 50%;
  margin-bottom: -150px;
  right: 32px;
}
.buttonG {
  width: 100%;
  height: 42px;
}
.button_style {
  float: left;
  width: 112px;
  height: 100%;
  margin-left: 12px;
}
.verification_style{
  width: 112px;
  height: 42px;
  margin-left: 12px;
  margin-top: 50px;
}
.slider_style {
  width: 100%;
  height: 26px;
  margin-top: 50px;
  margin-left: 12px;
}

.sliderstyle {
  width: 216px;
  height: 26px;
  margin-left: 0px;
  float: left;
}

.label {
  width: 64px;
  height: 24px;
  color: #fff;
  font-size: 20px;
  line-height: 24px;
  float: left;
  pointer-events: none;
}

@media screen and (min-height: 600px) and (max-height: 800px)
, screen and (min-width: 950px) and (max-width: 1500px) {
  #Container3d{
    top:100px;
    bottom: 100px;
    height: auto;
    right: 322px;
  }

  .panel {
    width: 294px;
  }

  .button_style {
    width: 90px;
    margin-top: 12px;
     margin-left: 8px;
  }

}

@media screen and (min-height: 450px) and (max-height: 599px)
, screen and (min-width: 700px) and (max-width: 949px)  {
  #Container3d{
    top:80px;
    bottom: 80px;
    height: auto;
  right: 322px;
}

.panel {
  width: 294px;
}

  .button_style {
    width: 90px;
    margin-top: 12px;
     margin-left: 8px;
  }
}

@media screen and (max-height: 449px), screen and (max-width: 699px) {

#Container3d{
  right: 224px;
}

.panel {
  width: 195px;
  height: 220px;
  bottom: 50%;
  margin-bottom: -130px;
  right: 24px;
}
.buttonG {
  height: 28px;
}
.button_style {
  width: 60px;
  margin-left: 5px;
}
.verification_style{
  width: 80px;
  height: 28px;
  margin-left: 5px;
  margin-top: 24px;
}
.slider_style {
  width: 100%;
  height: 26px;
  margin-top: 36px;
  margin-left: 10px;
}

.sliderstyle {
  width: 136px;
  height: 26px;
  margin-left: 5px;
  float: left;
}

.label {
  width: 42px;
  height: 16px;
  font-size: 16px;
  line-height: 16px;
  margin-top: 6px;
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
