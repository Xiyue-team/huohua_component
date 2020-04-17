<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=0">
                <div id="title" class="title_text">{{title}}</div>
                <div class="content" id="content" >
                    <img src="./sub_static/UI/bj.png" />
                    <div class="st" :style="{zoom:zoom1}">
                        <img :src="stImg"   v-show="showStImg"/>
                        <div class="btn1_list" v-show="showBtn1_list">
                            <img  src="./sub_static/UI/1t.png" />
                             <div class="btn1_list_img"><img src="./sub_static/UI/1_img.png"/></div>
                            <div class="btn1_list_title">{{imgtitleArr[0]}}</div>
                        </div>
                        <div class="btn2_list" v-show="showBtn2_list">
                            <img  src="./sub_static/UI/2t.png"/>
                            <div class="btn2_list_title">{{imgtitleArr[1]}}</div>
                        </div>
                            <div  class="videoBox1" style="width: 100%; height: 100%"  v-show="showVideo1">
                                <video id="my-video1" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                       x-webkit-airplay="true"
                                       preload="auto"
                                       x5-playsinline
                                       playsinline
                                       webkit-playsinline
                                       data-setup="{}"
                                       x5-video-player-type="h5"
                                       x5-video-player-fullscreen="true"
                                       x5-video-orientation="landscape"
                                       ref="icon"
                                       :poster="picture11"
                                       style="object-fit:fill">
                                    <source   src="./sub_static/Video/3.mp4" type="video/mp4" >
                                </video>
                                <div class="videoText3">
                                    <img  src="./sub_static/UI/3t.png"/>
                                    <div class="title1">{{text_titleArr[0]}}</div>
                                    <div class="title2">{{text_titleArr[1]}}</div>
                                    <div class="title3">{{text_titleArr[2]}}</div>
                                    <div class="title4">{{text_titleArr[3]}}</div>
                                    <div class="title5">{{text_titleArr[4]}}</div>
                                    <div class="title6">{{text_titleArr[5]}}</div>
                                    <div class="title7">{{text_titleArr[6]}}</div>
                                </div>
                            </div>
                            <div  class="videoBox1" style="width: 100%; height: 100%"  v-show="showVideo2">
                                <video id="my-video2" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                       x-webkit-airplay="true"
                                       preload="auto"
                                       x5-playsinline
                                       playsinline
                                       webkit-playsinline
                                       data-setup="{}"
                                       x5-video-player-type="h5"
                                       x5-video-player-fullscreen="true"
                                       x5-video-orientation="landscape"
                                       ref="icon"
                                       :poster="picture22"
                                       style="object-fit:fill">
                                    <source   src="./sub_static/Video/4.mp4" type="video/mp4" >
                                </video>
                                <div class="videoText4">
                                    <img  src="./sub_static/UI/4t.png"/>
                                    <div class="title1">{{text_titleArr[7]}}</div>
                                    <div class="title2">{{text_titleArr[8]}}</div>
                                    <div class="title3">{{text_titleArr[9]}}</div>
                                </div>
                                <div class="video_img"><img src="./sub_static/UI/5.png"/></div>
                            </div>
                        <div class="textArea" v-show="showTextArea">{{msg}}</div>
                    </div>
                    <div class="buttonBox" id="buttonBox">
                        <button :class="{an_niu: have,'bulecomplete': index === ishave}"
                                v-for="(item, index) in buttonArr"
                                :key="index"
                                :id="'index' + index"
                                v-text="item"
                                @click="clickButton(index)"
                        ></button>
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
    require('./video-js.css');
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
    img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .content{
        height:100%;
        width:100%;
    }
    .title_text {
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
        font-size: 24px;
        line-height: 24px;
        color: #fff;
        text-align: center;
    }
    .st{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .buttonBox{
        width: 120px;
        height: 216px;
        position: absolute;
        bottom: 7.8%;
        right: 2.3%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        align-content: center;
    }
    .an_niu{
        width: 120px;
        height: 38px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        font-size: 14px;
        color: #000000;
        text-align: center;
        border-radius: 19px;
        cursor: pointer;
        display: flex;
        justify-content:center;
        align-items: center;
    }
    .bulecomplete{
        background: #0291FF;
        border: 1px solid #EBEBEB;
        border-radius: 19px;
        color: #FFFFFF;
    }
    .btn1_list{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .btn1_list_img{
        width: 184px;
        height: 184px;
        position: absolute;
        bottom: 51%;
        right: 20.4%;
    }
    .btn1_list_title{
        width: 48px;
        height: 36px;
        font-family: SourceHanSansSC-Medium;
        font-size: 24px;
        color: #FFFFFF;
        position: absolute;
        left: 15%;
        bottom:22.7%;
        white-space: nowrap;
    }
    .textArea{
        width: 646px;
        height: 50px;
        position: absolute;
        left: 50%;
        bottom: 4.5%;
        transform: translateX(-50%);
        ont-family: SourceHanSansSC-Medium;
        font-size: 17px;
        color: #FFFFFF;
    }
    .btn2_list{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
    }
    .btn2_list_title{
        width: 48px;
        height: 36px;
        font-family: SourceHanSansSC-Medium;
        font-size: 24px;
        color: #FFFFFF;
        position: absolute;
        left: 16.7%;
        bottom:23.1%;
        white-space: nowrap;
    }

    /*关于视频的样式*/
    .videoBox1 {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left:0;
        z-index: 0;
    }
    .myVideo{
        width: 100%;
        height: 100%;
    }
    @keyframes warns {
        0%{opacity: 0}
        100%{opacity: 1}
    }
    .videoText3{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        animation: warns 4s 1;
    }
    .videoText3  .title1{
        font-size: 24px;
        color: #FFFFFF;
        width: 24px;
        height: 36px;
        position: absolute;
        left: 9.9%;
        bottom:64.8%;
        white-space: nowrap;
    }
    .videoText3  .title2{
        font-size: 24px;
        color: #FFFFFF;
        width: 48px;
        height: 36px;
        position: absolute;
        left: 7.6%;
        bottom:54.9%;
        white-space: nowrap;
    }
    .videoText3  .title3{
        font-size: 24px;
        color: #FFFFFF;
        width: 48px;
        height: 36px;
        position: absolute;
        left: 7.6%;
        bottom: 41%;
        white-space: nowrap;
    }
    .videoText3  .title4{
        font-size: 24px;
        color: #FFFFFF;
        width: 48px;
        height: 36px;
        position: absolute;
        left: 50.5%;
        bottom: 63%;
        white-space: nowrap;
    }
    .videoText3  .title5{
        font-size: 24px;
        color: #FFFFFF;
        width: 48px;
        height: 36px;
        position: absolute;
        left: 58.3%;
        bottom: 57.8%;
        white-space: nowrap;
    }
    .videoText3  .title6{
        font-size: 24px;
        color: #FFFFFF;
        width: 48px;
        height: 36px;
        position: absolute;
        left: 72.8%;
        bottom: 54.5%;
        white-space: nowrap;
    }
    .videoText3  .title7{
        font-size: 24px;
        color: #FFFFFF;
        width: 48px;
        height: 36px;
        position: absolute;
        left: 67%;
        bottom:30.2%;
        white-space: nowrap;
    }
    .videoText4{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top:0;
        animation: warns 4s 1;
    }
    .videoText4 .title1{
        font-size: 24px;
        color: #FFFFFF;
        width: 48px;
        height: 36px;
        position: absolute;
        left: 9.9%;
        bottom: 54.9%;
        white-space: nowrap;
    }
    .videoText4 .title2{
        font-size: 24px;
        color: #FFFFFF;
        width: 24px;
        height: 36px;
        position: absolute;
        left: 12.1%;
        bottom: 43.4%;
        white-space: nowrap;
    }
    .videoText4  .title3{
        font-size: 24px;
        color: #FFFFFF;
        width: 48px;
        height: 36px;
        position: absolute;
        left: 9.8%;
        bottom: 33%;
        white-space: nowrap;
    }
    .video_img{
        width: 73px;
        height: 51px;
        position: absolute;
        right: 41.7%;
        bottom: 57.3%;
    }

    @media (width: 1024px) and (height: 698px) {
        .btn1_list_img{
            bottom: 54%;
            right: 20.4%;
        }
    }
    @media (width: 1024px) and (height: 768px) {
        .btn1_list_img{
            bottom: 54%;
            right: 20.4%;
        }
    }
    @media (width: 1226px) and (height: 800px) {
        .btn1_list_img{
            bottom: 54%;
            right: 20.4%;
        }
    }
</style>
