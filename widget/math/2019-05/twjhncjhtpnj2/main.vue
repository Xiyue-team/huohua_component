<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout >
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">同位角、内错角、同旁内角</div>
                <div class="btn">
                    <div class="btn1" :class="{active:active1}" @click="clickbutton(0)">
                        同位角</div>
                    <div class="btn2" :class="{active:active2}" @click="clickbutton(1)">内错角</div>
                    <div class="btn3" :class="{active:active3}" @click="clickbutton(2)">同旁内角</div>
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
    .Container{
        background:#2B2B2B;
    }
    .title_text {
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
        font-family: SourceHanSansHWSC-Regular;
        font-size: 24px;
        color: #FFFFFF;
        line-height: 24px;
    }
    .btn{
        width: 104px;
        height: 162px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #525252;
        text-align: center;
        line-height: 16px;
        display: flex;
        flex-direction:column;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        right: 10%;
        top: 38.1%;
    }
    .btn1{
        width: 88px;
        height: 42px;
        background: #EBEBEB;
        border-radius: 21px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .btn2{
        width: 88px;
        height: 42px;
        background: #EBEBEB;
        border-radius: 21px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .btn3{
        width: 104px;
        height: 42px;
        background: #EBEBEB;
        border-radius: 21px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .active {
        color: #fff;
        background: #0091FF;
    }
</style>
