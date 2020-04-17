<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=0">
                <div id="title" class="title_text">{{title}}</div>
                <div class="content" id="content"  :style="{zoom:zoom1}">
                    <img src="./sub_static/UI/bj.png"/>
                    <div class="start"><img src="./sub_static/UI/st.png" style="width: 100%;height: 100%;"/></div>
                    <div  class="text" >
                        <img src="./sub_static/UI/text.png" style="width: 100%;height: 100%;"/>
                        <!--第一个点以及点击后出现的文字和视频-->
                        <div :class="{onePoint:have,'yellow': ischecked1}" @click="getEvent(1)"></div>
                        <div class="oneBox" v-show="isshow1">
                            <div class="xt">{{textTitle[0]}}</div>
                            <div class="videoBox"   >
                                <div  style="width: 100%; height: 100%" >
                                    <video id="my-video1" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                           x-webkit-airplay="true"
                                           preload="auto"
                                           x5-playsinline playsinline
                                           webkit-playsinline
                                           data-setup="{}"
                                           ref="icon"
                                           :poster="picture1"
                                           style="border-radius:8px;"  >
                                        <source   src="./sub_static/Video/1.mp4" type="video/mp4" >
                                    </video>
                                    <div class="play" v-show="showPlay" @click="getChange(1)"><img src="./sub_static/UI/bt.png"/> </div>
                                </div>
                            </div>
                        </div>

                            <!--第二个点以及点击后出现的文字和视频-->
                            <div :class="{twoPoint:have,'yellow': ischecked2}" @click="getEvent(2)"></div>
                            <div class="twoBox" v-show="isshow2">
                                <div class="xt">{{textTitle[1]}}</div>
                                <div class="videoBox"   >
                                    <div  style="width: 100%; height: 100%" >
                                        <video id="my-video2" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                               x-webkit-airplay="true"
                                               preload="auto"
                                               x5-playsinline playsinline
                                               webkit-playsinline
                                               data-setup="{}"
                                               ref="icon"
                                               :poster="picture1"
                                               style="border-radius:8px;"  >
                                            <source   src="./sub_static/Video/1.mp4" type="video/mp4" >
                                        </video>
                                        <div class="play" v-show="showPlay" @click="getChange(2)"><img src="./sub_static/UI/bt.png"/> </div>
                                    </div>
                                </div>
                             </div>

                            <!--第三个点以及点击后出现的文字和视频-->
                            <div :class="{threePoint:have,'yellow': ischecked3}" @click="getEvent(3)"></div>
                            <div class="threeBox" v-show="isshow3">
                                <div class="xt">{{textTitle[2]}}</div>
                                <div class="videoBox"   >
                                    <div  style="width: 100%; height: 100%" >
                                        <video id="my-video3" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                               x-webkit-airplay="true"
                                               preload="auto"
                                               x5-playsinline playsinline
                                               webkit-playsinline
                                               data-setup="{}"
                                               ref="icon"
                                               :poster="picture2"
                                               style="border-radius:8px;"  >
                                            <source   src="./sub_static/Video/2.mp4" type="video/mp4" >
                                        </video>
                                        <div class="play" v-show="showPlay" @click="getChange(3)"><img src="./sub_static/UI/bt.png"/> </div>
                                    </div>
                                </div>
                            </div>

                            <!--第四个点以及点击后出现的文字和视频-->
                            <div :class="{fourPoint:have,'yellow': ischecked4}" @click="getEvent(4)"></div>
                            <div class="fourBox" v-show="isshow4">
                                <div class="xt">{{textTitle[3]}}</div>
                                <div class="videoBox"   >
                                    <div  style="width: 100%; height: 100%" >
                                        <video id="my-video4" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                               x-webkit-airplay="true"
                                               preload="auto"
                                               x5-playsinline playsinline
                                               webkit-playsinline
                                               data-setup="{}"
                                               ref="icon"
                                               :poster="picture2"
                                               style="border-radius:8px;"  >
                                            <source   src="./sub_static/Video/2.mp4" type="video/mp4" >
                                        </video>
                                        <div class="play" v-show="showPlay" @click="getChange(4)"><img src="./sub_static/UI/bt.png"/> </div>
                                    </div>
                                </div>
                            </div>

                        <!--第五个点以及点击后出现的文字和视频-->
                        <div :class="{fivePoint:have,'yellow': ischecked5}" @click="getEvent(5)"></div>
                        <div class="fiveBox" v-show="isshow5">
                            <div class="xt">{{textTitle[4]}}</div>
                            <div class="videoBox"   >
                                <div  style="width: 100%; height: 100%" >
                                    <video id="my-video5" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                           x-webkit-airplay="true"
                                           preload="auto"
                                           x5-playsinline playsinline
                                           webkit-playsinline
                                           data-setup="{}"
                                           ref="icon"
                                           :poster="picture3"
                                           style="border-radius:8px;"  >
                                        <source   src="./sub_static/Video/3.mp4" type="video/mp4" >
                                    </video>
                                    <div class="play" v-show="showPlay" @click="getChange(5)"><img src="./sub_static/UI/bt.png"/> </div>
                                </div>
                            </div>
                        </div>

                        <!--第六个点以及点击后出现的文字和视频-->
                        <div :class="{sixPoint:have,'yellow': ischecked6}" @click="getEvent(6)"></div>
                        <div class="sixBox" v-show="isshow6">
                            <div class="xt">{{textTitle[5]}}</div>
                            <div class="videoBox"   >
                                <div  style="width: 100%; height: 100%" >
                                    <video id="my-video6" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                           x-webkit-airplay="true"
                                           preload="auto"
                                           x5-playsinline playsinline
                                           webkit-playsinline
                                           data-setup="{}"
                                           ref="icon"
                                           :poster="picture2"
                                           style="border-radius:8px;"  >
                                        <source   src="./sub_static/Video/2.mp4" type="video/mp4" >
                                    </video>
                                    <div class="play" v-show="showPlay" @click="getChange(6)"><img src="./sub_static/UI/bt.png"/> </div>
                                </div>
                            </div>
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
        /*outline: none;*/
        pointer-events: none;
    }
    video{
        outline: none;
    }
    ul, ol, li {
        list-style: none;
    }
    .vjs-big-play-button {
        display: block!important;
    }

    .title_text {
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
        text-align: center;
        line-height: 28px;
        font-family: SourceHanSansSC-Medium;
        font-size: 24px;
        color: #FFFFFF;
    }
    .content{
        height:100%;
        width:100%;
    }
    .start{
        height: 576px;
        width: 472px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .text{
        height: 576px;
        width: 472px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }

    /*第一个点的样式*/
    .onePoint{
        width: 16px;
        height: 16px;
        /*background: #ccc;*/
        border-radius:50% ;
        position: absolute;
        left: 9.4%;
        top: 19.6%;
        cursor: pointer;
    }
    .oneBox{
        width: 244px;
        height: 230px;
        position: absolute;
        right: 93%;
        top: 17.5%;
        display: flex;
        flex-direction:column;
        align-items:flex-end ;
    }

    /*共同的部分*/
    .videoBox {
        width: 244px;
        height: 164px;
    }
    .myVideo {
        width: 100%;
        height:100%;
    }
    .play{
        width:44px ;
        height: 44px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
     .xt{
        width: 72px;
        height: 36px;
        text-align: center;
        font-size: 20px;
        line-height: 36px;
        color: #fff;
    }

    /*第二个点的样式*/
    .twoPoint{
        width: 16px;
        height: 16px;
        /*background: #ccc;*/
        border-radius:50% ;
        position: absolute;
        left: 17.3%;
        top: 45.65%;
        cursor: pointer;
    }
    .twoBox{
        width: 244px;
        height: 230px;
        position: absolute;
        right: 85%;
        top: 43.6%;
        display: flex;
        flex-direction:column;
        align-items:flex-end ;
    }


    /*第三个点的样式*/
    .threePoint{
        width: 16px;
        height: 16px;
        /*background: #ccc;*/
        border-radius:50% ;
        position: absolute;
        left: 17.6%;
        top: 57.52%;
        cursor: pointer;
    }
    .threeBox{
        width: 244px;
        height: 230px;
        position: absolute;
        right: 84%;
        top: 55.6%;
        display: flex;
        flex-direction:column;
        align-items:flex-end ;
    }


    /*第四个点的样式*/
    .fourPoint{
        width: 16px;
        height: 16px;
        /*background: #ccc;*/
        border-radius:50% ;
        position: absolute;
        right: 13.2%;
        top: 12.05%;
        cursor: pointer;
    }
    .fourBox{
        width: 244px;
        height: 230px;
        position: absolute;
        left: 89%;
        top: 9.9%;
        display: flex;
        flex-direction:column;
        align-items:flex-start ;
    }

    /*第五个点的样式*/
    .fivePoint{
        width: 16px;
        height: 16px;
        /*background: #ccc;*/
        border-radius:50% ;
        position: absolute;
        right: 13.9%;
        top: 46.6%;
        cursor: pointer;
    }
    .fiveBox{
        width: 244px;
        height: 230px;
        position: absolute;
        left: 88%;
        top: 44.8%;
        display: flex;
        flex-direction:column;
        align-items:flex-start ;
    }

    /*第六个点的样式*/
    .sixPoint{
        width: 16px;
        height: 16px;
        /*background: #ccc;*/
        border-radius:50% ;
        position: absolute;
        right: 17%;
        top: 56.3%;
        cursor: pointer;
    }
    .sixBox{
        width: 244px;
        height: 230px;
        position: absolute;
        left: 86%;
        top: 54%;
        display: flex;
        flex-direction:column;
        align-items:flex-start ;
    }
    .yellow{
        width: 14px;
        height: 14px;
        border-radius:50% ;
        background: #FFC100;
        border: 1px solid #FFFFFF;
    }
    @media (height: 1080px) {
        .onePoint {
            position: absolute;
            left: 9.55%;
        }

        .twoPoint {
            position: absolute;
            left: 17.35%;
            top: 45.65%;
        }

        .threePoint {
            position: absolute;
            left: 17.8%;
            top: 57.55%;
        }

        .fourPoint {
            position: absolute;
            right: 13.3%;
            top: 12.1%;
        }

        .fivePoint {
            position: absolute;
            right: 13.95%;
            top: 46.6%;
        }

        .sixPoint {
            position: absolute;
            right: 17.1%;
            top: 56.4%;
        }
    }
        @media (height: 727px) {
            .threePoint{
                position: absolute;
                left: 17.8%;
                top: 57.55%;
            }
            .sixPoint{
                position: absolute;
                right: 17.1%;
                top: 56.4%;
            }
    }




</style>

<style>
    @media (max-height: 450px) {
        .control_div_resetBtn {
            right: 0;
            top: 0;
            transform: scale(0.6);
        }
    }
</style>