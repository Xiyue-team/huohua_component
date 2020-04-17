<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div class="content" :style="{zoom:zoom1}">
                    <img class="backGround" src="./sub_static/UI/bj.png">
                    <div class="start">
                        <img :src="stImg"/>
                        <div class="videoButton" v-show="ishave===4" @click="getVideo"></div>
                        <div class="xian" v-show="showVideo"><img src="./sub_static/UI/xian.png"/></div>
                        <div class="videoBox" v-show="showVideo">
                            <video id="my-video1" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                   x-webkit-airplay="true"
                                   preload="true"
                                   x5-playsinline
                                   playsinline
                                   webkit-playsinline
                                   data-setup="{}"
                                   ref="icon"
                                   loop="true"
                                   poster="picture"
                                   style="border-radius:12px ;object-fit:fill">
                                <source src="./sub_static/Video/1.mp4" type="video/mp4">
                            </video>
                        </div>
                        <div class="left" v-show="showVideo"><img src="./sub_static/UI/biaozhu.png"/></div>
                        <div class="right" v-show="showVideo">
                            <p>O<sub>2</sub>、{{buttonArr[4]}}</p>
                            <p>CO<sub>2</sub>、{{buttonArr[5]}}</p>
                        </div>
                    </div>
                </div>
                <div class="buttonBox">
                    <div :class="{btn1:have,isChecked:ishave===1}" @click="getEvent(1)">{{buttonArr[0]}}</div>
                    <div :class="{btn2:have,isChecked:ishave===2}" @click="getEvent(2)">{{buttonArr[1]}}</div>
                    <div :class="{btn3:have,isChecked:ishave===3}" @click="getEvent(3)">{{buttonArr[2]}}</div>
                    <div :class="{btn4:have,isChecked:ishave===4}" @click="getEvent(4)">{{buttonArr[3]}}</div>
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">
                </div>
            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
  import "../../../../src/assets/css/core.css";
  import "../../../../src/assets/css/layout.css";
  import fullScreensLayout from "../../../../src/component/layout/fullScreens_layout.vue";
  import Component from "vue-class-component";
  import { MainVueComponent } from "./mainVueComponent";
  require('video.js/dist/video-js.css');
  // require("../../../../src/libs/video-js.css");
  @Component({
    components: {
      fullScreensLayout
    }
  })
  export default class App extends MainVueComponent {
  }
</script>

<style scoped="scoped">
    * {
        margin: 0;
        padding: 0;
        touch-action: none;
    }

    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    ul, ol, li {
        list-style: none;
    }

    .title_text {
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
        text-align: center;
        line-height: 24px;
        font-family: SourceHanSansSC-Medium;
        font-size: 24px;
        color: #fff;
    }

    img {
        width: 100%;
        height: 100%;
        border: none;
        pointer-events: none;
    }

    .content {
        width: 100%;
        height: 100%;
    }

    .start {
        width: 294px;
        height: 350px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .videoButton {
        width: 40px;
        height: 40px;
        background: rgba(46, 46, 46, 0.30);
        border: 1px solid #FFFFFF;
        border-radius: 2px;
        position: absolute;
        top: 104px;
        left: 22px;
        cursor: pointer;
    }

    .xian {
        width: 60px;
        height: 1px;
        position: absolute;
        left: -38px;
        top: 112px;
    }

    .videoBox {
        width: 303px;
        height: 244px;
        position: absolute;
        top: 20px;
        left: -340px;
        /*pointer-events: none;*/
        z-index: 999;
    }

    .myVideo {
        width: 100%;
        height: 100%;
    }

    .left {
        width: 17px;
        height: 43px;
        position: absolute;
        top: 290px;
        left: -340px;
    }

    .right {
        width: 124px;
        height: 50px;
        position: absolute;
        top: 284px;
        left: -310px;
    }

    p {
        font-size: 16px;
        color: #FFFFFF;
        line-height: 28px;
        white-space: nowrap;
    }

    .buttonBox {
        width: 94px;
        height: 212px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: absolute;
        top: 50%;
        right: 2.3%;
        transform: translateY(-50%);
    }

    .btn1 {
        width: 94px;
        height: 38px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        border-radius: 19px;
        line-height: 38px;
        text-align: center;
        font-size: 14px;
        color: #000000;
        cursor: pointer;
    }

    .btn2 {
        width: 94px;
        height: 38px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        border-radius: 19px;
        line-height: 38px;
        text-align: center;
        font-size: 14px;
        color: #000000;
        cursor: pointer;
    }

    .btn3 {
        width: 94px;
        height: 38px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        border-radius: 19px;
        line-height: 38px;
        text-align: center;
        font-size: 14px;
        color: #000000;
        cursor: pointer;
    }

    .btn4 {
        width: 94px;
        height: 38px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        border-radius: 19px;
        line-height: 38px;
        text-align: center;
        font-size: 14px;
        color: #000000;
        cursor: pointer;
    }
    .isChecked {
        background: #0291FF;
        color: #FFFFFF;
    }
</style>
<style>
    @media (max-height: 450px) {
        .control_div_resetBtn {
            position: absolute;
            right: 0!important;
            top: 0!important;
            transform: scale(0.6);
        }
    }
</style>
