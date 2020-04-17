<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <leftAndRightLayout>
            <template slot="viewBox" scope="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">面心立方堆积</span>
                <div style="width: 100%; height: 100%; display: flex">
                    <div  id="3dContainer" style="margin: auto;width: 100%;height: 100%">

                    </div>
                </div>
            </template>
            <template slot="controlPanel" scope="viewBox" slot-scope="controlPanel">

                    <div style="display: flex;height: 100%">
                        <div style="width: 102px;position: absolute;bottom: calc(10% - 10px);right:22px ">
                            <span id="numberPage" style="display: inline-block; font-size: 18px;position: absolute; bottom: 175px; right: 20px; " > 1/7 </span>

                            <div class="leftPage" style="position: absolute; left: 0px; bottom: 117px;" v-on:mousedown="leftPage_mousedown" v-on:mouseup="leftPage_mouseup"
                                 v-on:touchstart="leftPage_mousedown" v-on:touchend="leftPage_mouseup" v-on:mouseout="leftPage_mouseout">
                                <img style="width: 36px;" src="./sub_static/leftPageGray.png" v-show="leftPageGrayShow">
                                <img style="width: 36px;" src="./sub_static/leftPageBlue.png" v-show="leftPageBlueShow">
                            </div>

                            <div class="rightPage" style="position: absolute; right: 0px; bottom: 110px;" v-on:mousedown="rightPage_mousedown" v-on:mouseup="rightPage_mouseup"
                                 v-on:touchstart="rightPage_mousedown" v-on:touchend="rightPage_mouseup" v-on:mouseout="rightPage_mouseout"
                                 v-bind:class="{ event_disabled: rightPageDisable }">
                                <img style="width: 54px;" src="./sub_static/rightPageGray.png" v-show="rightPageGrayShow">
                                <img style="width: 54px;" src="./sub_static/rightPageBiue.png" v-show="rightPageBlueShow">
                            </div>

                            <div class="coordinationNumber" style="position: absolute; left: 0; bottom: 51px; width: 98px; height: 44px" @click="coordination"
                                 v-bind:class="{ event_disabled: coordinationDisable }">
                                <span style="position: absolute; z-index: 2; font-size: 18px; color: #FFFFFF; top: 9px; left: 20px;">配位数</span>
                                <img style="width: 98px" src="./sub_static/buttonGray.png" v-show="buttonGrayShow1">
                                <img style="width: 98px" src="./sub_static/buttonBlue.png" v-show="buttonBlueShow1">
                            </div>

                            <div class="auxiliaryLine" style="position: absolute; left: 0; bottom: 0; width: 100%; height: 44px" @click="auxiliaryLine"
                                 v-bind:class="{ event_disabled: auxiliaryLineDisable }">
                                <span style="position: absolute; z-index: 2; font-size: 18px; color: #FFFFFF; top: 9px; left: 20px;">辅助线</span>
                                <img style="width: 98px" src="./sub_static/buttonGray.png" v-show="buttonGrayShow2">
                                <img style="width: 98px" src="./sub_static/buttonBlue.png" v-show="buttonBlueShow2">
                            </div>
                        </div>
                    </div>

            </template>
        </leftAndRightLayout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import {ViewController} from '../../../../src/core/ViewController';
    import h_button from '../../../../src/component/ui/button.vue';
    import leftAndRightLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import {MxlfdjViewHandler} from './services/MxlfdjViewHandler';
    import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
    import {ViewOption} from "../../../../src/core/CoreInterface";

    export default Vue.extend({
        components: {
            vueSlider,
            h_button,
            leftAndRightLayout,
        },
        data() {
            return{
                angleDirection: "",
                leftPageGrayShow: true,
                leftPageBlueShow: false,
                rightPageGrayShow: true,
                rightPageBlueShow: false,
                buttonGrayShow1: true,
                buttonBlueShow1: false,
                buttonGrayShow2: true,
                buttonBlueShow2: false,
                numberPage: 1,
                flag: true,
                coordinationDisable: false,
                auxiliaryLineDisable: true,
                rightPageDisable: false,
                clearTimeout: 1,
            };
        },
        computed: {
        },
        created() {
            const viewOption = new ViewOption();
            viewOption.controlPanelAnimationDelay = 1000;
            ViewController.getInstance(new MxlfdjViewHandler(this) , viewOption);
            ViewController.getInstance().viewHandler.beforeRenderElement();
        },
        mounted() {
            ViewController.getInstance().domReady();
        },
        methods: {
            resetEvent() {
                // 重置场景
                (ViewController.getInstance().viewHandler as MxlfdjViewHandler).mxlfdj3DModel.reset();

                // 重置页数
                this.numberPage = 1;
                document.getElementById('numberPage').innerText = this.numberPage + '/7';

                // 重置按钮配位数
                this.buttonGrayShow1 = true;
                this.buttonBlueShow1 = false;

                // 重置按钮辅助线
                this.buttonGrayShow2 = true;
                this.buttonBlueShow2 = false;

                // 设置配位数按钮可点
                this.coordinationDisable = false;
                // 设置辅助线按钮不可点
                this.auxiliaryLineDisable = true;

                // 恢复右翻页按钮可点击
                clearTimeout(this.clearTimeout);
                this.rightPageDisable = false;
            },

            leftPage_mousedown() {
                this.leftPageGrayShow = false;
                this.leftPageBlueShow = true;
            },

            leftPage_mouseup() {
                this.leftPageGrayShow = true;
                this.leftPageBlueShow = false;

                if( this.flag ){
                    setTimeout(() => {
                        this.flag = true;
                    },200);

                    if (this.numberPage > 1) {
                        this.numberPage --;
                        (ViewController.getInstance().viewHandler as MxlfdjViewHandler).mxlfdj3DModel.showObj(this.numberPage);
                        // 点击后两个按钮变回原样
                        this.buttonGrayShow1 = true;
                        this.buttonBlueShow1 = false;

                        this.buttonGrayShow2 = true;
                        this.buttonBlueShow2 = false;
                    }
                    document.getElementById('numberPage').innerText = this.numberPage + '/7';
                }

                // 恢复右翻页按钮可点击
                clearTimeout(this.clearTimeout);
                this.rightPageDisable = false;

                this.flag = false;

                // 置灰配位数按钮
                if (this.numberPage === 1 || this.numberPage === 4) {
                    this.coordinationDisable = false;
                } else {
                    this.coordinationDisable = true;
                }

                //置灰辅助线按钮
                if (this.numberPage === 7) {
                    this.auxiliaryLineDisable = false;
                } else {
                    this.auxiliaryLineDisable = true;
                }

            },

            rightPage_mousedown() {
                this.rightPageGrayShow = false;
                this.rightPageBlueShow = true;
            },

            rightPage_mouseup() {
                this.rightPageGrayShow = true;
                this.rightPageBlueShow = false;

                if( this.flag ){
                    setTimeout(() => {
                        this.flag = true;
                    },200);

                    if (this.numberPage < 7) {
                        this.numberPage ++
                        (ViewController.getInstance().viewHandler as MxlfdjViewHandler).mxlfdj3DModel.showObj(this.numberPage);
                        // 点击后两个按钮变回原样
                        this.buttonGrayShow1 = true;
                        this.buttonBlueShow1 = false;

                        this.buttonGrayShow2 = true;
                        this.buttonBlueShow2 = false;

                        if (this.numberPage === 6) {
                            this.rightPageDisable = true;
                            this.clearTimeout = setTimeout(() => {
                                this.rightPageDisable = false;
                            }, 1500)
                        }
                    }
                    document.getElementById('numberPage').innerText = this.numberPage + '/7';
                }
                this.flag = false;

                // 置灰配位数按钮
                if (this.numberPage === 1 || this.numberPage === 4) {
                    this.coordinationDisable = false;
                } else {
                    this.coordinationDisable = true;
                }

                //置灰辅助线按钮
                if (this.numberPage === 7) {
                    this.auxiliaryLineDisable = false;
                } else {
                    this.auxiliaryLineDisable = true;
                }
            },

            leftPage_mouseout() {
                this.leftPageGrayShow = true;
                this.leftPageBlueShow = false;
            },

            rightPage_mouseout() {
                this.rightPageGrayShow = true;
                this.rightPageBlueShow = false;
            },

            coordination() {
                (ViewController.getInstance().viewHandler as MxlfdjViewHandler).mxlfdj3DModel.coordinationNumberClick(this.buttonGrayShow1);

                if (this.buttonGrayShow1) {
                    this.buttonGrayShow1 = false;
                    this.buttonBlueShow1 = true;
                } else {
                    this.buttonGrayShow1 = true;
                    this.buttonBlueShow1 = false;
                }

            },

            auxiliaryLine() {
                (ViewController.getInstance().viewHandler as MxlfdjViewHandler).mxlfdj3DModel.auxiliaryLineClick(this.buttonGrayShow2);
                if (this.buttonGrayShow2) {
                    this.buttonGrayShow2 = false;
                    this.buttonBlueShow2 = true;
                } else {
                    this.buttonGrayShow2 = true;
                    this.buttonBlueShow2 = false;
                }
            }
        },
        watch: {

        }
    });
</script>

<style scoped="scoped">
    body{
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    .title_text{
        font-size: 24px;
        color: #000000;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }

    .leftPage:hover{
        cursor: pointer;
    }
    .rightPage:hover{
        cursor: pointer;
    }
    .coordinationNumber:hover{
        cursor: pointer;
    }
    .auxiliaryLine:hover{
        cursor: pointer;
    }

</style>
