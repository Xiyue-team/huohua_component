<template>
    <div class="aspectration bg_white root_div_container">
        <div class="control-panel_div_rt">
            <div style="margin-top: 98px;width: 240px;height: 44px;">
                <button type='button' class='button' style="width: 240px;height: 44px;"  @click="productRangePointM">
                    生成随机点<span class="text_style"></span>
                </button>
            </div>

            <!--<div style="margin-top: 12px;width: 240px;height: 44px;">-->
                <!--<button type='button' class='button' style="width: 240px;height: 44px;"   @click="productRangePointN">-->
                    <!--生成随机点<span class="text_style">N</span>-->
                <!--</button>-->
            <!--</div>-->

            <label for="checkbox-1" id="s1" class="control-block_div_border switch " style="margin-top:20px;" v-on:mouseover="" v-on:mouseout=""    >
                <input type="checkbox" name="checkbox-cats[]" id="checkbox-1"  v-model="AuxiliarylineOne">
                <label for="checkbox-1">辅助线<span class="text_style">&nbsp;I</span></label>
            </label>

            <label for="checkbox-2" id="s2" class="control-block_div_border switch " style="margin-top:12px;" v-on:mouseover="" v-on:mouseout="" >
                <input type="checkbox" name="checkbox-cats[]" id="checkbox-2" v-model="AuxiliarylineTwo"  >
                <label for="checkbox-2" style=" ">辅助线<span class="text_style">&nbsp;II</span></label>
            </label>

            <label for="checkbox-3" id="s3" class="control-block_div_border switch " style="margin-top:12px;" v-on:mouseover="" v-on:mouseout="">
                <input type="checkbox" name="checkbox-cats[]" id="checkbox-3"  v-model="showImage" >
                <label for="checkbox-3">两点间的距离公式</label>
            </label>

            <div style="width: 534px;height: 44px;margin-top: 20px;" v-show="showImage">
                <img src="./sub_static/gongshidingli.png" style="width: 238px;"/>
            </div>
        </div>
        <div  class="control-panel_div_content">
            <span id="title" class="title_text">空间中两点间距离</span>
            <div id="3dContainer" class='view_div_content' style='background-color: white;' data-ratio='1:1'></div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import {BrowserUtil} from '../../../../src/util/BrowserUtil';
import {Gltf3DModel} from '../../../../src/three/Gltf3DModel';
import {ViewController} from '../../../../src/core/ViewController';

import h_button from '../../../../src/component/ui/button.vue';
import h_switch from '../../../../src/component/ui/switch.vue';
import {TwoPointDistanceViewHandler} from './service/TwoPointDistanceViewHandler';

import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
export default Vue.extend({
    components: {
        vueSlider,
        h_button,
        h_switch,
    },
    data() {
          return{
              AuxiliarylineOne: false,
              AuxiliarylineTwo: false,
              showImage: false,
             };
    },
    created() {
        ViewController.getInstance(new TwoPointDistanceViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted() {
        ViewController.getInstance().domReady();
    },
    methods: {
//        shou(){
//            document.getElementById('s1').style.cursor = 'pointer';
//        },
//        shubiao(){
//            document.getElementById('s1').style.cursor = 'default';
//        },
//        shoutwo () {
//            document.getElementById('s2').style.cursor = 'pointer';
//        },
//        shubiaotwo () {
//            document.getElementById('s2').style.cursor = 'default';
//        },
//        shouthree () {
//            document.getElementById('s3').style.cursor = 'pointer';
//        },
//        shubiaothree () {
//            document.getElementById('s3').style.cursor = 'default';
//        },
        productRangePointM() {  //随机产生M点
            (ViewController.getInstance().viewHandler as TwoPointDistanceViewHandler).mountaion.productRandomPointM();
            (ViewController.getInstance().viewHandler as TwoPointDistanceViewHandler).mountaion.productRandomPointN();
        },
//        productRangePointN() { //随机产生N点
//            (ViewController.getInstance().viewHandler as TwoPointDistanceViewHandler).mountaion.productRandomPointN();
//        },
    }
    ,
    watch: {
        showImage: function (enableAxis: any) {  //显示公式图片
            this.showImage = enableAxis;
            (ViewController.getInstance().viewHandler as TwoPointDistanceViewHandler).showImage(enableAxis);
        },
        AuxiliarylineOne: function (enableAxis: any) {  //显示或影藏辅助线一
            this.AuxiliarylineOne = enableAxis;
            (ViewController.getInstance().viewHandler as TwoPointDistanceViewHandler).showFuZhuXian1(enableAxis);
        }
        ,
        AuxiliarylineTwo: function (enableAxis: any) { //显示或影藏辅助线二
            this.AuxiliarylineTwo = enableAxis;
            (ViewController.getInstance().viewHandler as TwoPointDistanceViewHandler).showFuZhuXian2(enableAxis);
        }

    }
});
</script>

<style scoped="scoped">
body{
    overflow: hidden !important;
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
    top: 24px;
    left: 24px;
}
.button_disabled{
    pointer-events: none;
    cursor: default;
}


    .text_style{
        font-family: "Times New Roman";
        font-style: italic;
        font-size: 16px;
    }

    .control-block_div_border:hover{
        cursor: pointer;
    }
</style>
