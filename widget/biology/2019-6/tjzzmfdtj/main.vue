<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span class="title_style" :style="{zoom: zoom1}">{{title}}</span>
            <div id="3dContainer" class="Container"></div>
            <!-- <div class="shiTem" :style="{'background-image': 'url(\'' + backGround +'\')'} "></div> -->
            <div class="lowTem" :style="{'background-image': 'url(\'' + backGroundLow +'\')'} " v-show = 'isHaveLow'></div>
            <div class="hotTem" :style="{'background-image': 'url(\'' + backGroundHot +'\')'} " v-show = 'isHaveHot'></div>
            <div class="textReminder" v-text="textReminder"></div>
            <div :class="{changeBackGroundBlue: changeBackGroundBlue}" id="result" @click="showResult">结果</div>
            <div class="seedBox" id="seedBox">
                <img src="" id="gif_src">
                <img src="./sub_static/page.png" class="page">
            </div>
            <div id="waterGray" v-show="waterGray"></div>
            <div id="temGray" v-show="temGray"></div>
            <div id="textConter" v-text="textConter" v-show="textConter" :style="{zoom: zoom1}"></div>
            <div class="resetBox" @click="reset"><img src="./sub_static/chongzhi.png"></div>
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

<style scope>
    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    .resetBox{
        display: none;
    }
    .title_style {
        width: 420px;
        height: 28px;
        font-size: 24px;
        color: #000;
        line-height: 28px;
        position: absolute;
        left: 24px;
        top: 24px;
        z-index: 1000;
    }

    .Container {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 8;
    }
    .shiTem, .lowTem, .hotTem{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
    }
    .textReminder{
        width: 112px;
        height: 20px;
        position: absolute;
        left: 50%;
        bottom: 10%;
        transform: translateX(-50%);
        z-index: 8;
        font-family: SourceHanSansSC-Medium;
        font-size: 2vh;
        color: #000000;
        text-align: center
    }
    #result{
        font-family: SourceHanSansSC-Medium;
        position: absolute;
        font-size: 2vh;
        color: #000;
        background-color: #FFFFFF;
        border: 1px solid #EBEBEB;
        border-radius: 21px;
        text-align: center;
        cursor: pointer;
        z-index: 8;
    }
    .seedBox{
        position: absolute;
        z-index: 8;
        opacity: 0.5;
    }
    .seedBox>img{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 8;
    }
    .page{
        z-index: 0!important;
    }
    .changeBackGroundBlue{
        background-color: #0291FF!important;
        color: white!important;
    }
    #waterGray, #temGray{
        position: absolute;
        opacity: 0;
        background-color: #000;
        z-index: 8;
        border-radius: 2vh;
    }
    #textConter{
        width: 180px;
        height: 36px;
        position: absolute;
        top: 50%;
        left: 20%;
        transform: translate(-50%);
        font-family: SourceHanSansSC-Medium;
        font-size: 24px;
        color: #000;
        text-align: center;
        z-index: 8;
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
        z-index: 8;
    }
    .resetBox>img{
        width: 24px;
        margin-top: 8px;
        margin-left: 12px;
    }
    @media (max-width: 1000px) {
        .resetBox{
            top: 4px;
            right: 4px;
            transform: scale(0.8);
    }
    }
</style>

