<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div style="width: 100%;height:100%; background-color: #333333"></div>
                <div id="title" class="title_text">催化作用</div>
                <div id="flex_box" class="flex_box">
                    <div class="btn" id="btn1" @click="getEvent(1)" >
                        <button :class="{active: active1}">非催化反应</button></div>
                    <div class="btn" id="btn2" @click="getEvent(2)" >
                        <button :class="{active: active2}">催化反应</button></div>
                    <div class="btn" id="btn3" @click="getEvent(3)" >
                        <button :class="{active: active3}">反应速率</button></div>
                </div>
                <div class="reactionImgBox" v-show="!active3">
                </div>
                <div class="energyImgBox" id="energyImgBox">
                    <img src="./sub_static/UI/zuobiao.png">
                    <img src="./sub_static/UI/redLine.png" v-bind:style="{zIndex:1}" v-show="redShow">
                    <img src="./sub_static/UI/greenLine.png" v-bind:style="{zIndex:3}" v-show="blueShow">
                    <div id="redCover"  v-show="redShow"
                         v-bind:style="{zIndex:index3}"></div>
                    <div id="blueCover" v-show="blueShow"
                         v-bind:style="{zIndex:index4}"></div>
                    <img src="./sub_static/UI/E1.png" v-bind:style="{zIndex:3}" v-show="activeE1">
                    <img src="./sub_static/UI/E2.png" v-bind:style="{zIndex:5}" v-show="activeE2">
                    <img src="./sub_static/UI/E3.png" v-bind:style="{zIndex:5}" v-show="activeE3">
                    <img src="./sub_static/UI/reactant.png" v-bind:style="{zIndex:5}" v-show="reactantTip">
                    <img src="./sub_static/UI/product.png" v-bind:style="{zIndex:5}" v-show="productTip">
                </div>
                <div class="tipImg"><img :src="tipImg"></div>
                <keyFrameAnimation  class="slider" v-bind="animationOption1" ref="functionuse1" v-model="frameNum1" v-show="active1">
                </keyFrameAnimation>
                <keyFrameAnimation  class="slider" v-bind="animationOption2" ref="functionuse2" v-model="frameNum2" v-show="active2">
                </keyFrameAnimation>

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
    import keyFrameAnimation from './services/keyFrameAnimation.vue';

    @Component({
        components: {
            fullScreensLayout, keyFrameAnimation,
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
        color: #FFF;
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
    }
    @font-face
    {
        font-family: fontt;
        src: url('./SourceHanSansCN-Regular.otf')
    }

    *{
        font-family: fontt !important;
    }
    #redCover, #blueCover {
        position: absolute;
        width: 460px;
        height: 400px;
        left: 45px;
        top: 90px;
        background-color: #333333;
    }
    .reactionImgBox{
        position: absolute;
        width: 620px;
        height: 620px;
        background-color: black;
        top: 50%;
        transform: translateY(-50%);
        left: 10%;
    }
    .energyImgBox {
        position: absolute;
        width: 550px;
        height: 550px;
        background-color: #333333;
        top: 50%;
        transform: translateY(-50%);
        left: 53%;
    }
    .energyImgBox img{
        display: block;
        width: 100%;
        height: auto;
        background-size: 100% 100%;
        position: absolute;
    }
    .tipImg {
        position: absolute;
        width: 250px;
        height: 150px;
        right: 3vw;
        top: 10vw;
    }
    .tipImg img{
        display: block;
        width: 100%;
        height: auto;
        background-size: 100% 100%;
        position: absolute;
    }
    .slider{
        position: absolute;
        bottom: 0;
    }
    .flex_box {
        width: 122px;
        height: 200px !important;
        right: 5.5vw;
        bottom: 22vh;
        font-weight: 700;
        position: absolute;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
        align-content: center;
        z-index: 99;
    }

    .btn {
        width: 122px;
        height: 42px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    button {
        width: 100%;
        background: #FFFFFF;
        border: 1px solid #ffffff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12);
        border-radius: 24px;
        padding: 12px 16px;
        font-size: 16px;
        color: #000000;
        line-height: 16px;
    }
    .active {
        color: #ffffff;
        border: 1px solid #ffffff;
        background-color: #0199FF;
    }
    @media (min-width: 1200px) and (max-width: 1300px){
        .reactionImgBox{
            width: 400px;
            height: 400px;
        }
        .energyImgBox{
            top: 50%;
            transform: translateY(-50%) scale(0.7);
            left: 70%;
        }
    }
    @media (min-width: 900px) and (max-width: 1100px){
        .reactionImgBox{
            width: 400px;
            height: 400px;
        }
        .energyImgBox{
            top: 50%;
            transform: translateY(-50%) scale(0.6);
            left: 70%;
        }
    }
    @media (max-height: 535px) {
        .energyImgBox{
            width: 255px;
            height: 255px;
        }
        #redCover, #blueCover{
            width: 220px;
            height: 190px;
            left: 21px;
            top: 39px;
        }
        .reactionImgBox{
            width: 250px;
            height: 250px;
            left: 80px;
        }
        .tipImg {
            transform: scale(0.7);
            right: -8vw;
        }
        .tipImg img{
            transform: scale(0.7);
        }
        .flex_box {
            right: -1vw;
            bottom: 10vh;
            transform: scale(0.5);
        }
    }
    @media (min-height: 370px) and (max-height: 380px){
        .reactionImgBox{
            left: 60px;
        }
    }
    @media (min-height: 300px) and (max-height: 362px){
        .reactionImgBox{
            width: 210px;
            height: 210px;
        }
        .flex_box {
            right: -1vw;
            bottom: 4vh;
            transform: scale(0.5);
        }
    }

</style>
