<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox" slot-scope="viewBox">
        <div id="title" class="title_text">{{title}}</div>
        <div class="content">
          <div
            class="content"
            id="box"
            :style="icon!=-1?'background: #737373;':'background:#B48C64'"
          >
            <div class="image" v-show="icon==-1">
              <img :src="bg" alt />
            </div>
            <div class="image" v-show="icon==1">
              <img :src="btnbg1" />
              <div v-show="icon==1" class="image_div icon1">
                <p class="image_h5">{{antQueen}}</p>
                <p class="image_p">{{antQueentext}}</p>
              </div>
            </div>
            <div class="image" v-show="icon==2">
              <img :src="btnbg2" />
              <div class="image_div icon2">
                <p class="image_h5">{{antKing}}</p>
                <p class="image_p">{{antKingtext}}</p>
              </div>
            </div>
            <div class="image" v-show="icon==3">
              <img :src="btnbg3" />
              <div class="image_div icon3" style="height:136px">
                <p class="image_h5">{{soldierAnt}}</p>
                <p class="image_p">{{soldierAnttext}}</p>
              </div>
            </div>
            <div class="image" v-show="icon==4">
              <img :src="btnbg4" />
              <div class="image_div icon4">
                <p class="image_h5">{{workenAnt}}</p>
                <p class="image_p">{{workenAnttext}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="btnbox">
          <button @click="getChange(1)" id="icon1" :class="icon==1?'clickbtn':''">{{antQueen}}</button>
          <br />
          <button @click="getChange(2)" id="icon2" :class="icon==2?'clickbtn':''">{{antKing}}</button>
          <br />
          <button @click="getChange(3)" id="icon3" :class="icon==3?'clickbtn':''">{{soldierAnt}}</button>
          <br />
          <button @click="getChange(4)" id="icon4" :class="icon==4?'clickbtn':''">{{workenAnt}}</button>
        </div>
      </template>
      <template slot="controlPanel" slot-scope="controlPanel">
        <div id="controlPanel"></div>
      </template>
    </fullScreensLayout>
  </div>
</template>

<script lang='ts'>
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

<style scoped='scoped'>
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
h5,
p {
  outline: none;
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
  color: #fff;
}

.content {
  width: 100%;
  height: 100%;
  background: #737373;
  background-size: cover;
  background-position: center center;
}

.image {
  width: 100%;
  height: auto;
  position: relative;
  background-size: cover;
  background-position: center center;
}
.image_div {
  width: 16.9vw;
  height: 13.8vw;
  position: absolute;
  color: #000000;
}
.icon1 {
  top: 15.8%;
  left: 65.9%;
}
.icon2 {
  top: 26.8%;
  left: 46.5%;
}
.icon3 {
  top: 46.4%;
  left: 41.7%;
}
.icon4 {
  top: 13.8%;
  left: 44%;
}

.image_p {
  width: 100%;
  font-size: 1.6vw;
  line-height: 2.3vw;
}
.image_h5 {
  width: 100%;
  line-height: 2.6vw;
  font-size: 2vw !important;
}
.btnbox {
  width: 74px;
  position: fixed;
  bottom: 2.2vw;
  right: 24px;
  z-index: 999;
}
.btnbox button {
  background: #fff;
  font-size: 16px;
  color: #000;
  border: 1px solid #ebebeb;
  border-radius: 21px;
  text-align: center;
  width: 74px;
  height: 38px;
  line-height: 38px;
  margin-bottom: 1.8vh;
  z-index: 2000;
  cursor: pointer;
}
.clickbtn {
  background: #0291ff !important;
  color: #fff !important;
}

.text {
  font-size: 1.2vw;
  color: #ffffff;
  position: absolute;
}
.text1 {
  top: 19%;
  left: -18%;
}
.text2 {
  top: 72%;
  left: -18%;
}
/*适配各种设备*/
@media (max-width: 667px) {
  .icon1 {
    width: 15vw;
    top: 13.8%;
    left: 67.3%;
  }
  .icon2 {
    width: 16.4vw;
    top: 26.6%;
    left: 47%;
  }
  .icon3 {
    width: 16.3vw;
    top: 44.2%;
    left: 42.1%;
  }
  .icon4 {
    width: 14.8vw;
    top: 11.8%;
    left: 45.3%;
  }
}
@media (max-width: 640px) {
  .icon1 {
    top: 17.3%;
    left: 65.9%;
    width: 16.5vw;
  }
  .icon2 {
    width: 16vw;
    top: 30.2%;
    left: 46.6%;
  }
  .icon3 {
    width: 15.7vw;
    top: 47%;
    left: 42%;
  }
  .icon4 {
    left: 44.5%;
    width: 15vw;
    top: 15%;
  }
}
</style>
