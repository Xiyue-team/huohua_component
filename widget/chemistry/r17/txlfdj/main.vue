<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <leftAndRightLayout>
            <template slot="viewBox" scope="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">体心立方堆积</span>
                <div style="width: 100%; height: 100%; display: flex">
                    <div  id="3dContainer" style="margin: auto;width: 100%;height: 100%">

                    </div>
                </div>
            </template>
            <template slot="controlPanel" scope="viewBox" slot-scope="controlPanel">
                <div id="controlPanel" style="height: 100%">

                    <div style="display: flex;height: 100%">
                        <div style="width: 102px;position: absolute;bottom: calc(10% - 10px);right:22px ">
                            <span id="numberPage" style="display: inline-block; font-size: 18px;position: absolute; bottom: 175px; right: 20px; " > 1/5 </span>

                            <div class="leftPage" style="position: absolute; left: 0px; bottom: 117px;" v-on:mousedown="leftPage_mousedown" v-on:mouseup="leftPage_mouseup"
                                 v-on:touchstart="leftPage_mousedown" v-on:touchend="leftPage_mouseup" v-on:mouseout="leftPage_mouseout">
                                <img style="width: 36px;" src="./sub_static/leftPageGray.png" v-show="leftPageGrayShow">
                                <img style="width: 36px;" src="./sub_static/leftPageBlue.png" v-show="leftPageBlueShow">
                            </div>

                            <div class="rightPage" style="position: absolute; right: 0px; bottom: 110px;" v-on:mousedown="rightPage_mousedown" v-on:mouseup="rightPage_mouseup"
                                 v-on:touchstart="rightPage_mousedown" v-on:touchend="rightPage_mouseup"  v-on:mouseout="rightPage_mouseout">
                                <img style="width: 54px;" src="./sub_static/rightPageGray.png" v-show="rightPageGrayShow">
                                <img style="width: 54px;" src="./sub_static/rightPageBiue.png" v-show="rightPageBlueShow">
                            </div>

                            <div class="coordinationNumber" style="position: absolute; left: 0; bottom: 51px; width: 98px; height: 44px" @click="coordination"
                                 v-bind:class="{ event_disabled: coordinationDisable }">
                                <span style="position: absolute; z-index: 2; font-size: 18px; color: #FFFFFF; top: 9px; left: 20px;">配位数</span>
                                <img style="width: 98px" src="./sub_static/buttonGray.png" v-show="buttonGrayShow1">
                                <img style="width: 98px" src="./sub_static/buttonBlue.png" v-show="buttonBlueShow1">
                            </div>

                            <div class="auxiliaryLine" style="position: absolute; left: 0; bottom: 0px; width: 100%; height: 44px" @click="auxiliaryLine"
                                 v-bind:class="{ event_disabled: auxiliaryLineDisable }">
                                <span style="position: absolute; z-index: 2; font-size: 18px; color: #FFFFFF; top: 9px; left: 20px;">辅助线</span>
                                <img style="width: 98px" src="./sub_static/buttonGray.png" v-show="buttonGrayShow2">
                                <img style="width: 98px" src="./sub_static/buttonBlue.png" v-show="buttonBlueShow2">
                            </div>
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
    import h_button from '../../../../src/component/ui/button.vue';
    import leftAndRightLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
    import Component from 'vue-class-component';
    import { MainVueComponent } from './mainVueComponent';

    @Component({
      components: {
        vueSlider,
        h_button,
        leftAndRightLayout,
      },
      mixins: [MainVueComponent]
    })
    export default class App extends Vue {}
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
        top: 24px;
        left: 24px;
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
