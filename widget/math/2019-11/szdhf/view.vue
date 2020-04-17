<template>
    <div class="aspectration bg_white covered root_div_container ">
        <fullScreens_layout>
            <template slot="viewBox" slot-scope="viewBox">
                <video id="microVideo" class="video-js" preload="auto" poster="none">
                    <source src="./sub_static/video/szdhf.mp4" type="video/mp4">
                </video>

                <div class="contatiner">
                    <!--导航部分-->
                    <div id="navigatorBar" v-show="showNavigatorBar">
                        <!--循环产生navigatorSteps -->
                        <div @href="void(0)" :id="'naviTab'+index" class="naviTab" v-for=" (navigatorStep,index) in navigatorSteps" @click="initbuttonClickEvent()">
                            <img :id="'bgImg'+index" class="bgImg" :src=navigatorStep.img>
                            <img class="csImg" src="./sub_static/csbfan.svg">
                        </div>
                    </div>

                    <!--控制部分-->
                    <div id="controlBar" v-show="showControlBar">
                        <!--循环产生-->
                        <div v-bind:id="'controlTab'+index" class="controlTab"
                             v-for="(controlStep,index) in controlSteps" @click="playAndPause(index)">
                            <!--循环产生 controlSteps-->
                            <p v-bind:class="{'animate-fall-down': typefall }"> {{controlSteps[index].name}}</p>
                            <img v-bind:id="'playBtn'+index" class="bfztImg " src="./sub_static/bfan.svg" v-bind:class="{'animate-fall-down': typefall,'animate-bounce-up': typebounce }" v-show="!controlSteps[index].isPlaying">
                            <img v-bind:id="'stopBtn'+index" class="bfztImg " src="./sub_static/ztan.svg" v-bind:class="{'animate-fall-down': typefall,'animate-bounce-up': typebounce  }" v-show="controlSteps[index].isPlaying">
                            <progress v-bind:id="'progress'+index" class="progress" value="0" max="100"></progress>
                            <img v-bind:id="'jdImg'+index" class="jdImg" src="./sub_static/jdbb.svg" v-show="controlSteps[index].isShow">
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
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    #naviTab3 {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    #bgImg0 {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    #bgImg3 {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .csImg:hover {
        margin-top: -10px;
    }

    .video-js {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #353435;
        position: absolute;
    }

    .contatiner {
        width: 100%;
        position: absolute;
        bottom: 40px;
        height: 100%;
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
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        background: #EAEAEA;
        float: left;
        border: solid 1px #EAEAEA;
        animation: myfirst 1s;
        -webkit-animation: myfirst 1s;
        animation-fill-mode: forwards;
        animation-timing-function: ease;
    }

    @keyframes myfirst /* Safari and Chrome */
    {
        0% {
            height: 97.2px;
            margin-top: 0px;
        }

        100% {
            height: 44px;
            margin-top: 33.3px;
        }
    }

    #controlBar {
        margin: 0 auto;
        width: 800px;
        height: 4.4%;
        position: absolute;
        left: 50%;
        top: 96.5%;
        transform: translate(-50%, -50%);
    }

    .controlTab {
        width: 198px;
        height: 42px;
        float: left;
        border: solid 1px #EAEAEA;
        box-shadow: 0 0 0 0 #EAEAEA;
        background-color: #FFFFFF;
    }

    .jdImg {
        left: -5%;
        float: left;
        position: relative;
        margin-top: -12.5%;
    }

    p {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        left: 8%;
        font-weight: bold;
        color: black;
        position: relative;
        top: 26%;
        width: 18%
    }

    .bgImg {
        float: left;
        position: relative;
        width: 100%;
        height: 100%;
        cursor: pointer;
        bottom: 0%;
        opacity: 0.3;
    }

    .bfztImg {
        margin-left: 79%;
        margin-top: -6%;
        top: 19%;
        height: 54%;
        cursor: pointer;
    }

    .csImg {
        position: relative;
        width: 100%;
        height: 60%;
        bottom: 80%;
        cursor: pointer;
    }

    .progress {
        color: red;
        background-color: white;
        width: 100%;
        height: 4px;
        margin-bottom: 10px;
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
        0% {transform: translateY(-10px);}

        100% {transform: translateY(0);}
    }

    .animate-bounce-up{
        -webkit-animation: bounce-up 0.2s ease-in-out 1;
        animation: bounce-up 0.2s ease-in-out 1;
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
    @media screen and (max-width: 1450px) {
        #navigatorBar {
            left: 47%;
            transform: scale(0.9) translate(-50%, -50%);
        }

        #controlBar {
            left: 47%;
            transform: scale(0.9) translate(-50%, -50%);
        }
    }

    @media screen and (max-width: 1300px) {
        #navigatorBar {
            left: 42%;
            transform: scale(0.8) translate(-50%, -50%);
        }

        #controlBar {
            left: 42%;
            transform: scale(0.8) translate(-50%, -50%);
        }
    }

    @media screen and (max-width: 1200px) {
        #navigatorBar {
            left: 37%;
            transform: scale(0.7) translate(-50%, -50%);
        }

        #controlBar {
            left: 37%;
            transform: scale(0.7) translate(-50%, -50%);
        }
    }

    @media screen and (max-width: 1050px) {
        #navigatorBar {
            left: 32%;
            transform: scale(0.58) translate(-50%, -50%);
        }

        #controlBar {
            left: 32%;
            transform: scale(0.58) translate(-50%, -50%);
        }
    }

    @media screen and (max-width: 900px) {
        #navigatorBar {
            left: 27%;
            transform: scale(0.53) translate(-50%, -50%);
        }

        #controlBar {
            left: 27%;
            transform: scale(0.53) translate(-50%, -50%);
        }
    }

    @media screen and (max-width: 700px) {
        #navigatorBar {
            left: 10%;
            transform: scale(0.45) translate(-50%, -50%);
        }

        #controlBar {
            left: 10%;
            transform: scale(0.45) translate(-50%, -50%);
        }
    }

    @media screen and (max-width: 500px) {
        #navigatorBar {
            left: 0%;
            transform: scale(0.4) translate(-50%, -50%);
        }

        #controlBar {
            left: 0%;
            transform: scale(0.4) translate(-50%, -50%);
        }
    }
</style>
