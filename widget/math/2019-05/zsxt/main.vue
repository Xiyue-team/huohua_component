<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">赵爽弦图</span>
                <div class="button_box" id="button_box">
                    <button id="button1" :class="{'bulecomplete': ishave}" @click="clickbutton(0)">切换</button>
                    <button id="button2" :class="{'bulecomplete': ishave1}" @click="clickbutton(1)" v-show="show">表达式</button>
                    <button id="button3" :class="{'bulecomplete': ishave2}" @click="clickbutton(2)">勾股定理</button>
                </div>
                <div class="img_box" v-show="imgShow" id="imgBox">
                    <img src="./sub_static/ex.png">
                </div>
                <div style="width: 100%; height: 100%" class="box">
                    <div id="3dContainer" style="margin: auto;width: 100%;height: 100%">
                    </div>
                </div>
                <button class="textMid" id="textMid" v-show="textMid">黄实</button>
            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
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
.control_div_resetBtn{
    z-index: -1!important;
}
.title_text {
    font-family: SourceHanSansHWSC-Regular;
    font-size: 28px;
    color: #FFFFFF;
    line-height: 28px;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 24px;
    left: 24px;
    z-index: 100;
}
.button_box{
    width: 104px;
    height: 170px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    align-content: center;
}
.button_box>button{
    width: 104px;
    height: 42px;
    cursor: pointer;
    border-radius: 21px;
    background: #EBEBEB;
    font-family: PingFangSC-Medium;
    font-size: 2vh;
    color: #525252;
    text-align: center;
    display: flex;
    justify-content:center;
}
.bulecomplete{
       background-color: #1E90FF!important;
       color: white!important;
   }
.img_box{
    width:192.6px;
    height: 140.4px;
    position: absolute;
    background-color: #373737;
    border: 1px solid grey;
    border-radius: 14px;
}
.img_box>img{
    width: 100%;
    height: 100%;
}
.textMid{
    width: 100px;
    height: 80px;
    position: absolute;
    top: 45.8%;
    left: 50%;
    transform: translate(-50%);
    color: #000;
    font-size: 2.5vh;
    background-color: rgba(0, 0, 0, 0);
    z-index: 1000;
}
</style>