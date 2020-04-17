<template>
  <div
    class="aspectration bg_white root_div_container"
    data-ratio="16:9"
  >
    <fullScreensLayout>
      <template
        slot="viewBox"
        slot-scope="viewBox"
      >
        <div
          style="width: 100%; height: 100%;"
          class="box"
        >
          <div
            id="3dContainer"
            style="margin: auto;width: 100%;height: 100%"
          >
          </div>
        </div>
        <span
          id="title"
          class="title_text"
        >{{title}}</span>

        <div
          class="textTishi"
          v-text="text"
        ></div>
        <div
          class="mf_container"
          id="mf_container"
        >
          <!-- <div id="maodian" style="position:absolute;top:0"></div> -->
          <img
            class="gsBox"
            src="./sub_static/gs.png"
          >
          <div
            class="sliderBox0 min"
            style="margin-top: 40px;"
          >
            <img src="./sub_static/r.png">
            <vue-slider
              class="vueSlider"
              v-model="value"
              v-bind="sliderOption0"
            ></vue-slider>
          </div>
          <div class="sliderBox1 min">
            <img src="./sub_static/Ai.png">
            <vue-slider
              class="vueSlider"
              v-model="value1"
              v-bind="sliderOption1"
            ></vue-slider>
          </div>
          <div class="sliderBox2 min">
            <img src="./sub_static/Bi.png">
            <vue-slider
              class="vueSlider"
              v-model="value2"
              v-bind="sliderOption2"
            ></vue-slider>
          </div>
          <div class="sliderBox3 min">
            <img src="./sub_static/Ci.png">
            <vue-slider
              class="vueSlider"
              v-model="value3"
              v-bind="sliderOption3"
            ></vue-slider>
          </div>
          <div>
            <div
              class="disBox"
              style="display: inline-block;"
            >
              <img src="./sub_static/d.png">
            </div>
            <div
              class="disValue"
              v-text="disVlaue"
              style="display: inline-block;"
            ></div>
          </div>

          <button
            :class="{jlBox: true, changBlue: isHave}"
            @click="changeButton()"
            style="margin-top: 20px"
          >{{buttonBox}}</button>
          <!-- <div class="jsBox2" id="jsBox2" style="width: 100%; visibility: hidden"> -->
          <div
            class="jsBox2"
            v-show="isHave"
            id="jsBox2"
            style="width: 100%;"
          >
            <table border="1">
              <tr>
                <td>{{textBox[0]}}</td>
                <td>{{textBox[1]}}</td>
              </tr>
              <tr>
                <td>{{textBox[2]}}</td>
                <td>{{textBox[3]}}</td>
              </tr>
              <tr>
                <td>{{textBox[4]}}</td>
                <td>{{textBox[5]}}</td>
              </tr>
              <tr>
                <td>{{textBox[6]}}</td>
                <td>{{textBox[7]}}</td>
              </tr>
            </table>
          </div>
        </div>
      </template>
    </fullScreensLayout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import "../../../../src/assets/css/core.css";
import "../../../../src/assets/css/layout.css";
import fullScreensLayout from "../../../../src/component/layout/fullScreens_layout.vue";
import Component from "vue-class-component";
import { MainVueComponent } from "./mainVueComponent";
import vueSlider from "vue-slider-component/dist-css/vue-slider-component.common.js";
import "vue-slider-component/dist-css/vue-slider-component.css";
import "vue-slider-component/theme/default.css";
@Component({
  components: {
    fullScreensLayout,
    vueSlider
  }
})
export default class App extends MainVueComponent {}
</script>

<style>
@media (max-width: 1100px) {
  .mf_container {
    right: 5px !important;
    width: 190px !important;
  }
  .gsBox {
    margin-top: 90px !important;
  }
}

@media (min-width: 800px) {
  .jsBox2 {
    height: 180px;
  }
}
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
.view_div_content {
  position: relative;
}
.mf_container {
  position: absolute;
  right: 100px;
  top: 0;
  height: 100%;
  width: 200px;
  overflow: hidden;
  overflow-y: auto;
  padding-bottom: 15px;
}

.title_text {
  font-family: PingFangSC-Medium;
  font-size: 24px;
  color: #fff;
  line-height: 24px;
  line-height: 24px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 9;
}
.textTishi {
  width: 88px;
  height: 42px;
  position: absolute;
  top: 72px;
  left: 24px;
  background: rgba(81, 81, 81, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  font-family: SourceHanSansSC-Normal;
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  line-height: 42px;
  z-index: 9;
}
.gsBox {
  width: 100%;
  margin-top: 120px;
  /* position: absolute;*/
  /*top: 10%;
    right: 100px;*/
  /*z-index: 100;*/
}
.disBox {
  width: 32.5px;
  height: 19.5px;
  /*position: absolute;*/
  font-size: 20px;
  color: #ffffff;
  font-family: TimesNewRomanPSMT;
  text-align: right;
  z-index: 9;
}
.disBox > img {
  width: 100%;
  height: 100%;
}
.disValue {
  width: 56px;
  height: 36px;
  /*position: absolute;*/
  font-size: 20px;
  color: #ffffff;
  background: rgba(81, 81, 81, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  text-align: center;
  line-height: 36px;
}
button {
  width: 88px;
  height: 42px;
  /*position: absolute;
    top: 65%;
    right: 15vw;*/
  background: #ebebeb;
  border-radius: 21px;
  margin-top: 20px;
  font-family: SourceHanSansSC-Medium;
  font-size: 16px;
  color: #525252;
  text-align: center;
}
.changBlue {
  background-color: #0291ff !important;
  color: #ffffff !important;
}
.jsBox {
  width: 293px;
  height: 170px;
  margin-top: 15px;
}
.jsBox2 {
  margin-bottom: 15px !important;
}
.jsBox2 > table {
  width: 100%;
  height: 100%;
  margin-top: 10px;
}
.control-panel_div_content {
  display: block !important;
  float: none;
  /*background: blue;*/
}
.jsBox2 > tr,
td {
  font-size: 16px;
  color: #fff;
  text-align: center;
  border: 2px solid white;
}
div > #3dContainer {
  position: absolute !important;
  left: 0 !important;
  top: -195px !important;
}
.sliderBox0,
.sliderBox1,
.sliderBox2,
.sliderBox3 {
  /* position: absolute;*/
  width: 100% !important;
  height: 50px !important;
  /*top: 20%;
    right: 8vw;*/
  margin-top: 25px;
  z-index: 9;
}
.min > img {
  width: 16px;
  height: 17px;
  /*  position: absolute;
    top: 34%;
    left: 0;*/
}
.min > .vueSlider {
  /*position: absolute;*/
  display: inline-block;
  width: calc(100% - 50px) !important;
  padding: 7px 0 !important;
  margin-left: 15px;
  /* margin-left: 20px;*/
  /* top: 0;
    right: 0;
    bottom: 0;
    margin: auto;*/
}
.sliderBox1 {
}
.sliderBox2 {
}
.sliderBox3 {
}
.buttonBox {
  width: 73px;
  height: 114px;
  position: absolute;
  top: 60%;
  right: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}
.diad {
  width: 73px;
  height: 42px;
  display: flex;
  background: #ebebeb;
  color: #000;
  border-radius: 25px;
  font-size: 16px;
  justify-content: center;
  z-index: 9;
}
.changeBule {
  background: #0091ff;
  color: #fff;
}
.axImg {
  height: 36px;
  position: absolute;
  top: 25%;
  right: 10%;
}
.logImg {
  top: 32%;
  right: 8.8%;
}
@media (max-width: 1000px) {
  /*.sliderBox0 {
    margin-top: 10px;
}
.sliderBox1{
    margin-top: 20px;
}
.sliderBox2{
    margin-top: 30px;
}
.sliderBox3{
    margin-top: 40px;
}
.gsBox{
    right: 150px;
}*/
}
</style>
