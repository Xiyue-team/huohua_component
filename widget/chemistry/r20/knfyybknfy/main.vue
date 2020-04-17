<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">可逆反应与不可逆反应</div>
                <div class="btn btn1" :class="{active:active1}" @click="changeEvent(0)">可逆反应</div>
                <div class="btn btn2" :class="{active:active2}" @click="changeEvent(1)">不可逆反应</div>
                <div id="tip" style="width: 5%; height: 10%; position: absolute; opacity: 0"
                     :class="{active:active3}" @click="changeEvent(2)"></div>
                <div class="box">
                    <div class="flex box1">
                        <img class="img1" src="./sub_static/UI/A.png">
                        <div class="text">A</div>
                    </div>
                    <div class="flex box2">
                        <img class="img2" src="./sub_static/UI/B.png">
                        <div class="text">B</div>
                    </div>
                    <div class="flex box3">
                        <img class="img3" src="./sub_static/UI/AB.png">
                        <div class="text">AB</div>
                    </div>
                </div>
                <div id="3dContainer" class="Container">

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
        width: 104px;
        height: 42px;
        line-height: 42px;
        font-size: 16px;
        color: #333333;
        text-align: center;
        border: 1px solid rgba(0,0,0,0.12);
        border-radius: 21px;
        background-color: #FFFFFF;
        position: absolute;
        right: 24px;
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
    .box{
        z-index: 99;
        display: flex;
        position: absolute;
        width: 8%;
        height: 25%;
        right: 24px;
        bottom: 35%;
        flex-direction: column;
        align-items: center;
    }
    .box .flex{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: 30%;
        width: 100%;
        margin-top: 3%;
    }
    .box .flex img{
        height: 100%;
        width: auto;
    }
    .box .flex .img1{
        height: 48%;
    }
    .box .flex .img2{
        height: 57%;
    }
    .box .flex .img3{
        transform: rotate(60deg);
    }
    .box .flex .text{
        font-family: Times New Roman;
        font-size: 24px;
        color: #FFFFFF;
    }
    .box .box3 {
        margin-left: 11%;
    }
    @media (max-height: 500px) {
        .btn {
            width: 78px;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            bottom: 74px;
            right: 12px;
        }
        .btn2{
            bottom: 24px;
        }
        .box .flex .text{
            font-size: 14px;
        }
    }
</style>
