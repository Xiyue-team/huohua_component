<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div class="content" >
                    <img class="backGround" src="./sub_static/UI/start_bj.png" v-show="isShow">
                    <img class="img_fresh" src="./sub_static/UI/danshuizaolei_bj.png" v-show="isShow1">
                    <img class="backGround" src="./sub_static/UI/haiyangzaolei_bj.png" v-show="isShow2">
                    <div :class="{moban:isActived}"></div>
                    <div class="btn">
                        <div class="btn-first "  :class="{checked:isChecked1}" @click="getEvent(1)">
                            <button :class="{checked:isChecked1}">{{buttonTitle[0]}}</button>
                        </div>
                        <div class="btn-second"   @click="getEvent(2)">
                            <button  :class="{checked:isChecked2}">{{buttonTitle[1]}}</button>
                        </div>
                    </div>
                    <!--淡水藻类-->
                    <div class="fresh"  v-show="isShow1" >
                        <div class="btn-first-1" @click="getChange(1)">
                            <button  >{{buttonTitle[2]}}</button>
                        </div>
                        <div class="image_1" v-show="fsw1">
                            <img src="./sub_static/UI/shuimian.png">
                            <div class="imageButton" @mousedown="getBtn(1)" :class="{active:actived1}"
                                 @mouseup="getClose(1)"  @touchstart="getBtn(1)" @touchup="getClose(1)"></div>
                        </div>
                        <div class="btn-first-2" @click="getChange(2)">
                           <button  >{{buttonTitle[3]}}</button>
                        </div>
                        <div class="image_2" v-show="fsw2">
                            <img src="./sub_static/UI/yizao.png">
                            <div class="imageButton" @mousedown="getBtn(2)" :class="{active:actived2}"
                                 @mouseup="getClose(2)"  @touchstart="getBtn(2)" @touchup="getClose(2)"></div>
                        </div>
                    </div>
                    <!--海洋藻类-->
                    <div class="ocean"  v-show="isShow2">
                        <div class="btn-second-1" @click="getChange(1)"  >
                            <button  >{{buttonTitle[4]}}</button>
                        </div>
                            <div class="image_1" v-show="fsw1">
                                <img src="./sub_static/UI/shichun.png">
                                <div class="imageButton" @mousedown="getBtn(1)" :class="{active:actived1}"
                                     @mouseup="getClose(1)"  @touchstart="getBtn(1)" @touchup="getClose(1)"></div>
                            </div>
                        <div class="btn-second-2 " @click="getChange(2)">
                            <button  >{{buttonTitle[5]}}</button>
                        </div>

                            <div class="image_1" v-show="fsw2">
                                <img src="./sub_static/UI/shihuacai.png">
                                <div class="imageButton" @mousedown="getBtn(2)" :class="{active:actived2}"
                                     @mouseup="getClose(2)"  @touchstart="getBtn(2)" @touchup="getClose(2)"></div>
                            </div>
                        <div class="btn-second-3" @click="getChange(3)">
                            <button  >{{buttonTitle[6]}}</button>
                        </div>
                            <div class="image_1" v-show="fsw3">
                                <img src="./sub_static/UI/maweizao.png">
                                <div class="imageButton"  @mousedown="getBtn(3)" :class="{active:actived3}"
                                     @mouseup="getClose(3)"  @touchstart="getBtn(3)" @touchup="getClose(3)"></div>
                            </div>
                        <div class="btn-second-4" @click="getChange(4)">
                            <button >{{buttonTitle[7]}}</button>
                        </div>
                            <div class="image_1" v-show="fsw4">
                                <img src="./sub_static/UI/haidai.png">
                                <div class="imageButton"  @mousedown="getBtn(4)" :class="{active:actived4}"
                                     @mouseup="getClose(4)"  @touchstart="getBtn(4)" @touchup="getClose(4)"></div>
                            </div>
                        <div class="btn-second-5" @click="getChange(5)">
                            <button >{{buttonTitle[8]}}</button>
                        </div>
                            <div class="image_1" v-show="fsw5">
                                <img src="./sub_static/UI/zicai.png">
                                <div class="imageButton"  @mousedown="getBtn(5)" :class="{active:actived5}"
                                     @mouseup="getClose(5)"  @touchstart="getBtn(5)" @touchup="getClose(5)"></div>
                            </div>
                        <div class="btn-second-6 " @click="getChange(6)">
                            <button >{{buttonTitle[9]}}</button>
                        </div>
                            <div class="image_1" v-show="fsw6">
                                <img src="./sub_static/UI/lujiaocai.png">
                                <div class="imageButton"  @mousedown="getBtn(6)" :class="{active:actived6}"
                                     @mouseup="getClose(6)"  @touchstart="getBtn(6)" @touchup="getClose(6)"></div>
                            </div>
                        <div class="btn-second-7 " @click="getChange(7)">
                            <button >{{buttonTitle[10]}}</button>
                        </div>
                            <div class="image_1" v-show="fsw7">
                                <img src="./sub_static/UI/qundaicai.png">
                                <div class="imageButton"  @mousedown="getBtn(7)" :class="{active:actived7}"
                                     @mouseup="getClose(7)"  @touchstart="getBtn(7)" @touchup="getClose(7)"></div>
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
        cursor: pointer;
    }
    .content{
        width: 100%;
        height: 100%;
        position: relative;
        background-size: 100% 100%;
        background-color: #077165;
    }
    .backGround {
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: auto;
    }
    .img_fresh{
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width:90.2%;
        height: auto;
    }
    /*淡水藻类，海洋藻类的按钮样式*/
    .btn{
        position: absolute;
        bottom: 5vh;
        right: 3vw;
        z-index:11 ;
        display: flex;
        flex-direction:column;
    }
     .btn-first{
        width: 120px;
        height: 38px;
        margin-bottom:2vh ;
    }
    .btn-second{
        width: 120px;
        height: 38px;
    }
    .btn-first>button{
        width: 100%;
        border-radius: 19px;
        padding: 11px 26px;
        font-size: 14px;
        color: #000000;
        line-height: 14px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        font-family: SimSun;
        font-weight: 600;
    }
    .btn-second>button{
        width: 100%;
        border-radius: 19px;
        padding: 11px 26px;
        font-size: 14px;
        color: #000000;
        line-height: 14px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        font-family: SimSun;
        font-weight: 600;
    }
     .btn  .checked{
        background: #0291FF;
        border-radius: 19px;
    }
   /*淡水藻类里面的样式*/
    .fresh{
        width: 100%;
        height: 100%;
        position: relative;
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
     .image_1{
        width: 55vw;
        height: auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        z-index: 1111;
    }
    .imageButton{
        width: 4vw;
        height: 4vw;
        position: absolute;
        top: 1.65vw;
        right: -0.6vw;
        cursor: pointer;
    }
    .image_2{
        width: 55vw;
        height: auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        z-index: 1111;
    }
    .btn-first-1{
        position: absolute;
        width:88px;
        height: 38px;
        top: 30vh;
        left: 29vw;
    }
    .btn-first-2{
        position: absolute;
        width:88px;
        height: 38px;
        top: 67vh;
        left: 50vw;
    }
    .fresh button{
        width: 100%;
        border-radius: 19px;
        padding: 11px 23px;
        font-size: 14px;
        color: #000000;
        line-height: 14px;
        background: rgba(255,255,255,0.65);
        border: 1px solid #EBEBEB;
        font-family: SimSun;
        font-weight: 600;
    }
    /*海洋藻类里面的样式*/
    .ocean{
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
    }
     /*样式和淡水藻类的一样的省略合并在一起*/
    .btn-second-1{
        position: absolute;
        top: 30vh;
        right: 9vw;
        width:88px;
        height: 38px;
    }
    .btn-second-2{
        position: absolute;
        top: 66vh;
        right: 24vw;
        width:88px;
        height: 38px;
        cursor: pointer;
    }
    .btn-second-3{
        position: absolute;
        top: 19vh;
        right: 34vw;
        width:88px;
        height: 38px;
        cursor: pointer;
    }
    .btn-second-4{
        position: absolute;
        top: 59vh;
        right: 51vw;
        width:88px;
        height: 38px;
        cursor: pointer;
    }
    .btn-second-5{
        position: absolute;
        top: 38vh;
        right: 66vw;
        width:88px;
        height: 38px;
        cursor: pointer;
    }
    .btn-second-6{
        position: absolute;
        top: 18vh;
        right: 81vw;
        width:88px;
        height: 38px;
        cursor: pointer;

    }
    .btn-second-7{
        position: absolute;
        top: 70vh;
        right: 83vw;
        width:88px;
        height: 38px;
        cursor: pointer;
    }
    .ocean button{
        width: 100%;
        border-radius: 19px;
        padding: 11px 10px;
        font-size: 14px;
        color: #000000;
        line-height: 14px;
        background: rgba(255,255,255,0.65);
        border: 1px solid #EBEBEB;
        font-family: SimSun;
        font-weight: 600;
    }
    /*适配各种设备*/
    @media (min-width: 900px) and (max-width: 1366px) {
        .content{
            width: 100%;
            height: 100%;
            position: relative;
            background-size: 100% 100%;
            background-color: #077165;
        }
        .backGround {
            display: block;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height:100%;
        }
        .img_fresh{
            display: block;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 90.2%;
            height: auto;
        }
        .fresh  .btn-first-1{
            top: 36vh;
        }
        .fresh  .btn-first-2{
            left:49vw ;
            top: 62vh;
        }
    }
    @media (height: 960px) {
       .content{
            width: 100%;
            height: 100%;
            position: relative;
            background-size: 100% 100%;
            background-color: #077165;
        }
        .backGround {
            display: block;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height:100%;
        }
        .img_fresh{
            display: block;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: auto;
        }






    }
    @media (max-height: 768px) {
        .content{
            width: 100%;
            height: 100%;
            position: relative;
            background-size: 100% 100%;
            background-color: #077165;
        }
        .backGround {
            display: block;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height:100%;
        }
        .img_fresh{
            display: block;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: auto;
        }
        .fresh  .btn-first-1{

            left: 28.5vw;
        }
        .fresh  .btn-first-2{
            top: 65vh;
        }
    }
    @media (max-height: 450px) {
        .fresh .btn-first-1{
            width: 58px;
            height: 20px;
        }
        .fresh .btn-first-2{
            width: 58px;
            height: 20px;
        }
        .fresh button{
            border-radius: 19px;
            padding: 5px 8px;
            font-size: 8px;
            color: #000000;
            line-height: 8px;
            transform: translatey(10px);
        }
        .btn-second-1,.btn-second-2,.btn-second-3,.btn-second-4,.btn-second-5,.btn-second-6,.btn-second-7{
            width: 58px;
            height: 20px;
        }
        .ocean button{
            border-radius: 19px;
            padding: 5px 8px;
            font-size: 8px;
            color: #000000;
            line-height: 8px;
        }
       .btn{
           transform: scale(0.6);
       }
    }
    @media (max-height: 300px) {
        .img_fresh{
            display: block;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 86%;
            height: auto;
        }
        .fresh  .btn-first-1{
            top: 13vw;;
            left: 31vw;
        }
        .btn-second-4{
            right:48vw;
        }
        .fresh .btn-first-1{
            width: 38px;
            height: 16px;
        }
        .fresh .btn-first-2{
            width: 38px;
            height: 16px;
            top: 63vh; ;
        }
        .fresh button{
            border-radius: 16px;
            padding: 5px  5px 3px 5px;
            font-size: 8px;
            line-height: 8px;
        }
        .btn-second-1,.btn-second-2,.btn-second-3,.btn-second-4,.btn-second-5,.btn-second-6,.btn-second-7{
            width: 38px;
            height: 16px;
        }
        .ocean button{
            border-radius: 16px;
            padding: 5px  5px 3px 5px;
            font-size: 8px;
            line-height: 8px;
        }
        .btn-first{
            width: 68px;
            height: 20px;
            margin-bottom:5vh ;
        }
        .btn-second{
            width: 68px;
            height: 20px;
        }
        .btn-first>button{
            border-radius: 19px;
            padding: 6px  8px 4px 8px;
            font-size: 10px;
        }
        .btn-second>button{
            border-radius: 19px;
            padding: 6px  8px 4px 8px;
            font-size: 10px;
        }
    }
    @media (max-height: 180px) {
        .img_fresh{
            display: block;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 56%;
            height: auto;
        }
    }
    @media only screen and (min-aspect-ratio: 1/1) and (max-aspect-ratio: 13/10){
        .img_fresh{
            width: 86%;
            height: auto;
        }
        .backGround {
            width: 100%;
            height:100%;
        }
        .fresh .btn-first-1{
            top: 40vh;
        }
        .fresh .btn-first-2{
            top:60vh;
        }
    }
    @media (height: 510px) and (width: 818px)  {
        .fresh button{
            padding: 13px 23px 11px 23px;
        }
        .ocean button{
            padding: 13px 10px 11px 10px;
        }
        .btn-first>button{
            padding: 13px 26px 11px 26px;
        }
        .btn-second>button{
            padding: 13px 26px 11px 26px;
        }
    }
</style>
