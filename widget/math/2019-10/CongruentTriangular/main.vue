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
            <div class="button_style1" @click="selectEvent(0)">
              <buttonRadius
                style="width: 100%"
                v-bind:title="btntext[0]"
                v-bind:actived="selectActived===0"
                v-bind:disabled="panRotateDisabled"
              ></buttonRadius>
            </div>
            <div class="button_style" @click="selectEvent(1)">
              <buttonRadius
                style="width: 100%"
                v-bind:title="btntext[1]"
                v-bind:actived="selectActived===1"
                v-bind:disabled="panRotateDisabled"
              ></buttonRadius>
            </div>
            <div class="button_style" @click="foldEvent()">
              <buttonRadius
                style="width: 100%"
                v-bind:title="btntext[2]"
                v-bind:actived="foldActived"
              ></buttonRadius>
            </div>
          </div>
          <div class="stepG" v-if="selectActived===1">
            <div class="label">{{btntext[5]}}</div>
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
            <div class="msgG" @click="edgeEvent()">
              <CheckBox
            v-bind:value="edgeActived"
            v-bind="Option1">{{btntext[3]}}</CheckBox>
            </div>
          </div>
          <div class="msgGP">
            <div class="msgG" @click="angleEvent()">
              <CheckBox
            v-bind:value="angleActived"
            v-bind="Option1">{{btntext[4]}}</CheckBox>
            </div>
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
  right: 314px;
  height: 100%;
}

.panel {
  position: fixed;
  width: 288px;
  height: 280px;
  top: 50%;
  right: 24px;
  margin-top: -140px;
}
.buttonG {
  width: 100%;
  height: 42px;
}

.button_style1 {
  float: left;
  width: 88px;
  height: 100%;
}
.button_style {
  float: left;
  width: 88px;
  height: 100%;
  margin-left: 12px;
}

.stepG {
  width: 100%;
  height: 26px;
  margin-top: 50px;
  margin-bottom: 40px;
}

.label {
  float: left;
  width: 54px;
  height: 16px;
  color: #fff;
  text-align: center;
  font-size: 16px;
  line-height: 16px;
  margin-top: 5px;
  pointer-events: none;
}
.sliderstyle {
  width: 170px;
  height: 26px;
  float: left;
  margin-left: 10px;
}
.msgGP {
  width: 100%;
  height: 42px;
  margin-top: 12px;
}
.msgG {
  display:inline-block;
  width: auto;
  height: 100%;
  background: rgba(81, 81, 81, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 6px;
}

.custom-tooltip {
  font-size: 14px;
  padding: 6px;
  font-family: "Times New Roman";
  color: #373737 !important;
  text-align: center;
  background: #ffffff;
  border: 0 solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}

@media screen  and (max-height: 449px), screen and (max-width: 699px) {
  #Container3d{
    right: 186px;
  }
  .panel {
    width: 162px;
    height: 200px;
    margin-top: -80px;
  }

  .buttonG {
    height: 28px;
  }
  .button_style1 {
    float: left;
    width: 50px;
    height: 100%;
  }
  .button_style {
    float: left;
    width: 50px;
    height: 100%;
    margin-left: 6px;
  }
  .stepG {
    margin-top: 50px;
    margin-bottom: 0px;
  }

  .label {
    width: 50px;
    height: 16px;
    font-size: 16px;
    line-height: 16px;
    margin-top: 5px;
  }
  .custom-tooltip {
    font-size: 14px;
    padding: 4px;
  }

  .sliderstyle {
    width: 102px;
    height: 26px;
    float: left;
    margin-left: 10px;
  }
  .msgGP {
    margin-top: 12px;
    height: 28px;
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