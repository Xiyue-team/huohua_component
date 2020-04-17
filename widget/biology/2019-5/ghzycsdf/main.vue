<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=0">
                <div class="content" id="content" >
                    <div id="title" class="title_text">{{title}}</div>
                    <div class="buttonBox" id="buttonBox">
                        <button :class="{an_niu: have, 'bulecomplete': index === ishave}"
                                v-for="(item, index) in textArr"
                                :key="index"
                                :id="'index' + index"
                                v-text="item"
                                @click="getEvent(index)"
                        ></button>
                        <div class="jiantou1"><img src="./sub_static/UI/jiantou.png"/></div>
                        <div class="jiantou2"><img src="./sub_static/UI/jiantou.png"/></div>
                        <div class="jiantou3"><img src="./sub_static/UI/jiantou.png"/></div>
                        <div class="jiantou4"><img src="./sub_static/UI/jiantou.png"/></div>
                    </div>
                    <div class="bj" id="bj" v-show="showBj" >
                        <img src="./sub_static/UI/0.png">
                        <div class="imageTitle">{{buttonArr}}</div>
                    </div>
                    <div class="videoBox"  id="videoBox" v-show="active1" >
                        <video id="my-video1" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                            x-webkit-airplay="true"
                            preload="true"
                            x5-playsinline playsinline
                            webkit-playsinline
                            data-setup="{}"
                            ref="icon"
                            :poster="picture"
                            style="border-radius:5px;object-fit:fill"  >
                            <source id="sourceId"  src="./sub_static/Video/11.mp4" type="video/mp4" >
                        </video>                        
                    </div>
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
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import Component from 'vue-class-component';
    import {MainVueComponent} from './mainVueComponent';
    import  './myVideo.css';
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
    img{
        width: 100%;
        height: 100%;
        display: block;
    }
    video{
        pointer-events:none;
        border:none;
    }
    ul, ol, li {
        list-style: none;
    }
    .title_text {
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #000000;
        text-align: center;
    }
    .content{
        height:100%;
        width:100%;
    }
    .buttonBox{
        width: 102px;
        height: 334px;
        position: absolute;
        bottom: 8.3%;
        right: 2.3%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        align-content: center;
        z-index: 2000;
    }
    .jiantou1{
        width: 14px;
        height: 28px;
        position: absolute;
        top: 42px;
    }
    .jiantou2{
        width: 14px;
        height: 28px;
        position: absolute;
        top: 116px;
    }
    .jiantou3{
        width: 14px;
        height: 28px;
        position: absolute;
        top: 190px;
    }
    .jiantou4{
        width: 14px;
        height: 28px;
        position: absolute;
        top: 264px;
    }
    .bj{
        width: 76.8%;
        height: 78.5%;
        position: absolute;
        bottom: 8.3%;
        left: 9.2%;
    }
    .imageTitle{
        position: absolute;
        top: 49.1%;
        left: 39.7%;
        font-family: SourceHanSansSC-Normal;
        font-size: 16px;
        color: #9B9B9B;
        text-align: justify;
    }
    .an_niu{
        width: 102px;
        height: 38px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #000000;
        /*text-align: center;*/
        border-radius: 19px;
        cursor: pointer;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 26px;
    }
    .bulecomplete{
        background: #0291FF;
        border: 1px solid #EBEBEB;
        border-radius: 19px;
        color: #FFFFFF;
    }
    /*关于视频的样式*/
    .videoBox {
        width: 76.8%;
        height: 78.5%;
        position: absolute;
        bottom: 8.3%;
        left: 9.2%;
    }
    .myVideo {
        width: 100%;
        height:100%;
    }
    @media (width: 1920px) {
        .bj{
            left: 12.2%;
        }
        .videoBox {
            left: 12.2%;
        }
    }
</style>
<style>
    @media (max-height: 450px) {
        .control_div_resetBtn {
            position: absolute;
            right: 2px!important;
            top: 2px!important;
            transform: scale(0.8);
        }
    }
</style>