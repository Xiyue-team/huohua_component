<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
       

        <div class="panel">
          <div class="buttonG">
            <div class="button_style1" @click="ButtonEvent(1)">
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
          </div>
          <div class="sliderG">
            <div class="label">{{btntext[2]}}</div>
            <div class="sliderstyle">
              <vue-slider
                ref="slider1"
                v-model="sliderNumber"
                v-bind="sliderOption"
                @change="formatter"
              >
                <template slot="tooltip" slot-scope="tooltip">
                  <div class="custom-tooltip" style="color: #fff">{{ tooltip.value }}°</div>
                </template>
              </vue-slider>
            </div>
          </div>
          <div class="msgGP">
            <div class="msgG" @click="pointEvent()">
              <CheckBox v-bind:value="point" v-bind="Option1">{{btntext[4]}}</CheckBox>
            </div>
          </div>
          <div class="msgGP">
            <div class="msgG" v-if="point" @click="angleEvent()">
              <CheckBox v-bind:value="angle" v-bind="Option1">{{btntext[5]}}</CheckBox>
            </div>
          </div>
        </div>
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
import buttonRadius from '../../../babylon/template/ui/buttonRadius.vue';
import VueSlider from '../../../../src/component/ui/slider/vue-slider-component.umd.min.js';
import '../../../../src/component/ui/slider/default.css';
import CheckBox from '../../../babylon/template/ui/CheckBox.vue';
@Component({
  components: {
    fullScreensLayout,
    VueSlider,
    CheckBox,
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

#Container3d {
  position: absolute;
  left: 0;
  right: 272px;
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

.panel {
  position: fixed;
  width: 240px;
  height: 320px;
  top: 50%;
  right: 32px;
  margin-top: -160px;
}
.buttonG {
  width: 100%;
  height: 42px;
}
.button_style1 {
  float: left;
  width: 112px;
  height: 100%;
}
.button_style {
  float: left;
  width: 112px;
  height: 100%;
  margin-left: 16px;
}

.sliderG {
  width: 100%;
  height: 108px;
  margin-top: 22px;
  background: rgba(81, 81, 81, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 6px;
}

.sliderG p {
  float: left;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
  line-height: 16px;
  margin: 22px 10px 22px 10px;
}
.msgGP {
  width: 100%;
  height: 42px;
  margin-top: 22px;
}
.msgG {
  display: inline-block;
  width: auto;
  height: 42px;
  background: rgba(81, 81, 81, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 6px;
}

.sliderstyle {
  width: 190px;
  height: 26px;
  float: left;
  margin-top: 35px;
  margin-left: 25px;
}

.label {
  width: 100%;
  height: 26px;
  margin-top: 13px;
  color: #fff;
  text-align: center;
  font-size: 16px;
  line-height: 16px;
  pointer-events: none;
}

.custom-tooltip {
  font-size: 14px;
  padding: 6px;
  min-width: 24px;
  font-family: "Times New Roman";
  color: #373737 !important;
  text-align: center;
  background: #ffffff;
  border: 0 solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}

#Container {
  background-color: #333333;
}
@media screen and (min-height: 450px) and (max-height: 599px) {
}
@media screen and (max-height: 449px), screen and (max-width: 699px) {
  .buttonG {
    width: 100%;
    height: 28px;
  }
  .panel {
    right: 24px;
    width: 160px;
    height: 200px;
    margin-top: -100px;
  }
  .button_style1 {
    width: 75px;
  }
  .button_style {
    width: 75px;
    margin-left: 10px;
  }

  .sliderG {
    width: 100%;
    height: 80px;
    margin-top: 8px;
    border-radius: 6px;
  }
  .label {
    height: 20px;
    margin-top: 8px;
    font-size: 14px;
    line-height: 14px;
  }
  .sliderstyle {
    width: 110px;
    margin-top: 26px;
  }
  .custom-tooltip {
    height: 14px;
    font-size: 14px;
    min-width: 24px;
    line-height: 18px;
    border-radius: 4px;
    padding: 4px;
  }

  .msgGP {
    height: 28px;
    margin-top: 12px;
  }

  .msgG {
    height: 28px;
  }

  #Container3d {
    right: 184px;
  }
}
</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
</style>
