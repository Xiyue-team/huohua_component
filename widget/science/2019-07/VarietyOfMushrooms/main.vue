<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox" slot-scope="viewBox">
        <div class="title">
          <transition name="fold">
            <div class="title_text" v-if="titleShow">{{title_text}}</div>
          </transition>
        </div>
        <div id="info" @click="openInfo()"></div>
        <div id="container" style="width: 100%; height: 100%;">
          <swiper :options="swiperOption" ref="mySwiper" class="swiper-container">
            <div class="swiper-slide" v-for="item of swiperList" :key="item.id">
              <div class="weather-bg" :style="`background-image: url(${item.bgSrc1})`">
                <div id="tip" :class="item.pos">
                  <div class="titlepinyin">
                    <div class="title_pinyin" v-for="item2 of item.tip.titlewithpinyin">
                      <h4 v-html="item2.pinyin"></h4>
                      <h3 v-html="item2.title"></h3>
                    </div>
                  </div>
                  <p v-html="item.tip.desc"></p>
                </div>
              </div>
            </div>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
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
import { ViewModel } from './ViewModel';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

@Component({
  components: {
    fullScreensLayout,
    swiper,
    swiperSlide
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped="scoped">
body {
  overflow: hidden !important;
}

.title {
  width: 50%;
  height: 44px;
  position: absolute;
  top: 24px;
  left: 68px;
  overflow: hidden;
}
.title_text {
  font-size: 24px;
  line-height: 24px;
  color: #fff;
  position: absolute;
  z-index: 3;
}
#info {
  position: absolute;
  width: 44px;
  height: 44px;
  z-index: 999;
  top: 14px;
  left: 24px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
#tip {
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 20px;
  width: 392px;
  height: auto;
  border-radius: 2px;
  z-index: 999;
}

.titlepinyin {
  width: 392px;
  height: initial;
}
.title_pinyin {
  display: inline-block;
  text-align: center;
  margin-left: 4px;
}
.title_pinyin h4 {
  font-size: 16px;
}
.title_pinyin h3 {
  font-size: 42px;
}

#tip p {
  margin-left: 4px;
  margin-top: 18px;
  font-size: 24px;
}
.lefttop {
  top: 72px;
  left: 72px;
}

.righttop {
  right: 48px;
  top: 48px;
}

.rightbottom {
  right: 48px;
  bottom: 48px;
}

.leftbottom {
  left: 84px;
  bottom: 48px;
}

.fold-enter-active {
  animation-name: fold-in;
  animation-duration: 0.5s;
}
.fold-leave-active {
  animation-name: fold-out;
  animation-duration: 0.5s;
}
@keyframes fold-in {
  0% {
    transform: translate3d(-100%, 0, 0);
  }

  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-out {
  0% {
    transform: translate3d(0, 0, 0);
  }

  100% {
    transform: translate3d(-100%, 0, 0);
  }
}
.swiper-container {
  width: 100%;
  height: 100%;
}

.weather-bg {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.swiperimg {
  width: auto;
  height: 100%;
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

.swiper-slide {
  height: 100%;
}

img {
  width: 100%;
  height: auto;
}

/deep/ .swiper-pagination-bullet {
  background: rgb(255, 255, 255);
  opacity: 0.3;
}
/deep/ .swiper-pagination-bullet-active {
  background: rgb(255, 255, 255);
  opacity: 0.9;
}

@media screen and (min-width: 813px) and (max-width: 1024px) {
  #tip {
    position: absolute;
    width: 240px;
    padding: 12px;
    height: auto;
    z-index: 999;
  }
  .title_pinyin {
    margin-left: 2px;
  }
  .title_pinyin h4 {
    font-size: 12px;
  }
  .title_pinyin h3 {
    font-size: 32px;
  }
  #tip p {
    margin-top: 6px;
    font-size: 12px;
  }
  .lefttop {
    top: 72px;
    left: 48px;
  }

  .righttop {
    right: 24px;
    top: 24px;
  }

  .rightbottom {
    right: 24px;
    bottom: 24px;
  }

  .leftbottom {
    left: 72px;
    bottom: 30px;
  }

  .swiper-button-next {
    width: 33px;
    height: 33px;
    background-size: 33px;
    right: 12px;
  }

  .swiper-button-prev {
    width: 33px;
    height: 33px;
    background-size: 33px;
    left: 12px;
  }
}

@media screen and (min-width: 480px) and (max-width: 812px) {
  #tip {
    position: absolute;
    width: 240px;
    padding: 6px;
    height: auto;
    z-index: 999;
  }
  .title_pinyin {
    margin-left: 2px;
  }
  .title_pinyin h4 {
    font-size: 8px;
  }
  .title_pinyin h3 {
    font-size: 21px;
  }
  #tip p {
    margin-top: 6px;
    font-size: 12px;
  }
  .lefttop {
    top: 72px;
    left: 48px;
  }

  .righttop {
    right: 24px;
    top: 24px;
  }

  .rightbottom {
    right: 24px;
    bottom: 24px;
  }

  .leftbottom {
    left: 72px;
    bottom: 30px;
  }

  .swiper-button-next {
    width: 33px;
    height: 33px;
    background-size: 33px;
    right: 12px;
  }

  .swiper-button-prev {
    width: 33px;
    height: 33px;
    background-size: 33px;
    left: 12px;
  }
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
