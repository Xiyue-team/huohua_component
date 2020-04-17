<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox" slot-scope="viewBox">
        <div id="title" class="title_text">{{title}}</div>
        <div class="maxbox" :style="{zoom:zoom1}">
          <div :style="{'background-image': 'url(\'' +bg +'\')'}" class="box">
            <img src="./sub_static/UI/1.png" class="image" v-show="icon==-1" />
            <img src="./sub_static/UI/1_1.png" class="image" v-show="icon==7" />
            <img src="./sub_static/UI/2.png" class="image" v-show="icon==1" />
            <img src="./sub_static/UI/4.png" class="image" v-show="icon==2" />
            <img src="./sub_static/UI/6.png" class="image" v-show="icon==3" />
            <img src="./sub_static/UI/7.png" class="image" v-show="icon==4" />
            <img src="./sub_static/UI/3.png" class="image" v-show="icon==5" />
            <img src="./sub_static/UI/5.png" class="image" v-show="icon==6" />
            <img src="./sub_static/UI/line.png" class="image" />
            <div class="image">
              <img src="./sub_static/UI/8_1.png" class="image luancao" v-show="icon==-1" />
              <img src="./sub_static/UI/8_2.png" class="image luancao" v-if="icon>=1&&icon<=6" />
              <img src="./sub_static/UI/8_3.png" class="image luancao" v-show="icon==7" />
              <img src="./sub_static/UI/line2.png" class="image luancao" />
            </div>

            <div class="image">
              <div class="btn btn1" @click="getChange(1)" :class="icon==1?'btnclick':''"></div>
              <div class="btn btn2" @click="getChange(2)" :class="icon==2?'btnclick':''"></div>
              <div class="btn btn3" @click="getChange(3)" :class="icon==3?'btnclick':''"></div>
              <div class="btn btn4" @click="getChange(4)" :class="icon==4?'btnclick':''"></div>
              <div class="btn btn5" @click="getChange(5)" :class="icon==5?'btnclick':''"></div>
              <div class="btn btn6" @click="getChange(6)" :class="icon==6?'btnclick':''"></div>
              <div class="btn btn7" @click="getChange(7)" :class="icon==7?'btnclick':''"></div>
              <div class="textbox textboxleft textbtn1" v-show="icon==1">
                <h5>{{btn1}}</h5>
                <p>{{btntext1}}</p>
              </div>
              <div class="textbox textboxleft textbtn2" v-show="icon==2">
                <h5>{{btn2}}</h5>
                <p>{{btntext2}}</p>
              </div>
              <div class="textbox textboxleft textbtn3" v-show="icon==3">
                <h5>{{btn3}}</h5>
                <p>{{btntext3}}</p>
              </div>
              <div class="textbox textboxleft textbtn4" v-show="icon==4">
                <h5>{{btn4}}</h5>
                <p>{{btntext4}}</p>
              </div>
              <div class="textbox textbtn5" v-show="icon==5">
                <h5>{{btn5}}</h5>
                <p style="width:156px">{{btntext5}}</p>
              </div>
              <div class="textbox textbtn6" v-show="icon==6">
                <h5>{{btn6}}</h5>
                <p style="width:160px">{{btntext6}}</p>
              </div>
              <div class="textbox textbtn7" v-show="icon==7">
                <h5>{{btn7}}</h5>
                <p>{{btntext7}}</p>
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
  width: 585px;
  height: 504px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.luancao {
  width: 223px !important;
  height: 206px !important;
  top: 79%;
  left: 95%;
}
.btn {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  border: 1px solid #fff;
}
.btnclick {
  background: #ffc100;
}
.btn1 {
  left:27.2%;
  top: 9.7%;
}
.btn2 {
  left: 5.6%;
  top: 29.75%;
}
.btn3 {
  left: 19%;
  top: 52.6%;
}
.btn4 {
  left: 9.1%;
  top: 79%;
}
.btn5 {
  left: 72.4%;
  top: 23.2%;
}
.btn6 {
  left: 91.2%;
  top: 45.8%;
}
.btn7 {
  left: 109.1%;
  top: 68.4%;
}
.textbox {
  width: 190px;
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
  margin-top: 5px;
}
.textbtn1 {
  right: 74.5%;
  top:8%;
}
.textbtn2 {
  left: -28.3%;
  top: 28%;
}
.textbtn3 {
  left: -14.6%;
  top: 51%;
}
.textbtn4 {
  left: -24.8%;
  top: 77.6%;
}
.textbtn5 {
  left: 76.7%;
  top: 21%;
}
.textbtn6 {
  left: 96%;
  top: 44%;
}
.textbtn7 {
  left: 113.55%;
  top: 67%;
}

/*适配各种设备*/
/* @media (max-height: 550px) {
  .btnbox button {
    transform: scale(0.7);
  }
} */
</style>
