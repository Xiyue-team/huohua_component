<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox" slot-scope="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="Container" style="width: 100%; height: 100%;">
          <div id="Container3d" style="width: 100%; height: 100%;">
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
            <div class="button_style" @click="seasons(1)">
              <buttonPrimary
                style="width: 100%"
                v-bind:title="buttonTitle1"
                v-bind:actived="buttonActived===1"
                type="ellipse"
              ></buttonPrimary>
            </div>
            <div class="button_style" @click="seasons(2)">
              <buttonPrimary
                style="width: 100%"
                v-bind:title="buttonTitle2"
                v-bind:actived="buttonActived===2"
                type="ellipse"
              ></buttonPrimary>
            </div>
            <div class="button_style" @click="seasons(3)">
              <buttonPrimary
                style="width: 100%"
                v-bind:title="buttonTitle3"
                v-bind:actived="buttonActived===3"
                type="ellipse"
              ></buttonPrimary>
            </div>
            <div class="button_style" @click="seasons(4)">
              <buttonPrimary
                style="width: 100%"
                v-bind:title="buttonTitle4"
                v-bind:actived="buttonActived===4"
                type="ellipse"
              ></buttonPrimary>
            </div>
          </div>
          <transition name="fade">
            <div
              v-if="showPlan"
              class="weather-bg"
              :style="`background-image: url(${weatherList[showPlan - 1].bgSrc})`"
            >
              <div class="buttonG2">
                <div class="left_half">{{weatherList[showPlan - 1].desc}}</div>
                <div class="button_style2" @click="back()">
                  <buttonPrimary
                    style="width: 100%"
                    v-bind:title="buttonBackTitle"
                    v-bind:actived="!showPlan"
                    type="ellipse"
                  ></buttonPrimary>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </template>

      <template slot="controlPanel" slot-scope="controlPanel">
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
@Component({
  components: {
    fullScreensLayout,
    buttonPrimary
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
  color: #353535;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 3;
}
.buttonG {
  position: absolute;
  width: 100px;
  height: 216px;
  right: 62px;
  bottom: 113px;
}

.button_style {
  width: 100px;
  height: 42px;
  margin-top: 12px;
}
#Container {
  background-color: #333333;
}

.buttonG2 {
  position: absolute;
  width: 208px;
  height: auto;
  right: 57px;
  bottom: 113px;
}
.left_half {
  width: 166px;
  height: auto;
  color: #525252;
  font-size: 16px;
  padding: 20px 26px;
  line-height: 24px;
  border: 1px solid rgba(156, 156, 156, 0.2);
  border-radius: 8px;
  display: flex;
  right: 57px;
  background: #fff;
  margin-bottom: 8px;
}
.button_style2 {
  width: 88px;
  height: 42px;
  margin-top: 12px;
  margin-left: 73px;
}

.weather-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: #e9eff6;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
#check2 {
  width: auto;
  height: 100%;
}
#cleard2 {
  width: auto;
  height: 100%;
}
@media screen and (min-width: 480px) and (max-width: 800px) {
  .buttonG {
    right: 12px;
    bottom: 12px;
  }
  .buttonG2 {
    width: 140px;
    right: 12px;
    bottom: 12px;
  }
  .button_style2 {
    margin-top: 8px;
    margin-left: 32px;
  }
  .left_half {
    font-size: 12px;
    width: 124px;
    height: auto;
    padding: 8px;
    line-height: 24px;
    line-height: 16px;
    margin-bottom: 8px;
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
