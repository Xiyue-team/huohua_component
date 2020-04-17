<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="3dContainer" style="width: 100%;height: 100%; background-color: #4B4B4B">
                </div>
                <div @click="high">
                    <buttonPrimary class="buttonP2" v-bind:title="newTitle" type="ellipse" v-bind:actived="color">
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
  import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue'
  import Component from 'vue-class-component';
  import { MainVueComponent } from './mainVueComponent';
  import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';

  @Component({
    components: {
      fullScreensLayout,
      buttonPrimary
    },
    mixins: [MainVueComponent]
  })
  export default class App extends Vue {}
</script>

<style scoped="scoped">
    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .buttonP2 {
        position: absolute;
        width: 58px;
        height: 42px;
        bottom: 24px;
        right: 24px;
    }

</style>
