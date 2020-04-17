<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <div class="control-panel_div_rt">
            <div class="button_border " style="display:inline-block;width:48px;height:40px;float: right;" id="reset" @click="resetEvent">
                <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="../../../../static/images/chongzhi.png" alt="">
            </div>

            <span class="figure_text">底面图形</span>
            <div class="figure_bottom ">
                <div id="box1" class="figure" v-show="box1show" data-ratio="1:1"></div>
                <div id="box2" class="figure" v-show="box2show" data-ratio="1:1"></div>
                <div id="box3" class="figure" v-show="box3show" data-ratio="1:1"></div>
                <div id="box4" class="figure" v-show="box4show" data-ratio="1:1"></div>
                <div id="box5" class="figure" v-show="box5show" data-ratio="1:1"></div>
                <div id="box6" class="figure" v-show="box6show" data-ratio="1:1"></div>
            </div>

            <label class="control-block_div_border radio_test1" style="margin-top:10px;">
                <input class="radio-default" type="radio" id="test1" name="radio-group" value="1" v-model="polygon" >
                <label for="test1">正多边形</label>
            </label>

            <label class="control-block_div_border radio_test2" style="margin-top:10px;">
                <input class="radio-default" type="radio" id="test2" name="radio-group" value="-1" v-model="polygon">
                <label for="test2">非正多边形</label>
            </label >


            <div class="control-block_div_border edge_height_slider" style="margin-top:10px;">
                <div class="edge_text">边数</div>
                <vue-slider ref="slider4" v-model="sliderNum" v-bind="sliderOption" style="margin:0 auto;position: relative;top:50px;">

                </vue-slider>

                <div class="height_text">高度</div>
                <vue-slider ref="slider4" v-model="sliderNum4" v-bind="sliderMathOption" style="margin:0 auto;position: relative;top:113px; margin-bottom: 14px;">

                </vue-slider>
            </div>

        </div>

        <span id="title" class="title">棱柱的构建</span>
        <div id="3dContainer" class="control-panel_div_content">

        </div>
    </div>


</template>

<script lang="ts">
import Vue from 'vue'
import "../../../../src/assets/css/core.css"
import "../../../../src/assets/css/layout.css"
import {ViewController} from "../../../../src/core/ViewController";
import {PrismViewHandler} from "./services/PrismViewHandler";
import vueSlider from "../../../../src/component/ui/vue2-slider.vue";

//Returned expression type   is not assignable to type Data
export default Vue.extend({
    components: {
        vueSlider
    },
    data(){
      return{
          box1show: true,
          box2show: false,
          box3show: false,
          box4show: false,
          box5show: false,
          box6show: false,
          polygon: 1,
          showIsobar:false,
          sliderNum:4,
          sliderOption:{
              width:"220px",
              data:[3,4,5,6,10,"+∞"],
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
              }
          },
          sliderNum4:100,
          sliderMathOption:{
              min: 0,
              max: 200,
          }
      }
    },
    created(){
        ViewController.getInstance(new PrismViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted(){
    /*    var vConsole = new VConsole();
        console.log('Hello world');*/
        ViewController.getInstance().domReady();
    },
    methods: {
        resetEvent(){
            ( ViewController.getInstance().viewHandler as any).prism3dModel.reset(this.sliderNum);
            this.sliderNum = 4;
            this.sliderNum4 = 100;
            this.polygon = 1;
        }
    },
    watch:{
        sliderNum:function (sliderNum:any) {
            this.polygon = 1;
            if (Number.parseInt(sliderNum) == 4) {
                this.box1show = true;
            }
            if (sliderNum == 3) {
                this.box2show = true;
            }
            if (sliderNum == 5) {
                this.box3show = true;
            }
            if (sliderNum == 6) {
                this.box4show = true;
            }
            if (sliderNum == 10) {
                this.box5show = true;
            }
            if (sliderNum === '+∞') {
                this.box6show = true;
            }

            if (Number.parseInt(sliderNum) != 4) {
                this.box1show = false;
            }
            if (sliderNum != 3) {
                this.box2show = false;
            }
            if (sliderNum != 5) {
                this.box3show = false;
            }
            if (sliderNum != 6) {
                this.box4show = false;
            }
            if (sliderNum != 10) {
                this.box5show = false;
            }
            if (sliderNum !== '+∞') {
                this.box6show = false;
            }

            (ViewController.getInstance().viewHandler as any).prism3dModel.dragPolygon(sliderNum);
            return setTimeout(function () {
                (ViewController.getInstance().viewHandler as any).prism3dModel.dragChangePyramid(sliderNum);
            },0);
        },

        sliderNum4:function (sliderNum4:number) {
            ( ViewController.getInstance().viewHandler as any).prism3dModel.dragEventHeight(sliderNum4,this.sliderNum);
        },

        polygon:function (value) {
            let sliderNum = this.sliderNum;
            ( ViewController.getInstance().viewHandler as any).prism3dModel.judge(Number.parseInt(value) ,sliderNum);
        }
    }
})
</script>

<style scoped="scoped">
    body{
        overflow:hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;

    }

    .title{
        font-size: 24px;
        color: #000000;
        position: absolute;
        top: 24px;
        left: 24px;
    }

    .figure_text{
        font-size: 16px;
        position: absolute;
        top: 40px;
        right: 110px;
    }

    .figure_bottom{
        width: 240px;
        height: 178px;
        border: 1px solid white;
        background-color: white;
        position: absolute;
        right: 20px;
        top: 72px;
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
        box-shadow: 0 0 0 1px rgba(0,0,0,0.12);
    }

    .figure{
        width: 178px;
        height: 178px;
        position: absolute;
        left: 30px;

    }

    .radio_test1{
        width: 220px;
        height: 24px;
        position: absolute;
        right: 20px;
        top: 270px;
    }

    .radio_test2{
        width: 220px;
        height: 24px;
        position: absolute;
        right: 20px;
        top: 335px;
    }

    .edge_height_slider{
        width: 220px;
        height: 169px;
        position: absolute;
        right: 20px;
        top: 400px;
    }

    .edge_text{
        font-size: 16px;
        position: absolute;
        right: 110px;
        top: 10px;
    }

    .height_text{
        font-size: 16px;
        position: absolute;
        right: 110px;
        top: 105px;
    }
</style>
