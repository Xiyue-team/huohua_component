<template>
    <div class="aspectration bg_white root_div_container" >

        <div class="control-panel_div_content fill_parent">
            <div class="nucleus_title">原子核的衰变</div>

            <div id="3dContainer" class="view_div_content nucleus_backgroud">
            </div>
        </div>

        <div class="control-panel_div_floatRight">
            <div @click="reset" class="button_border " style="display:inline-block;width:48px;height:40px; ">
                <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="../../static/images/chongzhi.png" alt="">
            </div>

            <h_button class="block status_btn" v-bind:class="{ active: alpha }" title="α衰变" style="margin-top: 44px;" v-on:click.native="showAlpha"></h_button>
            <h_button class="block status_btn" v-bind:class="{ active: beta }" title="β衰变" style="margin-top: 12px;" v-on:click.native="showBeta"></h_button>

            <h_switch v-bind="switchOption" v-model="uniformMagnetic" style="margin-top: 20px;"></h_switch>

            <img v-show="alpha" src="./sub_static/aLegend.png" class="aLegend_img"/>
            <img v-show="beta" src="./sub_static/bLegend.png" class="aLegend_img"/>
            <div  id="playBtn" class="play_btn" @click="isPlay = !isPlay">
                <img v-show="!isPlay"  src="../../static/images/play_icon.png" alt="">
                <img v-show="isPlay"   src="../../static/images/pause_icon.png" alt="">
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import "../../src/assets/css/core.css"
import "../../src/assets/css/ui.css"
import "../../src/assets/css/layout.css"
import h_switch from '../../src/component/switch.vue';
import h_button from '../../src/component/ui/button.vue';

import {ViewController} from "../../src/core/ViewController";
import {NucleusViewHandler} from "./service/NucleusViewHandler";
const vConsole = require('vconsole');

//Returned expression type   is not assignable to type Data
export default Vue.extend({
    components:{
        h_switch,h_button
    },
    data(){
      return {
          isPlay:false,
          alpha:false,
          beta:false,
          uniformMagnetic:false,
          switchOption:{
              id:"umfSwitch",
              title:"匀强磁场",
              direction:"top",
              width:100,
              height:100
          }
      }
    },
    created(){
        new vConsole;
        ViewController.getInstance(new NucleusViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted(){
        ViewController.getInstance().domReady();
    },
    watch:{
        uniformMagnetic:(val)=>{
            // 开启/关闭 匀强磁场
            if(val == true){
                (ViewController.getInstance().viewHandler as NucleusViewHandler).nucleusModel.enableUniformMagnetic();
            }else{
                (ViewController.getInstance().viewHandler as NucleusViewHandler).nucleusModel.disableUniformMagnetic();
            }

        },
        isPlay:function(isPlay){

            if(this.alpha || this.beta){
                if(isPlay){
                    (ViewController.getInstance().viewHandler as NucleusViewHandler).playAnimation();
                }else{
                    (ViewController.getInstance().viewHandler as NucleusViewHandler).pauseAnimation();
                }
            }
        }
    },
    methods: {
        showAlpha(){
            //显示alpha衰变
            this.isPlay = false;
            (ViewController.getInstance().viewHandler as NucleusViewHandler).nucleusModel.showAlphaModel();

            this.alpha = true;
            this.beta = false;
        },
        showBeta(){
            //显示beta衰变
            this.isPlay = false;
            (ViewController.getInstance().viewHandler as NucleusViewHandler).nucleusModel.showBetaModel();
            this.alpha = false;
            this.beta = true;
        },
        reset(){
           // (ViewController.getInstance().viewHandler as NucleusViewHandler).reset();
            this.isPlay = false;
            this.alpha = false;
            this.beta = false;
            this.uniformMagnetic = false;
            (ViewController.getInstance().viewHandler as NucleusViewHandler).reset();
        }
    }
})
</script>

<style scoped="scoped">
    .nucleus_title{
        position: absolute;
        left: 24px;
        top: 24px;
        font-size: 24px;
        color: #FFFFFF;
        line-height: 24px;
    }
    .nucleus_backgroud{
        /*background-image: radial-gradient(circle at center,#490188,#04163e)*/
        background-color: #210E5D;
    }

    .play_btn{
        display: inline-block;
        width: 60px;
        height: 60px;
        background: #FFFFFF;
        border-radius:50%;
        box-sizing: border-box;
        position: absolute;
        bottom: 64px;
        right: -3px;
    }

    .play_btn img{
        width: 20px;
        height: 20px;
        margin-top: 20px;
        margin-left: 20px;
    }

    .status_btn{
        width: 100px;
        height: 44px;
    }
    .aLegend_img{
        width: 120px;
        position: absolute;
        right: 93px;
        bottom: 64px;
    }

</style>
