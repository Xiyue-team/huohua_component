<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="Container3d" style="width: 100%; height: 100%;">
          <canvas id="renderCanvas" touch-action="none" width="1080" height="1080" tabindex="1" style="opacity: 1;"></canvas>
        </div>
        <div class="buttonG">
          <div class="pannel">
            <div class="subtitle" v-html="subtitle"/>
            <div class="button_style" v-for="(item, index) in btn" :key="index" @click="selectModeEvent(index)">
              <buttonPrimary v-bind:title="item.title" v-bind:actived="item.active" v-bind:disabled="item.disabled"/>
            </div>
          </div>
          <div class="msgGP">
            <div class="msgG1" @click="selfRotate()">
              <buttonPrimary v-bind:title="btntext[4]" v-bind:actived="isSelfRotate"/>
            </div>
            <div class="msgG2" @click="puclicRotate()">
              <buttonPrimary v-bind:title="btntext[5]" v-bind:actived="isPuclicRotate"/>
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
import buttonPrimary from './ui/buttonPrimary.vue';
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
}

.buttonG {
  position: absolute;
  width: 223px;
  height: 320px;
  top: 50%;
  margin-top: -160px;
  right: 24px;
}
.pannel{
  width: 100%;
  height: 258px;
  background: rgba(180, 180, 180, 0.26);
  border-radius: 8px;
}
.subtitle{
  float: left;
  width: auto;
  height: 18px;
  font-family: 'SourceHanSansSC-Medium';
  font-size: 18px;
  color: #ffffff;
  margin-top: 12px;
  margin-left: 12px;
}
.button_style {
  float: left;
  width: auto;
  height: 42px;
  margin-top: 12px;
  margin-left: 12px;
}
.msgGP {
  width: 100%;
  height: 42px;
  margin-top: 12px;
}
.msgG1 {
  float: left;
  width: 100px;
  height: 100%;
}
.msgG2 {
  float: right;
  width: 100px;
  height: 100%;
}
@media screen and (min-height: 600px) and (max-height: 800px), screen and (min-width: 950px) and (max-width: 1500px)  {
}

@media screen and (min-height: 450px) and (max-height: 599px), screen and (min-width: 700px) and (max-width: 949px)  {
.buttonG {
  width: 200px;
  height: 270px;
  margin-top: -135px;
}
.pannel{
  height: 224px;
}
.subtitle{
  height: 20px;
  font-size: 16px;
  margin-top: 10px;
  margin-left: 8px;
}
.button_style {
  height: 36px;
  margin-top: 10px;
  margin-left: 12px;
}
.msgGP {
  height: 36px;
  margin-top: 10px;
}
.msgG1,.msgG2 {
  width: 90px;
}
}

@media screen and (max-height: 449px), screen and (max-width: 699px) {
.buttonG {
  width: 183px;
  height: 216px;
  margin-top: -98px;
}
.pannel{
  width: 100%;
  height: 180px;
  border-radius: 8px;
}
.subtitle{
  height: 18px;
  font-size: 14px;
  margin-top: 8px;
  margin-left: 8px;
}
.button_style {
  float: left;
  width: 100%;
  height: 28px;
  margin-top: 8px;
  margin-left: 12px;
}
.msgGP {
  width: 100%;
  height: 28px;
  margin-top: 8px;
}
.msgG1,.msgG2 {
  width: 80px;
}
}
</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
</style>
