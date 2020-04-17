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
            <div class="button_style" @click="ButtonEvent(1)">
              <buttonRadius
                style="width: 100%"
                v-bind:title="btntext[0]"
                v-bind:actived="buttonActived===1"
              ></buttonRadius>
            </div>
            <div class="button_style" @click="ButtonEvent(2)">
              <buttonRadius
                style="width: 100%"
                v-bind:title="btntext[1]"
                v-bind:actived="buttonActived===2"
              ></buttonRadius>
            </div>
            <div class="button_style" @click="ButtonEvent(3)">
              <buttonRadius
                style="width: 100%"
                v-bind:title="btntext[2]"
                v-bind:actived="buttonActived===3"
              ></buttonRadius>
            </div>
          </div>
          <div class="slider_style">
            <div class="label">{{btntext[3]}}</div>
            <div class="sliderstyle">
              <vue-slider
                ref="slider1"
                v-model="sliderNumber"
                v-bind="sliderOption"
                @change="formatter">
                <template slot="tooltip" slot-scope="tooltip">
                  <div class="custom-tooltip" style="color: #fff">{{tooltip.value}}°</div>
                </template>
              </vue-slider>
            </div>
          </div>
          <div class="verification_style">
           <div>{{text[0]}}</div>
          <div>{{text[1]}}</div>
          </div>
        </div>
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
@Component({
  components: {
    fullScreensLayout,
    VueSlider,
    buttonRadius
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
  position: fixed;
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
  width: 230px;
  height: auto;
  margin-left: 12px;
  margin-top: 50px;
  padding: 10px;
  background: rgba(81, 81, 81, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 6px;
}

.verification_style div {
  width: 100%;
  font-size: 22px;
  color: #ffffff;
  text-align: left;
  line-height: 42px;
  margin-left: 0px;
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
  width: 90px;
  height: 24px;
  color: #fff;
  font-size: 20px;
  line-height: 24px;
  float: left;
  pointer-events: none;
}

.custom-tooltip {
  min-width: 36px;
  height: 14px;
  font-size: 14px;
  line-height: 14px;
  padding: 5px;
  font-family: "Times New Roman";
  color: #373737 !important;
  text-align: center;
  background: #ffffff;
  border: 0 solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}

@media screen and (min-height: 600px) and (max-height: 800px), screen and (min-width: 950px) and (max-width: 1500px) {
  #Container3d{
    right: 318px;
  }
  .panel {
    width: 306px;
    right: 24px;
  }
  .buttonG {
    width: 100%;
    height: 42px;
  }
  .button_style {
    width: 90px;
    margin-top: 12px;
  }
  
  .sliderstyle {
    width: 196px;
  }
  .verification_style{
    margin-top: 36px;
  }
}

@media screen and (min-height: 450px) and (max-height: 599px), screen and (min-width: 700px) and (max-width: 949px) {
  #Container3d{
    right: 318px;
  }
  .panel {
    width: 306px;
    right: 24px;
  }
  .buttonG {
    width: 100%;
    height: 42px;
  }
  .button_style {
    width: 90px;
    margin-top: 12px;
  }
  .sliderstyle {
    width: 196px;
  }
  .verification_style{
    margin-top: 36px;
    padding: 8px;
    border-radius: 6px;
  }

  .verification_style div {
    font-size: 20px;
    line-height: 32px;
  }
}

@media screen and (max-height: 449px), screen and (max-width: 699px) {
  #Container3d{
    right: 224px;
  }

  .panel {
    width: 200px;
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
    width: 170px;
    height: auto;
    margin-left: 10px;
    margin-top: 24px;
  }

  .verification_style div {
    width: 100%;
    font-size: 16px;
    line-height: 24px;
  }

  .slider_style {
    width: 100%;
    height: 26px;
    margin-top: 40px;
    margin-left: 10px;
  }

  .sliderstyle {
    width: 116px;
    height: 26px;
    margin-left: 10px;
    margin-top: 2px;
    float: left;
  }

  .label {
    width: 60px;
    height: 16px;
    font-size: 16px;
    line-height: 16px;
    margin-top: 6px;
  }

  .custom-tooltip {
    min-width: 24px;
    height: 12px;
    font-size: 12px;
    line-height: 12px;
    padding: 4px;
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
