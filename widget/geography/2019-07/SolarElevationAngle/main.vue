<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="Container3d" style="width: 100%; height: 100%;">
          <canvas
            id="renderCanvas"
            touch-action="none"
            width="1080"
            height="1080"
            tabindex="1"
            style="opacity: 1;"
          ></canvas>
        </div>
        <div  class="buttonG">
          <div class="dropDown" @click="dropDown()">
            <BaseSelectTop
              @change="selectChange"
              :picList="picList"
              :isOpen="boolOpen"
              :currentShow="current"
              :dropIcon="dropIcon"
              @close="closeChange"
            ></BaseSelectTop>
          </div>
          <div class="slider_style_container">
            <div class="sliderstyle">
              <vue-slider 
              ref='slider'
              v-model="value"
              v-bind="sliderOption"
              @change="formatter">
              
              </vue-slider>
            </div>
          </div>
        </div>
      </template>

      <template slot="controlPanel">
        <div id="controlPanel"></div>
      </template>
    </fullScreensLayout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
import Component from 'vue-class-component';
import { ViewModel } from './ViewModel';
import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';
import VueSlider from '../../../../src/component/ui/slider/vue-slider-component.umd.min.js';
import BaseSelectTop from './baseSelectTop.vue';
import '../../../../src/component/ui/slider/default.css';
@Component({
  components: {
    fullScreensLayout,
    buttonPrimary,
    VueSlider,
    BaseSelectTop
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped="scoped">
body {
  overflow: hidden !important;
}
#renderCanvas {
  width: 100%;
  height: 100%;
  outline: 0;
}

.title_text {
  font-size: 24px;
  line-height: 24px;
  color: #fff;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 3;
}
  .buttonG {
    position: absolute;
    width: 770px;
    height: 50px;
    bottom: 24px;
    left: 50%;
  }
  .dropDown {
    float: left;
    width: 88px;
    height: 42px;
    margin-top: 4px;
    margin-left: -385px;
  }

  .slider_style_container{
    float: left;
    width: 672px;
    height: 100%;
    margin-left: -287px;
    background: #FFFFFF;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    border-radius: 25px;
  }

  .sliderstyle {
    float: left;
    margin-left: 36px;
    width: 600px;
    height: 12px;
    margin-top: 8px;
  }


@media screen and (min-height: 600px) and (max-height: 800px) {

}

@media screen and (min-height: 450px) and (max-height: 599px) {
  .buttonG {
    width: 670px;
    left: 50%;
  }
  .dropDown {
    margin-left: -335px;
  }

  .slider_style_container{
    width: 572px;
    margin-left: -227px;
  }

  .sliderstyle {
    width: 500px;
  }
  }

@media screen and (max-height: 449px) {
  .buttonG {
    width: auto;
    left: 70px;
    right: 0px;
    bottom: 8px;
  }
  .dropDown {
    margin-left: 0;
  }

  .slider_style_container{
    width: 472px;
    height: 42px;
    margin-top: 4px;
    border-radius: 21px;
    margin-left: 8px;
    margin-right: 0px;
  }

  .sliderstyle {
    width: 420px;
    margin-left: 25px;
    margin-top: 4px;
  }

  .vue-slider-mark-label{
    font-size: 6px !important;
  }
}

</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
.vue-slider-dot-handle{
  border: 0px !important;
}

  @media screen and (min-height: 300px) and (max-height: 449px) {
    .vue-slider-mark-label{
      font-size: 6px !important;
    }
  }
</style>
