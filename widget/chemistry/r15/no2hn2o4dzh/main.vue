<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">温度对NO₂和N₂O₄转化平衡的影响</div>
                <div class="gongshi1">
                    <img style="height: 100%" src="./sub_static/balance.png" v-show="addBeaker"/>
                    <img style="height: 22px" src="./sub_static/reaction.png" v-show="showBeaker"/>
                </div>
                <div class="model_photo" v-bind:class="{'set_scale': isMobile}">
                    <img style="height: 100%" src="./sub_static/model.png"/>
                </div>
                <div id="3dContainer" style="width: 100%;height: 100%; display: flex;" >
                    <div style="width: 634px; height: 363px; position: relative; margin: auto;" v-bind:class="{'set_scale': isMobile}">
                        <!--背景烧瓶-->
                        <div class="background_flask" v-show="addBeaker">
                            <img style="width: 100%" src="./sub_static/flask.png"/>
                        </div>

                        <!--按钮-->
                        <div class="addButton" v-show="addBeaker" @click="showHideBraker">
                            <img style="width: 64px" src="./sub_static/button.png"/>
                            <span style="font-size: 16px; width: 130px; position: absolute; top: 64px; left: -30px;">添加弹簧夹和烧杯</span>
                        </div>

                        <!--背景烧瓶加烧杯-->
                        <div class="background_flask_beaker1" v-show="backgroundFlaskBeaker1">
                            <img style="width: 100%" src="./sub_static/background_flask_beaker1.png"/>
                        </div>

                        <!--颜色加深的烧瓶加烧杯-->
                        <div class="background_flask_beaker2" v-show="backgroundFlaskBeaker2">
                            <img style="width: 100%" src="./sub_static/background_flask_beaker2.png"/>
                        </div>

                        <!--动画-->
                        <div class="animation1" v-show="addBeaker">
                            <keyFrameAnimation v-bind="animationOption1"  ref="functionUse1">
                            </keyFrameAnimation>
                        </div>

                        <div class="animation2" v-show="addBeaker">
                            <keyFrameAnimation v-bind="animationOption2"  ref="functionUse2">
                            </keyFrameAnimation>
                        </div>

                        <div class="animation3" v-show="showBeaker">
                            <keyFrameAnimation v-bind="animationOption3"  ref="functionUse3">
                            </keyFrameAnimation>
                        </div>

                        <div class="animation4" v-show="showBeaker">
                            <keyFrameAnimation v-bind="animationOption4"  ref="functionUse4">
                            </keyFrameAnimation>
                        </div>
                    </div>

                </div>
            </template>
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
          addBeaker: true,
          showBeaker: false,
          backgroundFlaskBeaker1: false,
          backgroundFlaskBeaker2: false,
          clearTime: 1,
          isMobile: false,

          animationOption1: {
              showSlider: false,
              animationName: 'step1',
              zipUrl: require('./sub_static/png/png1.zip'),
              imageNum: 92,
              width: 130,
              height: 130,
              isInfinite: true,
          },
          animationOption2: {
              showSlider: false,
              animationName: 'step2',
              zipUrl: require('./sub_static/png/png1.zip'),
              imageNum: 92,
              width: 130,
              height: 130,
              isInfinite: true,
          },
          animationOption3: {
              showSlider: false,
              animationName: 'step3',
              zipUrl: require('./sub_static/png/png3.zip'),
              imageNum: 56,
              width: 130,
              height: 130,
              isInfinite: true,
          },
          animationOption4: {
              showSlider: false,
              animationName: 'step4',
              zipUrl: require('./sub_static/png/png2.zip'),
              imageNum: 92,
              width: 130,
              height: 130,
              isInfinite: true,
          },
      };

    },
    computed: {

    },
    created() {
      const viewOption = new ViewOption();
      viewOption.mobilePanelAlpha = true;
      viewOption.showMobileExpandIco = false;
      ViewController.getInstance(new YcyxhqViewHandler(this), viewOption);
      ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted() {
        if(BrowserUtil.getBrowserInfo().isSmallDevice){
            this.isMobile = true;
        }
        ViewController.getInstance().domReady();
        setTimeout(() => {
            (this.$refs.functionUse1 as any).play();
        }, 100);
        setTimeout(()=>{
            (this.$refs.functionUse2 as any).play();
        }, 100);

    },
    methods: {
        resetEvent() {
            this.addBeaker = true;
            this.showBeaker = false;
            this.backgroundFlaskBeaker1 = false;
            this.backgroundFlaskBeaker2 = false;
            clearTimeout(this.clearTime);
        },

        showHideBraker() {

            this.addBeaker = false;
            this.showBeaker = true;
            this.backgroundFlaskBeaker1 = true;
            (this.$refs.functionUse3 as any).play();
            (this.$refs.functionUse4 as any).play();

            this.clearTime = setTimeout(() => {
                this.backgroundFlaskBeaker1 = false;
                this.backgroundFlaskBeaker2 = true;
            }, 2000);

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
    .gongshi1{
        height: 27px;
        position: absolute;
        top: 76px;
        left:24px;
    }

    .model_photo{
        width: 70.4px;
        height: 225.5px;
        position: absolute;
        right: 65px;
        top: calc(50% - 112px);
    }

    .background_flask{
        width: 532px;
        height: 363px;
        position: absolute;
        left: 51px;
        z-index: 2;
    }

    .background_flask_beaker1{
        width: 100%;
        position: absolute;
        top: -20px;
        left: 0px;
        z-index: 2;
    }

    .background_flask_beaker2{
        width: 100%;
        position: absolute;
        top: -20px;
        left: 0px;
        z-index: 2;
    }

    .addButton{
        width: 130px;
        height: 80px;
        position: absolute;
        top: 23.7%;
        left: 44.1%;
        z-index: 3;
    }

    .animation1{
        position: absolute;
        width: 130px;
        height: 130px;
        z-index: 4;
        left: -215px;
        bottom: 0;
    }

    .animation2{
        position: absolute;
        width: 130px;
        height: 130px;
        z-index: 4;
        left: 170px;
        bottom: 0;
    }

    .animation3{
        position: absolute;
        width: 130px;
        height: 130px;
        z-index: 4;
        left: -215px;
        bottom: 0;
    }

    .animation4{
        position: absolute;
        width: 130px;
        height: 130px;
        z-index: 4;
        left: 170px;
        bottom: 0;
    }

    .set_scale{
        transform: scale(0.4);
    }
</style>
