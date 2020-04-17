<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div style="width: 100%; height: 100%; background-color: #333333"></div>
                <img class="equation" src="./sub_static/UI/equation.png">
                <img id="text2" :src="tipImg"
                     style="width: 16vw;position: absolute;left: 50%;top: 13%;transform: translateX(-50%);" v-show="active1">
                <div class="buttonBox">
                    <button :class="{active: active1}" @click="getEvent(1)">{{buttonTitle}}</button>
                </div>
                <div class="reactionBox" >
                    <img class="pictureBg" src="./sub_static/UI/pictureBg.png" v-bind:style="{zIndex:1}">
                    <img class="pressureBig" src="./sub_static/UI/endImg.png" v-bind:style="{zIndex:4}" v-show="show">
                    <img class="endBig" src="./sub_static/UI/lineImg.png" v-bind:style="{zIndex:2}"
                         style="position: absolute;left: -1px;">
                    <img id="text1" :src="textImg" v-bind:style="{zIndex:4}"
                         style="width: 68px;position: absolute;left: 215px;top: 14px;" v-show="active1" >
                    <div id="blackCover" v-bind:style="{zIndex:3}"></div>
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
        width: 102px;
        height: 54px !important;
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
        color: #333333;
        line-height: 16px;
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
    #blackCover{
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
    @media (max-height: 1085px) and (min-height: 1078px){
        .reactionBox {
            bottom: 26%;
        }
        .buttonBox {
            right: 32px;
            transform: scale(1.2);
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
