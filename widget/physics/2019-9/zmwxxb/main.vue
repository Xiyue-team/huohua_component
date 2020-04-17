<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
          <template slot="viewBox" slot-scope="viewBox">
              <div class="title_text">{{lang.title}}</div>
              <div id="3dContainer" style="position: absolute; width: 100%; height: 100%"></div>
              <div class="sliderDiv">
                  <div class="sliderText">{{lang.slider}}</div>
                  <vue-slider ref="slider"
                              class="sliderPosition"
                              v-model="sliderNum"
                              v-bind="sliderOption"
                  ></vue-slider>
              </div>
          </template>
      </fullScreensLayout>

  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
import { ViewModel } from './ViewModel';
import Component from 'vue-class-component';
import vueSlider from 'vue-slider-component/dist-css/vue-slider-component.common.js';
import 'vue-slider-component/dist-css/vue-slider-component.css';
import 'vue-slider-component/theme/default.css';

@Component({
  components: {
    fullScreensLayout, vueSlider
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_text{
        font-size: 24px;
        color: #ffffff;
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 99;
    }

    .sliderDiv {
        width: 252px;
        height: 20px;
        position: absolute;
        bottom: 150px;
        right: 32px;
    }

    .sliderText {
        min-width: 20px;
        min-height: 20px;
        font-size: 20px;
        color: #FFFFFF;
        position: absolute;
        right: 190px;
    }

    .sliderPosition {
        position: absolute;
        right: 0;
    }

    @media (min-width: 0) and (max-width: 740px) {
        .sliderDiv {
            width: 155px;
            right: 10px;
            bottom: 100px;
        }

        .sliderText {
            right: 100px;
        }
    }

    @media (min-width: 740px) and (max-width: 860px) {
        .sliderDiv {
            width: 190px;
            right: 10px;
        }

        .sliderText {
            right: 130px;
        }
    }
</style>
<style>
    .control-panel_div_floatRight{
        z-index: -1;
        display: none;
    }
</style>
