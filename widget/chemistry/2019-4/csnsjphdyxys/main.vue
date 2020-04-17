<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title">醋酸钠水解平衡的影响因素</div>
                <div class="buttonBox">
                    <div class="btn1" @click="getEvent(1)" :class="{active: active1}">H₂O</div>
                    <div class="btn2" @click="getEvent(2)" :class="{active: active2}">NaOH(<sub>s</sub>)</div>
                    <div class="btn3" @click="getEvent(3)" :class="{active: active6}">NaAc(<sub>s</sub>)</div>
                    <div class="btn4" @click="getEvent(4)" :class="{active: active4}">Na₂CO₃(<sub>s</sub>)</div>
                    <div class="btn5" @click="getEvent(5)" :class="{active: active5}">加热</div>
                </div>
                <div class="eChart_box" id="eChart_box">
                    <div class="eCharts" id="eCharts"></div>
                </div>
                <img class="legend1" src="./sub_static/UI/legend.png">
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
    * {
        margin: 0;
        padding: 0;
    }

    body {
        overflow: hidden !important;
    }

    #title {
        position: absolute;
        left: 2%;
        top: 3%;
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #FFFFFF;
    }

    .buttonBox {
        position: absolute;
        margin: auto;
        right: 2vw;
        top: 0;
        bottom: 0;
        width: 104px;
        height: 290px;
        z-index: 99;
    }

    .btn2,
    .btn3,
    .btn4{
        width: 104px;
        height: 42px !important;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        border-radius: 21px;
        font-family: TimesNewRomanPSMT;
        font-size: 16px;
        color: #000000;
        cursor: pointer;
        display: flex;
        justify-content:center;
        align-items: center;
        pointer-events: auto;
    }

    .btn1,
    .btn5 {
        width: 72px;
        height: 42px !important;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        border-radius: 21px;
        font-family: TimesNewRomanPSMT;
        font-size: 16px;
        color: #000000;
        cursor: pointer;
        display: flex;
        justify-content:center;
        align-items: center;
        float: right;
        pointer-events: auto;
    }

    .btn1,
    .btn2,
    .btn3,
    .btn4 {
        margin-bottom: 20px;
    }

    .eChart_box {
        display: flex;
        flex-direction: column;
        width: 500px;
        height: 500px;
        position: absolute;
        right: 300px;
        top: 50%;
        transform: translateY(-50%);
    }
    .legend1 {
        display: block;
        width: 275px;
        height: auto;
        position: absolute;
        right: 445px;
        bottom: 235px;
    }
    .active {
        color: #ffffff;
        border: 1px solid #ffffff;
        background-color: #0199FF ;
        pointer-events: none;
    }
    @media (min-height: 1100px)  and (max-height: 1200px){
        .legend1 {
            bottom: 340px;
        }
    }
    @media (min-height: 1050px)  and (max-height: 1100px){
        .legend1 {
            bottom: 310px;
        }
    }
    @media (min-height: 1000px)  and (max-height: 1050px){
        .legend1 {
            bottom: 290px;
        }
    }
    @media (min-width: 1100px) and (max-width: 1300px) and (min-height: 750px){
        .eChart_box {
            width: 380px;
            height: 380px;
            right: 200px;
        }
        .legend1 {
            transform: scale(0.75);
            right: 275px;
            bottom: 235px;
        }
        .eCharts {
            transform: scale(0.9);
            top: -80px;
            right: -60px;
        }
    }
    @media (min-width: 1100px) and (max-width: 1300px) and (min-height: 670px)  and (max-height: 750px){
        .eChart_box {
            width: 380px;
            height: 380px;
            right: 200px;
        }
        .legend1 {
            transform: scale(0.75);
            right: 275px;
            bottom: 180px;
        }
        .eCharts {
            transform: scale(0.9);
            top: -80px;
            right: -60px;
        }
    }

    @media (min-width: 900px) and (max-width: 1100px) and (min-height: 680px){
        .eChart_box {
            width: 380px;
            height: 380px;
            right: 180px;
        }
        .legend1 {
            transform: scale(0.75);
            right: 255px;
            bottom: 190px;
        }
        .eCharts {
            transform: scale(0.8);
            top: -80px;
            right: -92px;
        }
    }
    @media (min-width: 900px) and (max-width: 1100px) and (min-height: 760px){
        .eChart_box {
            width: 380px;
            height: 380px;
            right: 180px;
        }
        .legend1 {
            transform: scale(0.75);
            right: 255px;
            bottom: 220px;
        }
        .eCharts {
            transform: scale(0.8);
            top: -80px;
            right: -92px;
        }
    }
    @media (min-width: 800px) and (max-width: 900px){
        .eChart_box {
            width: 300px;
            height: 300px;
            right: 140px;
        }
        .legend1 {
            transform: scale(0.6);
            right: 172px;
            bottom: 137px;
        }
        .eCharts {
            transform: scale(0.6);
            top: -80px;
            right: -92px;
        }
    }
    @media (max-height: 460px) {
        .legend1 {
            transform: scale(0.6);
            right: 172px;
            bottom: 110px;
        }
    }
    @media (max-height: 450px) {
        .eChart_box {
            width: 250px;
            height: 250px;
            right: 95px;
        }
        .legend1 {
            transform: scale(0.5);
            right: 100px;
            bottom: 90px;
        }
        .eCharts {
            transform: scale(0.5);
            top: -80px;
            right: -92px;
        }
        .buttonBox {
            transform: scale(0.5);
        }
    }
    @media (max-height: 350px) {
        .legend1 {
            bottom: 70px;
        }
    }
</style>
