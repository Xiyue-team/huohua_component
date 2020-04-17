<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout  :style="{zoom: zoom1}">
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div class="content" >
                     <img src="./sub_static/UI/start_bj.png" v-show="isShow">
                     <img src="./sub_static/UI/abiotic.png" v-show="isShow1">
                     <img src="./sub_static/UI/descomposer.png" v-show="isShow2">
                     <img src="./sub_static/UI/consumer.png" v-show="isShow3">
                     <img src="./sub_static/UI/production.png" v-show="isShow4">
                    <div class="btn">
                        <div class="production">
                           <div class="btn_1" @click="getEvent(4)" >
                               <button :class="{active:isActived4}">{{buttonText[0]}}</button>
                           </div>
                            <div class="text_1" >
                                <img  src="./sub_static/UI/production_text.png" v-show="isActived4" >
                            </div>
                        </div>
                        <div class="descomposer ">
                            <div class="text_2">
                                <img   src="./sub_static/UI/descomposer_text.png"
                                     :style="{opacity : msg2}">
                            </div>
                            <div class="btn_2" @click="getEvent(2)" >
                               <button :class="{active:isActived2}">{{buttonText[1]}}</button>
                            </div>
                        </div >
                        <div class="abiotic">
                            <div class="btn_3" @click="getEvent(1)" >
                                <button :class="{active:isActived1}">{{buttonText[2]}}</button>
                            </div>
                            <div class="text_3">
                                <img   src="./sub_static/UI/abiotic_text.png"  v-show="isActived1">
                            </div>
                        </div>
                        <div class="consumer">
                            <div class="text_4">
                                <img   src="./sub_static/UI/consumer_text.png"   :style="{opacity : msg3}">
                            </div>
                            <div class="btn_4" @click="getEvent(3)" >
                                <button :class="{active:isActived3}">{{buttonText[3]}}</button>
                            </div>
                        </div>
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
        touch-action: none;
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
        line-height: 33px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 99;
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #000000;
        font-weight: 600;
    }
    .content{
        width: 100%;
        height:100%;
        position: relative;
        background-size: 100% 100%;
        z-index: 9;
    }
    img{
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
    /*四个按钮的样式*/
    .production{
        position: absolute;
        top: 44.4%;
        left:18.4%;
    }
    .btn .btn_1{
        width: 88px;
        height: 38px;
        cursor: pointer;
        margin-bottom: 7px;
    }
    .text_1{
        width: 150px;
        height: 146px;
    }
      .descomposer{
        position: absolute;
        bottom: 34.2%;
        left:40%;
    }
    .btn .btn_2{
        width: 88px;
        height: 38px;
        cursor: pointer;
        margin-top: 7px;
    }
    .text_2{
        width: 150px;
        height: 160px;
    }
   .abiotic{
       position: absolute;
       top: 16.6%;
       left:61.4%;
   }
    .btn .btn_3{
        width: 98px;
        height: 38px;
        cursor: pointer;
        margin-bottom: 7px;

    }
    .text_3{
        width: 154px;
        height: 69px;
    }
    .consumer{
        position: absolute;
        bottom: 28.1%;
        left:67.3%;
    }
    .btn .btn_4{
        width: 88px;
        height: 38px;
        cursor: pointer;
        margin-top: 7px;
    }
    .text_4{
        width: 150px;
        height: 146px;
    }
    button{
        width: 100%;
        border-radius: 19px;
        padding: 11px 3px;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        line-height: 14px;
        color: #ffffff;
        background: rgba(0,0,0,0.65);
        border: 1px solid #EBEBEB;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    /*按钮被点击后的样式*/
   .btn .active{
        color: #000000;
        background: rgba(255,255,255,0.90);
    }
   /*适配各种设备*/
    @media ( max-height : 500px) {
        .btn .btn_3{
            width: 128px;
        }
    }
    @media ( max-height : 300px) {
        .btn .btn_3{
            width: 128px;
        }
        button{
            padding: 13px 3px 11px 3px ;
        }
    }
</style>
