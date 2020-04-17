<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout :style="{zoom: zoom1}">
            <template slot="viewBox" slot-scope="viewBox">
                <div class="full" id="full">
                    <div class="full_img" id="full_img">
                        <img :src="img1" id="im">
                    </div>
                    <div class="head">
                        <div id="title" class="title_text">油菜植株及其六大器官</div>
                    </div>
                    <div class="button_box">
                        <div class="pad_box"
                             v-for="(item, index) in textArr"
                             :key="index">
                            <button :class="{an_niu: have, 'bulecomplete': index === ishave}"
                                :id="'index' + index"
                                v-text="item"
                                @click="clickbutton(index)"
                        ></button>
                        </div>
                    </div>
                    <div class="explain" id="explain" v-show="explain">
                        <div></div>
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
.head{
    width: 100%;
    height: 5%;
}
.title_text{
    font-family: PingFangSC-Medium;
    font-size: 24px;
    line-height: 24px;
    line-height: 24px;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 24px;
    left: 24px;
    color: #000000;
    z-index: 100;
}
.full{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgb(249, 248, 229);
}
.full>.full_img{
    width: 100%;
    height: 100%;
}
.full>.full_img>img{
    width: 100%;
    height: 100%;
}
.button_box{
    width: 90px;
    height: 350px;
    position: absolute;
    top: 29%;
    right: 2.3%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    align-content: center;
}
.pad_box{
    width: 88px;
    height: 42px;
    cursor: pointer;
    display: flex;
    justify-content:center;
}
.an_niu{
    width: 100%;
    background: #FFFFFF;
    font-family: PingFangSC-Medium;
    padding: 12px 16px;
    font-size: 16px;
    line-height: 16px;
    color: #000000; 
    border: 1px solid #EBEBEB;
    text-align: center;
    align-items: center;
    border-radius: 24px;
}
.bulecomplete{
       background-color: #1E90FF;
       color: white;
   }
.explain{
    width: 346px;
    height: 491px;
    position: absolute;
    top: 50%;
    right: 16.3%;
    transform: translate(0, -50%);
}
.explain>img{
    width: 100%;
    height: 100%;
}
@media (max-height: 300px) {
    .an_niu{
    padding: 14px 16px 12px 16px;
}
}
</style>