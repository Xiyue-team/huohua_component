<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">氟化物防治龋齿的化学原理</div>
                <div id="3dContainer" style="background: #D0E5F9;width: 100%;height: 100%; display: flex; ">
                    <div style="margin: auto;" v-bind:class="{'set_scale': isMobile}">
                        <div v-show="animationCtrl" style="margin: auto; width: 723px;height: 430px; position: relative; " v-bind:class="{'isMobile_Style': isMobile}">
                            <!--给组配置参数 使用v-bind 获取当前的关键帧数使用v-model 为了调用组件内的方法需要使用ref-->
                            <img src="./sub_static/tooth.png" alt="" style="position: absolute; left: 294px">
                            <keyFrameAnimation v-bind="animationOption1" ref="functionuse1" style=" position: absolute;left: 70px; top: 0"></keyFrameAnimation>
                            <!--牙刷图片 v-on 绑定事件，调用play方法 v-show 控制牙刷图片显示隐藏 当传入值为false时隐藏，为true时显示-->
                            <img src="./sub_static/toothbrush.png"  alt="" v-on:click="animation1()" v-show="imgCtrl" style="position: absolute;left: 110px; top: 0;">
                            <span class="text_style" style="position: absolute; top: 200px;" v-on:click="animation1()">点击刷牙</span>
                            <img id="gs1" class="animation" style="opacity: 1; position: absolute; top:394px;" src="./sub_static/equation.png" />
                        </div>

                        <div v-show="!animationCtrl" style="margin: auto; width: 723px;height: 430px; position: relative;" v-bind:class="{'isMobile_Style': isMobile}">
                            <img src="./sub_static/tooth.png" alt="" style="position: absolute; left: 294px">
                            <keyFrameAnimation v-bind="animationOption2" ref="functionuse2" style="position: absolute;top: -120px; left: -50px"></keyFrameAnimation>
                            <img src="./sub_static/equation1.png" id="gs2" style="opacity: 1;position: absolute; top:394px;" class="animation"/>
                        </div>
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
    import {FzqcViewHandler} from "./services/FzqcViewHandler";
    import {BrowserUtil} from "../../../../src/util/BrowserUtil";
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
              //关键帧组件所用到的参数
                animationOption2:{
                    //图片数组
                    image:[],
                    //时间轴长度
                    timeLineLength: 0,
                    //为了可以重复调用，声明一个name
                    animationName:'animation2',
                    //是否显示滑动条
                    showSlider: false,
                    width: 550,
                    height: 450,
                },
                animationOption1:{
                    //图片数组
                    image:[],
                    //时间轴长度
                    timeLineLength: 0,
                    //为了可以重复调用，声明一个name
                    animationName: 'animation1',
                    //是否显示滑动条
                    showSlider: false,
                    //设置图片动画的宽高
                    width: 240,
                    height: 90,
                }
            };

        },
        computed: {

        },
        created() {
           const viewOption = new ViewOption();
           viewOption.mobilePanelAlpha = true;
           viewOption.showMobileExpandIco = false;
           ViewController.getInstance(new FzqcViewHandler(this), viewOption);
           ViewController.getInstance().viewHandler.beforeRenderElement();
        },
        mounted() {
          if(BrowserUtil.getBrowserInfo().isSmallDevice){
                this.isMobile = true;
          } else {
                this.isMobile = false;
          }
          //for循环添加图片到组件中
          for (let i = 0; i < 36; i++) {
            const img1 = require(`./sub_static/png1/${i + 1}.png`);
            this.animationOption1.image.push(img1);
          }

          for(let j = 0;j < 48; j++){
            const img2 = require(`./sub_static/png2/${j + 1}.png`)
            this.animationOption2.image.push(img2);
          }
          //设置时间轴的长度
          this.animationOption1.timeLineLength = this.animationOption1.image.length;
          this.animationOption2.timeLineLength = this.animationOption2.image.length;

          ViewController.getInstance().domReady();
          //加载页面一秒后调用第一段动画开始方法
            setTimeout(() => {
              (this.$refs.functionuse1 as any).play();
            }, 1000);
        },
        methods: {
          //第一段动画的启动方法
          /*
          * 动画按钮逻辑
          * 2.调整两段动画的层级关系
          * 3.调用第二段动画的播放方法
          * 4.隐藏牙刷图片
          * */
            animation1(){
              this.animationCtrl = false;
              (this.$refs.functionuse2 as any).play();
              this.imgCtrl = false;
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
    .animation{
        animation: animations 10s ease ;
    }
    @keyframes animations {
        0%{opacity: 0}
        100%{opacity: 1}
    }

    .set_scale {
        transform: scale(0.4);
    }

    .text_style {
        font-size: 20px;
        color: #808080;
    }
    .isMobile_Style{
        top: -50px;
    }

</style>
