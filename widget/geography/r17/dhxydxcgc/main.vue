<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">大湖效应的形成过程</span>
                <div id="3dContainer" style="width: 100%;height: 100%; display: flex" v-bind:class="{'set_scale': isMobile}">
                    <div v-if="isPC" style="margin: auto; width: 100%; height: 100%">
                        <video muted src="./sub_static/slow_speed.mp4" class="animationVideo" v-show="ctrl1">
                        </video>

                        <video muted src="./sub_static/fast_speed.mp4" class="animationVideo" v-show="ctrl2">
                        </video>

                        <video muted src="./sub_static/large_temp.mp4" class="animationVideo" v-show="ctrl3">
                        </video>

                        <video muted src="./sub_static/spit_circle.mp4" class="animationVideo" loop="loop" v-show="ctrl4">
                        </video>

                        <video muted src="./sub_static/mid_circle.mp4" class="animationVideo" loop="loop" v-show="ctrl5">
                        </video>

                        <video muted src="./sub_static/heavy_circle.mp4" class="animationVideo" loop="loop" v-show="ctrl6">
                        </video>
                    </div>

                    <div v-else style="position: absolute; left: calc(50% - 340px); top: calc(50% - 141px)">
                        <div class="slow_speed" v-show="ctrl1">
                            <keyFrameAnimation v-bind="slow_speed" ref="slowSpeed" v-bind:isEnd.sync="isEnd1">
                            </keyFrameAnimation>
                        </div>

                        <div class="fast_speed" v-show="ctrl2">
                            <keyFrameAnimation v-bind="fast_speed" ref="fastSpeed" v-bind:isEnd.sync="isEnd2">
                            </keyFrameAnimation>
                        </div>

                        <div class="large_temp" v-show="ctrl3">
                            <keyFrameAnimation v-bind="large_temp" ref="largeTemp" v-bind:isEnd.sync="isEnd3">
                            </keyFrameAnimation>
                        </div>

                        <div class="spit_circle" v-show="ctrl4">
                            <keyFrameAnimation v-bind="spit_circle" ref="spitCircle">
                            </keyFrameAnimation>
                        </div>

                        <div class="mid_circle" v-show="ctrl5">
                            <keyFrameAnimation v-bind="mid_circle" ref="midCircle">
                            </keyFrameAnimation>
                        </div>

                        <div class="heavy_circle" v-show="ctrl6">
                            <keyFrameAnimation v-bind="heavy_circle" ref="heavyCircle">
                            </keyFrameAnimation>
                        </div>
                    </div>
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel" style="position: relative; width: 100%; height: 100%">
                    <div @click="sWind" class="swind">
                        <img src="./sub_static/weakWind.png" style="width: 54px; height: 54px;" v-show="frame1"/>
                        <img src="./sub_static/weakWindChoosed.png" style="width: 54px; height: 54px;" v-show="!frame1"/>
                    </div>

                    <div @click="fWind" class="fwind">
                        <img src="./sub_static/strongWind.png" style="width: 54px; height: 54px;" v-show="frame2"/>
                        <img src="./sub_static/strongWindChoosed.png" style="width: 54px; height: 54px;" v-show="!frame2"/>
                    </div>

                    <div @click="lTemp" class="ltemp">
                        <img src="./sub_static/lowTemp.png" style="width: 54px; height: 54px;" v-show="frame3"/>
                        <img src="./sub_static/lowTempChoosed.png" style="width: 54px; height: 54px;" v-show="!frame3"/>
                    </div>

                    <div @click="hTemp" class="htemp">
                        <img src="./sub_static/highTemp.png" style="width: 54px; height: 54px;" v-show="frame4"/>
                        <img src="./sub_static/highTempChoosed.png" style="width: 54px; height: 54px;" v-show="!frame4"/>
                    </div>
                </div>
            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import "../../../../src/assets/css/core.css";
  import "../../../../src/assets/css/layout.css";
  import fullScreensLayout from "../../../../src/component/layout/fullScreens_layout.vue";
  import Component from "vue-class-component";
  import { MainVueComponent } from "./mainVueComponent";
  import keyFrameAnimation from '../../../../src/component/layout/keyFrameAnimation.vue';

  @Component({
    components: {
      fullScreensLayout,
      keyFrameAnimation
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

    .title_text {
        width: 221px;
        height: 24px;
        font-size: 24px;
        color: #333333;
        line-height: 24px;
        position: absolute;
        left: 24px;
        top: 24px;
    }

    .slow_speed {
        width: 340px;
        height: 191px;
    }

    .fast_speed {
        width: 340px;
        height: 191px;
    }

    .large_temp {
        width: 340px;
        height: 191px;
    }

    .spit_circle {
        width: 340px;
        height: 191px;
    }

    .mid_circle {
        width: 340px;
        height: 191px;
    }

    .heavy_circle {
        width: 340px;
        height: 191px;
    }

    .animationVideo {
        width: 100%;
        height: 100%;
        object-fit: fill;
    }

    .swind {
        width: 54px;
        height: 54px;
        position: absolute;
        right: 84px;
        bottom: 84px;
    }

    .fwind {
        width: 54px;
        height: 54px;
        position: absolute;
        right: 18px;
        bottom: 84px;
    }

    .ltemp {
        width: 54px;
        height: 54px;
        position: absolute;
        right: 84px;
        bottom: 18px;
    }

    .htemp {
        width: 54px;
        height: 54px;
        position: absolute;
        right: 18px;
        bottom: 18px;
    }

    .set_scale {
        transform: scale(0.6);
    }
</style>
