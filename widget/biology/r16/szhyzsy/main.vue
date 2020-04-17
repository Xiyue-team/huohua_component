<template>
    <div class="aspectration bg_white covered root_div_container " data-ratio="16:9">
        <fullScreens_layout>
            <template slot="viewBox" slot-scope="viewBox">
                <span class="title_induction">伞藻核移植实验</span>
                <div id="box">
                    <!--中间视图区        -->
                    <div id="Container">
                        <div class="mainView" :style="{'transform':'scale('+zoom+')'}">
                            <div class="startBeing" v-show="hat">
                                <img src="./sub_static/images/graft.png" @click="beginGraft"/>
                            </div>
                            <div class="imgArea">

                                <div class="imgLeft">
                                    <img :src="greenSrc" :class="{highLevel1:isCover1,addClass1:fg1,addClass2:fg2}"/>
                                    <img src="./sub_static/images/twoPart.png" :class="{highLevel:isCover1}"/>
                                    <img src="./sub_static/images/greenCore.png"
                                         :class="{active1:isChange,normal:isNormal}"/>
                                    <div class="desc1" v-show="hasTxt1">地中海伞藻</div>
                                </div>

                                <div class="imgMid">
                                    <div class="cover" v-show="hasTxt"></div>
                                    <img src="./sub_static/images/mark.png"/>
                                </div>
                                <div class="imgRight">
                                    <img :src="blueSrc" :class="{highLevel1:isCover1,addClass1:fg1,addClass2:fg2}" />
                                    <img src="./sub_static/images/twoPartBlue.png" :class="{highLevel:isCover1}"/>
                                    <img src="./sub_static/images/buleCore.png"
                                         :class="{active2:isChange,normal:isNormal}"/>
                                    <div class="desc1" v-show="hasTxt1">红圆齿伞藻</div>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>

            </template>

            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">
                </div>
            </template>
        </fullScreens_layout>
    </div>
</template>

<script lang='ts'>
    import Vue from "vue";
    import "../../../../src/assets/css/core.css";
    import "../../../../src/assets/css/layout.css";
    import h_button from "../../../../src/component/ui/button.vue";
    import h_switch from "../../../../src/component/ui/switch.vue";
    import h_counter from "../../../../src/component/ui/counter.vue";
    import fullScreens_layout from "../../../../src/component/layout/fullScreens_layout.vue";

    import seletIos from "../../../../src/component/ui/select.vue";
    import Component from "vue-class-component";
    import {MainComponent} from "./services/MainComponent";


    @Component({
        components: {
            h_button,
            h_switch,
            h_counter,
            fullScreens_layout,
            seletIos
        },
        mixins: [MainComponent]
    })


    export default class App extends Vue {
    }

</script>

<style scoped='scoped'>
    .control-block_div_border {
        padding-top: 20px;
        margin-top: 20px;
        background: #FFFFFF;
        border: 0 solid rgba(0, 0, 0, 0.06);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.20);
        border-radius: 6px;
    }

    .view_div_content {

    }

    .title_induction {
        width: 100%;
        height: 76px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: white;
        position: absolute;
        line-height: 76px;
        left: 0;
        padding-left: 24px;
        top: 0;
        background-color: #13212c;
    }

    #box {
        width: 100%;
        margin-top: 76px;
        height: calc(100% - 76px);
        position: relative;
        background-color: #13212c;
    }

    .LeftControlPanel {
        width: 310px;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;

    }

    .LeftControlPanelItem {
        margin-left: 10px;
        width: 300px;
        height: 300px;
        overflow: hidden;
        position: absolute;
        border-radius: 50%;
        border: 2px solid #97d0ff;
        /*position: absolute;*/
        /*left: 50%;*/
        top: 50%;

        transform: translateY(-50%);

    }

    .control-panel_div_floatRight, .mobile_blur, .mobile_right_control {
        right: -280px !important;
    }

    div.mobile_blur {
        right: -280px !important;
    }

    div#Container {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    div.mainView {
        position: absolute;
        /*left: 50%;*/
        /*top: 40%;*/
        /*transform: translate(-50%, -50%);*/
        width: 600px;
        height: 425px;
margin-top: -100px;
    }

    div.startBeing {
        width: 100%;
        height: 48px;
        text-align: center;
        position: absolute;
        left: 0;
        top: 0;
    }

    div.startBeing img {
        width: 108px;
        height: 100%;
        display: inline-block;
        cursor: pointer;
    }

    div.imgArea {
        position: absolute;
        height: 370px;
        top: 48px;
    }

    div.imgLeft {
        position: absolute;
        left: 0;
        top: 0;
        width: 180px;
        height: 370px;
    }

    div.imgLeft img {
        width: 100%;
        height: 330px;
        position: absolute;
        left: 0;
        top: 45px;
    }

    div.imgLeft img:nth-child(1), div.imgRight img:nth-child(1) {
        z-index: 1;
    }

    div.imgLeft img:nth-child(3),div.imgRight img:nth-child(3) {
        z-index: 25;
    }

    div.imgMid {
        position: absolute;
        width: 380px;
        height: 370px;
        left: 95px;
        top: 30px;
    }

    div.imgRight img {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    div.imgMid img {
        position: absolute;
        width: 100%;
        height: 266px;
        left: 50%;
        bottom: 25px;
        transform: translateX(-50%);
        z-index: 8;
    }
    .cover {
        width: calc(100% - 145px);
        height: 60px;
        position: absolute;
        left: 82px;
        top: 65px;
        z-index: 10;
        background-color: #13212c;

    }

    div.imgRight {
        position: absolute;
        width: 180px;
        height: 370px;
        left: 400px;
        top: 0;

    }

    div.imgRight img {
        height: 330px;
        position: absolute;
        top: 45px;
        left: 0;
    }

    .desc1, .desc2 {
        position: absolute;
        bottom: -45px;
        left: 50%;
        height: 30px;
        transform: translateX(-50%);
        ont-family: PingFangSC-Medium;
        font-size: 24px;
        color: #FFFFFF;
        word-break: unset;
        white-space: nowrap;
    }

    .active1 {
        transform: translateX(400px);
        transition: all 2000ms ease;
    }

    .active2 {
        transform: translateX(-400px);
        transition: all 2000ms ease;
    }

    .normal {
        transform: translateX(0);
    }

    .coverChange {
        height: 0;
        transition: height 3000ms ease;
    }

    .highLevel {
        z-index: 20;
    }

    .highLevel1 {
        z-index: 30;
    }
    .addClass1{
        opacity: 0;
    }
    .addClass2{
        opacity: 1;
        transition: opacity 3000ms;
    }
    @media screen and (max-height: 500px) {
    div.mainView {
    margin-top: -30px;
    }

    }
</style>
