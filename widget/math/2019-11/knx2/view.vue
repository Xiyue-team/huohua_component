<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox" >
        <div style="width: 100%; height: 100%; position: absolute; background-color: #B8B8B8">

          <div style="width: 100%; height: 82.2%; position: absolute; background-color: #5D9DA6">
            <span class="title_induction">{{lang.title}}</span>

            <div id="containers" style="position: relative; width: 100%; height: 100%;">
            </div>

            <div class="table_div">
              <table class="table_calss" style="border-inline: black;border: 3px solid #FFFFFF; text-align: center;">
                <tr style="border: 3px #FFFFFF solid">
                  <td style="border: 3px #FFFFFF solid">{{lang.text[0]}}</td>
                  <td style="border: 3px #FFFFFF solid">{{lang.text[1]}}</td>
                </tr>
                <tr style="border: 3px #FFFFFF solid">
                  <td id="twoblackball" style="border: 3px #FFFFFF solid">{{lang.text[2]}}</td>
                  <td id="redballtime" style="border: 3px #FFFFFF solid">0</td>
                </tr>
                <tr style="border: 3px #FFFFFF solid">
                  <td id="oneredanblackball" style="border: 3px #FFFFFF solid">{{lang.text[3]}}</td>
                  <td id="blackballtime" style="border: 3px #FFFFFF solid">0</td>
                </tr>
              </table>
            </div>

            <!--抓取一次-->
            <div class="buttonStyle1" id="buttonStyle1-div"  @click="buttonClickEvent1" hidden="hidden" v-bind:class="{ 'event_disabled': buttonStyle1one}">
              <i_button id="btn1" class="button btncacheone" disabled="disabled"  style="font-size: 16px; width: 100%; height: 100%"  :title="lang.button[0]"
                        v-bind:isActive.sync="isActive1" v-bind:clickNumber.sync="clickNumber1">
              </i_button>
            </div>
            <!--抓取100次-->
            <div  class="buttonStyle2" id="buttonStyle2-div"  @click="buttonClickEvent2" hidden="hidden" v-bind:class="{ 'event_disabled': buttonStyle2one}">
              <i_button id="btn2"  class="button btncachehjundred" disabled="disabled"  style="font-size: 16px; width: 100%; height: 100%"   :title="lang.button[1]"
                        v-bind:isActive.sync="isActive2" v-bind:clickNumber.sync="clickNumber2">
              </i_button>
            </div>

            <!--抓取1个-->
            <div class="buttonStyle3"  @click="buttonClickEvent3" v-bind:class="{ 'event_disabled': buttonStyle3one}">
              <i_button id="btn3" class="button1" style="width: 100%; height: 100%"  :title="lang.button[2]"
                        v-bind:isActive.sync="isActive3" v-bind:clickNumber.sync="clickNumber3">
              </i_button>
            </div>
            <!--抓取2个-->
            <div class="buttonStyle4"  @click="buttonClickEvent4" v-bind:class="{ 'event_disabled': buttonStyle4one}">
              <i_button id="btn4" class="button1" style="width: 100%;height: 100%"  :title="lang.button[3]"
                        v-bind:isActive.sync="isActive4" v-bind:clickNumber.sync="clickNumber4">
              </i_button>
            </div>

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
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'
import i_button from "./buttonInXAxis.vue";

@Component({
  components: {
    fullScreens_layout,
    i_button,

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
    width: 98px;
    height: 42px;
    top: 77.6%;
    right: 2.7%;
  }
  .buttonStyle2 {
    position: absolute;
    width: 116px;
    height: 42px;
    top: 87.4%;
    right: 2.7%;
  }
  .buttonStyle3 {
    position: absolute;
    width: 98px;
    height: 42px;
    top: 53.6%;
    right: 2.7%;
  }
  .buttonStyle4 {
    position: absolute;
    width: 98px;
    height: 42px;
    top: 63.4% ;
    right: 2.7%;
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
    border-radius: 4px;
    font-family: SourceHanSansSC-Medium;
    color: #FFFFFF;
    width: 100%;
    height: 100%;
  }
  #btn1 {
    width: 100%;
    height: 100%;
  }
  #btn2 {
    width: 100%;
    height: 100%;
  }
  #btn3 {
    width: 100%;
    height: 100%;
  }
  #btn4 {
    width: 100%;
    height: 100%;
  }
  /*鼠标点击不松的样式*/
  .button:focus{
    background: #179DF5;
    color: #FFFFFF;
  }

  .button.active {
    background: #179DF5;
    color: #FFFFFF;
  }

  .btncacheone:focus {
    background: #FFFFFF;
    color: black;
  }
  /*.btncacheone:active {*/
  /*  background: #179DF5;*/
  /*  color: #FFFFFF;*/
  /*}*/
  .btncacheone.active {
    background: #179DF5;
    color: #FFFFFF;
  }

  .btncachehjundred:focus {
    background: #179DF5;
  }
  .btncachehjundred:active {
    background: #179DF5;
    color: #FFFFFF;
  }

  #containers{
    /*padding-top: 80%;*/
    /*padding-left: 36.7%;*/
    /*background-color: #5D9DA6;*/
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
      position: absolute;
      width: 98px;
      height: 42px;
      top: 77.6%;
      right: 2.7%;
    }
    .buttonStyle2 {
      position: absolute;
      width: 116px;
      height: 42px;
      top: 87.4%;
      right: 2.55%;
    }
    .buttonStyle3 {
      position: absolute;
      width: 98px;
      height: 42px;
      top: 53.6%;
      right: 2.7%;
    }
    .buttonStyle4 {
      position: absolute;
      width: 98px;
      height: 42px;
      top: 63.4% ;
      right: 2.7%;
    }
  }
  @media screen and (max-width: 1450px) {
    .table_div {
      left: 5.5%;
      transform: scale(0.75);
    }
    .buttonStyle1 {
      transform: scale(0.86);
    }
    .buttonStyle2 {
      transform: scale(0.86);
      right: 2.6%;
    }
    .buttonStyle3 {
      right: 2.6%;
      transform: scale(0.86);
    }
    .buttonStyle4 {
      transform: scale(0.86);
    }
  }
  @media screen and (max-width: 1200px) {

    .table_div {
      top: 32%;
      left: 3.5%;
      transform: scale(0.62);
    }

    .buttonStyle1 {
      transform: scale(0.71);
    }
    .buttonStyle2 {
      transform: scale(0.71);
      right: 2.45%;
    }
    .buttonStyle3 {

      transform: scale(0.71);
    }
    .buttonStyle4 {
      transform: scale(0.71);
      right: 2.6%;
    }
  }
  @media screen and (max-width: 950px) {

    .table_div {
      left: -2%;
      top: 28%;
      transform: scale(0.47);
    }

    .buttonStyle1 {
      top: 75%;
      transform: scale(0.56);
      /*right: 2.5%;*/
    }
    .buttonStyle2 {
      top: 84%;
      transform: scale(0.56);
      right: 2.2%;
    }
    .buttonStyle3 {
      top: 54%;
      transform: scale(0.56);
    }
    .buttonStyle4 {
      top: 63%;
      transform: scale(0.56);
      right: 2.7%;
    }
  }
  @media screen and (max-width: 700px) {
    .table_div {
      left: -8%;
      top: 22%;
      transform: scale(0.35);
    }
    .buttonStyle1 {
      transform: scale(0.44);
      right: 2.6%;
      top: 72%;
    }
    .buttonStyle2 {
      transform: scale(0.44);
      right: 1.5%;
      top: 81%;
    }
    .buttonStyle3 {
      top: 51%;
      transform: scale(0.44);
    }
    .buttonStyle4 {
      top: 60%;
      transform: scale(0.44);
    }
  }

  @media screen and (max-width: 550px) {
    .table_div {
      top: 14%;
      left: -15%;
      transform: scale(0.28);
    }
    .buttonStyle1 {
      transform: scale(0.34);
    }
    .buttonStyle2 {
      transform: scale(0.34);
      right: 1.2%;
    }
    .buttonStyle3 {

      transform: scale(0.34);
    }
    .buttonStyle4 {
      transform: scale(0.34);
    }
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
