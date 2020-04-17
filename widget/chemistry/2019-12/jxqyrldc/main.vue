<template>
    <fullScreensLayout>
        <template slot="viewBox" slot-scope="viewBox">
            <div id="background" class="background">
                <!--标题-->
                <div class="title_text">{{title}}</div>

                <div class="view_container" id="view_container">

                    <!--封面图-->
                    <div id="MacroImage" v-show="!isMicro">
                        <img src="./sub_static/img/coverImg@2x.png"/>
                    </div>

                    <!--视频播放区-->
                    <div id="videoBox" class="videoBox" v-show="isMicro">
                        <video id="microVideo" class="video-js"
                               x-webkit-airplay="true"
                               preload="auto"
                               x5-playsinline playsinline
                               webkit-playsinline
                               :poster="posterImage"
                               ref="icon"
                               style="object-fit:fill">
                            <source ref="icon" src="./sub_static/video/oxyhydrogen_fuel.mp4" type="video/mp4">
                        </video>
                        <img v-show="isEnding" class="pause" src="./sub_static/img/pause@2x.png" @click="playVideo()" ondragstart="return false"/>
                    </div>

                    <!--反应式-->
                    <div id="reaction" v-show="isShowReaction">
                        <img id="positive_reaction" class="positive_reaction"
                             src="./sub_static/img/positive_reaction@2x.png"/>
                        <img id="negative_reaction" class="negative_reaction"
                             src="./sub_static/img/negative_reaction@2x.png"/>
                        <img id="total_reaction" class="total_reaction" src="./sub_static/img/total_reaction@2x.png"/>
                    </div>
                </div>

                <!--控件区-->
                <div class="button_area">
                    <div @click="selectType('macro')">
                        <buttonPrimary class="button macro"
                                       :class="!isMicro?'button_click': ''"
                                       v-show="true"
                                       v-bind:title="button[0]">
                        </buttonPrimary>
                    </div>
                    <div @click="selectType('micro')">
                        <buttonPrimary class="button micro"
                                       :class="isMicro?'button_click': ''"
                                       v-show="true"
                                       v-bind:title="button[1]">
                        </buttonPrimary>
                    </div>
                    <div class="switch reaction_button" v-show="true">
                        <input type="checkbox" id="reaction_button" v-model="isShowReaction">
                        <label for="reaction_button" class="checkboxText">
                            <span class="text on">{{button[2]}}</span>
                            <span class="text off">{{button[2]}}</span>
                        </label>
                    </div>
                </div>

            </div>
        </template>
    </fullScreensLayout>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';
    import {ViewModel} from './ViewModel';
    import Component from 'vue-class-component';

    require('./sub_static/css/video-js.css');

    @Component({
        components: {
            fullScreensLayout,
            buttonPrimary
        },
        mixins: [ViewModel]
    })
    export default class App extends Vue {
    }
</script>

<style scoped='scoped'>
    .background {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .view_container {
        position: absolute;
        height: 806px;
        width: 1064px;
        top: 45%;
        left: 50%;
        margin-top: -403px;
        margin-left: -532px;
        z-index: 1;
    }

    #MacroImage {
        position: relative;
        height: 100%;
        width: 100%;
    }

    #MacroImage img {
        width: 100%;
        height: 100%;
    }

    .title_text {
        position: absolute;
        font-size: 28px;
        color: #FFFFFF;
        line-height: 28px;
        top: 32px;
        left: 32px;
        z-index: 2;
    }

    .button_area {
        position: absolute;
        width: 94px;
        height: 215px;
        top: 0;
        bottom: -31.4%;
        left: 0;
        right: -70.8%;
        margin: auto;
        z-index: 2;
    }

    .button {
        width: 94px;
        height: 40px;
        border-radius: 22px;
        border: none;
        text-align: center;
        line-height: 14px;
        color: #525252;
    }

    .micro {
        margin-top: 30px;
    }

    .reaction_button {
        width: 94px;
        height: 45px;
        top: 50.7%;
        border-radius: 21px;
        font-size: 14px;
        color: #525252;
        text-align: center;
        line-height: 14px;
        margin-top: 60px;
    }

    .button_click {
        background: #0091FF;
        color: #FFFFFF;
    }

    .videoBox {
        position: relative;
        height: 100%;
        width: 100%;
    }

    .video-js {
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .video-js .vjs-tech {
        outline: none !important;
    }

    .pause {
        width: 60px;
        height: 60px;
        position: absolute;
        top: 40%;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        cursor: pointer;
        z-index: 3;
    }

    .positive_reaction {
        position: absolute;
        width: 422px;
        right: -30.7%;
        top: 21.5%;
        z-index: 2;
    }

    .negative_reaction {
        position: absolute;
        width: 449px;
        top: 21.5%;
        left: -33.7%;
        z-index: 2;
    }

    .total_reaction {
        position: absolute;
        left: 35.5%;
        bottom: -11.8%;
        width: 307px;
    }

    .switch input[type="checkbox"] + label:before {
        width: 94px;
        height: 40px;
        border-radius: 21px;
    }

    .switch input[type="checkbox"] + label:after {
        width: 36px;
        height: 36px;
        margin-right: 32px;
    }

    .switch input[type="checkbox"]:checked + label:before {
        background-color: #0091FF;
    }

    .switch input[type="checkbox"]:checked + label:after {
        margin-right: 2px;
    }

    .switch input[type="checkbox"]:checked + label .off {
        display: none;
    }

    .switch input[type="checkbox"]:checked + label .on {
        display: block;
    }

    .text {
        position: absolute;
        font-size: 14px;
    }

    .off {
        margin-left: 43px;
        line-height: 25px;
        color: #525252;
        display: block;
    }

    .on {
        margin-left: 9px;
        color: #FFFFFF;
        line-height: 24px;
        display: none;
    }

    @media (max-width: 1800px), (max-height: 915px) {
        .view_container {
            height: 645px;
            width: 851px;
            margin-top: -322px;
            margin-left: -423px;
        }

        .positive_reaction {
            right: -41.7%;
            top: 20.1%;
            transform: scale(0.8);
        }

        .negative_reaction {
            top: 21%;
            left: -42.7%;
            transform: scale(0.8);
        }

        .total_reaction {
            left: 31.5%;
            bottom: -13.8%;
            transform: scale(0.8);
        }

        .pause {
            transform: scale(0.8);
        }
    }

    @media (max-width: 1600px), (max-height: 790px) {
        .view_container {
            height: 564px;
            width: 745px;
            margin-top: -282px;
            margin-left: -372px;
        }

        .positive_reaction {
            right: -48.4%;
            top: 20.5%;
            transform: scale(0.7);
        }

        .negative_reaction {
            top: 20.5%;
            left: -51.7%;
            transform: scale(0.7);
        }

        .total_reaction {
            left: 28.5%;
            bottom: -14.8%;
            transform: scale(0.7);
        }

        .pause {
            transform: scale(0.7);
        }
    }

    @media (max-width: 1520px), (max-height: 690px) {
        .view_container {
            height: 484px;
            width: 638px;
            margin-top: -242px;
            margin-left: -319px;
        }

        .positive_reaction {
            right: -55.7%;
            top: 20.5%;
            transform: scale(0.6);
        }

        .negative_reaction {
            top: 20.5%;
            left: -59.7%;
            transform: scale(0.6);
        }

        .total_reaction {
            left: 25.5%;
            bottom: -16.8%;
            transform: scale(0.6);
        }

        .pause {
            transform: scale(0.6);
        }

        .button_area {
            bottom: -23.4%;
        }
    }

    @media (max-width: 1230px), (max-height: 615px) {
        .view_container {
            height: 403px;
            width: 532px;
            margin-top: -202px;
            margin-left: -266px;
        }

        .positive_reaction {
            right: -59.7%;
            top: 19.5%;
            transform: scale(0.5);
        }

        .negative_reaction {
            top: 19.5%;
            left: -63.7%;
            transform: scale(0.5);
        }

        .total_reaction {
            left: 20.5%;
            bottom: -22.8%;
            transform: scale(0.5);
        }

        .pause {
            transform: scale(0.5);
        }

        .button_area {
            transform: scale(0.8);
            bottom: -16.4%;
        }
    }

    @media (max-width: 1010px), (max-height: 550px) {
        .title_text {
            transform: scale(0.8);
            left: 8px;
        }

        .view_container {
            height: 322px;
            width: 426px;
            margin-top: -161px;
            margin-left: -213px;
        }

        .positive_reaction {
            right: -71.7%;
            top: 18.5%;
            transform: scale(0.4);
        }

        .negative_reaction {
            top: 18.5%;
            left: -75.7%;
            transform: scale(0.4);
        }

        .total_reaction {
            left: 12.5%;
            bottom: -21.8%;
            transform: scale(0.4);
        }

        .pause {
            transform: scale(0.4);
        }

        .button_area {
            bottom: -6.4%;
        }
    }

    @media (max-width: 820px), (max-height: 440px) {
        .view_container {
            height: 242px;
            width: 319px;
            margin-top: -121px;
            margin-left: -160px;
        }

        .positive_reaction {
            right: -88.7%;
            top: 16.5%;
            transform: scale(0.3);
        }

        .negative_reaction {
            top: 16.5%;
            left: -93.7%;
            transform: scale(0.3);
        }

        .total_reaction {
            left: 1.5%;
            bottom: -22.8%;
            transform: scale(0.3);
        }

        .pause {
            transform: scale(0.3);
        }

        .button_area {
            transform: scale(0.7);
            bottom: -2.4%;
        }
    }

    @media (max-width: 630px), (max-height: 315px) {
        .view_container {
            height: 161px;
            width: 213px;
            margin-top: -81px;
            margin-left: -106px;
        }

        .positive_reaction {
            right: 34.3%;
            top: 12.5%;
            transform: scale(0.2);
        }

        .negative_reaction {
            top: 13.5%;
            left: 27.3%;
            transform: scale(0.2);
        }

        .total_reaction {
            left: -23.5%;
            bottom: -28.8%;
            transform: scale(0.2);
        }

        .pause {
            transform: scale(0.2);
        }

        .button_area {
            transform: scale(0.4);
        }
    }
</style>

