<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <leftAndRightLayout>
            <template slot="viewBox" scope="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">角平分线的性质1</span>
                <div style="width: 100%; height: 100%; display: flex">
                    <div  id="3dContainer" style="margin: auto;width: 100%;height: 100%">

                    </div>

                    <div class="buttonExhibition">
                        <h_button title="性质" style="width: 100%;" v-bind:isActive.sync="isActive2" v-bind:clickNumber.sync="clickNumber2"></h_button>
                    </div>

                    <div class="textNature" v-show="isActive2">
                        角平分线上的点到角两边距离相等
                    </div>
                </div>
            </template>
            <template slot="controlPanel" scope="viewBox" slot-scope="controlPanel">

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

    .buttonExhibition {
        width: 72px;
        height: 40px;
        position: absolute;
        right: 25px;
        bottom: 25px;
        z-index: 99;
    }

    .textNature {
        width: 260px;
        height: 48px;
        position: absolute;
        bottom: 21px;
        right: 108px;
        background-color: #FFFFFF;
        border: 1px solid rgba(0,0,0,0.14);
        border-radius: 14px;
        text-align: center;
        font-family: STSongti-SC-Regular;
        font-size: 16px;
        color: #000000;
        line-height: 48px;
    }
</style>
