<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <div style="width: 100%; height: 100%; position: absolute; background-color: #B7DEEA">
          <div id="bottom" style="position: relative; width: 100%; background-color: #999999">
          </div>
          <span class="title_induction">{{lang.title}}</span>
          <div id="container" style="position: relative; width: 100%; height: 100%;">
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
    fullScreens_layout
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
    color: #1A1A1A;
    line-height: 40px;
    position: absolute;
    left: 24px;
    top: 20px;
    z-index: 99;
  }

  @media screen and (max-width: 900px) {
    .title_induction {
      font-size: 20px;
      left: 24px;
      top: 20px;
      line-height: 40px;
    }
  }
</style>
<style>

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
