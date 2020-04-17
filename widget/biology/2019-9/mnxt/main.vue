<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox" slot-scope="viewBox">
        <div id="title" class="title_text">{{title}}</div>
        <div class="maxbox" :style="{zoom:zoom1}">
          <div :style="{'background-image': 'url(\'' +bg +'\')'}" class="box">
            <img src="./sub_static/UI/1.png" class="image" v-show="icon==-1" />
            <img src="./sub_static/UI/2.png" class="image" v-show="icon==1" />
            <img src="./sub_static/UI/3.png" class="image" v-show="icon==2" />
            <img src="./sub_static/UI/4.png" class="image" v-show="icon==3" />
            <img src="./sub_static/UI/5.png" class="image" v-show="icon==4" />
            <img src="./sub_static/UI/6.png" class="image" v-show="icon==5" />
            <img src="./sub_static/UI/7.png" class="image" v-show="icon==6" />
            <img src="./sub_static/UI/line.png" class="image" />
            <div class="image">
              <div class="btn btn2" @click="getChange(1)" :class="icon==1?'btnclick':''"></div>

              <div class="btn btn3" @click="getChange(2)" :class="icon==2?'btnclick':''"></div>

              <div class="btn btn4" @click="getChange(3)" :class="icon==3?'btnclick':''"></div>

              <div class="btn btn5" @click="getChange(4)" :class="icon==4?'btnclick':''"></div>

              <div class="btn btn6" @click="getChange(5)" :class="icon==5?'btnclick':''"></div>

              <div class="btn btn7" @click="getChange(6)" :class="icon==6?'btnclick':''"></div>

              <div class="textbox textboxleft textbtn1" v-show="icon==1">
                <h5>{{btn1}}</h5>
              </div>
              <div class="textbox textboxleft textbtn2" v-show="icon==2">
                <h5>{{btn2}}</h5>
                <p>{{btntext2}}</p>
              </div>
              <div class="textbox textboxleft textbtn3" v-show="icon==3">
                <h5>{{btn3}}</h5>
                <p>{{btntext3}}</p>
              </div>
              <div class="textbox textbtn4" v-show="icon==4">
                <h5>{{btn4}}</h5>
              </div>
              <div class="textbox textbtn5" v-show="icon==5">
                <h5>{{btn5}}</h5>
                <p>{{btntext5}}</p>
              </div>
              <div class="textbox textbtn6" v-show="icon==6">
                <h5>{{btn6}}</h5>
                <p>{{btntext6}}</p>
              </div>
            </div>
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
.maxbox {
  width: 100%;
  height: 100%;
}
.box {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  background-size: cover;
  background-position: center center;
}
.image {
  width: 656px;
  height: 465px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.btn {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #fff;
  cursor: pointer;
  /* z-index: 10; */
  position: absolute;
}
.btnclick {
  background: #ffc100;
}
.btn2 {
  left: 19.8%;
  top: 13.8%;
  cursor: pointer;
}
.btn3 {
      left: 4.4%;
  top: 31.8%;
}
.btn4 {
     left: 18.4%;
    top: 55.9%;
}
.btn5 {
  left: 70.1%;
  top: 11.8%;
}
.btn6 {
  left: 80.3%;
  top: 53.8%;
}
.btn7 {
  left: 73.7%;
  top: 74.4%;
}
.textbox {
  width: 170px;
  position: absolute;
  display: flex;
  flex-direction: column;
}
.textboxleft {
  align-items: flex-end;
}
.textbox h5 {
  font-family: SourceHanSansSC-Medium;
  font-size: 24px;
  color: #ffffff;
}
.textbox p {
  font-family: SourceHanSansSC-Medium;
  font-size: 14px;
  color: #ffffff;
}
.textbtn1 {
  right: 81%;
  top: 12%;
}
.textbtn2 {
  right: 97%;
  top: 30%;
}
.textbtn3 {
  right: 82.5%;
  top: 54%;
}
.textbtn4 {
  right: 2px;
  top: 47px;
}
.textbtn5 {
  right: -10.5%;
    top: 52%;
}
.textbtn6 {
      right: -3.5%;
    top: 73%;
}
/*适配各种设备*/
/* @media (max-height: 550px) {
  .btnbox button {
    transform: scale(0.7);
  }
} */
</style>
