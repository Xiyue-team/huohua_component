<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">地形对寒潮的影响</div>
                <div id="3dContainer" style="width: 100%;height: 100%; display: flex;">
                    <div class="video_div_style" v-bind:class="{'mobile_videoDiv_style': isIpad}" v-if="!isMobile">
                        <video muted src="./sub_static/pym.mp4"  class="video_style"  v-show="!imgCtrl && active1">

                        </video>
                        <video muted src="./sub_static/pyk.mp4"  class="video_style"  v-show="imgCtrl && active1">

                        </video>
                        <video muted src="./sub_static/nbm.mp4"  class="video_style"  v-show="!imgCtrl && active2">

                        </video>
                        <video muted src="./sub_static/nbk.mp4"  class="video_style"  v-show="imgCtrl && active2">

                        </video>
                        <video muted src="./sub_static/dxm.mp4"  class="video_style"  v-show="!imgCtrl && active3">

                        </video>
                        <video muted src="./sub_static/dxk.mp4"  class="video_style"  v-show="imgCtrl && active3">

                        </video>
                    </div>
                    <div v-else style="position: absolute;left: calc(50% - 340px); top: calc(50% - 180px);" v-bind:class="{'button_style_for_mobile': isMobilePhone}">
                        <keyFrameAnimation v-bind="pym" ref="pymAnimation" v-show="!imgCtrl && active1"></keyFrameAnimation>
                        <keyFrameAnimation v-bind="pyk" ref="pykAnimation" v-show="imgCtrl && active1"></keyFrameAnimation>
                        <keyFrameAnimation v-bind="nbm" ref="nbmAnimation" v-show="!imgCtrl && active2"></keyFrameAnimation>
                        <keyFrameAnimation v-bind="nbk" ref="nbkAnimation" v-show="imgCtrl && active2"></keyFrameAnimation>
                        <keyFrameAnimation v-bind="dxm" ref="dxmAnimation" v-show="!imgCtrl && active3"></keyFrameAnimation>
                        <keyFrameAnimation v-bind="dxk" ref="dxkAnimation" v-show="imgCtrl && active3"></keyFrameAnimation>
                    </div>
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel" style="position: relative;width: 100%;height: 100%;">
                    <div class="button_top">
                        <div @click="clickEvent1" style="text-align: right;">
                            <buttonPrimary  v-bind:title="title1" type="ellipse" v-bind:class="{active:active1}" >
                            </buttonPrimary>
                        </div>
                        <div @click="clickEvent2" style="margin-top: 16px;text-align: right;">
                            <buttonPrimary  v-bind:title="title2" type="ellipse" v-bind:class="{active:active2}" >
                            </buttonPrimary>
                        </div>
                        <div @click="clickEvent3" style="margin-top: 16px;text-align: right;">
                            <buttonPrimary  v-bind:title="title3" type="ellipse" v-bind:class="{active:active3}">
                            </buttonPrimary>
                        </div>
                    </div>

                        <div style="width: 54px;height: 54px; position:absolute; bottom: 18px; right: 84px"
                             @click="buttonSwitch1" v-bind:class="{'button_style_mobile': isMobilePhone}">
                            <img src="./sub_static/xf.png" alt="" v-show="imgCtrl" style="width: 54px; height: 54px;">
                            <img src="./sub_static/xfxz.png" alt="" v-show="!imgCtrl" style="width: 54px; height: 54px;">
                        </div>
                        <div style="width: 54px;height: 54px; position:absolute; bottom: 18px; right: 18px" @click="buttonSwitch2" v-bind:class="{'button_style_mobile': isMobilePhone}">
                            <img src="./sub_static/df.png" alt="" v-show="!imgCtrl" style="width: 54px; height: 54px;padding-left: 12px;">
                            <img src="./sub_static/dfxz.png" alt="" v-show="imgCtrl" style="width: 54px; height: 54px;padding-left: 12px;">
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
  import keyFrameAnimation from '../../../../src/component/layout/keyFrameAnimation.vue';
  import buttonPrimary from '../../../../src/component/ui/buttonPrimary';
  import Component from 'vue-class-component';
  import {MainVueComponent} from './mainVueComponent.ts';
  @Component({
      components: {
          fullScreensLayout,
          keyFrameAnimation,
          buttonPrimary
      },

      mixins: [MainVueComponent]
  })
  export default class App extends Vue {}
</script>

<style scoped="scoped">
    body{
        overflow:hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }
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
    .video_div_style {
        width: 1024px;
        height: 576px;
        margin: auto;
    }

    .mobile_videoDiv_style {
        width: 768px;
        height: 432px;
        margin: auto;
    }

    .video_style {
        width: 1024px;
        height: 576px;
    }

    .ipad_style {
        width: 768px;
        height: 432px;
    }

    .button_style_mobile {
        bottom: 0px !important;
    }

    .button_style_for_mobile {
        margin-top: 100px;
    }

    .button_style{
        width: 124px;
        height: 54px;
        position: absolute;
        bottom: 3.1%;
        right: 1.8%;
    }

    .button_top {
        width: 108px;
        height: 158px;
        position: absolute;
        top: calc(50% - 79px);
        right: 1.8%
    }
</style>
