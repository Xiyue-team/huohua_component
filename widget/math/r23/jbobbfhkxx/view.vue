<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <span class="title_induction" v-bind:class="{'title_inductionPhone': isPhone}">奇变偶不变，符号看象限</span>
        <div class="storyContainer">
          <canvas id="storyCanvas1" style="position: absolute"></canvas>
        </div>

        <!--<div class="storyContainer" v-show="switch4Model === '诱导公式二'">-->
          <!--<canvas id="storyCanvas2" style="position: absolute"></canvas>-->
        <!--</div>-->

        <!--<div class="storyContainer" v-show="switch4Model === '诱导公式三'">-->
          <!--<canvas id="storyCanvas3" style="position: absolute"></canvas>-->
        <!--</div>-->

        <!--<div class="storyContainer" v-show="switch4Model === '诱导公式四'">-->
          <!--<canvas id="storyCanvas4" style="position: absolute"></canvas>-->
        <!--</div>-->

        <!--<div class="storyContainer" v-show="switch4Model === '诱导公式五'">-->
          <!--<canvas id="storyCanvas5" style="position: absolute"></canvas>-->
        <!--</div>-->

        <!--<div class="storyContainer" v-show="switch4Model === '诱导公式六'">-->
          <!--<canvas id="storyCanvas6" style="position: absolute"></canvas>-->
        <!--</div>-->

        <div class="switch3Div" v-show="isShowSwitch3Model1">
          <switch3 style="position: absolute" v-bind="switch3Option1" v-model="switch3Model1"></switch3>
        </div>

        <div class="switch3Div" v-show="isShowSwitch3Model2">
          <switch3 style="position: absolute" v-bind="switch3Option2" v-model="switch3Model2"></switch3>
        </div>

        <div class="switch3Div" v-show="isShowSwitch3Model3">
          <switch3 style="position: absolute" v-bind="switch3Option3" v-model="switch3Model3"></switch3>
        </div>

        <div class="switch3Div" v-show="isShowSwitch3Model4">
          <switch3 style="position: absolute" v-bind="switch3Option4" v-model="switch3Model4"></switch3>
        </div>

        <div class="switch3Div" v-show="isShowSwitch3Model5">
          <switch3 style="position: absolute" v-bind="switch3Option5" v-model="switch3Model5"></switch3>
        </div>

        <div class="switch3Div" v-show="isShowSwitch3Model6">
          <switch3 style="position: absolute" v-bind="switch3Option6" v-model="switch3Model6"></switch3>
        </div>

        <switch4 style="font-weight: 500;" class="switch4" v-bind="switch4Option" v-model="switch4Model" ref="switch4"></switch4>

        <!--说明文字图片-->
        <div class="formulaImage">
          <div style="width: 100%; height: 100%; position: absolute;" v-show="switch4Model === '诱导公式一'">
            <img style="width: 100%; position: absolute" src="./sub_static/1/formulaSin.png" v-show="switch3Model1 === '1'"/>
            <img style="width: 100%; position: absolute" src="./sub_static/1/formulaCos.png" v-show="switch3Model1 === '2'"/>
            <img style="width: 100%; position: absolute" src="./sub_static/1/formulaTan.png" v-show="switch3Model1 === '3'"/>
          </div>
          <div style="width: 100%; height: 100%; position: absolute;" v-show="switch4Model === '诱导公式二'">
            <img style="width: 100%; position: absolute" src="./sub_static/2/formulaSin.png" v-show="switch3Model2 === '1'"/>
            <img style="width: 100%; position: absolute" src="./sub_static/2/formulaCos.png" v-show="switch3Model2 === '2'"/>
            <img style="width: 100%; position: absolute" src="./sub_static/2/formulaTan.png" v-show="switch3Model2 === '3'"/>
          </div>
          <div style="width: 100%; height: 100%; position: absolute;" v-show="switch4Model === '诱导公式三'">
            <img style="width: 100%; position: absolute" src="./sub_static/3/formulaSin.png" v-show="switch3Model3 === '1'"/>
            <img style="width: 100%; position: absolute" src="./sub_static/3/formulaCos.png" v-show="switch3Model3 === '2'"/>
            <img style="width: 100%; position: absolute" src="./sub_static/3/formulaTan.png" v-show="switch3Model3 === '3'"/>
          </div>
          <div style="width: 100%; height: 100%; position: absolute;" v-show="switch4Model === '诱导公式四'">
            <img style="width: 100%; position: absolute" src="./sub_static/4/formulaSin.png" v-show="switch3Model4 === '1'"/>
            <img style="width: 100%; position: absolute" src="./sub_static/4/formulaCos.png" v-show="switch3Model4 === '2'"/>
            <img style="width: 100%; position: absolute" src="./sub_static/4/formulaTan.png" v-show="switch3Model4 === '3'"/>
          </div>
          <div style="width: 100%; height: 100%; position: absolute;" v-show="switch4Model === '诱导公式五'">
            <img style="width: 100%; position: absolute" src="./sub_static/5/formulaSin.png" v-show="switch3Model5 === '1'"/>
            <img style="width: 100%; position: absolute" src="./sub_static/5/formulaCos.png" v-show="switch3Model5 === '2'"/>
          </div>
          <div style="width: 100%; height: 100%; position: absolute;" v-show="switch4Model === '诱导公式六'">
            <img style="width: 100%; position: absolute" src="./sub_static/6/formulaSin.png" v-show="switch3Model6 === '1'"/>
            <img style="width: 100%; position: absolute" src="./sub_static/6/formulaCos.png" v-show="switch3Model6 === '2'"/>
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
import switch3 from '../../../../src/component/ui/switch3.vue';
import vueSlider from 'vue-slider-component/dist-css/vue-slider-component.common.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'
import switch4 from '../../../../src/component/ui/switch4.vue';

@Component({
  components: {
    fullScreens_layout,
    h_button,
    switch3,
    vueSlider,
    switch4
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
  .title_induction{
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
      width: 100%;
      height: 100%;
      background-color: #2d2d2d;
    }

    .switch3Div {
      position: absolute;
      top: 46.2%;
      left: 61%;
      width: 318px;
      height: 46px;
    }

    .switch4 {
      width: 146px;
      height: 42px;
      position: absolute;
      top: 37%;
      left: 61%;
      z-index: 10;
    }

    .formulaImage {
      width: 320px;
      height: 120px;
      position: absolute;
      top: 57.5%;
      left: 61%;
    }

    @media (min-width: 0px) and (max-width: 800px) {
      .switch4 {
        width: 146px;
        height: 42px;
        position: absolute;
        top: 10%;
        left: 61%;
      }

      .switch3Div {
        position: absolute;
        top: 30%;
        left: 61%;
        width: 318px;
        height: 46px;
      }

      .formulaImage {
        width: 220px;
        height: 120px;
        position: absolute;
        top: 46%;
        left: 61%;
      }
    }
</style>
