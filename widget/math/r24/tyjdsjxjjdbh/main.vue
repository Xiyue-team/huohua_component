<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">
                      <span>
                          椭圆焦点三角形∠
                      </span>
                      <span style="font-family: 'Times New Roman'; font-style: italic; margin-left: -5px">
                          F
                      </span>
                      <span style="margin-left: -5px">
                          ₁
                      </span>
                      <span style="font-family: 'Times New Roman'; font-style: italic; margin-left: -5px">
                          PF
                      </span>
                      <span style="margin-left: -5px">
                          ₂
                      </span>
                      <span style="margin-left: -5px">
                          的变化
                      </span>
                  </div>
                  <div id="3dContainer"></div>
                  <div @click="concluseEvent()">
                      <buttonPrimary class="conclusionButton" v-bind:title="conclusionTitle" type="ellipse" v-bind:actived="conclusionColor">
                      </buttonPrimary>
                  </div>
                  <div @click="descripteEvent()">
                      <buttonPrimary class="descriptionButton" v-bind:title="descriptionTitle" type="ellipse" v-bind:actived="descriptionColor" v-bind:class="{ event_disabled: descriptionFlag }">
                      </buttonPrimary>
                  </div>

                  <div class="conclusionClass" v-bind:class="{'conclusionImageForMobile': isMobile}" v-show="conclusionShowFlag">
                      <img src="./sub_static/conclusionImg.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                  </div>
                  <div class="descriptionClass" v-bind:class="{'descriptionImageForMobile': isMobile}" v-show="descriptionShowFlag">
                      <img src="./sub_static/descriptionImg.png" style="width: 100%; height: 100%"/>
                  </div>
              </template>
              <template slot="controlPanel" slot-scope="controlPanel">

              </template>
          </fullScreensLayout>

  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
import { ViewModel } from './ViewModel';
import Component from 'vue-class-component';
import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';

@Component({
  components: {
    fullScreensLayout,
    buttonPrimary
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_text{
        font-size: 24px;
        color: #000000;
        line-height: 24px;
        margin: 0;
        padding:0;
        width: 360px;
        position: absolute;
        top:24px;
        left:24px;
    }

    .conclusionButton {
        position: absolute;
        right: 24px;
        bottom: 85px;
    }

    .descriptionButton {
        position: absolute;
        right: 24px;
        bottom: 24px;
    }

    .conclusionClass {
        position: absolute;
        width: 293px;
        height: 224px;
        right: 121px;
        bottom: 85px;
    }

    .descriptionClass {
        position: absolute;
        width: 290px;
        height: 344px;
        right: 121px;
        bottom: 23px;
    }

    .conclusionImageForMobile {
        transform: scale(0.5);
        right: 30px;
        bottom: 40px;
    }

    .descriptionImageForMobile {
        transform: scale(0.5);
        right: 30px;
        bottom: -55px;
    }
</style>

