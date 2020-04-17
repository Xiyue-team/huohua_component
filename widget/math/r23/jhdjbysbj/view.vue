<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <span class="title_induction" v-bind:class="{'title_inductionPhone': isPhone}">{{title}}</span>
        <div id="box" style="width: 100%; height: 100%"></div>

        <div class="sliderStyle" v-bind:class="{'sliderStylePhone': isPhone}">
          <div class="sliderTextA">A</div>
          <vue-slider
                      style="position: absolute; top: 30px; left: 0; right: 0; margin: auto"
                      v-model="sliderNumTop"
                      v-bind="sliderOption"
          ></vue-slider>
          <div class="sliderTextB">B</div>
          <vue-slider
                  style="position: absolute; top: 87px; left: 0; right: 0; margin: auto"
                  v-model="sliderNumBottom"
                  v-bind="sliderOption"
          ></vue-slider>

          <div style="position: absolute; width: 72px; height: 42px; bottom: 0; left: 0; right: 0; margin: auto" @click="buttonClickEvent">
            <h_button style="width: 100%" :title="buttonTitle"
                      v-bind:isActive.sync="isActive" v-bind:clickNumber.sync="clickNumber">
            </h_button>
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

@Component({
  components: {
    fullScreens_layout,
    h_button,
    vueSlider
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

  .sliderStyle {
    position: absolute;
    bottom: 0;
    top: 0;
    right: 30px;
    margin: auto;
    z-index: 99;
    width: 240px;
    height: 200px;
  }

  .sliderStylePhone {
    width: 160px;
    height: 180px;
    right: 0px;
  }

  .sliderTextA {
    position: absolute;
    font-family: "Times New Roman", Times, serif;
    font-size: 24px;
    font-style: italic;
    color: #FFFFFF;
    text-align: right;
    top: 30px;
  }

  .sliderTextB {
    position: absolute;
    font-family: "Times New Roman", Times, serif;
    font-size: 24px;
    font-style: italic;
    color: #FFFFFF;
    text-align: right;
    top: 87px;
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
