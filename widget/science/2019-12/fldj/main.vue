<template>
    <div class="aspectration bg_white covered root_div_container ">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">{{lang.title}}</div>
                <div id="3dContainer" ></div>
                <div style="width: 100%; height: 100%; background: #f7ffef; position: absolute"></div>
                <div class="show_poster" v-show="show_bgImage">
                    <div class="top_videos">
                        <div v-for="num in top_video_poster_count" class="top_wind_level" :key="num + '1'">
                            <img :src=top_video_poster[num-1] style="width: 100%; height: 100%" ondragstart="return false"/>
                            <div class="play_video_class" @click="play_topWind_video(num)">
                                <img src="./sub_static/play.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                            </div>
                            <div style="position: absolute; width: 60px; margin-top: 10px; left: calc(50% - 20px);">
                                <span>{{lang.wind_level[num-1]}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="bottom_videos">
                        <div v-for="num in bottom_video_poster_count" class="bottom_wind_level" :key="num + '2'">
                            <img :src=bottom_video_poster[num-1] style="width: 100%; height: 100%" ondragstart="return false"/>
                            <div class="play_video_class" @click="play_bottomWind_video(num)">
                                <img src="./sub_static/play.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                            </div>
                            <div style="position: absolute; width: 60px; margin-top: 10px; left: calc(50% - 20px);">
                                <span>{{lang.wind_level[num+4]}}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <transition name="fade">
                    <div class="imageBox" v-show="show_video" v-if="detectQQBrowser">
                        <img id="wind_image" src="./sub_static/wind_poster/wind_poster_one.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                        <div class="quit_playVideo" @click="exit_playVideo()">
                            <img src="./sub_static/exit.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                        </div>
                        <div class="video_annotation">
                            <span>{{videoAnnotationText}}</span>
                        </div>
                    </div>

                    <div class="videoBox" v-show="show_video" v-else>
                        <video id="windVideo" class="video-js VideoStyle vjs-default-skin vjs-big-play-none"
                               x-webkit-airplay="true"
                               preload="auto"
                               x5-playsinline playsinline
                               webkit-playsinline
                               ref="icon"
                               poster="./sub_static/wind_poster/wind_poster_one.png"
                               x5-video-player-type="h5"
                               x5-video-player-fullscreen="true"
                               x5-video-orientation="landscape"
                               style="object-fit:fill">
                            <source id="sourceId1" ref="icon" src="./sub_static/wind_video/wind_level_one.mp4" type="video/mp4">
                        </video>
                        <div class="quit_playVideo" @click="exit_playVideo()">
                            <img src="./sub_static/exit.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                        </div>
                        <div class="video_annotation">
                            <span>{{videoAnnotationText}}</span>
                        </div>
                    </div>
                </transition>

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
        font-size: 20px;
        color: #000000;
        line-height: 20px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
        transform-origin: left top;
        z-index: 6;
    }

    .show_poster {
        position: absolute;
        width: 1096px;
        height: 404px;
        top: calc(50% - 202px);
        left: calc(50% - 548px);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .top_videos {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }

    .bottom_videos {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }

    .top_wind_level, .bottom_wind_level {
        width: 200px;
        height: 150px;
        margin-left: 24px;
        position: relative;
    }

    .bottom_wind_level {
        margin-top: 52px;
    }

    .play_video_class {
        position: absolute;
        width: 36px;
        height: 36px;
        left: calc(50% - 18px);
        top: calc(50% - 18px);
        cursor: pointer;
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

    .quit_playVideo {
        position: absolute;
        width: 44px;
        height: 44px;
        left: 12px;
        top: 12px;
        z-index: 8;
        box-shadow: none;
        cursor: pointer;
    }

    .video_annotation {
        position: absolute;
        font-size: 24px;
        line-height: 24px;
        width: 400px;
        color: #000000;
        bottom: 18px;
        left: calc(50% - 200px);
        text-align: center;
        transform-origin: center bottom;
    }

    .fade-enter-active, .fade-leave-active {
        transition: top 0.5s;
    }

    .fade-enter, .fade-leave-to {
        top: 100%;
    }
</style>
