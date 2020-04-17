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
        <div class="group">
          <div id="msg" :style="`background-image: url(${picmsg})`"> </div>
          <div class="button_style1" @click="ButtonEvent()">
            <buttonPrimary
              style="width: 100%"
              v-bind:title="buttonTitle"
              v-bind:actived="buttonActived"
              type="ellipse"
            ></buttonPrimary>
          </div>
        <div v-if="buttonActived" id="tip" :style="`background-image: url(${pictip})`">
        </div>
          </div>
      </template>

      <template slot="controlPanel">
        <div id="controlPanel"></div>
      </template>
    </fullScreensLayout>
  </div>
</template>

<script lang='ts'>
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
  color: #fff;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 3;
  pointer-events: none;
}
#Container3d{
  width: 50%;
  height: 100%;
}
.group {
  position: absolute;
  width: 500px;
  height: 500px;
  top: 40%;
  right: 46px;
}
#msg {
  width: 100%;
  height: 55px;
  margin-bottom: 12px;
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: contain;
  pointer-events: none;
}

.button_style1 {
    width: 100px;
    height: 42px;
    margin-left: 400px;   
}

#tip {
    width: 435px;
    height:400px;
    margin-top: 24px;
    background-repeat: no-repeat;
    background-position: top right;
    background-size: contain;
    pointer-events: none;
}

@media screen and (min-width: 801px) and (max-width: 1024px) {
  .group {
    width: 380px;
    top: 20%;
    right: 24px;
  }
 #msg{
    height: 30px;
  }
  .button_style1 {
    margin-left: 280px;
  }
  #tip {
    margin-top: 12px;
    width: 380px;
  }
}

@media screen and (min-width: 480px) and (max-width: 800px) {
  .group {
    width: 280px;
    top: 80px;
    right: 24px;
  }
  #msg{
    height: 30px;
  }
  .button_style1 {
    margin-left: 180px;
  }

  #tip {
    margin-top: 12px;
    width: 220px;
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