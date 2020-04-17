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
          <div class="dropDown" @click="dropDown()">
            <BaseSelect @change="selectChange" :isOpen="boolOpen" :picList="picList" :currentShow="current" :dropIcon="dropIcon"></BaseSelect>
            </div>
          <div class="button_style" @click="Symmetrical(1)">
            <buttonRadius
              style="width: 100%"
              v-bind:title="buttonTitle1"
              v-bind:actived="buttonSymmetricalActived===1"
            ></buttonRadius>
          </div>
          <div class="button_style" @click="Symmetrical(2)">
            <buttonRadius
              style="width: 100%"
              v-bind:title="buttonTitle2"
              v-bind:actived="buttonSymmetricalActived===2"
            ></buttonRadius>
          </div>
          <div class="button_style" @click="Symmetrical(3)">
            <buttonRadius
              style="width: 100%"
              v-bind:title="buttonTitle3"
              v-bind:actived="buttonSymmetricalActived===3"
            ></buttonRadius>
          </div>
          <div class="button_style" @click="Symmetrical(4)">
            <buttonRadius
              style="width: 100%"
              v-bind:title="buttonTitle4"
              v-bind:actived="buttonSymmetricalActived===4"
            ></buttonRadius>
          </div>
          <div class="button_style" @click="Analysis()">
            <buttonRadius
              style="width: 100%"
              v-bind:title="buttonTitle5"
              v-bind:actived="buttonAnalysisActived"
            ></buttonRadius>
          </div>
        </div>
        <div id="tip" v-if="buttonAnalysisActived" :style="`background-image: url(${picmsg})`">
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
import buttonRadius from '../../../babylon/template/ui/buttonRadius.vue';
import BaseSelect from '../../../babylon/template/ui/baseSelect.vue';

@Component({
  components: {
    fullScreensLayout,
    buttonRadius,
    BaseSelect
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
  width: 70%;
  height: 100%;
}
.buttonG {
  position: absolute;
  width: 180px;
  height: 342px;
  bottom: 50%;
  right: 32px;
}
.dropDown {
  width: 100%;
  height: 42px;
  margin-top: 171px;
}
.button_style {
  width: 100%;
  height: 42px;
  margin-top: 18px;
}

#tip {
  position: absolute;
  width: 180px;
  height: 40px;
  top: 50%;
  margin-top: 130px;
  right: 222px;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: top right;
  background-size: contain;
}

#Container {
  background-color: #333333;
}

img {
  width: 100%;
  height: 100%;
}

@media screen and (min-width: 801px) and (max-width: 1024px) {
  .buttonG {
    right: 24px;
  }
}

@media screen and (min-width: 480px) and (max-width: 800px) {
  #Container3d{
  width: 60%;
  height: 100%;
  }
  .buttonG {
    width: 150px;
    height: 292px;
    right: 24px;
    top: 70px;
  }
  .dropDown {
    margin-top: 0px;
  }
  .button_style {
    height: 36px;
    margin-top: 4px;
  }
  #tip {
    right: 184px;
    top: 276px;
    height: 36px;
    margin-top: 0px;
  }
}

</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
</style>
