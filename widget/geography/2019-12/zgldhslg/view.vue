<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text" id="title">{{title}}</div>
                <div id="2dContainer" class="container">
                    <canvas id="canvas"></canvas>
                </div>
                <div class="line_btn_outer">
                    <canvas id="can"></canvas>
                </div>
            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import '../../../../src/assets/css/core.css';
  import '../../../../src/assets/css/layout.css';
  import '../../../../src/assets/css/ui.css';
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

<style scoped="scoped">
    .title_text{
        margin: 0;
        padding:5%;
        position: absolute;
        left:65%;
        font-family: "微软雅黑";
        font-size: 28px;
        color: #000000;
        line-height: 28px;
    }

    .container {
        height: 100%;
        width: 65%;
    }
    .line_btn_outer{
        position:fixed;
        width:35%;
        height:100%;
        top:0;
        right:0px;
    }
</style>
<style>
    .control-panel_div_floatRight {
        height: auto !important;
    }
</style>