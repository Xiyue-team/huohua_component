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
            <BaseSelect @change="selectChange" :picList="picList" :isOpen="boolOpen" :currentShow="current" :dropIcon="dropIcon"></BaseSelect>
          </div>

          <div class="button_style" @click="Folding(1)">
            <buttonRadius
              style="width: 100%"
              v-bind:title="buttonTitle1"
              v-bind:actived="buttonActived === 1"
            ></buttonRadius>
          </div>
          <div class="button_style" @click="Folding(2)">
            <buttonRadius
              style="width: 100%"
              v-bind:title="buttonTitle2"
              v-bind:actived="buttonActived === 2"
            ></buttonRadius>
          </div>
          <div class="button_style" @click="Analysis()">
            <buttonRadius
              style="width: 100%"
              v-bind:title="buttonTitle3"
              v-bind:actived="analysisButtonActived"
            ></buttonRadius>
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
}
#Container3d{
  width: 70%;
  height: 100%;
}
.buttonG {
  position: absolute;
  width: 180px;
  height: 222px;
  bottom: 50%;
  right: 32px;
}
.dropDown {
   width: 100%;
  height: 42px;
  margin-top: 111px;
}
.button_style {
  width: 100%;
  height: 42px;
  margin-top: 18px;
}

#Container {
  background-color: #333333;
}

@media screen and (min-width: 801px) and (max-width: 1024px) {
}

@media screen and (min-width: 480px) and (max-width: 800px) {
  .buttonG {
    width: 170px;
    height: 204px;
    right: 24px;
  }
  .dropDown {
    margin-top: 102px;
  }
  .button_style {
    margin-top: 12px;
  }
}

</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
</style>
