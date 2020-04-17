<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreens_layout>
            <template slot="viewBox" slot-scope="viewBox">
                <!--<div class="title_text">平行四边形面积割补法</div>-->
                <div id="canvasContainer" class="" style="width: 100%; height: 100%;background: #4B4B4B"></div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel" >

                </div>
            </template>
        </fullScreens_layout>

    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import '../../../../src/assets/css/core.css';
  import '../../../../src/assets/css/layout.css';
  import fullScreens_layout from '../../../../src/component/layout/fullScreens_layout.vue';
  import Component from 'vue-class-component';
  import { ViewModel } from './ViewModel';
  import vueSlider from '../../../../src/component/ui/vue2-slider.vue';

  @Component({
    components: {
        fullScreens_layout, vueSlider
    },
    mixins: [ViewModel]
  })
  export default class App extends Vue {}

</script>

<style scoped="scoped">
    .title_text{
        font-size: 24px;
        color: #FFFFFF;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
        z-index: 2;
    }
    .font_style{
        position: absolute;
        top: calc(50% + 44px);
        font-size: 16px;
        font-family: '宋体';
        color: #000000;
        transform: scale(1);
    }
</style>
<style>

</style>