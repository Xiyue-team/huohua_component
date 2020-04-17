<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <span class="title_induction" v-bind:class="{'title_inductionPhone': isPhone}">极值和最值的关系</span>
        <div id="box" style="width: 100%; height: 100%; background-color: #2d2d2d"></div>
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

  .buttonStyle {
    width: 72px;
    height: 124px;
    z-index: 99;
    position: absolute;
    right: 28px;
    bottom: 28px;
  }

  .buttonImage {
    width: 276px;
    height: 158px;
    position: absolute;
    right: 104px;
    bottom: 12px;
    z-index: 99
  }

  .buttonPhone {
    transform: scale(0.5);
    right: 0;
  }

  .buttonImagePhone {
    right: 0;
    transform: scale(0.5);
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

    #resetBtn {
      z-index: 99;
    }
</style>
