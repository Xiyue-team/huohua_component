<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout :style="{zoom: zoom1}">
            <template slot="viewBox" slot-scope="viewBox">
                <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=0">
                <div class="content" >
                    <div id="title" class="title_text">草履虫</div>
                    <div class="img_right" >
                            <img src="./sub_static/UI/21.png">
                            <div class="btn_1" @click="getEvent(1)" :class="{anniu:actived1}"></div>
                            <div class="btn_2" @click="getEvent(2)" :class="{anniu:actived2}"></div>
                            <div class="btn_3" @click="getEvent(3)" :class="{anniu:actived3}"></div>
                            <div class="btn_4" @click="getEvent(4)" :class="{anniu:actived4}"></div>
                            <div class="btn_5" @click="getEvent(5)" :class="{anniu:actived5}"></div>
                            <div class="btn_6" @click="getEvent(6)" :class="{anniu:actived6}"></div>
                            <div class="btn_7" @click="getEvent(7)" :class="{anniu:actived7}"></div>
                            <div class="btn_8" @click="getEvent(8)" :class="{anniu:actived8}"></div>
                            <div class="btn_9" @click="getEvent(9)" :class="{anniu:actived9}"></div>
                            <div class="btn_10" @click="getEvent(10)" :class="{anniu:actived10}"></div>
                            <div  class="img_list" v-if="img_right">
                                <img :src="img_right" >
                            </div>
                    </div>
                    <div class="img_left" v-if="img_left">
                        <img :src="img_left">
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
    img{
        pointer-events: none;
    }
    ul, ol, li {
        list-style: none;
    }
    .content{
        width: 100%;
        height:100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .title_text {
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 99;
        font-size: 24px;
        color: #000000;
        font-weight: 600;
    }
    .img_right{
        width: 328px;
        height: 469px;
        position: absolute;
        right: 17%;
        top: 50%;
        transform: translate(0,-50%);
    }
    .img_right>img{
        width: 100%;
        height: 100%;
    }
    .anniu{
        background: #F49008;
    }
    .btn_1{
        width: 21px;
        height: 21px;
        border-radius:50%;
        position: absolute;
        top:134px;
        left:19.5px;
        cursor: pointer;
    }
    .btn_2{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        position: absolute;
        top:186px;
        left:20px;
        cursor: pointer;
    }
    .btn_3{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        position: absolute;
        top:261px;
        left:20.5px;
        cursor: pointer;
    }
    .btn_4{
         width: 20px;
         height: 20px;
         border-radius: 50%;
         position: absolute;
         top:336px;
         left:20.5px;
         cursor: pointer;
     }
    .btn_5{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        position: absolute;
        top:390px;
        left:20.5px;
        cursor: pointer;
    }
    .btn_6{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        position: absolute;
        top:58.5px;
        right:22px;
        cursor: pointer;
    }
    .btn_7{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        position: absolute;
        top:136.5px;
        right:22px;
        cursor: pointer;
    }
    .btn_8{
         width: 20px;
         height: 20px;
         border-radius: 50%;
         position: absolute;
         top:216px;
         right:22px;
        cursor: pointer;
     }
    .btn_9{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        position: absolute;
        top:294px;
        right:22px;
        cursor: pointer;
    }
    .btn_10{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        position: absolute;
        top:363px;
        right:22px;
        cursor: pointer;
    }
    .img_list{
        width: 328px;
        height: 469px;
        position: absolute;
        z-index: -1;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .img_list>img{
        width: 100%;
        height: 100%;

    }
    /*左边的图片样式*/
    .img_left{
        width:305px;
        height:396px;
        position: absolute;
        left:12.1%;
        top: 50%;
       transform: translate(0,-50%);
    }
    .img_left>img{
        width: 100%;
        height: 100%;
    }

   /*适配各种设备*/
    @media (max-height: 820px) {

    }

</style>
