<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox" slot-scope="viewBox">
        <span id="title" class="title_text">{{title}}</span>
        <transition name="fade">
          <div style="">
            <button class="circle btn1">{{pos}}</button>
              
              <div class="box" id="boxes">
                <div id="maodian" style="position:absolute;top:0"></div>
                <img src="./sub_static/UI/1.png" width="90%" />
                <div class="sliderBox red">
                  <div class="textTip text">r</div>
                  <vue-slider class="vueSlider" v-model="value1" v-bind="sliderOption1"></vue-slider>
                </div>
                <div class="textbox">
                  <span class="text">d=</span>
                  <button>{{dis}}</button>
                </div>
                <button
                  class="circle btn2"
                  @click="handerClick"
                  :class="icon===true?'btn2click':''"
                >{{buttonBox}}</button>
                <div class="jsBox" id="jsBox">
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
                <!-- <img src="./sub_static/UI/2.png" width="90%" /> -->
              </div>
          </div>
        </transition>
        <div style="width: 100%; height: 100%; display: flex;background: rgba(81,81,81,0.50);">
          <div id="3dContainer" style="margin: auto;width: 100%;height: 100%"></div>
        </div>
      </template>
      <template slot="controlPanel" slot-scope="controlPanel">
        <div id="controlPanel"></div>
      </template>
    </fullScreensLayout>
  </div>
</template>
<script lang="ts">
import "../../../../src/assets/css/core.css";
import "../../../../src/assets/css/layout.css";
import fullScreensLayout from "../../../../src/component/layout/fullScreens_layout.vue";
import Component from "vue-class-component";
import { MainVueComponent } from "./mainVueComponent.ts";
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
<style scoped="scoped">
body {
  overflow: hidden !important;
  overflow-x: hidden;
  overflow-y: hidden;
}
/* .root_div_container {
  background: rgba(81, 81, 81, 0.5) !important;
}
.view_div_content{
  background: rgba(81, 81, 81, 0.5) !important;
} */
.title_text {
  font-size: 24px;
  color: #fff;
  line-height: 24px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 100;
}

.text_style {
  font-style: italic;
  font-family: Times New Roman !important;
}
.box {
  position: absolute;
  width: 300px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden; 
  right: 10px;
}
.box img {
  margin-top: 72px;
}
.circle {
  position: absolute;

  width: 88px;
  height: 42px;
  font-size: 20px;
  color: #fff;
  background: rgba(81, 81, 81, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}
.btn1 {
  top: 62px;
  left: 32px;
}
.btn2 {
  background: #ebebeb;
  border-radius: 32px;
  color: #525252;
  left: 0;
  margin-top: 20px;
  position: initial;
}
.btn2click {
  background: #0291ff;
  color: #fff;
}
.sliderBox {
  width: 100%;
  height: 50px !important;
  margin-top: 35px;
  z-index: 99;
}
.text {
  font-family: TimesNewRomanPS-ItalicMT;
  font-size: 24px;
  color: #ffffff;
  line-height: 50px;
  float: left;
}
.sliderBox .textTiptextTip {
  width: 20px;
  font-size: 1.1vw;
  margin: auto;
  font-style: italic;
  line-height: 50px;
  color: #fff;
  font-family: TimesNewRomanPS-ItalicMT;
  float: left;
  padding-left: 15px;
}
.sliderBox .vueSlider {
  display: inline-block;
  width: 130px !important;
  height: 2px;
}
.textbox span {
  font-family: TimesNewRomanPS-ItalicMT;
  font-size: 24px;
  color: #ffffff;
  line-height: 44px;
}

.textbox button {
  width: 80px;
  text-align: center;
  margin-left: 12px;
  padding: 7px 14px;
  font-size: 20px;
  color: #fff;
  background: rgba(81, 81, 81, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}
.jsBox {
  /* width: 306px; */
  width: 100%;
  height: 170px;
  position: absolute;
  margin-top: 10px;
  opacity: 0;
  /* top: 71%;
    right: 5%; */
}
.jsBox > table {
  width: 100%;
  height: 100%;
}
.jsBox > tr,
td {
  font-size: 16px;
  color: #fff;
  text-align: center;
  border: 2px solid white;
}
@media (max-width: 818px) {
  .btn1 {
    /*transform: scale(0.7) translate(-24%, -47%);*/
  }
  .box {
    width: 200px;
  }
  .box img {

    width: 100%;
  }
  .textbox {
    /*transform: scale(0.7) translate(-24%, -47%);*/
  }
  .btn2 {
    /*transform: scale(0.7) translate(-24%, -47%);*/
    margin-top: 20px;
  }
  .jsBox{
        /*transform: scale(0.7) translate(-24%, -29%);*/
    width: 100%;
  }
  .sliderBox{
    margin-top: 18px;
  }
  .text{
     /*transform: scale(0.7) */
  }
}
@media (max-width: 1280px) {
  
}
</style>
