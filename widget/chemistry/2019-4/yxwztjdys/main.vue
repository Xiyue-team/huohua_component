<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div id= "flex_box" class="flex_box">
                    <div class="btn" id="btn1" @click="getEvent(1)" >
                        <button :class="{active: active1}">{{buttonTitle[0]}}</button></div>
                    <div class="btn" id="btn2" @click="getEvent(2)" >
                        <button :class="{active: active2}">{{buttonTitle[1]}}</button></div>
                    <div class="btn" id="btn3" @click="getEvent(3)" >
                        <button :class="{active: active3}">{{buttonTitle[2]}}</button></div>
                </div>
                <div  id= "flex_box1" class="flex_box1">
                    <span>{{text[0]}}</span>
                    <span>{{text[1]}}</span>
                    <span>{{text[2]}}</span>
                </div>
                <div class="flex_box2">
                    <vue-slider class="vueSlider"
                                v-model="value1"
                                v-bind="sliderOption1"></vue-slider>
                    <vue-slider class="vueSlider"
                                v-model="value2"
                                v-bind="sliderOption2"></vue-slider>
                    <vue-slider class="vueSlider"
                                v-model="value3"
                                v-bind="sliderOption3"></vue-slider>
                </div>
                <div class="tipText">{{text[3]}}</div>
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
    import slider from '../../../../src/component/ui/vue2-slider.vue';
    import vueSlider from 'vue-slider-component/dist-css/vue-slider-component.common.js';
    import 'vue-slider-component/dist-css/vue-slider-component.css';
    import 'vue-slider-component/theme/default.css';
    @Component({
        components: {
            fullScreensLayout, slider, vueSlider
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

    .flex_box, .flex_box1, .flex_box2 {
        position: absolute;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
        align-content: center;
    }

    .flex_box {
        width: 10vw;
        height: 20vh !important;
        right: 18vw;
        top: 22vh;
        font-weight: 500;
    }

    .flex_box1 {
        width: 9vw;
        height: 20vh !important;
        right: 28vw;
        bottom: 20vh;
        font-size: 1vw;
        font-weight: 700;
        color: #fff;
        align-items: flex-start;
    }

    .flex_box2 {
        width: 15vw;
        height: 20vh !important;
        right: 15.3vw;
        bottom: 20vh;
    }

    .btn {
        width: 72px;
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
    .tipText {
        color: white;
        font-size: 1vw;
        position: absolute;
        bottom: 5vh;
        left: 82px;
    }
    @media (max-height: 780px) and (min-height: 680px){
        .flex_box1 {
            height: 19vh !important;
            right: 33vw;
            bottom: 20.5vh;
        }
    }
    @media (max-height: 450px) {
        .flex_box1 {
            width: 13vw;
            height: 18vh !important;
            bottom: 21vh;
            right: 31vw;
        }
        .btn {
            transform: scale(0.5);
        }
    }

    @media (max-height: 350px) {
        .flex_box {
            height: 25vh !important;
            top: 18vh;
        }
    }

</style>
