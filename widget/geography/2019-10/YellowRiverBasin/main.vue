<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="Container" style="width: 100%; height: 100%;">
          <div id="Container3d">
            <canvas id="renderCanvas" touch-action="none" width="1920" height="1080" tabindex="1" style="opacity: 1;"></canvas>
            <div class="buttonG" v-show="isBigScreen">
              <div class="button_style" v-for="(item, index) in btntext" :key="index" @click="selectModeEvent(index)">
                <buttonPrimary
                  style="width: 100%"
                  v-bind:title="item"
                  v-bind:actived="selectMode===index"
                  type="ellipse" ></buttonPrimary>
              </div>
            </div>
          </div>

          <div id="bottomContainer">
            <div class="bottombuttonG" v-show="!isBigScreen &&selectMode!==0 && selectMode!==2">
              <div class="bottombutton_style" v-for="(item, index) in btntext" :key="index" @click="selectModeEvent(index)">
                <buttonPrimary
                  style="width: 100%"
                  v-bind:title="item"
                  v-bind:actived="selectMode===index"
                  type="ellipse" ></buttonPrimary>
              </div>
            </div>
            <div v-show="selectMode===0||selectMode===2" class="slider_style">
                <div class="close" v-show="!isBigScreen" :style="`background-image: url(${picclose})`"  @click="selectModeEvent(-1)"/> 
                <div class="sliderstyle"> 
                  <vue-slider  ref='slider' v-model="value" v-bind="sliderOption" @change="formatter"/>
                </div>
            </div>
          </div>
          <transition name="fade">
            <div id="tcontainer" style="width: 100%; height: 100%;">
               <div class="bg" v-if="buttonActived>-1" 
              :style="`background-image: url(${item.bg})`" >
                <div id="tip">
                  <p v-html="item.text"></p>
                </div>
              </div> 
               <div v-show="buttonActived>-1" class="back" @click="buttonEvent(-1)">
                <div :style="`background-image: url(${picback})`"></div>
              </div>
            </div>
          </transition>
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
  import buttonPrimary from '../../../babylon/template/ui/buttonPrimary.vue';
  import { ViewModel } from './ViewModel';
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
  position: absolute;
  font-size: 24px;
  line-height: 24px;
  font-weight: bold;
  color: #525252;
  top: 24px;
  left: 24px;
  z-index: 3;
}
.back {
  position: absolute;
  width: 48px;
  height: 42px;
  top: 24px;
  right: 24px;
  background: #ffffff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  cursor: pointer;
  z-index: 999;
}

.back div{
  float: left;
  width: 32px;
  height: 26px;
  margin: 8px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.close{
  position: absolute;
  width: 20px;
  height: 20px;
  top: -10px;
  right: -10px;
  background: #ffffff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  cursor: pointer;
  z-index: 4;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

#Container {
  background-color: #f6f8fd;
}
.bgG {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 998;
}

#Container3d {
  position: absolute;
  top: 80px;
}

.buttonG {
  position: absolute;
  width: 136px;
  height: 240px;
  bottom: 24px;
  right: 24px;
}

.button_style {
  width: 100%;
  height: 42px;
  margin-top: 18px;
}

#bottomContainer{
  position: absolute;
  width: 100%;
  bottom: 0;
  
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-pack: center;
  -webkit-box-align: center;

  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-pack: center;
  -moz-box-align: center;

  display: -o-box;
  -o-box-orient: vertical;
  -o-box-pack: center;
  -o-box-align: center;

  display: -ms-box;
  -ms-box-orient: vertical;
  -ms-box-pack: center;
  -ms-box-align: center;

  display: box;
  box-orient: vertical;
  box-pack: center;
  box-align: center;
}

.bottombuttonG{
  width: 592px;
  height: 42px;
}

.bottombutton_style {
  float: left;
  width: 130px;
  height: 100%;
  margin-left: 9px;
  margin-right: 9px;
}

#tip {
  position: absolute;
  top: 72px;
  left: 72px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 24px;
  width: 392px;
  height: auto;
  border-radius: 2px;
  z-index: 999;
}

#tip p {
  font-size: 20px;
  color: #FFFFFF;
  line-height: 28px;
}

 .slider_style {
    position: absolute;
    height: 70px;
    left: 70px;
    right: 70px;
    top: 50%;
    margin-top: -35px;
    background: #FFFFFF;
    border: 0 solid rgba(0,0,0,0.10);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
    border-radius: 6px;
  }

  .sliderstyle {
    margin-left: 35px;
    margin-right: 35px;
    margin-top: 10px;
    height: 26px;
  }

@media screen and (min-height: 600px) and (max-height: 800px) {

}

@media screen and (min-height: 450px) and (max-height: 599px) {

}

@media screen and (max-height: 449px) {
  #Container3d {
    top: 70px;
  }
  .buttonG {
    position: absolute;
    width: 110px;
    height: 152px;
    bottom: 8px;
    right: 8px;
  }
  .button_style {
    width: 100%;
    height: 28px;
    margin-top: 6px;
  }
  .slider_style {
    position: absolute;
    height: 50px;
    margin-top: -25px;
  }
  .sliderstyle {
    margin-top: 5px;
    height: 26px;
  }

  #tip {
    padding: 10px;
    width: 200px;
  }
  #tip p {
    font-size: 14px;
    line-height: 18px;
  }

  .bottombuttonG{
    width: 440px;
    height: 28px;
  }

  .bottombutton_style {
    width: 100px;
    margin-left: 5px;
    margin-right: 5px;
  }

}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
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
