<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{lang.title}}</div>
                <div style="width: 100%; height: 100%; background-color: #333333"></div>
                <img class="equation" src="./sub_static/UI/equation.png">
                <div class="text1" v-show="textShow1">{{lang.text[0]}}</div>
                <div class="text1" style="color:white;" v-show="textShow2">{{lang.text[1]}}<p style="color:greenyellow;display:inline-block;" >{{lang.text[2]}}</p>{{lang.text[4]}}</div>
                <div class="text1" style="color:white;" v-show="textShow3">{{lang.text[1]}}<p style="color:greenyellow;display:inline-block;" >{{lang.text[3]}}</p>{{lang.text[4]}}</div>
                <div class="buttonBox">
                    <button class="btn1" :class="{active: active1}" @click="getEvent(1)">{{lang.buttonTitle[0]}}</button>
                    <button class="btn2" :class="{active: active2}" @click="getEvent(2)">{{lang.buttonTitle[1]}}</button>
                    <div class="wenDu" id= "wenDu" style="display: none">
                        <button :class="{active: btn1}" @click="getSonEvent(1)">{{lang.buttonTitle[4]}}</button>
                        <button :class="{active: btn2}" @click="getSonEvent(2)">{{lang.buttonTitle[5]}}</button>
                    </div>
                    <button class="btn3" :class="{active: active3}" @click="getEvent(3)">{{lang.buttonTitle[2]}}</button>
                    <div class="yaQiang" id= "yaQiang" style="display: none">
                        <button :class="{active: btn3}" @click="getSonEvent(3)">{{lang.buttonTitle[6]}}</button>
                        <button :class="{active: btn4}" @click="getSonEvent(4)">{{lang.buttonTitle[7]}}</button>
                    </div>
                    <button class="btn4" :class="{active: active4}" @click="getEvent(4)">{{lang.buttonTitle[3]}}</button>
                    <div class="nongDu" id= "nongDu" style="display: none">
                        <button :class="{active: btn5}" @click="getSonEvent(5)">{{lang.buttonTitle[8]}}</button>
                        <button :class="{active: btn6}" @click="getSonEvent(6)">{{lang.buttonTitle[9]}}</button>
                        <button :class="{active: btn7}" @click="getSonEvent(7)">{{lang.buttonTitle[10]}}</button>
                    </div>
                </div>
                <div class="reactionBox" style="z-index: 2;">
                    <div class="hanZi" style="left: -23px;top: 174px;transform:rotate(270deg);">{{lang.text[5]}}</div>
                    <div class="hanZi" style="left: 69px;top: 9px;">{{lang.text[6]}}</div>
                    <div class="hanZi" style="left: 383px;top: 374px;">{{lang.text[7]}}</div>
                    <div class="hanZi" style="left: 466px;top: 10px;" v-show="show">{{lang.text[8]}}</div>
                    <div class="textTip hanZi" id="pushSth" style="left: 213px;top: 8px;"  v-show="show3">{{lang.text[9]}}</div>
                </div>
                <div class="reactionBox" id="reactionBoxChj">
                    <img class="pictureBg" src="./sub_static/UI/img1/pictureBg.png" v-bind:style="{zIndex:1}">
                    <img class="pressureBig" src="./sub_static/UI/img1/endImg.png" v-bind:style="{zIndex:4}" v-show="show">
                    <img class="endBig" src="./sub_static/UI/img1/lineImg.png" v-bind:style="{zIndex:2}"
                         style="position: absolute;left: -1px;">
                    <div class="blackCover" v-bind:style="{zIndex:3}"></div>
                </div>
                <div class="reactionBox" id="reactionBoxWd" style="display: none">
                    <img class="pictureBg" src="./sub_static/UI/img2/pictureBg.png" v-bind:style="{zIndex:1}">
                    <img class="pressureBig" src="./sub_static/UI/img2/temHigh.png" v-bind:style="{zIndex:1}" v-show="btn1">
                    <img class="pressureSmall" src="./sub_static/UI/img2/temLow.png" v-bind:style="{zIndex:1}" v-show="btn2">
                    <img class="endBig" src="./sub_static/UI/img2/endHigh.png" v-bind:style="{zIndex:3}" v-show="show1" >
                    <img class="endSmall" src="./sub_static/UI/img2/endLow.png" v-bind:style="{zIndex:3}" v-show="show2" >
                    <div class="blackCover" v-bind:style="{zIndex:2}"></div>
                </div>
                <div class="reactionBox" id="reactionBoxYq" style="display: none">
                    <img class="pictureBg" src="./sub_static/UI/img3/pictureBg.png" v-bind:style="{zIndex:1}">
                    <img class="pressureBig" src="./sub_static/UI/img3/pressureBig.png" v-bind:style="{zIndex:1}" v-show="btn3">
                    <img class="pressureSmall" src="./sub_static/UI/img3/pressureSmall.png" v-bind:style="{zIndex:1}" v-show="btn4">
                    <img class="endBig" src="./sub_static/UI/img3/endBig.png" v-bind:style="{zIndex:3}" v-show="show1" >
                    <img class="endSmall" src="./sub_static/UI/img3/endSmall.png" v-bind:style="{zIndex:3}" v-show="show2" >
                    <div class="blackCover" v-bind:style="{zIndex:2}"></div>
                </div>
                <div class="reactionBox" id="reactionBoxNd" style="display: none">
                    <img class="pictureBg" src="./sub_static/UI/img4/pictureBg.png" v-bind:style="{zIndex:1}">
                    <img class="pressureBig" src="./sub_static/UI/img4/lineH2.png" v-bind:style="{zIndex:1}" v-show="btn5">
                    <img class="pressureSmall" src="./sub_static/UI/img4/lineN2.png" v-bind:style="{zIndex:1}" v-show="btn6">
                    <img class="pressureSmall" src="./sub_static/UI/img4/lineNH3.png" v-bind:style="{zIndex:1}" v-show="btn7">
                    <img class="endBig" src="./sub_static/UI/img4/endH2.png" v-bind:style="{zIndex:3}" v-show="show1" >
                    <img class="endSmall" src="./sub_static/UI/img4/endN2.png" v-bind:style="{zIndex:3}" v-show="show2" >
                    <img class="endSmall" src="./sub_static/UI/img4/endNH3.png" v-bind:style="{zIndex:3}" v-show="show5" >
                    <div class="blackCover" v-bind:style="{zIndex:2}"></div>
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
    .hanZi{
        position: absolute;
        font-size: 18px;
        color: white;
        z-index: 1;
    }
    .text1 {
        font-size: 1.4vw;
        color:greenyellow;
        position: absolute;
        left: 50%;top: 13%;
        transform: translateX(-50%);
    }
    img{
        pointer-events: none;
    }
    .equation {
        position: absolute;
        width: 20vw;
        height: auto;
        left: 50%;
        top: 18%;
        transform: translateX(-50%);
    }

    .buttonBox {
        position: absolute;
        width: 126px;
        height: 224px !important;
        right: 24px;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 99;
    }

    button {
        width: 126px;
        z-index: 99;
        cursor: pointer;
        height: 38px;
        border-radius: 19px;
        border: 1px solid #ebebeb;
        color: #000;
        background: #fff;
        font-size: 18px;
    }
    .btn2, .btn3, .btn4{
        margin-top: 24px;
    }
    .wenDu, .yaQiang, .nongDu{
        width: 86px;
        margin-left: 40px;
        margin-top: 20px;
    }
    .wenDu button, .yaQiang button, .nongDu button{
        width: 86px;
        height: 30px;
        margin: 6px 0 12px 0;
        text-align: center;
        font-size: 14px;
    }
    .active {
        color: #fff;
        background-color: #5CAEFD;
    }
    .reactionBox{
        position: absolute;
        width: 762px;
        height: 400px;
        left: 50%;
        bottom: 22%;
        transform: translateX(-50%);
    }
    .reactionBox img {
        display: block;
        width: 100%;
        height: auto;
        background-size: 100% 100%;
        position: absolute;
    }
    .blackCover{
        position: absolute;
        width: 530px;
        height: 360px;
        right: 28px;
        top: 3px;
        background-color: #333333;
    }

    @media (min-height: 810px) {
        .reactionBox {
            transform:  translateX(-50%) scale(1.5);
        }
    }
    @media (max-height: 810px) and (min-height: 795px){
        .reactionBox {
            bottom: 23%;
        }
    }
    @media (max-height: 795px) and (min-height: 725px){
        .reactionBox {
            bottom: 18%;
        }
    }
    @media (max-height: 725px) and (min-height: 600px){
        .reactionBox {
            bottom: 15%;
        }
        .buttonBox {
            transform: scale(0.7);
        }
    }
    @media (max-height: 699px) and (min-height: 697px){
        .buttonBox {
            transform: scale(0.7);
            right: 6px;
        }
    }
    @media (max-height: 1085px) and (min-height: 1078px){
        .reactionBox {
            bottom: 26%;
        }
        .buttonBox {
            right: 32px;
            transform: scale(1.2);
        }
    }
    @media (max-width: 1024px) and (min-height: 768px){
        .buttonBox {
            transform: scale(0.8);
            right: 6px;
        }
    }
    @media (max-height: 600px) and (min-height: 460px){
        .reactionBox {
            bottom: 10%;
            transform:  translateX(-50%) scale(0.7);
        }
        .buttonBox {
            transform: scale(0.7);
        }
    }
    @media (max-height: 550px) and (min-height: 453px){
        .buttonBox {
            transform: scale(0.7);
            right: 6px;
        }
    }
    @media (max-height: 460px) and (min-height: 450px){
        .reactionBox {
            bottom: 2%;
            transform:  translateX(-50%) scale(0.7);
        }
        .buttonBox {
            transform: scale(0.7);
        }
    }
    @media (max-height: 450px) {
        .title_text{
            font-size: 18px;
        }
        .reactionBox{
            bottom: -13%;
            transform:  translateX(-50%) scale(0.5) ;
        }
        .buttonBox {
            transform: scale(0.4);
        }
    }
</style>
