<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">安培力方向垂直于电流与磁场所成的面</div>
                <div id="3dContainer" style="width: 100%;height: 100%">

                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">
                    <img src="./sub_static/circle.png"
                         style="width: 120px; height: 120px;position: absolute;right: 24px;bottom: 24px;" class="circle"
                         ondragstart="return false;" id="circleImg"/>

                    <div id="arrowImg" class="arrowRotate"
                         style="width: 54px; height: 14px;position: absolute;right: 30px;bottom: 77px;transform-origin: 0px 7px;">
                        <img id="arrow" src="./sub_static/arrow.png" style="width: 54px; height: 14px;"
                             ondragstart="return false;">
                    </div>

                    <div id="kCanvas" style="width: 160px; height: 160px; position: absolute;bottom: 4px; right: 4px">

                        <!--旋转指针-->

                    </div>
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

<style scoped="scoped">
    .title_text{
        font-size: 24px;
        color: #fff;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }

    .arrowRotate {
        transform: rotate(-90deg);
    }

</style>

