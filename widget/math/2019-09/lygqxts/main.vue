<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div style="width: 100%;height: 100%;background-color: #333"></div>
                <div id="title" class="title_text">{{lang.title}}</div>
                <button class="btn1">{{lang.buttonText[0]}}</button>
                <img class="img1" src="./sub_static/UI/img1.png">
                <div  id= "flex_box1" class="flex_box1">
                    <div style="font-style:italic">r<p>₁</p></div>
                    <div style="font-style:italic">r<p>₂</p></div>
                </div>
                <div class="flex_box">
                    <vue-slider class="vueSlider"
                                v-model="value1"
                                v-bind="sliderOption1"></vue-slider>
                    <vue-slider class="vueSlider"
                                v-model="value2"
                                v-bind="sliderOption2"></vue-slider>
                </div>
                <div class="flex_box2">
                    <button class="btn2" :class="{active: active1}" @click="getEvent(0)">{{lang.buttonText[1]}}</button>
                    <button class="btn3" :class="{active: active2}" @click="getEvent(1)">{{lang.buttonText[2]}}</button>
                </div>
                <img class="gridImg" src="./sub_static/UI/gridImg.png" v-show="active">
                <div class="container" v-show="active">
                    <div class="border_box" style=""><p>{{lang.text[0]}}</p></div>
                    <div class="border_box right_box" ><p>{{lang.text[1]}}</p></div>
                    <div class="border_box" style="top:2.19vw;"><p>{{lang.buttonText[3]}}</p></div>
                    <div class="border_box right_box" style="top:2.19vw;"><p>0</p></div>
                    <div class="border_box" style="top:4.38vw;"><p>{{lang.buttonText[4]}}</p></div>
                    <div class="border_box right_box" style="top:4.38vw;"><p>1</p></div>
                    <div class="border_box" style="top:6.57vw;"><p>{{lang.buttonText[5]}}</p></div>
                    <div class="border_box right_box" style="top:6.57vw;"><p>2</p></div>
                    <div class="border_box" style="top:8.76vw;"><p>{{lang.buttonText[0]}}</p></div>
                    <div class="border_box right_box" style="top:8.76vw;"><p>3</p></div>
                    <div style="top:10.95vw;"><p>{{lang.buttonText[6]}}</p></div>
                    <div class="right_box" style="top:10.95vw;"><p>4</p></div>
                </div>

                <div id="3dContainer" class="Container" style="position:absolute;top: 50%;
                transform: translateY(-50%);width: 70vw;height: 90vh"></div>
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
    import vueSlider from 'vue-slider-component/dist-css/vue-slider-component.common.js';
    import 'vue-slider-component/dist-css/vue-slider-component.css';
    import 'vue-slider-component/theme/default.css';

    @Component({
        components: {
            fullScreensLayout, vueSlider
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
        color: #ffffff;
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
    }
    .btn1{
        width: 88px;
        height: 42px;
        position: absolute;
        z-index: 9;
        top: 82px;
        left: 24px;
        background: rgba(81,81,81,0.50);
        border: 1px solid rgba(255,255,255,0.20);
        box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
        border-radius: 8px;
        font-size: 20px;
        color: #FFFFFF;
        text-align: center;
        line-height: 20px;
    }
    .img1{
        position: absolute;
        width: 15vw;
        display: block;
        top: 10vh;
        left: 78vw;
    }
    .gridImg{
        position: absolute;
        left: 78vw;
        top: 46vh;
        width: 15vw;
        height: 13.14vw;
        z-index: 98;
    }
    .container {
        position: absolute;
        top: 46vh;
        left: 78.3vw;
        width: 15vw;
        height: 13.14vw;
        justify-items: center;
        align-items: center;
        z-index: 99;
    }
    .container div {
        position: absolute;
        width: 7.5vw;
        height: 2.19vw;
        text-align: center;
        line-height: 2.19vw;
        box-sizing: border-box !important;
        color: white;
        font-size: 1vw;
    }
    .container .right_box{
        left: 7.5vw;
    }
    .flex_box1, .flex_box, .flex_box2{
        position: absolute;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-content: center;
        left: 78vw;
        z-index: 99;
    }
    .flex_box1 {
        width: 5vw;
        height: 12vh !important;
        top: 21vh;
        font-size: 2vw;
        color: #fff;
        align-items: flex-start;
    }
    .flex_box1 div p{
        display: inline-block;
        font-style: normal;
        font-size: 1.5vw;
    }
    .flex_box {
        width: 15vw;
        height: 11vh !important;
        top: 22vh;
        left: 81vw;
    }
    .flex_box2 {
        width: 200px;
        flex-direction: row;
        top: 37vh;
    }
    .flex_box2 .btn2, .flex_box2 .btn3 {
        width: 88px;
        height: 42px;
        border-radius: 21px;
        background-color: #EBEBEB;
        font-size: 16px;
        color: #525252;
    }
    .active{
        background-color: #0291FF !important;
        color: #FFFFFF !important;
    }
    @media (max-height: 810px) and (min-height: 800px) {
        .img1{
            width: 17vw;
        }
        .container, .gridImg{
            top: 46vh;
        }
    }
    @media (max-height: 770px) and (min-height: 750px) {
        .img1{
            width: 19vw;
            top: 15vh;
        }
        .flex_box2{
            transform: scale(0.8);
            top: 45vh;
            left: 76vw;
        }
        .flex_box1{
            top: 25.5vh;
            height: 15vh!important;
        }
        .flex_box{
            top: 26vh;
            height: 15vh!important;
        }
        .container, .gridImg{
            top: 54vh;
        }
    }
    @media (max-height: 730px) and (min-height: 670px) {
        .img1{
            width: 19vw;
            top: 15vh;
        }
        .flex_box2{
            transform: scale(0.9);
            top: 45vh;
            left: 77.5vw;
        }
        .flex_box1{
            top: 28.5vh;
            height: 13vh!important;
        }
        .flex_box{
            top: 29vh;
            height: 13vh!important;
        }
        .container, .gridImg{
            top: 54vh;
        }
    }
    @media (max-height: 550px) and (min-height: 450px) {
        .flex_box2{
            transform: scale(0.7);
            top: 45vh;
            left: 74.5vw;
        }
        .flex_box1{
            top: 28.5vh;
            height: 15vh!important;
        }
        .flex_box{
            top: 29vh;
            height: 15vh!important;
        }
        .img1{
            width: 19vw;
            top: 15vh;
        }
        .container{
            top: 55vh;
            grid-template-columns: 9vw 9vw;
        }
        .container div{
            width: 9vw;
        }
        .container .right_box{
            left: 9vw;
        }
        .gridImg{
            top: 55vh;
            width: 18vw;
        }
    }
    @media (max-height: 400px) {
        .flex_box2{
            transform: scale(0.5);
            top: 55vh;
            left: 68.5vw;
        }
        .flex_box1{
            top: 36.5vh;
            height: 20vh!important;
            left: 76vw;
        }
        .flex_box{
            top: 37vh;
            height: 20vh!important;
        }
        .img1{
            width: 17vw;
            top: 19vh;
            left: 76vw;
        }
        .container{
            top: 66vh;
            left: 76vw;
        }
        .container div{
            width: 11.5vw;
        }
        .container .right_box{
            left: 11.5vw;
        }
        .btn1{
            transform: scale(0.7);
            top: 62px;
            left: 12px;
        }
        .gridImg{
            top: 66vh;
            left: 75.7vw;
            width: 23vw;
        }
    }
</style>
