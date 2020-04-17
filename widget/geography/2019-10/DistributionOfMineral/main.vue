<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="container" style="width: 100%; height: 100%;">
          <div id="msg"  :style="`background-image: url(${picbg})`"></div>
          <div id="msg" 
            v-for="(item, index) in pic" 
            v-show="buttonActived===index" 
            :style="`background-image: url(${item})`" :key="index"></div>
          <div class="buttonG">
            <div v-for="(item, index) in buttonTitle" class="button_style" @click="buttonEvent(index)" :key="index">
              <buttonPrimary
                style="width: 100%"
                v-bind:title="item"
                v-bind:actived="buttonActived===index"
                type="ellipse"
              ></buttonPrimary>
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
import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';
import Component from 'vue-class-component';
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
.title_text {
  font-size: 24px;
  line-height: 24px;
  color: #525252;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 3;
}
#container {
  background: #fff;
}
.buttonG {
  position: absolute;
  width: 100px;
  height: 216px;
  right: 30px;
  bottom: 38px;
}

.button_style {
  width: 100px;
  height: 42px;
  margin-top: 12px;
}
#msg {
  position: absolute;
  top: 10%;
  width: 100%;
  height: 80%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  pointer-events: none;
}

@media screen and (min-height: 450px) and (max-height: 599px) {
.buttonG {
  right: 24px;
  bottom: 24px;
}
}

@media screen and (min-height: 300px) and (max-height: 449px) {
  #msg {
    top: 10%;
    height: 80%;
  }
  .button_style {
    margin-top: 8px;
  }
  .buttonG {
    height: 200px;
    right: 24px;
    bottom: 24px;
  }
}
</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
</style>
