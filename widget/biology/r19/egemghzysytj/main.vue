<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">恩格尔曼光合作用实验探究</div>
                <div class="tip" :style="{'background-image': 'url(\'' +tip +'\')'} "></div>
                <div class="btn btn1" :class="{active:active1}" @click="changeEvent(0)">平行光</div>
                <div class="btn btn2" :class="{active:active2}" @click="changeEvent(1)">正常光</div>
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
        color: #FFFFFF;
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
    }
    .btn{
        width: 88px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        border: 1px solid rgba(0,0,0,0.12);
        border-radius: 21px;
        background-color: #FFFFFF;
        position: absolute;
        right: 24px;
        bottom: 84px;
        z-index: 99;
        font-size: 18px;
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
        width: 10%;
        height: 30px;
        left: 45%;
        bottom: 3%;
        position: absolute;
        background-size: 100% auto;
        background-repeat: no-repeat;
    }
    @media (max-height: 500px) {
        .tip {
            height: 15px;
        }
        .btn {
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
    }
</style>
