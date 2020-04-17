<template>
    <div class="aspectration bg_white root_div_container" >
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span class="title_style">麦芽糖的形成</span>
                <div id="3dContainer" style="width: 100%;height: 100%;display: flex; position: absolute">
                    <div class="mainStyle" v-bind:class="{'mainStyleMobile' : isMobile, 'mainStyleIpad' : isIpad}">
                        <div id="3dModel" style="width: 100%; height: 100%"> </div>
                    </div>
                    <!--方程式-->
                    <!--class="imgContain" v-bind:class="{'imgContainMobile': isMobile}"-->
                    <div class="imgContain" v-bind:class="{'imgContainMobile': isMobile}">
                            <img  ondragstart="return false" src="./sub_static/zuoce.png" class="img1Style" v-bind:style="img2style" v-bind:class="{'img1StyleMobile': isMobile, 'img1StyleIpad': isIpad}"/>

                            <img  ondragstart="return false" src="./sub_static/youce.png"  class="img2Style" v-bind:style="img2style" v-bind:class="{'img2StyleMobile': isMobile, 'img2StyleIpad': isIpad}"/>

                            <img ondragstart="return false" src="./sub_static/zongfanyingshi.png" v-bind:style="imgstyle" class="img3Style" v-bind:class="{'img3StyleMobile': isMobile}">
                    </div>
                    <!--滑块-->
                    <div class="slider-content control-block_div_border sliderContentStyle" v-bind:class="{'sliderContentStyleMobile': isMobile}" >
                        <vue-slider ref='sliderC' v-model='sliderNum' v-bind='sliderOption' class="sliderStyle" v-bind:class="{'sliderStyleMobile': isMobile}" @mousedown.native="pause()"
                              @touchstart.native="pauses()" >
                        </vue-slider>
                        <!--开始暂停按钮-->
                        <div class="play_btn playStyle" @click="isPlay = !isPlay" v-bind:class="{'playStyleMobile': isMobile}" >
                            <img v-show="!isPlay"  ondragstart="return false" src="./sub_static/play_icon.png" alt="">
                            <img v-show="isPlay"   ondragstart="return false" src="./sub_static/pause_icon.png" alt="">
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
  import h_button from '../../../../src/component/ui/button.vue';
  import h_switch from '../../../../src/component/ui/switch.vue';
  import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
  import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
  import {MytdxcViewHandler} from './services/MytdxcViewHandler';
  import { ViewOption } from '../../../../src/core/CoreInterface';
  export default Vue.extend({
    components: {
      vueSlider,
      h_button,
      h_switch,
      fullScreensLayout
    },
    data() {
      return {
        isMobile: false,
        isIpad: false,
        show: true,
        isPlay: false,
        sliderNum: 0,
        img2style: {
          opacity: 1,
        },
        imgstyle: {
          opacity: 0,
        },
        sliderOption: {
          width: '90%',
          min: 0,
          max: 100,
          speed: 0,
          show: true,
          tooltip: false,
          piecewise: false,
          interval: 1,
          disabled: false,
          piecewiseLabel: false,
          dotSize: 30,
          piecewiseStyle: {
            'backgroundColor': '#ccc',
            'visibility': 'visible',
            'width': '12px',
            'height': '12px'
          },
          piecewiseActiveStyle: {
            'backgroundColor': '#5CAEFD',
            'color': '#000000'
          },
        },
      };
    },
    created() {
      const viewOption = new ViewOption();
      viewOption.showMobileExpandIco = false;
      viewOption.mobilePanelAlpha = true;
      viewOption.showReset = true;
      viewOption.showMobileResetIco = true;
      viewOption.adapterMobilePanel = true;
      ViewController.getInstance(new MytdxcViewHandler(this), viewOption);
      ViewController.getInstance(new MytdxcViewHandler(this));
      ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted() {
      if ((window as any)['env'].browserInfo.isSmallDevice) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }

      if ((window as any)['env'].browserInfo.isIpad) {
        this.isIpad = true;
      } else {
        this.isIpad = false;
      }
      ViewController.getInstance().domReady();
    },
    methods: {
      pause() {
        this.isPlay = false;
      },
      pauses() {
        this.isPlay = false;
      }
    },
    watch: {
      sliderNum: function(sliderNum: number) {
        (ViewController.getInstance().viewHandler as MytdxcViewHandler).mytdxc.modelanimation.action.time = sliderNum / 61.5;

        if (this.isPlay) {
          (ViewController.getInstance().viewHandler as MytdxcViewHandler).PlayAnimation(true);
          this.imgstyle.opacity = sliderNum / 100;
          if (sliderNum === 0) {
            this.img2style.opacity = 1;
          } else if (sliderNum > 0) {
            this.img2style.opacity = 0;
          }
        } else {
          (ViewController.getInstance().viewHandler as MytdxcViewHandler).PlayAnimation(false);
          this.imgstyle.opacity = sliderNum / 100;
          if (sliderNum === 0) {
            this.img2style.opacity = 1;
          } else if (sliderNum > 0) {
            this.img2style.opacity = 0;
          }
        }

        if (sliderNum >= 0 && sliderNum < 100 && !this.isPlay) {
          (ViewController.getInstance().viewHandler as MytdxcViewHandler).PlayAnimation(false);
        } else if (sliderNum = 100) {
          (ViewController.getInstance().viewHandler as MytdxcViewHandler).PlayAnimation(true);
        }
      },

      isPlay: function(isPlay: boolean) {
            (ViewController.getInstance().viewHandler as MytdxcViewHandler).PlayAnimation(true);
        },

      isMobile: function(value: boolean) {
        this.sliderOption.width = value ? '79%' : this.sliderOption.width;
        setTimeout(() => {
          this.$refs.sliderC.refresh();
          }, 20);
      }
    },
  });
</script>

<style scoped="scoped">
    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .title_style {
        width: 336px;
        height: 24px;
        font-size: 24px;
        color: #000000;
        line-height: 24px;
        position: absolute;
        left: 24px;
        top: 24px;
        z-index: 99;
    }

    .mainStyle {
        width: 100%;
        height: calc(100% - 180px);
    }

    .mainStyleMobile {

    }

    .mainStyleIpad {
        width: 505px;
        height: 270px;
    }

    .play_btn {
        display: inline-block;
        width: 44px;
        height: 44px;
        background: #FFFFFF;
        border-radius: 50%;
        box-sizing: border-box;
        border: 0 solid rgba(0, 0, 0, 0.06);
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.24);
    }

    .play_btn img {
        width: 37%;
        margin-left: 15px;
        margin-top: 13px;

    }

    .playStyle {
        float: left;
        position: absolute;
        top:13px;
        left: 15px
    }

    .imgContain {
        position: absolute;
        width: 714px;
        height: 140px;
        bottom: 110px;
        left: 0;
        right: 0;
        margin: auto;
    }

    .imgContainMobile {
        width: 390px;
        height: 70px;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 70px;
        margin: auto;
    }

    .img1Style {
        position: absolute;
        width: 128px;
        /*height: 140px;*/
        left: 80px;
    }

    .img2Style {
        position: absolute;
        width: 128px;
        /*height: 140px;*/
        right: 80px;
    }

    .img3Style {
        position: absolute;
        left: 30px;
        width: 714px;
        left: 0;
        right: 0;
        margin: auto;
    }

    .img1StyleMobile {
        width: 70px;
    }

    .img2StyleMobile {
        width: 70px;
    }

    .img3StyleMobile {
        width: 390px;
    }

    .img1StyleIpad {
        width: 128px;
        height: 140px;
        margin-left: 70px;
    }

    .img2StyleIpad {
        width: 128px;
        height: 140px;
        right: 130px;
    }

    .sliderContentStyle {
        position: absolute;
        width: 480px;
        height: 40px;
        bottom: 30px;
        /*z-index: 99;*/
        left: 0;
        right: 0;
        margin: auto;
    }

    .sliderContentStyleMobile {
        width: 250px;
        height: 12px;
        /*margin-bottom: 15px*/
        bottom: 15px;
    }

    .sliderStyle {
        margin-top: 5px;
        float: left;
        margin-left: 60px
    }

    .sliderStyleMobile {
        margin-top: -12px;
        margin-left: 50px;
    }

    .playStyleMobile {
        display: inline-block;
        width: 33px;
        height: 33px;
        top: 4px;
    }

    .playStyleMobile img {
        margin-left: 11px;
        margin-top: 10px;
    }
</style>
