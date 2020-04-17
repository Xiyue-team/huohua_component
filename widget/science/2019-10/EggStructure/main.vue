<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox">
                <div class="title_text" :style="`color: ${color}`">{{title_text}}</div>
                <div id="Container3d" style="width: 100%; height: 100%;">
                    <canvas
                            id="renderCanvas"
                            touch-action="none"
                            width="1080"
                            height="1080"
                            tabindex="1"
                            style="opacity: 1;"
                    ></canvas>
                </div>
                <div class="buttonG">
          <div class="button_Formula" v-for="(item, index) in options" @click="ButtonEvent(index)">
            <buttonPrimary
              style="width: 100%"
              v-bind:title="item"
              v-bind:actived="buttonActived===index"
              type="ellipse"
            ></buttonPrimary>
          </div>
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
    import buttonPrimary from '../../../babylon/template/ui/buttonPrimary.vue';
    import { ViewModel } from './ViewModel';

    @Component({
        components: {
            fullScreensLayout,
            buttonPrimary
        },
        mixins: [ViewModel]
    })
    export default class App extends Vue {
    }
</script>

<style scoped="scoped">
    body {
        overflow: hidden !important;
    }

    #renderCanvas {
        width: 100%;
        height: 100%;
        outline: 0;
    }

    .title_text {
        font-size: 24px;
        line-height: 24px;
        color: #fff;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 3;
    }

    .buttonG {
        position: absolute;
        width: 100px;
        height: auto;
        min-height: 42px;
        bottom: 24px;
        right: 24px;
    }
    .button_Formula {
        float: left;
        width: 100%;
        height: 42px;
        margin-top: 12px;
    }
    @media screen and (min-height: 600px) and (max-height: 800px) {

    }
    @media screen and (min-height: 450px) and (max-height: 599px) {

    }

    @media screen and (min-height: 300px) and (max-height: 449px) {
        .buttonG {
            width: 70px;
        }
        .button_Formula {
            height: 28px;
            margin-top: 8px;
        }
    }
</style>

<style>
    /*右侧面板*/
    .control-panel_div_floatRight {
        padding: 0px !important;
    }
</style>
