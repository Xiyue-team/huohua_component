<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">空间直角坐标系-坐标平面</div>
                <div id="3dContainer"></div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel" class="buttonControlStyle" v-bind:class="{'buttonControlMobileStyle' : isMobile}">
                    <label for="checkbox-1" class="control-block_div_border switch" style="width: 220px;cursor:hand;margin-top: 20px">
                        <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" v-model="buttonControl1" checked>
                        <label for="checkbox-1">xoy</label>
                    </label>
                    <label for="checkbox-2" class="control-block_div_border switch" style="width: 220px;cursor:hand;margin-top: 20px">
                        <input type="checkbox" name="checkbox-cats[]" id="checkbox-2" v-model="buttonControl2" checked>
                        <label for="checkbox-2">yoz</label>
                    </label>
                    <label for="checkbox-3" class="control-block_div_border switch" style="width: 220px;cursor:hand;margin-top: 20px">
                        <input type="checkbox" name="checkbox-cats[]" id="checkbox-3" v-model="buttonControl3" checked>
                        <label for="checkbox-3">zox</label>
                    </label>
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
  import { ViewModel } from './ViewModel';
  import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
  import h_button from '../../../../src/component/ui/button.vue';

  @Component({
    components: {
        fullScreensLayout, vueSlider, h_button
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
    .buttonControlStyle {
        width: 100%;
        height: calc(100% - 48px);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
    }
    .buttonControlMobileStyle{
        height: 100%;
    }
</style>
