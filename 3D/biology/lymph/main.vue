<template>
    <div class="aspectration bg_white root_div_container" >

        <div class="control-panel_div_content fill_parent">
           <!-- <div class="nucleus_title">组织液、血浆、淋巴液的关系</div>-->
            <div id="3dContainer" class="view_div_content nucleus_backgroud">
            </div>
        </div>

        <div class="control-panel_div_floatRight">

        </div>

    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import "../../src/assets/css/core.css"
import "../../src/assets/css/ui.css"
import "../../src/assets/css/layout.css"
import h_switch from '../../src/component/ui/switch.vue';
import h_button from '../../src/component/ui/button.vue';

import {ViewController} from "../../src/core/ViewController";
import {LymphViewHandler} from "./service/LymphViewHandler";

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
        ViewController.getInstance(new LymphViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted(){
        ViewController.getInstance().domReady();
    },
    watch:{
        uniformMagnetic:(val)=>{
            // 开启/关闭 匀强磁场

        },
        isPlay:function(isPlay){

        }
    },
    methods: {
        showAlpha(){
        },
        showBeta(){
        },
        reset(){
           // (ViewController.getInstance().viewHandler as NucleusViewHandler).reset();
            //(ViewController.getInstance().viewHandler as NucleusViewHandler).reset();
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
        background-color: #FFFFFF;
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
