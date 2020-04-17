<template>
    <div class="aspectration bg_blue root_div_container" data-ratio="16:9">
        <div  class="control-panel_div_content fill_parent">
            <div class="title">{{title}}</div>
            <div id="2dContainer" class="container">
                <canvas id="canvas"></canvas>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import Component from 'vue-class-component';
    import { ViewModel } from './ViewModel';

    @Component({
        components: {
            fullScreensLayout
        },
        mixins: [ViewModel]
    })
    export default class App extends Vue {}
</script>
<style scoped>
    .title{
        font-size: 24px;
        color: #000;
        line-height: 40px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 20px;
        left: 24px;
    }
    .container {
        width: 100%;
        height: calc(100% - 60px);
        position: absolute;
        top: 60px;
        left: 0;
    }
</style>