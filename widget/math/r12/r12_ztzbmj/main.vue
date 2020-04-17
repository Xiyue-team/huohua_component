<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <div class="control-panel_div_rt">
            <div class="button_border " style="display:inline-block;width:48px;height:40px;float: right;" id="reset" @click="resetEvent">
                <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="../../../../static/images/chongzhi.png" alt="" >
            </div>

            <div class="control-block_div_border radius_height_slider" style="margin-top:10px;">
                <div class="radius_text">模型</div>
                <vue-slider ref="slider4" v-model="sliderNum" v-bind="sliderOption" style="margin:0 auto;position: relative;top:50px;">

                </vue-slider>
            </div>

            <h_button title="展开" class="open" @click.native="openEvent"></h_button>

            <div>
                <img class="ztzgongshi" v-show="gongshi01" src="./sub_static/yuanzhui.png"/>
                <img class="ztzgongshi" v-show="gongshi02" src="./sub_static/yuantai.png"/>
                <img class="ztzgongshi" v-show="gongshi03" src="./sub_static/yuanzhu.png"/>
            </div>
        </div>

        <span class="title">圆锥、圆台、圆柱的表面积变化关系</span>
        <!--<div>-->
            <!--<img class="ztzgongshi01" src="./sub_static/yuanzhui.png"/>-->
            <!--<img class="ztzgongshi02" src="./sub_static/yuantai.png"/>-->
            <!--<img class="ztzgongshi03" src="./sub_static/yuanzhu.png"/>-->
        <!--</div>-->
        <div id="3dContainer" class="control-panel_div_content">

        </div>
    </div>


</template>

<script lang="ts">
import Vue from 'vue'
import "../../../../src/assets/css/core.css"
import "../../../../src/assets/css/layout.css"
import {ViewController} from "../../../../src/core/ViewController";
import {CircleViewHandler} from "./services/CircleViewHandler";
import h_button from '../../../../src/component/ui/button.vue';
import vueSlider from '../../../../src/component/ui/vue2-slider.vue';

export default Vue.extend({
    components: {
        h_button,vueSlider
    },
    data(){
      return{
          gongshi01: true,
          gongshi02: false,
          gongshi03: false,
          sliderNum: '圆锥',
          sliderOption:{
              width:'220px',
              data:['圆锥', '圆台', '圆柱'],
              piecewise: false,
              piecewiseLabel: false,
              piecewiseStyle: {
                  "backgroundColor": "#ccc",
                  "visibility": "visible",
                  "width": "12px",
                  "height": "12px"
              },
              piecewiseActiveStyle: {
                  "backgroundColor": "#ccc",
                  "fontSize":"18px"
              },
          },
      }
    },
    created(){
        ViewController.getInstance(new CircleViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted(){
        ViewController.getInstance().domReady();
    },
    methods: {
        async openEvent(){

            const animation = await  (ViewController.getInstance().viewHandler as any).circle3dModel.openEvent(this.sliderNum);
            (ViewController.getInstance().viewHandler as any).circle3dModel.showLine();
        },

        resetEvent(){
            this.sliderNum = '圆锥',
            (ViewController.getInstance().viewHandler as any).circle3dModel.reset();
        }
    },
    watch:{
        sliderNum:function (sliderNum:any) {
            (ViewController.getInstance().viewHandler as any).circle3dModel.dragCircleGeometry(sliderNum);

            if (sliderNum === '圆锥') {
                this.gongshi01 = true;
                this.gongshi02 = false;
                this.gongshi03 = false;
                (ViewController.getInstance().viewHandler as any).circle3dModel.clearDashLine();
            }

            if (sliderNum === '圆台') {
                this.gongshi01 = false;
                this.gongshi02 = true;
                this.gongshi03 = false;
                (ViewController.getInstance().viewHandler as any).circle3dModel.ytRadius();
            }

            if (sliderNum === '圆柱') {
                this.gongshi01 = false;
                this.gongshi02 = false;
                this.gongshi03 = true;
                (ViewController.getInstance().viewHandler as any).circle3dModel.clearDashLine();
            }
        },

    }
})
</script>

<style scoped="scoped">
    .title{
        font-size: 24px;
        color: #000000;
        position: absolute;
        top: 24px;
        left: 24px;
    }

    .radius_height_slider{
        width: 220px;
        height: 108px;
        position: absolute;
        right: 20px;
        top: 170px;
    }

    .radius_text{
        font-size: 16px;
        position: absolute;
        right: 110px;
        top: 10px;
    }

    .open{
        width: 244px;
        position: absolute;
        right: 20px;
        top: 340px;
    }

    .ztzgongshi01{
        transform: scale(0.5);
        opacity: 0;
        /*position: absolute;*/
        /*top: 300px;*/
        /*left: 0;*/
    }

    .ztzgongshi02{
        transform: scale(0.5);
        opacity: 0;
        /*position: absolute;*/
        /*top: 300px;*/
        /*left: 0;*/
    }

    .ztzgongshi03{
        transform: scale(0.5);
        opacity: 0;
        /*position: absolute;*/
        /*top: 300px;*/
        /*left: 0;*/
    }

    .ztzgongshi{
        transform: scale(0.5);
        position: absolute;
        left: -105px;
        top: 340px;
    }
</style>
