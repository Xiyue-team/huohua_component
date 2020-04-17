<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">坡度比与斜率</div>
                <div class="but btn1" :class="{active:active1}" @click="changeEvent(0)">坡度比</div>
                <div class="but btn2" :class="{active:active2}" @click="changeEvent(1)">斜率</div>
                <div class="tip box1" v-show="active1">
                    <img class="tip1" src="./sub_static/UI/podubi.png" >
                </div>
                <div class="tip box2" id = "box2" v-show="active2">
                    <img class="tip2" :src="tip">
                </div>
                <div id="3dContainer" class="Container"></div>
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

    @Component({
        components: {
            fullScreensLayout,
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
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
    }
    .but{
        width: 104px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        border: 1px solid rgba(0,0,0,0.12);
        border-radius: 21px;
        background-color: #FFFFFF;
        position: absolute;
        right: 24px;
        font-size: 16px;
        color: #525252;
        bottom: 84px;
        z-index: 99;
        cursor: pointer;
    }
    .btn2{
        bottom: 24px;
    }
    .active {
        color: #fff;
        background-color: #0199FF;
    }
    .tip{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        background: rgba(255,255,255,0.96);
        border: 1px solid rgba(0,0,0,0.12);
        border-radius: 12px;
        right: 150px;
        width: 232px;
        height: 74px;
    }
    .tip1{
        display: block;
        width: auto;
        height: 60%;
        position: absolute;
    }
    .tip2{
        display: block;
        width: 85%;
        height: auto;
        position: absolute;
    }
    .tip::after {
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
    .box1{
        bottom: 85px;
    }
    .box2{
        bottom: 25px;
    }
    @media (max-height: 500px) {
        .but {
            width: 68px;
            height: 30px;
            line-height: 30px;
            font-size: 16px;
            bottom: 74px;
            right: 12px;
        }
        .btn2{
            bottom: 24px;
        }
        .tip{
            right: 80px;
            transform: scale(0.7);
        }
        .box1{
            bottom: 60px;
        }
        .box2{
            bottom: 15px;
        }
    }
</style>
