<template>
    <div class="aspectration bg_white root_div_container">
        <div class="control-panel_div_rt">

            <div class="button_border " style="display:inline-block; width:48px; height:40px; position: absolute; top:20px; right:24px;" id="reset" @click="reset" >
                <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="../../../../static/images/chongzhi.png" alt=""   >
            </div>
            <div style="margin-top: 98px;width: 240px;height: 44px;">
                <h_button title="生成随机点" style="width: 240px;height: 44px;" @click.native="productRangePoint"></h_button>
            </div>

            <label for="checkbox-1" id="s1" class="control-block_div_border switch " style="margin-top:12px;" v-on:mouseover="shou" v-on:mouseout="shubiao"  >
                <input type="checkbox" name="checkbox-cats[]" id="checkbox-1"  v-model="originPonit">
                <label for="checkbox-1">坐标原点</label>
            </label>

            <label for="checkbox-2" id="s2" class="control-block_div_border switch " style="margin-top:12px;" v-on:mouseover="shoutwo" v-on:mouseout="shubiaotwo" >
                <input type="checkbox" name="checkbox-cats[]" id="checkbox-2" v-model="axisColor"  >
                <label for="checkbox-2">坐标轴</label>
            </label>

            <label for="checkbox-3" id="s3" class="control-block_div_border switch " style="margin-top:12px;" v-on:mouseover="shouthree" v-on:mouseout="shubiaothree">
                <input type="checkbox" name="checkbox-cats[]" id="checkbox-3"  v-model="xoyPlane" >
                <label for="checkbox-3"><span class= "text_style">xoy</span>平面</label>
            </label>

            <label for="checkbox-4" id="s4" class="control-block_div_border switch" style="margin-top:12px;" v-on:mouseover="shoufour" v-on:mouseout="shubiaofour" >
                <input type="checkbox" name="checkbox-cats[]" id="checkbox-4" v-model="yozPlane"  >
                <label for="checkbox-4"><span class="text_style">yoz</span>平面</label>
            </label>

            <label for="checkbox-5" id="s5" class="control-block_div_border switch" style="margin-top:12px;" v-on:mouseover="shoufive" v-on:mouseout="shubiaofive" >
                <input type="checkbox" name="checkbox-cats[]" id="checkbox-5" v-model="zoxPlane">
                <label for="checkbox-5"><span class="text_style">zox</span>平面</label>
            </label>

            <label for="checkbox-6" id="s6" class="control-block_div_border switch" style="margin-top:12px;"   v-on:mouseover="shousix" v-on:mouseout="shubiaosix">
                <input type="checkbox" name="checkbox-cats[]" id="checkbox-6" v-model="fuzhuXian"  >
                <label for="checkbox-6">坐标辅助线</label>
            </label>

        </div>
        <div  class="control-panel_div_content">
            <span id="title" class="title_text">空间直角坐标系</span>
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
import {CartesianXiViewHandler} from './services/CartesianXiViewHandler';

import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
export default Vue.extend({
    components: {
        vueSlider,
        h_button,
        h_switch,
    },
    data() {
          return{
              originPonit: false,
              zoxPlane: false,
              xoyPlane: false,
              yozPlane: false,
              axisColor: false,
              fuzhuXian: false,
             };
    },
    created() {
        ViewController.getInstance(new CartesianXiViewHandler(this));
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
        shoutwo(){
            document.getElementById('s2').style.cursor = 'pointer';
        },
        shubiaotwo(){
            document.getElementById('s2').style.cursor = 'default';
        },
        shouthree(){
            document.getElementById('s3').style.cursor = 'pointer';
        },
        shubiaothree(){
            document.getElementById('s3').style.cursor = 'default';
        },
        shoufour(){
            document.getElementById('s4').style.cursor = 'pointer';
        },
        shubiaofour(){
            document.getElementById('s4').style.cursor = 'default';
        },
        shoufive(){
            document.getElementById('s5').style.cursor = 'pointer';
        },
        shubiaofive(){
            document.getElementById('s5').style.cursor = 'default';
        },
        shousix(){
            document.getElementById('s6').style.cursor = 'pointer';
        },
        shubiaosix(){
            document.getElementById('s6').style.cursor = 'default';
        },
        productRangePoint () { //生成随机点P
            (ViewController.getInstance().viewHandler as CartesianXiViewHandler).mountaion.productRandomPoint();
        },

        reset () {  //重置页面
            (ViewController.getInstance().viewHandler as CartesianXiViewHandler).reset();
        }
    }
    ,
    watch: {
        originPonit:function(enableAxis: any){  //显示或影藏原点
            this.originPonit = enableAxis;
            (ViewController.getInstance().viewHandler as CartesianXiViewHandler).show(enableAxis);
        },
        xoyPlane:function (enableAxis: any) { //显示或影藏xoy平面
            this.xoyPlane = enableAxis;
            (ViewController.getInstance().viewHandler as CartesianXiViewHandler).showPlane(enableAxis, 1);
        }
        ,
        yozPlane:function (enableAxis: any) { //显示或影藏yoz平面
            this.yozPlane = enableAxis;
            (ViewController.getInstance().viewHandler as CartesianXiViewHandler).showPlane(enableAxis, 2);
        },
        zoxPlane:function (enableAxis: any) { //显示或影藏zox平面
            this.zoxPlane = enableAxis;
            (ViewController.getInstance().viewHandler as CartesianXiViewHandler).showPlane(enableAxis , 3);
        },
        axisColor:function (enableAxis: any) {  //显示或影藏坐标轴的颜色
            this.axisColor = enableAxis;
            (ViewController.getInstance().viewHandler as CartesianXiViewHandler).showAxis(enableAxis);
        },
        fuzhuXian:function (enableAxis: any) { //显示或影藏辅助线
            this.fuzhuXian = enableAxis;
            (ViewController.getInstance().viewHandler as CartesianXiViewHandler).showFuZhuXian(enableAxis);
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
.button_disabled{
    pointer-events: none;
    cursor: default;
}


.text_style {
    font-style: italic;
    font-size: 16px;
    font-family: "Times New Roman";
}
.view_div_content{
    /*width: 356px;*/
    /*height: 300px;*/
}
</style>
