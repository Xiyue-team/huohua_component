<template>
    <div class="aspectration bg_white root_div_container">
        <div class="control-panel_div_rt">
            <label for="checkbox-1" id="s1" class="control-block_div_border switch " style="margin-top:188px;"  v-on:mouseover="shou" v-on:mouseout="shubiao">
                <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" v-model="axiom" >
                <label for="checkbox-1">面面垂直性质定理</label>
            </label>

            <div v-show="axiom" style="margin-top: 12px;" class="img_style">
                <!--<img src="./sub_static/mmcz.png" style="width: 325px; position: absolute;top: 280px;left: -20px;transform: scale(0.7)">-->
                如果两个平面垂直，则一个平面内垂直于交线的直线与另一个平面垂直。
            </div>
            <div class="control-block_div_border edge_height_slider background_scale" style="position: relative;padding-top: 12px;margin-top: 20px;" v-if="axiom"  v-bind:class="{'silder_disabled':disableCtrl}">

                <span style='position: absolute; top: 13px;left: 81px' class="slider_text">移动<span class="text_style">OB</span></span>
                <vue-slider ref="slider1th" v-model="slidernumber1" v-bind="sliderOption1" style="margin-top: 25px" >
                    <template slot="tooltip" scope="tooltip">
                        <div v-if="false" class="custom-tooltip">
                        </div>
                    </template>
                </vue-slider>

                <span style=" position: absolute; top: 80px;left: 81px" class="slider_text">转动<span class="text_style">OA</span></span>
                <vue-slider ref="slider1th" v-model="slidernumber2" v-bind="sliderOption2" style="margin-top: 36px;margin-bottom:   21px;">
                    <template slot="tooltip" scope="tooltip">
                        <div v-if="false" class="custom-tooltip">
                        </div>
                    </template>
                </vue-slider>
            </div>
        </div>


        <div  class="control-panel_div_content">
            <span class="title_text">面面垂直性质定理</span>
            <!--<div v-show="axiom">-->
                <!--<img src="./sub_static/mmcz.png" style="width: 325px; position: absolute;top: 60px;left: 24px;">-->
            <!--</div>-->
            <div id="3dContainer" class='view_div_content' style='background-color: white;' data-ratio='1:1'></div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import {ViewController} from '../../../../src/core/ViewController';

import h_button from '../../../../src/component/ui/button.vue';
import h_switch from '../../../../src/component/ui/switch.vue';
import {MmczViewHandler} from './services/MmczViewHandler';
import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
export default Vue.extend({
    components: {
        vueSlider,
        h_button,
        h_switch,
    },
    data() {
          return{
              slidernumber1: 0,
              slidernumber2: 0,
              axiom: false,
              disableCtrl: true,
              sliderOption1: {
                  width:"100%",
                  min: -50,
                  max: 50,
                  piecewise: false,
                  piecewiseLabel: false,
                  piecewiseStyle: {
                      "backgroundColor": "#ccc",
                      "visibility": "visible",
                      "width": "12px",
                      "height": "12px"
                  },
                  piecewiseActiveStyle: {
                      "backgroundColor": "#3498db"
                  }
              },
              sliderOption2: {
                  width: "100%",
                  min: 0,
                  max: 360,
                  piecewise: false,
                  piecewiseLabel: false,
                  piecewiseStyle: {
                      "backgroundColor": "#ccc",
                      "visibility": "visible",
                      "width": "12px",
                      "height": "12px"
                  },
                  piecewiseActiveStyle: {
                      "backgroundColor": "#3498db"
                  }
              },

      };
    },
    created() {
        ViewController.getInstance(new MmczViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
        ViewController.getInstance().hideLoading();
    },
    mounted() {
        ViewController.getInstance().domReady();
    },
    methods: {
        shou(){
            document.getElementById('s1').style.cursor = 'pointer';
        },
        shubiao(){
            document.getElementById('s1').style.cursor = 'default';
        },
    },
    watch: {
        axiom : async function (axiom: boolean) {
            if(axiom === false){
                this.slidernumber1 = 0;
                this.slidernumber2 = 0;
                (ViewController.getInstance().viewHandler as MmczViewHandler).reset();
            }
                await (ViewController.getInstance().viewHandler as MmczViewHandler).Mmcz.lineAnimation(axiom);
                this.disableCtrl = false;

        },
        slidernumber1 : function (value: number, lastValue: number) {
            (ViewController.getInstance().viewHandler as MmczViewHandler).Mmcz.sliderSetLinePosition(value);
        },
        slidernumber2 : function (value: number, lastValue: number) {
            const angle = value - lastValue;
            (ViewController.getInstance().viewHandler as MmczViewHandler).Mmcz.sliderSetRotateAngle(angle);
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
.background_scale{
    height: 133px;
    margin-top: 12px;
    padding: 0;
}
.slider_text{
    font-size: 16px;
    color: #4D4D4D;
    line-height: 16px;
}
.silder_disabled{
    pointer-events: none;
    cursor: default;
}

.img_style{
    font-family: '宋体';
    font-size: 16px;
    color: #000000;
}


    .text_style {
        font-style: italic;
        font-family: "Times New Roman";
        font-size: 16px;
        color: #000000;

    }

</style>
