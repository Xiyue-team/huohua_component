<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <span class="title_induction">染色体和DNA的关系</span>
        <div id="box" style="width: 100%; height: 100%"></div>
        <canvas class="containerCanvas" :width="width" :height="height" id="containerBottom1" style="z-index: 5" v-show="showCanvasBottom === 0"></canvas>
        <canvas class="containerCanvas" :width="width" :height="height" id="containerBottom2" style="z-index: 5" v-show="showCanvasBottom === 2"></canvas>
        <canvas class="containerCanvas" :width="width" :height="height" id="containerBottom3" style="z-index: 5" v-show="showCanvasBottom === 3"></canvas>
        <canvas class="containerCanvas" :width="width" :height="height" id="containerBottom4" style="z-index: 5" v-show="showCanvasBottom === 4"></canvas>
        <canvas class="containerCanvas" :width="width" :height="height" id="containerBottom5" style="z-index: 5" v-show="showCanvasBottom === 5"></canvas>
        <canvas class="containerCanvas" :width="width" :height="height" id="containerBottom6" style="z-index: 5" v-show="showCanvasBottom === 6"></canvas>
        <canvas class="containerCanvas" :width="width" :height="height" id="containerBottom7" style="z-index: 5" v-show="showCanvasBottom === 7"></canvas>

        <canvas class="containerCanvas" :width="width" :height="height" id="container1" style="z-index: 7" v-show="showCanvas === 1"></canvas>
        <canvas class="containerCanvas" :width="width" :height="height" id="container2" style="z-index: 7" v-show="showCanvas === 2"></canvas>
        <canvas class="containerCanvas" :width="width" :height="height" id="container3" style="z-index: 7" v-show="showCanvas === 3"></canvas>
        <canvas class="containerCanvas" :width="width" :height="height" id="container4" style="z-index: 7" v-show="showCanvas === 4"></canvas>
        <canvas class="containerCanvas" :width="width" :height="height" id="container5" style="z-index: 7" v-show="showCanvas === 5"></canvas>
        <canvas class="containerCanvas" :width="width" :height="height" id="container6" style="z-index: 7" v-show="showCanvas === 6"></canvas>
        <canvas class="containerCanvas" :width="width" :height="height" id="container7" style="z-index: 7" v-show="showCanvas === 7"></canvas>

        <canvas class="textCanvas" :width="width" :height="height" id="container8" style="z-index: 8" v-show="isShowText"></canvas>

        <div class="sliderStyle" v-bind:class="{'sliderStylePhone': isPhone}">
          <vue-slider ref="slider"
                  style="position: absolute; top: 40px; left: 0; right: 0; margin: auto"
                  v-model="sliderNum"
                  v-bind="sliderOption"
                  :marks="marks1"
          ></vue-slider>
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
import vueSlider from 'vue-slider-component/dist-css/vue-slider-component.common.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

@Component({
  components: {
    fullScreens_layout, vueSlider
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
  .title_induction {
    width: 250px;
    height: 24px;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #000000;
    line-height: 24px;
    position: absolute;
    left: 24px;
    top: 24px;
    z-index: 99;
  }

  #box {
    position: absolute;
    z-index: -1;
  }

  .containerCanvas {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    display: block;
  }

  .textCanvas{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    display: none;
  }

  .sliderStyle {
    position: absolute;
    bottom: 24px;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 99;
    width: 846px;
    height: 70px;
    font-size: 16px;
    background: #FFFFFF;
    border: 0 solid rgba(0,0,0,0.10);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
    border-radius: 6px;
  }

</style>
<style>

</style>
