<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">二次函数的最值</div>

                  <div class="rightLayout1" v-show="isStatic">
                      <div class='rightLayOutSpan' style="position: absolute;top: 0px;">
                          <span>对称轴:  </span>
                          <span class="formulaStyle" style="color: #FFD621">x</span>
                          <span style="color: #FFD621"> = 2.5</span>
                      </div>
                      <div style="position: absolute;top: 42px;">
                          <span>区间: [ </span>
                          <span class="formulaStyle" style="color: #9BF23B">x</span>
                          <span style="color: #9BF23B;" class="textStyle" v-bind:class="{'textStylePhone': isPhone}">₁</span>
                          <span> , </span>
                          <span class="formulaStyle" style="color: #FF5A5A">x</span>
                          <span style="color: #FF5A5A" class="textStyle" v-bind:class="{'textStylePhone': isPhone}">₁</span>
                          <span class="formulaStyle" style="color: #FF5A5A">+ m</span>
                          <span>]</span>
                      </div>
                      <div class="sliderStyle"  v-bind:class="{'sliderStylePhone': isPhone}">
                          <div class="sliderTextA" v-bind:class="{'sliderTextAPhone': isPhone}">m</div>
                          <vue-slider class="vueSlider1"
                                  style="position: absolute; top: 0px; right: 0"
                                  v-model="sliderNum1"
                                  v-bind="sliderOption1"
                                  :tooltip="'always'"
                          ></vue-slider>
                      </div>
                  </div>

                  <div class="rightLayout2" v-show="isDynamic">
                      <div style="position: absolute">
                          <span>区间: [ </span>
                          <span class="formulaStyle">x</span>
                          <span class="textStyle" v-bind:class="{'textStylePhone': isPhone}">₁</span>
                          <span> , </span>
                          <span class="formulaStyle">x</span>
                          <span class="textStyle" v-bind:class="{'textStylePhone': isPhone}">₂</span>
                          <span>]</span>
                      </div>
                      <div class="sliderStyle">
                          <div class="sliderTextB">对称轴:</div>
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

    .rightLayout1{
        position: absolute;
        width: 220px;
        height: 150px;
        bottom: 25%;
        right: 2%;
        z-index: 10;
        font-size: 24px;
        color: #fff
    }

    .rightLayoutPhone1{
        width: 140px;
        height: 120px;
        top: calc(50% - 80px);
        font-size: 18px;
    }

    .rightLayout2{
        position: absolute;
        width: 220px;
        height: 150px;
        bottom: 25%;
        right: 2%;
        z-index: 10;
        font-size: 24px;
        color: #fff
    }

    .rightLayoutPhone2{
        width: 140px;
        height: 80px;
        top: calc(50% - 40px);
        font-size: 18px;
    }

    .formulaStyle{
        font-family: "Times New Roman";
        font-style: italic;
    }

    .sliderTextA {
        font-family: "Times New Roman";
        font-size: 24px;
        font-style: italic;
        color: #FFFFFF;
        text-align: left;
    }
    .sliderTextB{
        text-align: left;
        line-height: 24px;
    }

    .sliderTextAPhone{
        font-size: 16px;
    }

    .sliderStyle{
        position: absolute;
        width: 100%;
        right: 0px;
        bottom: 0px;
    }

    .button1 {
        position: absolute;
        bottom: 78px;
        right: 24px;
    }
    .button2 {
        position: absolute;
        bottom: 24px;
        right: 24px;
    }
    .sliderStylePhone{
        width: 100%;
    }

    .textStyle{
        font-family: 'Times New Roman';
        margin-left: -6px;
    }
    .textStylePhone{
        margin-left: -4px;
    }
</style>
<style>

</style>
