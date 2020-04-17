<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <div style="width: 100%; height: 100%; position: absolute; background-color: #B8B8B8">
          <div style="width: 100%; height: 82.2%; position: absolute; background-color: #5D9DA6">
            <span class="title_induction">{{lang.title}}</span>
            <div id="containers" style="position: absolute; width: 100%; height: 100%;">
            </div>
            <div class="table_div" >
              <table class="table_calss" style=" border: 3px solid #FFFFFF; text-align: center;">
                <tr style="border: 3px #FFFFFF solid">
                  <td style="border: 3px #FFFFFF solid" >{{lang.text[0]}}</td>
                  <td style="border: 3px #FFFFFF solid" >{{lang.text[1]}}</td>
                </tr>
                <tr style="border: 3px #FFFFFF solid">
                  <td style="border: 3px #FFFFFF solid" >{{lang.text[2]}}</td>
                  <td id="redballtime" style="border: 3px #FFFFFF solid">0</td>
                </tr>
                <tr style="border: 3px #FFFFFF solid">
                  <td style="border: 3px #FFFFFF solid" >{{lang.text[3]}}</td>
                  <td id="blackballtime" style="border: 3px #FFFFFF solid">0</td>
                </tr>
              </table>
            </div>

          </div>

          <div class="buttonStyle1" @click="buttonClickEvent1" v-bind:class="{ 'event_disabled': btn1isDisable}">
            <buttonPrimary id="" v-bind:title="lang.button[0]" type="ellipse" v-bind:actived="third_stepColor"></buttonPrimary>
          </div>
          <div class="buttonStyle2" @click="buttonClickEvent2" v-bind:class="{ 'event_disabled': btn2isDisable}">
            <buttonPrimary v-bind:title="lang.button[1]" type="ellipse" v-bind:actived="thirds_stepColor"></buttonPrimary>
          </div>
        </div>
      </template>
    </fullScreens_layout>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreens_layout from '../../../../src/component/layout/fullScreens_layout.vue';
import { ViewModel } from './ViewModel';
import Component from 'vue-class-component';
import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';

@Component({
  components: {
    fullScreens_layout,
    buttonPrimary
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
  .title_induction{
    width: 100%;
    font-family: SourceHanSansSC-Medium;
    font-size: 28px;
    color: #FFFFFF;
    line-height: 28px;
    position: absolute;
    left: 32px;
    top: 32px;
    z-index: 99;
  }
  .buttonStyle1 {
    position: absolute;
    top: 63.6%;
    right: 24px;
  }
  .buttonStyle2 {
    position: absolute;
    top: 72.4%;
    right: 24px;
  }

  .table_div {
    position: absolute;
    width: 344.6px;
    height: 224px;
    top: 38.4%;
    left: 8.3%;
    font-size: 20px;
  }

  .table_calss{
    position: absolute;
    border-radius: 4px;
    font-family: SourceHanSansSC-Medium;
    color: #FFFFFF;
    width: 100%;
    height: 100%;
  }

  .button-primary {
    border: none !important;
  }

  @media screen and (max-width: 1700px) {
    .table_div {
      position: absolute;
      width: 344.6px;
      height: 224px;
      top: 38.4%;
      left: 8.3%;
      font-size: 20px;
    }
    .buttonStyle1 {
      transform: scale(1);
    }
    .buttonStyle2 {
      transform: scale(1);
    }
  }

  @media screen and (max-width: 1450px) {
    .table_div {
      top: 35%;
      left: 5.5%;
      transform: scale(0.75);
    }
    .buttonStyle1 {
      top: 63%;
      transform: scale(0.95);
    }
    .buttonStyle2 {
      transform: scale(0.95);
    }
  }

  @media screen and (max-width: 1200px) {
    .table_div {
      top: 32%;
      left: 3.5%;
      transform: scale(0.62);
    }
    .buttonStyle1 {
      top: 62%;
      transform: scale(0.85);
    }
    .buttonStyle2 {
      transform: scale(0.85);
    }
  }

    @media screen and (max-width: 950px) {
      .table_div {
        left: -2%;
        top: 28%;
        transform: scale(0.47);
      }
      .buttonStyle1 {
        transform: scale(0.75);
      }
      .buttonStyle2 {
        right: 20px;
        transform: scale(0.75);
      }
    }

    @media screen and (max-width: 700px) {
      .table_div {
        left: -8%;
        top: 22%;
        transform: scale(0.35);
      }
      .buttonStyle1 {
        transform: scale(0.65);
      }
      .buttonStyle2 {
        transform: scale(0.65);
      }
    }

    @media screen and (max-width: 550px) {
      .table_div {
        top: 14%;
        left: -15%;
        transform: scale(0.28);
      }
      .buttonStyle1 {
        transform: scale(0.55);
      }
      .buttonStyle2 {
        transform: scale(0.55);
      }
    }

  #containers{
    /*padding-top: 80%;*/
    /*padding-left: 36.7%;*/
  }
</style>

<style>
  #reset {
    z-index: 99;
  }
  canvas {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
</style>
