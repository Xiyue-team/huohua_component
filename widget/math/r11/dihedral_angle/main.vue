<template>
  <div class="aspectration bg_white covered root_div_container ">

    <div class="control-panel_div_content" style="background-color: white;color: #FFFFFF;">

      <h2 class="title_induction">二面角</h2>
      <div class="view_div_content" style="background-color: white;height: calc(100% - 107px);margin-top: 61px" data-ratio="1:1" >
        <div  id="box" style="width: 100%;height: 100%;"></div>
      </div>
    </div>
    <div class="control-panel_div_rt">
      <div class="button_border " style="display:inline-block;width:48px;height:40px;float: right;" id="reset" @click="resetEvent">
        <img style="width: 24px;height: 24px;  margin-top: 8px;margin-left: 12px" src="../../../../static/images/chongzhi.png" alt="" >
      </div>

        <div style="display: flex;height: 100%">
          <div class="button_option" style="position: absolute;top: calc(20% + 20px);">
            <!--按钮控件-->
            <label v-show="true" class="control-block_div_border " style="margin-top:58px;width: 220px;height: 10px; padding-bottom: 28px" id="s2" v-on:mouseover="shou2" v-on:mouseout="shubiao2">
              <input class="radio-default" type="radio" id="emjEnable" name="radio-group" value="true" v-model="enable">
              <label for="emjEnable">二面角</label>
            </label>

            <h_button v-show="enable" title="二面角的棱"  class="button_div_dh"  :class="animationIsRunning===true ? 'event_disabled' : '' " @click.native="perismEvent"></h_button><br/>
            <h_button v-show="enable" title="二面角的面"  class="button_div_dh"  v-bind:class="{ event_disabled: animationIsRunning}" @click.native="planeEvent"></h_button><br/>

            <label v-show="enable" class="control-block_div_border switch planeAngle" id="s1" style="margin-top:12px;width: 220px" v-bind:class="{ 'event_disabled': animationIsRunning}" v-on:mouseover="shou" v-on:mouseout="shubiao">
              <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" value="1" v-model="angleEnable">
              <label for="checkbox-1" style="margin-top: 0px;">二面角的平面角</label>
            </label>

            <div v-if="enable && angleEnable" class="control-block_div_border" style="padding-bottom: 10px;">
              <div class="slider-title">角度
              <span class="slider-numberTitle">α</span>
              </div>
              <vue-slider ref="sliderC" v-model="sliderNum" v-bind="sliderOption" style="margin-top: 29px;    padding-bottom: 0px;">
                <template slot="label"  slot-scope ="{ label, active,index }">
                  <span :class="['custom-label', { active }]"  v-if="label == 0"> {{ '0°' }}</span>
                  <span :class="['custom-label', { active }]"  v-if="label == 180"> {{ '180°' }} </span>
                </template>
              </vue-slider>
            </div>
          </div>
        </div>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import h_button from '../../../../src/component/ui/button.vue';
import {ViewController} from '../../../../src/core/ViewController';
import {DihedralViewHandler} from './services/DihedralViewHandler';
import vueSlider from '../../../../src/component/ui/vue2-slider.vue';

export default Vue.extend({

    data() {
        return{
            animationIsRunning: false,
            sliderNum: 60,
            sliderOption: {
                width: '100%',
                min: 0,
                max: 180,
                show: true,
                tooltip: 'always',
                piecewise: false,
                interval: 1,
                clickable: false,
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
                    'backgroundColor': '#FFFFFF',
                    'color': '#000000'
                }
            },
            tooltipStyle: {
                'backgroundColor': '#666',
                'borderColor': '#666'
            },
            angleEnable: false,
            enable: false,
            value: true
        };
    },

    components: {
        vueSlider, h_button
    },

    created() {
        ViewController.getInstance(new DihedralViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },

    mounted() {
        ViewController.getInstance().domReady();

    },

    watch: {
          sliderNum: function (sliderNum: number, preSliderNum: number) {
//              console.log(sliderNum, this.sliderNum);

              console.log(this.sliderNum);

              if (sliderNum > 88 && sliderNum < 95 && this.value) {

                  let evt = document.createEvent("MouseEvents");
                  evt.initEvent("mouseup", true, true);
                  document.body.dispatchEvent(evt);
                  this.sliderNum = 90;

                  console.log('执行');
                  this.value = false;
                  (document.querySelector('.vue-slider-dotPoint') as any).click()
              } else if(sliderNum < 88 || sliderNum > 95) {

                  this.value = true;
              }

              const angle = sliderNum - preSliderNum;
              (ViewController.getInstance().viewHandler as DihedralViewHandler).dragSliderEvent(angle, sliderNum);
          },

          enable: function(animationEnable: boolean) {
                if (animationEnable) {
                    this.animationIsRunning = true;
                    (ViewController.getInstance().viewHandler as DihedralViewHandler).gltf.enableInitAnimation();
                }
          },

          angleEnable: function(angleEnable: boolean) {
                if (angleEnable) {

                    (ViewController.getInstance().viewHandler as DihedralViewHandler).gltf.showAngleLine();
                } else {
                    (ViewController.getInstance().viewHandler as DihedralViewHandler).gltf.hideAngleLine();
                }
          }
    },

    methods: {
        resetEvent() {
            (ViewController.getInstance().viewHandler as DihedralViewHandler).reset();
        },
        perismEvent() {
            (ViewController.getInstance().viewHandler as DihedralViewHandler).gltf.hightlightPrismAnimation();
        },
        planeEvent() {
            (ViewController.getInstance().viewHandler as DihedralViewHandler).gltf.changePlaneColor();
        },
        shou(){
            document.getElementById('s1').style.cursor = 'pointer';
        },
        shubiao(){
            document.getElementById('s1').style.cursor = 'default';
        },
        shou2(){
            document.getElementById('s2').style.cursor = 'pointer';
        },
        shubiao2(){
            document.getElementById('s2').style.cursor = 'default';
        },

    }
});
</script>

<style scoped="scoped">
  .control-block_div_border{
    padding-top: 20px;
    margin-top: 20px;
    background: #FFFFFF;
    border: 0 solid rgba(0,0,0,0.06);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.20);
    border-radius: 6px;
  }
  .title_induction{
    width: 400px;
    height:100px;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #000000;
    line-height: 24px;
    position: absolute;
    left: 24px;
    top: 24px;
  }
  .button_div_dh:first-child{
    margin-top: 58px;
  }
  .button_div_dh{
    width: 100%;
    height: 57px;
    margin-top: 12px;
  }
  .slider-title{
    position: relative;
    width: 50px;
    top: -8px;
    left: 89px;
    font-size: 16px;
    color: #4D4D4D;
  }
  .slider-numberTitle{
    font-family: "Times New Roman";
    font-style: italic;
  }

  .planeAngle{
    height: 23px;

  }
</style>
