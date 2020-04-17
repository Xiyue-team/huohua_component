<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">{{title}}</div>
                  <div id="3dContainer"></div>
                  <img src="./sub_static/gongshi.png" v-show="isShow" alt="" style="width: 124px;position: absolute; top: 100px;left: 160px">
                  <div class="imageSize" v-show="!isShow">
                      <img class="axisImage" src="./sub_static/null.png" alt="" v-show="!((k1Actived && b1Actived) || (k1Actived && b2Actived) || (k1Actived && b3Actived)
                       || (k2Actived && b1Actived) || (k2Actived && b2Actived) || (k2Actived && b3Actived) || (k3Actived && b1Actived) || (k3Actived && b2Actived) ||
                       (k3Actived && b3Actived))">
                      <img class="axisImage" src="./sub_static/k1b1.png" alt="" v-show="k1Actived && b1Actived">
                      <img class="axisImage" src="./sub_static/k1b2.png" alt="" v-show="k1Actived && b2Actived">
                      <img class="axisImage" src="./sub_static/k1b3.png" alt="" v-show="k1Actived && b3Actived">
                      <img class="axisImage" src="./sub_static/k2b1.png" alt="" v-show="k2Actived && b1Actived">
                      <img class="axisImage" src="./sub_static/k2b2.png" alt="" v-show="k2Actived && b2Actived">
                      <img class="axisImage" src="./sub_static/k2b3.png" alt="" v-show="k2Actived && b3Actived">
                      <img class="axisImage" src="./sub_static/k3b1.png" alt="" v-show="k3Actived && b1Actived">
                      <img class="axisImage" src="./sub_static/k3b2.png" alt="" v-show="k3Actived && b2Actived">
                      <img class="axisImage" src="./sub_static/k3b3.png" alt="" v-show="k3Actived && b3Actived">

                  </div>
                  <div class="selectButtonStyle">
                      <switch2 style="margin: auto" v-bind="switchOption" v-model="switchModel"></switch2>
                  </div>
                  <div style="width: 76px;height: 130px;position: absolute;top: calc(51.7% - 65px); right: 40px" v-show="isShow">
                      <buttonPrimary style="width: 76px; height: 42px;" v-bind:title="moveButton" type="ellipse" v-bind:actived="moveActived" @click.native="moveButtonEvent()"></buttonPrimary>
                      <div style="width: 76px;height: 68px;margin-top: 20px">
                          <div class="textStyle" id="k">
                              k > 0
                          </div>
                          <div class="textStyle" id="b" style="margin-top: 10px">
                              b > 0
                          </div>
                      </div>
                  </div>
                  <div style="width: 100px;height: 358px;position: absolute; top: 39.6%; right: 40px" v-show="!isShow">
                      <div class="buttonPlaneSize">
                          <buttonPrimary class='buttonSize' v-bind:title="buttonTitle[0]" type="ellipse" v-bind:actived="k1Actived" @click.native="k1button()"></buttonPrimary>
                          <buttonPrimary class='buttonSize buttonStyle' v-bind:title="buttonTitle[1]" type="ellipse" v-bind:actived="k2Actived" @click.native="k2button()"></buttonPrimary>
                          <buttonPrimary class='buttonSize buttonStyle' v-bind:title="buttonTitle[2]" type="ellipse" v-bind:actived="k3Actived" @click.native="k3button()"></buttonPrimary>
                      </div>
                      <div class="buttonPlaneSize" style="margin-top: 50px">
                          <buttonPrimary class='buttonSize' v-bind:title="buttonTitle[3]" type="ellipse" v-bind:actived="b1Actived" @click.native="b1button()"></buttonPrimary>
                          <buttonPrimary class='buttonSize buttonStyle' v-bind:title="buttonTitle[4]" type="ellipse" v-bind:actived="b2Actived" @click.native="b2button()"></buttonPrimary>
                          <buttonPrimary class='buttonSize buttonStyle' v-bind:title="buttonTitle[5]" type="ellipse" v-bind:actived="b3Actived" @click.native="b3button()"></buttonPrimary>
                      </div>
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
import switch2 from '../../../../src/component/ui/switch2.vue';
import Component from 'vue-class-component';
import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';

@Component({
  components: {
    fullScreensLayout, switch2, buttonPrimary
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_text{
        font-size: 24px;
        color: #ffffff;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }

    .selectButtonStyle {
        width: 400px;
        height: 44px;
        position: absolute;
        left: calc(50% - 200px);
        top: 30px;
        display: flex;
    }

    .textStyle {
        font-size: 20px;
        color: #FFFFFF;
        text-align: center;
    }

    .buttonStyle {
        margin-top: 14px;
    }

    .buttonSize {
        width: 100px;
        height: 42px;
    }

    .buttonPlaneSize {
        width: 100px;
        height: 154px;
    }
    .imageSize {
        width: 600px;
        height: 600px;
        position: absolute;
        top: calc(50% - 300px);
        left: calc(50% - 300px);
    }
    .axisImage {
        width: 600px;
        height: 600px;
    }
</style>
<style>

</style>
