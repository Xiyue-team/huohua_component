<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <leftAndRightLayout>
            <template slot="viewBox" scope="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">抛物线的定义</span>
                <div style="width: 100%; height: 100%; display: flex">
                    <div  id="3dContainer" style="margin: auto;width: 100%;height: 100%">

                    </div>
                </div>
            </template>
            <template slot="controlPanel" scope="viewBox" slot-scope="controlPanel">
                <div class="buttonArray">
                    <div class="buttonDraw" v-bind:class="{ event_disabled: disableButtonDraw }" @click="buttonDrawEvent">
                        <h_button title="绘制" style="width: 100%;" v-bind:isActive.sync="isActive" v-bind:clickNumber.sync="clickNumber"></h_button>
                    </div>

                    <div class="buttonExhibition">
                        <div class="middleButtonExhibition">
                            展示
                        </div>
                        <div class="leftButtonExhibition" @click="leftButtonExhibitionEvent">
                            <img style="width: 100%; height: 100%" src="./sub_static/whitePoint.png" v-show="!(showExhibition === 1)"/>
                            <img style="width: 100%; height: 100%" src="./sub_static/bluePoint.png"  v-show="showExhibition === 1"/>
                        </div>
                        <div class="rightButtonExhibition" @click="rightButtonExhibitionEvent">
                            <img style="width: 100%; height: 100%" src="./sub_static/whitePoint.png" v-show="!(showExhibition === 2)"/>
                            <img style="width: 100%; height: 100%" src="./sub_static/bluePoint.png"  v-show="showExhibition === 2"/>
                        </div>
                        <div class="topButtonExhibition" @click="topButtonExhibitionEvent">
                            <img style="width: 100%; height: 100%" src="./sub_static/whitePoint.png" v-show="!(showExhibition === 3)"/>
                            <img style="width: 100%; height: 100%" src="./sub_static/bluePoint.png"  v-show="showExhibition === 3"/>
                        </div>
                        <div class="bottomButtonExhibition" @click="bottomButtonExhibitionEvent">
                            <img style="width: 100%; height: 100%" src="./sub_static/whitePoint.png" v-show="!(showExhibition === 4)"/>
                            <img style="width: 100%; height: 100%" src="./sub_static/bluePoint.png"  v-show="showExhibition === 4"/>
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
    import h_button from '../../../../src/component/ui/buttonEllipse.vue';
    import leftAndRightLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import Component from 'vue-class-component';
    import { ViewModel } from './ViewModel';

    @Component({
      components: {
        h_button,
        leftAndRightLayout,
      },
      mixins: [ViewModel]
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
        top:24px;
        left:24px;
    }

    .buttonArray {
        width: 219px;
        height: 114px;
        position: absolute;
        bottom: 60px;
        right: 24px;
    }

    .buttonDraw {
        width: 72px;
        height: 45px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
    }

    .buttonExhibition {
        width: 144px;
        height: 100%;
        position: absolute;
        right: 0;
    }

    .middleButtonExhibition {
        width: 72px;
        height: 42px;
        background-color: #0199FF;
        border-radius: 21px;
        font-size: 16px;
        color: white;
        text-align: center;
        line-height: 42px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }

    .leftButtonExhibition {
        width: 36px;
        height: 36px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        margin: auto;
    }

    .leftButtonExhibition:hover {
        cursor: pointer;
    }

    .rightButtonExhibition {
        width: 36px;
        height: 36px;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
    }

    .rightButtonExhibition:hover {
        cursor: pointer;
    }

    .topButtonExhibition {
        width: 36px;
        height: 36px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
    }

    .topButtonExhibition:hover {
        cursor: pointer;
    }

    .bottomButtonExhibition {
        width: 36px;
        height: 36px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }

    .bottomButtonExhibition:hover {
        cursor: pointer;
    }
</style>
