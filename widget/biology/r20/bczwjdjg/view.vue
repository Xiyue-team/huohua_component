<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="3dContainer" style="width: 100%;height: 100%; ">
                </div>
                <div class="title_text">木本植物茎的结构</div>
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
  import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';
  import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
  @Component({
    components: {
        fullScreensLayout, buttonPrimary, vueSlider
    },
    mixins: [ViewModel]
  })
  export default class App extends Vue {}

</script>

<style scoped="scoped">
    .title_text{
        font-size: 24px;
        color: #ffffff;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }

</style>
