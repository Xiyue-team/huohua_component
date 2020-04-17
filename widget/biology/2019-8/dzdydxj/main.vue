<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div class="content"  :style="{'background-image': 'url(\'' +bg +'\')'}">
                    <div class="monban" v-show="showMonban" :style="{zoom:zoom1}"></div>
                    <div class="one" @click="clickButton(1)" :style="{zoom:zoom1}"></div>
                    <div class="two" @click="clickButton(2)" :style="{zoom:zoom1}"></div>
                    <div class="three" @click="clickButton(3)" :style="{zoom:zoom1}"></div>
                    <div class="four" @click="clickButton(4)" :style="{zoom:zoom1}"></div>
                    <div class="five" @click="clickButton(5)" :style="{zoom:zoom1}"></div>
                    <div class="six" @click="clickButton(6)" :style="{zoom:zoom1}"></div>
                    <!--弹出框部分-->
                    <div class="tankaung" v-show="showImg" :style="{zoom:zoom1}">
                         <img    :src="imgSrc" style="width: 100%;height: 100%"/>
                         <div class="del" @click="Delete"></div>
                         <div class="img_title">{{imgTitle}}</div>
                         <div class="img_text">{{imgText}}</div>
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
    img {
        pointer-events: none;
    }
    .title_text {
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
        font-family: SourceHanSansSC-Medium;
        font-size: 24px;
        color: #fff;
        line-height: 24px;
    }
    .content {
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
        /*background-position: left   bottom;*/
    }
    .monban {
        width: 100%;
        height: 100%;
        opacity: 0.5;
        background: #000000;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
    }
    /*6个按钮的样式*/
    .one {
        width: 22px;
        height: 22px;
        /*background: #ccc;*/
        position: absolute;
        left: 56.5%;
        bottom: 75.9%;
        cursor: pointer;
    }
    .two {
        width: 22px;
        height: 22px;
        /*background: #ccc;*/
        position: absolute;
        left: 41.8%;
        bottom: 59.9%;
        cursor: pointer;
    }
    .three{
        width: 22px;
        height: 22px;
        /*background: #ccc;*/
        position: absolute;
        bottom: 51.6%;
        left: 70.8%;
        cursor: pointer;
    }
    .four{
        width: 22px;
        height: 22px;
        /*background: #ccc;*/
        position: absolute;
        bottom: 49.2%;
        left: 42.2%;
        cursor: pointer;
    }
    .five{
        width: 24px;
        height: 24px;
        /*background: #ccc;*/
        position: absolute;
        bottom: 25.9%;
        left: 22.8%;
        cursor: pointer;
    }
    .six{
        width: 22px;
        height: 22px;
        /*background: #ccc;*/
        position: absolute;
        bottom: 18.3%;
        left: 77.6%;
        cursor: pointer;
    }
    .tankaung{
        width: 607px;
        height: 315px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 999;
    }
    .del{
        width: 35px;
        height: 35px;
        /*background: #f00;*/
        position: absolute;
        top: 7%;
        right: -1%;
        cursor: pointer;
    }
    .img_title{
        font-family: SourceHanSansSC-Medium;
        font-size: 20px;
        color: #000000;
        line-height: 29px;
        width: 160px;
        height: 29px;
        text-align: left;
        position: absolute;
        top: 227px;
        left: 32px;
        font-weight: 600;
    }
    .img_text{
        width: 504px;
        height: 27px;
        font-family: SourceHanSansSC-Regular;
        font-size: 18px;
        color: #000000;
        line-height: 27px;
        position: absolute;
        top: 256px;
        left: 32px;
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
</style>
