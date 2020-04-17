<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">{{lang.title}}</div>
                  <div id="3dContainer"></div>
                  <div class="video_changes">
                      <div class="swiper-container swiper-no-swiping" id="swiper-container">
                          <div class="swiper-wrapper">
                              <div class="swiper-slide">
                                  <img src="./sub_static/background.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                              </div>
                              <div class="swiper-slide">
                                  <div class="videoBox">
                                      <video id="windVideo1" class="video-js VideoStyle vjs-default-skin vjs-big-play-none"
                                             x-webkit-airplay="true"
                                             preload="auto"
                                             x5-playsinline playsinline
                                             webkit-playsinline
                                             x5-video-player-type="h5"
                                             x5-video-player-fullscreen="true"
                                             x5-video-orientation="landscape"
                                             ref="icon"
                                             :poster="video_poster[0]"
                                             style="object-fit:fill">
                                          <source id="sourceId1" ref="icon" src="./sub_static/energy_video/energy_one.mp4" type="video/mp4">
                                      </video>
                                      <div class="tipsContainer">
                                          <div class="convert_tip" @click="video_convert_tip(0)">
                                              <img src="./sub_static/convert.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                                          </div>
                                          <div class="tips_textContainer" v-show="show_tips_text[0].show_text">
                                              <div class="left_tip_text">{{lang.energy_left_tip_texts[0]}}</div>
                                              <div>
                                                  <div class="center_tip_text">
                                                      {{lang.energy_center_tip_texts[0]}}
                                                  </div>
                                                  <div class="text_arrow">
                                                      <img src="./sub_static/arrow.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                                                  </div>
                                              </div>
                                              <div class="right_tip_text">{{lang.energy_right_tip_texts[0]}}</div>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              <div class="swiper-slide">
                                  <div class="videoBox">
                                      <video id="windVideo2" class="video-js VideoStyle vjs-default-skin vjs-big-play-none"
                                             x-webkit-airplay="true"
                                             preload="auto"
                                             x5-playsinline playsinline
                                             webkit-playsinline
                                             x5-video-player-type="h5"
                                             x5-video-player-fullscreen="true"
                                             x5-video-orientation="landscape"
                                             ref="icon"
                                             :poster="video_poster[1]"
                                             style="object-fit:fill">
                                          <source id="sourceId2" ref="icon" src="./sub_static/energy_video/energy_two.mp4" type="video/mp4">
                                      </video>
                                      <div class="tipsContainer">
                                          <div class="convert_tip" @click="video_convert_tip(1)">
                                              <img src="./sub_static/convert.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                                          </div>
                                          <div class="tips_textContainer" v-show="show_tips_text[1].show_text">
                                              <div class="left_tip_text">{{lang.energy_left_tip_texts[1]}}</div>
                                              <div>
                                                  <div class="center_tip_text">
                                                      {{lang.energy_center_tip_texts[1]}}
                                                  </div>
                                                  <div class="text_arrow">
                                                      <img src="./sub_static/arrow.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                                                  </div>
                                              </div>
                                              <div class="right_tip_text">{{lang.energy_right_tip_texts[1]}}</div>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              <div class="swiper-slide">
                                  <div class="videoBox">
                                      <video id="windVideo3" class="video-js VideoStyle vjs-default-skin vjs-big-play-none"
                                             x-webkit-airplay="true"
                                             preload="auto"
                                             x5-playsinline playsinline
                                             webkit-playsinline
                                             x5-video-player-type="h5"
                                             x5-video-player-fullscreen="true"
                                             x5-video-orientation="landscape"
                                             ref="icon"
                                             :poster="video_poster[2]"
                                             style="object-fit:fill">
                                          <source id="sourceId3" ref="icon" src="./sub_static/energy_video/energy_three.mp4" type="video/mp4">
                                      </video>
                                      <div class="tipsContainer">
                                          <div class="convert_tip" @click="video_convert_tip(2)">
                                              <img src="./sub_static/convert.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                                          </div>
                                          <div class="tips_textContainer" v-show="show_tips_text[2].show_text">
                                              <div class="left_tip_text">{{lang.energy_left_tip_texts[2]}}</div>
                                              <div>
                                                  <div class="center_tip_text">
                                                      {{lang.energy_center_tip_texts[2]}}
                                                  </div>
                                                  <div class="text_arrow">
                                                      <img src="./sub_static/arrow.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                                                  </div>
                                              </div>
                                              <div class="right_tip_text">{{lang.energy_right_tip_texts[2]}}</div>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              <div class="swiper-slide">
                                  <div class="videoBox">
                                      <video id="windVideo4" class="video-js VideoStyle vjs-default-skin vjs-big-play-none"
                                             x-webkit-airplay="true"
                                             preload="auto"
                                             x5-playsinline playsinline
                                             webkit-playsinline
                                             x5-video-player-type="h5"
                                             x5-video-player-fullscreen="true"
                                             x5-video-orientation="landscape"
                                             ref="icon"
                                             :poster="video_poster[3]"
                                             style="object-fit:fill">
                                          <source id="sourceId4" ref="icon" src="./sub_static/energy_video/energy_four.mp4" type="video/mp4">
                                      </video>
                                      <div class="tipsContainer">
                                          <div class="convert_tip" @click="video_convert_tip(3)">
                                              <img src="./sub_static/convert.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                                          </div>
                                          <div class="tips_textContainer" v-show="show_tips_text[3].show_text">
                                              <div class="left_tip_text">{{lang.energy_left_tip_texts[3]}}</div>
                                              <div>
                                                  <div class="center_tip_text">
                                                      {{lang.energy_center_tip_texts[3]}}
                                                  </div>
                                                  <div class="text_arrow">
                                                      <img src="./sub_static/arrow.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                                                  </div>
                                              </div>
                                              <div class="right_tip_text">{{lang.energy_right_tip_texts[3]}}</div>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              <div class="swiper-slide">
                                  <div class="videoBox">
                                      <video id="windVideo5" class="video-js VideoStyle vjs-default-skin vjs-big-play-none"
                                             x-webkit-airplay="true"
                                             preload="auto"
                                             x5-playsinline playsinline
                                             webkit-playsinline
                                             x5-video-player-type="h5"
                                             x5-video-player-fullscreen="true"
                                             x5-video-orientation="landscape"
                                             ref="icon"
                                             :poster="video_poster[4]"
                                             style="object-fit:fill">
                                          <source id="sourceId5" ref="icon" src="./sub_static/energy_video/energy_five.mp4" type="video/mp4">
                                      </video>
                                      <div class="tipsContainer">
                                          <div class="convert_tip" @click="video_convert_tip(4)">
                                              <img src="./sub_static/convert.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                                          </div>
                                          <div class="tips_textContainer" v-show="show_tips_text[4].show_text">
                                              <div class="left_tip_text">{{lang.energy_left_tip_texts[4]}}</div>
                                              <div>
                                                  <div class="center_tip_text">
                                                      {{lang.energy_center_tip_texts[4]}}
                                                  </div>
                                                  <div class="text_arrow">
                                                      <img src="./sub_static/arrow.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                                                  </div>
                                              </div>
                                              <div class="right_tip_text">{{lang.energy_right_tip_texts[4]}}</div>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              <div class="swiper-slide">
                                  <div class="videoBox">
                                      <video id="windVideo6" class="video-js VideoStyle vjs-default-skin vjs-big-play-none"
                                             x-webkit-airplay="true"
                                             preload="metadata"
                                             x5-playsinline playsinline
                                             webkit-playsinline
                                             x5-video-player-type="h5"
                                             x5-video-player-fullscreen="true"
                                             x5-video-orientation="landscape"
                                             ref="icon"
                                             :poster="video_poster[5]"
                                             style="object-fit:fill">
                                          <source id="sourceId6" ref="icon" src="./sub_static/energy_video/energy_six.mp4" type="video/mp4">
                                      </video>
                                      <div class="tipsContainer">
                                          <div class="convert_tip" @click="video_convert_tip(5)">
                                              <img src="./sub_static/convert.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                                          </div>
                                          <div class="tips_textContainer" v-show="show_tips_text[5].show_text">
                                              <div class="left_tip_text">{{lang.energy_left_tip_texts[5]}}</div>
                                              <div>
                                                  <div class="center_tip_text">
                                                      {{lang.energy_center_tip_texts[5]}}
                                                  </div>
                                                  <div class="text_arrow">
                                                      <img src="./sub_static/arrow.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                                                  </div>
                                              </div>
                                              <div class="right_tip_text">{{lang.energy_right_tip_texts[5]}}</div>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              <div class="swiper-slide">
                                  <img src="./sub_static/end.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                                  <div class="energy_one_text_desc">
                                      {{lang.energy_text[0]}}
                                  </div>
                                  <div class="energy_two_text_desc">
                                      {{lang.energy_text[1]}}
                                  </div>
                                  <div class="energy_three_text_desc">
                                      {{lang.energy_text[2]}}
                                  </div>
                                  <div class="energy_four_text_desc">
                                      {{lang.energy_text[3]}}
                                  </div>
                                  <div class="energy_five_text_desc">
                                      {{lang.energy_text[4]}}
                                  </div>
                                  <div class="energy_six_text_desc">
                                      {{lang.energy_text[5]}}
                                  </div>
                                  <div class="energy_seven_text_desc">
                                      {{lang.energy_text[6]}}
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="swiper-button-prev btn_left" id="swiper-button-prev" slot="button-prev" v-show="show_left">
                          <img src="./sub_static/leftArrow.png" style="width: 100%;height: 100%" ondragstart="return false">
                      </div>
                      <div class="swiper-button-next btn_right" id="swiper-button-next" slot="button-next" v-show="show_right">
                          <img src="./sub_static/rightArrow.png" style="width: 100%;height: 100%" ondragstart="return false">
                      </div>
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
require('./sub_static/video-js.css');
require('swiper/dist/css/swiper.css');

@Component({
  components: {
    fullScreensLayout
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_text {
        font-size: 28px;
        color: #000000;
        line-height: 28px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
        transform-origin: left top;
        z-index: 8;
    }

    .videoBox, .imageBox {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 7;
    }

    .VideoStyle {
        width: 100%;
        height: 100%;
    }

    .video_changes {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 7;
    }

    .swiper-container {
        width: 100%;
        height: 100%;
    }

    .swiper-wrapper {
        width: 100%;
        height: 100%;
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
        width: 72px;
        height: 72px;
        top: calc(50% - 36px);
        left: 12px;
    }

    .btn_right {
        background-image: none;
        display: block;
        border: none;
        width: 72px;
        height: 72px;
        position: absolute;
        top: calc(50% - 36px);
        right: 12px;
    }

    .convert_tip {
        width: 60px;
        height: 60px;
        cursor: pointer;
    }

    .left_tip_text {
        position: relative;
        font-size: 18px;
        color: #F57419;
        white-space: pre-line;
    }

    .center_tip_text {
        font-size: 16px;
        color: #F57419;
    }

    .right_tip_text {
        font-size: 18px;
        color: #F57419;
        white-space: pre-line;
    }

    .text_arrow {
        width: 181px;
    }

    .tipsContainer {
        width: 380px;
        height: 186px;
        position: absolute;
        top: 68.3%;
        left: 28.5%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        transform-origin: left top;
        z-index: 8;
    }

    .tips_textContainer {
        background: #FFFFFF;
        width: 380px;
        height: 108px;
        margin-top: 18px;
        display: flex;
        flex-direction:row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        border: 2px solid rgba(0,0,0,0.08);
        border-radius: 4px;
        padding-left: 16px;
        padding-right: 16px;
    }

    .energy_one_text_desc {
        position: absolute;
        color: #000000;
        left: 9.4%;
        top: 14%;
        font-weight: bold;
        font-size: 28px;
        text-align: center;
    }

    .energy_two_text_desc {
        position: absolute;
        color: #000000;
        left: 16.5%;
        top: 63%;
        font-weight: bold;
        font-size: 28px;
        text-align: center;
    }

    .energy_three_text_desc {
        position: absolute;
        color: #000000;
        left: 35.2%;
        top: 55.3%;
        font-weight: bold;
        font-size: 28px;
        text-align: center;
    }

    .energy_four_text_desc {
        position: absolute;
        color: #000000;
        left: 46.7%;
        top: 79.1%;
        font-weight: bold;
        font-size: 28px;
        text-align: center;
    }

    .energy_five_text_desc {
        position: absolute;
        color: #000000;
        left: 64.7%;
        top: 73.6%;
        font-weight: bold;
        font-size: 28px;
        text-align: center;
    }

    .energy_six_text_desc {
        position: absolute;
        color: #000000;
        left: 83.8%;
        top: 59.6%;
        font-weight: bold;
        font-size: 28px;
        text-align: center;
    }

    .energy_seven_text_desc {
        position: absolute;
        color: #000000;
        left: 70%;
        top: 44.8%;
        font-weight: bold;
        font-size: 28px;
        text-align: center;
    }

    @media screen and (min-width: 1320px) {
        .btn_left {
            transform-origin: left center;
            transform: scale(1.1);
        }

        .btn_right {
            transform-origin: right center;
            transform: scale(1.1);
        }

        .energy_one_text_desc, .energy_two_text_desc, .energy_three_text_desc,
        .energy_four_text_desc, .energy_five_text_desc, .energy_six_text_desc, .energy_seven_text_desc{
            transform-origin: left top;
            transform: scale(1);
        }
    }

    @media screen and (min-width: 1200px) and (max-width: 1320px) {
        .btn_left {
            transform-origin: left center;
            transform: scale(1);
        }

        .btn_right {
            transform-origin: right center;
            transform: scale(1);
        }

        .energy_one_text_desc, .energy_two_text_desc, .energy_three_text_desc,
        .energy_four_text_desc, .energy_five_text_desc, .energy_six_text_desc, .energy_seven_text_desc{
            transform-origin: left top;
            transform: scale(0.8);
        }
    }

    @media screen and (min-width: 875px) and (max-width: 1200px) {
        .btn_left {
            transform-origin: left center;
            transform: scale(0.8);
        }

        .btn_right {
            transform-origin: right center;
            transform: scale(0.8);
        }

        .energy_one_text_desc, .energy_two_text_desc, .energy_three_text_desc,
        .energy_four_text_desc, .energy_five_text_desc, .energy_six_text_desc, .energy_seven_text_desc{
            transform-origin: left top;
            transform: scale(0.6);
        }
    }

    @media screen and (min-width: 740px) and (max-width: 875px) {
        .btn_left {
            transform-origin: left center;
            transform: scale(0.6);
        }

        .btn_right {
            transform-origin: right center;
            transform: scale(0.6);
        }

        .energy_one_text_desc, .energy_two_text_desc, .energy_three_text_desc,
        .energy_four_text_desc, .energy_five_text_desc, .energy_six_text_desc, .energy_seven_text_desc{
            transform-origin: left top;
            transform: scale(0.5);
        }
    }

    @media screen and (max-width: 740px) {
        .btn_left {
            transform-origin: left center;
            transform: scale(0.5);
        }

        .btn_right {
            transform-origin: right center;
            transform: scale(0.5);
        }

        .energy_one_text_desc, .energy_two_text_desc, .energy_three_text_desc,
        .energy_four_text_desc, .energy_five_text_desc, .energy_six_text_desc, .energy_seven_text_desc{
            transform-origin: left top;
            transform: scale(0.4);
        }
    }
</style>
