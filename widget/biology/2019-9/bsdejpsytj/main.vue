<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div class='fullS' :style="{zoom:zoom1}">
                    <img src="./sub_static/UI/bj.png" style="width: 100%;height: 100%"/>
                    <div class="left">
                        <div :class="{one:have}" id="one">
                            <div class="oneImageContent "
                                 v-for="(item, index) in imgArr1"
                                 :key=index
                                 :id="'oneDiv' + index">
                                <img :src="item.src" v-show="item.src" id="leftImg" ondragstart="return false"
                                     style="width:auto;height: 200px" />
                                <img id="leftImg2"  :class="{ oneOpcity :have,twoOpcity:ischecked1}" style="width:auto;height: 200px;border:0" />
                                <img id="leftImg3" :class="{ oneOpcity3 :have,twoOpcity3:ischecked3}" style="width:auto;height: 200px;border:0"/>
                            </div>
                            <div :class="{bianKuang:have,showKuang:ishave}"></div>
                            <div class="btn1" v-show="showBtn1" @click="clickBtn(1)">{{boxTitle[4]}}</div>
                            <div class="text1" v-show="showText1">{{msg1}}<br>{{msg2}}</div>
                            <div class="xian1" v-show="showXian1">
                                <div class="xian1_text" >{{boxTitle[5]}}</div>
                            </div>
                        </div>
                        <div :class="{two:have}" id="two">
                            <div class="twoImageContent "
                                 v-for="(item, index) in imgArr2"
                                 :key=index
                                 :id="'twoDiv' + index">
                                <img :src="item.src" v-show="item.src" id="rightImg" ondragstart="return false"
                                     style="width:auto;height: 200px;"/>
                                <img id="rightImg2"  :class="{ oneOpcity :have,twoOpcity:ischecked2}" style="width:auto;height: 200px;border:0" />
                                <img id="rightImg3"  :class="{ oneOpcity3 :have,twoOpcity3:ischecked4}" style="width:auto;height: 200px;border:0" />
                            </div>
                            <div :class="{bianKuang:have,showKuang:ishave}"></div>
                            <div class="btn2" v-show="showBtn2" @click="clickBtn(2)">{{boxTitle[4]}}</div>
                            <div class="text2" v-show="showText2">{{msg3}}<br>{{msg4}}</div>
                            <div class="xian2" v-show="showXian2">
                                <div class="xian2_text"  >{{boxTitle[5]}}</div>
                            </div>
                        </div>
                        <div class="bottom">
                            <img src="./sub_static/UI/bottom2.png" style="width: 100%;height: 100%"/>
                            <div class="tishi" v-if="tishi">{{tiShiTitle}}</div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="imgBox">
                            <!--框框里面的第一张图片及文字-->
                            <div class="chioceImgBox1" id="div1">
                                <img class="img" id="image0" src="./sub_static/UI/1.png"
                                     style="width:100%;height: 100%;"/>
                                <img class="img4" id="image4" src="./sub_static/UI/1.png"
                                     style="width:100%;height: 100%;"/>
                                <img class="img8" id="image8" src="./sub_static/UI/1.png"
                                     style="width:100%;height: 100% "/>
                                <div class="textText1">{{boxTitle[0]}}</div>
                            </div>
                            <!--框框里面的第二张图片及文字-->
                            <div class="chioceImgBox2" id="div2">
                                <img class="img" id="image1" src="./sub_static/UI/2.png"
                                     style="width:100%;height: 100% "/>
                                <img class="img5" id="image5" src="./sub_static/UI/2.png"
                                     style="width:100%;height: 100% "/>
                                <img class="img9" id="image9" src="./sub_static/UI/2.png"
                                     style="width:100%;height: 100% "/>
                                <div class="textText2">{{boxTitle[1]}}</div>
                            </div>
                            <!--框框里面的第三张图片及文字-->
                            <div class="chioceImgBox3" id="div3">
                                <img class="img" id="image2" :src="picture3" style="width:100%;height: 100% "/>
                                <img class="img6" id="image6" :src="picture3" style="width:100%;height: 100% "/>
                                <img class="img10" id="image10" :src="picture3" style="width:100%;height: 100% "/>
                                <div class="textText3">{{boxTitle[2]}}</div>
                            </div>
                            <!--框框里面的第四张图片及文字-->
                            <div class="chioceImgBox4" id="div4">
                                <img class="img" id="image3" :src="picture4" style="width:100%;height: 100% "/>
                                <img class="img7" id="image7" :src="picture4" style="width:100%;height: 100% "/>
                                <img class="img11" id="image11" :src="picture4" style="width:100%;height: 100% "/>
                                <div class="textText4">{{boxTitle[3]}}</div>
                            </div>
                            <div class="monban" v-show="showMonban"></div>
                        </div>
                    </div>
                </div>
                <div style="width: 100%; height: 100%" class="box">
                    <div id="3dContainer" style="margin: auto;width: 100%;height: 100%">
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
  import Vue from 'vue';
  import '../../../../src/assets/css/core.css';
  import '../../../../src/assets/css/layout.css';
  import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
  import Component from 'vue-class-component';
  import { MainVueComponent } from './mainVueComponent';

  @Component({
    components: {
      fullScreensLayout
    }
  })
  export default class App extends MainVueComponent {
  }
</script>

<style>
    img[src=""],
    img:not([src]) {
    opacity:0; 
    }
    .control-panel_div_floatRight {
        height: 0 !important;
    }

    .fullS {
        width: 100%;
        height: 100%;
    }

    .title_text {
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #FFFFFF;
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
    }

    .bottom > img {
        pointer-events: none;
    }

    /*左边的样式*/
    .left {
        width: 65.8%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    .one {
        width: 227px;
        height: 242px;
        position: absolute;
        left: 138px;
        bottom: 154px;
        border: none;        
    }
    .oneOpcity{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
        opacity: 0;
    }
    .twoOpcity{
        opacity: 1;
        transition: opacity 2s!important;
        border: 0!important;
    }
    .btn1{
        width: 96px;
        height: 38px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        border-radius: 21px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -61px;
        font-size: 14px;
        color: #525252;
        text-align: center;
        line-height: 38px;
        cursor: pointer;
    }
    .btn2{
        width: 96px;
        height: 38px;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        border-radius: 21px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -61px;
        font-size: 14px;
        color: #525252;
        text-align: center;
        line-height: 38px;
        cursor: pointer;
    }
    .text1{
        width: 108px;
        height: 44px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -61px;
        font-size: 18px;
        color: #FFFFFF;
        text-align: center;
        line-height: 22px;
        white-space: nowrap;
    }
    .xian1{
        width: 82px;
        height: 1px;
        background: #fff;
        transform: rotate(45deg);
        position: absolute;
        top: 151px;
        left: 23px;
    }
    .xian1_text{
        width: 36px;
        height: 22px;
        position: absolute;
        left: -50px;
        top: 12px;
        font-size: 18px;
        color: #FFFFFF;
        transform: rotate(-45deg);
        white-space: nowrap;
    }
    .two {
        width: 227px;
        height: 242px;
        position: absolute;
        left: 438px;
        bottom: 154px;
        border: none!important;
    }
    .text2{
        width: 108px;
        height: 44px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -61px;
        font-size: 18px;
        color: #FFFFFF;
        text-align: center;
        line-height: 22px;
        white-space: nowrap;
    }
    .xian2{
        width: 82px;
        height: 1px;
        background: #fff;
        transform: rotate(45deg);
        position: absolute;
        top: 151px;
        left: 23px;
    }
    .xian2_text{
        width: 36px;
        height: 22px;
        position: absolute;
        left: -50px;
        top: 12px;
        font-size: 18px;
        color: #FFFFFF;
        transform: rotate(-45deg);
        white-space: nowrap;
    }
    .oneOpcity3{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        opacity: 1;
    }
    .twoOpcity3{
        opacity: 0;
        transition: opacity 2s!important;
    }



    .bianKuang {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        border: 2px dashed #fff;
        opacity: 0!important;
    }

    .showKuang {
        opacity: 1!important;
    }

    .bottom {
        width: 644px;
        height: 94px;
        position: absolute;
        left: 78px;
        bottom: 92px;
    }


    .tishi {
        font-size: 20px;
        color: #D6D6D6;
        line-height: 20px;
        white-space: nowrap;
        position: absolute;
        top:-108.6%;
        left: 50%;
        transform: translateX(-50%);
    }

    .oneImageContent {
        width: auto;
        height: 200px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }

    .twoImageContent {
        width: auto;
        height: 200px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }


    /*右边的样式*/
    .right {
        width: 34.2%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
    }
    .right  img{
        cursor: pointer;
    }

    .imgBox {
        width: 262px;
        height: 380px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        opacity: 1;
        border: 2px solid #6F6F6F;
        border-radius: 12px;
    }

    .chioceImgBox1 {
        width: 51px;
        height: 102px;
        position: absolute;
        top: 50px;
        left: 44px;
    }

    .chioceImgBox2 {
        width: 102px;
        height: 102px;
        position: absolute;
        top: 50px;
        right: 14px;
    }

    .chioceImgBox3 {
        width: 58px;
        height: 70px;
        position: absolute;
        top: 228px;
        left: 43px;
    }

    .chioceImgBox4 {
        width: 58px;
        height: 70px;
        position: absolute;
        top: 228px;
        right: 61px;
    }

    .textText1 {
        width: 64px;
        height: 18px;
        margin-top: 7px;
        line-height: 18px;
        font-family: SourceHanSansSC-Normal;
        font-size: 16px;
        color: #FFFFFF;
        white-space: nowrap;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    .textText2 {
        width: 64px;
        height: 18px;
        margin-top: 7px;
        line-height: 18px;
        font-family: SourceHanSansSC-Normal;
        font-size: 16px;
        color: #FFFFFF;
        white-space: nowrap;
        text-align: center;
    }

    .textText3 {
        width: 64px;
        height: 18px;
        margin-top: 7px;
        line-height: 18px;
        font-family: SourceHanSansSC-Normal;
        font-size: 16px;
        color: #868686;
        white-space: nowrap;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    .textText4 {
        width: 64px;
        height: 18px;
        margin-top: 7px;
        line-height: 18px;
        font-family: SourceHanSansSC-Normal;
        font-size: 16px;
        color: #868686;
        white-space: nowrap;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    /*每张图后面重叠的图片样式*/
    /*最外面一层*/
    #image0 {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
    }

    #image1 {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
    }

    #image2 {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
    }

    #image3 {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
    }

    /*中间的一层*/
    #image4 {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
    }

    #image5 {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
    }

    #image6 {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
    }

    #image7 {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
    }

    .monban {
        width: 100%;
        height: 50%;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 999;
    }
  
</style>
