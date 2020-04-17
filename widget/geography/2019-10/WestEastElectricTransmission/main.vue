<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="Container" style="width: 100%; height: 100%;">
          <div id="Container3d">
            <canvas id="renderCanvas" touch-action="none" width="1920" height="1080" tabindex="1" style="opacity: 1;" ></canvas>
          </div>
          <div class="buttonG">
            <div class="button_style" v-for="(item, index) in btntext" :key="index" @click="selectModeEvent(index)">
              <buttonPrimary style="width: 100%" v-bind:title="item" v-bind:actived="selectMode===index" type="ellipse"></buttonPrimary>
            </div>
          </div>
          <div class="tip" v-for="(item, index) in showList" :style="`top: ${item.top}%;left: ${item.left}%;`"
           v-show="selectMode===index" :key="index"  v-html="item.text">
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
  import buttonPrimary from '../../../babylon/template/ui/buttonPrimary.vue';
  import { ViewModel } from './ViewModel';

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

#Container3d{
  width: 100%;
  height: 100%;
}

.title_text {
  font-size: 24px;
  line-height: 24px;
  color: #525252;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 3;
}

#Container {
  background-color: #f6f8fd;
}

.buttonG {
  position: absolute;
  width: 136px;
  height: 120px;
  bottom: 80px;
  right: 42px;
}

.button_style {
  width: 100%;
  height: 42px;
  margin-top: 18px;
}

.tip {
  position: absolute;
  width: 262px;
  height: auto;
  padding: 24px;
  border-radius: 16px;
  font-size: 20px;
  color: #ffffff;
  line-height: 28px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
}

@media screen and (min-height: 600px) and (max-height: 800px), 
screen and (min-width: 950px) and (max-width: 1500px) {
  .tip {
    padding: 16px;
    width: 193px;
    font-size: 16px;
    line-height: 20px;
    border-radius: 12px;
  }
}

@media screen and (min-height: 450px) and (max-height: 599px), 
screen and (min-width: 700px) and (max-width: 949px) {
    .buttonG {
    right: 24px;
  }
  .tip {
    padding: 16px;
    width: 193px;
    font-size: 16px;
    line-height: 20px;
    border-radius: 10px;
  }
}

@media screen and (max-height: 449px), 
screen and (max-width: 699px) {
  .title_text {
    font-size: 20px;
    line-height: 20px;
    top: 20px;
    left: 20px;
  }

  .buttonG {
    width: 110px;
    height: 114px;
    bottom: 24px;
    right: 24px;
  }

  .button_style {
    width: 100%;
    height: 28px;
    margin-top: 10px;
  }

  .tip {
    padding: 10px;
    width: 155px;
    font-size: 14px;
    line-height: 18px;
    border-radius: 8px;
  }
}
</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
</style>
