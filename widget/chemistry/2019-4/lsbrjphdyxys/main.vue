<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div class="buttonBox">
                    <div class="btn1" @click="getEvent(1)">
                        <button :class="{active: active1}">{{buttonTitle[0]}}</button>
                    </div>
                    <div  class="btn" @click="getEvent(2)">
                        <button :class="{active: active2}">{{buttonTitle[1]}}</button>
                    </div>
                    <div class="btn" @click="getEvent(3)">
                        <button :class="{active: active3}">{{buttonTitle[2]}}</button>
                    </div>
                    <div class="btn" @click="getEvent(4)">
                        <button :class="{active: active4}">{{buttonTitle[3]}}</button>
                    </div>
                </div>
                <div id="BaSO4" >{{buttonTitle[1]}}</div>
                <div class="eChart_box" id="eChart_box">
                    <div class="eCharts" id="eCharts" ></div>
                    <img class="legend1" src="./sub_static/UI/equation1.png">
                    <img class="legend2" src="./sub_static/UI/equation2.png">
                    <img class="tip" src="./sub_static/UI/tipImg.png" v-show="active" :class="{tipActive: tipActive}" @click="tipEvt()" >
                    <div class="tipText" v-show = "tipActive">{{text[0]}}</div>
                    <div class="box1"></div>
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
    #BaSO4 {
        position: absolute;
        font-size: 2vh
    }
    .eChart_box {
        display: flex;
        flex-direction: column;
        width: 290px;
        height: 400px;
        position: absolute;
        right: 250px;
        top: 50%;
        z-index: 99;
        transform: translateY(-50%);
    }
    .eCharts {
        position: absolute;
        top: 0;
        left: 0;
        width: 290px ;
        height: 350px ;
    }
    .legend1{
        display: block;
        width: 80px;
        height: auto;
        position: absolute;
        left: 100px;
        bottom: 40px;
    }
    .legend2{
        display: block;
        width: 300px;
        height: auto;
        position: absolute;
        left: -5px;
        bottom: 0;
    }
    .tip {
        display: block;
        opacity: 0.5;
        width: 30px;
        height: auto;
        position: absolute;
        right: -55px;
        bottom: -4px;
        cursor:pointer;
    }
    .tipActive {
        opacity: 1;
    }
    .tipText {
        position: absolute;
        font-size: 20px;
        color: #000;
        left: 26%;
        bottom: -47px;
    }
    .box1{
        position: absolute;
        top: 49px;
        right: 136px;
        width: 30px;
        height: 250px;
        border: 1px solid darkgrey;
        border-radius: 15px;
    }
    .buttonBox{
        position: absolute;
        width: 678px;
        height: 43px !important;
        left: 19.5%;
        bottom: 12vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-content: center;
    }
    .btn1{
        width: 92px;
        height: 42px;
        cursor: pointer;
    }
    .btn{
        width: 126px;
        height: 42px;
        cursor: pointer;
    }
    button {
        width: 100%;
        background: #FFFFFF;
        border: 1px solid rgba(0,0,0,0.12);
        box-shadow: 0 1px 3px rgba(0,0,0,0.12);
        border-radius: 21px;
        padding: 12px 16px;
        font-size: 16px;
        color: #333;
        font-weight: 700;
        line-height: 16px;
    }
    .active {
        color: #ffffff;
        border: 1px solid #ffffff;
        background-color: #0199FF;
    }
    @media (max-height: 1200px) and (min-height: 1160px){
        .buttonBox{
            left: 16%;
        }
    }
    @media (max-height: 1160px) and (min-height: 1150px){
        .buttonBox{
            left: 18.5%;
        }
    }
    @media (max-height: 1150px) and (min-height: 1100px){
        .buttonBox{
            left: 15.5%;
        }
    }
    @media (max-height: 1080px) and (min-height: 1050px){
        .buttonBox{
            left: 18%;
        }
    }
    @media (max-height: 965px) and (min-height: 955px){
        .buttonBox{
            left: 12%;
        }
    }
    @media (max-height: 850px) {
        .eChart_box {
            right: 80px;
            transform: translateY(-50%) scale(0.8);
        }
        .buttonBox{
            left: 5%;
            transform: scale(0.8);
        }
    }
    @media (max-height: 780px) {
        .buttonBox{
            left: -3%;
        }
    }
    @media (max-height: 730px) {
        .buttonBox{
            left: 9%;
        }
    }
    @media (max-height: 700px) {
        .buttonBox{
            left: -1%;
        }
    }
    @media (max-height: 690px) and (min-height: 670px){
        .buttonBox{
            left: 10%;
        }
    }
    @media (max-height: 670px) {
        .eChart_box {
            right: 30px;
            transform: translateY(-50%) scale(0.6);
        }
        .buttonBox{
            left: -8%;
            transform: scale(0.6);
        }
    }
    @media (max-height: 550px) and (min-height: 500px){
        .buttonBox{
            left: -9%;
        }
    }
    @media (max-height: 500px) {
        .eChart_box {
            right: 0;
            transform: translateY(-50%) scale(0.5);
        }
        .buttonBox{
            left: -17%;
            transform: scale(0.5);
        }
    }
    @media (max-height: 455px) {
        .buttonBox{
            left: -7%;
        }
    }
    @media (max-height: 380px) {
        .buttonBox{
            left: -15%;
        }
    }
    @media (max-height: 365px) {
        .buttonBox{
            left: -18%;
        }
    }
    @media (max-width: 730px) and (max-height: 360px) {
        .buttonBox{
            left: -9%;
        }
    }
    @media (max-width: 645px) and (max-height: 360px) {
        .buttonBox{
            left: -17%;
        }
    }
    @media (max-height: 376px) {
        #BaSO4 {
            transform: scale(0.7);
        }
    }
    @media (max-height: 340px) {
        .buttonBox{
            left: -17%;
        }
        #BaSO4 {
            transform: scale(0.7);
        }
    }
    @media (max-height: 331px) {
        .buttonBox{
            left: -8%;
        }
        #BaSO4 {
            transform: scale(0.7);
        }
    }

</style>
