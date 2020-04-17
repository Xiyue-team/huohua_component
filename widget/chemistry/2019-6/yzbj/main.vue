<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title">{{title}}</div>
                <div class="sliderBox">
                    <div class="textTip" v-show="active1">{{text[0]}}</div>
                    <div class="textTip" v-show="active2">{{text[1]}}</div>
                    <vue-slider class="vueSlider" v-show="active1"
                                    v-model="value1"
                                    v-bind="sliderOption1">
                    </vue-slider>
                    <vue-slider class="vueSlider" v-show="active2"
                                v-model="value2"
                                v-bind="sliderOption2">
                    </vue-slider>
                </div>
                <img class="picture" v-show="show" src="./sub_static/tip.png">
                <div class="buttonBox">
                    <button :class="{active: active1}" @click="getEvent(1)">{{buttonTitle[0]}}</button>
                    <button :class="{active: active2}" @click="getEvent(2)">{{buttonTitle[1]}}</button>
                </div>
                <div id="bar" v-show="active2">
                    <div id="wait">
                        <div id="progress" v-bind:style="{width: width}"></div>
                    </div>
                    <h5>{{text[2]}}</h5>
                </div>
                <div class="reset" id="reset" @click="getEvent(3)">
                    <img src="./sub_static/chongzhi.png">
                </div>
                <div id="3dContainer" class="Container">

                </div>
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
    import vueSlider from 'vue-slider-component/dist-css/vue-slider-component.common.js';
    import 'vue-slider-component/dist-css/vue-slider-component.css';
    import 'vue-slider-component/theme/default.css';
    import slider from '../../../../src/component/ui/vue2-slider.vue';
    import {MainVueComponent} from './mainVueComponent';
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
    }

    #title {
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
    .picture{
        position: absolute;
        width: 45vw;
        height: auto;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .vueSlider{
        position: absolute;

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
        color: #333333;
        line-height: 16px;
    }
    .reset{
        width: 48px;
        height: 40px;
        position: absolute;
        top: 20px;
        right: 24px;
        z-index: 9;
        background: #FFFFFF;
        border: 0 solid rgba(0,0,0,0.06);
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08);
        border-radius: 6px;
    }
    .reset img{
        width: 24px;
        margin-top: 8px;
        margin-left: 12px;
    }
    #bar {
        position: absolute;
        left: 50%;
        bottom: 10%;
        z-index: 99;
        width: 300px;
        text-align: center;
        transform: translateX(-50%);
        font-size: 18px;
    }

    #wait {
        height: 10px;
        background-color: #ddd;
        border-radius:25px;
        margin-bottom: 10px;
    }
    #progress {
        background-color: red;
        height: 10px;
        border-radius:25px;
    }

    .active {
        color: #fff;
        background-color: #5CAEFD;
    }
    .sliderBox{
        position: absolute;
        width: 300px;
        height: 50px !important;
        right: 24px;
        bottom: 25vh;
        z-index: 99;
    }
    .sliderBox .textTip{
        width: 100px;
        position: absolute;
        left: 0;
        font-size: 18px;
        top: 0;
        bottom: 0;
        margin: auto;
        line-height: 50px;
    }
    .sliderBox .vueSlider{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
    @media (max-height: 810px) and (min-height: 600px){
        #bar {
            bottom: 7%;
            transform: translateX(-50%) scale(0.8);
        }
        .sliderBox{
            width: 270px;
        }
    }
    @media (max-height: 600px) and (min-height: 460px){
        #bar {
            bottom: 7%;
            transform: translateX(-50%) scale(0.6);
        }
        .sliderBox{
            width: 200px;
            right: 36px;
        }
        .sliderBox .textTip{
            font-size: 16px;
        }
        .buttonBox {
            transform: scale(0.8);
        }
    }
    @media (max-height: 460px) and (min-height: 450px){
        #bar {
            bottom: 7%;
            transform: translateX(-50%) scale(0.6);
        }
        .sliderBox{
            width: 210px;
        }
        .sliderBox .textTip{
            font-size: 16px;
        }
        .buttonBox {
            transform: scale(0.6);
            right: 0;
            bottom: 3vh;
        }
    }
    @media (max-height: 450px) {
        .buttonBox {
            transform: scale(0.5);
            right: -8px;
            bottom: 3vh;
        }
        .sliderBox{
            width: 170px;
        }
        .sliderBox .textTip{
            font-size: 12px;
        }
        #bar {
            bottom: 7%;
            transform: translateX(-50%) scale(0.5);
        }
    }
</style>
