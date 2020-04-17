<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span class="title_style">组合2</span>
                <div class="text" v-if="text_show" :style="{zoom: zoom1}">对象可拖动到任意位置</div>
                <div id="3dContainer" class="Container"></div>
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

        mixins: [MainVueComponent]
    })
    export default class App extends Vue {
    }
</script>

<style>
    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    .button_border,
    .control_div_mobileResetBtn
     {
        width: 0!important;
        height: 0!important;
    }
    .button_border>img {
        width: 0!important;
        height: 0!important;
    }
    .title_style {
        width: 336px;
        height: 24px;
        font-size: 24px;
        color: #ffffff;
        line-height: 24px;
        position: absolute;
        left: 24px;
        top: 24px;
        z-index: 1000;
    }

    .Container {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .text{
        width: 70vw;
        height: 100vw;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0.1;
        font-family: SourceHanSansHWSC-Regular;
        font-size: 72px;
        color: #FFFFFF;
        line-height: 100vw;
        z-index: 100;
        text-align: center;
    }

    @media (max-width: 1000px) {
        .title_style {
            left: 10px;
            top: 10px;
        }
    }
</style>