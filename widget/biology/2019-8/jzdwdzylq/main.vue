<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout >
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div class='fullS' :style="{zoom:zoom1}">
                    <div class="left">
                        <div class="xuankuangBox">
                            <div class="tishi" v-if="tishi">{{tiShiTitle}}</div>
                            <div class="top">
                                <div class="two" id="two">
                                    <div class="twoImageContent smallImage"
                                         v-for="(item, index) in imgArr2"
                                         :key = index
                                         :id = "'twoDiv' + index">
                                        <img   :src="item.src" v-show="item.src" ondragstart="return false" style="width:100%;height: 100%">
                                        <p class="boxImageText" v-text="item.text" v-show="item.text"></p>
                                    </div>
                                    <div class="Box_Title">{{boxTitle[0]}}</div>
                                </div>
                                <div class="three" id="three">
                                    <div class="threeImageContent smallImage"
                                         v-for="(item, index) in imgArr3"
                                         :key = index
                                         :id = "'threeDiv' + index">
                                        <img   :src="item.src" v-show="item.src" ondragstart="return false" style="width:100%;height: 100%">
                                        <p class="boxImageText" v-text="item.text" v-show="item.text"></p>
                                    </div>
                                    <div class="Box_Title">{{boxTitle[1]}}</div>
                                </div>
                            </div>
                            <div class="bottom">
                                <div class="four" id="four">
                                    <div class="fourImageContent smallImage"
                                         v-for="(item, index) in imgArr4"
                                         :key = index
                                         :id = "'fourDiv' + index">
                                        <img   :src="item.src" v-show="item.src" ondragstart="return false" style="width:100%;height: 100%">
                                        <p class="boxImageText" v-text="item.text" v-show="item.text"></p>
                                    </div>
                                    <div class="Box_Title">{{boxTitle[2]}}</div>
                                </div>
                                <div class="five" id="five">
                                    <div class="fiveImageContent smallImage"
                                         v-for="(item, index) in imgArr5"
                                         :key = index
                                         :id = "'fiveDiv' + index">
                                        <img   :src="item.src" v-show="item.src" ondragstart="return false" style="width:100%;height: 100%">
                                        <p class="boxImageText" v-text="item.text" v-show="item.text"></p>
                                    </div>
                                    <div class="Box_Title">{{boxTitle[3]}}</div>
                                </div>
                                <div class="six" id="six">
                                    <div class="sixImageContent smallImage"
                                         v-for="(item, index) in imgArr6"
                                         :key = index
                                         :id = "'sixDiv' + index">
                                        <img   :src="item.src" v-show="item.src" ondragstart="return false" style="width:100%;height: 100%">
                                        <p class="boxImageText" v-text="item.text" v-show="item.text"></p>
                                    </div>
                                    <div class="Box_Title">{{boxTitle[4]}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="imgBox" >
                            <div class="chioceImgBox"
                                 v-for="(item, index) in allImagArr"
                                 :key = "'item-' + index + '-1'"
                                 :id = "'div' + index">
                                <img class="img"
                                     :src="item"
                                     :id ="'image' + index"
                                     ondragstart="return false"
                                     style="width: 100%;height: 100%"
                                >
                                <div class="image_text" :id = "'textText' + index">
                                    <div class="textText">{{textArr[index]}}</div>
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
.control-panel_div_floatRight{
    height:0!important;
}
.fullS{
    width:100%;
    height: 100%;
    
}
img{
    /*pointer-events: none;*/
}
/*左边的样式*/
.left{
    width: 74.3%;
    height: 100%;
    background-color: #FFFFFF ;
    float: left;
    position: relative;
}
.title_text{
    margin: 0;
    padding: 0;
    position: absolute;
    top: 24px;
    left: 24px;
    z-index: 100;
    font-family: SourceHanSansSC-Medium;
    font-size: 28px;
    color: #000000;
    line-height: 28px;
}
.xuankuangBox{
    width: 676px;
    height: 404px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    /*background-color: #ffa500;*/
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: space-between;
}
.tishi{
    ont-family: SourceHanSansSC-Regular;
    font-size: 20px;
    color: #8A8A8A;
    line-height: 20px;
    position: absolute;
    top: -8.6%;
    left: 50%;
    transform: translateX(-50%);
}

.two,.three,.four,.five,.six{
    width: 212px;
    height: 160px;
    background: #F5F5F5;
    border-radius: 9px;
    float: left;
    position: relative;
}
.Box_Title{
    position: absolute;
    bottom: -20%;
    left: 50%;
    transform: translateX(-50%);
}
.top{
    width:444px;
    display: flex;
    flex-direction:row;
    justify-content: space-between;
}
.bottom{
    width: 676px;
    display: flex;
    flex-direction:row;
    justify-content: space-between;
}
.smallImage{
    width: 88px;
    height: 88px;
    float: left;
    margin: 10px 8px;
    position: relative;
    top:15.3%;
    left: 1%;
}
.two  .smallImage{
    width: 88px;
    height: 88px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}
.three  .smallImage{
    width: 88px;
    height: 88px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}
.smallImage>img{
    background: #FFFFFF;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.10);
    border-radius: 6px;
}
.boxImageText{
    width: 88px;
    height: 20px;
    color: #525252;
    line-height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    text-align: center;
}

/*右边的样式*/
.right{
    width: 25.7%;
    height: 100%;
    background-color: #F7F7F7;
    float: left;
    position: relative;
}
.imgBox{
    width: 228px;
    height: 480px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.chioceImgBox{
    width: 88px;
    height: 88px;
    margin:  0 10px  40px 12px;
    float: left;
    position: relative;
}
.chioceImgBox>img{
    background: #FFFFFF;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.10);
    border-radius: 6px;
}
.textText{
    width: 88px;
    height: 14px;
    margin-top: 7px;
    font-size: 14px;
    text-align: center;
    line-height: 14px;
    font-family: SourceHanSansSC-Normal;
    color: #525252;
}
</style>
