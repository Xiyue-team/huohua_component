<template>
    <leftAndRightLayout>
        <template slot="viewBox" slot-scope="viewBox">
            <div class="title_text">面面平行性质定理</div>
            <div id="3dContainer"></div>
        </template>

        <template slot="controlPanel" slot-scope="controlPanel">
            <div id="controlPanel" style="display: flex;justify-content: center; align-items: center;width: 100%;height: 100%">
                <div style="width: 100%;">
                    <label for="checkbox-1" id="s1" class="control-block_div_border switch " style="margin-top: 50px"  v-on:mouseover="shou" v-on:mouseout="shubiao" v-bind:class="{'silder_disabled':disableCtrl}">
                        <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" v-model="axiom" >
                        <label for="checkbox-1">面面平行性质定理</label>
                    </label>

                    <div v-show="axiom" style="margin-top: 20px;" class="text_style">
                        如果两个平行平面同时和第三个平面相交，那么它们的交线平行。
                    </div>

                    <div class="control-block_div_border edge_height_slider background_scale" style="position: relative" v-if="axiom" v-bind:class="{'silder_disabled':disableCtrl}">
                        <span class="slider_text">转动平面</span>
                        <span class="slider_text1">β</span>
                        <vue-slider ref="slider1th" v-model="slidernumber" v-bind="sliderOption1" style="position: absolute;top:40px;">
                            <template slot="tooltip" scope="tooltip">
                                <div v-if="false" class="custom-tooltip">
                                </div>
                            </template>
                        </vue-slider>
                    </div>
                </div>
            </div>
        </template>
    </leftAndRightLayout>
</template>

<script lang="ts">
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import {ViewController} from '../../../../src/core/ViewController';
import h_button from '../../../../src/component/ui/button.vue';
import h_switch from '../../../../src/component/ui/switch.vue';
import {MmpxViewHandler} from './services/MmpxViewHandler';
import vueSlider from "../../../../src/component/ui/vue2-slider.vue";
import leftAndRightLayout from '../../../../src/component/layout/leftAndRight_layout.vue';

//Returned expression type   is not assignable to type Data
export default Vue.extend({
    components: {
        vueSlider,
        h_button,
        h_switch,
        leftAndRightLayout
    },
    data() {
          return{
              ctrl: false,
              slidernumber: 0,
              axiom: false,
              disableCtrl: false,
              resetDisable: false,
              sliderOption1: {
                  width:"100%",
                  min: 0,
                  max: 90,
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
        ViewController.getInstance(new MmpxViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
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
        axiom : function (axiom: boolean) {
            if (axiom) {
                this.ctrl = true;
                this.disableCtrl = true ;
                this.resetDisable = true;
                (ViewController.getInstance().viewHandler as MmpxViewHandler).Mmpx.playAnimation();
                setTimeout(() => {
                    this.resetDisable = false ;
                    this.disableCtrl = false ;
                    this.ctrl = false;
                }, 2400)
            } else {
                this.disableCtrl = false;
                this.slidernumber = 0;
                (ViewController.getInstance().viewHandler as MmpxViewHandler).Mmpx.resetAnimation();
            }

        },
        slidernumber : function (value: number, lastValue: number) {
            const angle = value - lastValue;
            (ViewController.getInstance().viewHandler as MmpxViewHandler).Mmpx.rotatePlane(angle);
            (ViewController.getInstance().viewHandler as MmpxViewHandler).Mmpx.setLinePosition(value);
        },
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
    height: 76px;
    margin-top: 12px;
    padding: 0;
}
.slider_text{
    font-size: 16px;
    color: #4D4D4D;
    line-height: 16px;
    position: absolute;
    top: 13px;
    left: 83px;

}
.slider_text1{
    font-size: 16px;
    color: #4D4D4D;
    line-height: 16px;
    position: absolute;
    top: 13px;
    left: 150px;
    font-style: italic;
    font-family: "Times New Roman";
}
.silder_disabled{
    pointer-events: none;
    cursor: default;
}
.text_style{
    font-size: 16px;
    color: #000000;
    font-family: '宋体';
}


</style>
