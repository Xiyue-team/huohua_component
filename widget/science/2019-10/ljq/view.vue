<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">{{title}}</div>
                <div id="2dContainer" style="height:100%;background: #2e2e2e;display: flex">
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

  @Component({
    components: {
        fullScreensLayout
    },
    mixins: [ViewModel]
  })
  export default class App extends Vue {}
</script>
<style>
video {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
}
canvas {
        left: 0; 
        top: 0; 
        right: 0; 
        bottom: 0;
        margin: auto;
        z-index: 2;

}

    .title_text{
        font-size: 24px;
        color: #FFFFFF;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }


    .ruler_content {
        margin: auto;
        min-width: 280px;
        position: relative;
    }

    .ruler_content img {
        width: 100%;
        height: 100%;
    }

    .slider {
        position: absolute;
        left: 0px;
        top: -40px;
        /*width: calc( 100% - 180px);
        margin-left: 90px;*/
        width: 100%;
        -webkit-appearance: none;

    }

</style>
