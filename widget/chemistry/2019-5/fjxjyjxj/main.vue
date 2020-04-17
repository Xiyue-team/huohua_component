<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">非极性键与极性键</div>
                <div class="buttonBox">
                    <button :class="{active: active1}" @click="getEvent(1)">非极性键</button>
                    <button :class="{active: active2}" @click="getEvent(2)">极性键</button>
                </div>
                <div class="cover_box" v-show="coverShow">
                    <img class="end1" src="./sub_static/UI/end1.png">
                    <img class="end2" src="./sub_static/UI/end2.png">
                </div>
                <div class="reactionBox" v-show="!coverShow">
                    <div class="tipBox" v-show="active" ondragstart="return false">
                        <img class="tipImg" :src="tipImg">
                        <img id="playImg" src="./sub_static/UI/play.png" @click="playEvent()">
                    </div>
                    <div class="videoBox1" style="width: 100%; height: 100%" v-show="active1" ondragstart="return false">
                        <video id="my-video1" class="video-js myVideo vjs-default-skin " preload="auto"
                               x5-playsinline playsinline webkit-playsinline data-setup="{}" :poster = "picture1">
                            <source src="./sub_static/UI/fjxj.mp4" type="video/mp4">
                        </video>
                    </div>
                    <div class="videoBox2" style="width: 100%; height: 100%" v-show="active2" ondragstart="return false">
                        <video id="my-video2" class="video-js myVideo vjs-default-skin " preload="auto"
                               x5-playsinline playsinline webkit-playsinline data-setup="{}" :poster = "picture2" ondragstart="return false">
                            <source src="./sub_static/UI/jxj.mp4" type="video/mp4">
                        </video>
                    </div>
                </div>
                <div id="3dContainer" class="Container"></div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">

            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import Component from 'vue-class-component';
    import {MainVueComponent} from './mainVueComponent';
    import './sub_static/UI/video-js.css';
    @Component({
        components: {
            fullScreensLayout,
        },
    })
    export default class App extends MainVueComponent {
    }
</script>

<style scoped="scoped">
    * {
        margin: 0;
        padding: 0;
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
        font-size: 24px;
        color: #000;
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
    }
    .buttonBox {
        position: absolute;
        width: 102px;
        height: 108px !important;
        right: 24px;
        bottom: 12vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        align-content: center;
        z-index: 99;
    }
    button {
        width: 100px;
        height: 42px;
        cursor: pointer;
        background: #FFFFFF;
        border: 0 solid rgba(0,0,0,0.10);
        box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        border-radius: 21px;
        padding: 12px 16px;
        font-size: 16px;
        font-weight: 700;
        font-family: PingFangSC-Medium;
        color: #333333;
        line-height: 16px;
    }
    .active {
        color: #ffffff;
        background-color: #5CAEFD;
    }
    .reactionBox{
        position: absolute;
        width: 65vw;
        height: 36.56vw;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #F6F6F6;
        border: 2px solid #EDEDED;
        border-radius: 5px;
    }
    .cover_box {
        position: absolute;
        width: 50%;
        height: 30%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .cover_box .end1{
        width: 50%;
        height: auto;
        float: left;
    }
    .cover_box .end2{
        width: 50%;
        height: auto;
        float: right;
    }
    .tipBox {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 998;
    }
    .tipBox .tipImg {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 999!important;
        left: 50%!important;
        top: 50%!important;
        transform: translate(-50%, -50%)!important;
    }
    .tipBox #playImg {
        cursor: pointer!important;
        width: 50px!important;
        height: 50px!important;
        position: absolute!important;
        z-index: 1000!important;
        left: 50%!important;
        top: 50%!important;
        transform: translate(-50%, -50%)!important;
    }
    .myVideo {
        width: 100%;
        height: 100%;
    }
    .reactionBox video {
        display: block;
        width: 100%;
        height: auto;
        position: absolute;
        overflow: hidden;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    @media (max-height: 802px) and (min-height: 500px){
        .myVideo {
            width: 99.4%;
            height: 99.4%;
        }
    }
    @media (max-height: 400px) {
        .reactionBox{
            position: absolute;
            width: 50vw;
            height: 28.125vw;
        }
        .buttonBox{
            transform: scale(0.6);
            right: 0;
        }
    }
</style>
