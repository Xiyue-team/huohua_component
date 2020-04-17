<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=0">
                <div class="content" id="content" >
                    <img src="./sub_static/UI/bj.png"  style="width: 100%;height: 100%;" :style="{zoom:zoom1}"/>
                    <div id="title" class="title_text">{{title}}</div>
                    <div class="start" :style="{zoom:zoom1}"><img :src="startImg" style="width: 100%;height:auto;"/></div>
                    <div class="text" :style="{zoom:zoom1}">
                        <img src="./sub_static/UI/text.png" style="width: 100%;height:auto;"/>

                        <!--第一个点以及点击后出现的文字和视频-->
                        <div :class="{onePoint:have,'yellow': ischecked1}" @click="getEvent(1)"></div>
                        <div class="oneBox" v-show="isshow1">
                            <div class="xt">{{textTitle[0]}}</div>
                            <div class="text_area">{{text_are[0]}}<br></div>
                            <div class="videoBox" @click=" return false">
                                <div style="width: 100%; height: 100%">
                                    <video id="my-video1" class="video-js myVideo vjs-default-skin vjs-big-play-none"
                                           x-webkit-airplay="true"
                                           preload="auto"
                                           x5-playsinline playsinline
                                           webkit-playsinline
                                           data-setup="{}"
                                           ref="icon"
                                           :poster="picture"
                                           style="border-radius:8px;object-fit: fill;z-index: 0">
                                        <source src="./sub_static/Video/11.mp4" type="video/mp4">
                                    </video>
                                    <div class="play" v-show="showPlay" @click="getChange(1)"><img
                                            src="./sub_static/UI/bt.png" style="width: 100%;height: 100%"/>
                                    </div>
                                </div>
                                <div class="videoTitle">{{text_list[3]}}</div>
                            </div>
                            <div class="img_list" v-show="showList">
                                <img  src="./sub_static/UI/xian.png" style="width: 100%;height: 100%"/>
                                <div class="text1">{{text_list[0]}}</div>
                                <div class="text2">{{text_list[1]}}</div>
                                <div class="text3">{{text_list[2]}}</div>
                            </div>
                        </div>

                        <!--第二个点以及点击后出现的文字和视频-->
                        <div :class="{twoPoint:have,'yellow': ischecked2}" @click="getEvent(2)"></div>
                        <div class="twoBox" v-show="isshow2">
                            <div class="xt">{{textTitle[1]}}</div>
                            <div class="text_area">{{text_are[1]}}</div>
                        </div>

                        <!--第三个点以及点击后出现的文字和视频-->
                        <div :class="{threePoint:have,'yellow': ischecked3}" @click="getEvent(3)"></div>
                        <div class="threeBox" v-show="isshow3">
                            <div class="xt">{{textTitle[2]}}</div>
                            <div class="text_area">{{text_are[2]}}</div>
                        </div>

                        <!--第四个点以及点击后出现的文字和视频-->
                        <div :class="{fourPoint:have,'yellow': ischecked4}" @click="getEvent(4)"></div>
                        <div class="fourBox" v-show="isshow4">
                            <div class="xt">{{textTitle[3]}}</div>
                            <div class="text_area">{{text_are[3]}}</div>
                        </div>

                        <!--第五个点以及点击后出现的文字和视频-->
                        <div :class="{fivePoint:have,'yellow': ischecked5}" @click="getEvent(5)"></div>
                        <div class="fiveBox" v-show="isshow5">
                            <div class="xt">{{textTitle[4]}}</div>
                            <div class="text_area">{{text_are[4]}}</div>
                        </div>

                        <!--第六个点以及点击后出现的文字和视频-->
                        <div :class="{sixPoint:have,'yellow': ischecked6}" @click="getEvent(6)"></div>
                        <div class="sixBox" v-show="isshow6">
                            <div class="xt">{{textTitle[5]}}</div>
                            <div class="text_area">{{text_are[5]}}</div>
                        </div>

                        <!--第七个点以及点击后出现的文字和视频-->
                        <div :class="{sevenPoint:have,'yellow': ischecked7}" @click="getEvent(7)"></div>
                        <div class="sevenBox" v-show="isshow7">
                            <div class="xt">{{textTitle[6]}}</div>
                            <div class="text_area">{{text_are[6]}}</div>
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
        outline: none;
    }

    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    img{
        pointer-events: none!important;
        /*!*outline: none!important;*!*/
        /*!*border: 0!important;*!*/
        /*touch-action: none!important;*/
    }
    video{
        outline: none;
        border: 0;
        touch-action: none;
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
        line-height: 28px;
        font-family: SourceHanSansSC-Medium;
        font-size: 28px;
        color: #FFFFFF;
    }
    .content{
        height:100%;
        width:100%;
    }
    .start{
        width: 390px;
        height: 435px;
        position: absolute;
        top: 50%;
        left: 36.5%;
        transform: translateY(-50%);
    }
    .text{
        width: 390px;
        height: 435px;
        position: absolute;
        top: 50%;
        left: 36.5%;
        transform: translateY(-50%);
    }

    /*第一个点的样式*/
    .onePoint{
        width: 16px;
        height: 16px;
        /*background: #FFC100;*/
        border-radius:50% ;
        position: absolute;
        left: 3.1%;
        top: 15%;
        cursor: pointer;
    }
    .oneBox{
        width: 341px;
        height: 272px;
        position: absolute;
        left: -89%;
        top: 10%;
        display: flex;
        flex-direction:column;
        align-items:flex-end ;
        justify-content: space-between;
    }
    .oneBox  .xt{
        width: 80px;
        height: 22px;
        font-family: SourceHanSansSC-Medium;
        font-size: 20px;
        color: #FFFFFF;
        text-align: right;
        line-height: 22px;
    }
    .oneBox   .text_area{
        width: 224px;
        height: 44px;
        font-family: SourceHanSansSC-Normal;
        font-size: 16px;
        color: #dddddd;
        text-align: right;
        line-height: 22px;
    }

    /*共同的部分*/
    .videoBox {
        width: 341px;
        height: 192px;
        outline: none;
    }
    .myVideo {
        width: 100%;
        height:100%;
        outline: none;
    }
    .play{
        width:44px ;
        height: 44px;
        position: absolute;
        right: 2.2%;
        bottom: 4.1%;
        cursor: pointer;
        z-index: 10;
    }
    .videoTitle{
        position: absolute;
        top: 35%;
        right: 5%;
        font-size: 18px;
        color: #000;
    }
    .img_list{
        width: 171px;
        height: 144px;
        position: absolute;
        bottom: -28%;
        left: 16.5%;
    }
    .img_list .text1{
        width: 74px;
        height: 22px;
        font-size: 18px;
        color: #FFFFFF;
        line-height: 22px;
        position: absolute;
        left: -20%;
        bottom: -4%;
        text-align: center;
    }
    .img_list .text2{
        width: 74px;
        height: 22px;
        font-size: 18px;
        color: #FFFFFF;
        line-height: 22px;
        position: absolute;
        left: 25%;
        bottom: -22%;
        text-align: center;
    }
    .img_list .text3{
        width: 111px;
        height: 22px;
        font-size: 18px;
        color: #FFFFFF;
        line-height: 22px;
        position: absolute;
        right: -28%;
        bottom: 4%;
        text-align: center;
    }




    /*第二个点的样式*/
    .twoPoint{
        width: 16px;
        height: 16px;
        /*background: #FFC100;*/
        border-radius:50% ;
        position: absolute;
        right: 20.4%;
        top: 2.8%;
        cursor: pointer;
    }
    .twoBox{
        width: 255px;
        height: 74px;
        position: absolute;
        right:-48%;
        top: -3%;
        display: flex;
        flex-direction:column;
        justify-content: space-between;
        align-items:flex-start ;
    }
    .twoBox  .xt{
        width: 60px;
        height: 29px;
        font-family: SourceHanSansSC-Medium;
        font-size: 20px;
        color: #FFFFFF;
        text-align: left;
        line-height: 29px;
    }
    .twoBox   .text_area{
        width: 255px;
        height: 44px;
        font-family: SourceHanSansSC-Normal;
        font-size: 16px;
        color: #dddddd;
        text-align: left;
        line-height: 22px;
    }

    /*第三个点的样式*/
    .threePoint{
        width: 16px;
        height: 16px;
        /*background: #FFC100;*/
        border-radius:50% ;
        position: absolute;
        right: 1%;
        top: 22.8%;
        cursor: pointer;
    }
    .threeBox{
        width: 201px;
        height: 70px;
        position: absolute;
        right:-53%;
        top: 18%;
        display: flex;
        flex-direction:column;
        justify-content: space-between;
        align-items:flex-start ;
    }
    .threeBox  .xt{
        width: 40px;
        height: 22px;
        font-family: SourceHanSansSC-Medium;
        font-size: 20px;
        color: #FFFFFF;
        text-align: left;
        line-height: 22px;
    }
    .threeBox   .text_area{
        width: 201px;
        height: 44px;
        font-family: SourceHanSansSC-Normal;
        font-size: 16px;
        color: #dddddd;
        text-align: left;
        line-height: 22px;
    }


    /*第四个点的样式*/
    .fourPoint{
        width: 16px;
        height: 16px;
        /*background: #FFC100;*/
        border-radius:50% ;
        position: absolute;
        right: 6.1%;
        top: 44.2%;
        cursor: pointer;
    }
    .fourBox{
        width: 201px;
        height: 74px;
        position: absolute;
        right:-50%;
        top: 38%;
        display: flex;
        flex-direction:column;
        justify-content: space-between;
        align-items:flex-start ;
    }
    .fourBox  .xt{
        width: 80px;
        height: 22px;
        font-family: SourceHanSansSC-Medium;
        font-size: 20px;
        color: #FFFFFF;
        text-align: left;
        line-height: 22px;
    }
    .fourBox   .text_area{
        width: 201px;
        height: 44px;
        font-family: SourceHanSansSC-Normal;
        font-size: 16px;
        color: #dddddd;
        text-align: left;
        line-height: 22px;
    }

    /*第五个点的样式*/
    .fivePoint{
        width: 16px;
        height: 16px;
        /*background: #FFC100;*/
        border-radius:50% ;
        position: absolute;
        right: 26.5%;
        top: 60.4%;
        cursor: pointer;
    }
    .fiveBox{
        width: 320px;
        height: 48px;
        position: absolute;
        right:-59%;
        top: 55%;
        display: flex;
        flex-direction:column;
        justify-content: space-between;
        align-items:flex-start ;
    }
    .fiveBox  .xt{
        width: 80px;
        height: 22px;
        font-family: SourceHanSansSC-Medium;
        font-size: 20px;
        color: #FFFFFF;
        text-align: left;
        line-height: 22px;
    }
    .fiveBox   .text_area{
        width: 320px;
        height: 22px;
        font-family: SourceHanSansSC-Normal;
        font-size: 16px;
        color: #dddddd;
        text-align: left;
        line-height: 22px;
    }

    /*第六个点的样式*/
    .sixPoint{
        width: 16px;
        height: 16px;
        /*background: #FFC100;*/
        border-radius:50% ;
        position: absolute;
        right: 26.5%;
        top: 76.5%;
        cursor: pointer;
    }
    .sixBox{
        width: 312px;
        height: 48px;
        position: absolute;
        right:-59%;
        top: 73%;
        display: flex;
        flex-direction:column;
        justify-content: space-between;
        align-items:flex-start ;
    }
    .sixBox  .xt{
        width: 80px;
        height: 22px;
        font-family: SourceHanSansSC-Medium;
        font-size: 20px;
        color: #FFFFFF;
        text-align: left;
        line-height: 22px;
    }
    .sixBox   .text_area{
        width: 312px;
        height: 22px;
        font-family: SourceHanSansSC-Normal;
        font-size: 16px;
        color: #dddddd;
        text-align: left;
        line-height: 22px;
    }
    /*第七个点的样式*/
    .sevenPoint{
        width: 16px;
        height: 16px;
        /*background: #FFC100;*/
        border-radius:50% ;
        position: absolute;
        right: 26.5%;
        top: 94.5%;
        cursor: pointer;
    }
    .sevenBox{
        width: 195px;
        height: 70px;
        position: absolute;
        right: -29%;
        top: 90%;
        display: flex;
        flex-direction:column;
        justify-content: space-between;
        align-items:flex-start ;
    }
    .sevenBox  .xt{
        width: 60px;
        height: 22px;
        font-family: SourceHanSansSC-Medium;
        font-size: 20px;
        color: #FFFFFF;
        text-align: left;
        line-height: 22px;
    }
    .sevenBox   .text_area{
        width: 195px;
        height: 44px;
        font-family: SourceHanSansSC-Normal;
        font-size: 16px;
        color: #dddddd;
        text-align: left;
        line-height: 22px;
    }
    .yellow{
        width: 14px;
        height: 14px;
        border-radius:50% ;
        background: #FFC100;
        border: 1px solid #FFFFFF;
    }
    @media (max-height: 450px) {
        .oneBox   .text_area{
            width: 264px;
        }
    }
    @media (width: 667px) {
        .onePoint{
            width: 30px;
            height: 30px;
            transform: translate(-7px,-7px);
        }
        .twoPoint{
            width: 30px;
            height: 30px;
            transform: translate(7px,-7px);
        }
        .threePoint{
            width: 30px;
            height: 30px;
            transform: translate(7px,-7px);
        }
        .fourPoint{
            width: 30px;
            height: 30px;
            transform: translate(7px,-7px);
        }
        .fivePoint{
            width: 30px;
            height: 30px;
            transform: translate(7px,-7px);
        }
        .sixPoint{
            width: 30px;
            height: 30px;
            transform: translate(7px,-7px);
        }
        .sevenPoint{
            width: 30px;
            height: 30px;
            transform: translate(7px,-7px);
        }
        .yellow{
            width: 14px;
            height: 14px;
            transform: translate(0px,0px);
        }
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