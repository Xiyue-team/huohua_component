<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
          <template slot="viewBox" slot-scope="viewBox">
              <div class="title_text">{{title}}</div>
              <div id="3dContainer"></div>

              <div class="three_Slider">
                  <div class="oneSlider">
                      <div class="sliderText">{{sliderText1}}</div>
                      <div class="leftText">{{leftText}}</div>
                      <div class="rightText">{{rightText}}</div>
                      <vue-slider ref="slider"
                          class="sliderPosition"
                          v-model="sliderNum1"
                          v-bind="sliderOption1"
                      ></vue-slider>
                  </div>
                  <div class="twoSlider">
                      <div class="sliderText">{{sliderText2}}</div>
                      <div class="leftText">{{leftText}}</div>
                      <div class="rightText">{{rightText}}</div>
                      <vue-slider ref="slider"
                                  class="sliderPosition"
                                  v-model="sliderNum2"
                                  v-bind="sliderOption2"
                      ></vue-slider>
                  </div>
                  <div class="threeSlider">
                      <div class="sliderText">{{sliderText3}}</div>
                      <div class="leftText">{{leftText}}</div>
                      <div class="rightText">{{rightText}}</div>
                      <vue-slider ref="slider"
                                  class="sliderPosition"
                                  v-model="sliderNum3"
                                  v-bind="sliderOption3"
                      ></vue-slider>
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
import { ViewModel } from './ViewModel';
import Component from 'vue-class-component';
import vueSlider from 'vue-slider-component/dist-css/vue-slider-component.common.js';
import 'vue-slider-component/dist-css/vue-slider-component.css';
import 'vue-slider-component/theme/default.css';

@Component({
  components: {
    fullScreensLayout, vueSlider
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_text{
        font-size: 24px;
        color: #ffffff;
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
    }

    .three_Slider {
        position: absolute;
        top: 50%;
        right: 93px;
        margin-top: -160px;
        z-index: 99;
        width: 290px;
        height: 321px;
    }

    .oneSlider {
        width: 100%;
        height: 107px;
        position: absolute;
        top: 0;
    }

    .twoSlider {
        width: 100%;
        height: 107px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
    }

    .threeSlider {
        width: 100%;
        height: 107px;
        position: absolute;
        bottom: 0;
    }

    .sliderPosition {
        position: absolute;
        bottom: 30px;
        left: 0;
        right: 0;
        margin: auto
    }

    .sliderText {
        width: 100%;
        font-size: 24px;
        color: #FFFFFF;
        text-align: center;
        line-height: 24px;
        position: absolute;
        top: 20px;
    }

    .leftText {
        min-width: 24px;
        min-height: 24px;
        font-size: 24px;
        color: #FFFFFF;
        text-align: center;
        line-height: 24px;
        position: absolute;
        bottom: 30px;
        left: 0
    }

    .rightText {
        min-width: 24px;
        min-height: 24px;
        font-size: 24px;
        color: #FFFFFF;
        text-align: center;
        line-height: 24px;
        position: absolute;
        bottom: 30px;
        right: 0;
    }

    @media (min-width: 0) and (max-width: 860px) {
        .three_Slider {
            right: 0;
            width: 145px;
            height: 161px;
            margin-top: -80px;
            right: 50px;
        }

        .oneSlider {
            height: 53px;
        }

        .twoSlider {
            height: 53px;
        }

        .threeSlider {
            height: 53px;
        }

        .sliderPosition {
            bottom: 15px;
        }

        .sliderText {
            font-size: 12px;
            color: #FFFFFF;
            text-align: center;
            line-height: 12px;
            position: absolute;
            top: 5px;
        }

        .leftText {
            font-size: 12px;
            bottom: 15px;
        }

        .rightText {
            font-size: 12px;
            bottom: 15px;
        }




        .title_text{
            font-size: 18px;
            color: #ffffff;
            line-height: 18px;
            margin: 0;
            padding: 0;
            position: absolute;
            top: 12px;
            left: 12px;
        }
    }
</style>
<style>
    .control-panel_div_floatRight{
        z-index: -1;
    }
</style>
