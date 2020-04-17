<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9" >
        <fullScreensLayout  >
            <template slot="viewBox" slot-scope="viewBox"  >
                <div class="content"  >
                    <div id="title" class="title_text" v-show="showTitle">{{title}}</div>
                    <img class="backGround"  src="./sub_static/UI/0.jpg" v-show="isShow_bg">
                    <div class="btn" @mouseover="getChange1" @mouseout="getChange" id="btn" >
                        <div class="btn-first "  :class="{checked:isChecked1}" @click="getEvent(1)">
                            <button :class="{checked:isChecked1}"  >{{buttonTitle[0]}}</button>
                        </div>
                        <div class="btn-second"   @click="getEvent(2)">
                            <button  :class="{checked:isChecked2}" >{{buttonTitle[1]}}</button>
                        </div>
                    </div>
                    <!--轮播图-->
                    <div class="swiper-container " id="swiper-container" v-show="isShow_sw" >
                        <div class="swiper-wrapper"  >
                            <div class="swiper-slide" >
                                <img  :src="one" alt="" style="bottom: 0px"/>
                                <div class="img_title">{{one_title}}</div>
                                <div class="imgageBox1_bz" v-show="show_bz" >
                                    <div class='btn_list_box' @click="isShow1_tk=!isShow1_tk"  v-if="!isShow1_tk">
                                        <div class="btn_list"></div>
                                    </div>
                                    <div class="list" v-show="isShow1_tk">
                                        <img src="./sub_static/UI/1-1.png" style="width: 100%;height: 100%">
                                        <div class="list_title0">{{buttonTitle[2]}}</div>
                                        <div class="list_title2">{{buttonTitle[4]}}</div>
                                        <div class="del" @click="isShow1_tk=!isShow1_tk"></div>
                                    </div>
                                </div>
                                <div class="imgageBox1_lz"  v-show="show_lz" :style="{zoom: zoom1}">
                                    <div class='btn_list_box' @click="isShow1_tk=!isShow1_tk" v-if="!isShow1_tk">
                                        <div class="btn_list"></div>
                                    </div>
                                    <div class="list" v-show="isShow1_tk">
                                        <img src="./sub_static/UI/5-1.png" style="width: 100%;height: 100%">
                                        <div class="list_title0">{{buttonTitle[5]}}</div>
                                        <div class="list_title1">{{buttonTitle[6]}}</div>
                                        <div class="list_title2">{{buttonTitle[7]}}</div>
                                        <div class="list_title3">{{buttonTitle[8]}}</div>
                                        <div class="list_title4">{{buttonTitle[9]}}</div>
                                        <div class="del" @click="isShow1_tk=!isShow1_tk"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide" >
                                <img  :src="two" alt="" />
                                <div class="img_title">{{two_title}}</div>
                                <div class="imgageBox2_bz" v-show="show_bz" :style="{zoom: zoom1}">
                                    <div class='btn_list_box' @click="isShow2_tk=!isShow2_tk" v-if="!isShow2_tk">
                                        <div class="btn_list"></div>
                                    </div>
                                    <div class="list" v-show="isShow2_tk">
                                        <img src="./sub_static/UI/2-1.png" style="width: 100%;height: 100%">
                                        <div class="list_title0">{{buttonTitle[10]}}</div>
                                        <div class="list_title1">{{buttonTitle[11]}}</div>
                                        <div class="del" @click="isShow2_tk=!isShow2_tk"></div>
                                    </div>
                                </div>
                                <div class="imgageBox2_lz" v-show="show_lz" :style="{zoom: zoom1}">
                                    <div class='btn_list_box' @click="isShow2_tk=!isShow2_tk" v-if="!isShow2_tk">
                                        <div class="btn_list"></div>
                                    </div>
                                    <div class="list" v-show="isShow2_tk">
                                        <img src="./sub_static/UI/6-1.png" style="width: 100%;height: 100%">
                                        <div class="list_title0">{{buttonTitle[12]}}</div>
                                        <div class="list_title1">{{buttonTitle[13]}}</div>
                                        <div class="list_title2">{{buttonTitle[14]}}</div>
                                        <div class="del" @click="isShow2_tk=!isShow2_tk"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide" >
                                <img  :src="three" alt="" />
                                <div class="img_title">{{three_title}}</div>
                                <div class="imgageBox3_bz" v-show="show_bz" :style="{zoom: zoom1}">
                                    <div class='btn_list_box' @click="isShow3_tk=!isShow3_tk" v-if="!isShow3_tk">
                                        <div class="btn_list"></div>
                                    </div>
                                    <div class="list" v-show="isShow3_tk">
                                        <img src="./sub_static/UI/3-1.png" style="width: 100%;height: 100%">
                                        <div class="list_title0">{{buttonTitle[15]}}</div>
                                        <div class="list_title1">{{buttonTitle[16]}}</div>
                                        <div class="del" @click="isShow3_tk=!isShow3_tk"></div>
                                    </div>
                                </div>
                                <div class="imgageBox3_lz" v-show="show_lz" :style="{zoom: zoom1}">
                                    <div class='btn_list_box' @click="isShow3_tk=!isShow3_tk" v-if="!isShow3_tk">
                                        <div class="btn_list"></div>
                                    </div>
                                    <div class="list" v-show="isShow3_tk" >
                                        <img src="./sub_static/UI/7-1.png" style="width: 100%;height: 100%">
                                        <div class="list_title0">{{buttonTitle[17]}}</div>
                                        <div class="list_title1">{{buttonTitle[18]}}</div>
                                        <div class="list_title2">{{buttonTitle[19]}}</div>
                                        <div class="del" @click="isShow3_tk=!isShow3_tk"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide" >
                                <img  :src="four" alt="" />
                                <div class="img_title">{{four_title}}</div>
                                <div class="imgageBox4_bz" v-show="show_bz" :style="{zoom: zoom1}">
                                    <div class='btn_list_box' @click="isShow4_tk=!isShow4_tk" v-if="!isShow4_tk">
                                        <div class="btn_list"></div>
                                    </div>
                                    <div class="list" v-show="isShow4_tk">
                                        <img src="./sub_static/UI/4-1.png" style="width: 100%;height: 100%">
                                        <div class="list_title0">{{buttonTitle[20]}}</div>
                                        <div class="list_title1">{{buttonTitle[21]}}</div>
                                        <div class="del" @click="isShow4_tk=!isShow4_tk"></div>
                                    </div>
                                </div>
                                <div class="imgageBox4_lz" v-show="show_lz" :style="{zoom: zoom1}">
                                    <div class='btn_list_box' @click="isShow4_tk=!isShow4_tk" v-if="!isShow4_tk">
                                        <div class="btn_list"></div>
                                    </div>
                                    <div class="list" v-show="isShow4_tk">
                                        <img src="./sub_static/UI/8-1.png" style="width: 100%;height: 100%">
                                        <div class="list_title0">{{buttonTitle[22]}}</div>
                                        <div class="list_title1">{{buttonTitle[23]}}</div>
                                        <div class="list_title2">{{buttonTitle[24]}}</div>
                                        <div class="del" @click="isShow4_tk=!isShow4_tk"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Optional controls 轮播控件-->
                        <div class="swiper-pagination" ></div>
                        <div class="swiper-button-prev btn_left"  id="swiper-button-prev" slot="button-prev"><img
                                src="./sub_static/UI/10.png" style="width: 100%;height: 100%"></div>
                        <div class="swiper-button-next  btn_right" id="swiper-button-next" slot="button-next"><img
                                src="./sub_static/UI/11.png" style="width: 100%;height: 100%"></div>
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

    }
    .title_text {
        position: absolute;
        top: 3.6%;
        left: 2.3%;
        z-index: 9;
        font-size: 24px;
        line-height: 24px;
        text-align: justify;
        color: #FFFFFF;
    }
    .img_title{
        position: absolute;
        bottom: 90.1%;
        left: 2.3%;
        z-index: 9;
        font-size: 24px;
        line-height: 24px;
        text-align: justify;
        color: #FFFFFF;
    }
    .content{
        width: 100%;
        height: 100%;
    }
    .backGround{
        width: 100%;
        height: auto;
    }
    .swiper-slide{
        width: 100%;
        height: 100%;
    }
    .swiper-slide>img{
        width: 100%;
        height: auto;
    }
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
        padding: 11px 0px;
        font-size: 14px;
        color: #000000;
        line-height: 14px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
    }
    .btn-second>button{
        width: 100%;
        border-radius: 19px;
        padding: 11px 0px;
        font-size: 14px;
        color: #000000;
        line-height: 14px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
    }
    .btn  .checked{
        background: #0291FF;
        border-radius: 19px;
        color: #fff;
    }
    .swiper-container {
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0px;
        left: 0;
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content:center;
        align-items: center;
    }
    .swiper-wrapper {
        width: 100%;
        height: auto;
    }
    .swiper-pagination {
        margin-bottom: 1%;
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
        display: none;
        border: none;
        width: 46px;
        height: 60px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .btn_right{
        background-image: none;
        display: none;
        border: none;
        width: 46px;
        height: 60px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .swiper-pagination>>> .swiper-pagination-bullet{
        background: #fff!important;
        opacity: 1!important;
        outline:0 none !important;
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
    /*每张图片里面的按钮的样式*/
    /*被子植物*/
    /*1被子植物*/
    .imgageBox1_bz{
        position: absolute;
        width: 588px;
        height: 315px;
        top: 62.5%;
        left: 33.5%;
    }
    .imgageBox1_bz  .btn_list_box{
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .imgageBox1_bz .btn_list{
        width: 16px;
        height: 16px;
        border-radius: 100%;
        background: #0199FF;
        border: 3px solid #FFFFFF;
        box-shadow: 0 0 10px 0 #FFFFFF;
        position: absolute;
    }
    .imgageBox1_bz>.list{
        width: 588px;
        height: 315px;
        position: absolute;
        top:-55.5%;
        left: -4.2%;
    }
    .imgageBox1_bz .list>.list_title0{
        font-size: 20px;
        color: #000;
        text-align: justify;
        position: absolute;
        top: 24px;
        left: 181px;
    }

    .imgageBox1_bz .list>.list_title2{
        font-size: 18px;
        color: #000;
        text-align: justify;
        position: absolute;
        right: 78px;
        bottom: 140px;
    }
    .imgageBox1_bz .list>.del{
        position: absolute;
        top: 10.5px;
        right:-7px;
        width:42.5px;
        height: 42.5px;
        cursor: pointer;
    }
    /*2被子植物*/
    .imgageBox2_bz{
        position: absolute;
        width: 691px;
        height: 315px;
        top: 41.5%;
        left: 18.4%;
    }
    .imgageBox2_bz  .btn_list_box{
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .imgageBox2_bz  .btn_list{
        width: 16px;
        height: 16px;
        border-radius: 100%;
        background: #0199FF;
        border: 3px solid #FFFFFF;
        box-shadow: 0 0 10px 0 #FFFFFF;
        position: absolute;
        cursor: pointer;
    }
    .imgageBox2_bz>.list{
        width: 691px;
        height: 315px;
        position: absolute;
        top:-46.55%;
        left: -11.1%;
    }
    .imgageBox2_bz .list>.list_title0{
        font-size: 20px;
        color: #000;
        text-align: justify;
        position: absolute;
        top: 24px;
        left: 278px;
    }
    .imgageBox2_bz .list>.list_title1{
        font-size: 18px;
        color: #000;
        text-align: justify;
        position: absolute;
        right: 99px;
        bottom: 131px;
    }
    .imgageBox2_bz .list>.del{
        position: absolute;
        top: 10.5px;
        right:-7px;
        width:42.5px;
        height: 42.5px;
        cursor: pointer;
    }
    /*3被子植物*/
    .imgageBox3_bz{
        position: absolute;
        width: 752px;
        height: 315px;
        top: 36.3%;
        left: 30.8%;
    }
    .imgageBox3_bz  .btn_list_box{
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .imgageBox3_bz  .btn_list{
        width: 16px;
        height: 16px;
        border-radius: 100%;
        background: #0199FF;
        border: 3px solid #FFFFFF;
        box-shadow: 0 0 10px 0 #FFFFFF;
        position: absolute;
        cursor: pointer;
    }
    .imgageBox3_bz>.list{
        width: 752px;
        height: 315px;
        position: absolute;
        top:-42.4%;
        left: -13.9%;
    }
    .imgageBox3_bz .list>.list_title0{

        font-size: 20px;
        color: #000000;
        text-align: justify;
        position: absolute;
        top: 24px;
        left: 343px;
    }
    .imgageBox3_bz .list>.list_title1{
        font-size: 18px;
        color: #000000;
        text-align: justify;
        position: absolute;
        right: 74px;
        bottom: 52px;
    }
    .imgageBox3_bz .list>.del{
        position: absolute;
        top: 10.5px;
        right:-7px;
        width:42.5px;
        height: 42.5px;
        cursor: pointer;
    }
    /*4被子植物*/
    .imgageBox4_bz{
        position: absolute;
        width: 523px;
        height: 403px;
        top: 73%;
        left: 43.5%;
    }
    .imgageBox4_bz  .btn_list_box{
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .imgageBox4_bz   .btn_list{
        width: 16px;
        height: 16px;
        border-radius: 100%;
        background: #0199FF;
        border: 3px solid #FFFFFF;
        box-shadow: 0 0 10px 0 #FFFFFF;
        position: absolute;
        cursor: pointer;
    }
    .imgageBox4_bz>.list{
        width: 523px;
        height: 403px;
        position: absolute;
        top:-81.9%;
        left: -4.7%;
    }
    .imgageBox4_bz .list>.list_title0{
        font-size: 20px;
        color: #000000;
        text-align: justify;
        position: absolute;
        top: 24px;
        left: 114px;
    }
    .imgageBox4_bz .list>.list_title1{
        font-size: 18px;
        color: #000000;
        text-align: justify;
        position: absolute;
        right: 91px;
        bottom: 156px;
    }
    .imgageBox4_bz .list>.del{
        position: absolute;
        top: 10.5px;
        right:-7px;
        width:42.5px;
        height: 42.5px;
        cursor: pointer;
    }

    /*裸子植物*/
    /*1裸子植物*/
    .imgageBox1_lz{
        position: absolute;
        width: 589px;
        height: 395px;
        top: 48%;
        left: 30%;
    }
    .imgageBox1_lz  .btn_list_box{
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .imgageBox1_lz  .btn_list{
        width: 16px;
        height: 16px;
        border-radius: 100%;
        background: #0199FF;
        border: 3px solid #FFFFFF;
        box-shadow: 0 0 10px 0 #FFFFFF;
        position: absolute;
        cursor: pointer;
    }
    .imgageBox1_lz>.list{
        width: 589px;
        height: 395px;
        position: absolute;
        top:-42.2%;
        left: -5.0%;
    }
    .imgageBox1_lz .list>.list_title0{
        font-size: 20px;
        color: #000000;
        text-align: justify;
        position: absolute;
        top: 22px;
        left: 210px;
    }
    .imgageBox1_lz .list>.list_title1{
        font-size: 18px;
        color: #000000;
        text-align: justify;
        position: absolute;
        top: 82px;
        left: 222px;
    }
    .imgageBox1_lz .list>.list_title2{
        font-size: 18px;
        color: #000000;
        text-align: justify;
        position: absolute;
        top: 134px;
        left:222px;
    }
    .imgageBox1_lz .list>.list_title3{
        font-size: 18px;
        color: #000000;
        text-align: justify;
        position: absolute;
        top: 244px;
        left:223px;
    }
    .imgageBox1_lz .list>.list_title4{
        font-size: 18px;
        color: #000000;
        text-align: justify;
        position: absolute;
        top: 272px;
        left:304px;
    }
    .imgageBox1_lz .list>.del{
        position: absolute;
        top: 10.5px;
        right:-7px;
        width:42.5px;
        height: 42.5px;
        cursor: pointer;
    }
    /*2裸子植物*/
    .imgageBox2_lz{
        position: absolute;
        width: 636px;
        height: 315px;
        top: 46.3%;
        left: 32.5%;
    }
    .imgageBox2_lz  .btn_list_box{
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .imgageBox2_lz  .btn_list{
        width: 16px;
        height: 16px;
        border-radius: 100%;
        background: #0199FF;
        border: 3px solid #FFFFFF;
        box-shadow: 0 0 10px 0 #FFFFFF;
        position: absolute;
        cursor: pointer;
    }
    .imgageBox2_lz>.list{
        width: 636px;
        height: 315px;
        position: absolute;
        top:-56.5%;
        left: -5.8%;
    }
    .imgageBox2_lz .list>.list_title0{
        font-size: 20px;
        color: #000000;
        text-align: justify;
        position: absolute;
        top: 23px;
        left: 224px;
    }
    .imgageBox2_lz .list>.list_title1{
        font-size: 18px;
        color: #000000;
        text-align: justify;
        position: absolute;
        top: 218px;
        right: 110px;
    }
    .imgageBox2_lz .list>.list_title2{
        font-size: 18px;
        color: #000000;
        text-align: justify;
        position: absolute;
        right: 68px;
        top: 194px;
    }
    .imgageBox2_lz .list>.del{
        position: absolute;
        top: 10.5px;
        right:-7px;
        width:42.5px;
        height: 42.5px;
        cursor: pointer;
    }
    /*3裸子植物*/
    .imgageBox3_lz{
        position: absolute;
        width: 539px;
        height: 315px;
        top: 49%;
        left: 38.6%;
    }
    .imgageBox3_lz  .btn_list_box{
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .imgageBox3_lz  .btn_list{
        width: 16px;
        height: 16px;
        border-radius: 100%;
        background: #0199FF;
        border: 3px solid #FFFFFF;
        box-shadow: 0 0 10px 0 #FFFFFF;
        position: absolute;
        cursor: pointer;
    }
    .imgageBox3_lz>.list{
        width: 539px;
        height: 315px;
        position: absolute;
        top:-51.8%;
        left: -6.8%;
    }
    .imgageBox3_lz .list>.list_title0{
        font-size: 18px;
        color: #000;
        text-align: justify;
        position: absolute;
        right: 68px;
        bottom: 212px;
    }
    .imgageBox3_lz .list>.list_title1{
        font-size: 18px;
        color: #000;
        text-align: justify;
        position: absolute;
        right: 68px;
        bottom: 166px;
    }
    .imgageBox3_lz .list>.list_title2{
        font-size: 20px;
        color: #000;
        text-align: justify;
        position: absolute;
        right: 73px;
        bottom: 26px;
    }
    .imgageBox3_lz .list>.del{
        position: absolute;
        top: 10.5px;
        right:-7px;
        width:42.5px;
        height: 42.5px;
        cursor: pointer;
    }
    /*4裸子植物*/
    .imgageBox4_lz{
        position: absolute;
        width: 663px;
        height: 315px;
        top: 40%;
        left: 38%;
    }
    .imgageBox4_lz  .btn_list_box{
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .imgageBox4_lz  .btn_list{
        width: 16px;
        height: 16px;
        border-radius: 100%;
        background: #0199FF;
        border: 3px solid #FFFFFF;
        box-shadow: 0 0 10px 0 #FFFFFF;
        position: absolute;
        cursor: pointer;
    }
    .imgageBox4_lz>.list{
        width: 663px;
        height: 315px;
        position: absolute;
        top:-49.9%;
        left: -9.5%;
    }
    .imgageBox4_lz .list>.list_title0{
        font-size: 18px;
        color: #FFFFFF;
        text-align: justify;
        position: absolute;
        top: 184px;
        left: 279px;
    }
    .imgageBox4_lz .list>.list_title1{
        font-size: 18px;
        color: #FFFFFF;
        text-align: justify;
        position: absolute;
        top: 155px;
        left: 255px;
    }
    .imgageBox4_lz .list>.list_title2{
        font-size: 20px;
        color: #FFFFFF;
        text-align: justify;
        position: absolute;
        right: 78px;
        bottom: 25px;
    }
    .imgageBox4_lz .list>.del{
        position: absolute;
        top: 10.5px;
        right:-7px;
        width:42.5px;
        height: 42.5px;
        cursor: pointer;
    }
    /*适配各种设备*/
    @media (width: 1024px)  and   (height: 768px) {
        .swiper-container {
            width: 100%;
            height: 100%;
        }
        .swiper-slide>img{
            width: 100%;
            height: 100%;
        }
        .swiper-wrapper {
            width: 100%;
            height: 100%;
        }
        .backGround{
            width: 100%!important;
            height:100%!important;
        }
        .imgageBox1_bz{
            top: 63.5%;
        }
        .imgageBox4_bz{
            top: 75%;
        }
        .imgageBox1_lz{
            top: 48%;
        }
        .imgageBox2_lz{
            top: 47%;
        }
        .imgageBox4_lz{
            top: 45.2%;
        }
    }
    @media (max-height: 450px) {
        #btn{
            position: absolute;
            bottom:0px;
            right:0px;
        }
    }
    @media (max-height: 361px) {
        #btn{
            position: absolute;
            bottom:-10px;
            right:-15px;
        }
    }
    @media  (height: 510px) {
        .swiper-container {
            width: 100%;
            height: 100%;
        }
        .swiper-slide > img {
            width: 100%;
            height: 100%;
        }
        .swiper-wrapper {
            width: 100%;
            height: 100%;
        }
        .backGround {
            width: 100% !important;
            height: 100% !important;
        }
    }
    @media  (height: 534px) {
        .swiper-slide > img {
            width: 100%;
            height: 100%;
        }
        .backGround {
            width: 100% !important;
            height: 100% !important;
        }
        .swiper-wrapper {
            width: 100%;
            height: 100%;
        }
    }
    @media (width: 1226px) and (height: 800px) {
        .swiper-slide > img {
            width: 100%;
            height: 100%;
        }
        .backGround {
            width: 100% !important;
            height: 100% !important;
        }
        .swiper-wrapper {
            width: 100%;
            height: 100%;
        }
    }
    @media (width: 1280px) and (height: 800px) {
        .swiper-slide > img {
            width: 100%;
            height: 100%;
        }
        .backGround {
            width: 100% !important;
            height: 100% !important;
        }
        .swiper-wrapper {
            width: 100%;
            height: 100%;
        }
    }
    @media (width: 1024px) and (height: 698px) {
        .swiper-slide > img {
            width: 100%;
            height: 100%;
        }
        .backGround {
            width: 100% !important;
            height: 100% !important;
        }
        .swiper-wrapper {
            width: 100%;
            height: 100%;
        }
        .imgageBox1_bz{
            transform: translate(-2%,-2%);
        }
        .imgageBox2_bz{
            transform: translate(-2%,-2%);
        }
        .imgageBox3_bz{
            transform: translate(-2%,-2%);
        }
        .imgageBox4_bz{
            transform: translate(-2%,-2%);
        }
        .imgageBox1_lz{
            transform: translate(-2%,-2%);
        }
        .imgageBox2_lz{
            transform: translate(-2%,-2%);
        }
        .imgageBox3_lz{
            transform: translate(-2%,-2%);
        }
        .imgageBox4_lz{
            transform: translate(-2%,-2%);
        }
    }
    @media (width: 1280px) and (height: 727px) {
        .swiper-slide > img {
            width: 100%;
            height: 100%;
        }
        .backGround {
            width: 100% !important;
            height: 100% !important;
        }
        .swiper-wrapper {
            width: 100%;
            height: 100%;
        }
    }
    @media (width: 1280px) and (height: 836px) {
        .swiper-slide > img {
            width: 100%;
            height: 100%;
        }
        .backGround {
            width: 100% !important;
            height: 100% !important;
        }
        .swiper-wrapper {
            width: 100%;
            height: 100%;
        }
    }
     @media (height: 960px) {
        .swiper-slide > img {
            width: 100%;
            height: 100%;
        }
        .backGround {
            width: 100% !important;
            height: 100% !important;
        }
        .swiper-wrapper {
            width: 100%;
            height: 100%;
        }
        .imgageBox4_lz {
            position: absolute;
            width: 663px;
            height: 315px;
            top: 40%;
            left: 37%;
        }
    }
    @media (width: 1231px) {
        .swiper-slide > img {
            width: 100%;
            height: 100%;
        }
        .backGround {
            width: 100% !important;
            height: 100% !important;
        }
        .swiper-wrapper {
            width: 100%;
            height: 100%;
        }
    }
    @media (height: 800px) {
        .swiper-slide > img {
            width: 100%;
            height: 100%;
        }
        .backGround {
            width: 100% !important;
            height: 100% !important;
        }
        .swiper-wrapper {
            width: 100%;
            height: 100%;
        }
    }
</style>
<style>
    @media (max-height: 450px) {
        .control_div_resetBtn {
            right: 0;
            top: 0;
            transform: scale(0.6);
        }
    }
</style>
