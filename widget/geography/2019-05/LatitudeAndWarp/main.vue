<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div style="background:#333333;width: 100%; height: 100%;">
          <div id="Container3d" :style="`position: absolute;left: ${leftPer};width: ${widthPer}; height: 100%;`">
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
        <div id="check" @click="check()"  :style="`background-image: url(${table})`"/>
        <div id="check2" @click="check2()"  :style="`background-image: url(${location})`"/>
        <div id="showimgbg" v-show="showtable">
          <div id="showimg" :style="`background-image: url(${bg})`">
            <div id="showimgA" class="button_style"> 
              <buttonImage v-bind="btn[0]"/> 
            </div>
            <div id="showimgB" class="button_style"> 
              <buttonImage v-bind="btn[1]"/> 
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
import buttonImage from './ui/buttonImage.vue';
@Component({
  components: {
    fullScreensLayout,
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
}

#check {
  width: 44px;
  height: 37px;
  position: fixed;
  right: 24px;
  bottom: 20px;
  z-index: 999;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

#check2 {
  width: 48px;
  height: 40px;
  position: fixed;
  right: 77px;
  bottom: 20px;
  z-index: 999;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
#showimgbg{
  position: absolute;
  left: 5%;
  width: 50%;
  height: 30%;
  border: 8px solid rgb(255, 255, 255);
  border-radius: 8px;
  background: #ffffff;
}
#showimg {
  width: 100%;
  height: 100%;
  z-index: 666;
  background: #ffffff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  touch-action: none;
}

#showimgA,
#showimgB {
  position: absolute;
  width: 40px;
  height: 40px;
  padding: 0;
  margin: 0;
  z-index: 999;
  touch-action: none;
}
@media screen and (max-height: 449px), 
screen and (max-width: 699px) {
#showimgbg{
  border: 4px solid rgb(255, 255, 255);
  border-radius: 6px;
}
}
</style>
