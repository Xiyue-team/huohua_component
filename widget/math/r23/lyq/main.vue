<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div id="3dContainer"></div>
                  <div class="title_text">路由器</div>

                  <div class="sliderBackground">
                      <div class="sliderStyle1">
                          <vue-slider ref="slider1th"  v-model="slidernumber1" v-bind="sliderOption" style="">
                              <template slot="tooltip" scope="tooltip">
                                  <div class="custom-tooltip" style="color: #1A1A1A; font-size: 22px">
                                      {{ tooltip.value + '°'}}
                                  </div>
                              </template>
                              <template slot="dot" scope="dot">
                                  <div class="custom-dot dotStyle">
                                  </div>
                              </template>
                          </vue-slider>
                      </div>
                      <div style="width: 204px;height: 17px; margin-top: 4px;">
                          <span class="lableStyle textPosition1">0°</span>
                          <span class="lableStyle textPosition2">180°</span>
                      </div>
                      <div class="sliderStyle2">
                          <vue-slider ref="slider1th" v-model="slidernumber2" v-bind="sliderOption" style="">
                              <template slot="tooltip" scope="tooltip">
                                  <div class="custom-tooltip" style="color: #1A1A1A; font-size: 22px;">
                                      {{ tooltip.value + '°'}}
                                  </div>
                              </template>
                              <template slot="dot" scope="dot">
                                  <div class="custom-dot dotStyle">
                                  </div>
                              </template>
                          </vue-slider>
                      </div>
                      <div style="width: 204px;height: 17px; margin-top: 4px;">
                          <span class="lableStyle textPosition1">0°</span>
                          <span class="lableStyle textPosition2">180°</span>
                      </div>
                      <div class="textStyle" style="top: calc(44% - 25px);">
                          左
                      </div>
                      <div class="textStyle" style="top: calc(44% + 105px);">
                          右
                      </div>
                  </div>
              </template>

              <template slot="controlPanel" slot-scope="controlPanel">

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
import vueSlider from 'vue-slider-component/dist-css/vue-slider-component.common.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'
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
        color: #333333;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }

    .sliderBackground {
        width: 204px;
        height: 50px;
        position: absolute;
        top: 44%;
        right: 25px;
    }
    .sliderStyle1 {
        width: 204px;
        height: 15px;
        top: 44%;
        right: 12px;
    }

    .sliderStyle2 {
        width: 204px;
        height: 15px;
        margin-top: 95px;
    }

    .dotStyle {
        background: #00AAFF;
        width: 24px;
        height: 24px;
        border-radius: 24px;
        cursor:pointer;
        opacity: 0.9;
    }
    .lableStyle{
        opacity: 0.6;
        font-size: 16px;
        color: #1a1a1a;
        line-height: 17px;
    }
    .textPosition1 {
        float: left;
    }
    .textPosition2 {
        float: right;
    }
    .textStyle{
        position: absolute;
        width: 24px;
        height: 35px;
        font-size: 24px;
        color: #1A1A1A;
        right: 229px;
    }
</style>
<style>

</style>
