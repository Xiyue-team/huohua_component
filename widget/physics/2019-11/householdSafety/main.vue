<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox" slot-scope="viewBox">
        <div class="title">
          <transition name="fold">
            <div class="title_text" v-if="titleShow">{{title_text}}</div>
          </transition>
        </div>
        <div id="info" :style="`background-image: url(${picinfo})`" @click="openInfo()"></div>
        <div id="container" style="width: 100%; height: 100%;">
          <swiper :options="swiperOption" ref="mySwiper" class="swiper-container">
            <div class="swiper-slide" v-for="item of swiperList" :key="item.id">
              <div class="weather-bg" :style="`background-image: url(${item.bgSrc1})`">
                <div id="tip" :class="item.pos">
                  <p v-html="item.tip.desc"></p>
                </div>
              </div>
            </div>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" :style="`background-image: url(${picleft})`" slot="button-prev"></div>
            <div class="swiper-button-next" :style="`background-image: url(${picright})`" slot="button-next"></div>
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
  text-shadow:3px 2px 3px #000;
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
  cursor: pointer;
}
#tip {
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 20px;
  width: 252px;
  height: auto;
  border-radius: 2px;
  z-index: 999;
}

#tip p {
  font-size: 24px;
  line-height: 32px;
  font-weight: 500;
}
/* v-bind:class */
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
  background-position: center bottom;
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
  border: 2px solid rgba(0,0,0,0.32);
  opacity: 0.3;
}
/deep/ .swiper-pagination-bullet-active {
  background: rgb(255, 255, 255);
  border: 2px solid rgba(0,0,0,0.32);
  opacity: 0.9;
}
@media screen and (min-height: 600px) and (max-height: 800px) {
  #tip {
    position: absolute;
    width: 230px;
    padding: 12px;
    height: auto;
    z-index: 999;
  }

  #tip p {
    font-size: 18px;
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
@media screen and (min-height: 450px) and (max-height: 599px) {
  #tip {
    position: absolute;
    width: 230px;
    padding: 12px;
    height: auto;
    z-index: 999;
  }

  #tip p {
    font-size: 18px;
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

@media screen and (max-height: 449px) {
  #tip {
    position: absolute;
    width: 200px;
    padding: 6px;
    height: auto;
    z-index: 999;
  }

  #tip p {
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
