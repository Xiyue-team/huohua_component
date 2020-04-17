<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">{{title}}</div>
                  <div id="3dContainer"></div>
                  <div class="backgroundStyle">
                      <div class="containerStyle">
                          <div class="coverImage" v-show="isShow"></div>
                          <div class="image_changes" v-show="!isShow">
                              <div class="swiper-container" id="swiper-container">
                                  <div class="swiper-wrapper">
                                      <div class="swiper-slide">
                                          <img :src="imageArray[0]" style="width: 100%; height: 100%" ondragstart="return false"/>
                                          <div class="textStyle">
                                              {{text[0]}}
                                          </div>
                                      </div>
                                      <div class="swiper-slide">
                                          <img :src="imageArray[1]" style="width: 100%; height: 100%" ondragstart="return false"/>
                                          <div class="textStyle">
                                              {{text[1]}}
                                          </div>
                                      </div>
                                      <div class="swiper-slide">
                                          <img :src="imageArray[2]" style="width: 100%; height: 100%" ondragstart="return false"/>
                                          <div class="textStyle">
                                              {{text[2]}}
                                          </div>
                                      </div>
                                      <div class="swiper-slide">
                                          <img :src="imageArray[3]" style="width: 100%; height: 100%" ondragstart="return false"/>
                                          <div class="textStyle">
                                              {{text[3]}}
                                          </div>
                                      </div>
                                      <div class="swiper-slide">
                                          <img :src="imageArray[4]" style="width: 100%; height: 100%" ondragstart="return false"/>
                                          <div class="textStyle">
                                              {{text[4]}}
                                          </div>
                                      </div>
                                      <div class="swiper-slide">
                                          <img :src="imageArray[5]" style="width: 100%; height: 100%" ondragstart="return false"/>
                                          <div class="textStyle">
                                              {{text[5]}}
                                          </div>
                                      </div>
                                      <div class="swiper-slide">
                                          <img :src="imageArray[6]" style="width: 100%; height: 100%" ondragstart="return false"/>
                                          <div class="textStyle" v-bind:class="{'duzhongText': plantActive}">
                                              {{text[6]}}
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="swiper-pagination"></div>
                              <div class="swiper-button-prev btn_left" id="swiper-button-prev" slot="button-prev" v-show="show_arrow">
                                  <img src="./sub_static/prev.png" draggable="false" style="width: 100%;height: 100%">
                              </div>
                              <div class="swiper-button-next  btn_right" id="swiper-button-next" slot="button-next" v-show="show_arrow">
                                  <img src="./sub_static/next.png" draggable="false"  style="width: 100%;height: 100%">
                              </div>
                          </div>
                      </div>
                      <buttonPrimary style="position: absolute; right: 24px; bottom: 142px;border: 1px solid #EBEBEB;" v-bind:title="buttonTitle.animalButton" type="ellipse" v-bind:actived="animalActive" @click.native="animalButton()"></buttonPrimary>
                      <buttonPrimary style="position: absolute; right: 24px; bottom: 84px;border: 1px solid #EBEBEB;" v-bind:title="buttonTitle.plantButton" type="ellipse" v-bind:actived="plantActive" @click.native="plantButton()"></buttonPrimary>
                  </div>

              </template>

              <template slot="controlPanel" slot-scope="controlPanel">
              </template>
          </fullScreensLayout>

  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
import { ViewModel } from './ViewModel';
import Component from 'vue-class-component';
import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';
require('swiper/dist/css/swiper.css');

@Component({
  components: {
    fullScreensLayout, buttonPrimary
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_text{
        font-size: 24px;
        color: #FFFFFF;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
        z-index: 1;
    }
    .backgroundStyle {
        width: 100%;
        height: 100%;
        position: relative;
        top: 0;
        background: url("./sub_static/background.png");
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .containerStyle {
        width: 768px;
        height: 426px;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: scale(1.7);
    }



    .coverImage {
        width: 768px;
        height: 426px;
        background: url("./sub_static/cover.png");
        background-size: 100% 100%;
    }

    .swiper-container {
        width: 768px;
        height: 426px;
    }

    .swiper-wrapper {
        width: 768px;
        height: 426px;
    }

    .swiper-pagination {
        width: 100%;
        margin-top: 25px;
    }

    .swiper-pagination >>> .swiper-pagination-bullet {
        background: #fff !important;
        opacity: 1 !important;
        outline: 0 none !important;
        margin-right: 10px;
        blr: expression(this.onFocus=this.blur());
    }

    .swiper-pagination >>> .swiper-pagination-bullet-active {
        opacity: 1 !important;
        background: #007aff !important;
        width: 30px;
        height: 8px;
        display: inline-block;
        border-radius: 8px;
        outline: 0 none !important;
        blr: expression(this.onFocus=this.blur());
    }

    .swiper-button-next {
        border: none;
        display: none;
        outline: 0 none !important;
        blr: expression(this.onFocus=this.blur());
        margin-top: auto !important;
    }

    .swiper-button-prev {
        border: none;
        display: none;
        outline: 0 none !important;
        blr: expression(this.onFocus=this.blur());
        margin-top: auto !important;
    }

    .btn_left {
        position: absolute;
        background-image: none;
        display: block;
        border: none;
        width: 44px;
        height: 44px;
        top: calc(50% - 22px);
        left: 16px;
    }

    .btn_right {
        background-image: none;
        display: block;
        border: none;
        width: 44px;
        height: 44px;
        position: absolute;
        top: calc(50% - 22px);
        right: 16px;
    }
    .image_changes {
        position: absolute;
        width: 768px;
        height: 426px;
        top: calc(50% - 213px);
        left: calc(50% - 384px);
    }
    .textStyle {
        font-size: 18px;
        color: #FFFFFF;
        height: 92px;
        position: absolute;
        bottom: 0px;
        padding: 20px 77px;
        box-sizing: border-box;
    }
    .duzhongText {
        line-height: 46px;
    }

</style>
<style>

</style>
