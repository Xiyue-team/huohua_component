<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
           <div id="Container" style="width: 100%; height: 100%;">
        <div id="Container3d">
          <canvas
            id="renderCanvas"
            touch-action="none"
            width="1080"
            height="1080"
            tabindex="1"
            style="opacity: 1;"
          ></canvas>
        </div>
</div>
         <div class="sliderG">
           <div class="slider_style">
          <div class="label">{{splite}} 1</div>
          <div class="sliderstyle">
            <vue-slider 
            v-model="slidervalue1"
            v-bind="sliderOption"
            @change="formatter1">
              <template slot="label" scope="label">
                <div :class="['vue-slider-mark-label','custom-label']">{{ label.value }}</div>
              </template>
            </vue-slider>
          </div>
          </div>
             <div class="slider_style">
          <div class="label">{{splite}} 2</div>
           <div class="sliderstyle">
            <vue-slider 
            v-model="slidervalue2"
            v-bind="sliderOption"
            @change="formatter2">
              <template slot="label" scope="label">
                <div :class="['vue-slider-mark-label','custom-label']">{{ label.value }}</div>
              </template>
            </vue-slider>
          </div>
          </div>
             <div class="slider_style">
          <div class="label">{{splite}} 3</div>
           <div class="sliderstyle">
            <vue-slider 
            v-model="slidervalue3"
            v-bind="sliderOption"
            @change="formatter3">
              <template slot="label" scope="label">
                <div :class="['vue-slider-mark-label','custom-label']">{{ label.value }}</div>
              </template>
            </vue-slider>
          </div>
            </div>
        </div>
        <div class="buttonG">
          <div class="button1"  @click="check()">
              <buttonPrimary
              style="width: 100%"
              v-bind:title="buttonTitle"
              v-bind:actived="buttonActived"
              type="ellipse"
            ></buttonPrimary>
          </div>
            <div id="tip" v-if="buttonActived" :style="`background-image: url(${pictip})`"></div>
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
import '../../../../src/component/ui/slider/default.css';

@Component({
  components: {
    fullScreensLayout,
    buttonPrimary,
    VueSlider
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
#Container3d{
  width: 100%;
  height: 100%;
}
.buttonG {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 50%;
  right: 24px;
}
.button1 {
  width: 100px;
  height: 42px;
  margin-left: 100px;
}

#tip {
  width: 100%;
  height: 240px;
  margin-top: 12px;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: right top;
  background-size: contain;
}

.sliderG {
  position: absolute;
  width: 256px;
  height: 180px;
  bottom: 80px;
  right: 32px;
}

.slider_style {
  width: 100%;
  height: 26px;
  margin-top: 36px;
}
  .sliderstyle {
    width: 156px;
    height: 24px;
    margin-left: 10px;
  float: left;
  }

  .custom-label {
    width: auto;
    height: 16px;
    font-family: 'SourceHanSansSC-Medium';
    font-size: 16px;
    color: #1A1A1A;
    text-align: right;
    line-height: 16px;
    margin-left: 24px;
  }
.label {
  width: 90px;
  height: 24px;
  color: #fff;
  font-size: 24px;
  line-height: 24px;
  float: left;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: top right;
  background-size: contain;
}
@media screen and (min-height: 600px) and (max-height: 800px) {
  .buttonG {
    width: 200px;
    top: 30%;
  }
  .sliderG {
    bottom: 24px;
    right: 24px;
  }
}

@media screen and (min-height: 450px) and (max-height: 599px) {
  .buttonG {
    width: 200px;
    top: 25%;
  }
  .sliderG {
    bottom: 24px;
    height: 140px;
    right: 24px;
  }
  .slider_style {
    margin-top: 20px;
  }
 .sliderstyle {
    margin-top: 3px;
  }
}
@media screen and (min-height: 300px) and (max-height: 449px){
  .buttonG {
    width: 120px;
    height: 100px;
    top: 70px;
  }
  .button1 {
    margin-left: 20px;
  }
  .sliderG {
    width: 196px;
    bottom: 2px;
    height: 120px;
    right: 12px;
  }
  .slider_style {
    margin-top: 12px;
  }
  .sliderstyle {
    height: 12px;
    margin-top: 3px;
    width: 116px;
  }
  #tip {
    height: 100px;
  }

  .label {
    width: 60px;
    height: 16px;
    font-size: 16px;
    line-height: 16px;
    margin-top: 5px;
  }
}

#Container {
  background-color: #333333;
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
</style>
