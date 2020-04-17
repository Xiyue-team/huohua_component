<template>
    <div class="aspectration bg_blue root_div_container" data-ratio="16:9">
        <div  class="control-panel_div_content fill_parent">
            <div class="title" v-text="title"></div>
            <div :class="[isMobile ? 'mcover' : 'cover']" :style="{width: isMobile ? '' : commonWidth + 'px', marginLeft: isMobile ? '' : -commonWidth / 2 + 'px'}">
                <div :class="[isMobile ? 'mrecord' : 'record']" :style="{width: isMobile ? '' : commonWidth + 'px'}">
                    <div :class="[isMobile ? 'mrecord-tit' : 'record-tit']">
                        <span v-html="record"></span>
                    </div>
                    <div :class="[isMobile ? 'mrecord-con' : 'record-con']">
                        <div v-for="(r, i) in records"
                            :key="i"
                            :style="{borderBottom: (records.length == 2 && i == 1) || (records.length > 2 && i == records.length - 1) ? 'none' : '2px solid #8eb7d3'}"
                            :class="[(sel[0] == i || sel[1] == i) ? 'cur' : '', isMobile ? 'mitem' : 'item']"
                            @click="choose(i)">
                            <div :class="[isMobile ? 'mitem-tit' : 'item-tit']">m = {{r.kg}}kg<br>h = {{r.height}}m</div>
                            <div :class="[isMobile ? 'mitem-con' : 'item-con']">
                                <img :class="[isMobile ? 'mbox' : 'box']" src="./sub_static/box.png" :style="{right: (20 - r.position) * (isMobile ? 12.5 : 25) + 'px'}">
                                <img :class="[isMobile ? 'mslide' : 'slide']" src="./sub_static/slide.png">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="arrow" v-show="tempRecords.length > 2" @click="showRecord">
                    <img v-if="show" src="./sub_static/up.png">
                    <img v-else src="./sub_static/down.png">
                </div>
            </div>
            <div id="2dContainer" :class="[isMobile ? 'mcontainer' : 'container']">
                <canvas id="canvas"></canvas>
            </div>
            <div :class="[isMobile ? 'mcontorl' : 'contorl']">
                <div :class="[isMobile ? 'mcontorl-kg' : 'contorl-kg']">
                    <span style="float: left;">{{qualityText}}：</span>
                    <div @click="showKg" :class="[isMobile ? 'mcontorl-kg-con' : 'contorl-kg-con']">
                        <div style="position: relative; z-index: 2; float: left">
                            {{kilogram}}
                        </div>
                        <img style="width: 12px; height: 7px; float: right; margin-top: 11.5px;" src="./sub_static/up.png">
                        <div v-show="kgShow" :class="[isMobile ? 'mcontorl-kg-list' : 'contorl-kg-list']">
                            <div v-for="(kg, index) in kilograms" :style="{background: kilogram === kg ? '#ccc' : '', borderRadius: index === 0 ? '10px 10px 0 0' : ''}" :key="kg" @click="chooseKg(kg)">{{kg}}</div>
                        </div>
                    </div>
                    <span style="float: left;">kg</span>
                </div>
                <div :class="[isMobile ? 'mcontorl-height' : 'contorl-height']">
                    <span style="float: left;">{{heightText}}：</span>
                    <div style="float: left; margin-right: 5px;">1</div>
                    <div style="float: left; position: relative;">
                        <div 
                            style="width: 30px; height: 30px; line-height: 30px; text-align: center; position: absolute; top: -15px; "
                            :style="{left: (isMobile ? 7.5 : 13) * (height - 1) + 'px'}">{{height}}</div>
                        <input :class="[isMobile ? 'minput' : 'input']" v-model="height" type="range" min="1" max="10" step="1" :disabled="rDis"/>
                    </div>
                    <div style="float: left; margin-left: 5px;">10 m</div>
                </div>
                <button :class="[isMobile ? 'mcontorl-reset' : 'contorl-reset', rDis ? 'gray' : '']" @click="resetStatus" :disabled="rDis" v-text="resetBtn"></button>
                <button :class="[isMobile ? 'mcontorl-start' : 'contorl-start', sDis ? 'gray' : '']" @click="start" :disabled="sDis" v-text="startBtn"></button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
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
<style scoped>
    .bg_blue {
        background-color: #adddff;
    }
    .title{
        font-size: 24px;
        color: #000;
        line-height: 40px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 20px;
        left: 24px;
    }
    .record {
        width: 940px;
        min-height: 220px;
        max-height: 440px;
        border-radius: 10px;
        background-color: #9fcceb;
        position: relative;
        overflow-y: auto;
        border: 1px solid #9FCCEB;
    }
    .record .record-tit {
        position: absolute;
        top: 0;
        left: 0;;
        width: 50px;
        height: 100%;
        background-color: #8eb7d3;
        box-sizing: border-box;
        border-right: 1px solid #9FCCEB;
        text-align: center;
        font-size: 16px;
        color: #333;
        font-weight: bold;
    }
    .record .record-tit span {
        width: 50px;
        line-height: 20px;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
    }
    .record .record-con {
        float: right;
        width: calc(100% - 50px);
        min-height: 220px;
        max-height: 440px;
        overflow-y: auto;
    }
    .cover {
        width: 940px;
        position: absolute;
        top: 60px;
        left: 50%;
        margin-left: -470px;
        z-index: 9;
    }
    .arrow {
        width: 40px;
        height: 20px;
        border-radius: 0 0 5px 5px;
        background-color: #9fcceb;
        position: absolute;
        bottom: -20px;
        left: 50%;
        margin-left: -20px;
        cursor: pointer;
    }
    .arrow > img {
        display: block;
        width: 12px;
        height: 7px;
        margin: 6.5px 14px;
    }
    .item {
        width: 100%;
        height: 110px;
        box-sizing: border-box;
        padding: 0 20px;
        cursor: pointer;
        position: relative;
    }
    .item.cur {
        background-color: #8eb7d3;
    }
    .item .item-tit {
        float: left;
        width: 130px;
        height: 110px;
        box-sizing: border-box;
        padding: 25px 0;
        line-height: 30px;
        font-size: 16px;
        color: #000;
        font-weight: bold;
    }
    .item .item-con {
        float: left;
        width: 720px;
        height: 110px;
        position: absolute;
        top: 0;
        left: calc(50% + 30px);
        margin-left: -360px;
    }
    .box {
        width: 80px;
        height: 70px;
        position: absolute;
        bottom: 27px;
        z-index: 9;
    }
    .slide {
        width: 720px;
        height: 40px;
        position: absolute;
        bottom: 10px;
        left: 0;
    }
    .container {
        width: 100%;
        height: calc(100% - 340px);
        position: absolute;
        top: 280px;
        left: 0;
    }
    .contorl {
        width: 940px;
        height: 60px;
        position: absolute;
        left: 50%;
        margin-left: -470px;
        bottom: 0;
    }
    .contorl .contorl-kg {
        float: left;
        color: #333;
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        margin-right: 20px;
    }
    .contorl-kg .contorl-kg-con {
        float: left;
        width: 60px;
        height: 30px;
        background-color: #fff;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 0 5px;
        line-height: 30px;
        margin: 15px 5px 0;
        position: relative;
        cursor: pointer;
        z-index: 2;
    }
    .contorl-kg .contorl-kg-list {
        width: 60px;
        padding-bottom: 10px;
        background-color: #fff;
        border-radius: 10px 10px 0 0;
        position: absolute;
        bottom: 20px;
        left: 0;
        z-index: 1;
    }
    .contorl-kg .contorl-kg-list > div {
        height: 30px;
        padding: 0 5px;
        line-height: 30px;
    }
    .contorl .contorl-height {
        float: left;
        color: #333;
        height: 60px;
        line-height: 60px;
        font-size: 16px;
    }
    .contorl .contorl-start {
        float: right;
        border-radius: 20px;
        width: 100px;
        height: 40px;
        line-height: 40px;
        margin-top: 10px;
        background-color: #fff;
        padding: 0;
        box-sizing: border-box;
        font-size: 14px;
        text-align: center;
    }
    .contorl .contorl-reset {
        float: right;
        border-radius: 20px;
        margin-left: 50px;
        width: 100px;
        height: 40px;
        line-height: 40px;
        margin-top: 10px;
        background-color: #fff;
        padding: 0;
        box-sizing: border-box;
        font-size: 14px;
        text-align: center;
    }
    .mcover {
        width: 560px;
        position: absolute;
        top: 60px;
        left: 50%;
        margin-left: -280px;
        z-index: 9;
    }
    .mrecord {
        width: 560px;
        min-height: 100px;
        max-height: 200px;
        border-radius: 10px;
        background-color: #9fcceb;
        position: relative;
        overflow-y: auto;
        border: 1px solid #9FCCEB;
    }
    .mrecord .mrecord-tit {
        position: absolute;
        top: 0;
        left: 0;;
        width: 50px;
        height: 100%;
        background-color: #8eb7d3;
        box-sizing: border-box;
        border-right: 1px solid #9FCCEB;
        text-align: center;
        font-size: 16px;
        color: #333;
        font-weight: bold;
    }
    .mrecord .mrecord-tit span {
        width: 50px;
        line-height: 20px;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
    }
    .mrecord .mrecord-con {
        float: right;
        width: 510px;
        min-height: 100px;
        max-height: 200px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .mitem {
        width: 510px;
        height: 50px;
        box-sizing: border-box;
        padding: 0 10px;
        cursor: pointer;
    }
    .mitem.cur {
        background-color: #8eb7d3;
    }
    .mitem .mitem-tit {
        float: left;
        width: 100px;
        height: 50px;
        box-sizing: border-box;
        padding: 5px 0;
        line-height: 20px;
        font-size: 16px;
        color: #000;
        font-weight: bold;
    }
    .mitem .mitem-con {
        float: left;
        width: 390px;
        height: 50px;
        position: relative;
    }
    .mbox {
        width: 40px;
        height: 35px;
        position: absolute;
        bottom: 13.5px;
        z-index: 9;
    }
    .mslide {
        width: 360px;
        height: 20px;
        position: absolute;
        bottom: 5px;
        right: 0;
    }
    .mcontainer {
        width: 100%;
        height: calc(100% - 200px);
        position: absolute;
        top: 160px;
        left: 0;
    }
    .mcontorl {
        width: 560px;
        height: 40px;
        position: absolute;
        left: 50%;
        margin-left: -280px;
        bottom: 0;
    }
    .mcontorl .mcontorl-kg {
        float: left;
        color: #333;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        margin-right: 20px;
    }
    .mcontorl-kg .mcontorl-kg-con {
        float: left;
        width: 60px;
        height: 30px;
        background-color: #fff;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 0 5px;
        line-height: 30px;
        margin: 5px 5px 0;
        position: relative;
        cursor: pointer;
        z-index: 2;
    }
    .mcontorl-kg .mcontorl-kg-list {
        width: 60px;
        padding-bottom: 10px;
        background-color: #fff;
        border-radius: 10px 10px 0 0;
        position: absolute;
        bottom: 20px;
        left: 0;
        z-index: 1;
    }
    .mcontorl-kg .mcontorl-kg-list > div {
        height: 30px;
        padding: 0 5px;
        line-height: 30px;
    }
    .mcontorl .mcontorl-height {
        float: left;
        color: #333;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
    }
    .mcontorl .mcontorl-start {
        float: right;
        border-radius: 20px;
        width: 80px;
        height: 30px;
        line-height: 30px;
        margin-top: 5px;
        background-color: #fff;
        padding: 0;
        box-sizing: border-box;
        font-size: 16px;
        text-align: center;
    }
    .mcontorl .mcontorl-reset {
        float: right;
        border-radius: 20px;
        margin-left: 10px;
        width: 80px;
        height: 30px;
        line-height: 30px;
        margin-top: 5px;
        background-color: #fff;
        padding: 0;
        box-sizing: border-box;
        font-size: 16px;
        text-align: center;
    }
    .input {
        margin: 28px 0 0 0;
    }
    .minput {
        width: 100px!important;
        margin: 19px 0 0 0;
    }
    input[type=range] {
        float: left;
        width: 150px;
        outline: none;
        -webkit-appearance: none;
        /* 去除系统默认appearance的样式,常用于IOS下移除原生样式 */
        border-radius: 10px;
    }
    input[type=range]::-webkit-slider-runnable-track {
        height: 4px;
        border-radius: 2px;
        background-color: #ccc;
    }
    input[type=range]::-ms-track {
        height: 4px;
        border-radius: 2px;
        background-color: #ccc;
    }
    input[type=range]::-moz-range-track {
        height: 4px;
        border-radius: 2px;
        background-color: #ccc;
    }
    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none; /* 去除滑块的默认样式 */
        height: 10px;
        width: 10px;
        margin-top: -13px;
        background: #7B05E0;
        border-radius: 50%;
        background-color: #0199FF;
        border: 10px solid #fff;
        box-sizing: content-box;
        cursor: pointer;
    }
    input[type=range]::-moz-range-thumb {
        -webkit-appearance: none; /* 去除滑块的默认样式 */
        height: 10px;
        width: 10px;
        margin-top: -13px;
        background: #7B05E0;
        border-radius: 50%;
        background-color: #0199FF;
        border: 10px solid #fff;
        box-sizing: content-box;
        cursor: pointer;
    }
    input[type=range]::-ms-thumb {
        -webkit-appearance: none; /* 去除滑块的默认样式 */
        height: 10px;
        width: 10px;
        margin-top: -13px;
        background: #7B05E0;
        border-radius: 50%;
        background-color: #0199FF;
        border: 10px solid #fff;
        box-sizing: content-box;
        cursor: pointer;
    }
    .gray {
        color: #ccc!important;
    }
    button:hover {
        cursor: pointer;
    }
    button:active {
        background: #5caefd!important;
        color: #fff;
    }
</style>
