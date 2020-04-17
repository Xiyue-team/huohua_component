<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">{{lang.title}}</div>
                  <div id="3dContainer"></div>
                  <div class="backgroundStyle">
                      <div class="bg_line_one" v-show="show_label_one"></div>
                      <div class="epiglottis_class" v-show="show_label_one">
                          {{lang.epiglottis_title}}
                      </div>
                      <div class="thyroid_cartilage_class" v-show="show_label_one">
                          {{lang.thyroid_cartilage_title}}
                      </div>
                      <div class="cyclic_cartilage_class" v-show="show_label_one">
                          {{lang.cyclic_cartilage_title}}
                      </div>
                      <div class="trachea_class" v-show="show_label_one">
                          {{lang.trachea_title}}
                      </div>
                      <div class="soft_palate_class" v-show="show_label_one">
                          {{lang.soft_palate_title}}
                      </div>
                      <div class="throat_class" v-show="show_label_one">
                          {{lang.throat_title}}
                      </div>
                      <div class="vocal_cord_class" v-show="show_label_one">
                          {{lang.vocal_cord_title}}
                      </div>
                      <div class="esophagus_class" v-show="show_label_one">
                          {{lang.esophagus_title}}
                      </div>
                      <div class="videoBox_one" v-show="activeVideo_one">
                          <video id="my-video1" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                 x-webkit-airplay="allow"
                                 preload="auto"
                                 x5-playsinline="true"
                                 playsinline="true"
                                 webkit-playsinline="true"
                                 x5-video-player-type="h5"
                                 x5-video-player-fullscreen="true"
                                 x5-video-orientation="landscape"
                                 ref="icon"
                                 style="border-radius:8px;object-fit:fill">
                              <source id="sourceId1" ref="icon" src="./sub_static/video/throat.mp4" type="video/mp4">
                          </video>
                          <div class="video_text_one">
                              {{lang.video_text_one_title}}
                          </div>
                      </div>

                      <div class="throat_bg_class" v-show="show_throat_bg">
                          <div class="cancel_class" @click="cancelEvent()" v-show="showCancelImg">
                              <img src="./sub_static/cancel.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                          </div>
                          <div class="bg_line_two" v-show="show_label_two"></div>
                          <div class="vocal_cord_two_class" v-show="show_label_two">
                              {{lang.vocal_cord_title}}
                          </div>

                          <div class="tongue_class" v-show="show_label_two">
                              {{lang.tongue_title}}
                          </div>

                          <div class="epiglottis_two_class" v-show="show_label_two">
                              {{lang.epiglottis_two_title}}
                          </div>

                          <div class="trachea_two_class" v-show="show_label_two">
                              {{lang.trachea_title}}
                          </div>
`
                          <div class="videoBox_two" v-show="activeVideo_two">
                              <video id="my-video2" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                     x-webkit-airplay="true"
                                     preload="auto"
                                     x5-playsinline
                                     playsinline
                                     webkit-playsinline
                                     ref="icon"
                                     style="border-radius: 8px; object-fit: fill">
                                  <source id="sourceId2" ref="icon" src="./sub_static/video/throat_voice.mp4" type="video/mp4">
                              </video>
                              <div class="video_text_two" v-show="throat_voice_text_show">
                                  {{lang.video_text_two_title}}
                              </div>
                          </div>

                          <div class="play_button" @click="playVideoEvent()" v-show="showPlayButton">
                              <img src="./sub_static/play.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                          </div>
                      </div>
                  </div>
                  <div class="right_buttons">
                      <div class="epiglottisStyle" @click="epiglottisEvent()">
                          <buttonPrimary v-bind:title="lang.epiglottis_button_title" type="ellipse" v-bind:actived="epiglottisColor" style="border: 1px solid #EBEBEB; width: 140px;
"></buttonPrimary>
                      </div>
                      <div class="voiceStyle" @click="voiceEvent()">
                          <buttonPrimary v-bind:title="lang.voice_button_title" type="ellipse" v-bind:actived="voiceColor" style="border: 1px solid #EBEBEB; width: 140px;
"></buttonPrimary>
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
import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';
require('./sub_static/video-js.css');

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
        z-index: 8;
    }

    .backgroundStyle {
        width: 100%;
        height: 100%;
        position: absolute;
        background: url("./sub_static/background.png");
        background-size: 100% 100%;
        z-index: 1;
    }

    .bg_line_one {
        width: 100%;
        height: 100%;
        position: absolute;
        background: url("./sub_static/lineOne.png");
        background-size: 100% 100%;
        z-index: 3;
    }

    .epiglottis_class, .thyroid_cartilage_class, .cyclic_cartilage_class, .trachea_class,
    .soft_palate_class, .throat_class, .vocal_cord_class, .esophagus_class {
        position: absolute;
        font-size: 32px;
        color: #FFFFFF;
        z-index: 3;
    }

    .epiglottis_class {
        top: 39.4%;
        left: 19.8%;
    }

    .thyroid_cartilage_class {
        top: 49.3%;
        left: 19.8%;
    }

    .cyclic_cartilage_class {
        top: 73.3%;
        left: 32.4%;
    }

    .trachea_class {
        top: 84.2%;
        left: 36%;
    }

    .soft_palate_class {
        top: 42.5%;
        right: 21.7%;
    }

    .throat_class {
        top: 59.7%;
        right: 23.4%;
    }

    .vocal_cord_class {
        top: 67.2%;
        right: 21.7%;
    }

    .esophagus_class {
        top: 75%;
        right: 21.7%;
    }

    /*视频的样式*/
    .videoBox_one {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        overflow: hidden;
        z-index: 2;
    }

    .myVideo {
        width: 100%;
        height:100%;
    }

    .video_text_one, .video_text_two {
        width: 100%;
        position: absolute;
        bottom: 4.3%;
        text-align: center;
        line-height: 29px;
        font-size: 32px;
        color: #FFFFFF;
    }

    .throat_bg_class {
        position: relative;
        background: url("./sub_static/throat_bg.png");
        background-size: 100% 100%;
        width: 1135.8px;
        height: 840px;
        left: calc(50% - 568.9px);
        top: calc(50% - 420px);
        border: 2px solid #FFFFFF;
        border-radius: 8px;
        z-index: 5;
    }

    .cancel_class {
        position: absolute;
        width: 114px;
        height: 55.5px;
        right: -114px;
        top: 10%;
        z-index: 8;
        cursor: pointer;
    }

    .bg_line_two {
        position: absolute;
        background: url("./sub_static/lineTwo.png");
        background-size: 100% 100%;
        width: 1135.8px;
        height: 840px;
        left: calc(50% - 568.9px);
        top: calc(50% - 420px);
        z-index: 7;
    }

    .vocal_cord_two_class {
        position: absolute;
        top: 39.5%;
        left: 10.7%;
        font-size: 32px;
        color: #FFFFFF;
        z-index: 7;
    }

    .tongue_class {
        position: absolute;
        top: 7.1%;
        right: 19.9%;
        font-size: 32px;
        color: #FFFFFF;
        z-index: 7;
    }

    .epiglottis_two_class {
        position: absolute;
        top: 23.5%;
        right: 11.1%;
        font-size: 32px;
        color: #FFFFFF;
        z-index: 7;
    }

    .trachea_two_class {
        position: absolute;
        top: 54.4%;
        right: 8.7%;
        font-size: 32px;
        color: #FFFFFF;
        z-index: 7;
    }

    .videoBox_two {
        position: absolute;
        width: 100%;
        height: 100%;
        left: calc(50% - 569.9px);
        top: calc(50% - 422px);
        border-radius: 8px;
        border: 2px solid #ffffff;
        overflow: hidden;
        z-index: 6;
    }

    .play_button {
        position: absolute;
        width: 84px;
        height: 84px;
        bottom: 11.4%;
        right: 6.4%;
        z-index: 8;
        cursor: pointer;
    }

    .right_buttons {
        position: absolute;
        right: 24px;
        bottom: 10.8%;
        width: 140px;
        z-index: 9;
    }

    .voiceStyle {
        position: relative;
        margin-top: 20px;
    }

    @media screen and (min-width: 1320px) {
        .throat_bg_class {
            transform-origin: center;
            transform: scale(1.05);
        }
    }


    @media screen and (min-width: 1060px) and (max-width: 1300px) {
        .epiglottis_class, .thyroid_cartilage_class, .cyclic_cartilage_class, .trachea_class,
        .soft_palate_class, .throat_class, .vocal_cord_class, .esophagus_class, .video_text_one{
            transform-origin: center;
            transform: scale(1.2);
            font-size: 18px;
        }

        .throat_bg_class {
            transform-origin: center;
            transform: scale(0.8);
        }

        .video_text_two {
            font-size: 32px;
        }

        .right_buttons {
            transform-origin: center;
            transform: scale(0.7);
            bottom: 5%;
            right: -12px;
        }
    }

    @media screen and (min-width: 875px) and (max-width: 1050px) {
        .epiglottis_class, .thyroid_cartilage_class, .cyclic_cartilage_class, .trachea_class,
        .soft_palate_class, .throat_class, .vocal_cord_class, .esophagus_class, .video_text_one{
            transform-origin: center;
            transform: scale(1.2);
            font-size: 18px;
        }

        .throat_bg_class {
            transform-origin: center;
            transform: scale(0.69);
        }

        .video_text_two {
            font-size: 32px;
        }

        .right_buttons {
            transform-origin: center;
            transform: scale(0.7);
            bottom: 5%;
            right: -12px;
        }
    }

    @media screen and (min-width: 750px) and (max-width: 875px) {
        .epiglottis_class, .thyroid_cartilage_class, .cyclic_cartilage_class, .trachea_class,
        .soft_palate_class, .throat_class, .vocal_cord_class, .esophagus_class, .video_text_one{
            transform-origin: center;
            transform: scale(1.2);
            font-size: 14px;
        }

        .throat_bg_class {
            transform-origin: center;
            transform: scale(0.5);
        }

        .video_text_two {
            font-size: 32px;
        }

        .right_buttons {
            transform-origin: center;
            transform: scale(0.7);
            bottom: 5%;
            right: -12px;
        }
    }

    @media screen and (min-width: 640px) and (max-width: 740px) {
        .epiglottis_class, .thyroid_cartilage_class, .cyclic_cartilage_class, .trachea_class,
        .soft_palate_class, .throat_class, .vocal_cord_class, .esophagus_class, .video_text_one{
            transform-origin: center;
            transform: scale(1.1);
            font-size: 12px;
        }

        .throat_bg_class {
            transform-origin: center;
            transform: scale(0.35);
        }

        .video_text_two {
            font-size: 32px;
        }

        .right_buttons {
            transform-origin: center;
            transform: scale(0.5);
            bottom: 4%;
            right: -12px;
        }
    }

    /*华为荣耀10 和小米5X*/
    @media screen and (max-height: 360px) {
        .epiglottis_class, .thyroid_cartilage_class, .cyclic_cartilage_class, .trachea_class,
        .soft_palate_class, .throat_class, .vocal_cord_class, .esophagus_class, .video_text_one{
            transform-origin: center;
            transform: scale(0.6);
            font-size: 16px;
        }

        .throat_bg_class {
            transform-origin: center;
            transform: scale(0.35);
        }

        .video_text_two {
            font-size: 32px;
        }

        .right_buttons {
            transform-origin: center;
            transform: scale(0.5);
            bottom: 4%;
            right: -10px;
        }
    }
</style>


