<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="Container" style="width: 100%; height: 100%;">
          <div id="block" :style="`background-image: url(${picbg})`"></div>
          <div
            id="block"
            v-for="(item, index) in pic"
            v-show="bgbuttonActived===index+1"
            :style="`background-image: url(${item})`"
            :key="index"
          ></div>
          <div id="block">
            <div
              class="button_style"
              v-show="item.showIndex===bgbuttonActived"
              :style="`left: ${item.left}px; top:${item.top}px`"
              :id="`button${index}`"
              v-for="(item, index) in option"
              @click="buttonEvent(index)"
              :key="item.id"
            >
              <buttonImage v-bind="item.btn"></buttonImage>
            </div>
          </div>
          <div class="buttonG">
            <div
              v-for="(item, index) in btntext"
              class="buttonG_style"
              @click="bgbuttonEvent(index)"
              :key="index"
            >
              <buttonPrimary
                style="width: 100%"
                v-bind:title="item"
                v-bind:actived="bgbuttonActived===index+1"
                type="ellipse"
              ></buttonPrimary>
            </div>
          </div>
          <div v-show="buttonActived>-1" class="back" @click="resetEvent()">
            <div :style="`background-image: url(${picback})`"></div>
          </div>
          <transition name="fade">
            <div id="tcontainer" v-show="buttonActived>-1">
              <swiper :options="swiperOption" ref="mySwiper" class="swiper-container">
                <div class="swiper-slide" v-for="item of swiperList" :key="item.id">
                  <div style="width: 100%; height: 100%;">
                    <div class="bg">
                       <div class="bgs" :class="{'filter':item.hasFront}" :style="`background-image: url(${item.bgSrc})`"/>    
                    </div>
                    <div v-if="item.hasFront" class="front">
                      <div class="fronttipP">
                        <div class="fronttip" v-html="item.tip"> </div>
                      </div>
                      <div class="fronttipI">
                        <div class="frontimage" :style="`background-image: url(${item.frontSrc})`"></div>
                      </div>
                    </div>
                    <div id="tip" :class="item.class" v-show="item.hasFront===false" v-html="item.tip"></div>
                  </div>
                </div>
                <div
                  class="swiper-button-prev"
                  :style="`background-image: url(${picleft})`"
                  slot="button-prev"
                ></div>
                <div
                  class="swiper-button-next"
                  :style="`background-image: url(${picright})`"
                  slot="button-next"
                ></div>
              </swiper>
            </div>
          </transition>
        </div>
      </template>
    </fullScreensLayout>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import '../../../../src/assets/css/core.css';
  import '../../../../src/assets/css/layout.css';
  import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
  import Component from 'vue-class-component';
  import buttonPrimary from '../../../babylon/template/ui/buttonPrimary.vue';
  import { ViewModel } from './ViewModel';
  import buttonImage from './ui/buttonImage.vue';
  import 'swiper/dist/css/swiper.css';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';

@Component({
  components: {
    fullScreensLayout,
    buttonPrimary,
    swiper,
    swiperSlide,
    buttonImage
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped="scoped">
body {
  overflow: hidden !important;
}

#renderCanvas {
  width: 100%;
  height: 100%;
  outline: 0;
}
.title_text {
  font-size: 24px;
  line-height: 24px;
  color: #525252;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 3;
}

#Container {
  background-color: #ffffff;
}

#block {
  float: left;
  height: 90%;
  width: 90%;
  left: 5%;
  top: 5%;
  position: absolute;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.buttonG {
  position: absolute;
  width: 88px;
  height: auto;
  right: 30px;
  bottom: 38px;
}

.buttonG_style {
  width: 100%;
  height: 42px;
  margin-top: 12px;
}
#tcontainer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: #ffffff;
  z-index: 4;
}

.left{
  top: 72px;
  left: 72px;
}
.right{
  top: 72px;
  right: 72px;
}
#tip {
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  font-size: 20px;
  color: #ffffff;
  line-height: 28px;
  padding: 24px;
  width: 392px;
  height: auto;
  border-radius: 2px;
  z-index: 999;
}

.swiper-container {
  width: 100%;
  height: 100%;
}

.bg {
  width: 100%;
  height: 100%;
  transform: translateZ(0);
  overflow: hidden;
}

.filter{
  filter: blur(20px);
}

.bgs {
  width: 110%;
  height: 110%;
  margin-top: -5%;
  margin-left: -5%;
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
}

.front{
  position: absolute;
  width: 70%;
  height: 80%;
  top: 10%;
  left: 15%;
  background: rgba(255, 255, 255, 0.45);
  border-radius: 8px;
  transform: translateZ(0);
  z-index: 998;
}

.fronttipP, .fronttipI {
  box-sizing: border-box;
  position: absolute;
  width: 30%;
  height: 100%;
  left: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.fronttipI {
  left: 55%;
}

.frontimage {
  width: 100%;
  height: 80%;
  background-repeat:no-repeat;
  background-position: center;
  background-size:contain;
}

.fronttip {
  width: 100%;
  background: rgba(0, 0, 0, 0.45);
  padding: 24px;
  border-radius: 6px;
  font-size: 20px;
  color: #ffffff;
  line-height: 28px;
}

.swiper-button-next {
  width: 44px;
  height: 44px;
  background-size: 44px;
  right: 20px;
  transition: opacity 0.5s;
  opacity: 0.3;
  outline: 0px;
}

.swiper-button-prev {
  width: 44px;
  height: 44px;
  background-size: 44px;
  left: 20px;
  transition: opacity 0.5s;
  opacity: 0.3;
  outline: 0px;
}


.swiper-button-next:hover,
.swiper-button-prev:hover {
  transition: opacity 0.5s;
  opacity: 1;
}

.button_style {
  position: absolute;
  width: 0;
  height: 0;
  cursor: pointer;
}

.back {
  position: absolute;
  width: 48px;
  height: 42px;
  top: 24px;
  right: 24px;
  background: #ffffff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  cursor: pointer;
  z-index: 999;
}

.back div {
  float: left;
  width: 32px;
  height: 26px;
  margin: 8px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

@media screen and (min-height: 600px) and (max-height: 800px), screen and (min-width: 950px) and (max-width: 1500px) {
}

@media screen and (min-height: 450px) and (max-height: 599px), screen and (min-width: 700px) and (max-width: 949px) {
  .fronttip{
    padding: 15px;
    font-size: 16px;
    line-height: 22px;
  }
   .buttonG {
    right: 24px;
    bottom: 24px;
    width: 80px;
  }
}

@media screen and (max-height: 449px), screen and (max-width: 699px) {
  .title_text {
    font-size: 20px;
    line-height: 20px;
    top: 20px;
    left: 20px;
  }
  #tip {
    top: 48px;
    left: 48px;
    padding: 12px;
    width: 177px;
    font-size: 16px;
    line-height: 18px;
  }

  .buttonG {
    width: 66px;
    right: 24px;
    bottom: 24px;
  }

  .buttonG_style {
    height: 28px;
    margin-top: 12px;
  }
  .fronttip{
    padding: 10px;
    font-size: 14px;
    line-height: 18px;
  }

  .swiper-button-next {
  width: 28px;
  height: 28px;
  background-size: 28px;
  right: 12px;
}

.swiper-button-prev {
  width: 28px;
  height: 28px;
  background-size: 28px;
  left: 12px;
}

}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
.swiper-pagination,
.swiper-pagination-bullet {
  outline: 0px;
}
</style>
