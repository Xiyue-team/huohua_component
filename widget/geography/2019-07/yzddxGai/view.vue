<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <div id="3dContainer" class="storyContainer" >
          <canvas id="storyCanvas" ></canvas>
          <div style="width: 220px; height: 36px; position: absolute; left: 0; right: 0; bottom: 4.6%; margin: auto" v-show="showTipImage">
            <img style="width: 100%" src="./sub_static/tipImage.png"/>
          </div>
        </div>
        <div style="width: 35.8%; height: 100%; position: absolute; right: 0;">
          <div id="cardImage" class="cardImage">
            <canvas id="cardImageCanvas" ></canvas>
          </div>

          <span class="title_induction" v-bind:class="{'title_inductionPhone': isPhone}">亚洲的地形</span>

          <div class="threeButton">

            <div class="leftButton" @click="getIsActive1">
              <h_button title="高原" style="height: 100%;"
                        v-bind:isActive.sync="isActive1" v-bind:clickNumber.sync="clickNumber1">
              </h_button>
            </div>

            <div class="centerButton" @click="getIsActive2">
              <h_button title="山地" style="height: 100%;"
                        v-bind:isActive.sync="isActive2" v-bind:clickNumber.sync="clickNumber2">
              </h_button>
            </div>


            <div class="rightButton" @click="getIsActive3">
              <h_button title="平原" style="height: 100%;"
                        v-bind:isActive.sync="isActive3" v-bind:clickNumber.sync="clickNumber3">
              </h_button>
            </div>

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

@Component({
  components: {
    fullScreens_layout,
    h_button,
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
  .title_induction{

    font-size: 28px;
    color: #000000;
    line-height: 28px;
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 28px;
    margin: auto;
  }

  .title_inductionPhone{
    font-size: 20px;
    top: 5px;
  }

  .cardImage {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .threeButton {
    width: 256px;
    height: 42px;
    position: absolute;
    left: 50%;
    margin-left: -128px;
    bottom: 24px;
  }

  .leftButton {
    position: absolute;
    left: 0;
  }

  .centerButton {
    position: absolute;
    left: 96px;
  }

  .rightButton {
    position: absolute;
    right: 0;
  }

  @media (min-width: 0) and (max-width: 760px) {
    .threeButton {
      width: 256px;
      height: 42px;
      transform: scale(0.5);
      bottom: -5px;
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

    .view_div_content {
      display: flex;
    }

    .storyContainer {
      position: absolute;
      left: 0;
      top: 0;
      width: 64.2%;
      height: 100%;
    }
</style>
