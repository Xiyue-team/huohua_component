<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
         <div class="description_text" v-html="text[3]"></div>
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
            <div class="button_style1" @click="inductionEvent(1)">
              <buttonRadius
                style="width: 100%"
                v-bind:title="text[0]"
                v-bind:actived="inductionActived===1"
              ></buttonRadius>
            </div>
            <div class="button_style1" @click="inductionEvent(2)">
              <buttonRadius
                style="width: 100%"
                v-bind:title="text[1]"
                v-bind:actived="inductionActived===2"
              ></buttonRadius>
            </div>
            <div class="button_style1" @click="inductionEvent(3)">
              <buttonRadius
                style="width: 100%"
                v-bind:title="text[2]"
                v-bind:actived="inductionActived===3"
              ></buttonRadius>
            </div>
          </div>

          <div class="button_style2" @click="descriptionEvent()">
            <buttonRadius
              style="width: 100%"
              v-bind:title="btntext[1]"
              v-bind:actived="descriptionActived"
            ></buttonRadius>
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
import buttonRadius from '../../../babylon/template/ui/buttonRadius.vue';
import smallRadius from './ui/smallRadius.vue';
import Component from 'vue-class-component';
import { ViewModel } from './ViewModel';

@Component({
  components: {
    fullScreensLayout,
    buttonRadius,
    smallRadius
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
#Container3d {
  position: absolute;
  left: 0;
  right: 198px;
  top:0;
  bottom: 0;
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

.description_text {
  position: absolute;
  font-size: 22px;
  line-height: 22px;
  color: #ffffff;
  font-family: "Times New Roman";
  font-style: italic;
  top: 72px;
  left: 24px;
  z-index: 3;
  pointer-events: none;
}

.buttonG {
  position: fixed;
  width: 112px;
  height: 192px;
  bottom: 50%;
  margin-bottom: -96px;
  right: 86px;
}

.button_style1 {
  float: left;
  width: 100%;
  height: 42px;
  margin-top: 22px;
  font-family: "Times New Roman";
  font-style: italic;
}

.button_style1>>>.buttonRadius {
    font-size: 22px;
}

.button_style1 >>> sup {
  height: 16px;
  width: 20px;
  text-align: center;
  font-size: 16px;
  line-height: 10px;
  font-family: "Times New Roman";
  font-style: italic;
}

.button_style2{
  position: fixed;
  width: 112px;
  height: 42px;
  bottom: 43px;
  right: 86px;
}

#Container {
  background-color: #333333;
}
@media screen and (min-height: 600px) and (max-height: 800px), screen and (min-width: 950px) and (max-width: 1500px) {
    #Container3d {
      right: 198px;
    }
}

@media screen and (min-height: 450px) and (max-height: 599px), screen and (min-width: 700px) and (max-width: 949px) {
  .description_text {
    font-size: 18px;
    line-height: 18px;
    top: 64px;
  }

  .buttonG,.button_style2 {
    right: 24px;
  }

  #Container3d {
    right: 136px;
  }
}

@media screen and (max-height: 449px), screen and (max-width: 699px) {
  .title_text {
    font-size: 20px;
    line-height: 20px;
    top: 12px;
  }
  .description_text {
    font-size: 16px;
    line-height: 16px;
    top: 40px;
  }
  #Container3d {
    right: 136px;
  }

  .buttonG {
    width: 100px;
    height: 120px;
    bottom: 50%;
    right: 24px;
    margin-bottom: -60px;
  }
  .button_style1{
    height: 28px;
    margin-top: 12px;
  }
  
  .button_style2{
     width: 100px;
    height: 28px;
    right: 24px;
  }

  .button_style1>>>.buttonRadius {
    font-size: 16px;
  }

  .button_style1 >>> sup {
    height: 12px;
    width: 16px;
    font-size: 12px;
    line-height: 8px;
  }
}

</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
</style>
