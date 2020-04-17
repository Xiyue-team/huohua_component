<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div id="3dContainer"></div>
                  <div class="mainContainer">
                      <div class="positionContainer">
                          <div id="mainContainer">
                              <canvas id="storyCanvas" style="transform-origin: center"></canvas>
                          </div>
                          <div class="rightContainer" style="transform-origin: left top;" v-bind:class="{pcStyle: isPC}">
                              <div class="selectContainer">
                                  <toggle-button
                                          :color   = "switchColor"
                                          :sync   = "true"
                                          :labels = "switchLable"
                                          v-model = "switchValue"
                                          :width   = switchSize.width
                                          :height  = switchSize.height
                                          style   = "font-size: 16px"
                                  />
                                  <buttonPrimary class="smallButtonStyle" v-bind:title="buttonTitle[2]" type="ellipse" v-bind:actived="buttonActived[4].active" @click.native="buttonEvent5" v-show="buttonActived[3].active"></buttonPrimary>
                                  <buttonPrimary class="buttonStyle" v-bind:title="buttonTitle[3]" type="ellipse" v-bind:actived="buttonActived[3].active" @click.native="buttonEvent4"></buttonPrimary>
                                  <buttonPrimary class="smallButtonStyle" v-bind:title="buttonTitle[2]" type="ellipse" v-bind:actived="buttonActived[1].active" @click.native="buttonEvent2" v-show="buttonActived[0].active"></buttonPrimary>
                                  <buttonPrimary class="smallButtonStyle" v-bind:title="buttonTitle[1]" type="ellipse" v-bind:actived="buttonActived[2].active" @click.native="buttonEvent3" v-show="buttonActived[0].active"></buttonPrimary>
                                  <buttonPrimary class="buttonStyle" v-bind:title="buttonTitle[0]" type="ellipse" v-bind:actived="buttonActived[0].active" @click.native="buttonEvent1"></buttonPrimary>

                              </div>
                              <div class="textContainer" v-show="buttonActived[4].active || buttonActived[2].active || buttonActived[1].active">{{text}}</div>
                          </div>
                      </div>
                  </div>

                  <div class="title_text">{{title}}</div>
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
import buttonPrimary from '../../../../src/component/ui/buttonPrimary';
import { ToggleButton } from 'vue-js-toggle-button'

@Component({
  components: {
    fullScreensLayout,
    buttonPrimary,
    ToggleButton
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
        position: absolute;
        top:24px;
        left:24px;
    }
    .selectContainer{
        width: 120px;
        height: 260px;
        margin-left: 146px;
        margin-top: 102px;
        display: flex;
        flex-direction: column-reverse;

    }
     .pcStyle {
         margin-top: 168px;
     }

    .buttonStyle {
        width: 120px;
        margin-bottom: 12px;
    }

    .smallButtonStyle {
        width: 94px;
        font-size: 14px;
        /*height: 42px;*/
        margin-left: 13px;
        margin-bottom: 12px;
    }

    .mainContainer {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transform-origin: center;
    }

    .positionContainer{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap
    }
    .rightContainer {
        height: 592px;
        display: flex;
        flex-direction: column-reverse;
        flex-wrap: nowrap;
        margin-left: 32px;
    }
    .textContainer {
        width: 266px;
        height: 184px;
        background: #FFFFFF;
        border: 1px solid rgba(0,0,0,0.06);
        box-shadow: 0 6px 14px 0 rgba(0,0,0,0.06);
        border-radius: 9px;
        border-radius: 9px;
        font-size: 24px;
        color: #333333;
        line-height: 36px;
        padding: 20px;
        box-sizing: border-box;
    }
</style>
<style>
    .option_math_div div:hover{
        cursor: pointer;
        background-color: #0199FF;
        color: #FFFFFF;
    }
    .v-right {
        color: #525252!important;
        right: 24px!important;
    }
    .v-left {
        left: 24px!important;
    }

</style>
