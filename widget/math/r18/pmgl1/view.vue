<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <leftAndRightLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">平面公理1</div>
                <div id="3dContainer"></div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel" style="">
                    <label for="checkbox-1" class="control-block_div_border switch" id="shubiao" style="width: 220px;cursor:hand;position: absolute;top: calc(50% - 24px);">
                        <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" v-model="buttonControl" checked>
                        <label for="checkbox-1">平面公理1</label>
                    </label>
                    <div class="font_style" v-show="buttonControl">
                        如果一条直线上的两点在一个平面内，那么这条直线在此平面内。
                    </div>
                </div>
            </template>
        </leftAndRightLayout>

    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import '../../../../src/assets/css/core.css';
  import '../../../../src/assets/css/layout.css';
  import leftAndRightLayout from '../../../../src/component/layout/leftAndRight_layout.vue';
  import Component from 'vue-class-component';
  import { ViewModel } from './ViewModel';
  import vueSlider from '../../../../src/component/ui/vue2-slider.vue';

  @Component({
    components: {
        leftAndRightLayout, vueSlider
    },
    mixins: [ViewModel]
  })
  export default class App extends Vue {}

</script>

<style scoped="scoped">
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
    .font_style{
        position: absolute;
        top: calc(50% + 44px);
        font-size: 16px;
        font-family: '宋体';
        color: #000000;
        transform: scale(1);
    }
</style>
