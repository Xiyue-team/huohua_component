<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="Container" style="width: 100%; height: 100%;">
          <div id="block" :style="`background-image: url(${picbg})`"></div>
          <div id="block" v-show="selectMode===0" :style="`background-image: url(${pic[0]})`"></div>
          <div id="block" v-show="selectMode===1" :style="`background-image: url(${pic[1]})`"></div>
          <div id="block">
            <div
              class="dot_style"
              v-for="item in locationList"
              v-show="item.showIndex===selectMode"
              :style="`left: ${item.left}px; top:${item.top}px`"
              @click="buttonEvent(item.id)"
              :key="item.id">
              <buttonImage></buttonImage>
            </div>
            <div
              class="tip1"
              v-for="item1 in showList"
              :style="`top: ${item1.top}px;left: ${item1.left}px;`"
              v-show="selectMode===item1.id"
              v-html="item1.text"
            ></div>
            <div
              class="tip"
              v-for="item in locationList"
              :class="item.class"
              :style="`top: ${item.top}px;left: ${item.left}px;`"
              v-show="item.active"
              v-html="item.text"
            ></div>
          </div>
          <div class="buttonG">
            <div
              class="button_style"
              v-for="(item, index) in btntext"
              :key="index"
              @click="selectModeEvent(index)">
              <buttonPrimary
                style="width: 100%"
                v-bind:title="item"
                v-bind:actived="selectMode===index"
                type="ellipse"></buttonPrimary>
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
  import buttonPrimary from '../../../babylon/template/ui/buttonPrimary.vue';
  import { ViewModel } from './ViewModel';
  import buttonImage from './ui/buttonImage.vue';
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
#block {
  float: left;
  height: 90%;
  width: 90%;
  left: 5%;
  top: 5%;
  position: absolute;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
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
  background-color: #ffffff;
}

.buttonG {
  position: absolute;
  width: 136px;
  height: 120px;
  bottom: 80px;
  right: 42px;
}
.dot_style {
  position: absolute;
  width: 1px;
  height: 1px;
  background: #525252;
}

.button_style {
  width: 100%;
  height: 42px;
  margin-top: 18px;
}

.tip,.tip1 {
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  font-size: 20px;
  color: #ffffff;
  line-height: 28px;
  padding: 20px;
  max-width: 300px;
  height: auto;
  border-radius: 16px;
  z-index: 999;
  text-align: left;
  pointer-events: none;
}
.tip1 {
  width: 361px;
}
.leftC{
  margin-left: -360px;
  margin-top: 0px;
}
.rightC{
  margin-left: 50px;
  margin-top: -250px;
}
@media screen and (min-height: 600px) and (max-height: 800px)
, screen and (min-width: 950px) and (max-width: 1500px) {
  .tip,.tip1 {
    font-size: 16px;
    line-height: 20px;
    padding: 10px;
    width: 193px;
    border-radius: 10px;
  }
  .tip1 {
    width: 241px;
  }

  .leftC{
    margin-left: -250px;
    margin-top: -30px;
  }
  .rightC{
    margin-left: -60px;
    margin-top: -180px;
  }
}

@media screen and (min-height: 450px) and (max-height: 599px)
, screen and (min-width: 700px) and (max-width: 949px) {
  .tip,.tip1 {
    font-size: 16px;
    line-height: 20px;
    padding: 10px;
    width: 193px;
    border-radius: 10px;
  }
  .tip1 {
    width: 241px;
  }
  .buttonG {
    right: 24px;
    bottom: 24px;
  }
  #block {
    height: 80%;
    width: 80%;
    left: 10%;
    top: 10%;
  }
  .leftC{
    margin-left: -250px;
    margin-top: -30px;
  }
  .rightC{
    margin-left: 20px;
    margin-top: -180px;
  }
}

@media screen and (max-height: 449px), screen and (max-width: 699px) {
  .title_text {
    font-size: 20px;
    line-height: 20px;
    top: 20px;
    left: 20px;
  }

  .buttonG {
    position: absolute;
    width: 110px;
    height: 76px;
    bottom: 24px;
    right: 24px;
  }
  .button_style {
    width: 100%;
    height: 28px;
    margin-top: 10px;
  }
  .tip,.tip1 {
    padding: 4px;
    width: 157px;
    border-radius: 6px;
    font-size: 12px;
    line-height: 14px;
  }
  .tip1 {
    width: 181px;
  }
  .leftC{
    margin-left: -180px;
    margin-top: -20px;
  }
  .rightC{
    margin-left: 10px;
    margin-top: -100px;
  }
}
</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
</style>
