<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="3dContainer" style="width: 100%;height: 100%; display: flex;background: #c7e25f; display: flex">
                    <div class="animation_style" v-show="ctrl" v-bind:class="{'animation_style_QQ':isQQ}">
                        <div id="lottie" style=""></div>
                    </div>
                    <div class="animation_style" v-show="!ctrl" v-bind:class="{'animation_style_QQ':isQQ}">
                        <div id="lottie1" style=""></div>
                    </div>
                </div>
                <div class="title_text">牛轭湖的形成过程</div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel" style="position: relative;width: 100%;height: 100%;">
                        <div style="width: 54px;height: 54px;position: absolute; bottom: 18px;right: 18px" @click="buttonSwitch" v-bind:class="{'event_disabled':disabled}">
                            <img src="./sub_static/sl.png" alt="" v-show="!imgCtrl" style="width: 54px; height: 54px;padding-left: 12px;">
                            <img src="./sub_static/slax.png" alt="" v-show="imgCtrl" style="width: 54px; height: 54px;padding-left: 12px;">
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

    .title_text {
        font-size: 24px;
        color: #000000;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }

    .animation_style {
        width: 1024px;
        height: 576px;
        margin: auto;
        /*border: 2px solid #668000;*/
        /*border-style: outset;*/
    }

    .animation_style_QQ {
        width: 500px;
        height: 281px;
        margin: auto;
    }

</style>
