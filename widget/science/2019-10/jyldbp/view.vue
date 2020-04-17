<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <div style="width: 100%; height: 100%; position: absolute; background-color: #586369">
          <span class="title_induction">{{lang.title}}</span>
          <div id="box1" style="position: absolute; width: 100%; height: 100%" >
            <canvas width="1200" height="675" id="cardImageCanvas1"></canvas>
          </div>

          <!--倒计时和耗时-->
          <div class="tipTextTime" v-show="isShowTipTextTime">
            <div class="tipText">{{lang.tipText[0]}}</div>
            <div class="tipTime">{{countDown}}</div>
          </div>

          <div class="tipTextTime" v-show="!isShowTipTextTime">
            <div class="tipText">{{lang.tipText[1]}}</div>
            <div class="tipTime">{{timeConsuming}}</div>
          </div>
        </div>

        <!--两个挡板开始界面说明文字 和结束界面说明文字-->

        <div class="mask" v-show="isShowMask">

        </div>

        <div class="startPage" v-show="isShowStartPage" @click="clickStartPage">
          <div class="pageText">
            <div class="startPageText">{{lang.startPage[0]}}</div>
            <div class="startPageText">{{lang.startPage[1]}}</div>
            <div class="startPageText">{{lang.startPage[2]}}</div>
          </div>
        </div>

        <div class="startPage" v-show="isShowEndPage" @click="clickEndPage">
          <div class="pageText">
            <div class="startPageText">
              {{lang.endPage[0]}}
              <span>{{minuteText}}</span>
              {{lang.endPage[1]}}
              <span>{{secondText}}</span>
              {{lang.endPage[2]}}
            </div>
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
    font-size: 28px;
    color: #ffffff;
    line-height: 28px;
    position: absolute;
    left: 32px;
    top: 32px;
    z-index: 10;
  }

  #cardImageCanvas1 {
    position: absolute;
  }

  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .tipTextTime {
    width: 161px;
    height: 40px;
    position: absolute;
    top: 70px;
    right: 140px;
  }

  .tipText {
    width: 75px;
    height: 100%;
    position: absolute;
    left: 0;
    font-size: 24px;
    color: #ffffff;
    text-align: right;
    line-height: 40px;
  }

  .tipTime {
    width: 81px;
    height: 100%;
    position: absolute;
    right: 0;
    background: #485054;
    box-shadow: inset 0 1px 2px 0 rgba(0,0,0,0.50);
    border-radius: 3px;
    border-radius: 3px;
    text-align: center;
    line-height: 40px;
    font-size: 26px;
    color: #FFFFFF;
  }

  .startPage {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 11;
    background: rgba(192,192,192, 1);
  }

  .pageText {
    height: 156px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto
  }

  .startPageText {
    font-size: 40px;
    color: #0B3A54;
    text-align: center;
  }

  @media screen and (max-width: 1100px) {
    .pageText {
      height: 110px;
    }

    .startPageText {
      font-size: 28px;
    }

    .tipTextTime {
      transform: scale(0.7, 0.7);
      top: 50px;
      right: 100px;
    }
  }


  @media screen and (max-width: 900px) {
    .title_induction {
      font-size: 20px;
      left: 16px;
      top: 16px;
    }
  }

  @media screen and (max-width: 800px) {
    .pageText {
      height: 80px;
    }

    .startPageText {
      font-size: 20px;
    }

    .tipTextTime {
      transform: scale(0.5, 0.5);
      top: 35px;
      right: 70px;
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
        z-index: -1;
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
