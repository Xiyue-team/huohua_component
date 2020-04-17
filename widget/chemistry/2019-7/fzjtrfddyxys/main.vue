<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{lang.title}}</div>
                <div style="width: 100%; height: 100%; background-color: #333333"></div>
                <div class="left_box">
                    <div class="img_box">
                        <img src="./sub_static/UI/img1.png" alt="">
                        <img src="./sub_static/UI/img2.png" alt="">
                        <img src="./sub_static/UI/img3.png" alt="">
                    </div>
                    <div class="text_box">
                        <div >{{lang.text[0]}}</div>
                        <div >{{lang.text[1]}}</div>
                        <div >{{lang.text[2]}}</div>
                    </div>
                </div>
                <div class="content_box">
                    <img class="container" src="./sub_static/UI/container.png">
                    <img class="reactionImg" :src="reactionImg">
                </div>
                <div class="temperature_box">
                    <div class="tipText" v-show="show1" style="font-size: 18px;color: white;position: absolute;top: 193px; left:30px;">{{lang.text[6]}}</div>
                    <div class="tipText" v-show="show1" style="font-size: 18px;color: white;position: absolute;top: 104px; left:30px;">{{lang.text[7]}}</div>
                    <div class="tipText" v-show="show2" style="font-size: 18px;color: white;position: absolute;top: 127px; left:30px;">{{lang.text[6]}}</div>
                    <div class="tipText" v-show="show2" style="font-size: 18px;color: white;position: absolute;top: 36px; left:30px;">{{lang.text[7]}}</div>
                    <img class="temperature" src="./sub_static/UI/wdj.png" v-show="show1">
                    <img class="temperature" src="./sub_static/UI/wdj2.png" v-show="show2">
                    <div id="temDataBox" style="background-color:#F7750D;position:absolute;bottom:50px;right:24px;width:11px;"
                    :style="{height: heightNum + 'px'}"></div>
                </div>
                <div class="flex_box1">
                    <button class="btn3" id="btn3" :style="{opacity: opaNum1}" :class="{active: active1}" @click="getEvent(0)">{{lang.buttonTitle[2]}}</button>
                    <button class="btn4" :class="{active: active2}" @click="getEvent(1)">{{lang.buttonTitle[3]}}</button>
                    <button class="btn5" id="btn5" :style="{opacity: opaNum2}" :class="{active: active3}" @click="getEvent(2)">{{lang.buttonTitle[4]}}</button>
                </div>
                <div class="flex_box2">
                    <button class="btn1" :class="{active: show1}" @click="changeMatter(0)">{{lang.buttonTitle[0]}}</button>
                    <button class="btn2" :class="{active: show2}" @click="changeMatter(1)">{{lang.buttonTitle[1]}}</button>
                </div>
                <div class="describeText" style="" v-show="show1 & textShow">{{lang.text[8]}}</div>
                <div class="describeText" style="" v-show="show2 & textShow">{{lang.text[9]}}</div>
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
        color: #fff;
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
    }
    .describeText {
        font-size: 24px;
        color: white;
        position: absolute;
        bottom: 9%;
        left: 50%;
        transform: translateX(-50%);
    }
    .left_box{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 5vw;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        align-content: center;
        height: 30vh;
        width: 31vh;
        opacity: 1;
        background: #515151;
        box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
        border-radius: 12px;
    }
    .left_box .img_box, .left_box .text_box{
        height: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-content: center;
    }
    .left_box .img_box img, .left_box .text_box div{
        display: flex;
        align-items: center;
        height: 33%;
        width: auto;
        color: white;
        font-size: 18px;
    }
    .content_box{
        width: 35vw;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .content_box .container{
        width: 100%;
        height: auto;
    }
    .content_box .reactionImg{
        position: absolute;
        bottom: 10%;
        width: 72%;
        left: 13%;
        height: auto;
    }
    .temperature_box {
        width: 130px;
        position: absolute;
        right: 18%;
        top: 50%;
        transform: translateY(-50%);
    }
    .temperature_box .temperature{
        width: 60px;
        height: auto;
        float: right;
    }
    .flex_box1, .flex_box2{
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
    .flex_box1{
        height: 175px !important;
        top: 50%;
        transform: translateY(-50%);
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
        color: #333333;
        line-height: 16px;
    }
    .active{
        background-color: #0291FF !important;
        color: #FFFFFF !important;
        border: 1px solid #EBEBEB !important;
    }
    @media (max-height: 770px) and (min-height: 760px){
        .describeText{
            font-size: 20px;
            bottom: 19%;
        }
    }
    @media (max-height: 535px) and (min-height: 450px){
        .temperature_box{
            transform: translateY(-50%) scale(0.7);
        }
        .flex_box1{
            transform: translateY(-50%) scale(0.7);
        }
        .flex_box2{
            transform: scale(0.7);
        }
        .left_box .text_box div{
            font-size: 12px;
        }
        .describeText{
            font-size: 16px;
            bottom: 14%;
        }
    }
    @media (max-height: 400px) and (min-height: 310px){
        .temperature_box{
            transform: translateY(-50%) scale(0.5);
        }
        .flex_box1{
            right: 0;
            transform: translateY(-50%) scale(0.5);
        }
        .flex_box2{
            right: 0;
            transform: scale(0.5);
            bottom: 15px;
        }
        .left_box {
            height: 35vh;
            width: 36vh;
        }
        .left_box .text_box div{
            font-size: 12px;
        }
        .describeText{
            font-size: 12px;
        }
    }
    @media (max-height: 330px) and (min-height: 310px) {
        .describeText{
            bottom: 7%;
        }
    }
</style>
