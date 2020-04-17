<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div id="Container" style="width: 100%; height: 100%;">
          <div id="Container3d">
            <canvas
              id="renderCanvas"
              touch-action="none"
              width="1920"
              height="1080"
              tabindex="1"
              style="opacity: 1;"
            ></canvas>
          </div>
          <div id="msg" v-html="msg"></div>
          <div id="label" :style="`background-image: url(${label})`"></div>
          <div id="Container3dR">
            <div class="SwiperTop">{{title_text}}</div>
            <div class="SwiperParent">
              <div class="SwiperCell">
                <swiper :options="swiperOption" ref="mySwiper" class="swiper-container">
                  <div class="swiper-slide" v-for="item of swiperList" :key="item.id">
                    <div class="weather-bg" :style="`background-image: url(${item.bgSrc})`"  @click="picClick(item.id)">
                      <div id="tip" v-html="item.tip">
                      </div>
                    </div>
                  </div>
                </swiper>
              </div>
            </div>
            <div class="SwiperBottom">
              <div class="buttonG">
                <div class="button_style" @click="ButtonEvent(1)">
                  <buttonPrimary
                    style="width: 100%"
                    v-bind:title="buttonTitle[0]"
                    v-bind:actived="finalFuncActived===1"
                    type="ellipse"
                  ></buttonPrimary>
                </div>
                <div class="dropDown" @click="ButtonEvent(2)">
                  <buttonPrimary
                    style="width: 100%"
                    v-bind:title="buttonTitle[1]"
                    v-bind:actived="finalFuncActived===2"
                    type="ellipse"
                  ></buttonPrimary>
                </div>
              </div>
            </div>
          </div>
          <transition name="fade">
            <div v-if="showBG" class="alertphoto" @click="showEvent()">
             <div class="bg" :style="`background-image: url(${bg})`">
              </div>
            </div>
          </transition>
        </div>
      </template>
      <template slot="controlPanel">
        <div id="controlPanel"></div>
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

  import 'swiper/dist/css/swiper.css';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  @Component({
    components: {
      fullScreensLayout,
      buttonPrimary,
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
#renderCanvas {
  width: 100%;
  height: 100%;
  outline: 0;
}

#back {
  width: 60px;
  height: 60px;
  position: absolute;
  right: 12px;
  top: 12px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 999;
}

#Container {
  background-color: #f6f8fd;
}
.alertphoto{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f6f8fd;
  z-index: 999;
}
.bg {
  position: absolute;
  width: 70%;
  height: 70%;
  left: 15%;
  top: 15%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 6px;
  pointer-events:stroke;
}

#Container3d {
  position: absolute;
  width: 70%;
  height: 100%;
}

#Container3dR {
  position: absolute;
  width: 30%;
  height: 100%;
  right: 0;
}

.SwiperParent {
  position: absolute;
  top: 88px;
  bottom: 96px;
  width: 100%;
}

.SwiperCell {
  width: 100%;
  height: 100%;
}

.SwiperTop {
  font-size: 24px;
  line-height: 88px;
  padding-left: 24px;
  width: 100%;
  height: 88px;
  position: absolute;
}

.SwiperBottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 96px;
}

.buttonG {
  position: absolute;
  width: 200px;
  height: 42px;
  bottom: 36px;
  left: 50%;
}
.button_style {
  float: left;
  width: 88px;
  height: 42px;
  margin-left: -100px;
}

.dropDown {
  width: 88px;
  float: left;
  height: 42px;
  margin-left: 12px;
}
#msg {
  position: absolute;
  background: rgba(255,255,255,0.80);
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
  border-radius: 4px;
  font-size: 16px;
  text-align: center;
  color: #F82B2B;
  line-height: 16px;
  padding: 8px;
  width: auto;
  height: auto;
  z-index: 997;
  pointer-events: none;
}

.swiper-slide >>> .weather-bg #tip {
  position: absolute;
  background: rgba(0, 0, 0, 0.24);
  color: #fff;
  bottom: 0;
  padding-left: 2%;
  width: 98%;
  height: 28px;
  z-index: 999;
  font-style: bold;
  border-radius: 0px 0px 5px 5px;
  line-height: 28px;
  font-size: 18px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.50);
}

.swiper-slide-active >>> .weather-bg #tip {
  position: absolute;
  background: rgba(0, 0, 0, 0.24);
  color: #fff;
  bottom: 0;
  padding-left: 2%;
  width: 98%;
  height: 42px;
  z-index: 999;
  font-style: bold;
  border-radius: 0px 0px 5px 5px;
  line-height: 42px;
  font-size: 22px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.50);
}

.swiper-container {
  width: 100%;
  height: 100%;
  /* pointer-events: none; */
}

.swiper-slide>>>.weather-bg {
  position: absolute;
  width: 60%;
  height: 60%;
  left: 20%;
  top: 20%;
  border-radius: 5px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.swiper-slide {
  margin-left: 5%;
  width: 90%;
  height: 100%;
}
.swiper-slide-active>>> .weather-bg{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.42);
}
#label {
  position: absolute;
  width: 86px;
  height: 141px;
  top: 24px;
  left: 24px;
  margin-right: 24px;
  border-radius: 5px;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: top right;
  background-size: contain;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
}
@media screen and (min-height: 600px) and (max-height: 800px) {
  .SwiperTop {
    font-size: 18px;
    line-height: 72px;
    padding-left: 8px;
    text-align: left;
    height: 72px;
  }
}

@media screen and (min-height: 450px) and (max-height: 599px) {
  .SwiperTop {
    font-size: 14px;
    line-height: 72px;
    padding-left: 8px;
    text-align: left;
    height: 72px;
  }
   .SwiperParent {
    top: 72px;
  }

  #label {
    width: 62px;
    height: 94px;
    top: 12px;
    left: 12px;
  }

  .swiper-slide >>> .weather-bg #tip {
    height: 24px;
    line-height: 24px;
    font-size: 14px;
  }

  .swiper-slide-active >>> .weather-bg #tip {
    height: 36px;
    line-height: 36px;
    font-size: 18px;
  }
}

@media screen and (min-height: 300px) and (max-height: 449px) {
  #Container3d {
    width: 65%;
    height: 100%;
  }

  #Container3dR {
    width: 35%;
    height: 100%;
    right: 0;
  }
    #label {
    width: 54px;
    height: 80px;
    top: 12px;
    left: 12px;
    margin-right: 24px;
    border-radius: 5px;
  }
  .SwiperParent {
    top: 72px;
    bottom: 56px;
    width: 100%;
  }
  .SwiperTop {
    font-size: 14px;
    line-height: 72px;
    padding-left: 8px;
      text-align: left;
    height: 72px;
  }
  .SwiperBottom {
    bottom: 0;
    width: 100%;
    height: 56px;
  }
  .buttonG {
    width: 132px;
    height: 28px;
    bottom: 18px;
    left: 50%;
  }
  .button_style {
    width: 60px;
    height: 28px;
    margin-left: -66px;
  }

  .dropDown {
    width: 60px;
    height: 28px;
    margin-left: 6px;
  }
#msg {
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
  border-radius: 4px;
  font-size: 12px;
  line-height: 12px;
  padding: 4px;
}

  .swiper-slide >>> .weather-bg #tip {
    height: 16px;
    line-height: 16px;
    font-size: 10px;
  }

  .swiper-slide-active >>> .weather-bg #tip {
    height: 24px;
    line-height: 24px;
    font-size: 14px;
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
