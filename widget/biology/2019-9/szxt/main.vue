<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div class="content" :style="{zoom:zoom1}">
                    <img class="backGround" src="./sub_static/UI/bj.png">
                    <div class="start">
                        <img :src="img_male"/>
                        <div class="start1_text" v-show="index === 1">
                            <img src="./sub_static/UI/xianquan.png"/>
                            <!--第一个点-->
                            <div :class="{one:have,ishave:index2 === 1}" @click="getHot(1)"></div>
                            <div class="oneBox" v-show="index2 === 1">
                                <div class="title">{{titleArr[0]}}</div>
                                <div class="area">{{areaArr[0]}}</div>
                            </div>
                            <!--第二个点-->
                            <div :class="{two:have,ishave:index2 === 2}" @click="getHot(2)"></div>
                            <div class="twoBox" v-show="index2 === 2">
                                <div class="title">{{titleArr[1]}}</div>
                            </div>
                            <!--第三个点-->
                            <div :class="{three:have,ishave:index2 === 3}" @click="getHot(3)"></div>
                            <div class="threeBox" v-show="index2 === 3">
                                <div class="title">{{titleArr[2]}}</div>
                                <div class="area">{{areaArr[1]}}</div>
                            </div>
                            <!--第四个点-->
                            <div :class="{four:have,ishave:index2 === 4}" @click="getHot(4)"></div>
                            <div class="fourBox" v-show="index2 === 4">
                                <div class="title">{{titleArr[3]}}</div>
                                <div class="area">{{areaArr[2]}}</div>
                            </div>
                            <!--第五个点-->
                            <!--<div :class="{five:have,ishave:index2 === 5}" @click="getHot(5)"></div>-->
                            <!--<div class="fiveBox" v-show="index2 === 5">-->
                                <!--<div class="title">{{titleArr[4]}}</div>-->
                            <!--</div>-->
                            <!--第六个点-->
                            <div :class="{six:have,ishave:index2 === 6}" @click="getHot(6)"></div>
                            <div class="sixBox" v-show="index2 === 6">
                                <div class="title">{{titleArr[5]}}</div>
                            </div>
                            <!--第七个点-->
                            <div :class="{seven:have,ishave:index2 === 7}" @click="getHot(7)"></div>
                            <div class="sevenBox" v-show="index2 === 7">
                                <div class="title">{{titleArr[6]}}</div>
                                <div class="area">{{areaArr[3]}}</div>
                            </div>
                            <!--第八个点-->
                            <div :class="{eight:have,ishave:index2 === 8}" @click="getHot(8)"></div>
                            <div class="eightBox" v-show="index2 === 8">
                                <div class="title">{{titleArr[7]}}</div>
                                <div class="area">{{areaArr[4]}}</div>
                            </div>
                        </div>
                        <div class="start2_text" v-show="index === 2">
                            <img src="./sub_static/UI/xianquan_1.png"/>
                            <!--第一个点-->
                            <div :class="{onef:have,ishave:index3 === 1}" @click="getHot(11)"></div>
                            <div class="onefBox" v-show="index3 === 1">
                                <div class="title2">{{titleArr[8]}}</div>
                                <div class="area2">{{areaArr[5]}}</div>
                            </div>
                            <!--第二个点-->
                            <div :class="{twof:have,ishave:index3 === 2}" @click="getHot(22)"></div>
                            <div class="twofBox" v-show="index3 === 2">
                                <div class="title2">{{titleArr[9]}}</div>
                                <div class="area2">{{areaArr[6]}}</div>
                            </div>
                            <!--第三个点-->
                            <div :class="{threef:have,ishave:index3 === 3}" @click="getHot(33)"></div>
                            <div class="threefBox" v-show="index3 === 3">
                                <div class="title2">{{titleArr[10]}}</div>
                            </div>
                            <!--第四个点-->
                            <div :class="{fourf:have,ishave:index3 === 4}" @click="getHot(44)"></div>
                            <div class="fourfBox" v-show="index3 === 4">
                                <div class="title2">{{titleArr[11]}}</div>
                                <div class="area2">{{areaArr[7]}}</div>
                            </div>
                            <!--第五个点-->
                            <!--<div :class="{fivef:have,ishave:index3 === 5}" @click="getHot(55)"></div>-->
                            <!--<div class="fivefBox" v-show="index3 === 5">-->
                                <!--<div class="title2">{{titleArr[12]}}</div>-->
                            <!--</div>-->
                            <!--第六个点-->
                            <div :class="{sixf:have,ishave:index3 === 6}" @click="getHot(66)"></div>
                            <div class="sixfBox" v-show="index3 === 6">
                                <div class="title2">{{titleArr[13]}}</div>
                                <div class="area2">{{areaArr[8]}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="buttonBox" id="buttonBox">
                    <div :class="{an_niu: have, checked:index === 1}" @click="getEvent(1)">{{buttonText[0]}}</div>
                    <div :class="{an_niu: have, checked:index === 2}" @click="getEvent(2)">{{buttonText[1]}}</div>
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
  import { MainVueComponent } from './mainVueComponent';

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
        width: 633px;
        height: 412px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .start1_text {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .one {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        right: 498px;
        top: 33px;
        cursor: pointer;
    }

    .oneBox {
        width: 72px;
        height: 60px;
        position: absolute;
        right: 520px;
        top: 26px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .oneBox .title {
        width: 72px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
        white-space: nowrap;
    }

    .oneBox .area {
        width: 100%;
        height: 20px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: right;
        white-space: nowrap;
    }


    .two {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        right: 569.7px;
        top: 198px;
        cursor: pointer;
    }

    .twoBox {
        width: 48px;
        height: 36px;
        position: absolute;
        right: 592px;
        top: 190px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .twoBox .title {
        width: 48px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
        white-space: nowrap;
    }

    .three {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        right: 572px;
        top: 257px;
        cursor: pointer;
    }

    .threeBox {
        width: 103px;
        height: 60px;
        position: absolute;
        right: 598px;
        top: 247px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .threeBox .title {
        width: 48px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
        white-space: nowrap;
    }

    .threeBox .area {
        width: 100%;
        height: 20px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: right;
        white-space: nowrap;
    }

    .four {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        right: 572px;
        top: 320.4px;
        cursor: pointer;
    }

    .fourBox {
        width: 85px;
        height: 80px;
        position: absolute;
        right: 596px;
        top: 312px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .fourBox .title {
        width: 48px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
        white-space: nowrap;
    }

    .fourBox .area {
        width: 100%;
        height: 40px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: left;
    }

    .six {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        left: 546.8px;
        top: 125px;
        cursor: pointer;
    }

    .sixBox {
        width: 48px;
        height: 36px;
        position: absolute;
        left: 570px;
        top: 115px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .sixBox .title {
        width: 48px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
        white-space: nowrap;
    }

    .seven {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        left: 531px;
        top: 260px;
        cursor: pointer;
    }

    .sevenBox {
        width: 102px;
        height: 60px;
        position: absolute;
        left: 557px;
        top: 250px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .sevenBox .title {
        width: 48px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
        white-space: nowrap;
    }

    .sevenBox .area {
        width: 100%;
        height: 40px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: left;
    }

    .eight {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        left: 429px;
        top: 361px;
        cursor: pointer;
    }

    .eightBox {
        width: 114px;
        height: 60px;
        position: absolute;
        left: 453px;
        top: 353px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .eightBox .title {
        width: 48px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
        white-space: nowrap;
    }

    .eightBox .area {
        width: 100%;
        height: 40px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: left;
    }


    /*女性按钮出现的内容*/
    .start2_text {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .onef {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        right: 555px;
        top: 88px;
        cursor: pointer;
    }

    .onefBox {
        width: 81px;
        height: 60px;
        position: absolute;
        right: 575px;
        top: 78px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .onefBox .title2 {
        width: 48px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
        white-space: nowrap;
    }

    .onefBox .area2 {
        width: 100%;
        height: 20px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: left;
    }

    .twof {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        right: 555px;
        top: 155px;
        cursor: pointer;
    }

    .twofBox {
        width: 75px;
        height: 60px;
        position: absolute;
        right: 580px;
        top: 145px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .twofBox .title2 {
        width: 48px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
        white-space: nowrap;
    }

    .twofBox .area2 {
        width: 100%;
        height: 20px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: left;
    }

    .threef {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        right: 555px;
        top: 244px;
        cursor: pointer;
    }

    .threefBox {
        width: 54px;
        height: 36px;
        position: absolute;
        right: 575px;
        top: 234px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .threefBox .title2 {
        width: 54px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
        white-space: nowrap;
    }

    .fourf {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        left: 533px;
        top: 78px;
        cursor: pointer;
    }

    .fourfBox {
        width: 86px;
        height: 80px;
        position: absolute;
        left: 558px;
        top: 68px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .fourfBox .title2 {
        width: 48px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
        white-space: nowrap;
    }

    .fourfBox .area2 {
        width: 100%;
        height: 40px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: left;
    }



    .sixf {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #fff;
        /*background: #000000;*/
        position: absolute;
        left: 533px;
        top: 259px;
        cursor: pointer;
    }

    .sixfBox {
        width: 84px;
        height: 80px;
        position: absolute;
        left: 553px;
        top: 249px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .sixfBox .title2 {
        width: 48px;
        height: 36px;
        font-size: 24px;
        color: #FFFFFF;
        white-space: nowrap;
    }

    .sixfBox .area2 {
        width: 100%;
        height: 40px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: left;
    }


    .buttonBox {
        width: 88px;
        height: 96px;
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
        width: 88px;
        height: 38px;
        cursor: pointer;
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        border-radius: 19px;
        font-family: SourceHanSansSC-Medium;
        font-size: 14px;
        color: #000000;
        text-align: center;
        line-height: 38px;
    }

    .checked {
        background: #0291FF;
        border: 1px solid #EBEBEB;
        border-radius: 19px;
        color: #FFFFFF;
    }

    .ishave {
        background: #FFC100;
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


    @media ( height: 727px) {
        .fourBox .area {
            width: 110%;
        }
    }
    @media ( height: 768px) {
        .fourBox .area {
            width: 110%;
        }
    }
    @media ( height: 698px) {
        .fourBox .area {
            width: 110%;
        }
    }
</style>
