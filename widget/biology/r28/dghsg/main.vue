<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">{{lang.title}}</div>
                  <div id="3dContainer"></div>
                  <div class="backgroundStyle">
                      <div class="originalImg" v-show="show_originalImg">
                      </div>
                      <div class="bg_line" v-show="show_label_one">
                      </div>
                      <div class="bark_class" v-show="show_label_one">
                          {{lang.bark_title}}
                      </div>
                      <div class="phloem_class" v-show="show_label_one">
                          {{lang.phloem_title}}
                      </div>
                      <div class="cambium_class" v-show="show_label_one">
                          {{lang.cambium_title}}
                      </div>
                      <div class="xylem_class" v-show="show_label_one">
                          {{lang.xylem_title}}
                      </div>
                      <div class="marrow_class" v-show="show_label_one">
                          {{lang.marrow_title}}
                      </div>
                      <div class="videoBox" v-show="activeVideo_one">
                          <video id="my-video1" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                 x-webkit-airplay="true"
                                 preload="auto"
                                 x5-playsinline
                                 playsinline
                                 webkit-playsinline
                                 data-setup="{}"
                                 ref="icon"
                                 x5-video-player-type="h5"
                                 x5-video-player-fullscreen="true"
                                 x5-video-orientation="landscape"
                                 style="object-fit: fill">
                              <source id="sourceId1" ref="icon" src="./sub_static/video/catheter.mp4" type="video/mp4">
                          </video>
                          <div class="video_tip_class">
                              <img src="./sub_static/video/video_one_tip.png" style="position: relative; width: 13px; height: 13px;"/>
                              <span style="position: relative; margin-left: 13px; color: #ffffff; font-size: 18px;">
                                  {{lang.video_one_tip}}
                              </span>
                          </div>
                      </div>

                      <div class="videoBox" v-show="activeVideo_two">
                          <video id="my-video2" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                 x-webkit-airplay="true"
                                 preload="auto"
                                 x5-playsinline
                                 playsinline
                                 webkit-playsinline
                                 data-setup="{}"
                                 ref="icon"
                                 x5-video-player-type="h5"
                                 x5-video-player-fullscreen="true"
                                 x5-video-orientation="landscape"
                                 style="object-fit: fill">
                              <source id="sourceId2" ref="icon" src="./sub_static/video/sieve_tube.mp4" type="video/mp4">
                          </video>
                          <div class="video_tip_class">
                              <img src="./sub_static/video/video_two_tip.png" style="position: relative; width: 13px; height: 13px;"/>
                              <span style="position: relative; margin-left: 13px; color: #ffffff; font-size: 18px;">
                                  {{lang.video_two_tip}}
                              </span>
                          </div>
                      </div>
                  </div>
                  <div class="right_buttons">
                      <div class="catheterStyle" @click="catheterEvent()">
                          <buttonPrimary v-bind:title="lang.catheter_title" type="ellipse" v-bind:actived="catheterColor"
                                         style="border: 1px solid #EBEBEB; width: 94px;"></buttonPrimary>
                      </div>
                      <div class="sieve_tubeStyle" @click="sieve_tube_Event()">
                          <buttonPrimary v-bind:title="lang.sieve_tube_title" type="ellipse" v-bind:actived="sieve_tubeColor"
                                         style="border: 1px solid #EBEBEB; width: 94px;"></buttonPrimary>
                      </div>

                      <label for="checkbox-1" id="s1" class="control-block_div_border switch">
                          <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" v-model="mark_show">
                          <label for="checkbox-1"><span style="font-size: 20px;color: #FFFFFF">{{lang.mark_title}}</span></label>
                      </label>
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
import './sub_static/video-js.css';

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
        z-index: 7;
    }

    .backgroundStyle {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        background: url('./sub_static/background.png');
        background-size: 100% 100%;
    }

    .originalImg {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url('./sub_static/catheter.png');
        background-size: 100% 100%;
        z-index: 2;
    }

    .bg_line {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url('./sub_static/line.png');
        background-size: 100% 100%;
        z-index: 4;
    }

    .bark_class {
        position: absolute;
        left: 52.4%;
        top: 7%;
        font-size: 32px;
        color: #FFFFFF;
        z-index: 4;
    }

    .phloem_class {
        position: absolute;
        left: 56.2%;
        top: 12.8%;
        font-size: 32px;
        color: #FFFFFF;
        z-index: 4;
    }

    .cambium_class {
        position: absolute;
        left: 59.5%;
        top: 19.4%;
        font-size: 32px;
        color: #FFFFFF;
        z-index: 4;
    }

    .xylem_class {
        position: absolute;
        left: 66.4%;
        top: 28.5%;
        font-size: 32px;
        color: #FFFFFF;
        z-index: 4;
    }

    .marrow_class {
        position: absolute;
        left: 71.9%;
        top: 35.8%;
        font-size: 32px;
        color: #FFFFFF;
        z-index: 4;
    }

    /*视频的样式*/
    .videoBox {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 3;
    }

    .myVideo {
        width: 100%;
        height:100%;
    }

    .video_tip_class {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 26.5%;
        top: 79.2%;
        z-index: 4;
    }

    .right_buttons {
        position: absolute;
        right: 24px;
        width: 94px;
        height: 200px;
        top: calc(50% - 50px);
        z-index: 5;
    }

    .catheterStyle {
        position: relative;
    }

    .sieve_tubeStyle {
        position: relative;
        margin-top: 20px;
    }

    #s1 {
        position: relative;
        width: 100px;
        margin-left: -30px;
        margin-top: 270px;
        background: none;
        box-shadow: none;
    }

    @media screen and (min-width: 1060px) and (max-width: 1300px) {
        .bark_class, .phloem_class, .cambium_class, .xylem_class, .marrow_class {
            font-size: 20px;
        }

        .right_buttons {
            transform-origin: center;
            right: 24px;
        }

        #s1 {
            margin-top: 150px;
        }
    }

    @media screen and (min-width: 875px) and (max-width: 1050px) {
        .bark_class, .phloem_class, .cambium_class, .xylem_class, .marrow_class {
            font-size: 20px;
        }

        .right_buttons {
            transform-origin: center;
            transform: scale(0.7);
            bottom: 5%;
            right: 0;
        }
    }

    @media screen and (min-width: 750px) and (max-width: 875px) {
        .bark_class, .phloem_class, .cambium_class, .xylem_class, .marrow_class {
            font-size: 18px;
        }

        .title_text {
            font-size: 20px;
        }

        .right_buttons {
            transform-origin: center;
            transform: scale(0.6);
            bottom: 5%;
            right: 0;
        }
    }

    @media screen and (min-width: 600px) and (max-width: 740px) {
        .bark_class, .phloem_class, .cambium_class, .xylem_class, .marrow_class {
            font-size: 12px;
        }

        .title_text {
            font-size: 20px;
        }

        .right_buttons {
            transform-origin: center;
            transform: scale(0.5);
            top: 20%;
            right: 0;
        }

        #s1 {
            margin-top: 120px;
        }
    }
</style>
<style>
    .switch input {
        display: none;
    }

    .switch label {
        cursor: pointer;
        padding-right: 35px;
        position: relative;
        display: block;
        font-size: 14px;
    }

    .switch input[type="checkbox"] {
        position: absolute;
        visibility: hidden !important;
    }

    .switch input[type="checkbox"] + label:before,
    .switch input[type="checkbox"] + label:after {
        content: '';
        position: absolute;
        top: 41%;
        margin-top: -8.5px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    .switch input[type="checkbox"] + label:before {
        width: 44px;
        height: 26px;
        right: 0px;
        background: #D8D8D8;
        border-radius: 21px;
        transition: none 16ms ease-out !important;
    }

    .switch input[type="checkbox"]:checked + label:before {
        background-color: #0291FF;
        transition: none 16ms ease-in !important;
    }

    .switch input[type="checkbox"] + label:after {
        width: 20px;
        height: 20px;
        right: 20px;
        margin-top: -6px;
        margin-right: 2px;
        background: #FFF;
        border-radius: 50%;
        -webkit-transition: all 16ms ease-out;
        transition: none 16ms ease-out !important;
    }

    .switch input[type="checkbox"]:checked + label:after {
        right: 0px;
        background: #FFF;
    }
</style>


