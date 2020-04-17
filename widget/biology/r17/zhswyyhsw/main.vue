<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout :style="{zoom:zoom1}">
            <template slot="viewBox" slot-scope="viewBox">
                <div class='fullS'>
                    <div class='leftPanel' id="leftPanel">
                        
                    <div class='topBox' id="topBox">
                        <div class="head">
                            <div id="title" class="title_text">真核生物与原核生物</div>
                            <!--<div class="chongzhi">-->
                                <!--<img src="./sub_static/chongzhi.png">-->
                            <!--</div>-->
                        </div>
                        <div class='textBox'>真核生物</div>
                        <div class="tishi" v-if="tishi">拖动右侧物质进行分类</div>
                        <div class='topImgContent' v-else
                            v-for="(item, index) in imgArr"
                            :key = index
                            :id = "'topMinDiv' + index"
                        >
                            <img class="topDivImg" :src="item.src" v-show="item.src" ondragstart="return false">
                            <p class="topMinText" v-text="item.text" v-show="item.text"></p>
                        </div>
                    </div>
                    <div class='bottomBox' id="bottomBox">
                        <div class='textBox'>原核生物</div>
                        <div class="tishi" v-if="tishi">拖动右侧物质进行分类</div>
                        <div class='bottomImgContent' v-else
                            v-for="(item, index) in imgArr1"
                            :key = index
                            :id = "'bottomMinDiv' + index"
                        >
                            <img class="bottomDivImg" :src="item.src" v-show="item.src" ondragstart="return false">
                            <p class="topMinText" v-text="item.text" v-show="item.text"></p>
                        </div>
                    </div>
                    </div>
                    <div class="rightPanel">
                        <div class="imgBox" v-if="pC">
                            <div class="chioceImgBox"
                                 v-for="(item, index) in allImagArr"
                                 :key = 'index'
                                 :id = "'div' + index"
                            >
                                <img class="img"
                                     :src="item"
                                     :id ="'image' + index"
                                     ondragstart="return false"
                                >
                                <div class="text">
                                   <div class="textText" v-if="CName === 1">{{textArr[index]}}</div>
                                </div>
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
import {MainVueComponent} from './mainVueComponent';

    @Component({
        components: {
            fullScreensLayout,
        },
    })
    export default class App extends MainVueComponent {
    }
</script>

<style>
/*#reset{*/
    /*display: none!important;*/
/*}*/

.control-panel_div_floatRight{
    height:0!important;
}
    .head{
        width: 100%;
        height: 5%;
    }

    /*.chongzhi{*/
        /*width: 42px;*/
        /*height: 40px;*/
        /*position: absolute;*/
        /*top: 5px;*/
        /*right: 5px;*/
        /*border-radius: 6px;*/
        /*border: 1px solid rgba(0,0,0,0.08);*/
        /*background-color: #fff;*/
        /*cursor: pointer;*/
    /*}*/
/*.chongzhi img{*/
    /*width: 25px;*/
    /*height: 24px;*/
    /*position: absolute;*/
    /*top:8px;*/
    /*left: 8px;*/
/*}*/
.title_text{
    ont-family: PingFangSC-Medium;
    font-size: 24px;
    color: #000000;
    line-height: 24px;
    line-height: 24px;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 24px;
    left: 24px;
    z-index: 100;
}

.fullS{
    width:100%;
    height: 100%;
}
    .leftPanel{
        width: 80%;
        height: 100%;
        float: left;
        position: relative;
    }
    .rightPanel{
        width: 20%;
        height: 100%;
        float: left;
        display:table-cell; 
        text-align:center; 
        vertical-align:middle;
        background-color: rgba(0,0,0,0.05);
    }
    .topBox{
        width: 100%;
        height: 50%;
        border-bottom: 1px solid rgba(0,0,0,0.08);
    }
    .bottomBox{
        width: 100%;
        height: 50%;
    }
    .textBox{
        width: 50px;
        height: 58px;
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #333333;
        text-align: center;
        line-height: 28px;
        position: relative;
        top: 40%;
        left: 10%;
    }
    .topImgContent,
    .bottomImgContent
    {
        width: 72px;
        height: 72px;
        float: left;
        margin: 0 8px;
        position: relative;
        top:23%;
        left: 30%;
        border-radius: 5px;
    }
    .imgBox{
        width: 180px;
        height:550px;
        margin-top: 140px;
        display:inline-block;
        /* background-color: #000000 */
    }
    .chioceImgBox{
        width: 72px;
        height: 72px;
        margin: 16px 8px;
        float: left;
    }
    .textText{
        width: 72px;
        height: 14px;
        margin-top: 7px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #525252;
        text-align: center;
        line-height: 14px;
    }
    .topMinText{
        width: 72px;
        height: 20px;
        line-height: 20px;
        text-align: center;
    }

   .tishi{
       width: 30%;
       height: 10%;
       top: 33%;
       left: 40%;
       position: relative;
       font-family: PingFangSC-Regular;
       font-size: 16px;
       color: #B8B8B8;
       text-align: center;
       line-height: 18px;
   }

    @media (max-width: 1000px) {
        .imgBox{
            width: 80px;
            height: 68%;
            top: 18%;
            left: 35%;
        }

        .chioceImgBox{
            width: 72px;
            height: 72px;
            margin: 60px 7px;
            position: relative;
            float: left;
        }

        .topMinText{
            width: 72px;
            height: 20px;
            line-height: 20px;
            text-align: center;
        }
    }
</style>