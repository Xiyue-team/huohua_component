<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div class="content" >
                    <img class="backGround" src="./sub_static/UI/bj.png">
                    <!--中间树的部分-->
                    <div class="start" :style="{zoom:zoom1}">
                        <img src="./sub_static/UI/st.png"/>
                        <!--左边动物部分-->
                        <!--圆1-->
                        <div class="yuan1">
                            <div class="area-box" v-show="index === 1" @click="clickDot(1)">
                                <span class="dot"></span>
                                <span class="pulse delay-10"></span>
                                <span class="pulse delay-09"></span>
                                <span class="pulse delay-08"></span>
                            </div>
                            <div class="yuan_list" v-show="showList1">
                                <img src="./sub_static/UI/1.png"/>
                                <div class="text_list">{{titleArr[0]}}</div>
                            </div>
                        </div>
                        <!--圆2-->
                        <div class="yuan2">
                            <div class="area-box" v-show="index === 2" @click="clickDot(2)">
                                <span class="dot"></span>
                                <span class="pulse delay-10"></span>
                                <span class="pulse delay-09"></span>
                                <span class="pulse delay-08"></span>
                            </div>
                            <div class="yuan_list" v-show="showList2">
                                <img src="./sub_static/UI/2.png"/>
                                <div class="text_list">{{titleArr[1]}}</div>
                            </div>
                        </div>
                        <!--圆3-->
                        <div class="yuan3">
                            <div class="area-box" v-show="index === 3" @click="clickDot(3)">
                                <span class="dot"></span>
                                <span class="pulse delay-10"></span>
                                <span class="pulse delay-09"></span>
                                <span class="pulse delay-08"></span>
                            </div>
                            <div class="yuan_list" v-show="showList3">
                                <img src="./sub_static/UI/3.png"/>
                                <div class="text_list">{{titleArr[2]}}</div>
                            </div>
                        </div>
                        <!--圆4-->
                        <div class="yuan4">
                            <div class="area-box" v-show="index === 4" @click="clickDot(4)">
                                <span class="dot"></span>
                                <span class="pulse delay-10"></span>
                                <span class="pulse delay-09"></span>
                                <span class="pulse delay-08"></span>
                            </div>
                            <div class="yuan_list" v-show="showList4">
                                <img src="./sub_static/UI/4.png"/>
                                <div class="text_list">{{titleArr[3]}}</div>
                            </div>
                        </div>
                        <!--圆5-->
                        <div class="yuan5">
                            <div class="area-box" v-show="index === 5" @click="clickDot(5)">
                                <span class="dot"></span>
                                <span class="pulse delay-10"></span>
                                <span class="pulse delay-09"></span>
                                <span class="pulse delay-08"></span>
                            </div>
                            <div class="yuan_list" v-show="showList5">
                                <img src="./sub_static/UI/6.png"/>
                                <div class="text_list">{{titleArr[4]}}</div>
                            </div>
                        </div>
                        <!--圆6-->
                        <div class="yuan6">
                            <div class="area-box" v-show="index === 6" @click="clickDot(6)">
                                <span class="dot"></span>
                                <span class="pulse delay-10"></span>
                                <span class="pulse delay-09"></span>
                                <span class="pulse delay-08"></span>
                            </div>
                            <div class="yuan_list" v-show="showList6">
                                <img src="./sub_static/UI/5.png"/>
                                <div class="text_list">{{titleArr[5]}}</div>
                            </div>
                        </div>
                        <!--圆7-->
                        <div class="yuan7">
                            <div class="area-box" v-show="index === 7" @click="clickDot(7)">
                                <span class="dot"></span>
                                <span class="pulse delay-10"></span>
                                <span class="pulse delay-09"></span>
                                <span class="pulse delay-08"></span>
                            </div>
                            <div class="yuan_list" v-show="showList7">
                                <img src="./sub_static/UI/7.png"/>
                                <div class="text_list">{{titleArr[6]}}</div>
                            </div>
                        </div>
                        <!--圆8-->
                        <div class="yuan8">
                            <div class="area-box" v-show="index === 8" @click="clickDot(8)">
                                <span class="dot"></span>
                                <span class="pulse delay-10"></span>
                                <span class="pulse delay-09"></span>
                                <span class="pulse delay-08"></span>
                            </div>
                            <div class="yuan_list" v-show="showList8">
                                <img src="./sub_static/UI/8.png"/>
                                <div class="text_list">{{titleArr[7]}}</div>
                            </div>
                        </div>
                        <!--圆9-->
                        <div class="yuan9">
                            <div class="area-box" v-show="index === 9" @click="clickDot(9)">
                                <span class="dot"></span>
                                <span class="pulse delay-10"></span>
                                <span class="pulse delay-09"></span>
                                <span class="pulse delay-08"></span>
                            </div>
                            <div class="yuan_list" v-show="showList9">
                                <img src="./sub_static/UI/9.png"/>
                                <div class="text_list">{{titleArr[8]}}</div>
                            </div>
                        </div>
                        <!--圆10-->
                        <div class="yuan10">
                            <div class="area-box" v-show="index === 10" @click="clickDot(10)">
                                <span class="dot"></span>
                                <span class="pulse delay-10"></span>
                                <span class="pulse delay-09"></span>
                                <span class="pulse delay-08"></span>
                            </div>
                            <div class="yuan_list" v-show="showList10">
                                <img src="./sub_static/UI/10.png"/>
                                <div class="text_list">{{titleArr[9]}}</div>
                            </div>
                        </div>
                        <!--圆11-->
                        <div class="yuan11">
                            <div class="area-box" v-show="index === 11" @click="clickDot(11)">
                                <span class="dot"></span>
                                <span class="pulse delay-10"></span>
                                <span class="pulse delay-09"></span>
                                <span class="pulse delay-08"></span>
                            </div>
                            <div class="yuan_list" v-show="showList11">
                                <img src="./sub_static/UI/11.png"/>
                                <div class="text_list">{{titleArr[10]}}</div>
                            </div>
                        </div>
                        <!--圆12-->
                        <div class="yuan12">
                            <div class="area-box" v-show="index === 12 || showyuan12" @click="clickDot(12)">
                                <span class="dot"></span>
                                <span class="pulse delay-10"></span>
                                <span class="pulse delay-09"></span>
                                <span class="pulse delay-08"></span>
                            </div>
                            <div class="yuan_list" v-show="showList12">
                                <img src="./sub_static/UI/12.png"/>
                                <div class="text_list">{{titleArr[11]}}</div>
                            </div>
                        </div>
                        <!--圆13-->
                        <div class="yuan13">
                            <div class="area-box" v-show="index === 12 || showyuan13" @click="clickDot(13)">
                                <span class="dot"></span>
                                <span class="pulse delay-10"></span>
                                <span class="pulse delay-09"></span>
                                <span class="pulse delay-08"></span>
                            </div>
                            <div class="yuan_list" v-show="showList13">
                                <img src="./sub_static/UI/13.png"/>
                                <div class="text_list">{{titleArr[12]}}</div>
                            </div>
                        </div>

                        <!--右边植物部分-->
                        <div class="quan1">
                            <div class="area-box" v-show="item === 1" @click="clickDot(111)">
                                <span class="dot"></span>
                                <span class="pulse delay-10"></span>
                                <span class="pulse delay-09"></span>
                                <span class="pulse delay-08"></span>
                            </div>
                            <div class="quan_list" v-show="showRightList1">
                                <img src="./sub_static/UI/z_1.png"/>
                                <div class="text_list">{{titleArr[13]}}</div>
                            </div>
                        </div>
                        <div class="quan2">
                            <div class="area-box" v-show="item === 2" @click="clickDot(222)">
                                <span class="dot"></span>
                                <span class="pulse delay-10"></span>
                                <span class="pulse delay-09"></span>
                                <span class="pulse delay-08"></span>
                            </div>
                            <div class="quan_list" v-show="showRightList2">
                                <img src="./sub_static/UI/z_2.png"/>
                                <div class="text_list">{{titleArr[14]}}</div>
                            </div>
                        </div>
                        <div class="quan3">
                            <div class="area-box" v-show="item === 3" @click="clickDot(333)">
                                <span class="dot"></span>
                                <span class="pulse delay-10"></span>
                                <span class="pulse delay-09"></span>
                                <span class="pulse delay-08"></span>
                            </div>
                            <div class="quan_list" v-show="showRightList3">
                                <img src="./sub_static/UI/z_3.png"/>
                                <div class="text_list">{{titleArr[15]}}</div>
                            </div>
                        </div>
                        <div class="quan4">
                            <div class="area-box" v-show="item === 4" @click="clickDot(444)">
                                <span class="dot"></span>
                                <span class="pulse delay-10"></span>
                                <span class="pulse delay-09"></span>
                                <span class="pulse delay-08"></span>
                            </div>
                            <div class="quan_list" v-show="showRightList4">
                                <img src="./sub_static/UI/z_4.png"/>
                                <div class="text_list">{{titleArr[16]}}</div>
                            </div>
                        </div>
                        <div class="quan5">
                            <div class="area-box" v-show="item === 5" @click="clickDot(555)">
                                <span class="dot"></span>
                                <span class="pulse delay-10"></span>
                                <span class="pulse delay-09"></span>
                                <span class="pulse delay-08"></span>
                            </div>
                            <div class="quan_list" v-show="showRightList5">
                                <img src="./sub_static/UI/z_5.png"/>
                                <div class="text_list">{{titleArr[17]}}</div>
                            </div>
                        </div>
                    </div>


                    <!--右边的部分-->
                        <div class="textBox"   id="textBox" v-show="showText">
                            <img src="./sub_static/UI/text.png"/>
                            <div class="img_title" v-text="img_title"></div>
                            <div class="img_area" v-text="msg_textarea"></div>
                        </div>
                        <!--轮播图-->
                        <div class="main" id="main" v-show="showSwiper">
                            <div class="swiper-container " id="swiper-container" @mouseover="getChange"
                                 @mouseout="getChange1">
                                <div class="swiper-wrapper" id="swiper-wrapper">
                                    <div class="swiper-slide" id="swiper-slide">
                                        <img :src="one" alt="" style="width: 100%;height: auto" />
                                    </div>
                                    <div class="swiper-slide">
                                        <img :src="two" alt="" style="width: 100%;height: auto" />
                                    </div>
                                    <div class="swiper-slide">
                                        <img :src="three" alt="" style="width: 100%;height: auto" />
                                    </div>
                                </div>
                                <!-- Optional controls 轮播控件-->
                                <div class="swiper-pagination"></div>
                                <!--左右的切图按钮-->
                                <div class="swiper-button-prev btn_left" id="swiper-button-prev" slot="button-prev"><img
                                        src="./sub_static/UI/b1.png" style="width: 100%;height: 100%"></div>
                                <div class="swiper-button-next  btn_right" id="swiper-button-next" slot="button-next"><img
                                        src="./sub_static/UI/b2.png" style="width: 100%;height: 100%"></div>
                            </div>
                        </div>
                        <div class="buttonBox" id="buttonBox">
                            <div :class="{an_niu: have, checked:isChecked1}" @click="clickButton(1)">{{buttonArr[0]}}</div>
                            <div :class="{an_niu: have, checked:isChecked2}" @click="clickButton(2)">{{buttonArr[1]}}</div>
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
  import   '../../../../src/assets/css/core.css';
  import  '../../../../src/assets/css/layout.css';
  import fullScreensLayout from    '../../../../src/component/layout/fullScreens_layout.vue';
  import Component from  'vue-class-component';
  import { MainVueComponent } from  './mainVueComponent';

  @Component({
    components: {
      fullScreensLayout
    }
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
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
        text-align: center;
        line-height: 24px;
        font-family: SourceHanSansSC-Medium;
        font-size: 24px;
        color: #fff;
    }

    img {
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    .content {
        width: 100%;
        height: 100%;
    }

    /*中间树的部分*/
    .start {
        width: 430px;
        height: 522px;
        position: absolute;
        bottom: 0;
        left: 21.6%;
    }

    .yuan1 {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 104px;
        bottom: 61px;
    }

    .yuan2 {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 228px;
        bottom: 120px;
    }

    .yuan3 {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 84px;
        bottom: 138px;
    }

    .yuan4 {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 220px;
        bottom: 200px;
    }

    .yuan5 {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 1px;
        bottom: 193px;
    }

    .yuan6 {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 94px;
        bottom: 276px;
    }

    .yuan7 {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 3px;
        bottom: 283px;
    }

    .yuan8 {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 187px;
        bottom: 283px;
    }

    .yuan9 {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 57px;
        bottom: 343px;
    }

    .yuan10 {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 198px;
        bottom: 364px;
    }

    .yuan11 {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 38px;
        bottom: 440px;
    }

    .yuan12 {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 113px;
        bottom: 471px;
    }

    .yuan13 {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 228px;
        bottom: 466px;
    }

    .active {
        cursor: pointer;
    }
    .quan1 {
        width: 50px;
        height: 50px;
        position: absolute;
        right: 8px;
        bottom: 87px;
    }

    .quan2 {
        width: 50px;
        height: 50px;
        position: absolute;
        right: 111px;
        bottom: 282px;
    }

    .quan3 {
        width: 50px;
        height: 50px;
        position: absolute;
        right: 1px;
        bottom: 292px;
    }

    .quan4 {
        width: 50px;
        height: 50px;
        position: absolute;
        right: 104px;
        bottom: 376px;
    }

    .quan5 {
        width: 50px;
        height: 50px;
        position: absolute;
        right: 12px;
        bottom: 429px;
    }


    @keyframes warns {
        0% {
            transform: scale(0);
            opacity: 1
        }
        100% {
            transform: scale(1);
            opacity: 0
        }
    }

    .area-box {

    }

    .dot {
        width: 10px;
        height: 10px;
        background: #4E6D38;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }


    .area-box .pulse {
        position: absolute;
        top: -6px;
        left: -6px;
        height: 50px;
        width: 50px;
        border: 6px solid #4E6D38;
        border-radius: 48px;
        box-shadow: 0 0 4px #82878f, 0 0 10px #82878f inset;
        opacity: .12;
        filter: alpha(opacity=0);
        animation: warns 2s ease-out both;
        animation-iteration-count: infinite;
        background: 0 0;
        /*border-color:#f90;*/
    }

    .area-box .delay-08 {
        animation-delay: -.4s
    }

    .area-box .delay-09 {
        animation-delay: -.8s
    }

    .area-box .delay-10 {
        animation-delay: -1.2s
    }

    .yuan_list {
        width: 100%;
        height: 100%;
    }

    .text_list {
        width: 80px;
        height: 16px;
        font-family: SourceHanSansSC-Normal;
        font-size: 14px;
        color: #FFFFFF;
        line-height: 16px;
        position: absolute;
        left: 50%;
        bottom: -40%;
        transform: translateX(-50%);
        text-align: center;
        line-height: 16px;
    }


    /*右边的部分*/
    .right{
        width: 228px;
        height: 463px;
    }

    .buttonBox {
        width: 228px;
        height: 94px;
        position: absolute;
        bottom: 7.1%;
        right: 2.3%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        align-content: center;
        z-index: 99;
    }

    .an_niu {
        width: 228px;
        height: 38px;
        cursor: pointer;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        border-radius: 21px;
        font-family: SourceHanSansSC-Medium;
        font-size: 14px;
        color: #000000;
        text-align: center;
        line-height: 38px;
    }

    .checked {
        background: #0291FF;
        border-radius: 21px;
        color: #fff;
    }

    .textBox {
        width: 228px;
        height: 156px;
        position: absolute;
        right: 2.3%;
        top: 16%;
        margin-bottom: 10px;
    }

    .img_title {
        width: 228px;
        height: 24px;
        font-family: SourceHanSansSC-Medium;
        font-size: 16px;
        color: #FFFFFF;
        text-align: center;
        line-height: 24px;
        position: absolute;
        top: 5%;
    }

    .img_area {
        width: 196px;
        height: 111px;
        ont-family: SourceHanSansSC-Regular;
        font-size: 14px;
        color: #FFFFFF;
        text-align: left;
        line-height: 20px;
        position: absolute;
        left: 50%;
        top: 25.1%;
        transform: translateX(-50%);
    }

    /*轮播图的样式*/
    .main {
        width: 228px;
        height: 176px;
        position: absolute;
        top: 44.1%;
        right: 2.3%;
        margin-bottom: 10px;
    }

    .swiper-container {
        width: 228px;
        height: 176px;
    }

    .swiper-wrapper {
        width: 228px;
        height: 146px;
    }

    .swiper-button-next {
        border: none;
        display: none;
        outline: 0 none !important;
        blr: expression(this.onFocus=this.blur());
        margin-top: auto !important;
    }

    .swiper-button-prev {
        border: none;
        display: none;
        outline: 0 none !important;
        blr: expression(this.onFocus=this.blur());
        margin-top: auto !important;
    }

    .btn_left {
        background-image: none;
        display: block;
        border: none;
        width: 25px;
        height: 25px;
        position: absolute;
        top: 38%;
        left: 4px;
    }

    .btn_right {
        background-image: none;
        display: block;
        border: none;
        width: 25px;
        height: 25px;
        position: absolute;
        top: 38%;
        right: 4px;
    }

    .swiper-pagination {
        margin-bottom: -1%;
    }

    .swiper-pagination >>> .swiper-pagination-bullet {
        background: #fff !important;
        opacity: 1 !important;
        outline: 0 none !important;
        margin-right: 10px;
        blr: expression(this.onFocus=this.blur());
    }

    .swiper-pagination >>> .swiper-pagination-bullet-active {
        opacity: 1 !important;
        background: #007aff !important;
        width: 30px;
        height: 8px;
        display: inline-block;
        border-radius: 8px;
        outline: 0 none !important;
        blr: expression(this.onFocus=this.blur());
    }


    /*适配各种设备*/
    @media ( max-height: 500px) {
        .btn .btn_3 {
            width: 128px;
        }
    }
    @media ( max-height: 300px) {
        .btn .btn_3 {
            width: 128px;
        }
        button {
            padding: 13px 3px 11px 3px;
        }
    }
    @media (min-height: 229px) and (max-height:361px) {
        .textBox {
            height: 146px;
        }
    }

    @media (height:844px) {
        .textBox {
            top: 12%;
        }
        .main{
            top: 41%;
        }
    }
    @media (height:698px) {
        .img_area{
            font-size: 10px;
            line-height: 20px;
            top: 20.1%;
        }
    }
    @media (height:375px) {
        .img_area {
            font-size: 10px;
            line-height: 16px;
        }
    }

</style>
<style>
    @media (max-height: 450px) {
        .control_div_resetBtn {
            position: absolute;
            right: 0!important;
            top: 0!important;
            transform: scale(0.6);
        }
    }
</style>