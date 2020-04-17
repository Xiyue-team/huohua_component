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

        <div class="videoCenter">
          <div
            class='alertA'
            v-show="alertShow"
          >
            <div class="nameTitle">
              {{imgTitle}}
            </div>
            <div
              class="close"
              @click="reset"
            >
              <div class="cha"></div>
            </div>
            <img :src="imgUrl" />
          </div>
          <div
            class='bgg1'
            v-show="!alertShow"
          > <img
              src='./sub_static/image/12.png'
              ondragstart="return false;"
              class="htl"
              @mouseover="bigger(this)"
              @mouseout="smaller(this)"
              title='黄土梁'
              @click="alerts(1)"
            />

            <img
              src='./sub_static/image/12.png'
              ondragstart="return false;"
              class="htc"
              @mouseover="bigger(this)"
              @mouseout="smaller(this)"
              title='黄土川'
              @click="alerts(0)"
            />

            <img
              src='./sub_static/image/12.png'
              ondragstart="return false;"
              class="htm"
              @mouseover="bigger(this)"
              @mouseout="smaller(this)"
              title='黄土峁'
              @click="alerts(3)"
            />

            <img
              src='./sub_static/image/12.png'
              ondragstart="return false;"
              class="hty"
              @mouseover="bigger(this)"
              @mouseout="smaller(this)"
              title='黄土塬'
              @click="alerts(2)"
            />
          </div>

          <img
            src='./sub_static/image/ht.gif'
            ondragstart="return false;"
            v-show="!alertShow"
            class='bgg'
          />
        </div>
      </template>
    </fullScreensLayout>
  </div>
</template>

<script lang="ts">
import "../../../../src/assets/css/core.css";
import "../../../../src/assets/css/layout.css";
import fullScreensLayout from "../../../../src/component/layout/fullScreens_layout.vue";
import Component from "vue-class-component";
import { MainVueComponent } from "./MainVueComponent.ts";
import h_button from "../../../../src/component/ui/buttonEllipse.vue";

@Component({
  components: {
    fullScreensLayout,
    h_button
  }
})
export default class App extends MainVueComponent {}
</script>

<style scoped="scoped">
* {
  margin: 0;
  padding: 0;
}

body {
  overflow: hidden !important;
  overflow-x: hidden;
  overflow-y: hidden;
}

ul,
ol,
li {
  list-style: none;
}

.title_text {
  font-size: 24px;
  color: #000;
  line-height: 24px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 14px;
  left: 24px;
  z-index: 9;
}
#video {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  /* border-radius: 9px; */
  object-fit: cover;
}

.videoCenter {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: #fbfbfb;
}
.bgg {
  height: 80%;
  width: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.bgg1 {
  height: 80vh;
  width: 80vh;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.htl {
  height: 6vh;
  width: auto;
  position: absolute;
  top: 25%;
  left: 51%;
  z-index: 10;
  cursor: pointer;
  animation: htlA 1s;
  animation-timing-function: ease-in-out;
  transition: top 0.2s, left 0.2s, height 0.2s, width 0.2s;
}
.htc {
  height: 6vh;
  width: auto;
  position: absolute;
  top: 40%;
  left: 33%;
  z-index: 10;
  cursor: pointer;
  animation: htcA 1s;
  animation-timing-function: ease-in-out;
  transition: top 0.2s, left 0.2s, height 0.2s, width 0.2s;
}
.htm {
  height: 6vh;
  width: auto;
  position: absolute;
  top: 31%;
  left: 70%;
  z-index: 10;
  cursor: pointer;
  animation: htmA 1s;
  animation-timing-function: ease-in-out;
  transition: top 0.2s, left 0.2s, height 0.2s, width 0.2s;
}
.hty {
  height: 6vh;
  width: auto;
  position: absolute;
  top: 40%;
  left: 60%;
  z-index: 10;
  cursor: pointer;
  animation: htyA 1s;
  animation-timing-function: ease-in-out;
  transition: top 0.2s, left 0.2s, height 0.2s, width 0.2s;
}
@keyframes htlA {
  from {
    top: 0;
  }
  to {
    top: 25%;
  }
}
@keyframes htcA {
  from {
    top: 0;
  }
  to {
    top: 40%;
  }
}
@keyframes htmA {
  from {
    top: 0;
  }
  to {
    top: 31%;
  }
}
@keyframes htyA {
  from {
    top: 0;
  }
  to {
    top: 40%;
  }
}
.alertA {
  height: 75vh;
  width: 129vh;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  color: #8c96a0;
  text-shadow: 0.5px 0.5px 0.5px #fff;
  border: 1px solid #dce1e6;
  border-radius: 30px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  background: #ffffff;
  font-weight: bold;
  z-index: 15;
}
.nameTitle {
  height: 5vh;
  font-size: 4vh;
  line-height: 4vh;
  width: auto;
  position: absolute;
  top: 5%;
  left: 5%;
  color: #fff;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0);
  /* border: 1px solid #888; */
  text-shadow: 0.5px 0.5px 0.5px #888;
  z-index: 15;
}
.alertA img {
  height: 99%;
  width: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: 30px;
}
.close {
  z-index: 16;
  height: 5vh;
  width: 5vh;
  position: absolute;
  top: 5%;
  right: 5%;
  border-radius: 30px;

  box-shadow: 0 0.5rem 1rem rgba(223, 221, 221, 0.4);
  background: #ffffff;
}
.cha {
  width: 3vh;
  height: 3vh;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.cha::before,
.cha::after {
  content: "";
  position: absolute; /*方便进行定位*/
  height: 3vh;
  width: 1.5px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #888888;
}
.cha::before {
  transform: rotate(45deg); /*进行旋转*/
}
.cha::after {
  transform: rotate(-45deg);
}

.leftVideo {
  width: auto;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: 9px;
}
video {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  /* border-radius: 9px; */
  object-fit: cover;
}
.rightBtn {
  width: 100px;
  height: 400px;
  position: absolute;
  right: 20px;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
button {
  background: #ffffff;
  /* transform: scale(0.9); */
  /* border: 3 solid rgba(92, 174, 253, 1); */
  border-style: solid;
  text-shadow: 0 0.5px 0 #7d7d7d;
  border-width: 3px;
  border-color: rgba(0, 0, 0, 0.12);
  box-shadow: 2px 2px 2px #7d7d7d;
  border-radius: 100px;
  padding: 12px 16px;
  font-size: 16px;
  line-height: 16px;
  color: #8c96a0;
  text-shadow: 0.5px 0.5px 0.5px #fff;
  border: 1px solid #dce1e6;
  box-shadow: 0.5px 0.5px 0.5px #fff inset, 0 0 0 #a8abae inset;
  background: #ffffff;
  font-weight: bold;
}
button:hover {
  cursor: pointer;
  /* background: #ffffff;
  border: 0px solid #fff; */
}

/*.button:active{*/
/*background: #5CAEFD;*/
/*color: #FFFFFF;*/
/*}*/

.active {
  background: #5caefd;
  color: #ffffff;
  text-shadow: 0 0.1px 0 #7d7d7d;
}
</style>
