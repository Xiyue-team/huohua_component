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
                            <source ref="icon" src="./sub_static/video/single_liquid_copper_zinc.mp4"
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
        height: 807px;
        width: 860px;
        top: 45%;
        left: 50%;
        margin-top: -404px;
        margin-left: -430px;
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
        top: 29.5%;
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
        top: 29.5%;
        left: -0.4%;
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
        top: 29.5%;
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
        top: 29.5%;
        left: -0.4%;
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

    .negative_reaction {
        position: absolute;
        width: 254px;
        top: 28.5%;
        left: -35.4%;
        z-index: 2;
    }

    .positive_reaction {
        position: absolute;
        width: 275px;
        top: 28.2%;
        right: -38.4%;
        z-index: 2;
    }

    .total_reaction {
        position: absolute;
        width: 360px;
        bottom: -9.5%;
        right: 28.6%;
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
            height: 726px;
            width: 774px;
            margin-top: -363px;
            margin-left: -387px;
        }

        .negative_reaction {
            top: 27.5%;
            left: -41.4%;
            transform: scale(0.9) !important;
        }

        .positive_reaction {
            top: 27.3%;
            right: -47.4%;
            transform: scale(0.9) !important;
        }

        .total_reaction {
            bottom: -11%;
            left: 27%;
            transform: scale(0.9) !important;
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 29.5%;
            left: 89.6%;
            transform: scale(0.9);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 29.5%;
            right: 88.5%;
            transform: scale(0.9);
        }
    }

    @media (max-width: 1500px), (max-height: 820px) {
        .view_container {
            height: 646px;
            width: 688px;
            margin-top: -323px;
            margin-left: -344px;
        }

        .negative_reaction {
            top: 27%;
            left: -43.4%;
            transform: scale(0.8) !important;
        }

        .positive_reaction {
            top: 26.8%;
            right: -46.4%;
            transform: scale(0.8) !important;
        }

        .total_reaction {
            bottom: -14.5%;
            left: 23.6%;
            transform: scale(0.8) !important;
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 28.5%;
            left: 89.6%;
            transform: scale(0.8);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 28.5%;
            left: -1.5%;
            transform: scale(0.8);
        }
    }

    @media (max-width: 1280px), (max-height: 770px) {
        .view_container {
            height: 565px;
            width: 602px;
            margin-top: -283px;
            margin-left: -301px;
        }

        .negative_reaction {
            top: 26.5%;
            left: -45.4%;
            transform: scale(0.7) !important;
        }

        .positive_reaction {
            top: 25.5%;
            right: -50.4%;
            transform: scale(0.7) !important;
        }

        .total_reaction {
            bottom: -13%;
            left: 20%;
            transform: scale(0.7) !important;
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 28.5%;
            left: 88.6%;
            transform: scale(0.7);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 28.5%;
            left: -2%;
            transform: scale(0.7);
        }

        .button_area {
            bottom: -18.4%;
        }
    }

    @media (max-width: 1140px), (max-height: 650px) {
        .view_container {
            height: 484px;
            width: 516px;
            margin-top: -242px;
            margin-left: -258px;
        }

        .negative_reaction {
            top: 26.3%;
            left: -48.4%;
            transform: scale(0.6) !important;
        }

        .positive_reaction {
            top: 26.2%;
            right: -51.4%;
            transform: scale(0.6) !important;
        }

        .total_reaction {
            bottom: -16%;
            left: 15%;
            transform: scale(0.6) !important;
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 28.5%;
            left: 87.6%;
            transform: scale(0.6);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 28.5%;
            left: -3.5%;
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
            height: 404px;
            width: 430px;
            margin-top: -202px;
            margin-left: -215px;
        }

        .negative_reaction {
            top: 24.5%;
            left: -52.4%;
            transform: scale(0.5) !important;
        }

        .positive_reaction {
            top: 24.5%;
            right: -58.4%;
            transform: scale(0.5) !important;
        }

        .total_reaction {
            bottom: -17%;
            left: 8%;
            transform: scale(0.5) !important;
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 27.5%;
            left: 85.6%;
            transform: scale(0.5);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 27.5%;
            left: -5.5%;
            transform: scale(0.5);
        }
    }

    @media (max-width: 835px), (max-height: 510px) {
        .view_container {
            height: 323px;
            width: 344px;
            margin-top: -161px;
            margin-left: -172px;
        }

        .negative_reaction {
            top: 22.5%;
            left: -59.4%;
            transform: scale(0.4) !important;
        }

        .positive_reaction {
            top: 21.9%;
            right: -63.4%;
            transform: scale(0.4) !important;
        }

        .total_reaction {
            bottom: -20%;
            left: -3%;
            transform: scale(0.4) !important;
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 25.5%;
            left: 82.6%;
            transform: scale(0.4);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 25.5%;
            left: -7.5%;
            transform: scale(0.4);
        }

        .button_area {
            transform: scale(0.7);
            bottom: -5.4%;
        }
    }

    @media (max-width: 685px), (max-height: 390px) {
        .view_container {
            height: 242px;
            width: 258px;
            margin-top: -121px;
            margin-left: -129px;
        }

        .negative_reaction {
            top: 21.2%;
            left: -72.3%;
            transform: scale(0.3) !important;
        }

        .positive_reaction {
            top: 20.2%;
            right: -77.9%;
            transform: scale(0.3) !important;
        }

        .total_reaction {
            bottom: -22%;
            left: -20%;
            transform: scale(0.3) !important;
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 24.5%;
            left: 78.6%;
            transform: scale(0.3);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 24.5%;
            left: -12.5%;
            transform: scale(0.3);
        }

        .button_area {
            bottom: -16.4%;
            transform: scale(0.5);
        }
    }

    @media (max-height: 305px) {
        .view_container {
            height: 202px;
            width: 215px;
            margin-top: -101px;
            margin-left: -108px;
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
            left: -31%;
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

