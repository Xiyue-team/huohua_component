<template>
    <div class="aspectration bg_white covered root_div_container ">
        <fullScreens_layout>
            <template slot="viewBox" slot-scope="viewBox">
<!--                <video id="microVideo" class="video-js" preload="auto" :poster="videoPoster1">-->
<!--                    <source src="./sub_static/video/pfcgsdzm.mp4" type="video/mp4">-->
<!--                </video>-->

                <div class="background_style">
                </div>

                <div class="main-content">

                    <div class="videoBox">
                        <video id="microVideo" class="video-js VideoStyle vjs-default-skin vjs-big-play-none"
                               x-webkit-airplay="true"
                               preload="auto"
                               x5-playsinline playsinline
                               webkit-playsinline
                               ref="icon"
                               :poster="videoPoster1"
                               style="object-fit:fill">
                            <source id="sourceId1" ref="icon" src="./sub_static/video/asazmqd.mp4" type="video/mp4">
                        </video>
                    </div>

                    <div class="contatiner">
                        <!--导航部分-->
                        <div id="navigatorBar" v-show="showNavigatorBar">
                            <!--循环产生navigatorSteps -->
                            <div @href="void(0)" :id="'naviTab'+index" class="naviTab" v-for=" (navigatorStep,index) in navigatorSteps" @click="initbuttonClickEvent(index)">
                                <img :id="'bgImg'+index" class="bgImg" :src=navigatorStep.img>
                                <img class="csImg" :id="'csImg' + index" style="display: inline" src="./sub_static/csbfan.svg">
                            </div>
                        </div>

                        <!--控制部分-->
                        <div id="controlBar" v-show="showControlBar">
                            <!--循环产生-->
                            <div v-bind:id="'controlTab'+index" class="controlTab"
                                 v-for="(controlStep,index) in controlSteps" @click="playAndPause(index)">
                                <!--循环产生 controlSteps-->
                                <p v-bind:class="{'animate-fall-down': typefall[index] }"> {{controlSteps[index].name}}</p>
                                <img v-bind:id="'playBtn'+index" class="bfztImg " src="./sub_static/bfan.svg" v-bind:class="{'animate-fall-down': typefall[index],'animate-bounce-up': typebounce[index] }" v-show="!controlSteps[index].isPlaying">
                                <img v-bind:id="'stopBtn'+index" class="bfztImg " src="./sub_static/ztan.svg" v-bind:class="{'animate-fall-down': typefall[index],'animate-bounce-up': typebounce[index]  }" v-show="controlSteps[index].isPlaying">
                                <progress v-bind:id="'progress'+index" class="progress" value="0" max="100"></progress>
<!--                                <img v-bind:id="'jdImg'+index" class="jdImg" src="./sub_static/jdbb.svg" v-show="controlSteps[index].isShow">-->
                            </div>
                        </div>
                    </div>

                </div>

            </template>
        </fullScreens_layout>
    </div>
</template>

<script lang='ts'>
    import Vue from "vue";
    import "../../../../src/assets/css/core.css";
    import "../../../../src/assets/css/layout.css";
    import fullScreens_layout from "../../../../src/component/layout/fullScreens_layout.vue";
    import {ViewModel} from "./ViewModel";
    import Component from "vue-class-component";

    require("./sub_static/css/video-js.css");

    @Component({
        components: {
            fullScreens_layout
        },
        mixins: [ViewModel]
    })

    export default class App extends Vue {
    }

</script>

<style>

    #naviTab0 {
        border-top-left-radius: 7px;
        border-bottom-left-radius: 7px;
    }

    #naviTab3 {
        border-top-right-radius: 7px;
        border-bottom-right-radius: 7px;
    }

    #bgImg0 {
        border-top-left-radius: 7px;
        border-bottom-left-radius: 7px;
    }

    #bgImg3 {
        border-top-right-radius: 7px;
        border-bottom-right-radius: 7px;
    }


    .csImg:hover {
        margin-top: -5px;
    }

    .background_style {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        background: #353435;
    }

    .main-content {
        position: relative;
        width: 1200px;
        height: 807px;
        top: calc(50% - 403.5px);
        left: calc(50% - 600px);
    }

    .videoBox {
        position: absolute;
        width: 1200px;
        height: 675px;
    }

    .video-js {
        width: 100%;
        height: 100%;
    }

    .contatiner {
        width: 100%;
        height: 100%;
        margin-top: 24px;
        position: absolute;
    }

    #navigatorBar {
        margin: 0 auto;
        width: 800px;
        position: absolute;
        height: 108px;
        top: 93%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .naviTab {
        width: 198px;
        height: 100%;
        float: left;
        border: solid 1px #EAEAEA;

    }

    .myAnimation {
        border-top-left-radius: 7px;
        border-bottom-left-radius: 7px;
        border-top-right-radius: 7px;
        border-bottom-right-radius: 7px;
        /*background: #EAEAEA;*/
        float: left;
        border: solid 1px #EAEAEA;
        animation: myfirst 0.5s;
        -webkit-animation: myfirst 0.5s;
        animation-fill-mode: forwards;
        animation-timing-function: ease;
    }

    @keyframes myfirst
    {
        0% {
            transform: scaleY(1.0);
            left: 16.6%;
            top: 86.3%;
        }

        100% {
            transform: scaleY(0.44);
            left: 16.6%;
            top: 89.5%;
        }
    }

    #controlBar {
        margin: 0 auto;
        width: 800px;
        height: 44px;
        position: absolute;
        left: 50%;
        top: 97%;
        transform: translate(-50%, -50%);
    }

    .controlTab {
        width: 198px;
        height: 44px;
        float: left;
        border: solid 1px #EAEAEA;
        box-shadow: 0 0 0 0 #EAEAEA;
        background-color: #FFFFFF;
        position: relative;
    }

    p {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        left: 8%;
        font-weight: bold;
        color: black;
        position: relative;
        top: 26%;
        width: 50%
    }

    .bgImg {
        top: 1px;
        left: 1px;
        float: left;
        position: relative;
        width: 196px;
        height: 106px;
        cursor: pointer;
        bottom: 0px;
        /*opacity: 0.3;*/
    }

    .bfztImg {
        position: absolute;
        left: 150px;
        top: 10px;
        height: 24px;
        width: 24px;
        cursor: pointer;
    }

    .csImg {
        position: relative;
        width: 62px;
        height: 62px;
        left: 34.5%;
        bottom: 78.7%;
        cursor: pointer;
    }

    .progress {
        background-color: white;
        width: 100%;
        height: 4px !important;
        position: absolute;
        bottom: 0px;
        padding-left: 1px;
    }

    #progress0::-webkit-progress-bar {
        background-color: #FFFFFF;
        border-bottom-left-radius: 10px;
    }

    #progress0::-webkit-progress-value {
        border-bottom-left-radius: 10px;
        background-color: #FE570C;
    }

    #progress2::-webkit-progress-bar {
        background-color: #FFFFFF;
        border-bottom-left-radius: 0px;
    }

    #progress2::-webkit-progress-value {
        border-bottom-left-radius: 0px;
        background-color: #FE570C;
    }

    #progress1::-webkit-progress-bar {
        background-color: #FFFFFF;
        border-bottom-left-radius: 0px;
    }

    #progress1::-webkit-progress-value {
        border-bottom-left-radius: 0px;
        background-color: #FE570C;
    }

    #progress3::-webkit-progress-bar {
        background-color: #FFFFFF;
        border-bottom-right-radius: 10px;
    }

    #progress3::-webkit-progress-value {
        border-bottom-right-radius: 10px;
        background-color: #FE570C;
    }



    @keyframes fall-down {
        0% {
            transform: translateY(-15px);
            opacity: 0;
        }

        100% {
            transform: translateY(0px);
            opacity: 1
        }
    }

    @keyframes bounce-up {
        0% {transform: translateY(-5px);}

        100% {transform: translateY(0);}
    }

    .animate-bounce-up{
        -webkit-animation: bounce-up 0.5s ease-in-out 1;
        animation: bounce-up 0.5s ease-in-out 1;
    }

    .animate-fall-down {
        -webkit-animation: fall-down 0.5s ease-in-out 1;
        animation: fall-down 0.5s ease-in-out 1;
    }


    .control_div_resetBtn {
        display: none;
    }

</style>
<style scoped='scoped'>

</style>
