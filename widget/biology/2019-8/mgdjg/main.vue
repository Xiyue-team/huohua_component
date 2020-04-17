<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox" slot-scope="viewBox">
        <div id="title" class="title_text">{{title}}</div>
        <div style="width:100%;height:100%">
          <div class="box">
            <div style="width: 100%;height: 100%;">
              <div class="btnboximg1">
                <img src="./sub_static/UI/11.png" width="100%" height="auto" />
              </div>
              <div class="btnbox mogu" id="btnbox">
                <div class="linebox">
                  <img src="./sub_static/UI/33.png" class="mogu" />
                  <img
                    src="./sub_static/UI/2.png"
                    class="btnbox_img"
                    :class="icon1==true?'block':'none'"
                  />
                  <div class="textbox" :class="(icon4==true)&&(icon5==true)?'block':'none'">
                    <div></div>
                    <p>{{text[0]}}</p>
                    <p>{{text[1]}}</p>
                    <p>{{text[2]}}</p>
                  </div>

                  <span
                    class="btn_box_span btn_box_span1"
                    :class="icon1==true?'block':'none'"
                  >{{text[3]}}</span>
                  <button
                    class="btn_box_btn btn_box_btn1"
                    :class="icon1==true?'click':''"
                    @click="getChange(1)"
                  ></button>

                  <span
                    class="btn_box_span btn_box_span2"
                    :class="icon2==true? 'block':''"
                  >{{text[4]}}</span>
                  <button
                    class="btn_box_btn btn_box_btn2"
                    :class="icon2==true?'click':''"
                    @click="getChange(2)"
                  ></button>

                  <span
                    class="btn_box_span btn_box_span3"
                    :class="icon3==true? 'block':''"
                  >{{text[5]}}</span>
                  <button
                    class="btn_box_btn btn_box_btn3"
                    :class="icon3==true?'click':''"
                    @click="getChange(3)"
                  ></button>

                  <button
                    class="btn_box_btn btn_box_btn4"
                    :class="icon4==true?'click':''"
                    @click="getChange(4)"
                  ></button>
                  <span
                    class="btn_box_span btn_box_span4"
                    :class="icon4==true? 'block':''"
                  >{{text[6]}}</span>

                  <button
                    class="btn_box_btn btn_box_btn5"
                    :class="icon5==true?'click':''"
                    @click="getChange(5)"
                  ></button>
                  <span
                    class="btn_box_span btn_box_span5"
                    :class="icon5==true? 'block':''"
                  >{{text[7]}}</span>
                </div>
              </div>
            </div>

            <div
              id="bgbox"
              style="width:100%;height:100%;position: absolute;top: 0;pointer-events: none;"
            >
              <div id="thermometerBg2" style="width:1%;height: 100%;z-index: 3;overflow: hidden;">
                <div class="box2"></div>
              </div>
            </div>

            <div class="btnboximg" id="btnboximg">
              <div id="thermometerBg" class="btnbox2">
                <img src="./sub_static/UI/55.png" :style="{width:width1+'px'}" />
              </div>
            </div>
            <div id="slider1" style="background-color: rgba(255,255,255,0)">&nbsp;&nbsp;</div>
            <div id="slider">
              <img
                ondragstart="return false"
                src="./sub_static/UI/4_1.png"
                width="100%"
                height="100%"
                style="position: absolute;"
              />
              <img
                ondragstart="return false"
                src="./sub_static/UI/4_2.png"
                width="100%"
                class="btn1"
              />
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
.box {
  width: 100%;
  height: 100%;
  background: #474547;
  background-size: cover;
  background-position: center center;
}
.box2 {
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
}
.mogu {
  width: 100%;
  height: auto;
}
.btnbox_img {
  width: 10vw;
  height: auto;
  position: absolute;
  top: 22%;
  left: 25%;
  visibility: hidden;
  transform: translate(-75%, -67%);
}
.btnbox {
  width: 100%;
  height: auto;
}
.btnboximg1 {
  width: 100%;
  height: auto;
}
.linebox {
  width: 100%;
  height: auto;
  z-index: 2;
  position: absolute;
  top: 0;
}
.btnboximg {
  width: 100%;
  height: auto;
  pointer-events: none;
  position: absolute;
  top: 0;
  z-index: 2;
}
.btnbox2 {
  width: 0px;
  height: auto;
  z-index: 2;
  overflow: hidden;
}
.btnbox2 img {
  width: 708px;
  height: auto;
}
.img1 {
  width: 708px;
  height: 576px;
}
.btn_box {
  position: absolute;
}
.btn_box_btn {
  position: absolute;
  background: transparent;
  width: 1.4vw;
  height: 1.4vw;
  border-radius: 15px;
  border: 0.1vw solid #fff;
}
.click {
  border: 0.1vw solid #fff;
  background: #ffc100;
}
.btn_box_btn1 {
  top: 17%;
  left: 35.6%;
  transform: translate(-64.5%, -59%);
}
.btn_box_btn2 {
  top: 32%;
  left: 34.8%;
  transform: translate(-65.5%, -64%);
}
.btn_box_btn3 {
  top: 47%;
  left: 29.4%;
  transform: translate(-80%, -61.5%);
}
.btn_box_btn4 {
  top: 20%;
  left: 66.5%;
  transform: translate(-40%, -54%);
}
.btn_box_btn5 {
  top: 40%;
  left: 66.6%;
  transform: translate(-27.5%, -62%);
}
.btn_box_span {
  position: absolute;
  font-family: SourceHanSansSC-Medium;
  font-size: 2.4vw;
  color: #ffffff;
  visibility: hidden;
  z-index: 3;
}
.btn_box_span1 {
  top: 17%;
  left: 32%;
  transform: translate(-65.5%, -64%);
}
.btn_box_span2 {
  top: 32.5%;
  left: 30%;
  transform: translate(-46.5%, -75%);
}
.btn_box_span3 {
  top: 47%;
  left: 25%;
  transform: translate(-64%, -52.5%);
}
.btn_box_span4 {
  top: 19%;
  left: 73%;
  transform: translate(-88%, -37%);
}
.btn_box_span5 {
  top: 41.4%;
  left: 71%;
  transform: translate(-43%, -89%);
}
.none {
  visibility: hidden;
}
.block {
  visibility: initial !important;
}
.textbox {
  position: absolute;
  top: 26%;
  left: 79%;
  transform: translate(-48.5%, -33%);
  width: 6.6vw;
}
.textbox div {
  float: left;
  width: 2.9vw;
  height: 11.2vw;
  border: 0.1vw solid #fff;
  border-left: 0;
}
.textbox p {
  font-size: 2.4vw;
  color: #ffffff;
  margin: 0.3vw 0;
  display: inline-block;
  margin-left: 1.1vw;
  float: right;
}
.tuodongbox {
  width: 100%;
  height: 100%;
}
#slider {
  width: 49px;
  height: 100%;
  position: absolute;
  top: 0%;
  z-index: 3;
  left: 150px;
  pointer-events: none;
}
#slider1 {
  width: 49px;
  height: 28px;
  z-index: 4;
  position: absolute;
  cursor: pointer;
  bottom: 119px;
  left: 150px;
  background: rgba(216, 128, 128, 0);
}
.btn1 {
  position: absolute;
  height: 18px;
  bottom: 120px;
}
/*适配各种设备*/
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
@media (max-width: 667px) {
  .btnbox_img {
    width: 8vw;
    left: 26%;
  }
}
@media (max-width: 730px) {
  .title_text {
    font-size: 16px;
  }
  .btn1 {
    height: 18px;
    bottom: 56px;
  }
  #slider {
    width: 48px !important;
    left: 96px;
  }
  #slider1 {
    height: 18px;
    bottom: 56px;
    left: 96px;
  }
}
@media (max-width: 854px) and (min-width: 806px) {
  .title_text {
    font-size: 16px;
  }
  .btn1 {
    height: 18px;
    bottom: 56px;
  }
  #slider {
    width: 48px !important;
    left: 96px;
  }
  #slider1 {
    height: 18px;
    bottom: 56px;
    left: 96px;
  }
}
@media (max-width: 1024px) and (min-height: 698px) {
  .btnboximg1 {
    transform: translate(0%, 15%);
  }
  .linebox {
    transform: translate(0%, 15%);
  }
  .btnboximg {
    transform: translate(0%, 15%);
  }
}
</style>
