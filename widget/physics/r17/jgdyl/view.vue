<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="3dContainer" style="width: 100%;height: 100%;">

                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">

            </template>
        </fullScreensLayout>

        <div class="widgetTitle">极光为什么出现在南北极</div>
        <div  style="position: absolute; bottom: 85px; right: 12px; z-index: 9" v-bind:class="{ 'event_disabled': disableStatus}" v-show="showButton">
            <div @click="circumferenceEvent">
                <p_button style="width: 128px; margin-top: 0px; margin-right: 0px" v-bind:title="newTitle1" type="ellipse" @click.native="newTitle1 = '圆周运动'"
                          v-bind:actived="startCircleAnimation">

                </p_button>
            </div>

            <div @click="screwEvent">
                <p_button style="width: 128px; margin-top: 12px; margin-right: 0px" v-bind:title="newTitle2" type="ellipse" @click.native="newTitle2 = '螺旋线运动'"
                          v-bind:actived="startSpiralCurveAnimation">

                </p_button>
            </div>
        </div>

        <div class="changeButton"  v-bind:class="{'event_disabled': isActive1}" v-show="showStep">
            <div class='button-arrow right'   @click="next">
                <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 51 (57462) - http://www.bohemiancoding.com/sketch -->
                    <g id="公用" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="控件尺寸907" transform="translate(-729.000000, -172.000000)" fill="#6B6B6B" fill-rule="nonzero">
                            <g id="右翻页按钮" transform="translate(714.000000, 157.000000)">
                                <g id="Group-2">
                                    <g transform="translate(15.000000, 15.000000)">
                                        <path d="M19.5857864,13 L3,13 C2.44771525,13 2,12.5522847 2,12 L2,12 C2,11.4477153 2.44771525,11 3,11 L19.5857864,11 L12.1005051,3.51471863 C11.7099808,3.12419433 11.7099808,2.49102936 12.1005051,2.10050506 L12.1005051,2.10050506 C12.4910294,1.70998077 13.1241943,1.70998077 13.5147186,2.10050506 L22.7071068,11.2928932 C22.8880712,11.4738576 23,11.7238576 23,12 C23,12.2761424 22.8880712,12.5261424 22.7071068,12.7071068 L13.5147186,21.8994949 C13.1241943,22.2900192 12.4910294,22.2900192 12.1005051,21.8994949 L12.1005051,21.8994949 C11.7099808,21.5089706 11.7099808,20.8758057 12.1005051,20.4852814 L19.5857864,13 Z" id="Combined-Shape"></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
        </div>


        <img v-if="showPlay" class="playImg" src="./sub_static/play@2x.png"  @click="playAnimation" />
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import '../../../../src/assets/css/core.css';
  import '../../../../src/assets/css/layout.css';
  import h_arrow from "../../../../src/component/ui/buttonArrow.vue";

  import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
  import Component from 'vue-class-component';
  import { ViewModel } from './ViewModel';
  import p_button from '../../../../src/component/ui/buttonPrimary.vue';

  @Component({
    components: {
      fullScreensLayout, p_button, h_arrow
    },
    mixins: [ViewModel]
  })
  export default class App extends Vue {}

</script>
<style>
    canvas {
        background-image: url('./sub_static/bg@2x.png');
    }
</style>

<style scoped="scoped">
    .changeButton{
        position: absolute;
        z-index: 9;
        bottom: 24px;
        right: 24px;
        width: 100px;
        height: 50px;
    }
    .playImg {
        width: 54px;
        height: 54px;
        position: absolute;
        left: calc( 50% - 27px);
        top: calc( 50% - 27px);
    }
    .playImg:hover {
        cursor: pointer;
    }

    .widgetTitle {
        font-size: 24px;
        color: #FFFFFF;
        line-height: 24px;
        position: absolute;
        left: 24px;
        top:24px;
    }
</style>
