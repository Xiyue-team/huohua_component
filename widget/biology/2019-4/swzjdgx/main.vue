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
        <div id="title">{{title}}</div>

        <div id="main" v-bind:style="{backgroundImage:'url(' + bgi + ')'}">

          <div class="swiper-container" id="swiper-container">
            <div class="showStartImg" v-show="showStartImg">
              <img src="./sub_static/UI/stImg.png" style="width: 98%;height: auto"/>
            </div>
            <div class="swiper-wrapper" v-show="sh" onclick="return false">
              <div class="swiper-slide">
                <img onclick="return false" :src="first" alt="" style="width: 98%; height: auto"/>
              </div>
              <div class="swiper-slide">
                <img onclick="return false" :src="second" alt="" style="width: 98%; height: auto"/>
              </div>
              <div class="swiper-slide">
                <img onclick="return false" :src="third" alt="" style="width: 98%; height: auto"/>
              </div>
              <div class="swiper-slide">
                <img onclick="return false" :src="fourth" alt="" style="width: 98%; height: auto"/>
              </div>
              <div class="swiper-slide">
                <img onclick="return false" :src="fifth" alt="" style="width: 98%; height: auto"/>
              </div>
            </div>
            <div class="swiper-pagination" v-show="sh"></div>
          </div>
        </div>

        <div id="anniu">
          <button class="but1" @click=" open(1)" :class="{active: active1}">{{buttonArr[0]}}</button>
          <div id="an1" v-show="active1">
            <div id="zu1">
              <input class="radio-default" type="radio" id="test1" name="radio-group" :checked="active3">
              <label for="test1" id="zi1" @click="changeEvent(1)" :class="{act: active3}">{{buttonArr[1]}}</label>
            </div>
            <div id="zu2">
              <input class="radio-default" type="radio" id="test2" name="radio-group" :checked="active4">
              <label for="test2" id="zi2" @click="changeEvent(2)" :class="{act: active4}">{{buttonArr[2]}}</label>
            </div>
          </div>
          <button class="but2" @click="open(2)" :class="{active: active2}">{{buttonArr[3]}}</button>
          <div id="an2" v-show="active2">
            <div id="zu3">
              <input class="radio-default" type="radio" id="test3" name="radio-group" :checked="active5">
              <label for="test3" id="zi3" @click="changeEvent(3)" :class="{act: active5}">{{buttonArr[4]}}</label>
            </div>
            <div id="zu4">
              <input class="radio-default" type="radio" id="test4" name="radio-group" :checked="active6">
              <label for="test4" id="zi4" @click="changeEvent(4)" :class="{act: active6}">{{buttonArr[5]}}</label>
            </div>
            <div id="zu5">
              <input class="radio-default" type="radio" id="test5" name="radio-group" :checked="active7">
              <label for="test5" id="zi5" @click="changeEvent(5)" :class="{act: active7}">{{buttonArr[6]}}</label>
            </div>
            <div id="zu6">
              <input class="radio-default" type="radio" id="test6" name="radio-group" :checked="active8">
              <label for="test6" id="zi6" @click="changeEvent(6)" :class="{act: active8}">{{buttonArr[7]}}</label>
            </div>
          </div>
        </div>
      </template>
      <template
        slot="controlPanel"
        slot-scope="controlPanel"
      >
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
import "./sub_static/mystyle.css";

@Component({
  components: { fullScreensLayout }
})
export default class App extends MainVueComponent {}
</script>

<style scoped="scoped">
img {
  touch-action: none !important;
}
</style>
