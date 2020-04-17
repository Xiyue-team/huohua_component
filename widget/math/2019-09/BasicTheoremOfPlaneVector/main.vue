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
             <div class="buttonG">
          <div class="buttonImage_style2" @click="buttonImageEvent2()">
            <buttonImage
              type="ellipse"
              v-bind:actived="buttonImageActived2"
              v-bind="Option3"
            ></buttonImage>
          </div>
          <div class="rGroup" v-if="buttonImageActived2">
            <div class="r" :style="`background-image: url(${picr1})`">
              <div class="rT" v-html="r1text"></div>
            </div>
            <div class="r" :style="`background-image: url(${picr2})`">
              <div class="rT" v-html="r2text"></div>
            </div>
          </div>
          <div class="relation" v-if="buttonImageActived2" :style="`background-image: url(${picrelation})`"></div>
          <div class="rGroup">
            <div class="button_style1" @click="ButtonEvent()">
              <buttonPrimary
                style="width: 100%"
                v-bind:title="buttonTitle[0]"
                v-bind:actived="buttonActived"
                type="ellipse"
              ></buttonPrimary>
            </div>
            <div id="tip" v-if="buttonActived" :style="`background-image: url(${pictip})`"></div>
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
import buttonPrimary from '../../../babylon/template/ui/buttonPrimary.vue';
import buttonImage from './buttonImage.vue';
@Component({
  components: {
    fullScreensLayout,
    buttonPrimary,
    buttonImage
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
  pointer-events: none;
}

#Container3d{
  position: absolute;
  left: 0;
  right: 374px;
  height: 100%;
}

.buttonG {
  position: absolute;
  width: 350px;
  height: 100%;
  top: 40%;
  right: 24px;
}

.buttonImage_style2{
  float: left;
  margin-left: 10px;
  margin-top: 24px;
  width: 186px;
  height: 42px;
}
.rGroup{
  float: left;
  margin-top: 24px;
  width: 100%;
  height: 42px;
}
.r{
  float: left;
  margin-left: 10px;
  min-width: 108px;
  height: 100%;;
  background-repeat: no-repeat;
  background-position: left center;
  background-size: contain;
  pointer-events: none;
}

.rT{
  float: left;
  margin-left: 50px;
  padding-left: 12px;
  padding-right: 12px;
  min-width: 50px;
  height: 40px;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
  line-height: 40px;
  background: rgba(81, 81, 81, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin-right: 4px;
  pointer-events: none;
}
.relation{
  float: left;
  margin-left: 10px;
  margin-top: 24px;
  width: 186px;
  height: 54px;
  background-repeat: no-repeat;
  background-position: left center;
  background-size: contain;
  pointer-events: none;
}

.button_style1 {
  float: left;
  margin-left: 10px;
  width: 88px;
  height: 42px;
}

#tip {
  float: left;
  margin-left: 10px;
  width: 100%;
  height: 225px;
  margin-top: 24px;
  background-repeat: no-repeat;
  background-position: left top;
  background-size: contain;
  pointer-events: none;
}

@media screen and (min-height: 600px) and (max-height: 800px) {
  .buttonG {
    width: 312px;
    top: 40%;
    right: 24px;
  }
  #Container3d{
    right: 336px;
  }
  .buttonImage_style2{
    margin-top: 12px;
    width: 186px;
  }
  .rGroup{
    margin-top: 12px;
  }

  .relation{
    margin-top: 12px;
  }
  .button_style1 {
    float: left;
    width: 88px;
    height: 42px;
  }

  #tip {
    width: 312px;
  }
}

@media screen and (min-height: 450px) and (max-height: 599px) {
  .buttonG {
    width: 312px;
    top:90px;
    right: 0px;
  }

  #Container3d{
    right: 312px;
  }

  .buttonImage_style2{
    margin-top: 12px;
    width: 186px;
  }
  .rGroup{
    margin-top: 12px;
  }

  .relation{
    margin-top: 12px;
  }
  .button_style1 {
    float: left;
    width: 88px;
    height: 42px;
  }

  #tip {
    width: 290px;
  }
}

@media screen and (max-height: 449px) {
  .buttonG {
    top: 20%;
    width: 222px;
    right: 0px;
  }

  #Container3d{
     right: 222px;
  }

  .buttonImage_style2{
    margin-top: 4px;
    width: auto;
    height: 28px;
  }
  .rGroup{
    margin-top: 4px;
    height: 28px;
  }
  .r{
    min-width: 72px;
  }

  .rT{
    margin-left: 32px;
    min-width: 40px;
    line-height: 10px;
    font-size: 10px;
    height: 10px;
    padding:9px 6px;
    border-radius: 4px;
  }

  .relation{
    margin-top: 4px;
    width: 186px;
    height: 42px;
  }
  .button_style1 {
    width: 60px;
    height: 28px;
  }

  #tip {
    margin-top: 4px;
    width: 200px;
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

</style>
