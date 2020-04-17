<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div class="content" :style="{zoom:zoom1}">
                    <img src="./sub_static/UI/bj.png">
                    <div class="monban" v-show="showMonban"></div>
                    <div class="start">
                        <div class="left">
                            <img :src="imgLeft"/>
                            <div class="left_text" v-show="!showVideo">{{listArr[0]}}</div>
                        </div>
                        <div class="right">
                            <img :src="imgRight"/>
                            <div class="right_text" v-show="!showVideo">{{listArr[1]}}</div>
                        </div>
                    </div>
                    <div class="videoBoxBorder" v-show="showVideo">
                        <img src="./sub_static/UI/biankaung.png"/>
                        <div class="videoBox" >
                            <video id="my-video1" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                   x-webkit-airplay="true"
                                   preload="auto"
                                   x5-playsinline playsinline
                                   webkit-playsinline
                                   data-setup="{}"
                                   ref="icon"
                                   :poster="picture"
                                   style="border-radius:0;object-fit:fill">
                                <source  id="sourceId1"    src="./sub_static/Video/1.mp4" type="video/mp4">
                            </video>
                        </div>
                        <div class="playButton" v-show="showPlayButton" @click="clickButton">
                            <img src="./sub_static/UI/playButton.png"/>
                        </div>
                        <div class="videoTitle">{{msg}}</div>
                    </div>
                </div>
                <div class="buttonBox" id="buttonBox">
                    <div :class="{btn1:have,isChecked:ishave===1}" @click="getEvent(1)">{{buttonArr[0]}}</div>
                    <div :class="{btn2:have,isChecked:ishave===2}" @click="getEvent(2)">{{buttonArr[1]}}</div>
                    <div :class="{btn3:have,isChecked:ishave===3}" @click="getEvent(3)">{{buttonArr[2]}}</div>
                </div>
                
                <label for="checkbox-1" id="s1" class="control-block_div_border switch" v-show="ishave===1 || ishave===2 || ishave===3">
                      <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" v-model="lightPath" @click="getEvent(4)">
                      <label for="checkbox-1"><span style="font-size: 22px;color: #FFFFFF">{{buttonArr[3]}}</span></label>
                </label>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">
                </div>
            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
  import "@/assets/css/core.css";
  import "../../../../src/assets/css/layout.css";
  import fullScreensLayout from "../../../../src/component/layout/fullScreens_layout.vue";
  import Component from "vue-class-component";
  import { MainVueComponent } from "./mainVueComponent";

  // require("video.js/dist/video-js.css");
  require("../../../../src/libs/video-js.css");
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
        pointer-events: none;
    }

    .content {
        width: 100%;
        height: 100%;
    }

    .monban {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.6;
        background: #000000;
        z-index: 9;
    }

    .start {
        width: 768px;
        height: 244px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }

    .left {
        width: 396px;
        height: 100%;
        float: left;
    }

    .left_text {
        font-size: 20px;
        color: #FFFFFF;
        line-height: 22px;
        text-align: center;
    }

    .right_text {
        font-size: 20px;
        color: #FFFFFF;
        line-height: 22px;
        text-align: center;
    }

    .right {
        width: 328px;
        height: 100%;
        float: right;
    }
    .videoBoxBorder{
        width: 560px;
        height: 315px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform:translate(-50%,-50%);
        z-index: 99;
    }
    .videoBox {
        width: 526px;
        height: 277px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform:translate(-50%,-50%);
        pointer-events: none;
    }

    .myVideo {
        width: 100%;
        height: 100%;
    }
    .playButton{
         width: 44px;
        height: 44px;
        position: absolute;
        right: 6.3%;
        bottom: 8.6%;
        cursor: pointer;
    }
    .videoTitle{
        width: 180px;
        height: 22px;
        position: absolute;
        left: 5.3%;
        bottom: 8.6%;
        font-size: 20px;
        color: #FFFFFF;
        text-align: right;
        line-height: 22px;
        white-space: nowrap;
    }
    .buttonBox {
        width: 88px;
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: absolute;
        top: 50%;
        right: 2.3%;
        transform: translateY(-50%);
        z-index: 99;
    }

    .btn1 {
        width: 88px;
        height: 38px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        border-radius: 19px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #000000;
        cursor: pointer;
        padding-top:1px;
    }

    .btn2 {
        width: 88px;
        height: 38px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        border-radius: 19px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #000000;
        cursor: pointer;
         padding-top:1px;
    }

    .btn3 {
        width: 88px;
        height: 38px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        border-radius: 19px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #000000;
        cursor: pointer;
         padding-top:1px;
    }

    .isChecked {
        background: #0291FF;
        color: #FFFFFF;
    }

    /* #s1 {
        width: 78px;
        height: 26px;
        position: absolute;
        right: 2.3%;
        bottom: 13.4%;
        z-index: 99;
    } */
     #s1{
        position: absolute;
        width: 100px;
        right: 2.3%;
        bottom: 13.4%;
        background: none;
        box-shadow: none;
        z-index: 99;
    }
    /*适配各种设备*/
    @media ( width: 640px) {
        .btn1,.btn2,.btn3{
            padding-top: 2px;
        }
        
    }
    @media ( height: 330px) {

    }
</style>
