<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text" :class="{'title_text_m': isMobile}">{{title}}</div>
                <div id="2dContainer" class="container">
                    <canvas id="canvas"></canvas>
                </div>
                <button id="practiceButton" class="button btn" :class="{'btn_mobile': isMobile}"
                    @click="handlePractice">{{practiceButtonText}}</button>
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
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
        font-size: 28px;
        color: #FFFFFF;
        line-height: 28px;
    }

    .title_text_m{
        font-size: 25px;
        line-height: 25px;
    }

    .container {
        background: #98ccdd;
        height: 100%;
    }

    .btn {
        position: absolute;
        display: inline-block;
        text-align: center;
        min-width: 80px;
        cursor:pointer;
        right: 24px;
        bottom: 30px;
        z-index: 99;
        box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
        border-radius: 21px;
    }

    .btn_mobile {
        right: 30px;
    }
</style>
<style>
    .control-panel_div_floatRight {
        height: auto !important;
    }
</style>
