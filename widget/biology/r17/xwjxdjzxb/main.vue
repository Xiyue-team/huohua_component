<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">显微镜下的几种细胞</div>
                <section>
                    <div class="left_box">
                        <img class="cellPicture" :src="cellPicture">
                    </div>
                    <div id = "microscope" class="center_box" ref="microscope">
                        <img :src="glass">
                    </div>
                    <div class="right_box">
                        <div class="rightBox_top">
                            <div class="characters"><h4>选择物镜类型</h4></div>
                            <div class="mirror">
                                <div class="mirrors">
                                    <div @click="topClickHandle(0)" :class="{active:topIndex == 0 }"
                                         :style="{'background-image': 'url(\'' +bg1 +'\')'} ">
                                        <img src="./sub_static/UI/xz@3x.png" v-show="topIndex == 0"></div>
                                    <p class="times characters">×4</p>
                                </div>
                                <div class="mirrors">
                                    <div @click="topClickHandle(1)" :class="{active:topIndex == 1 }"
                                         :style="{'background-image': 'url(\'' +bg2 +'\')'} ">
                                        <img src="./sub_static/UI/xz@3x.png" v-show="topIndex == 1">
                                    </div>
                                    <p class="times characters">×10</p>
                                </div>
                                <div class="mirrors">
                                    <div @click="topClickHandle(2)" :class="{active:topIndex == 2 }"
                                         :style="{'background-image': 'url(\'' +bg3 +'\')'} "><img
                                            src="./sub_static/UI/xz@3x.png" v-show="topIndex == 2"></div>
                                    <p class="times characters">×40</p>
                                </div>
                            </div>
                        </div>
                        <div class="rightBox_bottom">
                            <div class="characters"><h4>选择细胞</h4></div>
                            <div class="cells">
                                <div class="cell">
                                    <div class="cell_img">
                                        <div @click="bottomClickHandle(0)" :class="{active:bottomIndex == 0}"
                                             :style="{'background-image': 'url(\'' +bg4 +'\')'} ">
                                            <img src="./sub_static/UI/xz@3x.png" v-show="bottomIndex == 0">
                                        </div>
                                    </div>
                                    <div class="cell_text characters"><p>洋葱鳞片叶内表皮细胞</p></div>
                                </div>
                                <div class="cell">
                                    <div class="cell_img">
                                        <div @click="bottomClickHandle(1)" :class="{active:bottomIndex == 1}"
                                             :style="{'background-image': 'url(\'' +bg5 +'\')'} ">
                                            <img src="./sub_static/UI/xz@3x.png" v-show="bottomIndex == 1">
                                        </div>
                                    </div>
                                    <div class="cell_text characters"><p>红凤菜叶片下表皮细胞</p></div>
                                </div>
                                <div class="cell">
                                    <div class="cell_img">
                                        <div @click="bottomClickHandle(2)" :class="{active:bottomIndex == 2}"
                                             :style="{'background-image': 'url(\'' +bg6 +'\')'}">
                                            <img src="./sub_static/UI/xz@3x.png" v-show="bottomIndex == 2">
                                        </div>
                                    </div>
                                    <div class="cell_text characters"><p>人口腔上皮细胞</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import Component from 'vue-class-component';
    import {MainVueComponent} from './mainVueComponent.ts';

    @Component({
        components: {
            fullScreensLayout,
        },
    })
    export default class App extends MainVueComponent {
    }
</script>

<style scoped="scoped">
    * {
        margin: 0;
        padding: 0;
    }

    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    ul, ol, li {
        list-style: none;
    }

    .title_text {
        font-size: 24px;
        color: #000000;
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
    }

    section {
        display: flex;
        width: 80%;
        height: 80%;
        margin: 50px auto;
    }
    @media (max-height: 300px) {
        section{
            width: 70%;
            height: 70%;
        }
    }
    .left_box {
        width: 45%;
        height: 90%;
        margin: auto;
        /*margin-left: 2%;*/
    }

    @media (min-width: 900px ) {
        .left_box {
            margin-top: 8%;
        }
    }
    @media (min-width: 1500px ) {
        .left_box {
            margin-top: 5%;
        }
    }
    @media (max-height: 300px) {
        .left_box {
            width: 41%;
            margin-left: 2%;
        }
    }

    .left_box img {
        display: block;
        width: 100%;
        padding-bottom: 100%;
        margin: auto;
        background-size: 100% 100%;
    }

    .center_box {
        width: 25%;
        height: 70%;
        margin: auto;
        margin-left: 3%;
    }

    .center_box >>> img {
        width: 100%;
        padding-bottom: 100%;
        margin: auto;
        background-size: 100% 100%;
    }

    .right_box {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 30%;
        height: 105%;
        margin: auto;
    }

    .right_box h4 {
        font-weight: 700;
        font-size: 120%;
        color: black;
    }

    .active {
        border: 2px solid #1E90FF !important;
        width: 100%;
        height: 0;
    }

    .rightBox_top {
        width: 90%;
        height: 32%;
    }

    .rightBox_top .mirror {
        width: 100%;
        height: 50%;
        margin-top: 5%;
    }

    .rightBox_top .mirror .mirrors{
        float: left;
        width: 27%;
        height: 100%;
        margin-right: 6%;
    }

    .rightBox_top .mirror .mirrors div {
        width: 100%;
        padding-bottom: 100%;
        background-size: 110% 110%;
        background-position: 50% 50%;
        border: 2px solid #C0C0C0;
        border-radius: 10px;
        margin-bottom: 3%;
        cursor: pointer;
    }

    .rightBox_top .mirror .mirrors div img {
        width: 25%;
        height: auto;
        margin-top: 65%;
        margin-left: 60%;
        display: block;
    }

    .rightBox_top .mirror p {
        text-align: center;
        font-size: 16px;
    }

    .rightBox_bottom {
        width: 90%;
        height: 65%;
        margin-top: 5%;
    }

    .rightBox_bottom .cells {
        width: 100%;
        height: 90%;
    }

    .rightBox_bottom .cells .cell {
        width: 100%;
        height: 27%;
        margin-top: 7%;
        display: flex;
        align-items: center;
    }
    .rightBox_bottom .cells .cell .cell_img{
        margin-right: 4%;
        float: left;
        width: 27%;

    }
    .rightBox_bottom .cells .cell .cell_img div {
        width: 100%;
        padding-bottom: 100%;
        background-size: 120% 120%;
        background-position: 50% 50%;
        border: 2px solid #C0C0C0;
        border-radius: 10px;
        cursor: pointer;
    }

    .rightBox_bottom .cells .cell .cell_img div img {
        width: 25%;
        height: auto;
        margin-top: 65%;
        margin-left: 60%;
    }

    .rightBox_bottom .cells .cell .cell_text {
        width: 70%;
        border: none;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 16px;
    }

</style>
