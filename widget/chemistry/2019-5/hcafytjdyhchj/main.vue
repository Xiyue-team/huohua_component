<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <img class="equation" src="./sub_static/UI/equation.png">
                <div class="buttonBox">
                    <button :class="{active: active1}" @click="getEvent(1)">{{buttonTitle[0]}}</button>
                    <button :class="{active: !active1}" @click="getEvent(2)">{{buttonTitle[1]}}</button>
                </div>
                <img class="legendImg" src="./sub_static/UI/legend.png">
                <img class="container" src="./sub_static/UI/container.png">
                <div class="reactionBox" >
                    <img class="animation" src="./sub_static/UI/first.gif" v-show="active1">
                    <img class="animation" src="./sub_static/UI/second.gif" v-show="!active1">
                </div>
                <div class="eChart_box" id="eChart_box">
                    <div class="eCharts" id="eCharts" ></div>
                    <div class="textBox" >
                        <span style="float:left; font-size: 16px;font-weight: 700;">{{text[0]}}</span>
                        <span style="float:right; font-size: 16px;font-weight: 700;">{{text[1]}}</span>
                    </div>
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
    .equation {
        position: absolute;
        width: 20vw;
        height: auto;
        left: 50%;
        bottom: 5%;
        transform: translateX(-50%);
    }

    .legendImg{
        width: 160px;
        height: auto;
        position: absolute;
        left: 100px;
        top: 50%;
        transform: translateY(-50%);
    }
    .buttonBox {
        position: absolute;
        width: 102px;
        height: 108px !important;
        right: 24px;
        bottom: 5vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        align-content: center;
        z-index: 99;
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
        font-family: PingFangSC-Medium;
        color: #333333;
        line-height: 16px;
    }
    .active {
        color: #fff;
        background-color: #5CAEFD;
    }
    .reactionBox{
        position: absolute;
        width: 30vw;
        height: 21vw;
        left: 50%;
        bottom: 20%;
        transform: translateX(-50%);
    }
    .reactionBox .animation {
        display: block;
        width: 100%;
        height: auto;
        position: absolute;
    }
    .container {
        display: block;
        width: 42vw;
        height: auto;
        position: absolute;
        left: 50%;
        bottom: 18%;
        transform: translateX(-50%);
        z-index: 10;
    }
    .eChart_box {
        display: flex;
        flex-direction: column;
        width: 390px;
        height: 500px;
        position: absolute;
        right: 3vw;
        top: 50%;
        transform: translateY(-50%);
    }
    .eCharts {
        z-index: 0;
        position: absolute;
        top: 0;
        right: 0;
        width: 390px ;
        height: 450px ;
    }
    .textBox {
        position: absolute;
        bottom: 30px;
        right: 115px;
        width: 180px ;
        height: 50px ;
    }
    @media (min-width: 1100px) and (max-width: 1300px){
        .eChart_box {
            width: 280px;
            height: 320px;
        }
        .eCharts {
            transform: scale(0.8);
            top: -80px;
            right: -60px;
        }
        .textBox {
            transform: scale(0.8);
            bottom: -10px;
            right: 53px;
        }
    }
    @media (min-width: 900px) and (max-width: 1100px){
        .eChart_box {
            width: 280px;
            height: 320px;
        }
        .eCharts {
            transform: scale(0.8);
            top: -80px;
            right: -92px;
        }
        .textBox {
            transform: scale(0.8);
            bottom: -10px;
            right: 21px;
        }
    }
    @media (min-width: 800px) and (max-width: 900px){
        .eChart_box {
            width: 280px;
            height: 320px;
        }
        .eCharts {
            transform: scale(0.7);
            top: -85px;
            right: -95px;
        }
        .textBox {
            transform: scale(0.7);
            bottom: 10px;
            right: 17px;
        }
    }

    @media (max-height: 802px) and (min-height: 600px){
        .legendImg{
            left: 50px;
            top: 50%;
            transform: translateY(-50%) scale(0.7) ;
        }
        .buttonBox {
            transform: scale(0.7);
        }
    }
    @media (max-height: 810px) and (min-height: 795px){
        .container{
            bottom: 26%;
        }
        .reactionBox{
            bottom: 28%;
        }
        .buttonBox {
            transform: scale(1);
        }
        .equation{
            bottom: 16%;
        }
    }
    @media (max-height: 795px) and (min-height: 725px){
        .container{
            bottom: 24%;
        }
        .reactionBox{
            bottom: 26%;
        }
        .buttonBox {
            transform: scale(1);
        }
        .equation{
            bottom: 16%;
        }
    }
    @media (max-height: 725px) and (min-height: 600px){
        .container{
            bottom: 24%;
        }
        .reactionBox{
            bottom: 26%;
        }
        .buttonBox {
            transform: scale(1);
        }
        .equation{
            bottom: 16%;
        }
    }
    @media (max-height: 1085px) and (min-height: 1078px){
        .container{
            bottom: 25%;
        }
        .reactionBox{
            bottom: 27%;
        }
        .buttonBox {
            transform: scale(1);
            right: 42px;
        }
        .equation{
            bottom: 16%;
        }
    }
    @media (max-height: 600px) and (min-height: 500px){
        .legendImg{
            left: 20px;
            top: 50%;
            transform: translateY(-50%) scale(0.5);
        }
        .buttonBox {
            transform: scale(0.7);
        }
    }
    @media (max-height: 500px) and (min-height: 450px){
        .legendImg{
            left: 20px;
            top: 50%;
            transform: translateY(-50%) scale(0.5);
        }
        .buttonBox {
            transform: scale(0.7);
            bottom: -1vh;
        }
    }
    @media (max-height: 450px) {
        .reactionBox{
            bottom: 18%;
        }
        .container {
            bottom: 16%;
        }
        .legendImg{
            left: 0;
            top: 50%;
            transform: translateY(-50%) scale(0.4);
        }
        .eChart_box {
            width: 200px;
            height: 250px;
        }
        .eCharts {
            transform: scale(0.5);
            top: -110px;
            right: -110px;
        }
        .textBox {
            transform: scale(0.5);
            bottom: 10px;
            right: -1px;
        }
        .buttonBox {
            bottom: -2vh;
            transform: scale(0.4);
        }
    }
</style>
