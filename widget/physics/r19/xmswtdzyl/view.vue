<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">斜面上物体的作用力与反作用力</div>
                <div id="3dContainer" style="width: 100%;height: 100%;">

                </div>
                <div @click="forceEvent">
                    <buttonPrimary class="buttonForce" v-bind:title="forceTitle" type="ellipse" v-bind:actived="showColor1">
                    </buttonPrimary>
                </div>

                <div @click="antiForceEvent" v-bind:class="{ event_disabled: flag }">
                    <buttonPrimary class="buttonAntiForce" v-bind:title="antiForceTitle" type="ellipse" v-bind:actived="showColor2">
                    </buttonPrimary>
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">

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
  import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';

  @Component({
    components: {
      fullScreensLayout,
      buttonPrimary
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

    .buttonForce {
        width: 124px;
        height: 42px;
        position: absolute;
        right: 24px;
        bottom: 78px;
    }

    .buttonAntiForce {
        width: 124px;
        height: 42px;
        position: absolute;
        right: 24px;
        bottom: 24px;
    }



</style>

