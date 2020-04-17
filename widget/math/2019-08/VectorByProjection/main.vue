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
        <div id="msg" v-if="buttonActived===1"  :style="`background-image: url(${picmsg})`">
        </div>
        <div class="buttonG">
        <div class="button_style1" @click="ButtonEvent(1)">
          <buttonImage
            v-bind:actived="buttonActived===1"
            v-bind="Option1"
          ></buttonImage>
        </div>
        <div class="button_style" @click="ButtonEvent(2)">
          <buttonImage
            v-bind:actived="buttonActived===2"
            v-bind="Option2"
          ></buttonImage>
        </div>
        </div>
        <div v-if="buttonActived===2" id="tip" :style="`background-image: url(${pictip})`">
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
import buttonImage from '../../../babylon/template/ui/buttonImage.vue';

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
  pointer-events: none;
}
#Container3d{
  width: 80%;
  height: 100%;
}
.buttonG {
  position: absolute;
  width: 182px;
  height: 102px;
  bottom: 50%;
  right: 24px;
}

.button_style1 {
  margin-top: 51px;
  width: 100%;
  height: 42px;
}

.button_style {
  width: 100%;
  height: 42px;
  margin-top: 18px;
}
#tip {
  position: absolute;
  width: 182px;
  height: 56px;
  right: 24px;
  top:50%;
  margin-top: 69px;
  background-repeat: no-repeat;
  background-position: top right;
  background-size: contain;
  pointer-events: none;
}
#msg {
  position: absolute;
  width: 182px;
  height: 56px;
  right: 24px;
  bottom:50%;
  margin-bottom: 69px;
  background-repeat: no-repeat;
  background-position: top right;
  background-size: contain;
  pointer-events: none;
}
@media screen and (min-height: 600px) and (max-height: 800px) {
  
}

@media screen and (min-height: 450px) and (max-height: 599px) {
 #Container3d{
    width: 70%;
  }
}

@media screen and (min-height: 300px) and (max-height: 449px) {
  #Container3d{
    width: 60%;
    height: 100%;
  }
  #tip {
    width: 182px;
    margin-top: 59px;
  }
  #msg {
    width: 182px;
    margin-bottom: 59px;
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