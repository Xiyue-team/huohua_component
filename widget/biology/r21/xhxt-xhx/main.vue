<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <div id="title" class="title_text">消化腺</div>
                <div class="content">
                    <img class="person" :src="personImg" ondragstart="return false">
                    <img class="tyx" src="./sub_static/UI/tyx.jpg" v-if="show" ondragstart="return false">
                    <div class="videoBox" v-show="active">
                        <video id="my-video1" class="myVideo vjs-default-skin" preload="auto" x5-playsinline playsinline
                               webkit-playsinline data-setup="{}" :poster = "picture1">
                            <source src="./sub_static/video/1.mp4" type="video/mp4">
                        </video>
                    </div>
                    <div class="videoBox" v-show="active2">
                        <video id="my-video2" class="myVideo vjs-default-skin" preload="auto" webkit-playsinline
                               playsinline x5-playsinline data-setup="{}" :poster = "picture2">
                            <source src="./sub_static/video/2.mp4" type="video/mp4">
                        </video>
                    </div>
                    <div class="videoBox" v-show="active3">
                        <video id="my-video3" class="myVideo vjs-default-skin" preload="auto" webkit-playsinline
                               playsinline x5-playsinline data-setup="{}" :poster = "picture3">
                            <source src="./sub_static/video/3.mp4" type="video/mp4">
                        </video>
                    </div>
                    <div class="videoBox" v-show="active4">
                        <video id="my-video4" class="myVideo vjs-default-skin" preload="auto" webkit-playsinline
                               playsinline x5-playsinline data-setup="{}" :poster = "picture4">
                            <source src="./sub_static/video/4.mp4" type="video/mp4">
                        </video>
                    </div>
                    <div class="videoBox" v-show="active5">
                        <video id="my-video5" class="myVideo vjs-default-skin" preload="auto" webkit-playsinline
                               playsinline x5-playsinline data-setup="{}" :poster = "picture5">
                            <source src="./sub_static/video/5.mp4" type="video/mp4">
                        </video>
                    </div>
                    <div class="buttonBox">
                        <div class="btn" @click="getEvent(1)" :class="{active: active1}">
                            <img src="./sub_static/UI/111.png" ></div>
                        <div  class="btn" @click="getEvent(2)" :class="{active: active2}">
                            <img src="./sub_static/UI/222.png" ></div>
                        <div class="btn" @click="getEvent(3)" :class="{active: active3}">
                            <img src="./sub_static/UI/333.png" ></div>
                        <div class="btn" @click="getEvent(4)" :class="{active: active4}">
                            <img src="./sub_static/UI/444.png" ></div>
                        <div class="btn" @click="getEvent(5)" :class="{active: active5}">
                            <img src="./sub_static/UI/555.png" ></div>
                    </div>
                </div>
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
    import './sub_static/video/video-js.css';
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
        color: #ffffff;
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
    }
    .content {
        width: 100%;
        height: 100%;
        background-color: #696969 !important;
    }
    .person{
        display: block;
        width: auto;
        height: 105%;
        position: absolute;
        left: 12vw;
        bottom: 0;
    }
    .tyx{
        display: block;
        position: absolute;
        right: 15vw;
        top: 14vh;
        width: 32vw;
        height: auto;
        border-radius: 10px !important;
    }

    .videoBox {
        position: absolute;
        right: 15vw;
        top: 14vh;
        box-sizing: border-box;
        width: 32vw;
        height: 32vw;
        border-radius: 10px !important;
        background-color: #3c3a3a;
        pointer-events: none;
    }
    .videoBox video {
        position: relative;
        width: 32vw;
        height: auto;
    }
    .buttonBox {
        position: absolute;
        width: 32vw;
        height: 5vh !important;
        right: 15vw;
        bottom: 12vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-content: center;
    }
    .btn {
        width: 6vw;
        height: 5vh !important;
        background: #515151;
        border-radius: 1vh;
        font-family: PingFangSC-Semibold;
        font-size: 2vh;
        color: #FFFFFF;
        cursor: pointer;
        display: flex;
        justify-content:center;
        align-items: center;
    }
    .btn img{
        display: block;
        width: 6vw;
        height: auto;
    }
    .vjs-loading-spinner {
        display: none!important;
        position: absolute!important;
        top: 50%!important;
        left: 50%!important;
        margin: -25px 0 0 -25px!important;
        opacity: 0!important;
    }
    .active {
        background-color: #0199FF ;
    }
    @media (max-height: 900px) {
        .videoBox {
            background-color: black;
        }
    }
    @media (max-height: 450px) {
        .title_text {
            font-size: 18px;
            line-height: 18px;
        }
    }

    @media (max-height: 350px) {
        .buttonBox{
            bottom: 6vh;
        }
    }

</style>
