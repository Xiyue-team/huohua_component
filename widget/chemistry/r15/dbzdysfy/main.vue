<template>
    <div class="aspectration bg_white root_div_container">
        <!-- fullScreensLayout 全屏布局组件-->
        <leftAndRightlayout>
            <!--重写主内容区-->
            <template slot="viewBox" slot-scope="viewBox" >
                <div class="title_text">蛋白质的颜色反应</div>
                <div id="3dContainer"  class="box">
                    <!--v-bind:class="{'set_scale': isMobile} 用于手机适配-->
                    <div style="width:700px;height:470px;margin: auto;position: relative;top: 0px;" v-bind:class="{'set_scale': isMobile}" v-show="isShow1">
                        <img src="./sub_static/hssygc.png" alt="" style="position: absolute; top: 110px;left: -10px;width: 300px;">
                        <keyFrameAnimation  v-bind="animationOption1" ref="functionuse1"  v-model="frameNum1" style="position: absolute;left: 200px;">
                        </keyFrameAnimation>
                    </div>
                    <div style="width:700px;height:470px;margin: auto;position: relative;top: 0px;"   v-bind:class="{'set_scale': isMobile}" v-show="isShow2">
                        <img src="./sub_static/sssygc.png" alt="" style="position: absolute; top: 50px;left: -10px;width: 300px;">
                        <keyFrameAnimation  v-bind="animationOption2" ref="functionuse2"  v-model="frameNum1" style="position: absolute;left: 158px;top: 11px;">
                        </keyFrameAnimation>
                    </div>
                    <div v-if="!isMobile" style="margin: auto; width: 500px;height: 400px;" v-show="imgCtrl">
                        <img src="./sub_static/background.png" alt=""  style="width: 500px;">
                    </div>
                    <div v-else style="margin:50px auto; width: 500px;height: 400px;" v-show="imgCtrl">
                        <img src="./sub_static/background.png" alt=""  style="width: 500px;">
                    </div>
                </div>
            </template>
            <!--重写控件区-->
            <template slot="controlPanel" slot-scope="controlPanel">
                <!--自己实现的控件-->
                <div id="button1" @click="button1()" style="margin: auto" >
                    <h_button  title="黄色反应" style="height: 44px;width: 240px;position: absolute;right: 20px;top:calc(50% - 22px)" v-bind:class="{active: gaoliang1} "></h_button>
                </div>
                <div id="button2" @click="button2()">
                    <h_button  title="双缩脲反应" style="height: 44px;width: 240px;position: absolute;right: 20px;top:calc(50% + 42px)"  v-bind:class="{active: gaoliang2}"></h_button>
                </div>
            </template>
        </leftAndRightlayout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import {ViewController} from '../../../../src/core/ViewController';
    import keyFrameAnimation from '../../../../src/component/layout/keyFrameAnimation.vue';
    import {BrowserUtil} from '../../../../src/util/BrowserUtil';
    import leftAndRightlayout from '../../../../src/component/layout/leftAndRight_layout.vue'
    import {DbzdViewHandler} from "./services/DbzdViewHandler";
    import h_button from '../../../../src/component/ui/button.vue'
    import {ViewOption} from "../../../../src/core/CoreInterface";
    export default Vue.extend({
        components: {
            keyFrameAnimation,
            leftAndRightlayout,
            h_button
        },
        data() {
            return{
              //声明变量
              gaoliang1: false,
              gaoliang2: false,
              isMobile: false,
              isShow1: false,
              isShow2: false,
              imgCtrl:true,
              frameNum1:0,
                  //关键帧组件所用到的参数
              animationOption1:{
                zipUrl: require('./sub_static/hs.zip'),
                imageNum: 151,
                //为了可以重复调用，声明一个name
                animationName: 'animation1',
                //是否显示滑动条
                showSlider:false,
                width: 200,
                height: 360

              },
              animationOption2:{
                //图片数组
                zipUrl: require('./sub_static/ss.zip'),
                imageNum: 150,
                //为了可以重复调用，声明一个name
                animationName: 'animation2',
                //是否显示滑动条
                showSlider:false,
                width: 300,
                height: 360

              },
            };

        },
        computed: {

        },
        created() {
            const viewOption = new ViewOption();
            // viewOption.showMobileExpandIco = false;
            // viewOption.mobilePanelAlpha = true;
            ViewController.getInstance(new DbzdViewHandler(this),viewOption);
            ViewController.getInstance().viewHandler.beforeRenderElement();
        },
        mounted() {
            //BrowserUtil工具类用于判断各个设备
          if(BrowserUtil.getBrowserInfo().isSmallDevice){
                this.isMobile = true;
          }
          ViewController.getInstance().domReady();
        },

        methods: {
          reset(){

            (this.$refs.functionuse1 as any).reset();
            (this.$refs.functionuse2 as any).reset();
            this.isShow1 = false;
            this.isShow2 = false;
            this.gaoliang1 = false;
            this.gaoliang2 = false;
            setTimeout(() => { this.imgCtrl = true;}, 100)

          },

          button1() {
            this.isShow1 = true;
            this.isShow2 = false;
            this.gaoliang1 = true;
            this.gaoliang2 = false;
            this.imgCtrl = false;
            (this.$refs.functionuse1 as any).reset();
            (this.$refs.functionuse1 as any).play();
          },
          button2(){
            this.isShow1 = false;
            this.isShow2 = true;
            this.gaoliang2 = true;
            this.gaoliang1 = false;
            this.imgCtrl = false;
            (this.$refs.functionuse2 as any).reset();
            (this.$refs.functionuse2 as any).play();
          }
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

.box{
    width:100%;
    height: 100%;
    display:flex;
    margin: auto;
    background: linear-gradient(to bottom, #92DEDE, #1A395F);
}
.set_scale {
    transform: scale(0.4);
}
</style>
