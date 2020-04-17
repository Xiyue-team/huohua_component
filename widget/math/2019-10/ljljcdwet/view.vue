<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <div style="width: 100%; height: 100%; position: absolute; background-color: #2d2d2d">
          <span class="title_induction">{{lang.title}}</span>
          <div id="box1" style="position: absolute; width: 100%; height: 100%;">
            <canvas width="1200" height="675" id="cardImageCanvas1" ></canvas>
          </div>
          <div id="box2" style="position: absolute; width: 100%; height: 100%;">
            <canvas width="1200" height="675" id="cardImageCanvas2" ></canvas>
          </div>
          <div class="buttonArea">
            <div class="tipText">
              <div style="position: absolute; width: 100%; height: 100%;">
                {{lang.tipText[0]}}<span style="font-style: italic">p</span>
                {{lang.tipText[1]}}<span style="font-style: italic">A</span>
                {{lang.tipText[2]}}<span style="font-style: italic">q</span>
                {{lang.tipText[3]}}<span style="font-style: italic">B</span>
              </div>
              <!--条件p对应集合A；条件q对应集合B-->
            </div>

            <div class="sliderStyle">
              <div class="sliderTextA">A</div>
              <vue-slider
                      style="position: absolute; top: 0; right: 0;"
                      v-model="sliderNumTop"
                      v-bind="sliderOption"
              ></vue-slider>
              <div class="sliderTextB">B</div>
              <vue-slider
                      style="position: absolute; bottom: 0px; right: 0;"
                      v-model="sliderNumBottom"
                      v-bind="sliderOption"
              ></vue-slider>
            </div>

            <div class="leftRightButton">
              <div class="buttonStyle" style="top: 0px; left: 0px;" @click="buttonClickEvent1">
                <i_button style="width: 68px" :title="lang.button[0]" v-bind:clickNumber.sync="clickNumber1" v-bind:isActive.sync="isActive1">

                </i_button>
              </div>

              <div class="buttonStyle" style="top: 0px; left: 88px;" @click="buttonClickEvent2">
                <i_button style="width: 68px" :title="lang.button[1]" v-bind:clickNumber.sync="clickNumber2" v-bind:isActive.sync="isActive2">

                </i_button>
              </div>

              <div class="buttonStyle" style="top: 0; left: 176px;" @click="buttonClickEvent3">
                <i_button style="width: 68px" :title="lang.button[2]" v-bind:clickNumber.sync="clickNumber3" v-bind:isActive.sync="isActive3">

                </i_button>
              </div>
            </div>
          </div>
        </div>

      </template>
    </fullScreens_layout>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreens_layout from '../../../../src/component/layout/fullScreens_layout.vue';
import { ViewModel } from './ViewModel';
import Component from 'vue-class-component';
import h_button from '../../../../src/component/ui/buttonEllipse.vue';
import vueSlider from 'vue-slider-component/dist-css/vue-slider-component.common.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'
import i_button from '../../../../src/component/ui/buttonEllipse';


@Component({
  components: {
    fullScreens_layout,
    h_button,
    vueSlider,
    i_button
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
  .title_induction{
    width: 100%;
    font-family: PingFangSC-Medium;
    font-size: 28px;
    color: #ffffff;
    line-height: 28px;
    position: absolute;
    left: 32px;
    top: 32px;
    z-index: 99;
  }

  .title_inductionPhone{
    font-size: 20px;
    left: 16px;
    top: 16px;
  }

  .buttonArea {
    width: 260px;
    height: 230px;
    position: absolute;
    z-index: 99;
    top: 50%;
    margin-top: -115px;
    right: 100px;
  }

  .tipText {
    width: 260px;
    height: 27px;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -130px;
    color: white;
    font-size: 16px;
    line-height: 27px;
    text-align: center;
  }

  .leftRightButton {
    max-width: 244px;
    min-height: 42px;
    position: absolute;
    left: 0;
    right: 0;
    top: 47px;
    margin: auto;
  }

  .buttonStyle {
    width: 100%;
    position: absolute;
  }

  .sliderStyle {
    position: absolute;
    top: 120px;
    left: 0;
    right: 0px;
    margin: auto;
    z-index: 99;
    width: 240px;
    height: 110px;
  }

  .sliderTextA {
    position: absolute;
    font-family: "Times New Roman", Times, serif;
    font-size: 24px;
    font-style: italic;
    color: #FFFFFF;
    text-align: right;
    top: 0;
  }

  .sliderTextB {
    position: absolute;
    font-family: "Times New Roman", Times, serif;
    font-size: 24px;
    font-style: italic;
    color: #FFFFFF;
    text-align: right;
    bottom: 0;
  }

  .sliderTextPhone {
    font-size: 20px;
  }

  @media screen and (min-width: 1700px) {
    .tipText {
      transform: scale(1.2, 1.2);
    }
  }

  @media screen and (max-width: 1100px) {
    .buttonArea {
      right: 80px;
      width: 200px;
      height: 184px;
      top: 50%;
      margin-top: -92px;
    }

    .tipText {
      transform: scale(0.8, 0.8);
    }

    .leftRightButton {
      transform: scale(0.8, 0.8);
      top: 30px;
      left: -20px;
    }

    .sliderStyle {
      width: 192px;
      height: 88px;
      top: 90px;
    }

    .sliderTextA {
      top: -4px;
      left: -4px;
      transform: scale(0.8, 0.8);
    }

    .sliderTextB {
      bottom: -4px;
      left: -4px;
      transform: scale(0.8, 0.8);
    }
  }

  @media screen and (max-width: 900px) {
    .buttonArea {
      right: 24px;
      width: 150px;
      height: 138px;
      top: 50%;
      margin-top: -69px;
    }

    .tipText {
      transform: scale(0.6, 0.6);
    }

    .leftRightButton {
      transform: scale(0.6, 0.6);
      top: 30px;
      left: -35px;
    }

    .sliderStyle {
      width: 144px;
      height: 66px;
      top: 72px;
    }

    .sliderTextA {
      top: -4px;
      left: -4px;
      transform: scale(0.6, 0.6);
    }

    .sliderTextB {
      bottom: -4px;
      left: -4px;
      transform: scale(0.6, 0.6);
    }

    .title_induction {
      font-size: 12px;
      left: 10px;
      top: 10px;
    }
  }
</style>
<style>
    .control-panel_div_floatRight {
      display: none;
    }

    #box {
        position: absolute;
        z-index: 98;
    }

    #reset {
        z-index: 99;
    }

    canvas {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
</style>
