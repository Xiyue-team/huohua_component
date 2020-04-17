<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text" :style="{zoom: zoom1}">{{title}}</span>  
                <div style="width: 100%; height: 100%" class="box">
                    <div id="3dContainer" style="margin: auto;width: 100%;height: 100%">
                    </div>
                </div>
                <div class="sliderBox">
                    <img src="./sub_static/a.png">
                    <vue-slider class="vueSlider" v-model="value" v-bind="sliderOption"></vue-slider>
                </div>
                <div class="buttonBox" :style="{zoom: zoom1}">
                    <button :class="{diad: true, 'changeBule': isChange1}" @click="diadClick(0)" id="diad">{{buttonBox[0]}}</button>
                    <button :class="{diad: true, 'changeBule': isChange2}" @click="diadClick(1)" id="symmetryPoint">{{buttonBox[1]}}</button>
                </div>
                <img :src="axImg" class="axImg" :style="{zoom: zoom1}">
                <img :src="logImg" class="axImg logImg" :style="{zoom: zoom1}">
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
import vueSlider from 'vue-slider-component/dist-css/vue-slider-component.common.js';
import 'vue-slider-component/dist-css/vue-slider-component.css';
import 'vue-slider-component/theme/default.css';
    @Component({
        components: {
            fullScreensLayout,
            vueSlider
        },
    })
    export default class App extends MainVueComponent {
    }
</script>

<style scoped="scoped">
.title_text {
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #fff;
    line-height: 24px;
    line-height: 24px;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 24px;
    left: 24px;
    z-index: 100;
}
div>#3dContainer{
    position: absolute !important;
    left: 0  !important;
    top:-195px  !important;
}
.sliderBox {
    position: absolute;
    width: 230px;
    height: 50px!important;
    top: 45%;
    right: 4vw;
    z-index: 99;
}
.sliderBox>img{
    width: 11px;
    height: 12px;
    position: absolute;
    top: 40%;
    left: 0;
}
.sliderBox .vueSlider {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
.buttonBox{
    width: 73px;
    height: 114px;
    position: absolute;
    top: 60%;
    right: 10%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    align-content: center;
}
.diad{
    width: 73px;
    height: 42px;
    display: flex;
    background: #EBEBEB;
    color: #000;
    border-radius: 25px;
    font-size: 16px;
    justify-content:center;
    z-index: 1000;
}
.changeBule{
    background: #0091FF;
    color: #fff;
}
.axImg{
    height: 36px;
    position: absolute;
    top: 25%;
    right: 10%;
}
.logImg{
    top: 32%;
    right: 8.8%;
}
</style>