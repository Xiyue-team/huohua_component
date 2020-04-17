<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
            <span class="title_style" :style="{zoom: zoom1}">{{title}}</span>
            <div id="3dContainer" class="Container" :style="{'background-image': 'url(\"" + backImg +'\')'} "></div>
            <button class="opation" id="opation" v-show="isShow">点击出现下级分支</button>
            <button class="zhiwu" id="zhiwu" @click="appearSubordinate(17)">植物</button>
            <button class="plant"
                    v-for="(item, index) in textArr"
                    :key="'indexIn' + index"
                    :id="'index' + index"
                    v-show="item.text"
                    v-html="item.text"
                    @click="appearSubordinate(index)"
            ></button>
            <div class="srcArr"
                 v-for="(item, index) in srcArr"
                 :key="'inde' + index"
                 :id="'getimg' + index"
            >
                <img :src="item.src"  v-show="item.src">
            </div>
            <div class="imgBox"
                 v-for="(item, index) in imgBox"
                 :key="'indexInde' + index"
                 :id="'img' + index"
                 v-show="isImgShow"
            >
                <img :src="item" :id="'dragImg' + index" ondragstart="return false">
            </div>
            <button class="optiontext"
                 v-for="(item, index) in optionText"
                 :key="'indexinD' + index"
                 :id="'optiontext' + index"
                 v-text="item"
                 v-show="item"
            ></button>
            <button class="optiontext"
                 v-for="(item, index) in optionTextleft"
                 :key="'indexitem' + index"
                 :id="'optiontextleft' + index"
                 v-text="item"
                 v-show="item"
            ></button>
            <!-- <div class="resetBox" @click="reset"><img src="./sub_static/chongzhi.png"></div> -->
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

        mixins: [MainVueComponent]
    })
    export default class App extends Vue {
    }
</script>

<style scope>
    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    .title_style {
        width: 420px;
        height: 28px;
        font-size: 24px;
        color: #fff;
        line-height: 28px;
        position: absolute;
        left: 24px;
        top: 24px;
        z-index: 1000;
    }
    .Container {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
    }
    .opation{
        position: absolute;
        opacity: 0.3;
        font-size: 8vh;
        background-color: rgba(0, 0, 0, 0);
        font-family: SourceHanSansSC-Medium;
        color: #FFFFFF;
        text-align: center;
        z-index: 1000;
    }
    .resetBox{
        width: 48px;
        height: 40px;
        position: absolute;
        top: 20px;
        right: 24px;
        background: #FFFFFF;
        border: 0 solid rgba(0,0,0,0.06);
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08);
        border-radius: 6px;
        cursor: pointer;
        z-index: 1000;
    }
    .zhiwu,.plant{
        position: absolute;
        font-size: 1.1vw;
        font-weight: bold;
        background-color: rgba(0, 0, 0, 0);
        z-index: 1000;
    }
    .zhiwu{
        font-size: 1.3vw!important;
    }
    .optiontext, .imgBox{
        position: absolute;
        z-index: 1000;
    }
    .optiontext{
        color: #fff;
        font-size: 1.1vw;
        background-color: rgba(0, 0, 0, 0);
    }
    .srcArr{
        position: absolute;
        opacity: 0.3;
        background: #FFFFFF;
        border-radius: 8px;
        z-index: 1000;
    }
    .srcArr>img{
        width:100%;
        height:100%;
    }
    .imgBox>img{
        width:100%;
        height:100%;
    }
    .resetBox>img{
        width: 24px;
        margin-top: 8px;
        margin-left: 12px;
    }
    @media (max-width: 1000px) {
        .resetBox{
            top: 4px;
            right: 4px;
            transform: scale(0.8);
    }
    }
    @media (max-height: 340px) {
        .control_div_resetBtn{
            transform: scale(0.7)!important;
            top: 0!important;
            right: 0!important;
        }
    }
</style>

