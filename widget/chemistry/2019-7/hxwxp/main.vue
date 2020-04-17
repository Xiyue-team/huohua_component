<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div class="bgBox" :style="{'background-image': 'url(\'' +bg +'\')'}"></div>
                <div class="tip_text" v-show="active1">{{text[20]}}</div>
                <div class="imgBox" v-show="!active">
                    <button v-for="(item,index) in src1" @click="getChange(index+1)" >
                        <img :src="item" alt />
                    </button>
                </div>
                <div class="main" v-show="active">
                    <!--轮播图页面区域-->
                    <div class="swiper-container" id="swiper-container">
                        <div class="swiper-wrapper" id="swiper-wrapper">
                            <div class="swiper-slide" id="swiper-slide">
                                <img :src="one" alt style="width: 100%;height: auto" />
                                <div class="textTip">{{textTip}}</div>
                                <div class="cancelBox" @click="cancelEvt()"><img src="./sub_static/UI/cancel.png"></div>
                            </div>
                            <div class="swiper-slide" id="swiper-slide1">
                                <img :src="two" alt style="width: 100%;height: auto" />
                                <div class="textTip">{{textTip1}}</div>
                                <div class="cancelBox" @click="cancelEvt()"><img src="./sub_static/UI/cancel.png"></div>
                            </div>
                        </div>
                        <!-- Optional controls 轮播控件-->
                        <div class="swiper-pagination"></div>
                    </div>
                    <!--左右的切图按钮-->
                    <div class="swiper-button-prev btn_left" id="swiper-button-prev" slot="button-prev">
                        <img src="./sub_static/UI/b1.png" style="width: 100%;height: 100%" />
                    </div>
                    <div class="swiper-button-next btn_right" id="swiper-button-next" slot="button-next">
                        <img src="./sub_static/UI/b2.png" style="width: 100%;height: 100%" />
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
    import './sub_static/swiper.css';
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
        color: #ffffff;
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
    }
    .tip_text{
        line-height: 24px;
        position: absolute;
        font-size: 24px;
        color: white;
        text-align: center;
        left: 50%;
        top: 8%;
        transform: translateX(-50%);
    }
    .bgBox {
        width: 100%;
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
    }
    .imgBox {
        width: 83vw;
        height: 33.2vw;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .imgBox > button {
        background: 0;
        cursor: pointer;
    }
    .imgBox > button > img {
        width: 14vw;
        height: auto;
    }

    .main {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    .swiper-container {
        margin: auto;
        width: 70%;
        height: 100%;
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
        position: relative;
    }
    .swiper-wrapper {
        width: 100%;
        height: auto;
        margin: auto;
    }
    .swiper-slide {
        width: 100% !important;
        margin: auto;
        align-items: center !important;
    }
    .swiper-container .swiper-pagination {
        margin-bottom: 4% !important;
    }
    .swiper-pagination >>> .swiper-pagination-bullet {
        background: #fff !important;
        opacity: 1 !important;
        outline: 0 none !important;
        margin-right: 10px;
        blr: expression(this.onFocus=this.blur());
    }
    .swiper-pagination >>> .swiper-pagination-bullet-active {
        opacity: 1 !important;
        background: #007aff !important;
        width: 8px;
        height: 8px;
        display: inline-block;
        border-radius: 8px;
        outline: 0 none !important;
        blr: expression(this.onFocus=this.blur());
    }
    .swiper-button-next {
        border: none;
        display: none;
        outline: 0 none !important;
        blr: expression(this.onFocus=this.blur());
    }
    .swiper-button-prev {
        border: none;
        display: none;
        outline: 0 none !important;
        blr: expression(this.onFocus=this.blur());
    }
    .btn_left, .btn_right {
        background-image: none;
        display: block;
        border: none;
        width: 3vw;
        height: 3vw;
        position: absolute;
        top: 50% !important;
        transform: translateY(-50%) !important;
    }
    .btn_left {
        left: 8%;
        z-index: 999;
    }
    .btn_right {
        right: 8%;
        z-index: 2000;
    }
    .textTip {
        height: 3vw;
        position: absolute;
        right: 2vw;
        bottom: 2.5vw;
        font-size: 3vw;
        color: #FFFFFF;
        line-height: 3vw;
        text-shadow: 0 2px 4px rgba(0,0,0,0.60);
        z-index: 1000;
    }
    .textTip_eight {
        left: 2vw;
    }
    .cancelBox {
        display: block;
        width: 44px;
        height: 44px;
        background-color: darkgrey;
        border-radius: 44px;
        position: absolute;
        right: 2vw;
        top: 2vw;
        z-index: 1000!important;
        cursor: pointer;;
    }
    .cancelBox img {
        z-index: 1000;
        width: 100%;
        height: auto;
    }
    @media (max-width: 2050px) and (min-width: 2045px) {
        .tip_text{
            top: 15%;
        }
    }
    @media (max-width: 1920px) and (min-height: 1080px) {
        .tip_text{
            top: 15%;
        }
    }
    @media (max-width: 1920px) and (min-height: 1080px) {
        .tip_text{
            top: 15%;
        }
    }
    @media (max-height: 915px) and (min-height: 910px) {
        .swiper-container .swiper-pagination{
            bottom: 0;
            margin-bottom: 3% !important;
        }
    }
    @media (max-width: 1025px) and (min-width: 1020px) {
        .tip_text{
            top: 18%;
        }
    }
    @media (max-width: 731px) and (min-width: 729px) {
        .swiper-container .swiper-pagination{
            bottom: 0;
            margin-bottom: 0 !important;
        }
    }

    @media (max-height: 400px) {
        .tip_text {
            font-size: 18px;
        }
        .swiper-container {
            width: 60%;
        }
        .swiper-pagination{
            bottom: 0;
        }
    }

</style>
