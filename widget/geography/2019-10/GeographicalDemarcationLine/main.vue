<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="container" style="width: 100%; height: 100%;">
          <div id="msg" :style="`background-image: url(${picbg})`"></div>
          <div class="buttonG">
            <div
              v-for="(item, index) in swiperList"
              class="button_style"
              @click="buttonEvent(index)"
              :key="index"
            >
              <buttonPrimary
                style="width: 100%"
                v-bind:title="item.text.title"
                v-bind:actived="buttonActived===index"
                type="ellipse"
              ></buttonPrimary>
            </div>
          </div>
        </div>

        <transition name="fade">
          <div id="tcontainer" v-show="buttonActived>-1" style="width: 100%; height: 100%;">
            <div class="title_desc" >{{swiper_title}}</div>
            <div class="swiperC">
              <div class="swiper-container1">
                <swiper
                  :options="swiperOption"
                  ref="mySwiper1"
                  class="swiper-containerCell"
                >
                  <div class="swiper-slide" v-for="item of swiperList" :key="item.id">
                    <div class="swiper-img" :style="`background-image: url(${item.bgSrc1})`">
                      <div class="tip" v-html="item.text.text1"></div>
                    </div>
                  </div>
                </swiper>
              </div>
              <div class="swiper-container2">
                <swiper
                  :options="swiperOption2"
                  ref="mySwiper2"
                  class="swiper-containerCell"
                >
                  <div class="swiper-slide" v-for="item of swiperList" :key="item.id">
                    <div class="swiper-img" :style="`background-image: url(${item.bgSrc2})`">
                      <div class="tip" v-html="item.text.text2"></div>
                    </div>
                  </div>
                </swiper>
              </div>
            </div>
            <div
              class="swiper-button-next"
              :style="`background-image: url(${picright})`"
              slot="button-next"
            ></div>
            <div
              class="swiper-button-prev"
              :style="`background-image: url(${picleft})`"
              slot="button-prev"
            ></div>
            <div class="back" @click="resetEvent()">
              <div :style="`background-image: url(${picback})`"></div>
            </div>
          </div>
        </transition>
      </template>
    </fullScreensLayout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
import buttonPrimary from '../../../babylon/template/ui/buttonPrimary.vue';
import Component from 'vue-class-component';
import { ViewModel } from './ViewModel';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

@Component({
  components: {
    fullScreensLayout,
    swiper,
    swiperSlide,
    buttonPrimary
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped="scoped">
body {
  overflow: hidden !important;
}
.title_text {
  font-size: 24px;
  line-height: 24px;
  color: #525252;
  position: absolute;
  top: 24px;
  left: 24px;
}
#container {
  background: #fffffe;
}
.buttonG {
  position: absolute;
  width: 790px;
  height: 42px;
  left: 50%;
  margin-left: -400px;
  bottom: 24px;
  z-index: 3;
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

.button_style {
  float: left;
  width: 110px;
  height: 100%;
  margin-left: 20px;
}
#msg {
  position: absolute;
  top: 10%;
  width: 100%;
  height: 80%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  pointer-events: none;
}

#tcontainer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  box-sizing: border-box;
  background: #f6f8fd;
  display: flex;
  align-items: center;
  justify-content: center;
}

#tcontainer > div.swiper {
  width: 100%;
  overflow: hidden;
}
.swiper-container1 {
  position: absolute;
  width: 50%;
  height: 100%;
}
.swiper-container2 {
  position: absolute;
  width: 50%;
  height: 100%;
  left: 50%;
}
.swiper-containerCell {
  position: absolute;
  left: 25px;
  right: 25px;
  top: 25px;
  bottom: 25px;
}
.swiperC {
  position: absolute;
  top: 72px;
  bottom: 72px;
  left: 72px;
  right: 72px;
}
.title_desc {
  position: absolute;
  top: 24px;
  width: 200px;
  left: 50%;
  margin-left: -100px;
  height: auto;
  text-align: center;
  z-index: 999;
  font-size: 34px;
  color: #525252;
  line-height: 34px;
  pointer-events: none;
}
.swiper-slide {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.swiper-button-next {
  width: 44px;
  height: 44px;
  background-size: 44px;
  top: 53%;
  right: 24px;
  outline: 0px;
}

.swiper-button-prev {
  width: 44px;
  height: 44px;
  background-size: 44px;
  top: 53%;
  left:  24px;
  outline: 0px;
}

.swiper-img {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.tip {
  position: absolute;
  color: #fff;
  width: 45%;
  right: 0;
  top: 0;
  padding: 18px;
  height: auto;
  z-index: 999;
  font-size: 24px;
  line-height: 28px;
  background: rgba(0, 0, 0, 0.3);
}

@media screen and (min-height: 600px) and (max-height: 800px), screen and (min-width: 950px) and (max-width: 1500px) {

  .tip {
    font-size: 18px;
    padding: 18px;
    line-height: 20px;
    padding: 14px;
  }
  .swiper-img1 {
    height: 70%;
    margin: 130px 8px 24px 16px;
  }
  .swiper-img2 {
    height: 70%;
    margin: 130px 16px 24px 8px;
  }
}

@media screen and (min-height: 450px) and (max-height: 599px), screen and (min-width: 700px) and (max-width: 949px) {
  .title_desc {
    font-size: 24px;
    line-height: 24px;
  }
  .tip {
    font-size: 14px;
    padding: 14px;
    line-height: 16px;
    padding: 14px;
  }
  .swiper-img1 {
    height: 70%;
    margin: 110px 8px 24px 16px;
  }
  .swiper-img2 {
    height: 70%;
    margin: 110px 16px 24px 8px;
  }
}

@media screen and (max-height: 449px), screen and (max-width: 699px)  {
  .title_text {
    font-size: 20px;
    line-height: 20px;
    color: #525252;
    top: 18px;
    left: 18px;
  }
  .buttonG {
    height: 28px;
    width: 600px;
    margin-left: -300px;
    bottom: 8px;
  }
  .button_style {
    width: 90px;
    height: 100%;
    margin-left: 10px;
  }
  .title_desc {
    font-size: 24px;
    top: 18px;
  }
  .tip {
    min-height: 14px;
    font-size: 14px;
    line-height: 14px;
    padding: 12px;
  }
  .swiper-img1 {
    height: 70%;
    margin: 58px 8px 0px 16px;
  }
  .swiper-img2 {
    height: 70%;
    margin: 58px 16px 0px 8px;
  }

  .back {
    width: 32px;
    height: 28px;
    top: 15px;
    right: 15px;
  }

  .back div {
    width: 26px;
    height: 20px;
    margin: 3px;
  }

  .swiper-button-next {
  width: 28px;
  height: 28px;
  background-size: 28px;
  top: 53%;
  right: 12px;
}

.swiper-button-prev {
  width: 28px;
  height: 28px;
  background-size: 28px;
  top: 53%;
  left: 12px;
}

.swiperC {
  top: 48px;
  bottom: 48px;
  left: 48px;
  right: 48px;
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
</style>
