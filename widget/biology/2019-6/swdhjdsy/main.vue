<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9" >
        <fullScreensLayout  >
            <template slot="viewBox" slot-scope="viewBox"  >
                <div class="content"  >
                    <div id="title" class="title_text" >{{title}}</div>
                    <img class="backGround"  src="./sub_static/UI/0.png" >
                    <div class="btn"  id="btn" >
                        <div class="btn-first "   @click="getEvent(1)">
                            <button :class="{checked:isChecked1}"  >{{buttonTitle[0]}}</button>
                        </div>
                        <div class="btn-second"   @click="getEvent(2)">
                            <button  :class="{checked:isChecked2}" >{{buttonTitle[1]}}</button>
                        </div>
                        <div class="btn-third" @click="getImages()">
                            <img src="./sub_static/UI/p1.png" v-if="!msg" style="width: 100%;height: 100%"  >
                            <img src="./sub_static/UI/p2.png" v-if="msg" style="width: 100%;height: 100%"  >
                        </div>
                    </div>
                    <!--轮播图-->
                    <div class="main" :style="{zoom:zoom1}">
                        <div class="swiper-container " id="swiper-container"   @mouseover="getChange" @mouseout="getChange1" >
                            <div class="swiper-wrapper"   id="swiper-wrapper" >
                                <div class="swiper-slide" id="swiper-slide" >
                                    <img  :src="one" alt="" style="width: 100%;height: auto"/>
                                </div>
                                <div class="swiper-slide" >
                                    <img  :src="two" alt="" style="width: 100%;height: auto"/>
                                </div>
                                <div class="swiper-slide" >
                                    <img  :src="three" alt="" style="width: 100%;height: auto"/>
                                </div>
                                <div class="swiper-slide" >
                                    <img  :src="four" alt="" style="width: 100%;height: auto"/>
                                </div>
                                <div class="swiper-slide" >
                                    <img  :src="five" alt="" style="width: 100%;height: auto"/>
                                </div>
                                <div class="swiper-slide" >
                                    <img  :src="six" alt="" style="width: 100%;height: auto"/>
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
    .btn{
        position: absolute;
        top: 41.9%;
        right: 2%;
        z-index:11 ;
        display: flex;
        flex-direction:column;
    }
    .btn-first{
        width: 88px;
        height: 44px;
        margin-bottom:22px ;
    }
    .btn-second{
        width: 88px;
        height: 44px;
        margin-bottom:22px ;
    }
    .btn-first>button{
        width: 100%;
        border-radius: 22px;
        padding: 11px 0px;
        font-size: 20px;
        color: #000000;
        line-height: 20px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
    }
    .btn-second>button{
        width: 100%;
        border-radius: 22px;
        padding: 11px 0px;
        font-size: 20px;
        color: #000000;
        line-height: 20px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
    }
    .btn  .checked{
        background: #0291FF;
        border-radius: 22px;
        color: #fff;
    }
    .btn-third{
        width: 52px;
        height: 52px;
        margin: 0 auto;
    }
    .main{
        width: 100%;
        height: 100%;
        position: absolute;
        left:0;
        top: 0;
    }
    .swiper-container {
        margin: auto;
        width: 938px;
        height: 100%;
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content:center;
        align-items: center;
    }
    .swiper-wrapper {
        width: 938px;
        height: 530px;
        margin: auto;
    }

    .swiper-button-next{
        border: none;
        display: none;
        outline:0 none !important;
        blr:expression(this.onFocus=this.blur());
    }
    .swiper-button-prev{
        border: none;
        display: none;
        outline:0 none !important;
        blr:expression(this.onFocus=this.blur());
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

    /*适配各种设备*/
    @media (min-width: 800px)  and   (max-width: 860px) {
         .swiper-container{
          transform: scale(0.9);
      }
        .swiper-pagination {
            transform: translateY(60%)!important;
        }
    }
</style>
<style>
    @font-face
    {
        font-family: fontt;
        src: url('sub_static/zt/SourceHanSansCN-Regular.otf')
    }
    * {
        font-family: fontt !important;
    }
    @media (max-height: 450px) {
        .control_div_resetBtn {
            right: 0;
            top: 0;
            transform: scale(0.6);
        }
    }
</style>
