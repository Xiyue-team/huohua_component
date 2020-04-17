<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout :style="{zoom:zoom1}">
            <template slot="viewBox" slot-scope="viewBox">
                <div class='fullS'>
                    <div class='leftPanel' id="leftPanel">
                        <div class='topBox' id="topBox">
                            <div class="head">
                                <div id="title" class="title_text">{{title}}</div>
                            </div>
                            <div class='textBox'>{{contentTitle[0]}}</div>
                            <div class="tishi" v-if="tishi">{{tiShiTitle}}</div>
                            <div class='topImgContent' v-else
                                 v-for="(item, index) in imgArr"
                                 :key=index
                                 :id="'topMinDiv' + index"
                            >
                                <img class="topDivImg" :src="item.src" v-show="item.src" ondragstart="return false">
                                <p class="topMinText" v-text="item.text" v-show="item.text"></p>
                            </div>
                        </div>
                        <div class='bottomBox' id="bottomBox">
                            <div class='textBox'>{{contentTitle[1]}}</div>
                            <div class="tishi" v-if="tishi">{{tiShiTitle}}</div>
                            <div class='bottomImgContent' v-else
                                 v-for="(item, index) in imgArr1"
                                 :key=index
                                 :id="'bottomMinDiv' + index"
                            >
                                <img class="bottomDivImg" :src="item.src" v-show="item.src" ondragstart="return false">
                                <p class="topMinText" v-text="item.text" v-show="item.text"></p>
                            </div>
                        </div>
                        <div class="tipMax">
                            <img class="tipMax_img" :src='tipMax_img_src' v-show="tipMax_img_src">
                        </div>
                    </div>
                    <div class="rightPanel">
                        <div class="imgBox" v-if="pC">
                            <div class="chioceImgBox"
                                 v-for="(item, index) in allImagArr"
                                 :key="'item-' + index + '-1'"
                                 :id="'div' + index">
                                <img class="img"
                                     :src="item"
                                     :id="'image' + index"
                                     ondragstart="return false"
                                >
                                <div class="text" :id="'textText' + index">
                                    <div class="textText">{{textArr[index]}}</div>
                                </div>
                                <template v-if="selectedItem === item">
                                    <div class="selectedItemLeft"
                                    ></div>
                                    <div class="selectedItemTop"
                                    ></div>
                                    <div class="selectedItemRight"
                                    ></div>
                                    <div class="selectedItemBottom"
                                    ></div>
                                </template>
                            </div>
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
    .control-panel_div_floatRight {
        height: 0 !important;
    }

    .head {
        width: 100%;
        height: 5%;
    }

    * {
        touch-action: none;
    }

    .title_text {
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #FFFFFF;
        line-height: 24px;
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 100;
    }

    .fullS {
        width: 100%;
        height: 100%;
    }

    .leftPanel {
        width: 80%;
        height: 100%;
        float: left;
        position: relative;
    }

    .rightPanel {
        width: 20%;
        height: 100%;
        float: left;
        display: table-cell;
        text-align: center;
        vertical-align: middle;
        position: absolute;
        right: 0;
        background-color: #515151;
        border-left: 1px solid rgba(0, 0, 0, 0.5);
    }

    .topBox {
        width: 100%;
        height: 50%;
        background: #515151;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    }

    .bottomBox {
        width: 100%;
        height: 50%;
        background: #515151;
    }

    .textBox {
        width: 280px;
        height: 58px;
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #BBBBBB;
        text-align: center;
        line-height: 28px;
        position: relative;
        top: 42%;
        left: 3%;
    }

    .topImgContent,
    .bottomImgContent {
        width: 86px;
        height: 86px;
        float: left;
        margin: 0 8px;
        position: relative;
        top: 18%;
        left: 30%;
        border-radius: 5px;
    }

    .topDivImg,
    .bottomDivImg {
        width: 100%;
        height: 100%;
    }

    .imgBox {
        width: 180px;
        height: 750px;
        margin-top: 110px;
        display: inline-block;
    }

    .tipMax {
        width: 295px;
        height: 295px;
        position: absolute;
        right: 0;
        top: 35%;
        z-index: 10;
    }

    .tipMax_img {
        width: 100%;
        height: 100%;
    }

    .chioceImgBox {
        width: 72px;
        height: 72px;
        margin: 16px 8px;
        float: left;
        position: relative;
    }

    .chioceImgBox .selectedItem {
        width: 72px;
        height: 72px;
        position: absolute;
        top: -2px;
        left: -2px;
        z-index: 1;
        border: 2px solid #ffa500;
        border-radius: 8px;
    }

    .selectedItemLeft {
        width: 4px;
        height: 72px;
        position: absolute;
        top: 0;
        left: 2;
        z-index: 1;
        border-left: 2px solid #ffa500;
        border-radius: 8px;
    }

    .selectedItemTop {
        width: 72px;
        height: 4px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        border-top: 2px solid #ffa500;
        border-radius: 8px;
    }

    .selectedItemRight {
        width: 4px;
        height: 72px;
        position: absolute;
        top: 0;
        left: 66.5px;
        z-index: 1;
        border-right: 2px solid #ffa500;
        border-radius: 8px;
    }

    .selectedItemBottom {
        height: 4px;
        width: 72px;
        position: absolute;
        top: 66.5px;
        left: 0.25px;
        z-index: 1;
        border-bottom: 2px solid #ffa500;
        border-radius: 8px;
    }

    .img {
        width: 100%;
        height: 100%;
    }

    .textText {
        width: 72px;
        height: 14px;
        margin-top: 7px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: white;
        text-align: center;
        line-height: 14px;
    }

    .topMinText {
        width: 86px;
        height: 20px;
        color: #FFFFFF;
        line-height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        text-align: center;
    }

    .tishi {
        width: 30%;
        height: 10%;
        top: 33%;
        left: 40%;
        position: relative;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #000000;
        text-align: center;
        opacity: 0.5;
        line-height: 18px;
    }

    @media (max-width: 1000px) {
        .imgBox {
            width: 80px;
            height: 78%;
            margin-top: 50%;
            left: 35%;
        }

        .chioceImgBox {
            width: 72px;
            height: 72px;
            margin: 42px 7px;
            position: relative;
            float: left;
        }

        .topMinText {
            width: 86.4px;
            height: 20px;
            line-height: 20px;
            text-align: center;
        }
    }

    @media (max-height: 350px) {
        .imgBox {
            margin-top: 30%;
        }

        .textText {
            margin-top: 10px;
        }
    }

    @media (width: 1024px) {
        .textBox {
            position: relative;
            top: 42%;
            left: 1%;
        }
    }
</style>
