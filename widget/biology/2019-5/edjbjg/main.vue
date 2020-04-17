<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=0">
                <div id="title" class="title_text">{{title}}</div>
                <div class="content" id="content" :style="{zoom:zoom1}">
                    <img src="./sub_static/UI/bj.png" style="width:100%;height:100%">
                    <div class="buttonBox" id="buttonBox">
                        <button :class="{an_niu: have,
                        'bulecomplete0': index === ishave,'bulecomplete1': index === ishave1,'bulecomplete2':  index === ishave2}"
                                v-for="(item, index) in textArr"
                                :key="index"
                                :id="'index' + index"
                                v-text="item"
                                @click="getEvent(index)"
                        ></button>
                    </div>
                    <div class="container">
                        <img src="./sub_static/UI/st.png"  v-show="isShow_st" style="width:100%;height:100%">
                        <div class="container_wai" v-show="isShow_w">
                            <img src="./sub_static/UI/1.png" style="width:100%;height:100%">
                            <div class="text1">{{buttonArr[0]}}</div>
                            <div class="text2">{{buttonArr[1]}}</div>
                        </div>
                        <div class="container_zhong" v-show="isShow_z">
                            <img src="./sub_static/UI/2.png" style="width:100%;height:100%">
                            <div class="text1">{{buttonArr[2]}}</div>
                            <div class="text2">{{buttonArr[3]}}</div>
                            <div class="text3">{{buttonArr[4]}}</div>
                            <div class="text4">{{buttonArr[5]}}</div>
                        </div>

                        <div class="container_nei" v-show="isShow_n">
                            <img src="./sub_static/UI/3.png" style="width:100%;height:100%">
                            <div class="text1">{{buttonArr[6]}}</div>
                            <div class="text2">{{buttonArr[7]}}</div>
                            <div class="text3">{{buttonArr[8]}}</div>
                            <div class="text4">{{buttonArr[9]}}</div>
                        </div>
                    </div>
                    <div class="playButton" @click="getPlay()">
                            <img src="./sub_static/UI/4.png" style="width:100%;height:100%" v-show="!isShow">
                            <img src="./sub_static/UI/5.png" style="width:100%;height:100%" v-show="isShow">
                    </div>
                    <div class="videoBox" id="videoBox" v-show="showVideo">
                         <img src=""   id="gifSrc" style="width:100%;height:100%">
                    </div>
                    <div class="voiceBox" v-if="showVoice">
                        <audio  id="audioPlay"  autoplay>
                            <source src="./sub_static/Video/yy.mp3" type="audio/mpeg">
                        </audio>
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
    .buttonBox{
        width: 88px;
        height: 150px;
        position: absolute;
        top: 50%;
        right: 2.3%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        align-content: center;
        z-index: 2000;
    }
    .an_niu{
        width: 88px;
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
    .bulecomplete0{
        background: #F59923;
        border: 1px solid #EBEBEB;
        border-radius: 19px;
        color: #FFFFFF;
    }
    .bulecomplete1{
        background: #B45450;
        border: 1px solid #EBEBEB;
        border-radius: 19px;
        color: #FFFFFF;
    }
    .bulecomplete2{
        background: #3679E1;
        border: 1px solid #EBEBEB;
        border-radius: 19px;
        color: #FFFFFF;
    }
    .container{
        width: 680px;
        height: 426px;
        position: absolute;
        top: 15.6%;
        left:14.7%;
    }
    .container>img{
        position: absolute;
        top: 0;
        left:0;
        z-index:0;
    }
    .container_wai{
        width: 100%;
        height: 100%;
        z-index: 999;
        position: absolute;
    }
    .container_wai .text1{
        position: absolute;
        left: -40px;
        top: 155px;
        font-size: 18px;
        color: #F59923;
    }
    .container_wai .text2{
        position: absolute;
        left: -50px;
        top: 255px;
        font-size: 18px;
        color: #F59923;
    }
    .container_zhong{
        width: 100%;
        height: 100%;
        z-index: 999;
        position: absolute;
    }
    .container_zhong  .text1{
        position: absolute;
        left: 272px;
        bottom:77px;
        font-size: 18px;
        color: #B45450;
    }
    .container_zhong  .text2{
        position: absolute;
        left: 343px;
        bottom:36px;
        font-size: 18px;
        color: #B45450;
    }
    .container_zhong  .text3{
        position: absolute;
        left: 440px;
        bottom:-13px;
        font-size: 18px;
        color: #B45450;
    }
    .container_zhong  .text4{
        position: absolute;
        right: -65px;
        bottom:85px;
        font-size: 18px;
        color: #B2B1B3;
    }
    .container_nei{
        width: 100%;
        height: 100%;
        z-index: 999;
        position: absolute;
    }
    .container_nei .text1{
        position: absolute;
        right: 190px;
        top:-7px;
        font-size: 18px;
        color: #B2B1B3;
    }
    .container_nei .text2{
        position: absolute;
        right: -10px;
        top:94px;
        font-size: 18px;
        color: #0291FF;
    }
    .container_nei .text3{
        position: absolute;
        right: -15px;
        top:178px;
        font-size: 18px;
        color: #0291FF;
    }
    .container_nei .text4{
        position: absolute;
        right: -20px;
        top:226px;
        font-size: 18px;
        color: #0291FF;
    }
   .playButton{
       width: 60px;
       height: 60px;
       position: absolute;
       right: 3.8%;
       bottom: 15.6%;
       cursor: pointer;
   }
    /*关于视频的样式*/
    .videoBox {
        width: 680px;
        height: 426px;
        position: absolute;
        top: 15.6%;
        left:14.7%;
    }
    videoBox > img{
        width: 100%;
        height: 100%;
    }
</style>
