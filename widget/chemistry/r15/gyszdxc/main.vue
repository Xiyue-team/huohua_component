<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">甘油三酯的形成过程</div>
                <div id="3dContainer" style="width: 100%;height: 100%; display: flex;">
                    <div style="margin: auto; position: relative; width: 676px; height: 470px;top: 0px" v-if="!isMobile">
                        <keyFrameAnimation v-bind="animationOption1"  ref="functionUse1" style=" margin: auto">
                        </keyFrameAnimation>
                        <span class="text_style dj">断键过程</span>
                        <span class="text_style cj">成键过程</span>
                    </div>
                    <div style="margin: auto; position: relative; width: 676px; height: 470px;top: 0px" v-else>
                        <keyFrameAnimation v-bind="animationOption1"  ref="functionUse1" style=" margin: auto">
                        </keyFrameAnimation>
                        <span class="text_style dj1">断键过程</span>
                        <span class="text_style cj1">成键过程</span>
                    </div>
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel" style="height: 100%">
                </div>
            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import '../../../../src/assets/css/core.css';
  import '../../../../src/assets/css/layout.css';
  import {ViewController} from '../../../../src/core/ViewController';
  import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
  import keyFrameAnimation from '../../../../src/component/layout/keyFrameAnimation.vue';
  import {GyszdxcViewHandler} from './services/GyszdxcViewHandler';
  import { BrowserUtil } from '../../../../src/util/BrowserUtil';
  import {ViewOption} from "../../../../src/core/CoreInterface";

  export default Vue.extend({
    components: {
      fullScreensLayout,
      keyFrameAnimation
    },
    data() {
      return{
            //声明变量
            isMobile: false,
            animationCtrl: true,
            frameNum1: 0,
            //关键帧组件所用到的参数
            animationOption1:{
            zipUrl: require('./sub_static/gysz.zip'),
            imageNum: 100,
            animationName: 'animation1',
            //是否显示滑动条
            showSlider: true,
            //滑动条上点的位置
            timeLine: [ 0, 49, 99],
            //滑动条上标签的位置
            label: ['', '', ''],
            width: BrowserUtil.getBrowserInfo().isSmallDevice ? 340: 680,
            height: BrowserUtil.getBrowserInfo().isSmallDevice ? 180: 360
        },
      };

    },
    computed: {

    },
    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.mobilePanelAlpha = true;
        ViewController.getInstance(new GyszdxcViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted() {
      if(BrowserUtil.getBrowserInfo().isSmallDevice){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }

      ViewController.getInstance().domReady();
    },
    methods: {
      reset(){
        (this.$refs.functionUse1 as any).reset();
      },
    },
    watch: {
    }
  });
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
    .text_style{
        font-size: 16px;
        color: #1A1A1A;
        line-height: 16px;
    }
    .dj{
        position: absolute;
        top: 426px;
        left: 138px
    }
    .dj1{
        position: absolute;
        top: 214px;
        left: 214px
    }
    .cj{
        position: absolute;
        top: 426px;
        left: 435px
    }
    .cj1{
        position: absolute;
        top: 214px;
        left: 345px
    }
    .set_scale {
        transform: scale(0.4);
    }

</style>
