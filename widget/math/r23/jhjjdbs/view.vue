<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <span class="title_induction">{{title}}</span>
        <div id="box" style="width: 100%; height: 100%"></div>

        <div class="sliderStyle" v-bind:class="{'sliderStylePhone': isPhone}">
          <div style="position: absolute; width: 100%; height: 42px; top: 0; right: 0px;" @click="buttonClickEvent1">
            <h_button style="width: 100%; font-size: 14px" :title="buttonTitle"
                      v-bind:isActive.sync="isActive" v-bind:clickNumber.sync="clickNumber" >
            </h_button>
          </div>

          <div style="position: absolute; width: 82%; height: 42px; bottom: 0; right: 0px;" @click="buttonClickEvent2">
            <h_button style="width: 100%" :title="buttonTitle2"
                      v-bind:isActive.sync="isActive2" v-bind:clickNumber.sync="clickNumber2">
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

  .sliderStyle {
    position: absolute;
    bottom: 32px;
    right: 32px;
    margin: auto;
    z-index: 99;
    width: 88px;
    height: 102px;
  }

  .sliderStylePhone {
    width: 80px;
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
