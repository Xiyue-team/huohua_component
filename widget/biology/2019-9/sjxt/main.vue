<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div class="content" :style="{zoom:zoom1}">
                    <img class="backGround" src="./sub_static/UI/bj.png">
                    <div class="start">
                        <img :src="stImg"/>
                    </div>
                    <div class="xian">
                        <img src="./sub_static/UI/xiankuang.png"/>

                        <div :class="{one:have,ishave:index === 1}" @click="getEvent(1)"></div>
                        <div class="one_textBox" v-show="index === 1">
                            <div class="text_title">{{textTitle[0]}}</div>
                            <div class="one_img_list"><img :src="oneImgList"/></div>
                            <div class="xiankuang_list"><img src="./sub_static/UI/xiankuangList.png"/></div>

                            <!--脑部里面的第一个点-->
                            <div :class="{oneList:have,ishave:index2 === 11}" @click="getEvent(11)"></div>
                            <div class="oneListBox" v-show="index2 === 11">
                                <div class="text_title2">{{textTitle[1]}}</div>
                                <div class="text_area2">{{textArea[0]}}</div>
                            </div>
                            <!--脑部里面的第二个点-->
                            <div :class="{twoList:have,ishave:index2 === 22}" @click="getEvent(22)"></div>
                            <div class="twoListBox" v-show="index2 === 22">
                                <div class="text_title2">{{textTitle[2]}}</div>
                                <div class="text_area2">{{textArea[1]}}</div>
                            </div>
                            <!--脑部里面的第三个点-->
                            <div :class="{threeList:have,ishave:index2 === 33}" @click="getEvent(33)"></div>
                            <div class="threeListBox" v-show="index2 === 33">
                                <div class="text_title2">{{textTitle[3]}}</div>
                                <div class="text_area2">{{textArea[2]}}</div>
                            </div>
                        </div>

                        <div :class="{two:have,ishave:index === 2}" @click="getEvent(2)"></div>
                        <div class="two_textBox" v-show="index === 2">
                            <div class="text_title">{{textTitle[4]}}</div>
                            <div class="text_area">{{textArea[3]}}</div>
                            <div class="two_imgList"><img src="./sub_static/UI/jisui.png"/></div>
                        </div>

                        <div :class="{three:have,ishave:index === 3}" @click="getEvent(3)"></div>
                        <div class="three_textBox" v-show="index === 3">
                            <div class="text_title">{{textTitle[5]}}</div>
                            <div class="text_area">{{textArea[4]}}</div>
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
  import "../../../../src/assets/css/core.css";
  import "../../../../src/assets/css/layout.css";
  import fullScreensLayout from "../../../../src/component/layout/fullScreens_layout.vue";
  import Component from "vue-class-component";
  import { MainVueComponent } from "./mainVueComponent";

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

    .start {
        width: 456px;
        height: 482px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .xian {
        width: 456px;
        height: 482px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    /*第一个点*/
    .one {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        left: 290.8px;
        top: 26px;
        cursor: pointer;
    }

    .one_textBox {
        width: 200px;
        height: 377px;
        position: absolute;
        left: 290px;
        top: 16px;
        display: flex;
        flex-direction: column;
        /*justify-content:flex-end;*/
        align-items: flex-start;
    }

    .one_textBox .text_title {
        width: 48px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
        white-space: nowrap;
        margin-left: 30px;
    }

    .one_img_list {
        position: absolute;
        top: 26px;
    }

    .xiankuang_list {
        position: absolute;
        top: 26px;
    }

    .oneList {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        right: 16px;
        bottom: 267px;
        cursor: pointer;
    }

    .oneListBox {
        width: 174px;
        height: 140px;
        position: absolute;
        left: 188px;
        bottom: 152px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .oneListBox .text_title2 {
        width: 48px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
        white-space: nowrap;
    }

    .oneListBox .text_area2 {
        width: 100%;
        height: 100px;
        font-size: 14px;
        color: #FFFFFF;
    }

    .twoList {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        right: 31px;
        bottom: 132px;
        cursor: pointer;
    }

    .twoListBox {
        width: 174px;
        height: 60px;
        position: absolute;
        left: 178px;
        bottom: 98px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .twoListBox .text_title2 {
        width: 48px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
        white-space: nowrap;
    }

    .twoListBox .text_area2 {
        width: 100%;
        height: 100px;
        font-size: 14px;
        color: #FFFFFF;
        white-space: nowrap;
    }

    .threeList {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        right: 52px;
        bottom: 35px;
        cursor: pointer;
    }

    .threeListBox {
        width: 233px;
        height: 120px;
        position: absolute;
        left: 158px;
        bottom: -58px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .threeListBox .text_title2 {
        width: 48px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
        white-space: nowrap;
    }

    .threeListBox .text_area2 {
        width: 100%;
        height: 100px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: justify;
    }

    .one_textBox .text_area {
        width: 100%;
        height: 80px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: justify;
    }

    /*第二个点*/
    .two {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        left: 50px;
        top: 196px;
        cursor: pointer;
    }

    .two_textBox {
        width: 182px;
        height: 120px;
        position: absolute;
        left: -146px;
        top: 189px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    .two_textBox .text_title {
        width: 48px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
        white-space: nowrap;
    }

    .two_textBox .text_area {
        width: 100%;
        height: 80px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: justify;
    }

    .two_imgList {
        width: 150px;
        height: 150px;
        position: absolute;
        left: -30px;
        top: -125px;
    }

    /*第三点*/
    .three {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        left: 111px;
        top: 328px;
        cursor: pointer;
    }

    .three_textBox {
        width: 233px;
        height: 140px;
        position: absolute;
        left: -134px;
        top: 320px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .three_textBox .text_title {
        width: 48px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
        white-space: nowrap;
    }

    .three_textBox .text_area {
        width: 100%;
        height: 140px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: justify;
    }

    .ishave {
        background: #FFC100;
    }

    /*适配各种设备*/
    @media ( max-height: 400px) {
        /*.one_textBox .text_area{*/
        /*width: 150%;*/
        /*height: 80px;*/
        /*font-size: 8px;*/
        /*}*/
        /*.two_textBox .text_area{*/
        /*width: 150%;*/
        /*}*/
        /*.five_textBox .text_area{*/
        /*width: 130%;*/
        /*}*/
        /*.six_textBox .text_area{*/
        /*width: 130%;*/
        /*}*/
    }

    @media ( height: 330px) {
        /*.one_textBox .text_area{*/
        /*width: 165%;*/
        /*height: 80px;*/
        /*font-size: 8px;*/
        /*}*/
    }
</style>
