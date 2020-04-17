<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text" :style="{zoom: zoom1}">{{title}}</span>  
                <div style="width: 100%; height: 100%" class="box">
                    <div id="3dContainer" style="margin: auto;width: 100%;height: 100%">
                    </div>
                </div>
                <button :class="{definition: true, 'changeBlue': isDefinition}" :style="{zoom: zoom1}" @click="definItion">定义</button>
                <div class="textFirst" :style="{zoom: zoom1}"  v-show="isDefinition">
                    <img src="./sub_static/dy.png">
                </div>
                <button :class="{analyze: true, 'changeBlue': isAnalyze}" :style="{zoom: zoom1}" @click="anAlyze" v-show="showAnla">分析</button>
                <div class="analyzeImgBox" :style="{zoom: zoom1}">
                    <img src="./sub_static/fx1.png" class="analyzeImg1" v-show="analyzeImg1">
                    <img src="./sub_static/fx2.png" class="analyzeImg2" v-show="analyzeImg2">
                </div>
                <div class="natureBox" :style="{zoom: zoom1}">
                    <img src="./sub_static/xz1.png" class="nature1" v-show="isHave === 0">
                    <img src="./sub_static/xz2.png" class="nature2" v-show="isHave === 1">
                    <img src="./sub_static/xz3.png" class="nature3" v-show="isHave === 2">
                </div>
                <div class="buttonBox" :style="{zoom: zoom1}">
                    <button :class="{buttonatn: true, 'changeBlue': isHave === index}"
                            v-for="(item, index) in buttonBox"
                            :key="index"
                            :id="'index' + index"
                            v-text="item"
                            @click="clickButton(index)"
                    ></button>
                </div>
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
    })
    export default class App extends MainVueComponent {
    }
</script>

<style>
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
div#3dContainer{
    position: absolute !important;
    left: 0  !important;
    top:-195px  !important;
}
.definition, 
.analyze{
    width: 98px;
    height: 50px;
    position: absolute;
    right: 0;
    top: 10%;
    transform: translateX(-50%);
    font-size: 16px;    
    background: #EBEBEB;
    border-radius: 25px;
}
.analyze{
    top: 26%;
}
.textFirst{
    width: 350px;
    height: 81px;
    position: absolute;
    right: 0;
    top: 16%;
    transform: translateX(-20%);
    background: rgba(255,255,255,0.10);
    border-radius: 12px;
    font-family: SourceHanSansSC-Medium;
    font-size: 16px;
    color: #FFFFFF;
    text-align: justify;
}
.textFirst>img{
    width: 100%;
    height: 100%;
}
.analyzeImgBox{
    width: 350px;
    height: 254px;
    position: absolute;
    right: 0;
    top: 33%;
    transform: translateX(-20%);
}
.analyzeImg1{
    width: 100%;
    height: 100%;
    position: absolute;
}
.analyzeImg2{
    width: 100%;
    height: 170px;
    position: absolute;
}
.buttonBox{
    width: 400px;
    height: 42px;
    position: absolute;
    bottom: 4vh;
    right: 2vh;
    display: fixed;
    flex-direction:row;
    flex-wrap:nowrap;
    align-content: space-between;
    justify-content:center;
}
.buttonBox>.buttonatn{
    width: 98px;
    height: 50px;
    color: #000;
    margin: 0 8px;;
    font-size: 16px;
    background: #EBEBEB;
    border-radius: 25px;
}
.changeBlue{
    background-color: #0291FF!important;
    color: white!important;
}
.natureBox{
    width: 324px;
    height: 122px;
    position: absolute;
    right: 0;
    bottom: 10.5%;
    transform: translateX(-24%);
    z-index: 1000;
}
.nature1, .nature2, .nature3{
    width: 100%;
    height: 100%;
    position: absolute;
}
.nature1{
    margin-top: 70px;
    height: 48px;
}
.nature2{
    margin-top: 50px;
    height: 72px!important;
}
@media (max-width: 1300px) {
    .definition{
        top: 17%;
    }
    .analyze{
        top: 38%;
    }
    .textFirst{
        top: 25%;
    }
    .analyzeImgBox{
        top: 47%;
    }
}
@media (max-height: 340px) {
    .control_div_resetBtn{
        position: absolute;
        top: 0;
        right: 0;
        transform: scale(0.7)!important;
    }
}
</style>