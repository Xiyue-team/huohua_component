<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span class="title_style">色光的混合</span>

                <div id="3dContainer" class="Container" :style="{'background-image': 'url(\'' +bg +'\')'} "></div>
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

<style scoped="scoped">
    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
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
    }

    .Container {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
    }

    @media (max-width: 1000px) {
        .title_style {
            left: 10px;
            top: 10px;
        }
    }
</style>