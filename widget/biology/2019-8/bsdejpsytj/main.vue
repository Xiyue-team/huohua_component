<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div class='fullS' :style="{zoom:zoom1}">
                    <img src="./sub_static/bj.png" style="width: 100%;height: 100%;z-index: 99"/>
                    <div class="left">
                        <div class="xuankuangBox">
                            <div class="tishi" v-if="tishi">{{tiShiTitle}}</div>
                            <div class="top">
                                <div class="one" id="one">
                                    <div class="oneImageContent smallImage"
                                         v-for="(item, index) in imgArr1"
                                         :key=index
                                         :id="'oneDiv' + index">
                                        <img :src="item.src" v-show="item.src" ondragstart="return false"
                                             style="width:100%;height: 100%">
                                        <p class="boxImageText" v-text="item.text" v-show="item.text"></p>
                                    </div>
                                    <div class="Box_Title">{{boxTitle[0]}}</div>
                                </div>
                                <div class="two" id="two">
                                    <div class="twoImageContent smallImage"
                                         v-for="(item, index) in imgArr2"
                                         :key=index
                                         :id="'twoDiv' + index">
                                        <img :src="item.src" v-show="item.src" ondragstart="return false"
                                             style="width:100%;height: 100%">
                                        <p class="boxImageText" v-text="item.text" v-show="item.text"></p>
                                    </div>
                                    <div class="Box_Title">{{boxTitle[1]}}</div>
                                </div>

                            </div>
                            <div class="bottom">

                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <!--<div class="imgBox" >-->
                        <!--<div class="chioceImgBox"-->
                        <!--v-for="(item, index) in allImagArr"-->
                        <!--:key = "'item-' + index + '-1'"-->
                        <!--:id = "'div' + index">-->
                        <!--<img class="img"-->
                        <!--:src="item"-->
                        <!--:id ="'image' + index"-->
                        <!--ondragstart="return false"-->
                        <!--style="width: 100%;height: 100%"-->
                        <!--&gt;-->
                        <!--<div class="image_text" :id = "'textText' + index">-->
                        <!--<div class="textText">{{textArr[index]}}</div>-->
                        <!--</div>-->
                        <!--</div>-->
                        <!--</div>-->


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
  import Vue from "vue";
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

<style>
    .control-panel_div_floatRight {
        height: 0 !important;
    }

    .title_text {
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 100;
        font-family: SourceHanSansSC-Medium;
        font-size: 24px;
        color: #fff;
        line-height: 24px;
    }

    .fullS {
        width: 100%;
        height: 100%;

    }

    img {
        /*pointer-events: none;*/
    }

    /*左边的样式*/
    .left {
        width: 67.3%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    .xuankuangBox {
        width: 676px;
        height: 404px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        /*background-color: #ffa500;*/
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .tishi {
        ont-family: SourceHanSansSC-Regular;
        font-size: 20px;
        color: #8A8A8A;
        line-height: 20px;
        position: absolute;
        top: -8.6%;
        left: 50%;
        transform: translateX(-50%);
    }

    .one, .two, .three, .four, .five, .six {
        width: 212px;
        height: 160px;
        background: #F5F5F5;
        border-radius: 9px;
        float: left;
        position: relative;
    }

    .Box_Title {
        position: absolute;
        bottom: -20%;
        left: 50%;
        transform: translateX(-50%);
    }

    .top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .smallImage {
        width: 88px;
        height: 88px;
        float: left;
        margin: 10px 8px;
        position: relative;
        top: 15.3%;
        left: 1%;
    }

    .smallImage > img {
        background: #FFFFFF;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.10);
        border-radius: 6px;
    }

    .boxImageText {
        width: 88px;
        height: 20px;
        color: #525252;
        line-height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        text-align: center;
    }

    /*右边的样式*/
    .right {
        width: 262px;
        height: 380px;
        position: absolute;
        top: 18.1%;
        right: 2.3%;
        opacity: 0.6;
        border: 2px solid #979797;
        border-radius: 12px;
    }


</style>
