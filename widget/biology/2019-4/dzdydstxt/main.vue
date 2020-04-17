<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=0">
                <div id="title" class="title_text">{{title}}</div>
                <div class="content" >
                       <img src="./sub_static/UI/start_bj.png" class="start_bj">
                       <div class="imgButton">
                           <div class="btn_1" @click="getEvent(1)">
                               <img src="./sub_static/UI/huangmo_btn.png" >
                           </div>
                           <div class="btn_2" @click="getEvent(2)">
                               <img src="./sub_static/UI/danshui_btn.png" >
                           </div>
                           <div class="btn_3" @click="getEvent(3)">
                               <img src="./sub_static/UI/shidi_btn.png"  >
                           </div>
                          <div class="btn_4" @click="getEvent(4)">
                              <img src="./sub_static/UI/caoyuan_btn.png" >
                          </div>
                           <div class="btn_5" @click="getEvent(5)">
                               <img src="./sub_static/UI/nongtian_btn.png" >
                           </div>
                           <div class="btn_6" @click="getEvent(6)">
                               <img src="./sub_static/UI/chengshi_btn.png" >
                           </div>
                           <div class="btn_7" @click="getEvent(7)">
                               <img src="./sub_static/UI/senling_btn.png" >
                           </div>
                           <div class="btn_8" @click="getEvent(8)">
                               <img src="./sub_static/UI/haiyang_btn.png" >
                           </div>
                       </div>
                    <!--关于视频的-->
                    <div class="videoBox" v-show="showVideo" >
                          <div style="width: 100%; height: 100%"   v-show="active1">
                            <video id="my-video1" class="video-js myVideo vjs-default-skin vjs-big-play-no"
                                   preload="auto"
                                   x5-playsinline playsinline webkit-playsinline data-setup="{}"  :poster = "picture">
                                <source src="./sub_static/Video/1.mp4" type="video/mp4" >
                            </video>
                              <div class="video_button" @click="getChange(1)"><img src="./sub_static/UI/video_button.png"></div>
                          </div>
                         <div style="width: 100%; height: 100%"   v-show="active2">
                            <video id="my-video2" class="video-js myVideo vjs-default-skin vjs-big-play-none "
                                   preload="auto"
                                   x5-playsinline playsinline
                                   webkit-playsinline data-setup="{}" :poster = "picture">
                                <source src="./sub_static/Video/2.mp4" type="video/mp4">
                            </video>
                             <div class="video_button" @click="getChange(2)"><img src="./sub_static/UI/video_button.png"></div>
                         </div>
                        <div style="width: 100%; height: 100%"  v-show="active3">
                            <video id="my-video3" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                   preload="auto"
                                   x5-playsinline playsinline
                                   webkit-playsinline data-setup="{}" :poster = "picture">
                                <source src="./sub_static/Video/3.mp4" type="video/mp4">
                            </video>
                            <div class="video_button" @click="getChange(3)"><img src="./sub_static/UI/video_button.png"></div>
                        </div>
                        <div style="width: 100%; height: 100%"   v-show="active4">
                            <video id="my-video4" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                   preload="auto"
                                   x5-playsinline playsinline
                                   webkit-playsinline data-setup="{}" :poster = "picture">
                                <source src="./sub_static/Video/4.mp4" type="video/mp4">
                            </video>
                            <div class="video_button" @click="getChange(4)"><img src="./sub_static/UI/video_button.png"></div>
                        </div>
                        <div style="width: 100%; height: 100%"  v-show="active5">
                            <video id="my-video5" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                   preload="auto"
                                   x5-playsinline playsinline
                                   webkit-playsinline data-setup="{}" :poster = "picture">
                                <source src="./sub_static/Video/5.mp4" type="video/mp4">
                            </video>
                            <div class="video_button" @click="getChange(5)"><img src="./sub_static/UI/video_button.png"></div>
                        </div>
                        <div style="width: 100%; height: 100%"  v-show="active6">
                            <video id="my-video6" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                   preload="auto"
                                   x5-playsinline playsinline
                                   webkit-playsinline data-setup="{}" :poster = "picture">
                                <source src="./sub_static/Video/6.mp4" type="video/mp4">
                            </video>
                            <div class="video_button" @click="getChange(6)"><img src="./sub_static/UI/video_button.png"></div>
                        </div>
                        <div style="width: 100%; height: 100%"  v-show="active7">
                            <video id="my-video7" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                   preload="auto"
                                   x5-playsinline playsinline
                                   webkit-playsinline data-setup="{}" :poster = "picture">
                                <source src="./sub_static/Video/7.mp4" type="video/mp4">
                            </video>
                            <div class="video_button" @click="getChange(7)"><img src="./sub_static/UI/video_button.png"></div>
                        </div>
                        <div style="width: 100%; height: 100%"  v-show="active8">
                            <video id="my-video8" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                   preload="auto"
                                   x5-playsinline playsinline
                                   webkit-playsinline data-setup="{}" :poster = "picture">
                                <source src="./sub_static/Video/8.mp4" type="video/mp4">
                            </video>
                            <div class="video_button" @click="getChange(8)"><img src="./sub_static/UI/video_button.png"></div>
                        </div>
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
    img{
        width: 100%;
        height: 100%;
        display: block;
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
        font-weight: 600;
        text-align: center;
    }
    .content{
        height:100%;
         width:100%;
    }
    .start_bj{
        width: auto;
        height: 100%;
        margin: 0 auto;
        position: relative
    }
    .btn_1{
        width:12vw ;
        height: auto;
        position: absolute;
        left: 18vw;
        top: 22vh;
        cursor: pointer;
    }
    .btn_2{
        width:12vw ;
        height: auto;
        position: absolute;
        left: 27vw;
        top: 43vh;
        cursor: pointer;
    }
    .btn_3{
        width:12vw ;
        height: auto;
        position: absolute;
        left: 38vw;
        top: 65vh;
        cursor: pointer;
    }
    .btn_4{
        width:12vw ;
        height: auto;
        position: absolute;
        left: 43vw;
        top: 25vh;
        cursor: pointer;
    }
    .btn_5{
        width:12vw ;
        height: auto;
        position: absolute;
        left: 52vw;
        top: 45vh;
        cursor: pointer;
    }
    .btn_6{
        width:12vw ;
        height: auto;
        position: absolute;
        left: 51.5vw;
        top: 73vh;
        cursor: pointer;
    }
    .btn_7{
        width:12vw ;
        height: auto;
        position: absolute;
        left:61vw;
        top: 14vh;
        cursor: pointer;
    }
    .btn_8{
        width:12vw ;
        height: auto;
        position: absolute;
        left: 67vw;
        top:42vh;
        cursor: pointer;
    }
    /*关于视频的样式*/
    .videoBox {
        position: absolute;
        left: 50%;
        top: 59%;
        width:72vw;
        height: 40.5vw;
        transform: translate(-50%,-59%);
    }
    .myVideo {
        width: 100%;
        height:100%;
    }
     .video_button {
        width: 4vw;
        height: auto;
        position: absolute;
        top: 0;
        right: -3.9vw;
        cursor: pointer;
    }
    /*适配各种设备*/
    @media (min-width: 900px) and (max-width: 1366px) {
        .start_bj{
            width: 90%;
            height: 90%;
            top: 50%;
            transform: translateY(-50%);
        }
        .btn_1,.btn_2,.btn_3,.btn_4,.btn_5,.btn_6,.btn_7,.btn_8{
            transform: translateY(30px);
        }
    }
    @media (max-height: 400px) {
        .videoBox {
            width:65vw;
            height: 36.5vw;
            left: 50%;
            top: 60%;
            transform:translate(-50% , -60%) ;
        }
        .title_text {
            top: 12px;
            left: 12px;
            z-index: 9;
            font-family: PingFangSC-Medium;
            font-size: 18px;
            color: #000000;
            text-align: center;
            font-weight: 600;
        }
    }
    @media (max-height: 320px) {
        .videoBox {
            width:65vw;
            height: 36.5vw;
            left: 50%;
            top: 60%;
            transform:translate(-50% , -60%) ;
        }
        .videoBox video{
            width: 100%;
            height: 100%;
        }
        .title_text {
            top: 8px;
            left: 12px;
            z-index: 9;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #000000;
            text-align: center;
            font-weight: 600;
        }
    }
</style>
