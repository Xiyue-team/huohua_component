<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox" slot-scope="viewBox">
        <span class="title_style">甘油三酯的形成过程</span>
        <div  id="3dContainer" style="width: 100%;height: 100%;">
          <div style="display: flex;width: 100%; height: 100%; ">

              <div id="p" style=" margin:  auto ; position: relative; width: 680px;height: 360px;">
                  <!--<img src="./sub_static/1.png" alt=""  style="width: 680px;height: 360px; ">-->
                <!--<video id="animationVideo" src="./sub_static/animation.mp4" style="width: 680px;height: 360px;" />-->
             <!-- <img name="animationImg" :id="'animation'+path.index"  :src="path.base64Img" alt="" style="width: 680px;height: 360px;visibility:hidden;position: absolute;left: 0;visibility: hidden" v-for="(path,index) in imgArry">
              <canvas id="animationCanvas" style="width: 680px;height: 360px;" width="680px;" height="360px;"/>-->
            </div>
          </div>
          <div style="position: absolute;display: flex;bottom: 24px;width: 100%; z-index: 3">
            <div v-if="isPc" style="margin: 0 auto; width: 640px;height: 44px; position: relative" class="control-block_div_border slider_style">
              <span class="text_style" style="margin-left: 145px;">断键过程</span>
              <span class="text_style" style="margin-left: 185px;">成键过程</span>
              <div style="width: 540px;  margin-left: 40px;float: left;">
                <vue-slider ref='sliderC' v-model='sliderNum' v-bind='sliderOption' style="">
                    <template slot="label" slot-scope="{label,active,index}">
                       <div  :class="['custom-label', { active }]" v-if="index  === 0 || index  === 59 || index  === 134">
                         <div></div>
                      </div>
                    </template>
                </vue-slider>
              </div>
                <div  class="play_btn" @click="isPlay = !isPlay" style=" float: right;position: absolute; top:13px;right: 15px">
                  <img v-show="!isPlay"  src="../../../../static/images/play_icon.png" alt="" style="margin: 16px 0px 0px 17px">
                  <img v-show="isPlay"   src="../../../../static/images/pause_icon.png" alt="" style="margin: 16px 0px 0px 17px">
                </div>
            </div>

            <div v-if="isMobile" style="margin: 0 auto; width: 500px;height: 44px; position: relative" class="control-block_div_border slider_style">
              <span class="text_style" style="margin-left: 113px;">断键过程</span>
              <span class="text_style" style="margin-left: 128px;">成键过程</span>
              <div style="width: 400px;  margin-left: 40px;float: left;">
                <vue-slider ref='sliderC' v-model='sliderNum' v-bind='sliderOption' style="">
                  <template slot="label" slot-scope="{label,active,index}">
                    <div  :class="['custom-label', { active }]" v-if="index  === 0 || index  === 59 || index  === 134">
                      <div></div>
                    </div>
                  </template>
                </vue-slider>
              </div>
              <div   class="play_btn" @click="isPlay = !isPlay" style=" float: right;position: absolute; top:13px;right: 15px">
                <img v-show="!isPlay"  src="../../../../static/images/play_icon.png" alt="" style="margin: 16px 0px 0px 17px">
                <img v-show="isPlay"   src="../../../../static/images/pause_icon.png" alt="" style="margin: 16px 0px 0px 17px">
              </div>
            </div>
          </div>

        </div>
      </template>
      <template slot="controlPanel" slot-scope="controlPanel">
        <div id="controlPanel">
          <div class="button_border " style="width:48px;height:40px;position: absolute;top:20px;right:24px;" id="reset" @click="resetEvent">
            <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="./../../../../static/images/chongzhi.png" alt="" >
          </div>
        </div>
      </template>
    </fullScreensLayout>

  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import '../../../../src/assets/css/core.css'
    import '../../../../src/assets/css/layout.css'
    import {BrowserUtil} from '../../../../src/util/BrowserUtil';
    import {ViewController} from '../../../../src/core/ViewController';
    import h_switch from '../../../../src/component/ui/switch.vue';
    import h_button from '../../../../src/component/ui/button.vue';
    import {GyszdxcViewHandler} from './services/GyszdxcViewHandler';
    import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import {GyszdxcViewHandlerForPc} from './services/GyszdxcViewHandlerForPc';

    export default Vue.extend({
        components: {
            h_switch,
            h_button,
            vueSlider,
            fullScreensLayout,
        },
        data() {

            return {
                isMobile: false,
                isPc :false,
                sliderNum: 1,
                isPlay:false,
                imgArry:[],
                sliderOption: {
                    width: '100%',
                    min: 1,
                    max: 135,
//                    min:0,
//                    max:16,
                    show: true,
                    tooltip: false,
                    piecewise: false,
                    interval: 1,
                    disabled: false,
                    piecewiseLabel: true,
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
                    speed: 0,   //设置滑条的动画时间
                },
            }
        },
        created() {
            // if(BrowserUtil.getBrowserInfo().os === 'Windows'){
            //     ViewController.getInstance(new GyszdxcViewHandlerForPc(this));
            // }else{
            ViewController.getInstance(new GyszdxcViewHandler(this));
            // }
            ViewController.getInstance().viewHandler.beforeRenderElement();

        },
        mounted() {
            ViewController.getInstance().domReady();

            if(BrowserUtil.getBrowserInfo().isSmallDevice){
                this.isMobile = true;
                this.isPc = false;
            } else {
                this.isMobile = false;
                this.isPc = true;
            }
//            setTimeout(()=>{
//                (document.getElementById('animation') as any).play()
//            },1000)
        },
        methods: {
            resetEvent() {
                (ViewController.getInstance().viewHandler as GyszdxcViewHandler).reset();
            },

        },
        watch: {
            isPlay:function(isPlay: boolean){
                (ViewController.getInstance().viewHandler as GyszdxcViewHandler).playAndPause(isPlay);
            },
            sliderNum:function (number: number, lastNumber: number) {
                (ViewController.getInstance().viewHandler as GyszdxcViewHandler).setAnimationImgPosition(number, lastNumber);
            }

        }
    })
</script>

<style scoped="scoped">
  .custom-label {
    position: relative;
    width: 15px;
    height: 15px;
  }
  .custom-label div {
    background: #e6e6e6;
    border: 0 solid rgba(0,0,0,0.10);
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.24);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    position: absolute;
    top: 13px;

  }
  .custom-label.active div{
    background: #5CAEFD;
  }
  body {
    overflow: hidden !important;
    overflow-x: hidden;
    overflow-y: hidden;
  }
  /*.brokenKey_animation{*/
    /*background: url("./sub_static/djdh.jpg") no-repeat;*/
    /*width: 680px; height: 360px;*/
    /*background-size: 4500%;*/
  /*}*/
  /*.bonding1_animation{*/
    /*background: url("./sub_static/cjdh1.jpg") no-repeat;*/
    /*width: 680px; height: 360px;*/
    /*background-size: 3000%;*/
  /*}*/
  /*.bonding2_animation{*/
    /*background: url("./sub_static/cjdh2.jpg") no-repeat;*/
    /*width: 680px; height: 360px;*/
    /*background-size: 4300%;*/
  /*}*/
  
  @keyframes animations {
    0%{
      background-position:  0%;
    }
    100%{
      background-position: 100%;
    }
  }
  /*.stop {*/
    /*animation-play-state: paused;*/
  /*}*/
  .text_style{
    font-size: 16px;
    color: #1A1A1A;
    line-height: 16px;
  }
  .play_btn{
    display: inline-block;
    width: 44px;
    height: 44px;
    background: #FFFFFF;
    border-radius:50%;
    box-sizing: border-box;
    border: 0 solid rgba(0,0,0,0.06);
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.24);
    /*position: absolute;*/
    /*bottom: 64px;*/
    /*right: -3px;*/
  }

  .play_btn img{
    width: 12px;
    height: 14px;
    margin-top: 20px;
    margin-left: 20px;
  }
  .title_style{
    z-index: 1;
    font-size: 24px;
    color: #000000;
    line-height: 24px;
    margin: 0;
    padding:0;
    position: absolute;
    top:24px;
    left:24px;
  }
  .slider_style{
    background: #FFFFFF;
    border: 0 solid rgba(0,0,0,0.10);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
    border-radius: 6px
  }
/*  .diy-piecewise{
  backgroundColor: #ccc;
  visibility: visible;
  width: 12px;
  height: 12px;
  }*/




</style>
