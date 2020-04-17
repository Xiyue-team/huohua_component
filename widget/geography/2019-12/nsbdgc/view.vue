<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">{{title}}</div>
                <button id="btnCloseSwiper" class="button swiper_close_button" @click="handleCloseSwiper">X</button>
                <div id="2dContainer" class="container">
                    <canvas id="canvas"></canvas>
                </div>
                <div id="lineDescription" class="line_description" :class="{'line_description_m': isMobile}">
                </div>
                <div class="line_btn_outer">
                    <div class="line_btn_inner">
                        <button class="btn" :class="{'btn_mobile': isMobile, 'btn_active': lineType === 'east'}" @click="handleLineButton('east')">{{eastLineButtonText}}</button>
                        <button class="btn" :class="{'btn_mobile': isMobile, 'btn_active': lineType === 'center'}" @click="handleLineButton('center')">{{centerLineButtonText}}</button>
                        <button class="btn" :class="{'btn_mobile': isMobile, 'btn_active': lineType === 'west'}" @click="handleLineButton('west')">{{westLineButtonText}}</button>
                    </div>
                </div>
            </template>
        </fullScreensLayout>
        <div class="swiper-container" id="swiper">
            <div class="swiper-wrapper" id="swiper-wrapper">
            </div>
            <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
            <div class="swiper-button-prev-custom"><i class="left-arrow"></i></div>
            <div class="swiper-button-next-custom"><i class="right-arrow"></i></div>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import '../../../../src/assets/css/core.css';
  import '../../../../src/assets/css/layout.css';
  import '../../../../src/assets/css/ui.css';
  import 'swiper/dist/css/swiper.min.css';
  import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
  import Component from 'vue-class-component';
  import { ViewModel } from './ViewModel';

  @Component({
    components: {
        fullScreensLayout
    },
    mixins: [ViewModel]
  })
  export default class App extends Vue {}
</script>

<style scoped="scoped">
    .title_text{
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
        font-size: 28px;
        color: #000000;
        line-height: 28px;
        z-index: 1;
    }
    .swiper_close_button {
        position: absolute;
        top: 20px;
        right: 24px;
        width: 48px;
        color: #7b7b7b;
        height: 40px;
        font-size: 28px;
        z-index: 13;
        display: none;
    }

    .container {
        height: 100%;
    }
    .line_btn_outer{
        position:fixed;
        width: 80px;
        height: 160px;
        top: 50%;
        margin-top: -80px;
        right: 24px;
    }
    .line_btn_inner{
        position: absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        height:160px;
        margin:auto;
    }
    .line_btn_inner > button{
        margin-bottom: 20px;
    }
    .line_btn_inner > button:last-child{
        margin-bottom: 0px;
    }
    .line_description {
        position: absolute;
        background: #FFFFFF;
        border: 1px solid rgba(0,0,0,0.06);
        box-shadow: 0 6px 14px 0 rgba(0,0,0,0.06);
        border-radius: 9px;
        width: 216px;
        padding: 20px;
        left: 24px;
        top: 80px;
        color: #333333;
        font-size: 20px;
        display: none;
    }

    .line_description_m {
        border-radius: 5px;
        width: 150px;
        padding: 10px;
        left: 24px;
        top: 65px;
        font-size: 14px;
    }
    .btn {
        text-align: center;
        min-width: 80px;
        cursor:pointer;
        z-index: 99;
        box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
        border-radius: 21px;
        background: #FFFFFF;
        border: 0 solid rgba(0,0,0,0.06);
        box-shadow: 0 1px 3px rgba(0,0,0,0.12);
        padding: 12px 16px;
        font-size: 16px;
        color: #000000;
        line-height: 16px;
    }
    
    .btn_active {
        background: #5CAEFD;
        color: #FFFFFF;
    }

    .btn_mobile {
        right: 30px;
    }
    .swiper-container{
        background: #FFFFFF;
        display: none;
        width: 100%;
        height: 100%;
        z-index: 12;
        --swiper-theme-color: #ff6600;
        --swiper-pagination-color: #00ff33;/* 两种都可以 */
    }
    .swiper-slide {
        /* text-align: center; */
        font-size: 18px;
        background: #FFFFFF;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
    i {
        border: solid #ffffff;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 7px;
        margin: 15px;
    }
    .right-arrow {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        margin: 15px 12px 15px 5px;
    }

    .left-arrow {
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        margin: 15px 5px 15px 12px;
    }
</style>
<style>
    .control-panel_div_floatRight {
        height: auto !important;
    }
    .swiper-pagination-bullet-custom {
        width: 16px;
        height: 16px;
        background: #ffffff;
    }
    .swiper-pagination-bullet-custom .swiper-pagination-bullet-active {
        color: #fff;
        background: #007aff;
    }

    .swiper-desc {
        position: absolute; 
        padding: 24px;
        background: rgba(0, 0, 0, 0.6);
        color: #ffffff;
        width: 420px; 
    }

    .swiper-desc-m {
        position: absolute; 
        padding: 12px;
        width: 260px; 
    }

    .swiper-desc-title {
        font-size: 24px;
        padding-bottom: 15px;
    }

    .swiper-desc-content {
        font-size: 20px;
    }

    .swiper-desc-title-m {
        font-size: 12px;
        padding-bottom: 10px;
    }
    .swiper-desc-content-m {
        font-size: 10px;
    }
    .swiper-button-next-custom, .swiper-button-prev-custom {
        text-align: center;
        position: absolute;
        top: 50%;
        width: 48px;
        height: 48px;
        margin-top: -24px;
        z-index: 10;
        cursor: pointer;
        border-radius: 24px;
        background: rgba(0, 0, 0, 0.75);
        -webkit-tap-highlight-color:rgba(0,0,0,0); 
    }
    div:focus{
	    outline:none;
    }
    .swiper-button-next-custom {
        right: 20px;
    }
    .swiper-button-prev-custom {
        left: 20px;
    }
    .swiper-button-disabled {
        background: #a2a2a2 !important;
        opacity: 0.6 !important;;
    }
</style>
