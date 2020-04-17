<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <div style="width: 100%; height: 100%; position: absolute; background-color: #71a9e6">
          <span class="title_induction">{{lang.title}}</span>
          <div id="container" style="position: relative; width: 100%; height: 100%;">
          </div>
        </div>

        <div class="number_text_divOne">
          <numberPicker v-bind="numberPicker"></numberPicker>
        </div>

        <div class="number_text_divTwo">
          <numberPicker v-bind="numberPicker"></numberPicker>
        </div>

        <div class="number_text_divThree">
          <numberPicker v-bind="numberPicker"></numberPicker>
        </div>

        <div class="number_text_divFour">
          <numberPicker v-bind="numberPicker"></numberPicker>
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
import numberPicker from '../../../../src/component/ui/numberPicker.vue';

@Component({
  components: {
    fullScreens_layout,
    numberPicker
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
  .title_induction {
    width: 100%;s
    font-family: PingFangSC-Medium;
    font-size: 28px;
    color: #FFFFFF;
    line-height: 28px;
    position: absolute;
    left: 32px;
    top: 32px;
    z-index: 99;
  }

  .number_text_divOne {
    color: #FFFFFF;
    width: 100px;
    height: 60px;
    position: absolute;
    left: 60.8%;
    top: 9%;
  }

  .number_text_divTwo {
    color: #FFFFFF;
    width: 100px;
    height: 60px;
    position: absolute;
    left: 35.8%;
    top: 9%;
  }

  .number_text_divThree {
    color: #1A1A1A;
    width: 100px;
    height: 60px;
    position: absolute;
    left: 35.8%;
    top: 25%;
  }

  .number_text_divFour {
    color: #1A1A1A;
    width: 100px;
    height: 60px;
    position: absolute;
    left: 60.8%;
    top: 25%;
  }

  @media screen and (max-width: 900px) {
    .title_induction {
      font-size: 12px;
      left: 10px;
      top: 10px;
    }
  }

  #container{
    margin: 0 auto;
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
