<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">

                <div id="3dContainer" style="width: 100%;height: 100%; display: flex;">
                    <div style="margin: auto; position: relative; width: 676px; height: 470px;top: 0px"v-if="!isMobile">
                        <keyFrameAnimation v-bind="animationOption1" v-model="frameNum1" ref="functionUse1" style=" ">
                        </keyFrameAnimation>
                       <div style="width: 680px; height: 300px; background: #ffffff; position: absolute; top: -20px;left: 0" v-show="imgCtrl">
                           <img src="./sub_static/shouye.png" alt=""  style="width: 680px;hight: 300px">
                       </div>
                    </div>
                    <div style="margin: auto; position: relative; width: 676px; height: 470px;top: 40px"v-else>
                        <keyFrameAnimation v-bind="animationOption1" v-model="frameNum1" ref="functionUse1" style=" ">
                        </keyFrameAnimation>
                        <div style="width: 285px; height: 150px; background: #ffffff; position: absolute; top: 0px;left: 185px" v-show="imgCtrl">
                            <img src="./sub_static/shouye.png" alt=""  style="width: 285px;hight: 150px">
                        </div>
                    </div>
                    <div class="title_text">乙醇与溴化氢的取代反应</div>
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
  import {YcyxhqViewHandler} from './services/YcyxhqViewHandler';
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
            imgCtrl: true,
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
            timeLine: [ 0, 27, 68, 89],
            //滑动条上标签的位置
            label: ['反应物', '断键', '成键', '生成物'],
            width: BrowserUtil.getBrowserInfo().isSmallDevice ? 285: 570,
            height: BrowserUtil.getBrowserInfo().isSmallDevice ? 150: 300
        },
      };
    },
    computed: {

    },
    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.mobilePanelAlpha = true;
        ViewController.getInstance(new YcyxhqViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted() {
      if(BrowserUtil.getBrowserInfo().isSmallDevice){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }

      //for循环添加图片到组件中
      for (let i = 0; i < 90; i++) {
        const img1 = require(`./sub_static/${i + 1}.png`);
        this.animationOption1.image.push(img1);
      }
      // 设置时间轴的长度
      this.animationOption1.timeLineLength = this.animationOption1.image.length;
      ViewController.getInstance().domReady();
    },
    methods: {
    },
    watch: {
      frameNum1: function() {
          this.imgCtrl = false;
      }
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
