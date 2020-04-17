<template>
    <div class="aspectration bg_white covered root_div_container ">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="3dContainer"></div>
                <div style="width: 100%; height: 100%;display: flex; justify-content: center;align-items: center">
                    <div class="mainContainer">
                        <div class="map"></div>
                        <div class="blueButton" style="left: 641px;top: 462px;"@click="hunan()"></div>
                        <div class="blueButton" style="left: 698px;top: 532px;"@click="guangdong()"></div>
                        <div class="blueButton" style="left: 739px; top: 403px;"@click="anhui()"></div>
                        <div class="blueButton" style="left: 747px; top: 488px;"@click="fujian()"></div>
                        <div class="blueButton" style="left: 705px; top: 255px;"@click="beijing()"></div>
                        <div class="blueButton" style="left: 619px; top: 317px;"@click="shanxi()"></div>
                    </div>
                </div>

                <div class="title_text">{{title}}</div>
                <div class="wardOff" v-show="buttonValue !== 0" @click="wardOff()"></div>
                <transition name="fade">
                <div class="swiperContainer" v-show="buttonValue !== 0">
                    <div class="swiper" v-show="buttonValue !== 0">
                        <div class="image_changes">
                            <div class="swiper-container" id="swiper-container">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide">
                                        <img :src="imageArray[0]" style="width: 100%; height: 100%" ondragstart="return false"/>
                                        <div class="flower_title_one">
                                            <span>{{text[0]}}</span>
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img :src="imageArray[1]" style="width: 100%; height: 100%" ondragstart="return false"/>
                                        <div class="flower_title_one">
                                            <span>{{text[1]}}</span>
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img :src="imageArray[2]" style="width: 100%; height: 100%" ondragstart="return false"/>
                                        <div class="flower_title_one">
                                            <span>{{text[2]}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-button-prev btn_left" id="swiper-button-prev" slot="button-prev">
                                <img src="./sub_static/next.png" style="width: 100%;height: 100%" ondragstart="return false">
                            </div>
                            <div class="swiper-button-next  btn_right" id="swiper-button-next" slot="button-next">
                                <img src="./sub_static/next.png" style="width: 100%;height: 100%" ondragstart="return false">
                            </div>
                        </div>
                    </div>
                    <div class="province">
                        <img src="./sub_static/guangdong/guangdong.png" style="width: 230px;height: 200px;" ondragstart="return false" v-show="buttonValue === 6">
                        <img src="./sub_static/anhui/anhui.png" style="width: 210px;height: 260px;" ondragstart="return false" v-show="buttonValue === 3">
                        <img src="./sub_static/fujian/fujian.png" style="width: 210px;height: 260px;" alt="" ondragstart="return false" v-show="buttonValue === 5">
                        <img src="./sub_static/hunan/hunan.png" alt="" style="width: 210px;height: 230px;" ondragstart="return false" v-show="buttonValue === 4">
                        <img src="./sub_static/beijing/beijing.png" alt="" style="width: 210px;height: 220px;" ondragstart="return false" v-show="buttonValue === 1">
                        <img src="./sub_static/shanxi/shanxi.png" alt="" style="width: 180px;height: 310px;" ondragstart="return false" v-show="buttonValue === 2">
                    </div>
                </div>
                </transition>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">

            </template>
        </fullScreensLayout>

    </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import '../../../../src/assets/css/core.css';
  import '../../../../src/assets/css/layout.css';
  import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
  import { ViewModel } from './ViewModel';
  import Component from 'vue-class-component';
  require('swiper/dist/css/swiper.css');

  @Component({
    components: {
      fullScreensLayout
    },
    mixins: [ViewModel]
  })
  export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_text{
        font-size: 24px;
        color: #5D6268;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }

    .mainContainer {
        width: 1200px;
        height: 675px;
        position: relative;
    }

    .map{
        width: 1200px;
        height: 675px;
        background: url('./sub_static/map.png') no-repeat;
        background-size: 100% 100%;
    }

    .blueButton{
        width: 26px;
        height: 26px;
        background: url('./sub_static/button.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
    }

    .blueButton:hover{
        cursor: pointer;
    }

    .swiperContainer{
        width: 1200px;
        height: 675px;
        position: absolute;
        left: calc(50% - 600px);
        top: calc(50% - 337.5px);
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events:none;
    }

    .province {
        pointer-events:auto;
    }

    .swiper {
        width: 825px;
        height: 566px;
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        margin-right: 51px;
        box-shadow: 0 2px 8px 0 rgba(0,0,0,0.43);
        border-radius: 6px;
        border-radius: 10px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        pointer-events:auto;

    }

    .wardOff {
        width: 100%;
        height: 100%;
        background: rgba(50,51,47,0.57);
        position: absolute;
        top: 0;
        left: 0;
    }

    .image_changes {
        width: 777px;
        height: 518px;
    }

    .swiper-container {
        width: 777px;
        height: 518px;
    }

    .swiper-wrapper {
        width: 777px;
        height: 518px;
    }

    .swiper-pagination {
        width: 100%;
        margin-top: 25px;
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
        width: 30px;
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
        margin-top: auto !important;
    }

    .swiper-button-prev {
        border: none;
        display: none;
        outline: 0 none !important;
        blr: expression(this.onFocus=this.blur());
        margin-top: auto !important;
    }

    .btn_left {
        position: absolute;
        background-image: none;
        display: block;
        border: none;
        width: 48px;
        height: 48px;
        left: 38px;
        top: calc(50% - 24px);
        transform: rotate(180deg);
    }

    .btn_right {
        background-image: none;
        display: block;
        border: none;
        width: 48px;
        height: 48px;
        position: absolute;
        right: 38px;
        top: calc(50% - 24px);
    }

    .flower_title_one {
        position: absolute;
        width: 777px;
        height: 104px;
        background: rgba(0,0,0,0.45);
        bottom: 0;
        font-size: 22px;
        color: #FFFFFF;
        letter-spacing: 0;
        line-height: 26px;
        padding: 14px 14px;
        box-sizing: border-box;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
<style>

</style>
