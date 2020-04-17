<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="Container" style="width: 100%; height: 100%;">
          <div id="Container3d">
            <div style="width: 100%; height: 100%;">
              <canvas
                id="renderCanvas"
                touch-action="none"
                width="1920"
                height="1080"
                tabindex="1"
                style="opacity: 1;"
              ></canvas>
            </div>
            <div id="text" :style="`background-image: url(${picLabel})`">
              <div>{{numtext}}</div>
            </div>
          </div>
        </div>
        <div class="buttonG">
          <div class="button_style1" @click="ButtonEvent1()">
            <buttonPrimary
              style="width: 100%"
              v-bind:title="btntext[0]"
              v-bind:actived="buttonActived1"
              type="ellipse"
            ></buttonPrimary>
          </div>
          <div class="button_style2" @click="ButtonEvent2()">
            <buttonPrimary
              style="width: 100%"
              v-bind:title="btntext[1]"
              v-bind:actived="buttonActived2"
              type="ellipse"
            ></buttonPrimary>
          </div>
          <div class="button_style2" @click="ButtonEvent3()">
            <buttonPrimary
              style="width: 100%"
              v-bind:title="btntext[2]"
              v-bind:actived="buttonActived3"
              type="ellipse"
            ></buttonPrimary>
          </div>
        </div>
        <div v-if="buttonActived2" class="button_look" @click="ButtonLook()">
          <SwitchButton v-bind:valueV="look">{{btntext[3]}}</SwitchButton>
        </div>
        <div id="msg" v-show="buttonActived1" :style="`background-image: url(${picmsg})`"></div>
        <div id="tip" v-show="buttonActived3" :style="`background-image: url(${pictip})`"></div>
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
import SwitchButton from '../../../babylon/template/ui/SwitchButton.vue';
@Component({
  components: {
    fullScreensLayout,
    buttonPrimary,
    SwitchButton
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

#Container3d {
  position: absolute;
  left: 0;
  right: 149px;
  height: 100%;
}

.buttonG {
  position: absolute;
  width: 110px;
  height: 162px;
  right: 39px;
  bottom: 50%;
}
.button_look {
  position: absolute;
  width: 90px;
  height: 42px;
  right: 59px;
  bottom: 24px;
}
.button_style1 {
  width: 100%;
  height: 42px;
  margin-top: 81px;
}

.button_style2 {
  width: 100%;
  height: 42px;
  margin-top: 18px;
}

#tip {
  position: absolute;
  width: 411px;
  height: 30%;
  top: 50%;
  right: 161px;
  margin-top: 39px;
  background-repeat: no-repeat;
  background-position: right top;
  background-size: contain;
  pointer-events: none;
}

#msg {
  position: absolute;
  width: 411px;
  height: 15%;
  bottom: 50%;
  right: 161px;
  margin-bottom: 39px;
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: contain;
  pointer-events: none;
}

#text {
  position: absolute;
  width: 157.5px;
  height: 64px;
  bottom: 48px;
  left: 50%;
  margin-left: -79px;
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: contain;
  pointer-events: none;
}
#text div {
  float: left;
  width: auto;
  height: 24px;
  text-align: center;
  margin-left: 90px;
  margin-top: 15px;
  font-size: 24px;
  font-family: "Times New Roman";
  font-style: italic;
  line-height: 24px;
  color: #fff;
  padding: 5px;
  background: rgba(81, 81, 81, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
@media screen and (min-height: 600px) and (max-height: 800px) {
}
@media screen and (min-height: 450px) and (max-height: 599px) {
}

@media screen and (min-height: 300px) and (max-height: 449px) {
  #Container3d {
    width: 80%;
    height: 100%;
  }
  #text {
    width: 119px;
    height: 48px;
    margin-left: -59px;
    bottom: 24px;
  }
  #text div {
    float: left;
    height: 18px;
    margin-left: 66px;
    margin-top: 10px;
    font-size: 18px;
    line-height: 18px;
  }
  #tip {
    width: 206px;
    margin-top: 29px;
    right: 126px;
  }

  #msg {
    width: 206px;
    margin-bottom: 29px;
    right: 126px;
  }

  .buttonG {
    width: 90px;
    height: 142px;
    right: 24px;
  }

  .button_style1 {
    margin-top: 71px;
  }

  .button_style2 {
    margin-top: 8px;
  }
  .button_look {
    width: 80px;
    right: 39px;
    bottom: 24px;
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
