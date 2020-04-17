<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">圆锥曲线焦半径表达式</span>  
                <ul :style="{zoom:zoom1}">
                    <li><button :class="{bule:isBule1}" @click="change(1)">椭圆</button></li>
                    <li><button :class="{bule:isBule2}" @click="change(2)">双曲线</button></li>
                    <li><button :class="{bule:isBule3}" @click="change(3)">抛物线</button></li>
                </ul> 
                <button :class="{zhanshi:zhanshi}" @click="change(4)" :style="{zoom:zoom1}" v-if="cover">切换</button>
                <button class="gray" id="Gray" v-show="isGray" :style="{zoom:zoom1}">切换</button>
                <div style="width: 100%; height: 100%" class="box">
                    <div id="3dContainer" style="margin: auto;width: 100%;height: 100%">
                    </div>
                </div>
                <div class="imgShuoMing" :style="{zoom:zoom1}">
                    <img :src="imgShuoMing"  v-show="isShow">
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
    ont-family: PingFangSC-Medium;
    font-size: 24px;
    color: #000000;
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

ul{
    position: absolute;
    bottom:20px;
    right: 20px;
}
ul>li{
    margin: 12px;
}
ul>li>button{
    width: 100px;
    height: 50px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color:  #333333;
    text-align: center;
    line-height: 16px;
    background: #FFFFFF;
    border: 2px solid #EBEBEB;
    border-radius: 21px;
}
.zhanshi,.gray{
    width: 100px;
    height: 50px;
    position: absolute;
    bottom:32px;
    right:144px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color:  #333333;
    text-align: center;
    line-height: 16px;
    background: #FFFFFF;
    border: 2px solid #EBEBEB;
    border-radius: 21px;
}
.zhanshi:active{
    background:#0199FF;
    color: white!important;
}
.bule{
    background:#0199FF;
    color: white!important;
}
.gray{
    background: gainsboro!important;
    color:ghostwhite!important;
}
.imgShuoMing{
    width: 294px;
    height: 140px;
    position: absolute;
    top: 96px;
    left: 24px;
    z-index: 2;
}
.imgShuoMing>img{
    width: 100%;
    height: 100%;
}
</style>