<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox" slot-scope="viewBox">
        <div id="title" class="title_text">{{title}}</div>
        <div
          class="maxbox"
          :style="{'background-image': 'url(\'' +bg +'\')'}"
          @mouseout="getChange"
        >
          <p :class="icon===0?'block':'none'">{{prompt1}}</p>
          <p id="text" :class="icon!=0?'block':'none'">{{prompt2}}</p>
          <div class="imgbox" :class="icon===0?'block':'none'" :style="{zoom:zoom1}">
            <button
              v-for="(item,index) in src1"
              @click="getChange(index+1)"
              :kay="index"
              :id="index+1"
              :class="icon===0?'block':'none'"
            >
              <img :src="item.src" alt />
            </button>
          </div>
        </div>
        <!-- 轮播图 -->
        <div class="main" :style="{zoom: zoom1}" :class="icon!=0?'block':'none'">
          <div class="swiper-container" id="swiper-container">
            <div class="swiper-wrapper" id="swiper-wrapper">
              <div class="swiper-slide" id="swiper-slide">
                <p class="text black">{{text1}}</p>
                <img :src="one" alt style="width: 100%;height: auto" />
              </div>
              <div
                v-for="(item,index) in src2"
                :kay="index"
                class="swiper-slide"
                :id="'index'+(index+2)"
              >
                <p class="text" :id="'text'+(index+2)">{{item.text}}</p>
                <img :src="item.src" style="width: 100%;height: auto" />
              </div>
            </div>

            <!--左右的切图按钮-->
            <div
              class="swiper-button-prev btn_left"
              id="swiper-button-prev"
              slot="button-prev"
              @click="swiper_button"
            >
              <img src="./sub_static/UI/b1.png" style="width: 100%;height: 100%" />
            </div>
            <div
              class="swiper-button-next btn_right"
              id="swiper-button-next"
              slot="button-next"
              @click="swiper_button"
            >
              <img src="./sub_static/UI/b2.png" style="width: 100%;height: 100%" />
            </div>
          </div>
          <!-- Optional controls 轮播控件-->
          <div class="swiper-pagination" @click="swiper_button"></div>
        </div>

        <!-- 分散系按钮 -->
        <div class="btnbox" :class="icon!=0?'block':'none'" :style="{zoom:zoom1}">
          <div class="box">
            <p>{{disperser}}</p>
            <button @click="getclick(1)" :class="icon2===1?'checked':''">
              {{solid}}
              <img src id="hin1" :class="(icon4!= 0&&icon2===1)?'':'none1'" />
            </button>
            <br />
            <button @click="getclick(2)" :class="icon2===2?'checked':''" id="hint2">
              {{liquid}}
              <img src id="hin2" :class="(icon4!= 0&&icon2===2)?'':'none1'" class="img2" />
            </button>
            <br />
            <button @click="getclick(3)" :class="icon2===3?'checked':''" id="hint3">
              {{gas}}
              <img src id="hin3" :class="(icon4!= 0&&icon2===3)?'':'none1'" class="img3" />
            </button>
            <br />
            <p style="margin-top: 3vh;">{{dispersoid}}</p>
            <button @click="getclick(4)" :class="icon3===4?'checked':''" id="hint4">
              {{solid}}
              <img
                src
                id="hin4"
                :class="(icon4!= 0&&icon3===4)?'':'none1'"
                alt
                class="img4"
              />
            </button>
            <br />
            <button @click="getclick(5)" :class="icon3===5?'checked':''" id="hint5">
              {{liquid}}
              <img src id="hin5" :class="(icon4!= 0&&icon3===5)?'':'none1'" class="img5" />
            </button>
            <br />
            <button @click="getclick(6)" :class="icon3===6?'checked':''" id="hint6">
              {{gas}}
              <img src id="hin6" :class="(icon4!= 0&&icon3===6)?'':'none1'" class="img6" />
            </button>

            <br />

            <button
              id="btn"
              :class="(icon2 != 0 && icon3 != 0)?'block':'none'"
              @click="confirm()"
              @mousedown="down()"
              @mouseup="up()"
            >确定</button>
          </div>
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
import "./sub_static/swiper.css";
@Component({
  components: {
    fullScreensLayout
  }
})
export default class App extends MainVueComponent {}
</script>

<style scoped>
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
  /* border-radius: 8px; */
  vertical-align: middle;
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
.text {
  line-height: 24px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 33px;
  left: 37px;
  z-index: 9;
  font-size: 42px;
  text-align: justify;
  color: #fff;
}
.black {
  color: black !important;
}
#text5 {
  color: black !important;
}
#text6 {
  color: black !important;
}
#text8 {
  color: black !important;
}
.maxbox {
  width: 100%;
  height: 100%;
}
.none {
  display: none;
}
.none1 {
  display: none !important;
}
.block {
  display: block;
}
.maxbox > p {
  line-height: 24px;
  position: absolute;
  top: 13%;
  left: 50%;
  z-index: 9;
  font-size: 2vh;
  transform: translate(-50%, 0%);
  text-align: justify;
  color: #fff;
}
#text {
  top: 5%;
}
.imgbox {
  width: 810px;
  height: 420px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.imgbox > button {
  background: 0;
  cursor: pointer;
}
.imgbox > button > img {
  width: 180px;
  height: 120px;
}
.main {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.swiper-container {
  margin: auto;
  width: 854px;
  height: 480px;
  top: 50%;
  transform: translate(-0, -50%);
  display: -webkit-flex; /* Safari */
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper-wrapper {
  width: 854px;
  height: 480px;
  margin: auto;
}
.swiper-button-next {
  border: none;
  display: none;
  outline: 0 none !important;
  blr: expression(this.onFocus=this.blur());
}
.swiper-button-prev {
  border: none;
  display: none;
  outline: 0 none !important;
  blr: expression(this.onFocus=this.blur());
}
.btn_left {
  background-image: none;
  display: block;
  border: none;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 1%;
  z-index: 999;
  transform: translateY(-50%);
}
.btn_right {
  background-image: none;
  display: block;
  border: none;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  right: 1%;
  z-index: 2000;
  transform: translateY(-50%);
}
.swiper-pagination {
  left: 50%;
  bottom: 9%;
  transform: translate(-50%, 0);
}
.swiper-pagination >>> .swiper-pagination-bullet {
  background: #fff !important;
  width: 12px;
  height: 12px;
  opacity: 1 !important;
  outline: 0 none !important;
  margin-right: 10px;
    border-radius: 50%!important;
  blr: expression(this.onFocus=this.blur());
}
.swiper-pagination >>> .swiper-pagination-bullet-active {
  opacity: 1 !important;
  background: #007aff !important;
  width: 12px;
  height: 12px;
  display: inline-block;
  border-radius: 50%;
  outline: 0 none !important;
  blr: expression(this.onFocus=this.blur());
}

.btnbox {
  width: 80px;
  line-height: 24px;
  position: absolute;
  top: 49%;
  right: 4%;
  z-index: 9;
  font-size: 20px;
  transform: translate(0%, -54%);
  text-align: justify;
  color: #525252;
  font-family: PingFangSC-Medium;
}
.btnbox p {
  color: #fff !important;
  margin-bottom: 1vh;
  text-align: center;
}
.btnbox button {
  width: 72px;
  height: 42px;
  border-radius: 21px;
  margin: 1vh 0;
  text-align: center;
  background: #ebebeb;
}
.btnbox button img {
  display: inline-block;
  width: 20px;
  height: 20px;
  position: fixed;
  top: 8%;
  right: 0.5%;
}
.img2 {
  top: 21% !important;
}
.img3 {
  top: 34% !important;
}
.img4 {
  top: 61% !important;
}
.img5 {
  top: 74% !important;
}
.img6 {
  top: 87% !important;
}
#btn {
  position: fixed;
  margin-top: 40px;
}
.checked {
  color: #fff !important;
  background: #00aaff !important;
}
/*适配各种设备*/
@media (max-height: 801px) {
  .swiper-pagination {
    bottom: 15%;
  }
}
@media (max-width: 1024px) {
  .swiper-pagination {
    bottom: 18%;
  }
}
@media (max-height: 510px) {
  .swiper-pagination {
    bottom: 12%;
  }
}
@media (max-width: 1280px) and (max-height: 727px) {
  .swiper-pagination {
    bottom: 9%;
  }
}
</style>
