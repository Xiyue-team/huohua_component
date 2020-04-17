<template>
    <div class="aspectration bg_white covered root_div_container ">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">
                    {{lang.title}}
                </div>
                <div id="3dContainer" class="bg_image">
                </div>
                <div class="many_flowers" v-show="show_bg">
                    <img src="./sub_static/many_flowers.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                </div>
                <div class="image_changes" v-show="show_gallery">
                    <div class="swiper-container" id="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <img :src="imageOne" style="width: 100%; height: 100%" ondragstart="return false"/>
                                <div class="flower_title_one">
                                    <span>{{flowerOne_title}}</span>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <img :src="imageTwo" style="width: 100%; height: 100%" ondragstart="return false"/>
                                <div class="flower_title_two">
                                    <span>{{flowerTwo_title}}</span>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <img :src="imageThree" style="width: 100%; height: 100%" ondragstart="return false"/>
                                <div class="flower_title_three">
                                    <span>{{flowerThree_title}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-prev btn_left" id="swiper-button-prev" slot="button-prev" v-show="show_arrow">
                        <img src="./sub_static/pre.png" style="width: 100%;height: 100%" ondragstart="return false">
                    </div>
                    <div class="swiper-button-next  btn_right" id="swiper-button-next" slot="button-next" v-show="show_arrow">
                        <img src="./sub_static/next.png" style="width: 100%;height: 100%" ondragstart="return false">
                    </div>
                </div>

                <div class="play_button" @click="playVideo()" v-show="showPlayButton">
                    <img src="./sub_static/play.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                </div>
                <div class="videoBox" v-show="active1">
                    <video id="my-video1" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                               x-webkit-airplay="true"
                               preload="auto"
                               x5-playsinline
                               playsinline
                               webkit-playsinline
                               data-setup="{}"
                               ref="icon"
                               :poster="posterOne"
                               style="border-radius: 24px; object-fit: fill">
                            <source id="sourceId1" ref="icon" src="./sub_static/video/wind_flower.mp4" type="video/mp4">
                    </video>
                    <div class="modal_shadow_one">
                        <p style="margin-left: 118px; margin-right: 100px; margin-top: 35px">
                            {{lang.wind_flower_text_title}}
                        </p>
                    </div>
                </div>
                <div class="videoBox" v-show="active2">
                    <video id="my-video2" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                           x-webkit-airplay="true"
                           preload="auto"
                           x5-playsinline
                           playsinline
                           webkit-playsinline
                           data-setup="{}"
                           ref="icon"
                           :poster="posterTwo"
                           style="border-radius: 24px; object-fit: fill">
                        <source id="sourceId2" ref="icon" src="./sub_static/video/insect_flower.mp4" type="video/mp4">
                    </video>
                    <div class="modal_shadow_one">
                        <p style="margin-left: 118px; margin-right: 100px; margin-top: 35px">
                            {{lang.insect_flower_text_title}}
                        </p>
                    </div>
                </div>
                <div class="videoBox" v-show="active3">
                    <video id="my-video3" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                           x-webkit-airplay="true"
                           preload="auto"
                           x5-playsinline
                           playsinline
                           webkit-playsinline
                           data-setup="{}"
                           ref="icon"
                           :poster="posterThree"
                           style="border-radius: 24px; object-fit: fill">
                        <source id="sourceId3" ref="icon" src="./sub_static/video/bird_flower.mp4" type="video/mp4">
                    </video>
                    <div class="modal_shadow_one">
                        <p style="margin-left: 118px; margin-right: 100px; margin-top: 35px">
                            {{lang.bird_flower_text_title}}
                        </p>
                    </div>
                </div>
                <div class="right_buttons">
                    <div class="wind_flowerStyle" @click="wind_flowerEvent()">
                        <buttonPrimary v-bind:title="lang.wind_flower_title" type="ellipse" v-bind:actived="wind_flowerColor" style="border: 1px solid #EBEBEB;
"></buttonPrimary>
                    </div>
                    <div class="insect_flowerStyle" @click="insect_flowerEvent()">
                        <buttonPrimary v-bind:title="lang.insect_flower_title" type="ellipse" v-bind:actived="insect_flowerColor" style="border: 1px solid #EBEBEB;
"></buttonPrimary>
                    </div>
                    <div class="bird_flowerStyle" @click="bird_flowerEvent()">
                        <buttonPrimary v-bind:title="lang.bird_flower_title" type="ellipse" v-bind:actived="bird_flowerColor" style="border: 1px solid #EBEBEB;
"></buttonPrimary>
                    </div>

                    <div class="icon_changes" v-if="showButton" @click="change_iconEvent()">
                        <div class="img_icon" v-show="img_icon_show">
                            <img src="./sub_static/image_icon.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                        </div>
                        <div class="video_icon" v-show="video_icon_show">
                            <img src="./sub_static/video_icon.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                        </div>
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
  require('swiper/dist/css/swiper.css');
  require('./sub_static/video-js.css');

  @Component({
    components: {
      fullScreensLayout,
      buttonPrimary
    },
    mixins: [ViewModel]
  })
  export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_text {
        font-size: 24px;
        color: #FFFFFF;
        transparent: true;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }

    .bg_image {
        width: 100%;
        height: 100%;
        background-image: url('./sub_static/background.png');
        background-size: 100% 100%;
    }

    .many_flowers {
        position: absolute;
        width: 1306px;
        height: 724px;
        top: calc(50% - 362px);
        left: calc(50% - 653px);
    }

    .image_changes {
        position: absolute;
        width: 1306px;
        height: 724px;
        top: calc(50% - 362px);
        left: calc(50% - 653px);
    }

    .swiper-container {
        width: 1306px;
        height: 724px;
    }

    .swiper-wrapper {
        width: 1306px;
        height: 724px;
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
        width: 74px;
        height: 74px;
        top: calc(50% - 37px);
        left: 16px;
    }

    .btn_right {
        background-image: none;
        display: block;
        border: none;
        width: 74px;
        height: 74px;
        position: absolute;
        top: calc(50% - 37px);
        right: 16px;
    }

    .flower_title_one, .flower_title_two, .flower_title_three {
        position: absolute;
        font-size: 24px;
        color: #FFFFFF;
        top: 25px;
        left: 40px;
        font-size: 32px;
    }

    .play_button {
        position: absolute;
        width: 56px;
        height: 56px;
        top: calc(50% - 28px);
        left: calc(50% - 28px);
        z-index: 5;
        cursor: pointer;
    }

    /*视频的样式*/
    .videoBox {
        position: absolute;
        width: 1306px;
        height: 724px;
        top: calc(50% - 362px);
        left: calc(50% - 653px);
        border-radius: 24px;
        overflow: hidden;
    }

    .myVideo {
        width: 100%;
        height:100%;
    }

    .right_buttons {
        position: absolute;
        height: 200px;
        top: 45%;
        right: 24px;
    }

    .insect_flowerStyle, .bird_flowerStyle {
        margin-top: 20px;
    }

    .icon_changes {
        position: relative;
        margin-top: 30px;
        margin-left: calc(50% - 24.5px);
        width: 49px;
        height: 49px;
        cursor: pointer;
    }

    .video_icon {
        position: absolute;
        bottom: -2px;
    }

    .modal_shadow_one {
        position: absolute;
        width: 100%;
        height: 156px;
        font-size: 32px;
        color: #FFFFFF;
        bottom: 0;
        background: rgba(50,49,37,0.60);
        border-radius: 0 0 24px 24px;
    }

    @media screen and (min-width: 1320px) {
        .many_flowers, .image_changes, .videoBox {
            transform-origin: center;
            transform: scale(0.9);
        }
    }

    @media screen and (min-width: 1200px) and (max-width: 1300px) {
        .many_flowers, .image_changes, .videoBox {
            transform-origin: center;
            transform: scale(0.65);
        }
    }

    @media screen and (min-width: 875px) and (max-width: 1024px) {
        .many_flowers, .image_changes, .videoBox {
            transform-origin: center;
            transform: scale(0.5);
        }
    }

    @media screen and (max-width: 875px) {
        .many_flowers, .image_changes, .videoBox {
            transform-origin: center;
            transform: scale(0.4);
        }

        .right_buttons {
            transform-origin: center;
            transform: scale(0.7);
            top: 35%;
        }
    }

    @media screen and (max-width: 740px) {
        .many_flowers, .image_changes, .videoBox {
            transform-origin: center;
            transform: scale(0.3);
        }

        .right_buttons {
            transform-origin: center;
            transform: scale(0.5);
            top: 25%;
        }
    }
</style>
<style>
    .button-primary {
        transition: all 0s !important;
    }

    .vjs-poster {
        border-radius: 24px !important;
        outline: none !important;
    }
</style>

