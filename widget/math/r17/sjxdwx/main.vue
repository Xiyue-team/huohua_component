<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">三角形的外心</span>
                <div class="triangle-text">{{triangleText}}</div>
                <transition name="fade">
                    <div class="ctrl-wrap" v-show="showEquation" :class="{'no-click':disabledClick}">
                        <div class="row">
                            <div class="left" v-show="active1">
                                <div class="content">三角形三边垂直平分线的交点叫做三角形的外心，也是三角形外接圆的圆心。</div>
                            </div>
                            <div class="btn-ctrl right" :class="{'active': active1}" @click="active1=!active1">
                                名词解释
                            </div>
                        </div>
                        <div class="row">
                            <div class="left" v-show="active2">
                                <div class="section">
                                    <div class="title" @click="btnEvent(3)">性质</div>
                                    <div class="content" v-show="active3">外心到三个顶点的距离相等，OA=OB=OC</div>
                                </div>
                                <div class="section">
                                    <div class="title" @click="btnEvent(4)">向量关系</div>
                                    <div class="content" v-show="active4">
                                        <img src="./sub_static/explain.png">
                                    </div>
                                    </div>
                                </div>
                                <div class="btn-ctrl right" :class="{'active': active2}" @click="active2=!active2">
                                    作外心
                                </div>
                            </div>
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
    width: 35%;
    max-width: 400px;
    min-width: 300px;
    position: fixed;
    right: 24px;
    bottom: 0px;
    z-index: 20;
    line-height: 1.4;

}

@media screen and (max-width: 800px) {
    .ctrl-wrap {
        transform: scale(0.6, 0.6);
        transform-origin: right bottom;
        line-height: 1.2;
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
    background-color: #fff;
}

.content {
    padding:12px 16px;
}

.content img {
    width: 100%;
    height: auto;
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
    /*font-weight: bold;*/
}
.no-click {
    pointer-events: none;
}
</style>