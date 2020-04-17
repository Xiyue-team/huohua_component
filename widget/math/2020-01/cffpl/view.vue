<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <div style="width: 100%; height: 100%; position: absolute; background-color: #2c2c2c">
          <span class="title_induction">{{lang.title}}</span>
          <div id="box1" style="position: absolute; width: 100%; height: 100%" >
            <canvas width="1200" height="675" id="cardImageCanvas1"></canvas>
          </div>
        </div>

        <div class="buttonStyle" @click="buttonClickEvent">
          <i_button style="width: 100%" :title="lang.button" v-bind:clickNumber.sync="clickNumber" v-bind:isActive.sync="isActive">

          </i_button>
        </div>

        <div class="formulaText" v-show="isShowFormulaText">
          <img style="width: 100%" src="./sub_static/img/formulaText.png"/>
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
import i_button from '../../../../src/component/ui/buttonEllipse';

@Component({
  components: {
    fullScreens_layout,
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
    font-size: 28px;
    color: #ffffff;
    line-height: 28px;
    position: absolute;
    left: 32px;
    top: 32px;
    z-index: 99;
  }

  #cardImageCanvas1 {
    position: absolute;
  }

  .buttonStyle {
    width: 72px;
    height: 42px;
    position: absolute;
    right: 32px;
    bottom: 32px;
  }

  .formulaText {
    width: 254px;
    height: 42px;
    position: absolute;
    right: 32px;
    bottom: 85px;
  }

  @media screen and (max-width: 900px) {
    .buttonStyle {
      transform: scale(0.7, 0.7);
      bottom: 20px;
      right: 20px;
    }

    .formulaText {
      transform: scale(0.7, 0.7);
      bottom: 65px;
      right: -7px;
    }
  }

  @media screen and (max-width: 800px) {
    .title_induction {
      font-size: 20px;
      left: 16px;
      top: 16px;
    }

    .buttonStyle {
      transform: scale(0.5, 0.5);
      bottom: 0;
      right: 0;
    }

    .formulaText {
      transform: scale(0.5, 0.5);
      bottom: 30px;
      right: -45px;
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
