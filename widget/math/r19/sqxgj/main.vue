<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <exerciseLayout v-bind="exerciseOption">
            <template slot="box" slot-scope="box">
                <div  id="box" style="width: 100%;height: 100%;display: flex">
                    <div class="model_content" style="width: 100%;height: 100%;display: flex">
                        <div id="3dContainer" class="model3d_content transtaion_animation2" style="width: 100%;height: 100%;display: flex">
                        </div>
                        <div class="drawHyperbola" :class="{active:active1}" v-show="showDraw" @click ="drawHyperBola">绘制</div>
                    </div>
                </div>
            </template>
        </exerciseLayout>
    </div>
</template>

<script lang="ts">
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import exerciseLayout from '../../../../src/component/layout/exercise_layout.vue';
    import Component from 'vue-class-component';
    import {MainVueComponent} from './mainVueComponent.ts';

    @Component({
        components: {
            exerciseLayout,
        },
    })
    export default class App extends MainVueComponent {
    }
</script>

<style scoped="scoped">
    * {
        margin: 0;
        padding: 0;
    }

    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    ul, ol, li {
        list-style: none;
    }
    .drawHyperbola{
        width: 72px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        border: 1px solid rgba(0,0,0,0.12);
        border-radius: 21px;
        background-color: #FFFFFF;
        position: absolute;
        right: 24px;
        font-size: 16px;
        color: #525252;
        bottom: 24px;
        z-index: 99;
        cursor: pointer;
    }
    .active {
        color: #fff;
        background-color: #0199FF;
    }
</style>
