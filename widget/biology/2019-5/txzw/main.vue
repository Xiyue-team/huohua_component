<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout >
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div class="content" >
                        <img class="backGround" src="./sub_static/UI/bj.png" >
                        <div :class="{moban:isActived}"></div>
                        <div class="btn btn_1" @click="getChange(1)">
                            <button  >{{buttonTitle[0]}}</button>
                        </div>
                        <div class="image" v-show="fsw1">
                            <img src="./sub_static/UI/1.png">
                            <div class="imageButton"  @click="getClose(1)">
                            </div>
                        </div>
                        <div class="btn btn_2" @click="getChange(2)">
                           <button  >{{buttonTitle[1]}}</button>
                        </div>
                        <div class="image" v-show="fsw2">
                            <img src="./sub_static/UI/2.png">
                            <div class="imageButton"  @click="getClose(2)">
                            </div>
                        </div>
                        <div class="btn btn_3" @click="getChange(3)">
                            <button  >{{buttonTitle[2]}}</button>
                        </div>
                        <div class="image" v-show="fsw3">
                            <img src="./sub_static/UI/3.png">
                            <div class="imageButton"  @click="getClose(3)">
                            </div>
                        </div>
                        <div class="btn btn_4" @click="getChange(4)">
                            <button  >{{buttonTitle[3]}}</button>
                        </div>
                        <div class="image" v-show="fsw4">
                            <img src="./sub_static/UI/4.png">
                            <div class="imageButton"  @click="getClose(4)">
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
        touch-acion : none;
    }
    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    ul, ol, li {
        list-style: none;
    }
    img{width: 100%;
        height: 100%;
        pointer-events: none;
    }
    .title_text {
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
        font-size: 24px;
        text-align: justify;
        color: #FFFFFF;

    }
    .content{
        width: 100%;
        height: 100%;
        position: relative;
        background-size: 100% 100%;
    }
    .content .moban{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.55;
        background: #000000;
        z-index: 99;
    }
   .btn{
       width: 88px;
       height: 38px;
       display: flex;
       justify-content:center;
       align-items: center;
       cursor: pointer;
   }
   .btn button{
       width: 100%;
       font-family: SourceHanSansSC-Medium;
       color: #000000;
       background: #FFFFFF;
       border-radius: 19px;
       padding: 11px 16px;
       font-size: 14px;
       line-height: 14px;
       border: 1px solid #EBEBEB;
   }
   .btn_1{
       position: absolute;
       left: 24.4%;
       top: 20.8%;
   }
    .btn_2{
        position: absolute;
        left: 23.4%;
        bottom: 17%;
    }
    .btn_3{
        position: absolute;
        left: 51%;
        bottom: 7.1%;
    }
    .btn_4{
        position: absolute;
        right: 20.6%;
        bottom: 35.1%;
    }
    .image{
        width: 59.2%;
        height: auto;
        background-size: 100% 100%;
        position: absolute;
        top: 50%;
        left: 55%;
        transform: translate(-55%,-50%);
        z-index: 99;
    }
    .imageButton{
       position: absolute;
        top:2.0vw;
        right: -0.6vw;
        width:4vw ;
        height:4vw;
        cursor: pointer;
    }
    /*适配各种设备*/
    @media (min-width: 900px) and (max-width: 1366px) {

    }
    @media (max-height: 768px) {

    }
    @media (max-height: 400px) {
        .title_text {
            line-height: 18px;
            margin: 0;
            padding: 0;
            position: absolute;
            top: 18px;
            left: 24px;
            z-index: 9;
            font-size: 18px;
        }
    }
    @media (max-height: 300px) {

    }

</style>
