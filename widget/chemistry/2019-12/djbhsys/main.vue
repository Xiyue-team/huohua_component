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
                               ref="icon"
                               :poster="posterImage"
                               style="object-fit:fill">
                            <source ref="icon" src="./sub_static/video/electrolytic_salt_water.mp4" type="video/mp4">
                        </video>
                        <img v-show="isEnding" class="pause" src="./sub_static/img/pause@2x.png" @click="playVideo()"/>
                    </div>

                    <!--反应式-->
                    <div id="reaction" v-show="isShowReaction">
                        <img id="anode_reaction" class="anode_reaction"
                             src="./sub_static/img/anode_reaction@2x.png"/>
                        <img id="cathode_reaction" class="cathode_reaction"
                             src="./sub_static/img/cathode_reaction@2x.png"/>
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
  import Vue from "vue";
  import "../../../../src/assets/css/core.css";
  import "../../../../src/assets/css/layout.css";
  import fullScreensLayout from "../../../../src/component/layout/fullScreens_layout.vue";
  import buttonPrimary from "../../../../src/component/ui/buttonPrimary.vue";
  import { ViewModel } from "./ViewModel";
  import Component from "vue-class-component";

  require("./sub_static/css/video-js.css");

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
        height: 682px;
        width: 764px;
        top: 50%;
        left: 50%;
        margin-top: -341px;
        margin-left: -382px;
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
        line-height: 14px;
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
        padding: 0;
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
        top: 15%;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        cursor: pointer;
        z-index: 3;
    }

    .anode_reaction {
        position: absolute;
        width: 282px;
        top: 24%;
        right: -48%;
        z-index: 2;
    }

    .cathode_reaction {
        position: absolute;
        width: 267px;
        top: 23%;
        left: -48%;
        z-index: 2;
    }

    .total_reaction {
        position: absolute;
        width: 649px;
        bottom: -12.4%;
        left: 7%;
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

    @media (max-width: 1610px), (max-height: 900px) {
        .view_container {
            width: 611px;
            height: 546px;
            margin-top: -273px;
            margin-left: -306px;
        }

        .anode_reaction {
            transform: scale(0.8);
            top: 23%;
            right: -48%;
        }

        .cathode_reaction {
            top: 23%;
            left: -48%;
            transform: scale(0.8);
        }

        .total_reaction {
            bottom: -18.4%;
            left: -2.8%;
            transform: scale(0.8);
        }

        .pause {
            transform: scale(0.8);
        }
    }

    @media (max-width: 1450px), (max-height: 800px) {
        .view_container {
            width: 535px;
            height: 477px;
            margin-top: -239px;
            margin-left: -268px;
        }

        .anode_reaction {
            top: 22.5%;
            right: -58%;
            transform: scale(0.7);
        }

        .cathode_reaction {
            top: 22.5%;
            left: -58%;
            transform: scale(0.7);
        }

        .total_reaction {
            bottom: -22.4%;
            left: -12.8%;
            transform: scale(0.7);
        }

        .pause {
            transform: scale(0.7);
        }
    }

    @media (max-width: 1260px), (max-height: 700px) {
        .view_container {
            width: 458px;
            height: 409px;
            margin-top: -205px;
            margin-left: -229px;
        }

        .anode_reaction {
            top: 21.5%;
            right: -65%;
            transform: scale(0.6);
        }

        .cathode_reaction {
            top: 21.5%;
            left: -63%;
            transform: scale(0.6);
        }

        .total_reaction {
            bottom: -25.4%;
            left: -20.8%;
            transform: scale(0.6);
        }

        .button_area {
            bottom: -23.4%;
        }

        .pause {
            transform: scale(0.6);
        }
    }

    @media (max-width: 1120px), (max-height: 650px) {
        .view_container {
            width: 382px;
            height: 341px;
            margin-top: -171px;
            margin-left: -191px;
        }

        .anode_reaction {
            top: 20.5%;
            right: -73%;
            transform: scale(0.5);
        }

        .cathode_reaction {
            top: 20.5%;
            left: -73%;
            transform: scale(0.5);
        }

        .total_reaction {
            transform: scale(0.5);
            left: -36.8%;
            bottom: -24.8%;
        }

        .button_area {
            transform: scale(0.8);
            bottom: -25.4%;
        }

        .pause {
            transform: scale(0.5);
        }
    }

    @media (max-width: 950px), (max-height: 520px) {
        .title_text {
            transform: scale(0.8);
            left: 8px;
        }

        .view_container {
            width: 306px;
            height: 273px;
            margin-top: -137px;
            margin-left: -153px;
        }

        .anode_reaction {
            top: 19.5%;
            right: -80%;
            transform: scale(0.4);
        }

        .cathode_reaction {
            top: 19.5%;
            left: -80%;
            transform: scale(0.4);
        }

        .total_reaction {
            left: -56.8%;
            transform: scale(0.4);
        }

        .pause {
            transform: scale(0.4);
        }

    }

    @media (max-width: 780px), (max-height: 410px) {
        .view_container {
            width: 229px;
            height: 205px;
            margin-top: -103px;
            margin-left: -115px;
        }

        .anode_reaction {
            top: 16.9%;
            right: -87%;
            transform: scale(0.3);
        }

        .cathode_reaction {
            top: 16.9%;
            left: -87%;
            transform: scale(0.3);
        }

        .total_reaction {
            transform: scale(0.3);
            bottom: -35.8%;
            left: -91.8%;
        }

        .button_area {
            transform: scale(0.7);
            bottom: -24.4%;
        }

        .pause {
            transform: scale(0.3);
        }
    }

    @media (max-width: 630px), (max-height: 330px) {
        .view_container {
            width: 153px;
            height: 136px;
            margin-top: -68px;
            margin-left: -77px;
        }

        .anode_reaction {
            top: 11.9%;
            right: -117%;
            transform: scale(0.2);
        }

        .cathode_reaction {
            top: 11.9%;
            left: -117%;
            transform: scale(0.2);
        }

        .total_reaction {
            bottom: -35.8%;
            left: -160.8%;
            transform: scale(0.2);
        }

        .button_area {
            transform: scale(0.4);
        }

        .pause {
            transform: scale(0.2);
        }
    }
</style>

