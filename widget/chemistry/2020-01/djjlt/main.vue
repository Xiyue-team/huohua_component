<template>
    <fullScreensLayout>
        <template slot="viewBox" slot-scope="viewBox">
            <div id="background" class="background" ondragstart="return false">
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
                            <source ref="icon" src="./sub_static/video/electrolytic_refined_copper.mp4"
                                    type="video/mp4">
                        </video>
                        <img v-show="isEnding" class="pause" src="./sub_static/img/pause@2x.png" @click="playVideo()"/>
                    </div>

                    <!--反应式-->
                    <div id="reaction" v-show="isShowReaction">
                        <img id="cathode_reaction" class="cathode_reaction"
                             src="./sub_static/img/cathode@2x.png"/>
                        <img id="anode_reaction" class="anode_reaction"
                             src="./sub_static/img/anode@2x.png"/>
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
        height: 680px;
        width: 880px;
        top: 50%;
        left: 50%;
        margin-top: -340px;
        margin-left: -440px;
    }

    #MacroImage {
        position: relative;
        width: 100%;
        height: 100%;
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
        width: 100%;
        height: 100%;
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

    .cathode_reaction {
        position: absolute;
        width: 227px;
        top: 18.5%;
        left: -28.4%;
        z-index: 2;
    }

    .anode_reaction {
        position: absolute;
        width: 232px;
        top: 9.5%;
        right: -29.4%;
        z-index: 2;
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

    @media (max-width: 1570px), (max-height: 780px) {
        .view_container {
            height: 612px;
            width: 792px;
            margin-top: -306px;
            margin-left: -396px;
        }

        .cathode_reaction {
            top: 18.5%;
            left: -30.4%;
            transform: scale(0.9) !important;
        }

        .anode_reaction {
            top: 9.5%;
            right: -31.4%;
            transform: scale(0.9) !important;
        }

        .pause {
            transform: scale(0.9) !important;
        }
    }

    @media (max-width: 1450px), (max-height: 690px) {
        .view_container {
            height: 544px;
            width: 704px;
            margin-top: -272px;
            margin-left: -352px;
        }

        .cathode_reaction {
            top: 18%;
            left: -32.4%;
            transform: scale(0.8) !important;
        }

        .anode_reaction {
            top: 7.5%;
            right: -33.4%;
            transform: scale(0.8) !important;
        }

        .pause {
            transform: scale(0.8) !important;
        }
    }

    @media (max-width: 1260px), (max-height: 620px) {
        .view_container {
            height: 476px;
            width: 616px;
            margin-top: -238px;
            margin-left: -308px;
        }

        .cathode_reaction {
            top: 17.5%;
            left: -35.4%;
            transform: scale(0.7) !important;
        }

        .anode_reaction {
            top: 6.5%;
            right: -36.4%;
            transform: scale(0.7) !important;
        }

        .pause {
            transform: scale(0.7) !important;
        }
    }

    @media (max-width: 1120px), (max-height: 560px) {
        .view_container {
            height: 408px;
            width: 528px;
            margin-top: -204px;
            margin-left: -264px;
        }

        .cathode_reaction {
            top: 16.3%;
            left: -38.4%;
            transform: scale(0.6) !important;
        }

        .anode_reaction {
            top: 3.5%;
            right: -39.4%;
            transform: scale(0.6) !important;
        }

        .pause {
            transform: scale(0.6) !important;
        }

        .button_area {
            transform: scale(0.9);
            bottom: -18.4%;
        }
    }

    @media (max-width: 950px), (max-height: 520px) {
        .title_text {
            transform: scale(0.8);
            left: 8px;
        }

        .view_container {
            height: 340px;
            width: 440px;
            margin-top: -170px;
            margin-left: -220px;
        }

        .cathode_reaction {
            top: 15.5%;
            left: -42.4%;
            transform: scale(0.5) !important;
        }

        .anode_reaction {
            top: -0.5%;
            right: -43.4%;
            transform: scale(0.5) !important;
        }

        .pause {
            transform: scale(0.5) !important;
        }
    }

    @media (max-width: 780px), (max-height: 450px) {
        .view_container {
            height: 272px;
            width: 352px;
            margin-top: -136px;
            margin-left: -176px;
        }

        .cathode_reaction {
            top: 14.5%;
            left: -49.4%;
            transform: scale(0.4) !important;
        }

        .anode_reaction {
            top: -6.5%;
            right: -50.4%;
            transform: scale(0.4) !important;
        }

        .pause {
            transform: scale(0.4) !important;
        }

        .button_area {
            transform: scale(0.7);
            bottom: -12.4%;
        }
    }

    @media (max-width: 630px), (max-height: 350px) {
        .view_container {
            height: 204px;
            width: 264px;
            margin-top: -102px;
            margin-left: -132px;
        }

        .cathode_reaction {
            top: 13.2%;
            left: -61.3%;
            transform: scale(0.3) !important;
        }

        .anode_reaction {
            top: -12.8%;
            right: -65.9%;
            transform: scale(0.3) !important;
        }

        .pause {
            transform: scale(0.3) !important;
        }

        .button_area {
            transform: scale(0.5);
        }
    }
</style>

