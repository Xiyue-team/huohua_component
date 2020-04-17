<template>

    <div class="aspectration bg_white root_div_container" >

        <div class="control-panel_div_floatRight">

            <div class="button_border " style="display:inline-block;width:48px;height:40px;float: right;" id="reset" @click="resetEvent">
                <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="../../../../static/images/chongzhi.png" alt="">
            </div>
            <br />

            <label class="control-block_div_border radio_positive" style="margin-top:10px;">
                <input class="radio-default" type="radio" id="test1" name="radio-group" value="1" v-model="angleDirection"  >
                <label for="test1">正角</label>
            </label>

            <label class="control-block_div_border radio_negative" style="margin-top:10px;">
                <input class="radio-default" type="radio" id="test2" name="radio-group" value="-1" v-model="angleDirection"  >
                <label for="test2">负角</label>
            </label >

            <label class="control-block_div_border radio_zero" style="margin-top:10px;">
                <input class="radio-default" type="radio" id="test3" name="radio-group" value="0" v-model="angleDirection"  >
                <label for="test3">零度角</label>
            </label >

            <br />

            <h_switch class="axis" v-bind="switchOption" v-model="enableAxis"></h_switch>

        </div>

        <div class="control-panel_div_content fill_parent" >
            <div>
                <h3 class="title">正负角</h3>
                <span id="statusBar" class="statusBar">正角</span>
            </div>
            <div id="box" class="view_div_content" data-ratio="1:1" >
                主内容显示区域
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import "../../../../src/assets/css/core.css"
import "../../../../src/assets/css/layout.css"
import h_button from '../../../../src/component/ui/button.vue';
import h_switch from '../../../../src/component/ui/switch.vue';
import {ViewController} from "../../../../src/core/ViewController";
import {JsxViewHandler} from "./services/JsxViewHandler";

//Returned expression type   is not assignable to type Data
export default Vue.extend({
    data(){
      return {
          enableAxis:false,
          angleDirection:"",
          switchOption:{
              title:"直角坐标系",
              id:"axis",
              direction:"top",
              value:false,
              width:125,
              height:125
          }
      }
    },
    components: {
        h_button,h_switch
    },
    created(){
        ViewController.getInstance(new JsxViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted(){
        ViewController.getInstance().domReady();
    },
    watch:{
        enableAxis:function(newVal){
            (ViewController.getInstance().viewHandler as JsxViewHandler).show(newVal);
        },

        angleDirection:function(newVal,lastVal){
            if (newVal == 1){
                (ViewController.getInstance().viewHandler as JsxViewHandler).positive();
            } else if (newVal == -1){
                (ViewController.getInstance().viewHandler as JsxViewHandler).negative();
            } else if (newVal == 0){
                (ViewController.getInstance().viewHandler as JsxViewHandler).zeroAngle();
            }
        }

    },
    methods: {
        resetEvent(){
            this.enableAxis = false;
            this.angleDirection = null;
            this.switchOption.value = false;
            (ViewController.getInstance().viewHandler as JsxViewHandler).reset();
        }
    }
})
</script>

<style scoped="scoped">
    .title{
        font-size: 24px;
        color: #000;
        position: absolute;
        left: 24px;
        top: 24px;
    }

    .statusBar{
        font-size: 20px;
        color: #3494E9;
        position: absolute;
        left: 24px;
        top: 78px;
    }

    .button_border{
        width:48px;
        height:40px;
        position: absolute;
        right: 24px;
        top: 20px;
    }

    .radio_positive{
        width:100px;
        height:20px;
        position: absolute;
        right: 24px;
        top: 276px;
    }

    .radio_negative{
        width:100px;
        height:20px;
        position: absolute;
        right: 24px;
        top: 332px;
        font-size: 14px;
    }

    .radio_zero{
        width:100px;
        height:20px;
        position: absolute;
        right: 24px;
        top: 388px;
        font-size: 14px;
    }

    .axis{
        position: absolute;
        right: 24px;
        top: 452px;
        font-size: 14px;
    }

    .view_div_content{
        width: 600px;
        height: 600px;
        position: absolute;
        top: 30px;
    }
</style>
