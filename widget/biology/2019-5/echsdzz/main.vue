<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">二次函数的最值</div>

                  <div class="rightLayout1" v-show="isStatic" style="font-size: 24px; color: #fff">
                      <div class='rightLayOutSpan' style="position: absolute;top: 0px;">
                          <span>对称轴:  </span>
                          <span class="formulaStyle">x</span>
                          <span> = 1</span>
                      </div>
                      <div style="position: absolute;top: 42px;">
                          <span>区间: [ </span>
                          <span class="formulaStyle">x₁ , x₁ + m </span>
                          <span>]</span>
                      </div>
                      <div class="sliderStyle"  v-bind:class="{'sliderStylePhone': isPhone}">
                          <div class="sliderTextA">m</div>
                          <vue-slider
                                  style="position: absolute; top: 0px; right: 0"
                                  v-model="sliderNum1"
                                  v-bind="sliderOption1"
                                  :tooltip="'always'"
                          ></vue-slider>
                      </div>
                  </div>

                  <div class="rightLayout2" v-show="isDynamic" style="font-size: 24px; color: #fff">
                      <div style="position: absolute;">
                          <span>区间: [ </span>
                          <span class="formulaStyle">x₁ , x₂</span>
                          <span>]</span>
                      </div>
                      <div class="sliderStyle"  v-bind:class="{'sliderStylePhone': isPhone}">
                          <div style="text-align: left;line-height: 24px;">对称轴:</div>
                          <vue-slider
                                  style="position: absolute; top: 0px; right: 0"
                                  v-model="sliderNum2"
                                  v-bind="sliderOption2"
                                  :tooltip="'always'"
                          ></vue-slider>
                      </div>
                  </div>
                  <buttonPrimary class="button1" v-bind:title="staticAxisTitle"  v-bind:actived="symmetry" type="ellipse" @click.native="buttonEvent1()">
                  </buttonPrimary>
                  <buttonPrimary class="button2" v-bind:title="dynamicAxisTitle" v-bind:actived="delimit" type="ellipse" @click.native="buttonEvent2()">
                  </buttonPrimary>
                  <div id="3dContainer"></div>
              </template>
              <template slot="controlPanel" slot-scope="controlPanel" style="width: 100%; height: 100%">
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
import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';
import vueSlider from 'vue-slider-component/dist-css/vue-slider-component.common.js';
import 'vue-slider-component/dist-css/vue-slider-component.css';
import 'vue-slider-component/theme/default.css';

@Component({
  components: {
    fullScreensLayout, buttonPrimary,vueSlider
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
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }


    .select_math_div{
        position: absolute;
        top:0px;
        background: #EBEBEB;
        border-radius: 21px;
        width: 131px;
        height: 42px;
    }
    .select_math_div:hover{
        cursor: pointer;
    }
    .select_arrow_img{
        width: 16px;
        height: 14.5px;
        position:absolute;
        bottom: 11.5px;
        right: 11px;
    }

    .select_one_img {
        width: 78px;
        margin-top: 14px;
        margin-left: 20px;
    }
    .option_math_div{
        position: absolute;
        top: 0px;
        background: #EBEBEB;
        border-radius: 21px;
        width: 131px;
        height: 84px;
        display: none;
    }
    .option_math_div div {
        width: 131px;
        height: 42px;
        border-radius: 21px;
        border-radius: 21px;
        position: relative;
    }
    .option_math_div img{
        /*width: 78px;*/
        position: absolute;


    }

    .option_math_div img:hover{
        cursor: pointer;
    }
    .optionDiv1 {
        background: #00aaff;
    }
    .option_one_img {
        width: 78px;
        top: 15px;
        left: 26px;
    }
    .option_two_img {
        width: 61px;
        top: 12px;
        left: 35px;
    }
    .definition {
        position: absolute;
        width: 355px;
        right: 32px;
        bottom: 92px;
    }

    .rightLayout1{
        position: absolute;
        width: 220px;
        height: 130px;
        bottom: 30%;
        right: 2.7%;
        z-index: 10;
    }

    .rightLayout2{
        position: absolute;
        width: 220px;
        height: 90px;
        bottom: 30%;
        right: 2.7%;
        z-index: 10;
    }

    .formulaStyle{
        font-family: "Times New Roman", Times, serif;
        font-style: italic;
    }

    .sliderTextA {
        font-family: "Times New Roman", Times, serif;
        font-size: 24px;
        font-style: italic;
        color: #FFFFFF;
        text-align: left;
    }

    .sliderStyle{
        position: absolute;
        width: 100%;
        right: 0px;
        bottom: 0px;
    }

    .button1 {
        position: absolute;
        bottom: 70px;
        right: 24px;
    }
    .button2 {
        position: absolute;
        bottom: 24px;
        right: 24px;
    }
</style>
<style>

</style>
