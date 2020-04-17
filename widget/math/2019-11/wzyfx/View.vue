<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <span class="title_induction">{{lang.title}}</span>
        <div id="container" style="width: 100%; height: 100%; position: absolute; background-color: #77b651">
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
import 'vue-slider-component/dist-css/vue-slider-component.css';
import 'vue-slider-component/theme/default.css';

@Component({
  components: {
    fullScreens_layout
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
  .title_induction{
    width: 15%;
    font-family: PingFangSC-Medium,serif;
    font-size: 32px;
    color: #f2f4f4;
    line-height: 40px;
    position: absolute;
    z-index: 99;
    left: 32px;
    top: 27px;
  }

  .control_

  .title_induction {
    font-size: 32px;
    left: 32px;
    top: 27px;
  }

  @media screen and (max-width: 1300px){
    .title_induction {
      width: 22%;
      font-size: 23px;
      left: 25px;
      top: 20px;
    }
  }

  @media screen and (max-width: 900px){
    .title_induction {
      width: 21%;
      font-size: 23px;
      left: 18px;
      top: 13px;
    }
  }

  @media screen and (max-width: 600px){
    .title_induction {
      width: 17%;
      font-size: 15px;
      left: 15px;
      top: 10px;
    }
  }
</style>

<style>
  .control-panel_div_floatRight {
    display: none;
  }
</style>
<style>
  #reset {
    display: none;
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
