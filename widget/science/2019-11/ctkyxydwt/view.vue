<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <div style="width: 100%; height: 100%; position: absolute; background-color: #8fc0f9">
          <span class="title_induction">{{lang.title}}</span>
          <div id="box1" style="position: absolute; width: 100%; height: 100%" >
            <canvas width="1200" height="675" id="cardImageCanvas1"></canvas>
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
    font-size: 24px;
    color: #ffffff;
    line-height: 28px;
    position: absolute;
    left: 24px;
    top: 24px;
    z-index: 99;
  }

  #cardImageCanvas1 {
    position: absolute;
  }

  @media screen and (max-width: 900px) {
    .title_induction {
      font-size: 20px;
      left: 16px;
      top: 16px;
    }
  }

  @media screen and (max-width: 750px) {
    .title_induction {
      font-size: 16px;
      left: 5px;
      top: 5px;
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
