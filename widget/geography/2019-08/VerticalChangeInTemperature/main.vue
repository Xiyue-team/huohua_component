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
              width="1920"
              height="1080"
              tabindex="1"
              style="opacity: 1;"
            ></canvas>
          </div>
        </div>
        <div class="buttonG">
          <div class="button_style" v-for="(item,index) in msgList" :style="`background-image: url(${item.bg})`" :key="index">
            <div class="button_text">{{item.text}}</div>
          </div>
        </div>
          <div class="slider_style">
            <div class="slider_style_container">
              <div class="label">{{text[4]}}</div>
              <div class="sliderstyle">
                <vue-slider ref='slider' v-model="value" v-bind="sliderOption" @change="formatter"/>
              </div>
            </div>
          </div>
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
import buttonRadius from '../../../babylon/template/ui/buttonRadius.vue';
import VueSlider from '../../../../src/component/ui/slider/vue-slider-component.umd.min.js';
import '../../../../src/component/ui/slider/default.css';
@Component({
  components: {
    fullScreensLayout,
    buttonRadius,
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

  #Container3d{
    width: 100%;
    height: 100%;
  }

  .title_text {
    font-size: 28px;
    font-family: 'SourceHanSansSC-Medium';
    font-weight: bold;
    color: #277538;
    line-height: 28px;
    position: absolute;
    top: 32px;
    left: 32px;
    z-index: 3;
  }

  .slider_style {
    position: fixed;
    width: 111px;
    top: 100px;
    bottom: 120px;
    right: 32px;
  }

  .slider_style_container{
    position: absolute;
    width: 111px;
    top: 0;
    bottom: 0;
    background: #FFFFFF;
    border: 0 solid rgba(0,0,0,0.10);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
    border-radius: 6px;
  }

  .label{
    width: 97px;
    height: 16px;
    padding-top: 24px;
    font-family: 'SourceHanSansSC-Medium';
    font-size: 16px;
    color: #1A1A1A;
    text-align: center;
    line-height: 16px;
  }

  .sliderstyle {
    margin-top: 20px;
    margin-left: 24px;
    width: 24px;
    position: absolute;
    top: 40px;
    bottom: 20px;
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

  .buttonG {
    margin-top: -104px;
    position:fixed;
    width: 440px;
    height: 208px;
    left: 33px;
    top: 50%;
  }

  .button_style {
    width: auto;
    height: 38px;
    margin-top: 14px;
    background-repeat: no-repeat;
    background-position: center left;
    background-size: contain;
    pointer-events: none;
  }

  .button_text {
    width: auto;
    height: 38px;
    margin-left: 51px;
    font-family: 'SourceHanSansSC-Medium';
    font-size: 16px;
    text-align: left;
    line-height: 38px;
    color: #277538;
    pointer-events: none;
  }
  @media screen and (min-height: 600px) and (max-height: 800px), screen and (min-width: 950px) and (max-width: 1500px) {
    .slider_style {
      width: 90px;
      top: 100px;
      bottom: 100px;
      right: 24px;
    }
    .slider_style_container{
      width: 90px;
    }
    .label{
      text-align: center;
      width: 90px;
      padding-top: 12px;
    }

    .sliderstyle {
      margin-top: 18px;
      margin-left: 12px;
      width: 24px;
    }

    .custom-label {
      margin-left: 12px;
    }
  }
  @media screen and (min-height: 450px) and (max-height: 599px), screen and (min-width: 700px) and (max-width: 949px) {
    .buttonG {
      left: 24px;
    }
    .title_text {
      font-size: 24px;
      line-height: 24px;
      top: 24px;
      left: 24px;
    }
    .slider_style {
      width: 80px;
      top: 80px;
      bottom: 70px;
      right: 24px;
    }
    .slider_style_container{
      width: 80px;
    }
    .label{
      text-align: center;
      width: 80px;
      height: 12px;
      padding-top: 12px;
      font-size: 12px;
      line-height: 12px;
    }

    .sliderstyle {
      top: 30px;
      margin-top: 12px;
      margin-left: 12px;
      width: 24px;
    }

    .custom-label {
      height: 12px;
      font-size: 12px;
      line-height: 12px;
      margin-left: 12px;
    }
  }
@media screen and (max-height: 449px), screen and (max-width: 699px) {
    .buttonG {
      left: 24px;
    }
    .title_text {
      font-size: 24px;
      line-height: 24px;
      top: 24px;
      left: 24px;
    }
    .slider_style {
      width: 80px;
      top: 80px;
      bottom: 50px;
      right: 24px;
    }
    .slider_style_container{
      width: 80px;
    }
    .label{
      text-align: center;
      width: 80px;
      height: 12px;
      padding-top: 12px;
      font-size: 12px;
      line-height: 12px;
    }

    .sliderstyle {
      top: 25px;
      margin-top: 12px;
      margin-left: 12px;
      width: 24px;
    }

    .custom-label {
      height: 12px;
      font-size: 12px;
      line-height: 12px;
      margin-left: 12px;
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
.vue-slider-mark:first-child .vue-slider-mark-step, .vue-slider-mark:last-child .vue-slider-mark-step {
    display:block !important;
}
</style>
