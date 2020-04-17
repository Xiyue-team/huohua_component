<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <leftAndRightLayout>
            <template slot="viewBox" scope="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">带电粒子在圆形边界中的运动2</span>
                <div style="width: 100%; height: 100%; display: flex">
                    <div  id="3dContainer" style="margin: auto;width: 100%;height: 100%">

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
    import h_button from '../../../../src/component/ui/button.vue';
    import leftAndRightLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
    import Component from 'vue-class-component';
    import { MainVueComponent } from './mainVueComponent';

    @Component({
      components: {
        vueSlider,
        h_button,
        leftAndRightLayout,
      },
      mixins: [MainVueComponent]
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

    .leftPage:hover{
        cursor: pointer;
    }
    .rightPage:hover{
        cursor: pointer;
    }
    .coordinationNumber:hover{
        cursor: pointer;
    }
    .auxiliaryLine:hover{
        cursor: pointer;
    }

</style>
