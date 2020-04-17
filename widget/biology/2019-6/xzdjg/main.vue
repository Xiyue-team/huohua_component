<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span class="title_style" :style="{zoom: zoom1}">{{title}}</span>
                <div class="button_box_left" :style="{zoom: zoom1}">
                        <div class="pad_box"
                             v-for="(item, index) in buttonBoxLeft"
                             :key="index">
                            <button class="an_niu_left"
                                :id="'index' + index"
                                v-text="item"
                                ondragstart="return false"
                        ></button>
                        </div>
                </div>
                <div class="button_box" :style="{zoom: zoom1}">
                        <div class="pad_box"
                             v-for="(item, index) in buttonBoxRight"
                             :key="index">
                            <button class="an_niu"
                                :id="'index' + index + 6"
                                v-text="item"
                                ondragstart="return false"
                        ></button>
                        </div>
                </div>
                <button class="reject_button_box"
                        v-for="(item, index) in rejectArr"
                        :key="index"
                        :id="'button' + index"
                        v-text="item.text"    
                        v-show="item.text"
                ></button>
                <div class="optionBox"
                     v-for="(item, index) in rejectArr"
                     :key="'index' + index"
                     :id="'optionBox' + index"
                     v-show="item.src"
                >
                    <img :src="item.src">
                </div>
                <div id="3dContainer" class="Container" :style="{'background-image': 'url(\'' + backImg +'\')'} "></div>
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
    import {MainVueComponent} from './mainVueComponent';
    @Component({
        components: {
            fullScreensLayout,
        },

        mixins: [MainVueComponent]
    })
    export default class App extends Vue {
    }
</script>

<style>
    .control_div_resetBtn>img{
        height: 24px!important;
    }
    body {
        overflow: hidden!important;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .title_style {
        width: 420px;
        height: 28px;
        font-size: 24px;
        color: #ffffff;
        line-height: 28px;
        position: absolute;
        left: 24px;
        top: 24px;
    }

    .Container {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
    }
    .button_box, .button_box_left{
        width: 112px;
        height: 290px;
        position: absolute;
        top: 32%;
        right: 3%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        align-content: center;
    }
    .button_box_left{
        height: 350px;
        top: 28%;
        left: 3%;
    }
    .pad_box{
        width: 100px;
        height: 42px;
        display: flex;
        justify-content:center;
    }
    .an_niu, .an_niu_left{
        width: 100%;
        background: #FFFFFF;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        line-height: 16px;
        color: #fff; 
        background-color: #DE4D4B;
        border: 1px solid white;
        text-align: center;
        align-items: center;
        border-radius: 24px;
        z-index: 8;
    }
    .an_niu_left{
        background-color: #0291FF;
    }
    img{
        width: 64px;
        height: 64px;
        position: absolute;
    }
    .resetBox{
        width: 48px;
        height: 40px;
        position: absolute;
        top: 20px;
        right: 24px;
        background: #FFFFFF;
        border: 0 solid rgba(0,0,0,0.06);
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08);
        border-radius: 6px;
        cursor: pointer;
        z-index: 8;
    }
    .resetBox>img{
        width: 24px;
        height: 24px;
        margin-top: 8px;
        margin-left: 12px;
    }
    .reject_button_box{
        position: absolute;
        color: #fff;
        font-size: 2vh;
        background-color: rgba(2, 145, 255, 1);
        border-radius: 100px;
        border: 1px solid white;
        z-index: 8;
    }
    .optionBox{
        position: absolute;
        z-index: 8;
    }
    .optionBox>img{
        width: 100%;
        height: 100%;
    }
    @media (max-width: 1000px) {
        .control_div_resetBtn{
        top: 5px!important;
        right: 5px!important;
    }
        .control_div_resetBtn>img{
        height: 24px!important;
    }
        .resetBox{
            top: 4px;
            right: 4px;
            transform: scale(0.8);
    }
    }
</style>
