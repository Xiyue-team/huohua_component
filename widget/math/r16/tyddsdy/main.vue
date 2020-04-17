<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">椭圆的第三定义</div>
                <transition name="fade">
                    <div v-show="showEquation">
                        <div class="equation" v-if="!initEquation">
                            <div class="klImg"><img src="./sub_static/Kl1.png"/></div>
                            <div class="point">·</div>
                            <div class="klImg kl2"><img src="./sub_static/Kl2.png"/></div>
                            <span class="italic-style"> = </span>
                            <div class="wheel-wrap no-plus">
                                <div class="arrow arrow-top">
                                    <div></div>
                                </div>
                                <div class="arrow arrow-bottom">
                                    <div></div>
                                </div>
                                <selet-ios class="pos-y" :listData="listData" id="spin" v-model="e" :parentHidden="false" v-bind="selectParameter" type="cycle"
                                           ref="spin" @mouseOut="mouseOut" @downHandle="changeIndex">
                                </selet-ios>
                            </div>
                            <sup>2</sup>
                            <span>-1</span>
                        </div>
                        <div class="equation" v-else>
                            <div class="klImg "><img src="./sub_static/Kl1.png"/></div>
                            <div class="point">·</div>
                            <div class="klImg kl2"><img src="./sub_static/Kl2.png"/></div>
                            <span class="italic-style"> = </span>
                            <div class="wheel-wrap1">
                                <span class="italic-style">e</span>
                            </div>
                            <sup>2</sup>
                            <span> -1</span>
                        </div>
                    </div>
                </transition>
                <div class="btn-ctrl" :class="{'active': isActive}" @click="isActive=!isActive">
                    绘制
                </div>
                <div style="width: 100%; height: 100%; display: flex">
                    <div id="3dContainer" style="margin: auto;width: 100%;height: 100%">
                    </div>
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
    import {MainVueComponent} from './mainVueComponent.ts';
    import seletIos from '../../../../src/component/ui/select.vue';
    import * as Kl1Img from './sub_static/Kl1.png';
    import * as Kl2Img from './sub_static/Kl2.png';

    @Component({
        components: {
            fullScreensLayout,
            seletIos
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
        color: #000000;
        line-height: 24px;
        font-weight: 700;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
    }
    .equation {
        position: fixed;
        left: 24px;
        top: 125px;
        font-size: 24px;
        color: #000000;
        line-height: 24px;
        z-index: 9;
        background: #fff;
        height: 80px;
        width: 220px;
    }
    .equation .klImg{
        width: 26px;
        height: 34px;
        float: left;
        margin-top: 2px;
        margin-right: 2px;
    }
    .equation .kl2{
        width: 25px;
        margin-right: 10px;
    }
    .equation .klImg img{
        width: 100%;
        height: auto;
    }
    .equation .point{
        float: left;
        margin-top: 6px;
        margin-right: 2px;
    }
    .equation sub{
        font-size: 5px;
    }
    @media screen and (max-height: 500px) {
        .equation {
            top: 90px;
            transform: scale(0.5, 0.5);
            transform-origin: left top;
        }
    }

    .italic-style {
        font-style: italic;
    }
    .wheel-wrap {
        display: inline-block;
        min-width: 44px;
        min-height: 24px;
        line-height: 24px;
        position: relative;
        text-align: center;
        font-style: normal;
        /*border: 1px solid grey;*/
    }
    .arrow {
        position: absolute;
        height: 50px;
        width: 24px;
        z-index: 10;
        background: #fff;
        /*border: 1px solid grey;*/
    }

    .arrow-top div,
    .arrow-bottom div {
        width: 10px;
        height: 10px;
        border-top: 2px solid #e0e0e0;
        border-right: 2px solid #e0e0e0;
        margin: 0 auto;
        margin-top: 20px;
        transform: rotateZ(-45deg);
    }

    .arrow-top {
        top: -78px;
        left: 12px;
    }

    .arrow-bottom {
        bottom: -86px;
        left: 12px;
        transform: rotateZ(180deg);
    }
    .wheel-wrap1 {
        display: inline-block;
        min-width: 24px;
        min-height: 24px;
        line-height: 24px;
        position: relative;
        text-align: center;
        font-style: normal;
    }
    .pos-y {
        top: -30px;
    }

    .no-plus>>>.pd-select-wheel-item span {
        display: none !important;
    }

    .no-plus>>>.pd-select-list-item span {
        display: none !important;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
    .btn-ctrl {
        position: fixed;
        right: 24px;
        bottom: 24px;
        width: 72px;
        height: 40px;
        font-size: 16px;
        background: #FFFFFF;
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 21px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
    }

    .btn-ctrl.active {
        color: #fff;
        background: #0199FF;
        border-radius: 21px;
    }

</style>
