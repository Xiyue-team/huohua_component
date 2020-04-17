<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">三角形的旁心</span>
                <div class="triangle-text">{{triangleText}}</div>
                <transition name="fade">
                    <div class="ctrl-wrap" v-show="showEquation" :class="{'no-click':disabledClick}">
                        <div class="row">
                            <div class="left" v-show="active1">
                                <div class="content">三角形旁切圆的圆心,简称为三角形旁心，它是三角形一个内角的平分线
                                    和其他两个内角的外角平分线的交点；显然，任何三角形都存在三个旁切圆、三个旁心。
                                </div>
                            </div>
                            <div class="btn-ctrl right" :class="{'active': active1}" @click="active1 = !active1">
                                名词解释
                            </div>
                        </div>
                        <div class="row">
                            <div class="left" v-show="active2">
                                <div class="section">
                                    <div class="action">作角A旁心
                                        <label class="label-checkbox">
                                            <input type="checkbox" v-model="played1">
                                            <span class="checkmark" @click="btnEvent(1)"></span>
                                        </label>
                                    </div>
                                </div>
                                <div class="section">
                                    <div class="action">作角B旁心
                                        <label class="label-checkbox">
                                            <input type="checkbox" v-model="played2">
                                            <span class="checkmark" @click="btnEvent(2)"></span>
                                        </label>
                                    </div>
                                </div>
                                <div class="section">
                                    <div class="action">作角C旁心
                                        <label class="label-checkbox">
                                            <input type="checkbox" v-model="played3">
                                            <span class="checkmark" @click="btnEvent(3)"></span>
                                        </label>
                                    </div>
                                </div>
                                <div class="section">
                                    <div class="title" @click="btnEvent(4)">性质</div>
                                    <div class="content" v-show="active3">旁心到三角形三边距离相等</div>
                                </div>
                            </div>
                            <div class="btn-ctrl right" :class="{'active': active2}" @click="active2 = !active2">
                                作旁心
                            </div>
                        </div>
                    </div>
                </transition>
                <div style="width: 100%; height: 100%" class="box">
                    <div id="3dContainer" style="margin: auto;width: 100%;height: 100%">
                    </div>
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">
                </div>
            </template>
        </fullScreensLayout>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
//    import "./static/base.css";
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
    .title_text {
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #000000;
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 100;
    }

    div#3dContainer {
        position: absolute !important;
        left: 0 !important;
        top: -195px !important;
    }

    .box {
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
    }

    .ctrl-wrap {
        width: 40%;
        max-width: 350px;
        min-width: 300px;
        position: fixed;
        right: 24px;
        bottom: 0;
        z-index: 20;
        line-height: 1.4;
    }

    .row {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        margin-bottom: 16px;
    }

    .left {
        flex-grow: 1;
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 12px;
        font-size: 16px;
        position: relative;
        background-color: #fff;
    }

    .left::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        border-top: 1px solid rgba(0, 0, 0, 0.12);
        border-right: 1px solid rgba(0, 0, 0, 0.12);
        right: -7px;
        bottom: 15px;
        background-color: #fff;
        z-index: 10;
        transform: rotateZ(45deg);
    }

    .right {
        flex-grow: 0;
        flex-shrink: 0;
        margin-left: 18px;
    }

    .section:not(:last-child) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }

    .section .title {
        padding: 14px;
        cursor: pointer;
        font-weight: bold;
    }
    .label-checkbox{
        height: 0;
        display: inline-block;
        margin-right: 0;
    }
    .checkmark{
        top: -17px;
        left: 87px;
    }

    .title ~ .content {
        padding-top: 0;
    }

    .content, .action {
        padding: 14px;
        font-family: PingFangSC-Regular;
        line-height: 26px;
        font-size: 16px;
        color: #333333;
    }
    .action{
        font-weight: 600;
    }
    @media screen and (max-width: 800px) {
        .ctrl-wrap {
            max-width: 450px;
            min-width: 378px;
            transform: scale(0.6, 0.6);
            transform-origin: right bottom;
            line-height: 1.0;
        }
        .checkmark{
            top: -17px;
            left: 120px;
        }
        .section .title {
            padding: 9px 14px;
        }
        .content, .action {
            padding: 9px 14px;
        }
        .row {
            margin-bottom: 12px;
        }
    }
    .title{
        font-family: PingFangSC-Regular;
        color: #333333;
    }
    .btn-ctrl {
        width: 100px;
        height: 40px;
        font-size: 16px;
        background: #FFFFFF;
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 21px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        /*margin-bottom:24px;*/
    }

    .btn-ctrl.active {
        color: #fff;
        background: #0199FF;
        border-radius: 21px;
    }

    .triangle-text {
        position: absolute;
        top: 72px;
        left: 24px;
        font-family: PingFangSC-Medium;
        font-size: 20px;
        color: #333333;
        line-height: 20px;
        z-index: 99;
    }

    .no-click {
        pointer-events: none;
    }
</style>