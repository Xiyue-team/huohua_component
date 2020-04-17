<template>
    <div class="aspectration bg_white root_div_container">
        <!-- fullScreensLayout 全屏布局组件-->
        <fullScreensLayout>
            <!--重写主内容区-->
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">乙醇的消去反应</div>
                <div id="3dContainer" style="width: 100%;height: 100%; display:flex;">
                    <div id="animation1" style="margin: auto; position: relative; width:700px; height: 470px;top: 50px">
                        <keyFrameAnimation  v-bind="animationOption" ref="functionuse" v-model="frameNum" >
                        </keyFrameAnimation>
                        <div v-if="!isMobile" style="width: 680px; height: 360px; background: #ffffff; position: absolute; top: 0" v-show="isShow">
                            <img src="./sub_static/shouye.png" alt=""  style="width: 680px;hight: 360px">
                        </div>
                        <div v-else style="width: 272px; height: 144px; background: #ffffff; position: absolute; top: 0px; left: 205px;" v-show="isShow">
                            <img src="./sub_static/shouye.png" alt=""  style="width: 280px;hight: 144px">
                        </div>
                    </div>
                </div>
            </template>
            <!--重写控件区-->
            <template slot="controlPanel" slot-scope="controlPanel">
            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import {ViewController} from '../../../../src/core/ViewController';
    import keyFrameAnimation from '../../../../src/component/layout/keyFrameAnimation.vue';
    import {BrowserUtil} from '../../../../src/util/BrowserUtil';
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue'
    import {YcdxViewHandler} from "./services/YcdxViewHandler";
    import {ViewOption} from "../../../../src/core/CoreInterface";
    export default Vue.extend({
        components: {
            keyFrameAnimation,
            fullScreensLayout,
        },
        data() {
            return{
              //声明变量
              gaoliang: true,
              frameNum: 0,
              isMobile: false,
              animationCtrl: true,
              isShow: true,

              //关键帧组件所用到的参数
              animationOption:{
                // zipUrl: require('./sub_static/xiaoqu.zip'),
                // imageNum: 89,
                  image:[],
                  timeLineLength: 0,
                showSlider: true,
                //滑动条上点的位置
                timeLine: [0,20,69,88],
                //滑动条上标签的位置
                label: ['反应物', '断键', '成键', '生成物'],
                  width: BrowserUtil.getBrowserInfo().isSmallDevice ? 272 : 680,
                  height: BrowserUtil.getBrowserInfo().isSmallDevice ? 144 : 360
              },
            };

        },
        computed: {

        },
        created() {
            const viewOption = new ViewOption();
            viewOption.showMobileExpandIco = false;
            viewOption.mobilePanelAlpha = true;
            ViewController.getInstance(new YcdxViewHandler(this), viewOption);
            ViewController.getInstance().viewHandler.beforeRenderElement();
        },
        mounted() {
            if(BrowserUtil.getBrowserInfo().isSmallDevice){
                this.isMobile = true;
            } else {
                this.isMobile = false;
            }
            for (let i = 0; i < 89; i++) {
            const img1 = require(`./sub_static/${i + 1}.png`);
            this.animationOption.image.push(img1);
            }
            this.animationOption.timeLineLength = this.animationOption.image.length;
            ViewController.getInstance().domReady();
        },



        methods: {
        },
        watch: {
            frameNum: function() {
                this.isShow = false;
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
</style>
