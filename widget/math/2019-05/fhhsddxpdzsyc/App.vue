<template>
  <div class="aspectration root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <div id="3dContainer">
          <h1 id="mxTitle">{{title}}</h1>
          <div id="mxFormula">
            <p v-for="(f, index) in formula" v-bind:style="{color:f.color}" v-bind:key="index" v-html="f.desc"></p>
          </div>
          <div id="fcCanvasContainer">
            <canvas id="fcCanvas" v-touch:start="touchStart" v-touch:moving="touchMove" v-touch:end="touchEnd"></canvas>
          </div>
        </div>
      </template>
      <template slot="controlPanel" slot-scope="controlPanel">
        <div id="controlPanel">
          <div id="mxControls">
            <div class="params" :style="{opacity: opacity}">
              <p><label>k</label><VueSliderComponent v-model.number="params.k" v-bind:min="-5" v-bind:max="5" v-bind:interval="0.1"></VueSliderComponent></p>
              <p><label>b</label><VueSliderComponent v-model.number="params.b" v-bind:min="-5" v-bind:max="5" v-bind:interval="0.1"></VueSliderComponent></p>
              <p><label>m</label><VueSliderComponent v-model.number="params.m" v-bind:min="0" v-bind:max="5" v-bind:interval="0.1"></VueSliderComponent></p>
              <p class="zoom"><label>缩放</label><VueSliderComponent v-model.number="zoom" v-bind:min="10" v-bind:max="100" v-bind:interval="10"></VueSliderComponent></p>
            </div>
            <div class="buttons" :style="{opacity: opacity}">
              <p><button v-bind:class="{ active: relation }" @click="toggleRelation">对应关系</button></p>
              <p><button v-bind:class="{ active: fg }" @click="toggleFg"><em>f</em>[<em>g</em>(<em>x</em>)]图像</button></p>
            </div>
            <p class="buttons"><button style="float:right"  @click="isShow" id="show">隐藏</button></p>
          </div>
        </div>
      </template>
    </fullScreens_layout>
  </div>
</template>

<script lang='ts'>
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import Vue from 'vue';
import Component from 'vue-class-component';
import h_button from '../../../../src/component/ui/button.vue';
import VueSliderComponent from '../../../../src/component/ui/vue2-slider.vue';
import fullScreens_layout from '../../../../src/component/layout/fullScreens_layout';
import { ViewModel } from './ViewModel';

@Component({
  components: {
    fullScreens_layout,
    h_button,
    VueSliderComponent
  },
  mixins: [ViewModel],
})

export default class App extends Vue {}

</script>

<style>
  #fcCanvasContainer{
    background-color: #2b2b2b;
  }
  #mxTitle{
    position: fixed;
    top: 20px;
    left: 20px;
    font-size: 28px;
    color: rgba(255,255,255,1);
  }
  #mxFormula{
    position: fixed;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-family: "Times New Roman", -apple-system, "PingFang SC", "Microsoft Yahei", serif;
    font-style: italic;
    font-size: 24px;
  }
  #mxFormula p{
    margin: 20px 0;
  }
  #mxFormula p em{
    font-style: normal;
  }
  #mxControls{
    padding-top: 80px;
  }
  #mxControls .params{
    margin-bottom: 10px;
  }
  #mxControls .params p{
    margin-bottom: 40px;
    width: 210px;
  }
  #mxControls .params p label{
    font-size: 24px;
    color: #fff;
    font-family: "Times New Roman", -apple-system, "PingFang SC", "Microsoft Yahei", serif;
    font-style: italic;
    float: left;
  }
  #mxControls .params p.zoom label{font-style: normal; font-size: 18px;}
  #mxControls .params p .vue-slider-component{
    margin-left: 40px;
  }
  #mxControls .buttons p{
    margin-bottom: 40px;
    text-align: right;
  }
  #mxControls .buttons button{
    height: 42px;
    border-radius: 21px;
    font-family: "Times New Roman", -apple-system, "PingFang SC", "Microsoft Yahei", serif;
    font-size: 16px;
    color: #525252;
    padding: 0 20px;
    min-width: 110px;
    background: #fff;
  }
  #mxControls .buttons button.active{
    background: #0af;
    color: #fff;
  }
  .mobile_blur{
    background:rgba(0,0,0,0.5);
  }
  @media (max-height: 610px) {
    #mxTitle{
      font-size: 16px;
    }
    #mxFormula p{
      font-size: 16px;
      margin: 10px 0;
    }
    #mxControls .params p{
      width: auto;
      margin-bottom: 30px;
    }
    #mxControls .params p label {
      font-size: 14px;
      line-height: 30px;
    }
  }
</style>
