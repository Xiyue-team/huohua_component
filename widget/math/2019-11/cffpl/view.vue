<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <div style="width: 100%; height: 100%; position: absolute; background-color: #2d2d2d">
          <span class="title_induction">{{lang.title}}</span>
          <div id="bgContainer" style="position: absolute; width: 100%; height: 100%; ">
          </div>
          <div id="canvasContainer" style="position: absolute; width: 100%; height: 100%; ">

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
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

@Component({
  components: {
    fullScreens_layout,
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

    #container {
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
