<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">催化剂对反应速率的影响</div>
                <div class="formula"><img src="./sub_static/UI/formula.png"></div>
                <div class="control-block_div_border_box " >
                    <span style="display: inline-block;width: 100%;margin-top: 10px; font-weight: 700;
                    font-size: 16px;color: #fff;text-align: center;">催化剂</span>
                    <br/>  <br/>

                    <label for="b1" style="display: inline-block;margin: 0 0 10px 14px;">
                        <label for="b1" style="margin-left: 5px;">无</label>
                        <input class="radio-default" v-model="picked" value="1" type="radio" id="b1" name="radio-group" checked>
                        <label for="b1" style="display: table-cell;vertical-align: middle;height: 24px;"></label>
                    </label>

                    <label for="b2" style="display: inline-block;float:right;">
                        <label for="b2" style="margin-left: 5px;">有</label>
                        <input class="radio-default" v-model="picked" value="2" type="radio" id="b2" name="radio-group" checked>
                        <label for="b2" style="display: table-cell;vertical-align: middle;height: 24px;  "></label>
                    </label>

                </div>
                <div class="eChart_box" id="eChart_box">
                    <div class="eCharts" id="eCharts" ></div>
                    <img class="legend1" src="./sub_static/UI/text.png">
                </div>
                <div id="3dContainer" class="Container"></div>
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
    @font-face
    {
        font-family: fontt;
        src: url('./SourceHanSansCN-Regular.otf')
    }

    *{
        font-family: fontt !important;
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
    .formula{
        position: absolute;
        width: auto;
        height: 40vh;
        top: 50%;
        transform: translateY(-50%);
        left: 80px;
    }
    .formula img{
        height: 40vh;
        width: auto;
    }
    .eChart_box {
        display: flex;
        flex-direction: column;
        width: 390px;
        height: 500px;
        position: absolute;
        right: 3vw;
        top: 50%;
        transform: translateY(-50%);
    }
    .eCharts {
        z-index: 0;
        position: absolute;
        top: 0;
        right: 0;
        width: 390px ;
        height: 450px ;
    }
    .legend1 {
        display: block;
        width: 195px;
        height: auto;
        position: absolute;
        right: 102px;
        bottom: 35px;
    }
    .control-block_div_border_box {
        background-color: #333333;
        border: 1px solid #fff;
        z-index: 999;
        position: absolute;
        width: 150px;
        bottom: 44px;
        right: 175px;
        color: #fff;
        border-radius: 6px;
    }
    @media (min-width: 1100px) and (max-width: 1300px){
        .eChart_box {
            width: 280px;
            height: 320px;
        }
        .legend1 {
            width: 155px;
            right: 61px;
            bottom: 1px;
        }
        .eCharts {
            transform: scale(0.8);
            top: -80px;
            right: -60px;
        }
        .control-block_div_border_box {
            bottom: 40px;
            right: 100px;
        }
    }
    @media (min-width: 900px) and (max-width: 1100px){
        .eChart_box {
            width: 280px;
            height: 320px;
        }
        .legend1 {
            width: 155px;
            right: 29px;
            bottom: 1px;
        }
        .eCharts {
            transform: scale(0.8);
            top: -80px;
            right: -92px;
        }
        .control-block_div_border_box {
            bottom: 35px;
            right: 61px;
        }
    }
    @media (min-width: 800px) and (max-width: 900px){
        .eChart_box {
            width: 280px;
            height: 320px;
        }
        .legend1 {
            width: 135px;
            right: 38px;
            bottom: 18px;
        }
        .eCharts {
            transform: scale(0.7);
            top: -80px;
            right: -92px;
        }
        .control-block_div_border_box {
            transform: scale(0.7);
            bottom: 5px;
            right: 61px;
        }
    }
    @media (max-height: 450px) {
        .formula{
            left: 40px;
        }
        .eChart_box {
            width: 200px;
            height: 250px;
        }
        .legend1 {
            width: 95px;
            right: 39px;
            bottom: 24px;
        }
        .eCharts {
            transform: scale(0.5);
            top: -110px;
            right: -110px;
        }
        .control-block_div_border_box {
            transform: scale(0.5);
            bottom: -10px;
            right: 33px;
        }
    }

</style>
