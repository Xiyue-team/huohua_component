<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <leftAndRightLayout>
            <template slot="viewBox" scope="viewBox" slot-scope="viewBox">
                <div class="title_text">衰变中的动量守恒</div>
                <div class="play_btn" @click="isPlay = !isPlay" >
                    <img v-show="!isPlay"  src="./sub_static/play_icon@2x.png" alt="">
                    <img v-show="isPlay"   src="./sub_static/pause_icon@2x.png" alt="">
                </div>

                <switch2 class="button_Pc_Style buttom_style3" v-bind="switchOption" v-model="switchModel"></switch2>
                <div class="left_image">
                    <img  v-show="isAlpha" src="./sub_static/alpha_decay@2x.png" alt="">
                    <img  v-show="!isAlpha" src="./sub_static/beta_decay@2x.png" alt="">
                </div>
                <div class="bottom_image">
                    <img  v-show="isAlpha" src="./sub_static/alpha_formula@2x.png" alt="">
                    <img  v-show="!isAlpha" src="./sub_static/beta_formula@2x.png" alt="">
                </div>
                <div id="3dContainer"></div>
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
    import switch2 from "../../../../src/component/ui/switch2.vue";

    @Component({
      components: {
        h_button,
        switch2,
        leftAndRightLayout,
      },
      mixins: [ViewModel]
    })
    export default class App extends Vue {}
</script>

<style scoped="scoped">
    .title_text{
        font-size: 24px;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
        color: #FFFFFF;
    }
    .play_btn {
        position: absolute;
        display: inline-block;
        width: 54px;
        height: 54px;
        cursor:pointer;
        right: 24px;
        bottom: 84px;
        z-index: 10;
    }

    .play_btn img {
        width: 100%;
        height: 100%;

    }

    .button_Pc_Style{
        position: absolute;
        right: 24px;
    }

    .buttom_style3 {
        bottom: 24px
    }

    .left_image {
        position: absolute;
        width: 88px;
        height: 132px;
        margin-left: 40px;
        top: calc(50% - 66px);
    }
    .left_image img{
        width: 100%;
        height:100%;
    }

    .bottom_image{
        position: absolute;
        width:172px;
        height:32px;
        bottom: 41px;
        left: calc(50% - 86px);
    }

    .bottom_image img{
        width: 100%;
        height:100%;
    }
</style>
