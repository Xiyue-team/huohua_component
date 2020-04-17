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
        <div id="formula1" v-html="formula1"  :style="`background-image: url(${picformula1})`">
        </div>
        <div id="formula2" v-html="formula2" :style="`background-image: url(${picformula2})`">
        </div>
        <div class="button_style" @click="ButtonEvent(1)">
          <buttonImage
            v-bind:actived="buttonActived===1"
            v-bind="Option1"
          ></buttonImage>
        </div>
        <div class="button_style" @click="ButtonEvent(2)">
          <buttonImage
            v-bind:actived="buttonActived===2"
            v-bind="Option2"
          ></buttonImage>
        </div>
        <div class="button_style" @click="ButtonEvent(3)">
          <buttonImage
            v-bind:actived="buttonActived===3"
            v-bind="Option3"
          ></buttonImage>
        </div>
        <div class="button_style" @click="ButtonEvent(4)">
          <buttonImage
            v-bind:actived="buttonActived===4"
            v-bind="Option4"
          ></buttonImage>
        </div>
        </div>
        <div class="buttonG2">
          <div id="formula1">
          </div>
          <div id="formula2">
          </div>
          <div id="msg" >
            <div id="msgc" v-if="buttonActived===1">
            {{msg1}}
            </div>
          </div>
          <div id="msg" >
            <div id="msgc" v-if="buttonActived===2">
              {{msg2}}
            </div>
          </div>
          <div id="msg" >
            <div id="msgc" v-if="buttonActived===3"  :style="`background-image: url(${picmsg3})`">
            </div>
          </div>
          <div id="msg" >
            <div id="msg2" v-if="buttonActived===4"  :style="`background-image: url(${picmsg4})`">
            </div>
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
import buttonImage from '../../../babylon/template/ui/buttonImage.vue';

@Component({
  components: {
    fullScreensLayout,
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
  width: 88px;
  height: 298px;
  bottom: 50%;
  right: 24px;
}
.buttonG2 {
  position: absolute;
  width: 136px;
  height: 298px;
  bottom: 50%;
  right: 136px;
}
#formula1,#formula2{
  width: 108px;
  height: 20px;
  text-align: left;
  font-size: 20px;
  line-height: 20px;
  font-family: 'Times New Roman', Times, serif;
  color: #FFFFFF;
  background-repeat: no-repeat;
  background-position: top left;
  background-size: contain;
  pointer-events: none;
}

#formula1{
  margin-top: 149px;
}
#formula2{
  margin-top: 18px;
}

.button_style {
  width: 100%;
  height: 42px;
  margin-top: 18px;
}
#msg {
  width: 100%;
  height: 42px;
  margin-top: 18px;
}
#msgc {
  font-size: 16px;
  line-height: 42px;
  color: #FFFFFF;
  width: 100%;
  height: 100%;
  text-align: right;
  background-repeat: no-repeat;
  background-position: center right;
  background-size: contain;
  pointer-events: none;
}
#msg2 {
  width: 72px;
  height: 51px;
  margin-left: 64px;
  background-repeat: no-repeat;
  background-position: top right;
  background-size: contain;
  pointer-events: none;
}
@media screen and (min-height: 600px) and (max-height: 800px) {
  #Container3d{
    width: 60%;
    height: 100%;
  }
}
@media screen and (min-height: 450px) and (max-height: 599px) {
  #Container3d{
    width: 64%;
    height: 100%;
  }
}

@media screen and (min-height: 300px) and (max-height: 449px) {
.buttonG {
  height: 160px;
  /* top: 80px; */
  }
  .buttonG2 {
  height: 160px;
  /* top: 80px; */
}
  #Container3d{
    width: 60%;
    height: 100%;
  }
  #formula1,#formula2{
    width: 98px;
    height: 18px;
    font-size: 18px;
    line-height: 18px;
  }
  #formula1{
    margin-top: 80px;
  }
  #formula2{
    margin-top: 18px;
  }

  .button_style {
    height: 28px;
    width: 59px;
    margin-top: 8px;
  }
  #msg {
    width: 100%;
    height: 28px;
    margin-top: 8px;
  }
  #msgc {
    font-size: 16px;
    line-height: 24px;
    width: 100%;
    height: 100%;
  }
  #msg2 {
    width: 48px;
    height: 34px;
    margin-left: 88px;
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