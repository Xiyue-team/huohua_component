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
          <div class="button_style1" @click="buttonEvent()">
            <buttonRadius
              style="width: 100%"
              v-bind:title="buttonTitle"
              v-bind:actived="buttonActived"
            ></buttonRadius>
          </div>
          <div class="msg">
            <p class="msgp">BC</p>
            <p class="num">{{text[0]}}</p>
            <p class="msgp">AB+AC</p>
          </div>
          <div class="msg">
            <p class="msgp">BC</p>
            <p class="num">{{text[1]}}</p>
            <p class="msgp">|&nbsp;AB-AC&nbsp;|</p>
          </div>
        </div>
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
import buttonRadius from '../../../babylon/template/ui/buttonRadius.vue';
@Component({
  components: {
    fullScreensLayout,
    buttonRadius
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
  position: absolute;
  height: 100%;
  left: 0;
  right: 200px;
}
.group {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 40%;
  right: 24px;
}
.msg {
  width: 200px;
  height: 38px;
  margin-top: 12px;
  margin-left: 0px;
  font-family: "Times New Roman";
  font-style: italic;
}
.msgp {
  float: right;
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  line-height: 24px;
  margin-top: 7px;
  margin-right: 6px;
}

.num {
  padding:6px 4px;
  min-width: 24px;
  height: auto;
  float: right;
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  line-height: 24px;
  background: rgba(81, 81, 81, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin-right: 6px;
}

.button_style1 {
    width: 140px;
    height: 42px;
    margin-left: 60px;
    margin-bottom: 50px; 
}


@media screen and (min-height: 600px) and (max-height: 800px) {

}

@media screen and (min-height: 450px) and (max-height: 599px) {

}
@media screen and (max-height: 449px), screen and (max-width: 699px) {
  #Container3d{
    right: 144px;
  }
  .group {
    width: 160px;
    height: 200px;
    top: 40%;
  }
  .msg {
    width: 160px;
    height: 28px;
    margin-top: 12px;
    margin-left: 0;
  }
  .msgp {
    font-size: 16px;
    line-height: 16px;
    margin-top: 6px;
    margin-right: 4px;
  }

  .num {
    padding:5px 4px;
    min-width: 16px;
    font-size: 16px;
    line-height: 16px;
    border-radius: 6px;
    margin-right: 4px;
  }

  .button_style1 {
    width: 100px;
    height: 28px;
    margin-left: 60px;
    margin-bottom: 0; 
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