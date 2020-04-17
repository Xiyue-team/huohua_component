<template>
    <fullScreensLayout>
        <template slot="viewBox" slot-scope="viewBox">
            <div id="background" class="background" ondragstart="return false">
                <!--标题-->
                <div class="title_text">{{title}}</div>

                <div class="view_container" id="view_container">

                    <!--封面图-->
                    <div id="MacroImage" v-show="!isMicro">
                        <p>{{electrode[0]}}</p>
                        <p>{{electrode[1]}}</p>
                        <img src="./sub_static/img/coverImg@2x.png"/>
                    </div>

                    <!--视频播放区-->
                    <div id="videoBox" class="videoBox" v-show="isMicro">
                        <p>{{electrode[0]}}</p>
                        <p>{{electrode[1]}}</p>
                        <video id="microVideo" class="video-js"
                               x-webkit-airplay="true"
                               preload="auto"
                               x5-playsinline playsinline
                               webkit-playsinline
                               :poster="posterImage"
                               ref="icon"
                               style="object-fit:fill">
                            <source ref="icon" src="./sub_static/video/two_liquid_copper_zinc.mp4"
                                    type="video/mp4">
                        </video>
                    </div>

                    <!--反应式-->
                    <div id="reaction" v-show="isShowReaction">
                        <img id="negative_reaction" class="negative_reaction"
                             src="./sub_static/img/negative_reaction@2x.png"/>
                        <img id="positive_reaction" class="positive_reaction"
                             src="./sub_static/img/positive_reaction@2x.png"/>
                        <img id="total_reaction" class="total_reaction"
                             src="./sub_static/img/total_reaction@2x.png"/>
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
        height: 753px;
        width: 956px;
        top: 45%;
        left: 50%;
        margin-top: -376px;
        margin-left: -478px;
    }

    #MacroImage {
        position: relative;
        width: 100%;
        height: 100%;
    }

    #MacroImage p:nth-child(1) {
        font-family: SourceHanSerifSC-Regular;
        position: absolute;
        width: 90px;
        font-size: 34px;
        color: #FFFFFF;
        line-height: 28px;
        top: 32.5%;
        left: 92.6%;
        z-index: 2;
    }

    #MacroImage p:nth-child(2) {
        font-family: SourceHanSerifSC-Regular;
        position: absolute;
        width: 90px;
        font-size: 34px;
        color: #FFFFFF;
        line-height: 28px;
        top: 32.5%;
        left: -0.3%;
        z-index: 2;
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

    .videoBox p:nth-child(1) {
        font-family: SourceHanSerifSC-Regular;
        position: absolute;
        width: 90px;
        font-size: 34px;
        color: #FFFFFF;
        line-height: 28px;
        top: 32.5%;
        left: 92.6%;
        z-index: 2;
    }

    .videoBox p:nth-child(2) {
        font-family: SourceHanSerifSC-Regular;
        position: absolute;
        width: 90px;
        font-size: 34px;
        color: #FFFFFF;
        line-height: 28px;
        top: 32.5%;
        left: -0.3%;
        z-index: 2;
    }

    .video-js {
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .video-js .vjs-tech {
        outline: none !important;
    }

    .negative_reaction {
        position: absolute;
        width: 254px;
        top: 31%;
        left: -30.4%;
        z-index: 2;
    }

    .positive_reaction {
        position: absolute;
        width: 275px;
        top: 30.2%;
        right: -32.4%;
        z-index: 2;
    }

    .total_reaction {
        position: absolute;
        width: 360px;
        bottom: -9.5%;
        right: 31%;
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

    @media (max-width: 1620px), (max-height: 895px) {
        .view_container {
            height: 678px;
            width: 860px;
            margin-top: -339px;
            margin-left: -430px;
        }

        .negative_reaction {
            top: 29.5%;
            left: -31.4%;
            transform: scale(0.9) !important;
        }

        .positive_reaction {
            top: 29.3%;
            right: -33.4%;
            transform: scale(0.9) !important;
        }

        .total_reaction {
            bottom: -11%;
            left: 29%;
            transform: scale(0.9) !important;
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 31.5%;
            left: 92.4%;
            transform: scale(0.9);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 31.5%;
            left: -0.6%;
            transform: scale(0.9);
        }
    }

    @media (max-width: 1500px), (max-height: 820px) {
        .view_container {
            height: 602px;
            width: 765px;
            margin-top: -301px;
            margin-left: -382px;
        }

        .negative_reaction {
            top: 30%;
            left: -32.4%;
            transform: scale(0.8) !important;
        }

        .positive_reaction {
            top: 29.3%;
            right: -35.4%;
            transform: scale(0.8) !important;
        }

        .total_reaction {
            bottom: -14.5%;
            left: 26.6%;
            transform: scale(0.8) !important;
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 31.5%;
            left: 91.6%;
            transform: scale(0.8);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 31.5%;
            left: -1.3%;
            transform: scale(0.8);
        }
    }

    @media (max-width: 1280px), (max-height: 770px) {
        .view_container {
            height: 527px;
            width: 669px;
            margin-top: -264px;
            margin-left: -334px;
        }

        .negative_reaction {
            top: 29.5%;
            left: -35.4%;
            transform: scale(0.7) !important;
        }

        .positive_reaction {
            top: 28.5%;
            right: -38.4%;
            transform: scale(0.7) !important;
        }

        .total_reaction {
            bottom: -13%;
            left: 23%;
            transform: scale(0.7) !important;
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 31.5%;
            left: 90.6%;
            transform: scale(0.7);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 31.5%;
            left: -2%;
            transform: scale(0.7);
        }

        .button_area {
            bottom: -18.4%;
        }
    }

    @media (max-width: 1140px), (max-height: 650px) {
        .view_container {
            height: 452px;
            width: 574px;
            margin-top: -226px;
            margin-left: -287px;
        }

        .negative_reaction {
            top: 28.3%;
            left: -41.4%;
            transform: scale(0.6) !important;
        }

        .positive_reaction {
            top: 27.1%;
            right: -43.4%;
            transform: scale(0.6) !important;
        }

        .total_reaction {
            bottom: -16%;
            left: 18.5%;
            transform: scale(0.6) !important;
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 30.5%;
            left: 89.6%;
            transform: scale(0.6);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 30.5%;
            left: -3.3%;
            transform: scale(0.6);
        }

        .button_area {
            transform: scale(0.9);
            bottom: -16.4%;
        }
    }

    @media (max-width: 980px), (max-height: 580px) {
        .title_text {
            transform: scale(0.8);
            left: 8px;
        }

        .view_container {
            height: 377px;
            width: 478px;
            margin-top: -188px;
            margin-left: -239px;
        }

        .negative_reaction {
            top: 26.5%;
            left: -46.4%;
            transform: scale(0.5) !important;
        }

        .positive_reaction {
            top: 25.8%;
            right: -48.4%;
            transform: scale(0.5) !important;
        }

        .total_reaction {
            bottom: -17%;
            left: 12%;
            transform: scale(0.5) !important;
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 29.5%;
            left: 87.6%;
            transform: scale(0.5);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 29.5%;
            left: -4.8%;
            transform: scale(0.5);
        }
    }

    @media (max-width: 835px), (max-height: 510px) {
        .view_container {
            height: 301px;
            width: 382px;
            margin-top: -151px;
            margin-left: -191px;
        }

        .negative_reaction {
            top: 25.5%;
            left: -52.4%;
            transform: scale(0.4) !important;
        }

        .positive_reaction {
            top: 24.9%;
            right: -57.4%;
            transform: scale(0.4) !important;
        }

        .total_reaction {
            bottom: -20%;
            left: 3%;
            transform: scale(0.4) !important;
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 28.5%;
            left: 85.6%;
            transform: scale(0.4);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 28.5%;
            left: -6.2%;
            transform: scale(0.4);
        }

        .button_area {
            transform: scale(0.7);
            bottom: -5.4%;
        }
    }

    @media (max-width: 685px), (max-height: 390px) {
        .view_container {
            height: 226px;
            width: 287px;
            margin-top: -113px;
            margin-left: -143px;
        }

        .negative_reaction {
            top: 23.2%;
            left: -63.3%;
            transform: scale(0.3) !important;
        }

        .positive_reaction {
            top: 22.2%;
            right: -67.9%;
            transform: scale(0.3) !important;
        }

        .total_reaction {
            bottom: -22%;
            left: -14%;
            transform: scale(0.3) !important;
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 27.5%;
            left: 81.6%;
            transform: scale(0.3);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 27.5%;
            left: -11.3%;
            transform: scale(0.3);
        }

        .button_area {
            bottom: -16.4%;
            transform: scale(0.5);
        }
    }

    @media (max-height: 305px) {
        .view_container {
            height: 151px;
            width: 191px;
            margin-top: -75px;
            margin-left: -96px;
        }

        .negative_reaction {
            top: 19.2%;
            left: -85.3%;
            transform: scale(0.2) !important;
        }

        .positive_reaction {
            top: 17.2%;
            right: -96.9%;
            transform: scale(0.2) !important;
        }

        .total_reaction {
            bottom: -22%;
            left: -44%;
            transform: scale(0.2) !important;
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 23.5%;
            left: 75.6%;
            transform: scale(0.2);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 24.5%;
            left: -16.5%;
            transform: scale(0.2);
        }

    }
</style>

