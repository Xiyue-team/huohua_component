<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <div class="control-panel_div_rt" style="height: 100%">
            <div style="display: flex;height: 100%;">
                <div style="margin: auto;">
                    <label for="checkbox-1" id="shubiao" class="control-block_div_border switch" style="width: 220px;"  v-on:mouseover="shou" v-on:mouseout="shubiao">
                        <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" v-model="axiom" checked>
                        <label for="checkbox-1">平面公理3</label>
                    </label>
                </div>
                <div style="position: absolute;top: calc(50% + 40px);" class="img_style" v-show="axiom">
                    如果两个不重合的平面有一个公共<br/>点，那么他们有且只有一条过该点<br/>的公共直线。
                </div>
            </div>
        </div>
        <div class="control-panel_div_content" style="background-color: #FFFFFF;color: #000000; font-size: 24px;">
            <span class="title_text">平面公理3</span>
            <div id="3dContainer" class="view_div_content">

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import "../../../../src/assets/css/core.css"
import "../../../../src/assets/css/layout.css"
import {ViewController} from "../../../../src/core/ViewController";
import h_button from '../../../../src/component/ui/button.vue';
import h_switch from '../../../../src/component/ui/switch.vue';
import {CentrumViewHandler} from "./services/CentrumViewHandler";
/*let vueSlider = require('vue-slider-component');*/
import vueSlider from "../../../../src/component/ui/vue2-slider.vue";
//Returned expression type   is not assignable to type Data
export default Vue.extend({
    components: {
        vueSlider,
        h_button,
        h_switch,
    },
    data(){
          return{
          axiom:false,
      }
    },
    created(){
        ViewController.getInstance(new CentrumViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted(){
        ViewController.getInstance().domReady();
    },
    methods: {
        shou(){
            document.getElementById('shubiao').style.cursor = 'pointer';
        },
        shubiao(){
            document.getElementById('shubiao').style.cursor = 'default';
        },
    },
    watch:{
        axiom:function (axiom:boolean) {
            if(axiom){
                (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.control = false;
                (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.axiom(axiom);
            } else {
                (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.control = true;
                (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.initplane();
            }

        },

    }
})
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
    font-family: '宋体';
    color: #000000;
    font-size: 16px;
}


</style>
