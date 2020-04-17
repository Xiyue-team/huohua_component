<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div id="3dContainer" class="Container"></div>
                <div class="buttonBox">
                    <button :class="{active: active1}" @click="getEvent(1)">{{buttonTitle[0]}}</button>
                    <button :class="{active: active2}" @click="getEvent(2)">{{buttonTitle[1]}}</button>
                </div>
                <img class="legendImg" src="./sub_static/UI/legend.png">
                <div class="eChart_box" id="eChart_box">
                    <div class="eCharts" id="eCharts" ></div>
                    <img class="legend1" src="./sub_static/UI/v1.png">
                    <img class="legend2" src="./sub_static/UI/v2.png" v-show="active">
                    <img class="legend2" src="./sub_static/UI/v3.png" v-show="active2">
                </div>
                <div class="text1" id="text1">{{text[0]}}</div>
                <div class="text2" id="text2" v-show="active">{{text[1]}}</div>
                <div class="text2" id="text3" v-show="active2">{{text[2]}}</div>
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
        overflow-x: hidden;
        overflow-y: hidden;
    }

    ul, ol, li {
        list-style: none;
    }

    .title_text {
        font-size: 24px;
        color: #fff;
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
    }
    .legendImg{
        width: 9vw;
        height: auto;
        position: absolute;
        left: 2.5vw;
        top: 50%;
        transform: translateY(-50%);
    }
    .buttonBox {
        position: absolute;
        width: 106px;
        height: 108px !important;
        right: 24px;
        bottom: 5vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        align-content: center;
        z-index: 99;
    }
    button {
        width: 104px;
        height: 42px;
        cursor: pointer;
        background: #FFFFFF;
        border: 0 solid rgba(0,0,0,0.10);
        box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        border-radius: 21px;
        padding: 12px 16px;
        font-size: 16px;
        font-weight: 700;
        color: #333333;
        line-height: 16px;
    }
    .active {
        color: #fff;
        background-color: #5CAEFD;
    }
    .eChart_box {
        display: flex;
        flex-direction: column;
        width: 200px;
        height: 500px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .eCharts {
        z-index: 0;
        position: absolute;
        top: 0;
        right: 0;
        width: 200px ;
        height: 450px ;
    }
    .legend1, .legend2{
        position: absolute;
        color: white;
        bottom: 44px;
        right: 156px;
        width: 45px ;
        height: auto ;
    }
    .legend2{
        right: 17px;
    }
    .text1, .text2{
        position: absolute;
        color: white;
        font-size: 1.5vw;
    }
    @media (min-width: 1100px) and (max-width: 1300px){
        .eChart_box {
            width: 200px;
            height: 300px;
        }
        .legend1, .legend2{
            right: 141px;
            width: 30px ;
            height: auto ;
        }
        .legend2{
            right: 29px;
        }
        .eCharts {
            transform: scale(0.8);
            top: -140px;
            right: -7px;
        }
    }
    @media (min-width: 900px) and (max-width: 1100px){
        .eChart_box {
            width: 200px;
            height: 300px;
        }
        .legend1, .legend2{
            right: 143px;
            width: 30px ;
            height: auto ;
        }
        .legend2{
            right: 32px;
        }
        .eCharts {
            transform: scale(0.8);
            top: -146px;
            right: -5px;
        }
    }
    @media (min-width: 800px) and (max-width: 900px) {
        .eChart_box {
            width: 200px;
            height: 300px;
        }
        .legend1, .legend2{
            right: 137px;
            width: 26px ;
            height: auto ;
        }
        .legend2{
            right: 39px;
        }
        .eCharts {
            transform: scale(0.7);
            top: -120px;
            right: -5px;
        }
        .buttonBox {
            transform: scale(0.7);
        }
    }
    @media (max-height: 455px) {
        .eChart_box {
            width: 150px;
            height: 200px;
        }
        .legend1, .legend2{
            right: 104px;
            width: 20px;
            height: auto;
            bottom: 31px;
        }
        .legend2{
            right: 34px;
        }
        .eCharts {
            transform: scale(0.5);
            top: -165px;
            right: -26px;
        }
        .buttonBox {
            transform: scale(0.5);
            bottom: 0;
        }
    }
</style>
