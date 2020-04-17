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
        <div v-if="buttonFormulaActived!==0" class="group">
          <div id="msg">
            <div v-if="buttonFormulaActived===1" id="pic" :style="`background-image: url(${picFormula1})`">
            
            </div>
            <div v-if="buttonFormulaActived===2" id="pic" :style="`background-image: url(${picFormula2})`">
            
            </div>
            <div v-if="buttonFormulaActived===3" id="pic" :style="`background-image: url(${picFormula3})`">
            
            </div>
          </div>
          <div class="button_style1" @click="ButtonEvent()">
            <buttonPrimary
              style="width: 100%"
              v-bind:title="buttonTitle"
              v-bind:actived="buttonActived"
              type="ellipse"
            ></buttonPrimary>
          </div>
          <div v-if="buttonActived" id="tip">
            <div v-if="buttonFormulaActived===1" id="pic" :style="`background-image: url(${picList[0].analysis})`">
            
            </div>
            <div v-if="buttonFormulaActived===2" id="pic" :style="`background-image: url(${picList[1].analysis})`">
            
            </div>
            <div v-if="buttonFormulaActived===3" id="pic" :style="`background-image: url(${picList[2].analysis})`">
            
            </div>
          </div>
        </div>
        <div class="buttonG">
          <div class="button_Formula" @click="ButtonEventFormula(1)">
            <buttonPrimary
              style="width: 100%"
              v-bind:title="buttonEllipseTitle"
              v-bind:actived="buttonFormulaActived===1"
              type="ellipse"
            ></buttonPrimary>
          </div>
          <div class="button_Formula" @click="ButtonEventFormula(2)">
            <buttonPrimary
              style="width: 100%"
              v-bind:title="buttonHyperbolaTitle"
              v-bind:actived="buttonFormulaActived===2"
              type="ellipse"
            ></buttonPrimary>
          </div>
          <div class="button_Formula" @click="ButtonEventFormula(3)">
            <buttonPrimary
              style="width: 100%"
              v-bind:title="buttonParabolaTitle"
              v-bind:actived="buttonFormulaActived===3"
              type="ellipse"
            ></buttonPrimary>
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
  width: 55%;
  height: 100%;
  margin-left: -10px;
}

.group {
  position: absolute;
  width: 350px;
  height: auto;
  top: 147px;
  right: 56px;
}

.buttonG {
  position: absolute;
  width: auto;
  height: 42px;
  bottom: 24px;
  right: 24px;
}

.button_style1 {
  width: 100px;
  height: 42px;
  margin-left: 250px;
}

#msg {
  width: 450px;
  margin-left: -100px;
  height: 120px;
}

#tip {
  width: 100%;
  height: 400px;
  margin-top: 12px;
}

#pic {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: left top;
  background-size: contain;
  pointer-events: none;
}


.button_Formula {
  float: left;
  width: 110px;
  height: 42px;
  margin-right: 11px;
}

#Container {
  background-color: #333333;
}
@media screen and (min-height: 600px) and (max-height: 800px) {
  .group {
    width: 300px;
    right: 24px;
    top: 100px;
  }
  #msg {
  width: 400px;
  margin-left: -100px;
  height: 100px;
}
  .button_style1 {
    margin-left: 200px;
  }
  #tip {
    width:350px;
    margin-left: -50px;
    margin-top: 12px;
  }
}

@media screen and (min-height: 450px) and (max-height: 599px) {
 .group {
    width: 300px;
    right: 24px;
    top: 70px;
  }
  #msg {
  width: 350px;
  margin-left: -50px;
  height: 80px;
}
  .button_style1 {
    margin-left: 200px;
  }
  #tip {
    width:300px;
    margin-left: 0px;
    margin-top: 12px;
  }
}

@media screen and (min-height: 300px) and (max-height: 449px) {
  .group {
    width: 200px;
    top: 70px;
    right: 24px;
  }
  
  #msg {
    width: 100%;
    height: 60px;
    margin-left: 0px;
  }

  .buttonG {
    bottom: 6px;
    right: 12px;
  }
  
  .button_style1 {
    margin-left: 133px;
    margin-top: -40px;
    width: 67px;
    height: 28px;
  }

  .button_Formula {
    float: left;
    width: 88px;
    height: 28px;
    margin-right: 8px;
  }

  #tip {
    margin-top: 8px;
    height: 160px;
  }
}


</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
</style>
