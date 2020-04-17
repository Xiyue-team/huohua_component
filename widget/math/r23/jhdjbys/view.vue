<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <span class="title_induction" v-bind:class="{'title_inductionPhone': isPhone}">{{title}}</span>
        <div id="box" style="width: 100%; height: 100%"></div>

        <div class="buttonBackground" v-bind:class="{'buttonBackgroundPhone': isPhone}">
          <div class="buttonArea">
            <div class="sliderStyle" v-bind:class="{'sliderStylePhone': isPhone}">
              <div class="sliderTextA" v-bind:class="{'sliderTextPhone': isPhone}">A</div>
              <vue-slider
                      style="position: absolute; top: 0; left: 0; right: 0; margin: auto"
                      v-model="sliderNumTop"
                      v-bind="sliderOption"
              ></vue-slider>
              <div class="sliderTextB" v-bind:class="{'sliderTextPhone': isPhone}">B</div>
              <vue-slider
                      style="position: absolute; bottom: 0px; left: 0; right: 0; margin: auto"
                      v-model="sliderNumBottom"
                      v-bind="sliderOption"
              ></vue-slider>
            </div>
            <!--:style="{ transform: buttonAreaScale}"-->
            <div class="leftRightButton">
              <div class="leftButton">
                <div class="buttonStyle" style="top: 0px; left: 0px;" @click="buttonClickEvent1">
                  <i_button v-bind="buttonOption" v-bind:clickNumber.sync="clickNumber">

                  </i_button>
                </div>

                <div class="buttonStyle" style="top: 27.4%; left: 0px;" @click="buttonClickEvent2">
                  <i_button v-bind="buttonOption2" v-bind:clickNumber.sync="clickNumber2">

                  </i_button>
                </div>

                <div class="buttonStyle" style="top: 53.85%; left: 0px;" @click="buttonClickEvent3">
                  <i_button v-bind="buttonOption3" v-bind:clickNumber.sync="clickNumber3">

                  </i_button>
                </div>

                <div class="buttonStyle" style="top: 81.3%; left: 0px;" @click="buttonClickEvent4">
                  <i_button v-bind="buttonOption4" v-bind:clickNumber.sync="clickNumber4">

                  </i_button>
                </div>
              </div>
              <div class="rightButton">
                <div class="buttonStyle" style="top: 0px; left: 0px;" @click="buttonClickEvent5">
                  <i_button v-bind="buttonOption5" v-bind:clickNumber.sync="clickNumber5">

                  </i_button>
                </div>

                <div class="buttonStyle" style="top: 27.4%; left: 0px;" @click="buttonClickEvent6">
                  <i_button v-bind="buttonOption6" v-bind:clickNumber.sync="clickNumber6">

                  </i_button>
                </div>

                <div class="buttonStyle" style="top: 53.85%; left: 0px;" @click="buttonClickEvent7">
                  <i_button v-bind="buttonOption7" v-bind:clickNumber.sync="clickNumber7">

                  </i_button>
                </div>

                <div class="buttonStyle" style="top: 81.3%; left: 0px;" @click="buttonClickEvent8">
                  <i_button v-bind="buttonOption8" v-bind:clickNumber.sync="clickNumber8">

                  </i_button>
                </div>
              </div>
            </div>
          </div>
        </div>


      </template>

      <template slot="controlPanel"  slot-scope="controlPanel">

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
import i_button from '../../../../src/component/ui/buttonImage.vue';


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

  .buttonBackground {
    width: 27%;
    height: 66.5%;
    position: absolute;
    z-index: 99;
    top: 0;
    bottom: 0;
    right: 52px;
    margin: auto;
    background: rgba(216,216,216,0.16);
    border: 2px solid rgba(255,255,255,0.10);
    border-radius: 8px;
  }

  .buttonBackgroundPhone {
    right: 25px;
  }

  .buttonArea {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 99;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    transform: scale(1, 1);
    max-width: 324px;
    max-height: 429px;
  }

  .leftRightButton {
    width: 70%;
    height: 50.7%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 7%;
    margin: auto;
    max-width: 228px;
    max-height: 228px;
  }

  .leftButton {
    width: 43%;
    height: 100%;
    position: absolute;
    left: 0;
    bottom: 0px;
  }

  .rightButton {
    width: 43%;
    height: 100%;
    position: absolute;
    right: 0;
    bottom: 0px;
  }

  .buttonStyle {
    width: 100%;
    position: absolute;
  }

  .sliderStyle {
    position: absolute;
    top: 13px;
    left: 0;
    right: 0px;
    margin: auto;
    z-index: 99;
    width: 70%;
    height: 24.5%;
    max-width: 240px;
    max-height: 110px;
  }

  .sliderStylePhone {
    /*width: 180px;*/
    /*height: 180px;*/
    /*right: 0;*/
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
</style>
