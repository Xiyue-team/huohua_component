<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="Container" style="width: 100%; height: 100%;">
          <div id="block" :style="`background-image: url(${picbg})`">
            <div class="button_style"
             :style="`left: ${item.left}px; top:${item.top}px`"
              :id="`button${index}`"
              v-for="(item, index) in option"
              @click="buttonEvent(index)" :key="index">
              <buttonImage  v-bind:actived="item.active" v-bind="item.btn"></buttonImage>
            </div>
          </div>
          <div v-show="buttonActived>-1" class="back" @click="resetEvent()">
            <div :style="`background-image: url(${picback})`"></div>
          </div>
          <transition name="fade">
            <div id="tcontainer" v-show="buttonActived>-1" style="width: 100%; height: 100%;">
              <swiper :options="swiperOption" ref="mySwiper" class="swiper-container">
                <div class="swiper-slide" v-for="item of swiperList" :key="item.id">
                  <div class="weather-bg" :style="`background-image: url(${item.bgSrc})`">
                    <div id="tip" v-html="item.tip">
                      <!-- <p v-html="item.tip"></p> -->
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
  font-size: 24px;
  line-height: 24px;
  color: #525252;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 3;
}
#Container {
  background-color: #FFFFFF;
}

#block{ 
  float:left; 
  height:90%;
  width: 90%;
  left: 5%;
  top: 5%;
  position: absolute; 
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

#tcontainer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: #FFFFFF;
  z-index: 4;
}
#tip {
  position: absolute;
  top: 72px;
  left: 72px;
  background: rgba(0, 0, 0, 0.6);
  color: #FFFFFF;
  padding: 24px;
  width: 392px;
  height: auto;
  border-radius: 2px;
  z-index: 999;
/* }
#tip p { */
  font-size: 20px;
  color: #FFFFFF;
  line-height: 28px;
}
.swiper-container {
  width: 100%;
  height: 100%;
}

.weather-bg {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
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

.back div{
  float: left;
  width: 32px;
  height: 26px;
  margin: 8px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

@media screen and (max-height: 449px) {
  .title_text {
    font-size: 20px;
    line-height: 20px;
    top: 20px;
    left: 20px;
  }

  #tip {
    top: 48px;
    left: 72px;
    padding: 12px;
    width: 150px;
  /* }
  #tip p { */
    font-size: 16px;
    line-height: 18px;
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
