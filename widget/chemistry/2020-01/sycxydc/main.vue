<template>
    <fullScreensLayout>
        <template slot="viewBox" slot-scope="viewBox">
            <div id="background" class="background" ondragstart="return false">
                <!--标题-->
                <div class="title_text">{{title}}</div>

                <!--初始界面-->
                <div id="original_page" class="original_page" v-show="!isDeviceFinish">
                    <p v-show="isOriginal">{{notice}}</p>
                    <div id="equation">
                        <img src="./sub_static/img/line_lost@2x.png" class="line_lost"/>
                        <img :src="lost_electronic_image" class="lost_electronic"
                             @click="showLightBulb()"/>
                        <img src="./sub_static/img/line_get@2x.png" class="line_get"/>
                        <img :src="get_electronic_image" class="get_electronic"
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

                    <!--溶液名称-->
                    <div class="solution_name" v-show="isSolutionShow && !isShowReaction">
                        <img src="./sub_static/img/solution_name_1.png"/>
                        <img src="./sub_static/img/solution_name_2.png"/>
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
                               x5-playsinline playsinline
                               webkit-playsinline
                               :poster="posterImage"
                               ref="icon"
                               style="object-fit:fill">
                            <source ref="icon" src="./sub_static/video/two_liquid_carbon_zinc.mp4" type="video/mp4">
                        </video>
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
        height: 753px;
        width: 956px;
        top: 45%;
        left: 50%;
        margin-top: -376px;
        margin-left: -478px;
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
        transform: translate3d(-93%, -300%, 0) scale(0.7);
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
        top: 1%;
        width: 54.5%;
        animation: light_bulb 1s ease;
    }

    .solution {
        position: absolute;
        width: 99.8%;
        z-index: 2;
        bottom: 0;
        animation: light_bulb 2s ease;
    }

    .zinc_carbon {
        position: absolute;
        width: 64.9%;
        margin-top: 9.1%;
        margin-left: -0.2%;
        animation: zinc_carbon 2s ease;
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

    .line_lost {
        position: absolute;
        margin-top: -50px;
        margin-left: 132px;
    }

    .line_get {
        position: absolute;
        margin-top: 75px;
        margin-left: 320px;
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

    .lost_electronic {
        position: absolute;
        margin-top: -130px;
        margin-left: 254px;
        z-index: 1;
        cursor: pointer;
    }

    .get_electronic {
        position: absolute;
        margin-top: 130px;
        margin-left: 445px;
        z-index: 1;
        cursor: pointer;
    }

    .sulfuric_acid {
        left: 15%;
        position: relative;
        z-index: 1;
        cursor: pointer;
    }

    .solution_name {
        width: 100%;
        position: absolute;
        top: 104%;
        transform: scale(.52);
    }

    .solution_name img:nth-child(1) {
        float: left;
        margin-left: -21%;
    }

    .solution_name img:nth-child(2) {
        float: right;
        margin-right: -21%;
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
        top: 32.5%;
        left: 93%;
        z-index: 1;
    }

    #MacroImage p:nth-child(2) {
        font-family: SourceHanSerifSC-Regular;
        position: absolute;
        width: 90px;
        font-size: 34px;
        color: #FFFFFF;
        line-height: 28px;
        top: 31.5%;
        right: 90.8%;
        z-index: 1;
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
        top: 32.5%;
        left: 93%;
        z-index: 1;
    }

    .videoBox p:nth-child(2) {
        font-family: SourceHanSerifSC-Regular;
        position: absolute;
        width: 90px;
        font-size: 34px;
        color: #FFFFFF;
        line-height: 28px;
        top: 31.5%;
        right: 90.8%;
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
        top: 30.8%;
        right: -34.7%;
        z-index: 2;
    }

    .negative_reaction {
        position: absolute;
        width: 254px;
        top: 30.5%;
        left: -32.4%;
        z-index: 2;
    }

    .total_reaction {
        position: absolute;
        bottom: -10.5%;
        left: 27.6%;
        z-index: 2;
        width: 443px;
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
            height: 602px;
            width: 765px;
            margin-top: -301px;
            margin-left: -382px;
        }

        .original_page {
            transform: scale(0.8) !important;
        }

        .positive_reaction {
            right: -39.7%;
            top: 29.5%;
            transform: scale(0.8);
        }

        .negative_reaction {
            top: 29.5%;
            left: -36.7%;
            transform: scale(0.8);
        }

        .total_reaction {
            left: 21.5%;
            bottom: -12.8%;
            transform: scale(0.8);
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 31.5%;
            left: 91.6%;
            transform: scale(0.8);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 31.5%;
            right: 89.5%;
            transform: scale(0.8);
        }

        .solution_name {
            transform: scale(0.4);
        }

        .solution_name img:nth-child(1) {
            margin-left: -41%;
        }

        .solution_name img:nth-child(2) {
            margin-right: -42%;
        }

        .animation {
            transform: translate(-85%, -300%) scale(0.7);
        }

    }

    @media (max-width: 1450px), (max-height: 750px) {
        .view_container {
            height: 527px;
            width: 669px;
            margin-top: -264px;
            margin-left: -334px;
        }

        .original_page {
            transform: scale(0.7) !important;
        }

        .positive_reaction {
            top: 29%;
            right: -41.7%;
            transform: scale(0.7);
        }

        .negative_reaction {
            top: 29.5%;
            left: -38.7%;
            transform: scale(0.7);
        }

        .total_reaction {
            left: 17.5%;
            bottom: -12.8%;
            transform: scale(0.7);
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 31.5%;
            left: 90.6%;
            transform: scale(0.7);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 31.5%;
            right: 88.5%;
            transform: scale(0.7);
        }

        .solution_name {
            transform: scale(0.35);
        }

        .solution_name img:nth-child(1) {
            margin-left: -52%;
        }

        .solution_name img:nth-child(2) {
            margin-right: -53%;
        }
    }

    @media (max-width: 1260px), (max-height: 660px) {
        .view_container {
            height: 452px;
            width: 574px;
            margin-top: -226px;
            margin-left: -287px;
        }

        .original_page {
            transform: scale(0.6) !important;
        }

        .positive_reaction {
            right: -48.7%;
            top: 27.5%;
            transform: scale(0.6);
        }

        .negative_reaction {
            top: 27.5%;
            left: -45.7%;
            transform: scale(0.6);
        }

        .total_reaction {
            left: 12.5%;
            bottom: -12.8%;
            transform: scale(0.6);
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 30.5%;
            left: 89.6%;
            transform: scale(0.6);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 30.5%;
            right: 87.5%;
            transform: scale(0.6);
        }

        .solution_name {
            transform: scale(0.3);
        }

        .solution_name img:nth-child(1) {
            margin-left: -72%;
        }

        .solution_name img:nth-child(2) {
            margin-right: -66%;
        }

        .button_area {
            bottom: -23.4%;
        }
    }

    @media (max-width: 1120px), (max-height: 580px) {
        .view_container {
            height: 377px;
            width: 478px;
            margin-top: -188px;
            margin-left: -239px;
        }

        .original_page {
            transform: scale(0.5) !important;
        }

        .positive_reaction {
            right: -54.7%;
            top: 26.5%;
            transform: scale(0.5);
        }

        .negative_reaction {
            top: 27.5%;
            left: -50.7%;
            transform: scale(0.5);
        }

        .total_reaction {
            left: 4.5%;
            bottom: -18.8%;
            transform: scale(0.5);
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 30.5%;
            left: 85.6%;
            transform: scale(0.5);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 30.5%;
            right: 84.5%;
            transform: scale(0.5);
        }

        .button_area {
            transform: scale(0.8);
            bottom: -23.4%;
        }

        .solution_name {
            transform: scale(0.3);
        }

        .solution_name img:nth-child(1) {
            margin-left: -81%;
        }

        .solution_name img:nth-child(2) {
            margin-right: -72%;
        }
    }

    @media (max-width: 950px), (max-height: 500px) {
        .title_text {
            transform: scale(0.8);
            left: 8px;
        }

        .view_container {
            height: 301px;
            width: 382px;
            margin-top: -151px;
            margin-left: -191px;
        }

        .original_page {
            transform: scale(0.4) !important;
        }

        .positive_reaction {
            right: -64.7%;
            top: 24.5%;
            transform: scale(0.4);
        }

        .negative_reaction {
            top: 24.5%;
            left: -61.7%;
            transform: scale(0.4);
        }

        .total_reaction {
            left: -8.5%;
            bottom: -24.8%;
            transform: scale(0.4);
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 28.5%;
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

        .solution_name {
            transform: scale(0.25);
        }

        .solution_name img:nth-child(1) {
            margin-left: -107%;
        }

        .solution_name img:nth-child(2) {
            margin-right: -101%;
        }
    }

    @media (max-width: 780px), (max-height: 420px) {
        .view_container {
            height: 226px;
            width: 287px;
            margin-top: -113px;
            margin-left: -143px;
        }

        .original_page {
            transform: scale(0.3) !important;
        }

        .positive_reaction {
            right: -68.7%;
            top: 22.5%;
            transform: scale(0.3);
        }

        .negative_reaction {
            top: 22.5%;
            left: -63.7%;
            transform: scale(0.3);
        }

        .total_reaction {
            left: -27.5%;
            bottom: -28.8%;
            transform: scale(0.3);
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 27.5%;
            left: 81.6%;
            transform: scale(0.3);
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 26.5%;
            right: 79.5%;
            transform: scale(0.3);
        }

        .button_area {
            transform: scale(0.6);
            bottom: -14.4%;
        }

        .solution_name {
            transform: scale(0.15);
        }

        .solution_name img:nth-child(1) {
            margin-left: -186%;
        }

        .solution_name img:nth-child(2) {
            margin-right: -181%;
        }

        .animation {
            transform: translate(-78%, -300%) scale(0.7);
        }
    }

    @media (max-height: 340px) {
        .view_container {
            height: 150px;
            width: 191px;
            margin-top: -75px;
            margin-left: -96px;
        }

        .positive_reaction {
            right: -109.7%;
            top: 16.5%;
            transform: scale(0.3);
        }

        .negative_reaction {
            top: 18.5%;
            left: -99.7%;
            transform: scale(0.3);
        }

        .total_reaction {
            left: -64.5%;
            bottom: -34.8%;
            transform: scale(0.3);
        }

        #MacroImage p:nth-child(1), .videoBox p:nth-child(1) {
            top: 24.5%;
            left: 72.6%;
            transform: scale(0.3);
        }

        .solution_name {
            top: 90%;
        }

        .solution_name img:nth-child(1) {
            margin-left: -210%;
        }

        .solution_name img:nth-child(2) {
            margin-right: -217%;
        }

        #MacroImage p:nth-child(2), .videoBox p:nth-child(2) {
            top: 23.5%;
            right: 68.5%;
            transform: scale(0.3);
        }

        .button_area {
            bottom: -24.4%;
        }

        .animation {
            transform: translate(-78%, -100%) scale(.7);
        }

    }
</style>

