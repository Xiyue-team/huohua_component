<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="Container" style="width: 100%; height: 100%;">
          <div id="Container3d">
            <canvas v-bind:class="{ 'do-gray' : gray}"
              id="renderCanvas"
              touch-action="none"
              width="1920"
              height="1080"
              tabindex="1"
              style="opacity: 1;"
            ></canvas>
          </div>
        </div>
        <div class="msg_text" v-show="msgShow">
          <div>{{msg}}</div>
        </div>
        <div class="buttonG">
          <div class="button_style" @click="section()">
            <buttonPrimary
              style="width: 100%"
              v-bind:title="text[0]"
              v-bind:actived="sectionActived"
              type="ellipse"
            ></buttonPrimary>
          </div>
          <div class="button_style" @click="perpendicular()">
            <buttonPrimary
              style="width: 100%"
              v-bind:title="text[1]"
              v-bind:actived="perpendicularActived"
              v-bind:disabled="perpendicularDisabled"
              type="ellipse"
            ></buttonPrimary>
          </div>
          <div class="button_style" @click="connect()">
            <buttonPrimary
              style="width: 100%"
              v-bind:title="text[2]"
              v-bind:actived="connectActived"
              v-bind:disabled="connectDisabled"
              type="ellipse"
            ></buttonPrimary>
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
import buttonPrimary from '../../../babylon/template/ui/buttonPrimary.vue';

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
  position: absolute;
  width: 100%;
  height: 100%;
}
.title_text {
  font-size: 24px;
  line-height: 24px;
  color: #353535;
  position: absolute;
  font-weight: bold;
  top: 24px;
  left: 24px;
  z-index: 3;
}

.buttonG {
  margin-top: -104px;
  position: fixed;
  width: 130px;
  height: 208px;
  right: 24px;
  top: 50%;
}

.button_style {
  width: 100%;
  height: 42px;
  margin-top: 12px;
}
.do-gray {
  -webkit-filter: grayscale(80%);
  filter: grayscale(40%);
}
.msg_text{
    position: absolute;
    left: 50%;
    top: 24px;
    margin-left: -150px;
    height: 16px;
    width: 300px;
}
.msg_text div{
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    color: #333333;
}
@media screen and (min-height: 600px) and (max-height: 800px) {
  .buttonG {
    width: 110px;
    right: 24px;
  }

}
@media screen and (min-height: 450px) and (max-height: 599px) {
  .buttonG {
    width: 110px;
    right: 24px;
  }

}

@media screen and (max-height: 449px) {
  .buttonG {
    margin-top: -80px;
    width: 100px;
    height: 160px;
  }
  .button_style {
    height: 28px;
  }
      .msg_text{
    margin-left: -125px;
    height: 14px;
    width: 250px;
  }
  .msg_text div{
    font-size: 14px;
  }
}

#Container {
  background-color: #fffceb;
}
</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
</style>
