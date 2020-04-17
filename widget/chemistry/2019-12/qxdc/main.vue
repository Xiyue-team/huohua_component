<template>
    <fullScreensLayout>
        <template slot="viewBox" slot-scope="viewBox">
            <div id="background" class="background" ondragstart="return false">
                <!--标题-->
                <div class="title_text">{{title}}</div>

                <!--封面图-->
                <div id="coverImage" v-show="!isCharge && !isDischarge">
                    <div class="discharge">
                        <img src="./sub_static/img/discharge@2x.png"/>
                        <p>{{button[0]}}</p>
                    </div>
                    <div class="charge">
                        <img src="./sub_static/img/charge@2x.png"/>
                        <p>{{button[1]}}</p>
                    </div>
                </div>

                <!--视频播放区-->
                <div id="videoBox" class="videoBox" v-show="isDischarge || isCharge">
                    <video id="dischargeVideo" class="video-js"
                           x-webkit-airplay="true"
                           preload="auto"
                           x5-playsinline playsinline
                           webkit-playsinline
                           poster="./sub_static/img/charge@2x.png"
                           ref="icon"
                           style="object-fit:fill">
                        <source id="video1" ref="icon" src="./sub_static/video/discharge.mp4" type="video/mp4">
                    </video>
                    <video id="chargeVideo" class="video-js"
                           x-webkit-airplay="true"
                           preload="auto"
                           x5-playsinline playsinline
                           webkit-playsinline
                           poster="./sub_static/img/discharge@2x.png"
                           ref="icon"
                           style="object-fit:fill">
                        <source id="video2" ref="icon" src="./sub_static/video/charge.mp4" type="video/mp4">
                    </video>
                    <img v-show="isEnding" class="pause" src="./sub_static/img/pause@2x.png" @click="playVideo()" ondragstart="return false"/>

                    <!--反应式-->
                    <div id="reaction">
                        <img id="positive_reaction" :class="isCharge?'anode_reaction':'positive_reaction'"
                             src=""/>
                        <img id="negative_reaction" :class="isCharge?'cathode_reaction':'negative_reaction'"
                             src=""/>
                        <img id="total_reaction"
                             :class="isCharge?'charge_total_reaction':'discharge_total_reaction'" src=""/>
                    </div>
                </div>

                <!--控件区-->
                <div class="button_area">
                    <div @click="selectType('discharge')">
                        <buttonPrimary class="button discharge_button"
                                       :class="isDischarge?'button_click': ''"
                                       v-show="true"
                                       v-bind:title="button[0]">
                        </buttonPrimary>
                    </div>
                    <div @click="selectType('charge')">
                        <buttonPrimary class="button charge_button"
                                       :class="isCharge?'button_click': ''"
                                       v-show="true"
                                       v-bind:title="button[1]">
                        </buttonPrimary>
                    </div>
                    <div class="switch reaction_button" v-show="isCharge || isDischarge">
                        <input type="checkbox" id="reaction_button" @click="openReaction()">
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

    #coverImage {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .title_text {
        position: absolute;
        font-size: 28px;
        color: #FFFFFF;
        line-height: 28px;
        top: 32px;
        left: 32px;
    }

    .charge {
        position: absolute;
        width: 29.6%;
        left: 50%;
    }

    .charge img {
        width: 100%;
        height: 100%;
    }

    .charge p {
        font-size: 24px;
        color: #FFFFFF;
        line-height: 28px;
        text-align: center;
        margin-top: 2.8%;
    }

    .discharge {
        position: absolute;
        width: 29.6%;
        left: 13.7%;
    }

    .discharge img {
        width: 100%;
        height: 100%;
    }

    .discharge p {
        font-size: 24px;
        color: #FFFFFF;
        line-height: 28px;
        text-align: center;
        margin-top: 2.8%;
    }

    .button_click {
        background: #0091FF;
        color: #FFFFFF !important;
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

    .charge_button {
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

    .videoBox {
        position: absolute;
        bottom: 14.1%;
        right: 0;
        left: 0;
        top: 0;
        margin: auto;
        height: 774px;
        width: 812px;
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

    #reaction {
        display: none;
    }

    .positive_reaction {
        position: absolute;
        width: 486px;
        top: 32.4%;
        right: -63%;
        z-index: 2;
    }

    .negative_reaction {
        position: absolute;
        width: 470px;
        top: 32.5%;
        left: -62.3%;
        z-index: 2;
    }

    .discharge_total_reaction {
        position: absolute;
        width: 755px;
        bottom: -11.5%;
        left: 4.5%;
        z-index: 2;
    }

    .anode_reaction {
        position: absolute;
        width: 403px;
        top: 32.8%;
        right: -54.8%;
        z-index: 2;
    }

    .cathode_reaction {
        position: absolute;
        width: 499px;
        top: 32.3%;
        left: -63.2%;
        z-index: 2;
    }

    .charge_total_reaction {
        position: absolute;
        width: 733px;
        bottom: -11.5%;
        left: 5%;
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

    @media (min-height: 1000px) {
        .videoBox {
            transform: scale(0.9) !important;
        }
    }

    @media (max-width: 1840px) {
        .videoBox {
            transform: scale(0.9) !important;
        }

        #coverImage {
            transform: scale(0.9);
        }
    }

    @media (max-width: 1700px),(max-height: 800px) {
        .videoBox {
            transform: scale(0.8) !important;
        }

        #coverImage {
            transform: scale(0.8);
        }
    }

    @media (max-width: 1500px), (max-height: 700px) {
        .videoBox {
            transform: scale(0.7) !important;
        }

        .discharge_total_reaction {
            bottom: -15.5%;
        }

        .charge_total_reaction {
            bottom: -15.5%;
        }

        .button_area {
            bottom: -23.4%;
        }
    }

    @media (max-width: 1300px), (max-height: 666px) {
        .videoBox {
            transform: scale(0.6) !important;
        }

    }

    @media (max-width: 1200px) {
        .videoBox {
            transform: scale(0.5) !important;
        }

        .discharge_total_reaction {
            bottom: -25.5%;
        }

        .charge_total_reaction {
            bottom: -25.5%;
        }

        .discharge p {
            font-size: 18px;
        }

        .charge p {
            font-size: 18px;
        }

        .button_area {
            transform: scale(0.8);
            bottom: -16.4%;
        }
    }

    @media (max-width: 1000px), (max-height: 565px) {
        .videoBox {
            transform: scale(0.4) !important;
        }

        .discharge_total_reaction {
            bottom: -13.5%;
        }

        .charge_total_reaction {
            bottom: -13.5%;
        }

        .button_area {
            bottom: -12.4%;
            transform: scale(0.7);
        }
    }

    @media (max-width: 800px), (max-height: 375px) {
        .videoBox {
            left: -10%;
            transform: scale(0.3) !important;
        }

        .discharge_total_reaction {
            bottom: -21.5%;
        }

        .charge_total_reaction {
            bottom: -21.5%;
        }

        .title_text {
            font-size: 24px;
        }

        .discharge p {
            font-size: 16px;
        }

        .charge p {
            font-size: 16px;
        }

        .button_area {
            transform: scale(0.6);
            bottom: -30.4%;
        }
    }

    @media (max-width: 620px) {
        .videoBox {
            left: -20%;
        }
    }

    @media (max-width: 580px), (max-height: 315px) {
        .videoBox {
            left: -33%;
            transform: scale(0.2) !important;
        }

        .button_area {
            transform: scale(0.4);
        }
    }
</style>

