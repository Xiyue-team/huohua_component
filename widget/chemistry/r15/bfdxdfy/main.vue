<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">苯酚的溴代反应</div>
                <div id="3dContainer" style="width: 100%;height: 100%; display: flex;">
                    <div style="margin: auto; position: relative; width: 676px; height: 360px;top: 0px"v-if="!isMobile">
                        <keyFrameAnimation v-bind="animationOption1"  ref="functionUse1" style=" margin: auto">
                        </keyFrameAnimation>
                    </div>
                    <div style="margin: auto; position: relative; width: 676px; height: 360px;top: 50px"v-else>
                        <keyFrameAnimation v-bind="animationOption1"  ref="functionUse1" style=" margin: auto">
                        </keyFrameAnimation>
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
  import {BfdxdfyViewHandler} from './services/BfdxdfyViewHandler';
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
            //图片数组
            image:[],
            //时间轴长度
            timeLineLength: 0,
            //为了可以重复调用，声明一个name
            animationName: 'animation1',
            //是否显示滑动条
            showSlider: true,
            //滑动条上点的位置
            timeLine: [ 0, 18, 59, 73],
            //滑动条上标签的位置
            label: ['反应物', '断键', '成键', '生成物'],
            width: BrowserUtil.getBrowserInfo().isSmallDevice ? 272: 680,
            height: BrowserUtil.getBrowserInfo().isSmallDevice ? 144: 360
        },
      };

    },
    computed: {

    },
    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.mobilePanelAlpha = true;
        ViewController.getInstance(new BfdxdfyViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted() {
      if(BrowserUtil.getBrowserInfo().isSmallDevice){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }

      //for循环添加图片到组件中
      for (let i = 0; i < 74; i++) {
        const img1 = require(`./sub_static/png/${i + 1}.png`);
        this.animationOption1.image.push(img1);
      }
      // 设置时间轴的长度
      this.animationOption1.timeLineLength = this.animationOption1.image.length;
      ViewController.getInstance().domReady();
    },
    methods: {

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
    .set_scale {
        transform: scale(0.4);
    }

</style>
