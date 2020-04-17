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
        <div class="blist">
          <div class="pictitle" :style="`background-image: url(${pictitle})`"></div>
            <BaseList
              :msgList="msglis"
              :picList="piclis"
            ></BaseList>
        </div>

        <div class="buttonG" v-if="isShow===false">
              <div class="error">
          <div class="errorleft" v-show="leftshow" :style="`background-image: url(${pictip})`">
            {{buttonTitle[2]}}
          </div>
            </div>
          <div class="button_Formula" @click="ButtonEvent(1)">
            <buttonPrimary
              style="width: 100%"
              v-bind:title="buttonTitle[0]"
              v-bind:actived="buttonActived===1"
              type="ellipse"
            ></buttonPrimary>
          </div>
          <div class="button_Formula" @click="ButtonEvent(2)">
            <buttonPrimary
              style="width: 100%"
              v-bind:title="buttonTitle[1]"
              v-bind:actived="buttonActived===2"
              type="ellipse"
            ></buttonPrimary>
          </div>
          <div class="error">
            <div class="errorright" v-show="rightshow" :style="`background-image: url(${pictip})`">
            {{buttonTitle[2]}}
          </div>
          </div>
        </div>
        <div id="tip" v-if="isShow===true">
          {{tipmsg}}
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
import buttonPrimary from '../../../babylon/template/ui/buttonPrimary.vue';
import BaseList from '../../../babylon/template/ui/baseList.vue';

@Component({
  components: {
    fullScreensLayout,
    buttonPrimary,
    BaseList
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
  position: absolute;
  width: 50%;
  height: 85%;
  bottom: 5%;
}
.buttonG {
  position: absolute;
  width: auto;
  height: 42px;
  bottom: 44px;
  right: 24px;
}

.blist{
  position: absolute;
  width: auto;
  height: auto;
  top: 80px;
  right: 24px;
}
.pictitle{
  width: 100%;
  height: 28px;
  background-repeat: no-repeat;
  background-position: left center;
  background-size: contain;
  pointer-events: none;
}
.button_Formula {
  float: left;
  width: 110px;
  height: 100%;
  margin-right: 11px;
}
.error{
  float: left;
  width: 80px;
  height: 100%;
  margin-right: 11px;
}

.errorright,.errorleft{
  width: 100%;
  height: 100%;
  font-size: 18px;
  line-height: 42px;
  color: #FF5A5A;
  text-align: left;
  background-repeat: no-repeat;
  background-position: right center;
  background-size: contain;
  pointer-events: none;
}

.errorleft{
  text-align: right;
  background-position: left center;
}

#tip {
  position: absolute;
  width: 500px;
  bottom: 44px;
  right: 24px;
  height: 29px;
  font-size: 20px;
  line-height: 29px;
  color: #FFFFFF;
  text-align: right;
}
@media screen and (min-height: 600px) and (max-height: 800px) {
  .buttonG {
    right: 24px;
  }
  #Container3d{
    width: 50%;
    bottom: 5px;
    margin-left: 5px;
  }
}
@media screen and (min-height: 450px) and (max-height: 599px) {
  .buttonG {
    right: 24px;
  }
  #Container3d{
    width: 50%;
    bottom: 5px;
    margin-left: 5px;
  }
}
@media screen and (min-height: 300px) and (max-height: 449px) {
  .pictitle{
    width: 100%;
  }
  .error{
    width: 52px;
  }
  .errorright,.errorleft{
    font-size: 12px;
    line-height: 28px;
  }
  .blist{
    width: auto;
    top: 70px;
    right: 24px;
  }
  .buttonG {
    height: 28px;
    bottom: 8px;
    right: 0px;
  }
  .button_Formula {
    float: left;
    width: 90px;
    height: 100%;
    margin-right: 11px;
  }
  #Container3d{
    width: 48%;
    bottom: 5px;
  }
  #tip {
  bottom: 12px;
  height: 24px;
  font-size: 14px;
  line-height: 24px;
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
