<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span class="title_style" :style="{zoom: zoom1}">氧化还原反应与四种基本反应类型</span>
                <div class="button_box" :style="{zoom: zoom1}">
                        <div class="pad_box"
                             v-for="(item, index) in buttonBox"
                             :key="index">
                            <button class="an_niu"
                                :id="'index' + index"
                                v-text="item"
                                ondragstart="return false"
                        ></button>
                        </div>
                </div>
                <button class= "buttonText" id = "buttonText1" v-text="yellowText"></button>
                <button class= "buttonText" id = "buttonText2" v-text="pinkText"></button>
                <button class= "buttonText" id = "buttonText3" v-text="buleText"></button>
                <button class= "buttonText" id = "buttonText4" v-text="violetText"></button>
                <img :src="isOpinion1" id="yellowImg" v-show="isOpinion1">
                <img :src="isOpinion2" id="pinkImg" v-show="isOpinion2">
                <img :src="isOpinion3" id="buleImg" v-show="isOpinion3">
                <img :src="isOpinion4" id="violetImg" v-show="isOpinion4">
                <div id="3dContainer" class="Container"></div>
            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import Component from 'vue-class-component';
    import {MainVueComponent} from './mainVueComponent';
    @Component({
        components: {
            fullScreensLayout,
        },

        mixins: [MainVueComponent]
    })
    export default class App extends Vue {
    }
</script>

<style>
    .control_div_resetBtn>img{
        height: 24px!important;
    }
    body {
        overflow: hidden!important;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .title_style {
        width: 420px;
        height: 28px;
        font-size: 24px;
        color: #ffffff;
        line-height: 28px;
        position: absolute;
        left: 24px;
        top: 24px;
    }

    .Container {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
    }
    .button_box{
        width: 112px;
        height: 240px;
        position: absolute;
        top: 35%;
        right: 2.3%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        align-content: center;
    }
    .pad_box{
        width: 112px;
        height: 42px;
        display: flex;
        justify-content:center;
    }
    .an_niu{
        width: 100%;
        background: #FFFFFF;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        line-height: 16px;
        color: #fff; 
        background-color: #29beff;
        text-align: center;
        align-items: center;
        border-radius: 24px;
        z-index: 1000;
    }
    .buttonText{
        width: 300px;
        height: 105px;
        position: absolute;
        font-family: SourceHanSerifSC-Bold;
        font-size: 3vh;
        color: #FFFFFF;
        background-color:rgba(255, 255, 255, 0);
        opacity: 1;
        pointer-events: none;
        z-index: 10;
    }
    img{
        width: 64px;
        height: 64px;
        position: absolute;
    }
    .resetBox{
        width: 48px;
        height: 40px;
        position: absolute;
        top: 20px;
        right: 24px;
        background: #FFFFFF;
        border: 0 solid rgba(0,0,0,0.06);
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08);
        border-radius: 6px;
        cursor: pointer;
        z-index: 1000;
    }
    .resetBox>img{
        width: 24px;
        height: 24px;
        margin-top: 8px;
        margin-left: 12px;
    }
    @media (max-width: 1000px) {
        .control_div_resetBtn{
        top: 5px!important;
        right: 5px!important;
    }
        .control_div_resetBtn>img{
        height: 24px!important;
    }
        .resetBox{
            top: 4px;
            right: 4px;
            transform: scale(0.8);
    }
    }
</style>
