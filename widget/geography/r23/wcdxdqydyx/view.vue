<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <span class="title_induction" v-bind:class="{title_inductionScale: isPhone}">温差大小对气压的影响</span>
        <div id="box" style="width: 100%; height: 100%"></div>

        <div  id="controlPanel" >
          <div style="position: absolute; bottom: 24px; width: 136px; right: 24px" @click="cloudTopAnimation" v-show="showCloudTopAnimation">
              <h_button title="地面受热不均" style="width: 100%;" ></h_button>
          </div>

          <div style="position: absolute; bottom: 24px; width: 136px; right: 24px" @click="mappingAnimation" v-show="showMappingAnimation">
              <h_button title="作图" style="width: 96px; margin-left: 40px"></h_button>
          </div>
        </div>

        <div class="sliderStyle" v-show="showSlider" v-bind:class="{sliderStyleIphone: isPhone}">
          <div class="sliderText">冷热不均(温差)</div>
          <div class="sliderText2">
            <div style="position: absolute; left: 12px;">低</div>
            <div style="position: absolute; right: 12px;">高</div>
          </div>
          <vue-slider
                  style="position: absolute; bottom: 10px; left: 0; right: 0; margin: auto"
                  v-model="sliderNumBottom"
                  v-bind="sliderOption"
          ></vue-slider>
        </div>
      </template>

      <template slot="controlPanel" slot-scope="controlPanel">

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
import vueSlider from 'vue-slider-component/dist-css/vue-slider-component.common.js';
import 'vue-slider-component/dist-css/vue-slider-component.css';
import 'vue-slider-component/theme/default.css';

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
    width: 520px;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #000000;
    line-height: 24px;
    position: absolute;
    left: 24px;
    top: 24px;
    z-index: 99;
  }

  .title_inductionScale {
    font-size: 16px;
  }

  .sliderStyle {
    position: absolute;
    bottom: 90px;
    right: 24px;
    z-index: 99;
    width: 164px;
    height: 82px;
    background: #FFFFFF;
    border: 0 solid rgba(0,0,0,0.10);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
    border-radius: 6px;
  }

  .sliderStyleIphone {
    width: 130px;
  }

  .sliderText {
    position: absolute;
    top: 8px;
    width: 100%;
    height: 16px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #4D4D4D;
    text-align: center;
    line-height: 16px;
  }

  .sliderText2 {
    position: absolute;
    top: 28px;
    width: 100%;
    height: 14px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #999999;
    line-height: 14px;
  }

</style>
<style>

    .konvajs-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    #box {
        z-index: 99;
    }

    #reset {
        z-index: 100;
    }

    .control-panel_div_floatRight {
        display: none;
    }
</style>
