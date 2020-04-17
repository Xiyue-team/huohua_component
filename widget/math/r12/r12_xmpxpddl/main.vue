<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <div class="control-panel_div_rt">
            <div style="display: flex;height: 100%;margin-top: -40px;">
                <div style=" margin: auto; ">
                    <label for="checkbox-1" id="s1" class="control-block_div_border switch enableAnim" v-on:mouseover="shou" v-on:mouseout="shubiao" >
                        <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" value="1" v-model="enableAnim">
                        <label for="checkbox-1" class="checkboxText">线面平行判定定理</label>
                    </label>
                </div>
                <div style="position: absolute;top: calc(50% + 40px);left: 22px" class="textTop" v-show="gongshi">
                    平面外一条直线与此平面内一条直<br/>线平行，则该直线与此平面平行。
                    <!--<span id="title" class="textTop" v-show="gongshi">平面外一条直线与此平面内一条直</span>-->
                    <!--<span class="textBottom" v-show="gongshi">线平行，则该直线与此平面平行。</span>-->
                </div>
            </div>

        </div>

        <span class="title">线面平行判定定理</span>
        <div id="box" class="control-panel_div_content">
            <div  id="3dContainer" class="view_div_content"></div>
        </div>
    </div>


</template>

<script lang="ts">
import Vue from 'vue'
import "../../../../src/assets/css/core.css"
import "../../../../src/assets/css/layout.css"
import {ViewController} from "../../../../src/core/ViewController";
import {LineFaceViewHandler} from "./services/LineFaceViewHandler";
import h_button from '../../../../src/component/ui/button.vue';
import vueSlider from "../../../../src/component/ui/vue2-slider.vue";
import { BrowserUtil } from "../../../../src/util/BrowserUtil";
import { Stage } from "konva";

export default Vue.extend({
    components: {
        h_button,vueSlider
    },
    data(){
      return{
          gongshi: false,
          enableAnim: false
      }
    },
    created(){
        ViewController.getInstance(new LineFaceViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted(){
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
    watch:{
        enableAnim:function(enableAxis: any){
            this.gongshi = enableAxis;
            (ViewController.getInstance().viewHandler as any).lineFace3dModel.open(enableAxis);
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

    .enableAnim{
        width: 215px;
    }

    .checkboxText{
        font-size: 14px;
        color: #000000;
    }


    .textTop{
        font-size: 16px;
        font-family: '宋体';
        color: #000000;
    }

    .textBottom{
        font-size: 16px;
        font-family: '宋体';
        color: #000000;
    }

</style>
