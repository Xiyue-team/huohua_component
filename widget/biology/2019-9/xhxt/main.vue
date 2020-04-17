<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox" slot-scope="viewBox">
        <div id="title" class="title_text">{{title}}</div>
        <div class="maxbox" :style="{zoom:zoom1}">
          <div :style="{'background-image': 'url(\'' +bg +'\')'}" class="box">
            <img src="./sub_static/UI/1.png" class="image" v-show="icon==-1" />
            <img src="./sub_static/UI/2.png" class="image" v-show="icon==1" />
            <img src="./sub_static/UI/5.png" class="image" v-show="icon==2" />
            <img src="./sub_static/UI/6.png" class="image" v-show="icon==3" />
            <img src="./sub_static/UI/8.png" class="image" v-show="icon==4" />
            <img src="./sub_static/UI/10.png" class="image" v-show="icon==5" />
            <img src="./sub_static/UI/3.png" class="image" v-show="icon==6" />
            <img src="./sub_static/UI/4.png" class="image" v-show="icon==7" />
            <img src="./sub_static/UI/9.png" class="image" v-show="icon==9" />
            <img src="./sub_static/UI/7.png" class="image" v-show="icon==8" />
            <img src="./sub_static/UI/11.png" class="image" v-show="icon==10" />
            <img src="./sub_static/UI/line.png" class="image" />

            <div class="image">
              <div class="btn btn1" @click="getChange(1)" :class="icon==1?'btnclick':''"></div>

              <div class="btn btn2" @click="getChange(2)" :class="icon==2?'btnclick':''"></div>

              <div class="btn btn3" @click="getChange(3)" :class="icon==3?'btnclick':''"></div>

              <div class="btn btn4" @click="getChange(4)" :class="icon==4?'btnclick':''"></div>

              <div class="btn btn5" @click="getChange(5)" :class="icon==5?'btnclick':''"></div>

              <div class="btn btn6" @click="getChange(6)" :class="icon==6?'btnclick':''"></div>

              <div class="btn btn7" @click="getChange(7)" :class="icon==7?'btnclick':''"></div>

              <div class="btn btn8" @click="getChange(8)" :class="icon==8?'btnclick':''"></div>

              <div class="btn btn9" @click="getChange(9)" :class="icon==9?'btnclick':''"></div>

              <div class="btn btn10" @click="getChange(10)" :class="icon==10?'btnclick':''"></div>

              <div class="textbox textboxleft textbtn1" v-show="icon==1">
                <h5>{{btn1}}</h5>
                <p style="width:98px" class="min7">{{btntext1}}</p>
              </div>
              <div class="textbox textboxleft textbtn2" v-show="icon==2">
                <h5>{{btn2}}</h5>
                <p style="width:72">{{btntext2}}</p>
              </div>
              <div class="textbox textboxleft textbtn3" v-show="icon==3">
                <h5>{{btn3}}</h5>
                <p style="width:87px">{{btntext3}}</p>
              </div>
              <div class="textbox textboxleft textbtn4" v-show="icon==4">
                <h5>{{btn4}}</h5>
                <p style="width:85px" id="btntext4">{{btntext4}}</p>
              </div>
              <div class="textbox textboxleft textbtn5" v-show="icon==5">
                <h5>{{btn5}}</h5>
                <p style="width:156px"  id="btntext5">{{btntext5}}</p>
              </div>
              <div class="textbox textbtn6" v-show="icon==6">
                <h5>{{btn6}}</h5>
                <p style="width:160px">{{btntext6}}</p>
              </div>
              <div class="textbox textbtn7" v-show="icon==7">
                <h5>{{btn7}}</h5>
                <p>{{btntext7}}</p>
              </div>
              <div class="textbox textbtn8" v-show="icon==8">
                <h5>{{btn8}}</h5>
                <p style="width:143px">{{btntext8}}</p>
              </div>
              <div class="textbox textbtn9" v-show="icon==9">
                <h5>{{btn9}}</h5>
                <p style="width:125px">{{btntext9}}</p>
              </div>

              <div class="textbox textbtn10" v-show="icon==10">
                <h5>{{btn10}}</h5>
                <p style="width:92px">{{btntext10}}</p>
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
  width: 718px;
  height: 474px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.btn {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  z-index: 9;

  border-radius: 50%;
  cursor: pointer;
  position: absolute;
}
.btnclick {
  background: #ffc100;
}
.btn1 {
  left: 16.5%;
  top: 9%;
}
.btn2 {
  left: 25.9%;
  top: 23.4%;
}
.btn3 {
  left: 3.4%;
  top: 39.2%;
}
.btn4 {
  left: 21.4%;
  top: 47.2%;
}
.btn5 {
  left: 16.7%;
  top: 71.5%;
}
.btn6 {
  left: 87.55%;
  top: 9.2%;
}
.btn7 {
  left: 71.8%;
  top: 15.2%;
}
.btn8 {
  left: 71.7%;
  top: 43.8%;
}
.btn9 {
  left: 90.35%;
  top: 62.2%;
}
.btn10 {
  left: 74%;
  top: 78.7%;
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
  margin-top: 5px;
}
.textbtn1 {
  right: 84.5%;
  top: 7%;
}
.textbtn2 {
  left: 0.6%;
  top: 21.5%;
}
.textbtn3 {
  left: -21.6%;
  top: 37.5%;
}
.textbtn4 {
  left: -4%;
  top: 45.5%;
}
.textbtn5 {
  left: -8.3%;
  top: 69.5%;
}
.textbtn6 {
  left: 91.55%;
  top: 7%;
}
.textbtn7 {
  left: 75.55%;
  top: 13%;
}
.textbtn8 {
  left: 75.55%;
  top: 41.5%;
}
.textbtn9 {
  left: 94%;
  top: 60.5%;
}
.textbtn10 {
  left: 78%;
  top: 76.5%;
}
@media (max-width: 1280px) and (min-width: 1023px) {
  .min7 {
    width: 117px !important;
  }
 #btntext4 {
    width: 103px !important;
  }
   #btntext5{
    width: 173px !important;
  }
}
@media (max-width: 667px) {
  .min7 {
    width: 130px !important;
  }
}
</style>
