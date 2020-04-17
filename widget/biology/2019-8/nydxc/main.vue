<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=0">
                <div id="title" class="title_text">{{title}}</div>
                <div class="content" id="content" >
                    <img src="./sub_static/UI/bj.png" />
                    <div class="img_text" v-show="ischecked1" :style="{zoom:zoom1}">
                        <img src="./sub_static/UI/img_text.png"/>
                        <div class="text1">{{textArr[0]}}</div>
                        <div class="text2">{{textArr[1]}}</div>
                        <div class="text3">{{textArr[2]}}</div>
                        <div class="text4">{{textArr[3]}}</div>
                        <div class="text5">{{textArr[4]}}</div>
                        <div class="text6">{{textArr[5]}}</div>
                    </div>
                    <div class="videoBox1"  v-show="showVideo1" :style="{zoom:zoom1}">
                        <video id="my-video1" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                               x-webkit-airplay="allow"
                               preload="auto"
                               x5-playsinline="true"
                               playsinline="true"
                               webkit-playsinline="true"
                               x5-video-player-type="h5"
                               x5-video-player-fullscreen="true"
                               x5-video-orientation="landscape"
                               ref="icon"
                               style="object-fit:fill"
                        >
                            <source   src="./sub_static/Video/1.mp4" type="video/mp4" >
                        </video>
                        <div class="li_img">
                            <img src="./sub_static/UI/li.png"/>
                            <ul class="ul_list">
                                <li>{{liArr[0]}}</li>
                                <li>{{liArr[1]}}</li>
                                <li>{{liArr[2]}}</li>
                                <li>{{liArr[3]}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="monban" v-show="showMonban" :style="{zoom:zoom1}"></div>
                    <div class="videoBox2" v-show="showVideo2" :style="{zoom:zoom1}">
                        <video id="my-video2" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                               x-webkit-airplay="true"
                               preload="true"
                               x5-playsinline playsinline
                               webkit-playsinline
                               data-setup="{}"
                               ref="icon"
                               poster = "picture1"
                               style="object-fit:fill">
                            <source   src="./sub_static/Video/2.mp4" type="video/mp4" >
                        </video>
                        <div class="del">
                            <img src="./sub_static/UI/del.png"/>
                            <div style="width: 35px;height: 35px;position: absolute;top:0;right:0;cursor: pointer" @click="del(1)"></div>
                        </div>
                    </div>
                    <div class="videoBox3" v-show="showVideo3" :style="{zoom:zoom1}">
                        <video id="my-video3" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                               x-webkit-airplay="true"
                               preload="true"
                               x5-playsinline playsinline
                               webkit-playsinline
                               data-setup="{}"
                               ref="icon"
                               poster = "picture2"
                               style="object-fit:fill">
                            <source   src="./sub_static/Video/3.mp4" type="video/mp4" >
                        </video>
                        <div class="del">
                            <img src="./sub_static/UI/del.png"/>
                            <div style="width: 35px;height: 35px;position: absolute;top:0;right:0;cursor: pointer" @click="del(2)"></div>
                        </div>
                    </div>

                    <div class="buttonBox"  id="buttonBox">
                        <div :class="{btn1:have,blue:ischecked1,active:ishave1,greyColor:changeColor}" id="btn1"  @click="clickButton(1)">{{buttonArr[0]}}</div>
                        <div  :class="{btn2:have,blue:ischecked2,active:ishave2}" @click="clickButton(2)">{{buttonArr[1]}}</div>
                        <div :class="{buttonBox_list:have,showOpacity:ischecked2}">
                            <div :class="{btn3:have,blue:ischecked3,active:ishave2}" @click="clickButton(3)" v-model="msg">{{buttonArr[2]}}</div>
                            <div  :class="{btn4:have,blue:ischecked4,active:ishave2}" @click="clickButton(4)" v-model="msg">{{buttonArr[3]}}</div>
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
    ul, ol, li {
        list-style: none;
    }
    img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .content{
        width:100%;
        height:100%;
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
    .img_text{
        width:100%;
        height:100%;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 9;
    }
    .text1{
        font-family: SourceHanSansSC-Medium;
        font-size: 24px;
        color: #FFFFFF;
        position: absolute;
        left: 11.5%;
        bottom: 76.7%;
    }
    .text2{
        font-family: SourceHanSansSC-Medium;
        font-size: 24px;
        color: #FFFFFF;
        position: absolute;
        left: 7.3%;
        bottom: 58.5%;
    }
    .text3{
        font-family: SourceHanSansSC-Medium;
        font-size: 24px;
        color: #FFFFFF;
        position: absolute;
        left: 7.3%;
        bottom: 45.7%;
    }
    .text4{
        font-family: SourceHanSansSC-Medium;
        font-size: 24px;
        color: #FFFFFF;
        position: absolute;
        left: 13.1%;
        bottom: 30.7%;
    }
    .text5{
        font-family: SourceHanSansSC-Medium;
        font-size: 24px;
        color: #FFFFFF;
        position: absolute;
        right: 34.6%;
        bottom: 82.1%;
    }
    .text6{
        font-family: SourceHanSansSC-Medium;
        font-size: 24px;
        color: #FFFFFF;
        position: absolute;
        right: 9.6%;
        bottom: 12%;
    }
    /*关于右边按钮的样式*/
    .buttonBox{
        width: 132px;
        height: 212px;
        position: absolute;
        top: 34.9%;
        right: 2.2%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        align-content: center;
        z-index: 9999;
    }
    .btn1{
        width: 132px;
        height: 38px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        border-radius: 21px;
        line-height: 38px;
        text-align: center;
        font-family: SourceHanSansSC-Medium;
        font-size: 14px;
        color: #000000;
        cursor: pointer;
    }
    .btn2{
        width: 132px;
        height: 38px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        border-radius: 21px;
        line-height: 38px;
        text-align: center;
        font-family: SourceHanSansSC-Medium;
        font-size: 14px;
        color: #000000;
        cursor: pointer;
    }
    .buttonBox_list{
        width: 93px;
        height: 96px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        align-content: center;
        opacity: 0;
    }
    .showOpacity{
        opacity: 1;
    }
    .btn3,.btn4{
        width: 93px;
        height: 38px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        border-radius: 21px;
        line-height: 38px;
        text-align: center;
        font-family: SourceHanSansSC-Medium;
        font-size: 14px;
        color: #000000;
    }
    .blue{
        background: #0291FF;
        color: #fff;
    }
    .active{
        cursor: pointer;
    }
    .greyColor{
        background: rgba(255,255,255,0.50);
    }

    /*关于视频的样式*/
    .videoBox1{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 0;
    }
    .myVideo{
        width: 100%;
        height: 100%;
    }
    .li_img{
        width: 22px;
        height: 129px;
        position: absolute;
        left: 8.5%;
        bottom: 4.9%;
    }
    .ul_list{
        position: absolute;
        top: 1px;
        right: -150px;
    }
    li{
        width: 140px;
        height: 20px;
        font-size: 18px;
        color: #FFFFFF;
        line-height: 20px;
        margin-bottom: 16px;
        white-space:nowrap;
    }
    .monban{
        width: 100%;
        height: 100%;
        opacity: 0.25;
        background: #D8D8D8;
        border: 1px solid #979797;
        position: absolute;
        top: 0;
        bottom: 0;
    }
    .videoBox2{
        width: 480px;
        height: 480px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        border: 2px solid #FFFFFF;
        border-radius: 4px;
    }
    .del{
        width: 76px;
        height: 37px;
        position: absolute;
        top: 10px;
        right: -76px;
    }
    .videoBox3{
        width: 480px;
        height: 480px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        border: 2px solid #FFFFFF;
        border-radius: 4px;
    }
    /*@media (width: 1226px) and (height: 800px) {*/

    /*}*/
</style>
