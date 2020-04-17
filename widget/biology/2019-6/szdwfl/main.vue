<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout :style="{zoom:zoom1}">
            <template slot="viewBox" slot-scope="viewBox">
                <div class='fullS'>
                    <div id="title" class="title_text">{{title}}</div>
                    <div class="left">
                        <div class="leftImage" v-for="(item, index) in leftImagArr" :key="'item-' + index + '-1'" :id
                                ="'div1' + index">
                            <img :src="item" :id="'image_left' + index" ondragstart="return false">
                        </div>
                    </div>
                    <div class="center" id="center">
                        <div class="centerTitle" v-if="tishi">{{tiShiTitle}}</div>
                        <div class="center_top">
                            <div class="one" id="one">
                                <div class="center_Box_Title">{{boxTitle[0]}}</div>
                                <div class="oneImageContent smallImage"
                                     v-for="(item, index) in imgArr1"
                                     :key=index
                                     :id="'oneDiv' + index">
                                    <img :src="item.src" v-show="item.src" ondragstart="return false" style="width:
                                100%;height: 100%">
                                </div>
                            </div>
                            <div class="two" id="two">
                                <div class="center_Box_Title">{{boxTitle[1]}}</div>
                                <div class="twoImageContent smallImage"
                                     v-for="(item, index) in imgArr2"
                                     :key=index
                                     :id="'twoDiv' + index">
                                    <img :src="item.src" v-show="item.src" ondragstart="return false"
                                         style="width: 100%;height: 100%">
                                </div>
                            </div>
                        </div>
                        <div class="center_bottom">
                            <div class="three" id="three">
                                <div class="center_Box_Title">{{boxTitle[2]}}</div>
                                <div class="threeImageContent smallImage"
                                     v-for="(item, index) in imgArr3"
                                     :key=index
                                     :id="'threeDiv' + index">
                                    <img :src="item.src" v-show="item.src" ondragstart="return false"
                                         style="width: 100%;height: 100%">
                                </div>
                            </div>
                            <div class="four" id="four">
                                <div class="center_Box_Title">{{boxTitle[3]}}</div>
                                <div class="threeImageContent smallImage"
                                     v-for="(item, index) in imgArr4"
                                     :key=index
                                     :id="'fourDiv' + index">
                                    <img :src="item.src" v-show="item.src" ondragstart="return false"
                                         style="width: 100%;height: 100%">
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="right">
                        <div class="rightImage" v-for="(item, index) in rightImagArr" :key="'item-' + index + '-1'"
                             :id="'div2' + index + 0">
                            <img class="img" :src="item" :id="'image_right' + index" ondragstart="return false">
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

    img {
        /*pointer-events: none;*/
    }

    * {
        touch-action: none;
    }

    .fullS {
        width: 100%;
        height: 100%;
        background-color: #2B2B2B;
    }

    .title_text {
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #FFFFFF;
        line-height: 28px;
        line-height: 28px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 100;
    }

    /*左边的样式*/
    .left {
        width: 10%;
        height: 82%;
        position: absolute;
        top: 11.6%;
        left: 5%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 1;
    }

    .leftImage {
        width: 120px;
        height: 120px;
    }

    .leftImage > img {
        width: 100%;
        height: 100%;
    }

    /*右边的样式*/
    .right {
        width: 10%;
        height: 82%;
        position: absolute;
        top: 11.6%;
        right: 5%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .rightImage {
        width: 120px;
        height: 120px;
    }

    .rightImage > img {
        width: 100%;
        height: 100%;
    }

    /*中间的样式*/
    .center {
        width: 50.4%;
        height: 74.8%;
        position: absolute;
        top: 16%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .center_top {
        display: flex;
        flex-direction: row;
        /*justify-content:space-between;*/
    }

    .center_bottom {
        display: flex;
        flex-direction: row;
        /*justify-content:space-between;*/
    }

    .centerTitle {
        position: absolute;
        left: 50%;
        top: -6.6%;
        transform: translateX(-50%);
        font-family: SourceHanSansSC-Medium;
        font-size: 20px;
        color: #FFFFFF;
        line-height: 20px;
    }

    .one, .two, .three, .four {
        width: 320px;
        height: 240px;
        background: rgba(255, 255, 255, 0.10);
        border: 2px solid rgba(255, 255, 255, 0.10);
        border-radius: 9px;
        position: relative;
    }

    .one {
        margin-right: 5%;
    }

    .three {
        margin-right: 5%;
    }

    .center_Box_Title {
        font-family: SourceHanSansSC-Medium;
        font-size: 20px;
        color: #FFFFFF;
        line-height: 20px;
        position: absolute;
        left: 50%;
        top: 5.6%;
        transform: translateX(-50%);
    }

    .smallImage {
        width: 120px;
        height: 120px;
        float: left;
        position: relative;
        top: 28.9%;
        left: 12.3%;
    }

    @media (width: 1024px ) {
        .smallImage {
            width: 100px;
            height: 100px;
            float: left;
            position: relative;
            top: 28.9%;
            left: 12.3%;
        }
    }

    @media (width: 1226px ) {
        .smallImage {
            width: 120px;
            height: 120px;
            float: left;
            position: relative;
            top: 28.9%;
            left: 6.3%;
        }
    }
</style>
