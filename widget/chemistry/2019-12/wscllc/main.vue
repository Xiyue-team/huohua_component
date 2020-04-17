<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="wscllc_background">
                      <div style="width: 100%; height: 100%;">
                          <div class="wscllc_mainContainer">
                              <div class="wscllc_background_image">

                              </div>
                              <div class="wscllc_tipsImage1" v-show="button1Active && button2Active && button3Active">
                                  <div style="width: 135px;height: 39px; position: absolute; left: 370px; top: 52px;">{{lang.tips[0]}}</div>
                              </div>
                              <div class="wscllc_tipsImage2" v-show="button4Active && button5Active">
                                  <div style="width: 94px;height: 40px;  position: absolute;left: 109px;top: 91px;">{{lang.tips[1]}}</div>
                              </div>
                              <div class="wscllc_text" style="left: 72px;top: 236px; width: 54px;height: 24px;">{{lang.text[0]}}</div>
                              <div class="wscllc_text" style="left: 237px;top: 34px; width: 54px;height: 24px;">{{lang.text[1]}}</div>
                              <div class="wscllc_text" style="left: 711px;top: 111px; width: 78px; height: 24px;">{{lang.text[2]}}</div>
                              <div class="wscllc_text" style="left: 890px;top: 158px; width: 78px; height: 24px;">{{lang.text[3]}}</div>
                              <div class="wscllc_text" style="left: 890px;top: 414px; width: 78px; height: 24px;">{{lang.text[4]}}</div>
                              <div class="wscllc_text" style="left: 487px;top: 716px; width: 126px; height: 24px;">{{lang.text[5]}}</div>
                              <div class="wscllc_text" style="left: 271px;top: 711px; width: 54px; height: 24px;">{{lang.text[6]}}</div>
                              <div class="wscllc_HighLightImage" style="left: 280px;top: 25px; transform: rotate(44deg)" v-show="button1Active"></div>
                              <div class="wscllc_HighLightImage" style="left: 539px;top: 40px; transform: rotate(69deg)" v-show="button2Active"></div>
                              <div class="wscllc_HighLightImage" style="left: 765px;top: 179px;" v-show="button3Active"></div>
                              <div class="wscllc_HighLightImage" style="left: 755px;top: 432px; transform: rotate(67deg)" v-show="button4Active"></div>
                              <div class="wscllc_HighLightImage" style="left: 547px;top: 566px; transform: rotate(-60deg)" v-show="button5Active"></div>

                              <div class="wscllc_focus_container" style="left: 285px;top: 24px;" @click="button1Event()">
                                  <div class="wscllc_focusImage"></div>
                              </div>
                              <div class="wscllc_focus_container" style="left: 542px;top: 40px;" @click="button2Event()">
                                  <div class="wscllc_focusImage"></div>
                              </div>
                              <div class="wscllc_focus_container" style="left: 765px;top: 179px;" @click="button3Event()">
                                  <div class="wscllc_focusImage"></div>
                              </div>
                              <div class="wscllc_focus_container" style="left: 758px;top: 431px;" @click="button4Event()">
                                  <div class="wscllc_focusImage"></div>
                              </div>
                              <div class="wscllc_focus_container" style="left: 545px;top: 559px;" @click="button5Event()">
                                  <div class="wscllc_focusImage"></div>
                              </div>

                              <div class="wscllc_vedioContainer" v-show="videoActive1">
                                  <video id="my-video1" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                         x-webkit-airplay="true"
                                         preload="auto"
                                         x5-playsinline playsinline
                                         webkit-playsinline
                                         ref="icon"
                                         :poster="video_poster1"
                                         style="object-fit:fill">
                                      <source id="sourceId1" ref="icon" src="./sub_static/gs.mp4" type="video/mp4">
                                  </video>
                                  <div class = "wscllc_vedioTips">{{lang.vedioText[0]}}</div>
                                  <div class="wscllc_vedio_title">{{lang.text[1]}}</div>
                              </div>
                              <div class="wscllc_vedioContainer" v-show="videoActive2">
                                  <video id="my-video2" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                         x-webkit-airplay="true"
                                         preload="auto"
                                         x5-playsinline playsinline
                                         webkit-playsinline
                                         ref="icon"
                                         :poster="video_poster2"
                                         style="object-fit:fill">
                                      <source id="sourceId2" ref="icon" src="./sub_static/csc.mp4" type="video/mp4">
                                  </video>
                                  <div class = "wscllc_vedioTips">{{lang.vedioText[1]}}</div>
                                  <div class="wscllc_vedio_title">{{lang.text[2]}}</div>
                              </div>
                              <div class="wscllc_vedioContainer" v-show="videoActive3">
                                  <video id="my-video3" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                         x-webkit-airplay="true"
                                         preload="auto"
                                         x5-playsinline playsinline
                                         webkit-playsinline
                                         ref="icon"
                                         :poster="video_poster3"
                                         style="object-fit:fill">
                                      <source id="sourceId3" ref="icon" src="./sub_static/ccc.mp4" type="video/mp4">
                                  </video>
                                  <div class = "wscllc_vedioTips">{{lang.vedioText[2]}}</div>
                                  <div class="wscllc_vedio_title">{{lang.text[3]}}</div>
                              </div>
                              <div class="wscllc_vedioContainer" v-show="videoActive4">
                                  <video id="my-video4" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                         x-webkit-airplay="true"
                                         preload="auto"
                                         x5-playsinline playsinline
                                         webkit-playsinline
                                         ref="icon"
                                         :poster="video_poster4"
                                         style="object-fit:fill">
                                      <source id="sourceId4" ref="icon" src="./sub_static/wnc.mp4" type="video/mp4">
                                  </video>
                                  <div class = "wscllc_vedioTips">{{lang.vedioText[3]}}</div>
                                  <div class="wscllc_vedio_title">{{lang.text[4]}}</div>
                              </div>
                              <div class="wscllc_vedioContainer" v-show="videoActive5">
                                  <video id="my-video5" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                         x-webkit-airplay="true"
                                         preload="auto"
                                         x5-playsinline playsinline
                                         webkit-playsinline
                                         ref="icon"
                                         :poster="video_poster5"
                                         style="object-fit:fill">
                                      <source id="sourceId5" ref="icon" src="./sub_static/eccdc.mp4" type="video/mp4">
                                  </video>
                                  <div class = "wscllc_vedioTips">{{lang.vedioText[4]}}</div>
                                  <div class="wscllc_vedio_title">{{lang.text[5]}}</div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="title_text">{{title}}</div>
                  <div id="3dContainer"></div>
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

@Component({
  components: {
    fullScreensLayout
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
    }

    @media screen and (max-width: 730px){
        .title_text {
            transform-origin: left top;
            transform: scale(0.7);
        }
    }

    .wscllc_background {
        width: 100%;
        height: 100%;
        background:linear-gradient(45deg,rgba(24,24,23,1) 0%,rgba(47,47,47,1) 100%);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .wscllc_mainContainer {
        width: 945px;
        height: 742px;
        position: relative;
        left: calc(50% - 472px);
        top: calc(50% - 371px);
    }

    .wscllc_HighLightImage {
        width: 149px;
        height: 149px;
        background: url("./sub_static/highLight.png");
        background-size: 100% 100%;
        position: absolute;
    }

    .wscllc_focusImage {
        width: 60px;
        height: 59px;
        background: url("./sub_static/focus.png");
        background-size: 100% 100%;
    }

    .wscllc_tipsImage1 {
        width: 510px;
        height: 165px;
        background: url("./sub_static/line1.png");
        background-size: 100% 100%;
        position: absolute;
        left: 422px;
        top: 6px;
        color: #FFF;
    }

    .wscllc_tipsImage2 {
        width: 212px;
        height: 145px;
        background: url("./sub_static/line2.png");
        background-size: 100% 100%;
        position: absolute;
        left: 690px;
        top: 571px;
        color: #FFF;
    }

    .wscllc_text {
        font-size:24px;
        color:rgba(255,255,255,1);
        position: absolute;
    }

    .wscllc_vedioContainer {
        width: 534px;
        height: 300px;
        position: absolute;
        left: 179px;
        top: 221px;
    }
    
    .wscllc_vedio_title {
        position: absolute;
        left: 17px;
        top: 12px;
        color: #010101;
    }

    .myVideo {
        width: 100%;
        height: 100%;
        position: absolute;
        pointer-events: none;
        z-index: 0!important;
    }

    .wscllc_focus_container {
        width: 150px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        cursor: pointer;
    }

    .wscllc_background_image {
        width: 945px;
        height: 742px;
        background: url("./sub_static/background.png");
        background-size: 100% 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    .wscllc_vedioTips {
        width: 100%;
        font-size: 14px;
        color: rgba(0, 0, 0, 1);
        position: absolute;
        bottom: 10px;
        text-align: center;
    }
</style>
<style>

</style>
