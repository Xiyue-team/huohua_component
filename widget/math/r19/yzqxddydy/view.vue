<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <leftAndRightLayout>
            <template slot="viewBox" scope="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">圆锥曲线的第一定义</span>
                <div style="width: 100%; height: 100%; display: flex">
                    <div  id="3dContainer" style="margin: auto;width: 100%;height: 100%">

                    </div>

                    <div class="threeEquation" >
                        <div class="firstEquation" @click="firstEquationEvent" v-bind:style="{ opacity: firstOpacity }">
                            <img src="./sub_static/firstEquation.png" style="width: 100%"/>
                        </div>

                        <div class="secondEquation" @click="secondEquationEvent" v-bind:style="{ opacity: secondOpacity }">
                            <img src="./sub_static/secondEquation.png" style="width: 100%"/>
                        </div>

                        <div class="thirdEquation" @click="thirdEquationEvent" v-bind:style="{ opacity: thirdOpacity }">
                            <img src="./sub_static/thirdEquation.png" style="width: 100%"/>
                        </div>
                    </div>
                </div>
            </template>
            <template slot="controlPanel" scope="viewBox" slot-scope="controlPanel">
                <div class="buttonArray">
                    <div class="buttonDraw" v-bind:class="{ event_disabled: disableButtonDraw }" @click="buttonDrawEvent">
                        <h_button title="绘制" style="width: 100%;" v-bind:isActive.sync="isActive" v-bind:clickNumber.sync="clickNumber"></h_button>
                    </div>

                    <div class="buttonExhibition" v-bind:class="{ event_disabled: disableButtonExhibition }" @click="buttonExhibitionEvent">
                        <h_button title="展示" style="width: 100%;" v-bind:isActive.sync="isActive2" v-bind:clickNumber.sync="clickNumber2"></h_button>
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
        width: 168px;
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
        width: 72px;
        height: 45px;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }



    .threeEquation {
        position: absolute;
        width: 300px;
        height: 196px;
        top: 96px;
        left: 24px;
    }

    .firstEquation {
        width: 280px;
        height: 40px;
        position: absolute;
        top: 0;
    }

    .secondEquation {
        width: 300px;
        height: 50px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
    }

    .thirdEquation {
        width: 94px;
        height: 34px;
        position: absolute;
        bottom: 0;
    }

    .firstEquation:hover {
        cursor: pointer;
    }

    .secondEquation:hover {
        cursor: pointer;
    }

    .thirdEquation:hover {
        cursor: pointer;
        box-shadow:0px 0px 20px gray;
    }


</style>
