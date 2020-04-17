<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text" id ='title'>{{title}}</div>
                <div id="2dContainer" class="container">
                    <canvas id="canvas"></canvas>
                </div>
                <div class="line_btn_outer">
                    <canvas id="can"></canvas>
                </div>
                <div class="detail" :style = "{'display': display}">
                    <div class="detail_left">
                        <img :src="provinceMap" height="70%" alt="" style="margin-top: 10%; margin-left: 10%"/>
                    </div>
                    <div class="detail_right">
                        <button id="btnCloseSwiper" class="button swiper_close_button" @click="closeProvinceDetail">X</button>
                        <div style="position: absolute;top:40%;">
                        <div >{{province}}</div>
                        <div>{{nickname}}</div>
                        <div>{{provincialCapital}}</div>
                        <div style='width:80%'>{{introduction}}</div>
                        </div>
                    </div>
                </div>
            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import '../../../../src/assets/css/core.css';
  import '../../../../src/assets/css/layout.css';
  import '../../../../src/assets/css/ui.css';
  import 'swiper/dist/css/swiper.min.css';
  import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
  import Component from 'vue-class-component';
  import { ViewModel } from './ViewModel';

  @Component({
    components: {
        fullScreensLayout
    },
    mixins: [ViewModel]
  })
  export default class App extends Vue {}
</script>

<style scoped="scoped">
    .title_text{
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
        font-family: "微软雅黑";
        font-size: 28px;
        color: #000000;
        line-height: 28px;
        z-index: 99;
    }

    .container {
        height: 100%;
        width: 65%;
    }
    .line_btn_outer{
        position:fixed;
        width:35%;
        height:100%;
        top:0;
        right:0px;
    }
    .detail {
        background: #464646fa;
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        width: 100%;
    }
    .detail_left {
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        width: 55%;
        display:flex;
        align-items:center;
        justify-content:center;
    }
    .detail_right {
        position: absolute;
        height: 100%;
        top: 0;    
        left: 55%;
        width: 45%;
        padding: 0 30px;
    }
    .detail_right>div {
        font-family: "微软雅黑";
        font-size: 28px;
        color: #FFFFFF;
        padding: 20px 0;
        white-space:normal;
        word-break:break-all;
        overflow:hidden;
    }
    .btn {
        text-align: center;
        min-width: 180px;
        cursor:pointer;
        z-index: 99;
        font-family: "微软雅黑";
        box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
        border-radius: 21px;
    }
    .btn {
        text-align: center;
        min-width: 80px;
        cursor:pointer;
        z-index: 99;
        font-family: "微软雅黑";
        box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
        border-radius: 21px;
    }
    .btn_mobile {
        right: 30px;
    }
    .swiper_close_button {
        /* position: absolute; */
        float: right;
        color: #7b7b7b;
        height: 48px;
        font-size: 28px;
        z-index: 10;
        margin-top: 50px;
        margin-right: 100px;
    }
</style>
<style>
    .control-panel_div_floatRight {
        height: auto !important;
    }
</style>
