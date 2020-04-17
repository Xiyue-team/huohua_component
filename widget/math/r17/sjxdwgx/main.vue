<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">三角形的五个心</span>
                <div class="triangle-text">{{triangleText}}</div>
                <transition name="fade">
                    <div class="ctrl-wrap" :class="{'no-click':disabledClick}">
                        <div class="btn-ctrl orange-color" :class="{active:active1}" @click="active1 =!active1">重心</div>
                        <div class="btn-ctrl red-color" :class="{active:active2}" @click="active2 =!active2">内心</div>
                        <div class="btn-ctrl purple-color" :class="{active:active3}" @click="active3 =!active3">外心</div>
                        <div class="btn-ctrl blue-color" :class="{active:active4}" @click="active4 =!active4">垂心</div>
                        <div class="btn-ctrl black-color" :class="{active:active5&&triangleText==='等边三角形',disabled:triangleText!=='等边三角形'}" @click="handleClick">中心</div>
                    </div>
                </transition>
                <div style="width: 100%; height: 100%" class="box" :class="{'no-click':disabledClick}">
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
import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
import Component from 'vue-class-component';
import { MainVueComponent } from './mainVueComponent';

@Component({
    components: {
        fullScreensLayout,
    },
})
export default class App extends MainVueComponent {}
</script>
<style scoped="scoped">
.title_text {
    font-family: PingFangSC-Medium;
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


div#3dContainer {
    position: absolute !important;
    left: 0 !important;
    top: -195px !important;
}


.ctrl-wrap {
    position: fixed;
    right: 24px;
    bottom: 0px;
    z-index: 20;

}

@media screen and (max-width: 800px) {
    .ctrl-wrap {
        transform: scale(0.7, 0.7);
        transform-origin: right bottom;
        line-height: 1.2;
        right:12px;
    }
}

.row {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    margin-bottom: 12px;
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
    background-color: #fff;

}

.section:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.section .title {
    padding: 12px 16px;
    cursor: pointer;
    font-weight: bold;

}

.title~.content {
    padding-top: 0;
}

.right {
    flex-grow: 0;
    flex-shrink: 0;
    margin-left: 18px;
}

.content {
    padding: 12px 16px;
}

.content img {
    width: 100%;
    height: auto;
}

.btn-ctrl {
    /*width: 100px;*/
    padding: 0 20px;
    height: 40px;
    font-size: 16px;
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 21px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    margin-bottom: 12px;
}



.triangle-text {
    position: absolute;
    top: 72px;
    left: 24px;
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #333333;
    line-height: 20px;
    /*font-weight: bold;*/
}

.no-click {
    pointer-events: none;
}

.orange-color {
    color: #F5A623;
}

.orange-color.active {
    color: #fff;
    background-color: #F5A623;
}

.red-color {
    color: #D0021B;
}

.red-color.active {
    color: #fff;
    background-color: #D0021B;
}

.purple-color {
    color: #BD10E0;
}

.purple-color.active {
    color: #fff;
    background-color: #BD10E0;
}

.blue-color {
    color: #0199FF;
}

.blue-color.active {
    color: #fff;
    background-color: #0199FF;
}

.black-color {
    color: #000;
}

.black-color.active {
    color: #fff;
    background-color: #000;
}

.disabled {
    opacity: 0.4;
    pointer-events: none;
}
</style>