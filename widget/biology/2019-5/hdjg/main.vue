<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox" slot-scope="viewBox">
        <div id="title" class="title_text">花的结构</div>
        <div class="content">
          <img src="./sub_static/UI/bg.png" class="image" v-show="icon==-1">
          <img src="./sub_static/UI/icon1.png" class="image" v-show="icon==1">
          <img src="./sub_static/UI/icon2.png" class="image" v-show="icon==2">
          <img src="./sub_static/UI/icon3.png" class="image" v-show="icon==3">
          <img src="./sub_static/UI/icon4.png" class="image" v-show="icon==4">
          <img src="./sub_static/UI/icon5.png" class="image icon5" v-show="icon==5">
          <img src="./sub_static/UI/icon6.png" class="image icon6" v-show="icon==6">
          <div class="btnbox">
            <button @click="getChange(1)" id="icon1" :class="icon==1?'clickbtn':""">花柄</button>
            <br>
            <button @click="getChange(2)" id="icon2" :class="icon==2?'clickbtn':""">花托</button>
            <br>
            <button @click="getChange(3)" id="icon3" :class="icon==3?'clickbtn':""">萼片</button>
            <br>
            <button @click="getChange(4)" id="icon4" :class="icon==4?'clickbtn':""">花瓣</button>
            <br>
            <button @click="getChange(5)" id="icon5" :class="icon==5?'clickbtn':""">雌蕊</button>
            <br>
            <button @click="getChange(6)" id="icon6" :class="icon==6?'clickbtn':""">雄蕊</button>
          </div>
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
import { MainVueComponent } from "./mainVueComponent";

@Component({
  components: {
    fullScreensLayout
  }
})
export default class App extends MainVueComponent {}
</script>

<style scoped="scoped">
* {
  margin: 0;
  padding: 0;
  touch-acion: none;
}
body {
  overflow: hidden !important;
  overflow-x: hidden;
  overflow-y: hidden;
}
img {
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.title_text {
  line-height: 24px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 9;
  font-size: 24px;
  text-align: justify;
  color: #000;
}

.content {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  background: #faf8e8;
}

.image {
  width: 33%;
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.icon5 {
    width: 37.3% !important;
    left: 47.9% !important;
    transform: translate(-50.2%, -50%) !important;
}
.icon6 {
   width: 34.6% !important;
    left: 49.2% !important;
}
.btnbox {
  width: 100px;
  position: fixed;
  top: 50%;
  right: 10px;
  transform: translate(-10px, -50%);
  z-index: 999;
}
.btnbox button {
  background: #fff;
  font-size: 16px;
  color: #000;
  border: 1px solid #ebebeb;
  border-radius: 21px;
  text-align: center;
  width: 88px;
  height: 38px;
  line-height: 38px;
  margin-bottom: 1.2vw;
  z-index: 2000;
  cursor: pointer;
}
.clickbtn {
  background: #0291ff !important;
  color: #fff !important;
}

/*适配各种设备*/

@media (max-height: 550px) {
  .btnbox button {
    transform: scale(0.7);
  }
}

@media (max-height: 400px) {
  .title_text {
    line-height: 18px;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 18px;
    left: 24px;
    z-index: 9;
    font-size: 18px;
  }
}
@media (max-width: 819px) {
  .btnbox {
    right: 0;
  }
  .btnbox button {
    margin-bottom: 0;
  }
}
@media (max-width: 730px) {
  .btnbox {
    top: 54%;
        transform: translate(0px, -46%);
  }
}
</style>
