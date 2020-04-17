<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div class="buttonBox">
                    <button :class="{active: active1}" @click="getEvent(1)">MgCO₃</button>
                    <button :class="{active: active2}" @click="getEvent(2)">CaCO₃</button>
                    <button :class="{active: active3}" @click="getEvent(3)">SrCO₃</button>
                    <button :class="{active: active4}" @click="getEvent(4)">BaCO₃</button>
                </div>
                <img class="legendImg" src="./sub_static/UI/legend_Mg.png" v-show="active1">
                <img class="legendImg" src="./sub_static/UI/legend_Ca.png" v-show="active2">
                <img class="legendImg" src="./sub_static/UI/legend_Sr.png" v-show="active3">
                <img class="legendImg" src="./sub_static/UI/legend_Ba.png" v-show="active4">
                <div class="reactionBox" >
                    <img class="animation" :src="molecularMotion" v-show="show" >
                    <img class="animation" src="./sub_static/UI/mg/tansuan_Mg_2.gif" v-show="show1">
                    <img class="animation" src="./sub_static/UI/mg/tansuan_Mg_3.gif" v-show="show2">
                    <img class="animation" src="./sub_static/UI/ca/tansuan_Ca_2.gif" v-show="show3">
                    <img class="animation" src="./sub_static/UI/ca/tansuan_Ca_3.gif" v-show="show4">
                    <img class="animation" src="./sub_static/UI/sr/tansuan_Sr_2.gif" v-show="show5">
                    <img class="animation" src="./sub_static/UI/sr/tansuan_Sr_3.gif" v-show="show6">
                    <img class="animation" src="./sub_static/UI/ba/tansuan_Ba_2.gif" v-show="show7">
                    <img class="animation" src="./sub_static/UI/ba/tansuan_Ba_3.gif" v-show="show8">
                </div>
                <div class="thermometerBox">
                    <img class="thermometerBg" style="z-index: 3" :src="thermometerBg">

                    <img class="thermometerBg" style="z-index: 1; " src="./sub_static/UI/thermometerBg1.png">
                    <img id="thermometerBg" class="thermometerBg" style="z-index: 2;" src="./sub_static/UI/thermometerBg3.png">
                    <div id="slider" class="slider" style="width: 70px;z-index: 4; right: 25px; bottom: 60px;position: absolute">
                        <img ondragstart="return false" style="width: 100%;" src="./sub_static/UI/slider.png">
                    </div>
                    <p v-if="resolveShow">{{text[1]}}<br><span>{{number}}℃</span></p>
                    <p v-if="!resolveShow">{{text[0]}}</p>
                    <img class="legendBox" src="./sub_static/UI/legend1.png" v-show="active1">
                    <img class="legendBox" src="./sub_static/UI/legend2.png" v-show="active2">
                    <img class="legendBox" src="./sub_static/UI/legend3.png" v-show="active3">
                    <img class="legendBox" src="./sub_static/UI/legend4.png" v-show="active4">
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
        color: #000;
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
    }
    img{
        pointer-events: none;
    }
    .legendImg{
        width: 220px;
        height: auto;
        position: absolute;
        left: 100px;
        top: 50%;
        transform: translateY(-50%);
    }
    .thermometerBox {
        width: 220px;
        height: 513px;
        position: absolute;
        right: 100px;
        top: 50%;
        transform: translateY(-50%);
    }
    .thermometerBg{
        width: 100%;
        height: auto;
        position: absolute;
    }
    .thermometerBox p{
        text-align: center;
        font-size: 18px;
        margin-top: 550px;
    }
    .thermometerBox .legendBox {
        width: 225px;
        height: auto;
        position: absolute;
        bottom: -150px;
    }
    .buttonBox {
        position: absolute;
        width: 678px;
        height: 43px !important;
        left: 50%;
        transform: translateX(-50%);
        bottom: 12vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-content: center;
    }
    button{
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
    button img {
        width: auto;
        height: 30px;
    }
    .active {
        color: #fff;
        background-color: #5CAEFD;
    }
    .reactionBox{
        position: absolute;
        width: 45vw;
        height: 28.4vw;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background: #F6F6F6;
        border: 2px solid #EDEDED;
    }
    .reactionBox .animation {
        display: block;
        width: 100%;
        height: auto;
        position: absolute;
    }

    @media (max-height: 802px) and (min-height: 600px){
        .legendImg{
            left: 50px;
            top: 50%;
            transform: translateY(-50%) scale(0.7) ;
        }
        .thermometerBox {
            right: 50px;
            top: 50%;
            transform: translateY(-50%) scale(0.7) ;
        }
        .buttonBox {
            left: 50%;
            transform: translateX(-50%) scale(0.7) ;
        }
    }
    @media (max-height: 810px) and (min-height: 795px){
        .buttonBox {
            bottom: 17vh;
            left: 50%;
            transform: translateX(-50%) scale(0.8) ;
        }
    }
    @media (max-height: 795px) and (min-height: 725px){
        .buttonBox {
            left: 50%;
            bottom: 16vh;
            transform: translateX(-50%) scale(0.8);
        }
    }
    @media (max-height: 769px) and (min-height: 767px){
        .buttonBox {
            width: 580px;
        }
    }
    @media (max-height: 725px) and (min-height: 600px){
        .buttonBox {
            left: 50%;
            transform: translateX(-50%) scale(0.8) ;
        }
    }
    @media (max-height: 699px) and (min-height: 697px){
        .buttonBox {
            width: 540px;
        }
    }
    @media (max-height: 1085px) and (min-height: 1078px){
        .buttonBox {
            left: 50%;
            bottom: 15vh;
            transform: translateX(-50%) scale(1.2) ;
        }
    }
    @media (max-width: 1537px) and (min-width: 1535px){
        .thermometerBox .legendBox{
            bottom: -130px;
        }
    }
    @media (max-width: 1232px) and (min-width: 1230px){
        .thermometerBox .legendBox{
            bottom: -130px;
        }
    }
    @media (max-height: 600px) and (min-height: 450px){
        .legendImg{
            left: 20px;
            top: 50%;
            transform: translateY(-50%) scale(0.5) ;
        }
        .thermometerBox {
            right: 20px;
            top: 50%;
            transform: translateY(-50%) scale(0.5) ;
        }
        .buttonBox {
            left: 50%;
            transform: translateX(-50%) scale(0.5) ;
        }
    }
    @media (max-height: 450px) {
        .legendImg{
            left: 0;
            top: 50%;
            transform: translateY(-50%) scale(0.4) ;
        }
        .thermometerBox {
            right: 0;
            top: 50%;
            transform: translateY(-50%) scale(0.4) ;
        }
        .buttonBox {
            bottom: 5vh;
            left: 50%;
            transform: translateX(-50%) scale(0.4) ;
        }
    }
</style>
