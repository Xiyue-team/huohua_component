<template>
  <div class='aspectration bg_white covered root_div_container'>
      <div style='position: absolute;left: 10px;top: 10px;padding: 5px 1px;'>
          <h2 id="title" class='title_induction'>乙醇与溴化氢的取代反应</h2>
      </div>
    <div class='control-panel_div_content fill_parent' style='' id='father_div'>
        <!---->
            <div class='view_div_content' id='show_model' style='' data-ratio='1:1' >
                    <div style='width: 620px;height: 240px;position: relative;left: 195px;top: 100px;z-index: 2' id='show_image'>
                        <div style='width: 418px;height: 115px;position: relative;left: 300px;float: left' id="imgo" v-show='showImg'>
                            <img src='./sub_static/prompt@2x.png' style='width: 418px;height: 115px;'/>
                        </div>
                        <div id="imgt" v-show='showImg'>
                            <img src='./sub_static/words@2x.png' style='width: 620px;height: 97px;'/>
                        </div>
                        <div class='control-block_div_border' style='width: 590px;height: 50px;'>
                            <div  class="slider_text" style='left: 15px;'>反应物</div>
                            <div class="slider_text" style='left: 120px;'>断键</div>
                            <div class="slider_text" style='left: 240px;'>成键</div>
                            <div class="slider_text" style='left: 350px;'>生成物</div>

                            <div  id='playBtn' class='play_btn' @click='changSliderValue' >
                                <img v-show='!isPlay'  src='../../../../static/images/play_icon.png'  alt=''>
                                <img v-show='isPlay'   src='../../../../static/images/pause_icon.png' alt=''>
                            </div>


                            <vue-slider ref='sliderC' v-model='sliderNum' v-bind='sliderOption'>
                                <template slot='label'  slot-scope ='{ label, active,index }'>
                                    <span :class='["custom-label", { active }]'  v-if='label == -8'> {{ label }}</span>
                                    <span :class='["custom-label", { active }]'  v-if='label == 8'> {{ label }} </span>
                                </template>
                            </vue-slider>
                        </div>
                    </div>
                    <div  id='box' style='width: 100%;height: 100%;position: absolute;top: 60px;'>

                    </div>
            </div>
    </div>
    <div class='control-panel_div_floatRight'>
        <div class='button_border ' style='display:inline-block;width:48px;height:40px;background: #FFFFFF;margin-top: -18px;margin-right: 0px '
             id='reset' @click='reset' >
            <img style='width: 24px;height: 24px;  margin-top: 8px;margin-left: 12px;'
                 src='../../../../static/images/chongzhi.png'
                 alt='123'  class='resetimg'>
        </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import h_button from '../../../../src/component/ui/button.vue';
import {ViewController} from '../../../../src/core/ViewController';
import {EthanolHydrogenViewHandler} from './EthanolHydrogenViewHandler';
import {SliderConfig} from '../../../../src/config/SliderConfig';
import vueSlider from "../../../../src/component/ui/vue2-slider.vue";
export default Vue.extend({
    data() {
        return {
            isPlay: false,
            showImg: true,
            sliderNum: 1,
            disabled: false,
            sliderOption: {
                width: '80%',
                min: 1,
                max: 4,
                show: true,
//                tooltip: 'always','
                disabled: true,
//                clickable: false, //设置是否可以点击 默认true
                backDisabled: true,
                piecewise: true,  //设置间隔点
                interval: 1,
                reverse: false,
                piecewiseLabel: true,
                tooltip: false,
                lazy: true,
                dotSize: 20,
                speed: 0.5,
                piecewiseStyle: {
                    'backgroundColor': '#E5E5E5',
                    'visibility': 'visible',
                    'width': '12px',
                    'height': '12px'
//                    "backgroundColor": "#ccc",
//                    "visibility": "visible",
//                    "width": "12px",
//                    "height": "12px"
                },
                piecewiseActiveStyle: {
                    "backgroundColor": "#3498db",
                },
//                processStyle: {
////                    'backgroundImage': '-webkit-linear-gradient(left, #f05b72, #3498db)'
//                    'backgroundImage': '-webkit-linear-gradient(left, #FF5733, #FFBD33,#DBFF33,#75FF33)'
//                },
                style: {
                    'marginTop': '30px',
                    'marginLeft': '23px',
                }
            },

            tooltipStyle: {
                'backgroundColor': '#666',
                'borderColor': '#666'
            },
        };

    }
    ,
    components: {
        vueSlider,
    },
    created() {
        ViewController.getInstance(new EthanolHydrogenViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted() {
        ViewController.getInstance().domReady();
    },
    methods: {
        //点击播放按钮
        changSliderValue() {
            this.sliderOption.disabled = false;
            if (this.sliderNum === 4 &&  this.isPlay === false && (ViewController.getInstance().viewHandler as EthanolHydrogenViewHandler).qdModel.zhuantai) { //动画结束后， 点击按钮重新播放
                (ViewController.getInstance().viewHandler as EthanolHydrogenViewHandler).resetTween();
            }
            this.isPlay = !this.isPlay;
            document.getElementById('imgo').style.opacity = '0';
            document.getElementById('imgt').style.opacity = '0';
            (ViewController.getInstance().viewHandler as EthanolHydrogenViewHandler).changSliderValue();
        },
        reset() {
            this.$data.sliderOption.disabled = true;
//            this.refresh();
            this.sliderNum = 1;
            (ViewController.getInstance().viewHandler as EthanolHydrogenViewHandler).reset();
        }
    }
    ,
    watch: {
        sliderNum: function (sliderNum: number) {
            (ViewController.getInstance().viewHandler as EthanolHydrogenViewHandler).sliderAnimate(sliderNum);
        }
    }

});

</script>

<style scoped='scoped'>
  .view_div_content{
      width: 1000px;
      height: 576px;
  }
  .title_induction{
    width: 400px;
    height:100px;
    line-height: 24px;
    position: absolute;
    left: 24px;
    top:10px;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #000000;
    line-height: 24px;
  }

  .model_title{
      font-family: PingFangSC-Regular;
      font-size: 20px;
      color: #000000;
      position: absolute;
      left: 30px;
      top:72px;
  }
  .resetimg{
    width: 48px;
    height:40px;
  }

  .control-block_div_border{
      float: left;
      position: relative;
      bottom: -200px;
      background: #FFFFFF;
      border: 0 solid rgba(0,0,0,0.10);
      box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
      border-radius: 6px;
  }

  .play_btn{
      display: inline-block;
      width: 48px;
      height: 48px;
      background: #FFFFFF;
      border-radius:50%;
      box-sizing: border-box;
      position: absolute;
      top:20px;
      right: 15px;
      float: left;
      border: 0 solid rgba(0,0,0,0.06);
      box-shadow: 0 2px 6px 0 rgba(0,0,0,0.24);


      /*background: #FFFFFF;*/
      /*border: 0 solid rgba(0,0,0,0.06);*/
      /*box-shadow: 0 2px 6px 0 rgba(0,0,0,0.24);*/
  }

  .play_btn img{
      width: 20px;
      height: 20px;
      margin-top: 14px;
      margin-left: 15px;
  }

  .slider_text{
        float: left;
        position: relative;
        font-size: 16px;
        color: #1A1A1A;
        line-height: 16px;
    }


  .text_style {
      font-style: italic;
      font-family: "Times New Roman";
      font-size: 18px;
      color: #000000;

  }
</style>
