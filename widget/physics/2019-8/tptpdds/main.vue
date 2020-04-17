<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
          <template slot="viewBox" slot-scope="viewBox">
              <div class="title_text">{{title}}</div>
              <div id="3dContainer"></div>

              <div class="button_div">

                  <div class="weight_button">
                      <div class="top_left_weight weight" @click="isShowButton1 = !isShowButton1">
                          <div class="top_left_weight_image weight_image_position">
                              <img style="width: 100%" src="./sub_static/img/weights5g.png"/>
                          </div>
                          <div class="weight_button_image">
                              <img src="./sub_static/img/weightButtonImage.png" v-show="isShowButton1"/>
                              <img src="./sub_static/img/weightButtonImageClick.png" v-show="!isShowButton1"/>
                          </div>
                      </div>

                      <div class="top_right_weight weight" @click="isShowButton2 = !isShowButton2">
                          <div class="top_right_weight_image weight_image_position">
                              <img style="width: 100%" src="./sub_static/img/weights10g.png"/>
                          </div>
                          <div class="weight_button_image">
                              <img src="./sub_static/img/weightButtonImage.png" v-show="isShowButton2"/>
                              <img src="./sub_static/img/weightButtonImageClick.png" v-show="!isShowButton2"/>
                          </div>
                      </div>

                      <div class="bottom_left_weight weight" @click="isShowButton3 = !isShowButton3">
                          <div class="bottom_left_weight_image weight_image_position">
                              <img style="width: 100%" src="./sub_static/img/weights20g.png"/>
                          </div>
                          <div class="weight_button_image">
                              <img src="./sub_static/img/weightButtonImage.png" v-show="isShowButton3"/>
                              <img src="./sub_static/img/weightButtonImageClick.png" v-show="!isShowButton3"/>
                          </div>
                      </div>

                      <div class="bottom_right_weight weight" @click="isShowButton4 = !isShowButton4">
                          <div class="bottom_right_weight_image weight_image_position">
                              <img style="width: 100%" src="./sub_static/img/weights50g.png"/>
                          </div>
                          <div class="weight_button_image">
                              <img src="./sub_static/img/weightButtonImage.png" v-show="isShowButton4"/>
                              <img src="./sub_static/img/weightButtonImageClick.png" v-show="!isShowButton4"/>
                          </div>
                      </div>
                  </div>

                  <div id="replaceStoneButton" class="replaceStoneButton" @click="replaceStoneButton">
                    <div style="width: 100%; height: 100%; position: absolute; text-align: center;">
                        <span class="replaceStoneButtonText">{{buttonText}}</span>
                    </div>
                  </div>
              </div>

              <div class="threeSlider">
                  <div class="sliderText">{{sliderText}}</div>
                  <vue-slider ref="slider"
                              class="sliderPosition"
                              v-model="sliderNum"
                              v-bind="sliderOption"
                  ></vue-slider>
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
    html {
        -webkit-tap-highlight-color:transparent;
    }

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

    .button_div {
        position: absolute;
        top: 50%;
        right: 93px;
        margin-top: -242px;
        z-index: 99;
        width: 180px;
        height: 484px;
    }

    .weight_button {
        width: 144px;
        height: 318px;
        position: absolute;
        left: 0;
    }

    .weight {
        width: 50px;
        height: 144px;
    }

    .top_left_weight {
        position: absolute;
        left: 0;
        top: 0;
    }

    .top_right_weight {
        position: absolute;
        right: 0;
        top: 0;
    }

    .bottom_left_weight {
        position: absolute;
        left: 0;
        bottom: 0;
    }

    .bottom_right_weight {
        position: absolute;
        right: 0;
        bottom: 0;
    }

    .weight_button_image {
        width: 22px;
        height: 22px;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }

    .weight_button_image img {
        position: absolute;
        width: 100%;
    }

    .weight_image_position {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 30px;
        margin: auto;
    }

    .top_left_weight_image {
        width: 30px;
        height: 68px;
    }

    .top_right_weight_image {
        width: 36px;
        height: 82px;
    }

    .bottom_left_weight_image {
        width: 42px;
        height: 96px;
    }

    .bottom_right_weight_image {
        width: 50px;
        height: 114px;
    }

    .threeSlider {
        width: 180px;
        height: 60px;
        position: absolute;
        top: 50%;
        right: 93px;
        z-index: 99;
        margin-top: 100px;
    }

    .sliderPosition {
        position: absolute;
        bottom: 0px;
        left: 0;
    }

    .sliderText {
        width: 100%;
        font-size: 24px;
        color: #FFFFFF;
        text-align: center;
        line-height: 24px;
        position: absolute;
        top: 0px;
    }

    .replaceStoneButton {
        min-width: 112px;
        min-height: 42px;
        position: absolute;
        left: 0;
        bottom: 0;
        background: #EBEBEB;
        border-radius: 21px;
        border-radius: 21px;
        color: #525252;
    }

    .replaceStoneButton:active {
        background: #0199ff;
        color: #ffffff;
    }

    .replaceStoneButton:hover {
        cursor: pointer;
    }

    .replaceStoneButtonText {
        display: inline-block;
        position: relative;
        font-size: 18px;
        line-height: 18px;
        top: 50%;
        margin-top: -8px;
        vertical-align: top;
    }

    @media (min-width: 0) and (max-width: 740px) {
        .button_div {
            transform: scale(0.5);
            right: 10px;
        }

        .threeSlider {
            width: 90px;
            height: 40px;
            right: 55px;
            margin-top: 50px;
        }

        .sliderText {
            font-size: 12px;
            line-height: 12px;
        }
    }

    @media (min-width: 740px) and (max-width: 860px) {
        .button_div {
            transform: scale(0.75);
            right: 0;
        }

        .threeSlider {
            width: 135px;
            height: 40px;
            right: 30px;
            margin-top: 75px;
        }

        .sliderText {
            font-size: 14px;
            line-height: 14px;
        }
    }
</style>
<style>
    .control-panel_div_floatRight{
        z-index: -1;
    }
</style>
