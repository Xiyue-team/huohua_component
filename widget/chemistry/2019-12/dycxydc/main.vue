<template>
    <fullScreensLayout>
        <template slot="viewBox" slot-scope="viewBox">
            <div id="background" class="background">
                <!--标题-->
                <div class="title_text">{{title}}</div>

                <!--初始界面-->
                <div id="original_page" class="original_page" v-show="!isDeviceFinish">
                    <p v-show="isOriginal">{{notice}}</p>
                    <div id="equation">
                        <img src="./sub_static/img/line.png" class="line"/>
                        <img :src="electronic_image" class="electronic"
                             @click="showLightBulb()"/>
                        <img :src="zinc_image" class="zinc" @click="showZinc()"/>
                        <img :src="sulfuric_acid_image" class="sulfuric_acid"
                             @click="showSolution()"/>
                        <img src="./sub_static/img/equation@2x.png" class="equation"/>
                    </div>
                </div>

                <div class="view_container" id="view_container" v-show="!isOriginal">

                    <div class="device_container" v-show="!isOriginal && !isDeviceFinish">
                        <img src="./sub_static/img/light_bulb@2x.png" class="light_bulb" v-show="isLightBulbShow"/>
                        <img src="./sub_static/img/solution@2x.png" class="solution" v-show="isSolutionShow"/>
                        <img src="./sub_static/img/zinc_carbon@2x.png" class="zinc_carbon" v-show="isZincShow"/>
                    </div>


                    <!--封面图-->
                    <div id="MacroImage" v-show="isDeviceFinish && !isMacro && !isMicro || isMacro">
                        <p>{{electrode[0]}}</p>
                        <p>{{electrode[1]}}</p>
                        <img src="./sub_static/img/macro_click@2x.png" v-show="isMacro"/>
                        <img src="./sub_static/img/macro_unclick@2x.png"
                             v-show="isDeviceFinish && !isMacro && !isMicro"/>
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
                            <source ref="icon" src="./sub_static/video/single_liquid_carbon_zinc.mp4" type="video/mp4">
                        </video>
                    </div>

                    <!--反应式-->
                    <div id="reaction" v-show="isShowReaction">
                        <img id="positive_reaction" class="positive_reaction"
                             src="./sub_static/img/negative_reaction@2x.png"/>
                        <img id="negative_reaction" class="negative_reaction"
                             src="./sub_static/img/positive_reaction@2x.png"/>
                        <img id="total_reaction" class="total_reaction" src="./sub_static/img/total_reaction@2x.png"/>
                    </div>
                </div>

                <!--控件区-->
                <div class="button_area" v-show="isDeviceFinish">
                    <div @click="selectType('macro')">
                        <buttonPrimary class="button macro"
                                       :class="isMacro?'button_click': ''"
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
        height: 807px;
        width: 860px;
        top: 45%;
        left: 50%;
        margin-top: -403px;
        margin-left: -430px;
    }

    .original_page {
        position: relative;
        height: 807px;
        width: 860px;
        left: 50%;
        margin-top: -403px;
        margin-left: -430px;
        top: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .animation {
        transform: translate3d(-93%, -360%, 0) scale(0.7);
        transition: 1.5s;
    }

    .device_container {
        position: absolute;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .light_bulb {
        position: absolute;
        top: 0.5%;
        width: 60.6%;
        animation: light_bulb 1s ease;
    }

    .solution {
        position: absolute;
        width: 100%;
        z-index: 2;
        bottom: 0;
        animation: light_bulb 2s ease;
    }

    .zinc_carbon {
        position: absolute;
        width: 71%;
        margin-top: 6.6%;
        animation: light_bulb 2s ease;
    }

    @keyframes light_bulb {
        from {
            transform: translateY(-50px);
        }
        to {
            transform: translateY(0px);
        }
    }

    @keyframes solution {
        from {
            transform: translateY(-50px);
        }
        to {
            transform: translateY(0px);
        }
    }

    @keyframes zinc_carbon {
        from {
            transform: translateY(-50px);
        }
        to {
            transform: translateY(0px);
        }
    }

    .original_page p {
        font-size: 32px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
        line-height: 26px;
        position: absolute;
        margin-top: -30%;
    }

    .line {
        position: absolute;
        margin-top: -50px;
        margin-left: 132px;
    }

    .equation {
        position: relative;
        left: -8%;
    }

    .zinc {
        position: relative;
        left: 9%;
        z-index: 1;
        cursor: pointer;
    }

    .electronic {
        position: absolute;
        margin-top: -130px;
        margin-left: 162px;
        z-index: 1;
        cursor: pointer;
    }

    .sulfuric_acid {
        left: 15%;
        position: relative;
        z-index: 1;
        cursor: pointer;
    }

    #MacroImage {
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #MacroImage p:nth-child(1) {
        font-family: SourceHanSerifSC-Regular;
        position: absolute;
        width: 90px;
        font-size: 34px;
        color: #FFFFFF;
        line-height: 28px;
        top: 29.5%;
        left: 91.6%;
    }

    #MacroImage p:nth-child(2) {
        font-family: SourceHanSerifSC-Regular;
        position: absolute;
        width: 90px;
        font-size: 34px;
        color: #FFFFFF;
        line-height: 28px;
        top: 29.5%;
        right: 89.5%;
    }

    #MacroImage img {
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
        left: 91.6%;
        z-index: 1;
    }

    .videoBox p:nth-child(2) {
        font-family: SourceHanSerifSC-Regular;
        position: absolute;
        width: 90px;
        font-size: 34px;
        color: #FFFFFF;
        line-height: 28px;
        top: 29.5%;
        right: 89.5%;
        z-index: 1;
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
        width: 275px;
        top: 28.2%;
        right: -38.4%;
        z-index: 2;
    }

    .negative_reaction {
        position: absolute;
        width: 254px;
        top: 28.5%;
        left: -35.4%;
        z-index: 2;
    }

    .total_reaction {
        position: absolute;
        bottom: -9.5%;
        left: 28.6%;
        z-index: 2;
        width: 360px;
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

    @media (max-width: 1720px) {
        .original_page {
            transform: scale(0.8) !important;
        }

        .animation {
            transform: translate3d(-93%, -360%, 0) scale(0.7);
        }
    }

    @media (max-width: 1610px), (max-height: 900px) {
        .view_container {
            height: 646px;
            width: 688px;
            margin-top: -323px;
            margin-left: -344px;
        }

        .original_page {
            transform: scale(0.7) !important;
        }

        .positive_reaction {
            right: -43.7%;
            top: 26.5%;
            transform: scale(0.8);
        }

        .negative_reaction {
            top: 26.5%;
            left: -41.7%;
            transform: scale(0.8);
        }

        .total_reaction {
            left: 25.5%;
            bottom: -12.8%;
            transform: scale(0.8);
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 28.5%;
            left: 89.6%;
            transform: scale(0.8);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 28.4%;
            right: 88.5%;
            transform: scale(0.8);
        }
    }

    @media (max-width: 1450px), (max-height: 750px) {
        .view_container {
            height: 565px;
            width: 602px;
            margin-top: -283px;
            margin-left: -301px;
        }

        .positive_reaction {
            top: 26%;
            right: -47.7%;
            transform: scale(0.7);
        }

        .negative_reaction {
            top: 27.5%;
            left: -45.7%;
            transform: scale(0.7);
        }

        .total_reaction {
            left: 22.5%;
            bottom: -12.8%;
            transform: scale(0.7);
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 28.5%;
            left: 88.6%;
            transform: scale(0.7);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 29%;
            right: 87.5%;
            transform: scale(0.7);
        }

        .original_page {
            transform: scale(0.6) !important;
        }
    }

    @media (max-width: 1260px), (max-height: 660px) {
        .view_container {
            height: 484px;
            width: 516px;
            margin-top: -242px;
            margin-left: -258px;
        }

        .positive_reaction {
            right: -53.7%;
            top: 25.5%;
            transform: scale(0.6);
        }

        .negative_reaction {
            top: 26.5%;
            left: -51.7%;
            transform: scale(0.6);
        }

        .total_reaction {
            left: 15.5%;
            bottom: -12.8%;
            transform: scale(0.6);
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 28%;
            left: 87.6%;
            transform: scale(0.6);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 28%;
            right: 86.5%;
            transform: scale(0.6);
        }

        .button_area {
            bottom: -23.4%;
        }

        .original_page {
            transform: scale(0.5) !important;
        }
    }

    @media (max-width: 1120px), (max-height: 580px) {
        .view_container {
            height: 404px;
            width: 430px;
            margin-top: -202px;
            margin-left: -215px;
        }

        .positive_reaction {
            right: -60.7%;
            top: 24.5%;
            transform: scale(0.5);
        }

        .negative_reaction {
            top: 25.5%;
            left: -56.7%;
            transform: scale(0.5);
        }

        .total_reaction {
            left: 8.5%;
            bottom: -18.8%;
            transform: scale(0.5);
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 27.5%;
            left: 85.6%;
            transform: scale(0.5);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 27.5%;
            right: 84.5%;
            transform: scale(0.5);
        }

        .button_area {
            transform: scale(0.8);
            bottom: -23.4%;
        }
    }

    @media (max-width: 950px), (max-height: 500px) {
        .title_text {
            transform: scale(0.8);
            left: 8px;
        }

        .view_container {
            height: 323px;
            width: 344px;
            margin-top: -161px;
            margin-left: -172px;
        }

        .positive_reaction {
            right: -74.7%;
            top: 22.5%;
            transform: scale(0.4);
        }

        .negative_reaction {
            top: 24.5%;
            left: -69.7%;
            transform: scale(0.4);
        }

        .total_reaction {
            left: -1.5%;
            bottom: -24.8%;
            transform: scale(0.4);
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 26.5%;
            left: 83.6%;
            transform: scale(0.4);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 26.5%;
            right: 81.6%;
            transform: scale(0.4);
        }

        .button_area {
            bottom: -12.4%;
            transform: scale(0.8);
        }

        .animation {
            transform: translate3d(-70%, -360%, 0) scale(.7);
        }
    }

    @media (max-width: 780px), (max-height: 420px) {
        .view_container {
            height: 242px;
            width: 258px;
            margin-top: -121px;
            margin-left: -129px;
        }

        .positive_reaction {
            right: -78.7%;
            top: 19.6%;
            transform: scale(0.3);
        }

        .negative_reaction {
            top: 20.5%;
            left: -73.7%;
            transform: scale(0.3);
        }

        .total_reaction {
            left: -19.5%;
            bottom: -28.8%;
            transform: scale(0.3);
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 24.5%;
            left: 78.6%;
            transform: scale(0.3);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 24.5%;
            right: 77.5%;
            transform: scale(0.3);
        }

        .original_page {
            transform: scale(0.3) !important;
        }

        .animation {
            transform: translate3d(-70%, -380%, 0) scale(.7);
        }

        .button_area {
            transform: scale(0.6);
            bottom: -14.4%;
        }
    }

    @media (max-height: 350px) {
        .view_container {
            height: 202px;
            width: 215px;
            margin-top: -101px;
            margin-left: -108px;
        }

        .negative_reaction {
            top: 20.2%;
            left: -87.3%;
            transform: scale(0.2) !important;
        }

        .positive_reaction {
            top: 19.2%;
            right: -93.9%;
            transform: scale(0.2) !important;
        }

        .total_reaction {
            bottom: -22%;
            left: -31%;
            transform: scale(0.2) !important;
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 24.5%;
            left: 75.6%;
            transform: scale(0.3);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 24.5%;
            right: 73%;
            transform: scale(0.3);
        }

        .animation {
            transform: translate3d(-92%, -100%, 0) scale(.7);
        }
    }
</style>
