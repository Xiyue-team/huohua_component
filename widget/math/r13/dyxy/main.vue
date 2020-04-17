<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <leftAndRightLayout>
        <template slot="viewBox" slot-scope="viewBox">
            <span id="title" class="title_text">大圆与小圆</span>
            <div  id="3dContainer" style="width: 100%;height: 100%;"></div>
        </template>
        <template slot="controlPanel" slot-scope="controlPanel">
            <div id="controlPanel" style="width: 100%;height: 100%">
                <div style="display: flex;width: 100%;height: 100%;">
                    <div class="control-block_div_border edge_height_slider background_scale slider_style" v-bind:class="{'slider_style_mobile': isMobile}">
                        <span class="text_style" style="margin-bottom: 10px">旋转1</span>
                        <vue-slider ref="slider1th" v-model="slidernumber1" v-bind="sliderOption1" style="margin-bottom: 10px">
                        </vue-slider>
                        <span class="text_style"style="margin-bottom: 10px">旋转2</span>
                        <vue-slider ref="slider1th" v-model="slidernumber2" v-bind="sliderOption1" style="margin-bottom: 10px">
                        </vue-slider>
                        <span class="text_style"style="margin-bottom: 10px">旋转3</span>
                        <vue-slider ref="slider1th" v-model="slidernumber3" v-bind="sliderOption1" style="margin-bottom: 0px">
                        </vue-slider>
                    </div>
                </div>
            </div>
        </template>
    </leftAndRightLayout>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import {BrowserUtil} from '../../../../src/util/BrowserUtil';
import {ViewController} from '../../../../src/core/ViewController';
import h_button from '../../../../src/component/ui/button.vue';
import h_switch from '../../../../src/component/ui/switch.vue';
import leftAndRightLayout from '../../../../src/component/layout/leftAndRight_layout.vue'
import {DyxyViewHandler} from './services/DyxyViewHandler';
import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
export default Vue.extend({
    components: {
        vueSlider,
        h_button,
        h_switch,
        leftAndRightLayout
    },
    data() {
          return{
          isMobile: BrowserUtil.getBrowserInfo().isSmallDevice,
          axiom: false,
              slidernumber1:0,
              slidernumber2:0,
              slidernumber3:0,
              sliderOption1:{
                  width:"100%",
                  min:0,
                  max:360,
                  piecewise: false,
                  tooltip: false,
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
        ViewController.getInstance(new DyxyViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted() {
        ViewController.getInstance().domReady();
    },
    methods: {
        shou() {
            document.getElementById('s1').style.cursor = 'pointer';
        },
        shubiao() {
            document.getElementById('s1').style.cursor = 'default';
        },
    },
    watch: {
        slidernumber1: function (number: number , lastnumber: number) {
            let angle = number - lastnumber;
            (ViewController.getInstance().viewHandler as DyxyViewHandler).dyxy.getXRotateAngle(angle);
        },
        slidernumber2: function (number: number , lastnumber: number) {
            let angle = number - lastnumber;
            (ViewController.getInstance().viewHandler as DyxyViewHandler).dyxy.getYRotateAngle(angle);
        },
        slidernumber3: function (number: number , lastnumber: number) {
            let angle = number - lastnumber;
            (ViewController.getInstance().viewHandler as DyxyViewHandler).dyxy.getZRotateAngle(angle);
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
.img_style{
    position: absolute;
    top: calc(50% + 40px);
    /*left: 17px;*/
    font-size: 16px;
    font-family: '宋体';
    color: #000000;
}
.background_scale{
    background: #FFFFFF;
    border: 0 solid rgba(0,0,0,0.10);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
    border-radius: 6px;
    margin-top: 180px;
}
.text_style{
    font-size: 16px;
    color: #4D4D4D;
    line-height: 16px;
    text-align: center;
    display: block;
    margin-bottom: 21px;
}
.slider_style {
    margin: auto;
    width: 100%;
}
.slider_style_mobile {
    margin-top: 20%;
}


</style>
