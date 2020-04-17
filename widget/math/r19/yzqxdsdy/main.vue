<template>
    <div class="aspectration bg_white root_div_container">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox" >
                <span class="title_style" v-bind:class="{'set_scale1': isMobile}">圆锥曲线的第三定义</span>
                <transition name="fade">
                    <div v-show="showEquation">
                        <div class="equation" v-if="!initEquation"  v-bind:class="{'set_scale': isMobile}">
                            <div class="klImg "><img src="./sub_static/fangcheng.png"/></div>
                            <!--<div class="point">=</div>-->
                            <!--<div class="klImg kl2"><img src="./sub_static/fang2.png"/></div>-->
                            <div class="point"> = </div>
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
                        <div class="equation" v-else  v-bind:class="{'set_scale': isMobile}">
                            <div class="klImg "><img src="./sub_static/fangcheng.png"/></div>
                            <!--<div class="point">=</div>-->
                            <!--<div class="klImg kl2"><img src="./sub_static/fang2.png"/></div>-->
                            <div class="point"> = </div>
                            <div class="wheel-wrap1">
                                <span class="point">e</span>
                            </div>
                            <sup>2</sup>
                            <span> -1</span>
                        </div>
                    </div>

                </transition>
                <div id="3dContainer"></div>

            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel" style="height: 100%">

                    <div   @click="button1">
                        <!--<h_button  title="绘制" style="position: absolute;right: 120px;bottom: 0px;width:72px;height: 42px;border-radius: 21px;" v-bind:class='{active: gaoliang}' ></h_button>-->

                        <buttonPrimary  v-bind:class="{ event_disabled: disable }" style="position: absolute;right: 140px;bottom: 74px;width:74px;height: 42px;"  v-bind:title="title1" type="ellipse" v-bind:actived="color2" >
                        </buttonPrimary>
                    </div>

                    <div @click="button2">
                        <!--<h_button  title="展示" style="position: absolute;right: 50px;bottom: 74px;width:72px;height: 42px;border-radius: 21px;" v-bind:actived="color1" ></h_button>-->
                        <buttonPrimary v-bind:class="{ event_disabled: disable2 }" style="position: absolute;right: 50px;bottom: 74px;width:72px;height: 42px;"  v-bind:title="title" type="ellipse" v-bind:actived="color1" >
                        </buttonPrimary>
                    </div>
                </div>

            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import '../../../../src/assets/css/core.css';
  import '../../../../src/assets/css/layout.css';
  import h_button from '../../../../src/component/ui/button.vue';
  import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
  import seletIos from '../../../../src/component/ui/select.vue';
  import Component from 'vue-class-component';
  import {MainVueComponent} from './mainVueComponent.ts';
  import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';

  @Component({
    components: {
      h_button,
      fullScreensLayout,
      seletIos,
      buttonPrimary

    },
    mixins: [MainVueComponent]
  })
  export default class App extends Vue {}

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
    .title_style {
        width: 336px;
        height: 24px;
        font-size: 24px;
        color: #000000;
        line-height: 24px;
        position: absolute;
        left: 24px;
        top: 24px;
    }

    .equation {
        position: fixed;
        left:24px;
        top: 120px;
        font-size: 24px;
        color: #000000;
        line-height: 24px;
        z-index: 9;
        background: #fff;
        height: 60px;
        width: 400px;
        background-color: transparent;
    }
    .equation .klImg{
        width: 84px;
        height: 75px;
        float: left;
        margin-top: -12px;
        margin-right: 2px;
    }
    .equation .kl2{
        height: 40px;
        float: left;
        margin-top: 5px;
        margin-right: 2px;
        width: 80px;

    }
    .equation .klImg img{
        width: 100%;
        height: auto;
    }
    .equation .point{
        float: left;
        margin-top: 15px;
        margin-right: 7px;
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

    .set_scale {
        position: absolute;
        transform: scale(0.5);
        margin-left: -50px;
    }

    .set_scale1 {
        position: absolute;
        transform: scale(0.5);
        margin-left: -130px;
    }
    .wheel-wrap {
        display: inline-block;
        min-width: 58px;
        min-height: 24px;
        line-height: 24px;
        position: relative;
        text-align: center;
        font-style: normal;
    }
    .arrow {
        position: absolute;
        height: 50px;
        width: 24px;
        z-index: 10;
        background: #fff;
        background-color: transparent;
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
        min-width: 18px;
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

    .zhanshi {


    }
</style>






