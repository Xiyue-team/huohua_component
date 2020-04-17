<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">

                  <div id="3dContainer"></div>
                  <div class="title_text">线面垂直判定定理推论</div>
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
                          <span class="lableStyle textPosition2">90°</span>
                      </div>
                  </div>
                  <div class="textStyle" style="top: calc(44% - 3px);">
                      角度
                  </div>

                  <buttonPrimary class='buttonStyle' v-bind:title="inference" type="ellipse" v-bind:actived="actived" @click.native="activedEvent()"></buttonPrimary>
                  <div class="inferenceText"  v-show="actived">
                      如果两条平行线中的一条垂直于一个平面，那么另一条也垂直于这个平面。
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
import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';

@Component({
  components: {
    fullScreensLayout, vueSlider, buttonPrimary
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_text{
        font-size: 24px;
        color: #000000;
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

    .dotStyle {
        background: #00AAFF;
        width: 24px;
        height: 24px;
        border-radius: 24px;
        cursor:pointer;
        opacity: 0.9;
    }
    .lableStyle{
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
        width: 48px;
        height: 33px;
        font-size: 24px;
        color: #1A1A1A;
        right: 249px;
    }
    .buttonStyle {
        border: 1px solid rgba(0,0,0,0.12);
        position:absolute;
        top: calc(44% + 90px);
        right: 24px;

    }
    .inferenceText {
        width: 264px;
        height: 93px;
        font-size: 22px;
        color: #4A4A4A;
        position: absolute;
        top: calc(44% + 156px);
        right: 24px;
    }
</style>
<style>

</style>
