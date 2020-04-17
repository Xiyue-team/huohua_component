<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9" >
        <fullScreensLayout  >
            <template slot="viewBox" slot-scope="viewBox"  >
                <div class="content"  >
                    <div id="title" class="title_text" >{{title}}</div>
                    <img class="backGround"  src="./sub_static/UI/0.png" >
                    <div class="startImg" v-show="showStart" :style="{zoom:zoom1}">
                        <img src="./sub_static/UI/start.png" style="width: 100%;height: 100%">
                    </div>
                    <div class="buttonBox" id="buttonBox"  >
                        <button :class="{an_niu: have, 'bulecomplete': index === ishave}"
                                v-for="(item, index) in textArr"
                                :key="index"
                                :id="'index' + index"
                                v-text="item"
                                @click="getEvent(index)"
                        ></button>
                    </div>
                    <!--轮播图-->
                    <div class="main" :style="{zoom:zoom1}" v-show="showSwiper">
                        <div class="swiper-container " id="swiper-container"   @mouseover="getChange"  @mouseout="getChange1" >
                            <div class="swiper-wrapper"   id="swiper-wrapper" >
                                <div class="swiper-slide" id="swiper-slide" >
                                    <img  :src="one" alt="" style="width: 100%;height: auto"/>
                                    <div class="one_title" >{{one_title}} </div>
                                </div>
                                <div class="swiper-slide" >
                                    <img  :src="two" alt="" style="width: 100%;height: auto"/>
                                    <div class="two_title" >{{two_title}} </div>
                                </div>
                                <div class="swiper-slide" >
                                    <img  :src="three" alt="" style="width: 100%;height: auto"/>
                                    <div class="three_title" >{{three_title}} </div>
                                </div>
                            </div>
                            <!-- Optional controls 轮播控件-->
                            <div class="swiper-pagination" ></div>
                            <!--左右的切图按钮-->
                            <div class="swiper-button-prev btn_left"  id="swiper-button-prev" slot="button-prev"><img
                                    src="./sub_static/UI/b1.png" style="width: 100%;height: 100%"></div>
                            <div class="swiper-button-next  btn_right" id="swiper-button-next" slot="button-next"><img
                                    src="./sub_static/UI/b2.png" style="width: 100%;height: 100%"></div>
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

<style scoped>
    *{
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
    img{
        pointer-events: none;
        vertical-align: middle;
        width: 100%;
        height: 100%;
    }
    .title_text {
        position: absolute;
        top: 3.6%;
        left: 2.3%;
        z-index: 9;
        text-align: justify;
        color: #FFFFFF;
        font-family: SourceHanSansSC-Medium;
        font-size: 28px;
        line-height: 28px;
    }

    .content{
        width: 100%;
        height: 100%;
    }
    .backGround{
        width: 100%;
        height: 100%;
    }
    .startImg{
        width: 768px;
        height: 426px;
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .buttonBox{
        width: 120px;
        height: 222px;
        position: absolute;
        top: 50%;
        right: 2.3%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        align-content: center;
        z-index: 2000;
    }
    .an_niu{
        width: 120px;
        height: 38px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        text-align: center;
        border-radius: 19px;
        cursor: pointer;
        display: flex;
        justify-content:center;
        align-items: center;
        font-family: SourceHanSansSC-Medium;
        font-size: 16px;
        color: #525252;
        line-height: 16px;
    }
    .bulecomplete{
        background: #0291FF;
        border: 1px solid #EBEBEB;
        border-radius: 19px;
        color: #FFFFFF;
    }
    /*轮播图的样式*/
    .main{
        width: 100%;
        height: 100%;
        position: absolute;
        left:0;
        top: 0;
    }
    .swiper-container {
        /*width: 768px;*/
        /*height: 100%;*/
        /*position: absolute;*/
        /*left: 8.6%;*/
        /*display: -webkit-flex; !* Safari *!*/
        /*display: flex;*/
        /*justify-content:center;*/
        /*align-items: center;*/
        margin: auto;
        width: 768px;
        height: 100%;
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content:center;
        align-items: center;
    }
    .swiper-wrapper {
        /*width: 768px;*/
        /*height: 426px;*/
        /*position: absolute;*/
        width: 768px;
        height: 426px;
        margin: auto;
    }

    .swiper-button-next{
        border: none;
        display: none;
        outline:0 none !important;
        blr:expression(this.onFocus=this.blur());
        margin-top: auto!important;
    }
    .swiper-button-prev{
        border: none;
        display: none;
        outline:0 none !important;
        blr:expression(this.onFocus=this.blur());
        margin-top: auto!important;
    }
    .btn_left{
        background-image: none;
        display: block;
        border: none;
        width: 44px;
        height: 44px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .btn_right{
        background-image: none;
        display: block;
        border: none;
        width: 44px;
        height: 44px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .swiper-pagination {
        margin-bottom:4% ;
    }
    .swiper-pagination>>> .swiper-pagination-bullet{
        background: #fff!important;
        opacity: 1!important;
        outline:0 none !important;
        margin-right:10px ;
        blr:expression(this.onFocus=this.blur());
    }
    .swiper-pagination>>> .swiper-pagination-bullet-active {
        opacity: 1!important;
        background: #007aff!important;
        width: 30px;
        height: 8px;
        display: inline-block;
        border-radius:8px;
        outline:0 none !important;
        blr:expression(this.onFocus=this.blur());
    }
    .one_title,.two_title,.three_title{
        ont-family: SourceHanSansSC-Medium;
        font-size: 26px;
        color: #FFFFFF;
        text-align: justify;
        line-height: 24px;
        position: absolute;
        left: 2.3%;
        bottom: 6.2%;
    }

    /*适配各种设备*/
    @media (min-width: 1300px)  {

    }



    @media (min-width: 800px)  and   (max-width: 860px) {

    }
    @media (max-height: 450px) {
        .control_div_resetBtn {
            right: 0;
            top: 0;
            transform: scale(0.6);
        }
    }
</style>

