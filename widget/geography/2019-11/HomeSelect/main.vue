<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="Container" style="position: absolute;left: 0; top:0;width: 100%; height: 100%;">
          <div id="block" :style="`left: ${fullleft}px;width: ${fullwidth}px;background-image: url(${picbg})`">
        <div
              class="button_style"
              :style="`left: ${item.left}px; top:${item.top}px`"
              :id="`button${index}`"
              v-for="(item, index) in option"
              @click="buttonEvent(index)"
              :key="item.id"
            >
              <buttonImage v-bind="item.btn"></buttonImage>
            </div>
          </div>
          <div class="buttonR" @click="bgbuttonEvent()">
              <buttonPrimary
                style="width: 100%"
                v-bind:title="btntitle"
                v-bind:actived="bgbuttonActived"
                type="ellipse" ></buttonPrimary>
          </div>
          <transition name="fade">
            <div id="tcontainer" v-show="buttonActived>-1">
              <div class="bg"  @click="resetEvent()">
                <div class="bgs" :style="`left: ${fullleft}px;width: ${fullwidth}px;background-image: url(${picbgblur})`"/>    
              </div>
              <swiper :options="swiperOption" ref="mySwiper" class="swiper-container">
                <div class="swiper-slide" v-for="item of swiperList" :key="item.id">
                  <div style="width: 100%; height: 100%;">
                    <div class="weather-bg" :style="`background-image: url(${item.bgSrc})`">
                      <div id="tip" :class="item.class" v-html="item.tip"></div>
                    </div>
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
  color: #FFFFFF;
  font-size: 24px;
  line-height: 24px;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 999;
}

#Container {
  background-color: #080f2b;
}

#block{ 
  top:0;
  height: 100%;
  position: absolute;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  touch-action: none;
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
  background: #080f2b;
  z-index: 4;
}
.buttonR{
  position: absolute;
  width: 88px;
  height: 42px;
  right: 24px;
  bottom: 24px;
}

.left{
  top: 72px;
  left: 72px;
}
.right{
  top: 72px;
  right: 72px;
}
.leftbottom{
  bottom: 72px;
  left: 72px;
}
#tip {
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  font-size: 20px;
  color: #ffffff;
  line-height: 28px;
  padding: 24px;
  max-width: 392px;
  height: auto;
  border-radius: 2px;
  z-index: 999;
}
.weather-bg {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 8px;
  z-index: 999;
}

.swiper-container{
  position: absolute;
  width: 80%;
  height: 80%;
  top: 10%;
  left: 50%;
  margin-left: -40%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 8px;
  z-index: 999;
}
.bg {
  position: absolute; 
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.bgs {
  position: absolute; 
  height: 100%;
  top: 0;
  background-repeat:no-repeat;
  background-position: center;
  background-size:contain;
}
.front{
  position: absolute;
  width: 70%;
  height: 80%;
  top: 10%;
  left: 15%;
  background: rgba(255, 255, 255, 0.45);
  border-radius: 8px;
  z-index: 998;
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
}

.back{
  position: absolute;
  width: 20px;
  height: 20px;
  right: 24px;
  bottom: 24px;
  cursor: pointer;
  z-index: 999;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

@media screen and (min-height: 600px) and (max-height: 800px) {
}

@media screen and (min-height: 450px) and (max-height: 599px), screen and (min-width: 700px) and (max-width: 949px) {
  .fronttip{
    padding: 15px;
    font-size: 16px;
    line-height: 22px;
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
    padding: 8px;
    max-width: 197px;
    font-size: 14px;
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
  .buttonR{
    height: 28px;
    width: 60px;
  }
  .swiper-container{
    height: 70%;
    top: 15%;
  }
.left{
  top: 48px;
  left: 48px;
}
.right{
  top: 48px;
  right: 48px;
}
.leftbottom{
  bottom: 48px;
  left: 48px;
}
  .swiper-button-next {
  width: 24px;
  height: 24px;
  background-size: 24px;
  right: 10px;
}

.swiper-button-prev {
  width: 24px;
  height: 24px;
  background-size: 24px;
  left: 10px;
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
