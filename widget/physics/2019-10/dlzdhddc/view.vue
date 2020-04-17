<template>
    <div class="aspectration root_div_container" data-ratio="16:9" >
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox" >
                <div class="title_text">{{title}}</div>
                <div id="2dContainer" class="bg">
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
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

  @Component({
    components: {
        fullScreensLayout
    },
    mixins: [ViewModel]
  })
  export default class App extends Vue {}
</script>

<style scoped="scoped">
    .bg {
        background: #202638;
        height: 100%;
    }
    .title_text{
        margin: 0;
        padding:0;
        position: absolute;
        top:32px;
        left:32px;
        font-size: 28px;
        color: #FFFFFF;
        line-height: 28px;
    }
</style>
