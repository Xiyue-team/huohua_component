<template>
    <div class="aspectration bg_white root_div_container" >
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span class="title_style">乳糖的形成</span>
                <div id="3dContainer" style="width: 100%;height: 100%;   display: flex;flex-direction: column;justify-content: space-between;align-items: center;">
                    <!--模型动画-->
                    <div id="3dModel" class="mainStyle" v-bind:class="{'mainStyleMobile' : isMobile, 'mainStyleIpad' : isIpad }"></div>
                    <!--方程式-->

                    <div class="imgContain" v-bind:class="{'imgContainMobile': isMobile}">
                        <img ondragstart="return false" src="./sub_static/banrutang.png" class="img1Style" v-bind:style="img2style" v-bind:class="{'img1StyleMobile': isMobile, 'img1StyleIpad': isIpad}"/>
                        <img ondragstart="return false" src="./sub_static/putaotang.png"  class="img2Style" v-bind:style="img2style" v-bind:class="{'img2StyleMobile': isMobile, 'img2StyleIpad': isIpad}"/>
                        <img ondragstart="return false" src="./sub_static/rutanggongshi.png" v-bind:style="imgstyle" class="img3Style" v-bind:class="{'img3StyleMobile': isMobile}">
                    </div>

                    <!--滑块-->
                    <div class="slider-content control-block_div_border sliderContentStyle" v-bind:class="{'sliderContentStyleMobile': isMobile}" >
                        <vue-slider id="test" ref='sliderC' v-model='sliderNum' v-bind='sliderOption' class="sliderStyle" v-bind:class="{'sliderStyleMobile': isMobile}"
                                     @mousedown.native="pause()" @touchstart.native="pauses()"  >
                        </vue-slider>
                        <!--开始暂停按钮-->
                        <div class="play_btn playStyle" @click="isPlay = !isPlay" v-bind:class="{'playStyleMobile': isMobile , 'play_btnMobile': isMobile}">
                            <img ondragstart="return false" v-show="!isPlay"  src="./sub_static/play_icon.png" alt="">
                            <img ondragstart="return false" v-show="isPlay"   src="./sub_static/pause_icon.png" alt="">
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
  import {RtdxcViewHandler} from './services/RtdxcViewHandler';
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
        isDown: false,
        isMobile: false,
        isIpad: false,
        show: true,
        isPlay: false,
        sliderNum: 0,
        img2style: {
          opacity: 1,
        },
        imgstyle: {
          opacity: 0
        },
        sliderOption: {
          width: '90%',
          min: 0,
          max: 100,
          speed: 0,
          show: true,
          speed: 0,
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
      ViewController.getInstance(new RtdxcViewHandler(this), viewOption);
      ViewController.getInstance(new RtdxcViewHandler(this));
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

      },
    },
    watch: {

      sliderNum: function(sliderNum: number) {

        (ViewController.getInstance().viewHandler as RtdxcViewHandler).
          rtdxc.modelanimation.action.time = sliderNum / 64;

        if (this.isPlay) {
          (ViewController.getInstance().viewHandler as RtdxcViewHandler).playAnimation(true);
        } else {
          (ViewController.getInstance().viewHandler as RtdxcViewHandler).playAnimation(false);
        }

        if (sliderNum > 0 && sliderNum < 100 && !this.isPlay) {

          (ViewController.getInstance().viewHandler as RtdxcViewHandler).playAnimation(false);

        } else if (sliderNum >= 100) {

          (ViewController.getInstance().viewHandler as RtdxcViewHandler).playAnimation(true);

        }

        this.imgstyle.opacity = sliderNum / 100;

        if (sliderNum === 0) {
          this.img2style.opacity = 1;
        } else if (sliderNum > 0) {
          this.img2style.opacity = 0;
        }


      },

      isPlay: function(isPlay: boolean) {
        (ViewController.getInstance().viewHandler as RtdxcViewHandler).playAnimation(true);
      },

      isMobile: function(value: boolean) {
        this.sliderOption.width = value ? '90%' : this.sliderOption.width;
        setTimeout(() => {this.$refs.sliderC.refresh(); }, 20);
      }

    }

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
    }

    .mainStyle {
        height: calc(100% - 180px);
    }

    .mainStyleMobile {
        margin-top: 10px;
        margin-left: 10px;
    }

    .mainStyleIpad {
        width: 505px;
        height: 270px;
        margin-top: 50px;
        margin-left: -500px;
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
        bottom: 100px;
        left: 0;
        right: 0;
        margin: auto;
    }

    .imgContainMobile {
        width: 357px;
        height: 70px;
        /*margin-left: -25px;*/
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
    }

    .imgContainIpad {
        position: absolute;
        width: 693px;
        height: 140px;
        bottom: 110px;
    }

    .img1Style {
        position: absolute;
        width: 128px;
        height: 140px;
        left: 100px;
    }

    .img2Style {
        position: absolute;
        width: 128px;
        height: 140px;
        left: 450px;
    }

    .img3Style {
        position: absolute;
        left: 30px;
        width: 714px;
        height: 140px;
    }

    .img1StyleMobile {
        position: absolute;
        width: 64px;
        height: 70px;
        margin-left: 0px;
        margin-top: 30px;
    }

    .img2StyleMobile {
        position: absolute;
        width: 64px;
        height: 70px;
        margin-left: -220px;
        margin-top: 30px;
    }

    .img3StyleMobile {
        width: 357px;
        height: 70px;
        margin-top: 30px;
    }

    .img1StyleIpad {
        width: 128px;
        height: 140px;
        margin-left: 70px;
    }

    .img2StyleIpad {
        width: 128px;
        height: 140px;
        margin-left: -60px;
    }

    .sliderContentStyle {
        position: relative;
        width: 480px;
        height: 40px;
        margin-bottom: 30px
    }

    .sliderContentStyleMobile {
        width: 250px;
        height: 12px;
        bottom: -22px
    }

    .sliderStyle {
        width: 100%;
        display: inline-block;
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

