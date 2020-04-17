<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">HCl和CH₃COOH的电离</div>
                <div class="box1" v-show='show4'>
                    <div class="text1" id="text1">盐酸</div>
                    <img class="flex_box1 " id="flex_box11" src="./sub_static/UI/startCub1.png"
                         @mouseover="hoverEvent1()" @mouseleave="leaveEvent1()" @click="changeEvent(0)">
                    <img class="flex_box2 " id="flex_box12" src="./sub_static/UI/yscs.png">
                </div>
                <div class="box2" v-show='show5'>
                    <div class="text1" id="text2">醋酸溶液</div>
                    <img class="flex_box1 " id="flex_box21" src="./sub_static/UI/startCub2.png"
                         @mouseover="hoverEvent2()" @mouseleave="leaveEvent2()" @click="changeEvent(1)">
                    <img class="flex_box2 " id="flex_box22" src="./sub_static/UI/cscs.png">
                </div>
                <div id="button" v-show='show' @click="reset">返回</div>
                <div id="3dContainer" class="Container" :style="{'background-image': 'url(\'' +bg +'\')'}"></div>
                <div class="eChart_box" id="eChart_box">
                    <div class="eCharts" id="eCharts" v-show='show1'></div>
                    <img class="legend1" v-show='show2' src="./sub_static/UI/moleculeImg1.png">
                    <img class="legend2" v-show='show3' src="./sub_static/UI/moleculeImg2.png">
                </div>

            </template>
            <!--<template slot="controlPanel" slot-scope="controlPanel">-->

            <!--</template>-->
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

    .box1 {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 25%;
        height: 60%;
        position: absolute;
        left: 23%;
        top: 20%;
    }

    .flex_box1 {
        display: block;
        z-index: 99;
        opacity: 0.6;
        width: 90%;
        height: auto;
        margin: 3%;
        cursor: pointer;
    }

    .flex_box2 {
        width: auto;
        height: 4%;
        margin: 3%;
        opacity: 0.6;
    }

    .flex_box1:hover {
        opacity: 1;
    }

    .box2 {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 25%;
        height: 60%;
        position: absolute;
        top: 20%;
        right: 23% !important;
    }

    .text1 {
        opacity: 0.6;
        width: 90%;
        height: 10%;
        text-align: center;
        font-size: 24px;
        color: #E6E6E6;
    }

    #button {
        width: 68px;
        height: 38px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        border-radius: 21px;
        position: absolute;
        right: 24px;
        bottom: 24px;
        line-height: 38px;
        text-align: center;
        cursor: pointer;
        z-index: 100;
    }

    .eChart_box {
        display: flex;
        flex-direction: column;
        /*align-items: center;*/
        width: 390px;
        height: 500px;
        position: absolute;
        right: 23%;
        top: 50%;
        transform: translateY(-50%);
    }

    .legend1 {
        display: block;
        width: 260px;
        height: auto;
        position: absolute;
        right: 75px;
        bottom: 20px;
    }

    .legend2 {
        display: block;
        width: 280px;
        height: auto;
        position: absolute;
        right: 58px;
        bottom: 30px;
    }

    .eCharts {
        z-index: -0;
        position: absolute;
        top: 0;
        right: 0;
        width: 390px ;
        height: 450px ;
    }
    .player {
        display: flex;
        flex-direction: column;
        /*align-items: center;*/
        width: 390px;
        height: 500px;
        position: absolute;
        right: 5%;
        top: 50%;
        transform: translateY(-50%);
    }
    @media (max-height: 800px) {
        .eChart_box {
            right: 13%;
        }
    }

    @media (max-height: 500px) {
        .text1 {
            font-size: 16px;
        }
        .eChart_box {
            right: 17%;
            width: 200px;
            height: 250px;
        }
        .legend1 {
            width: 130px;
            right: 45px;
            bottom: 15px;
        }
        .legend2 {
            width: 140px;
            right: 35px;
            bottom: 25px;
        }
        .eCharts {
            transform: scale(0.5);
            top: -120px;
            right: -90px;
        }
    }

    /*.legend1{*/
    /*display: block;*/
    /*width: 260px;*/
    /*height: auto;*/
    /*position: absolute;*/
    /*right: 375px;*/
    /*bottom: 210px;*/
    /*}*/
    /*.legend2{*/
    /*display: block;*/
    /*width: 280px;*/
    /*height: auto;*/
    /*position: absolute;*/
    /*right: 357px;*/
    /*bottom: 230px;*/
    /*}*/
    /*.eCharts{*/
    /*z-index: -0;*/
    /*position: absolute;*/
    /*bottom: 250px;*/
    /*right: 300px;*/
    /*width: 390px !important;*/
    /*height: 450px !important;*/
    /*}*/

    /*@media (max-height: 800px) {*/
    /*.legend1{*/
    /*transform: scale(0.9);*/
    /*right: 173px;*/
    /*bottom: 200px;*/
    /*}*/
    /*.legend2{*/
    /*transform: scale(0.9);*/
    /*right: 157px;*/
    /*bottom: 220px;*/
    /*}*/
    /*.eCharts{*/
    /*transform: scale(0.9);*/
    /*right: 100px;*/
    /*bottom: 210px;*/
    /*}*/
    /*}*/
    /*@media (max-height: 500px) {*/
    /*.text1{*/
    /*font-size: 16px;*/
    /*}*/
    /*.legend1{*/
    /*transform: scale(0.5);*/
    /*right: 75px;*/
    /*bottom: 50px;*/
    /*}*/
    /*.legend2{*/
    /*transform: scale(0.5);*/
    /*right: 61px;*/
    /*bottom: 60px;*/
    /*}*/
    /*.eCharts{*/
    /*transform: scale(0.5);*/
    /*right: 5px;*/
    /*bottom: -25px;*/
    /*}*/
    /*}*/
    /*@media (max-height: 325px) {*/
    /*.text1{*/
    /*font-size: 14px;*/
    /*}*/
    /*.legend1{*/
    /*transform: scale(0.5);*/
    /*right: 75px;*/
    /*bottom: 20px;*/
    /*}*/
    /*.legend2{*/
    /*transform: scale(0.5);*/
    /*right: 61px;*/
    /*bottom: 25px;*/
    /*}*/
    /*.eCharts{*/
    /*transform: scale(0.5);*/
    /*right: 5px;*/
    /*bottom: -65px;*/
    /*}*/
    /*}*/
</style>
