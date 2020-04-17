<template>
    <div class="aspectration bg_white root_div_container" >

        <div class="control-panel_div_content fill_parent">
           <!-- <div class="nucleus_title">组织液、血浆、淋巴液的关系</div>-->
            <div id="3dContainer" class="view_div_content nucleus_backgroud">
            </div>
        </div>

        <div class="control-panel_div_floatLeft">

            <div class="ballStick-div-bgGroup">
                <div class="ballStick-div-bgBtn" @click="changeBgColor('white')">
                    <img class="white" src="../../static/images/white.png"/>
                </div>
                <div class="ballStick-div-bgBtn" @click="changeBgColor('black')">
                    <img class="black" src="../../static/images/black.png"/>
                </div>
            </div>

        </div>
        <div class="control-panel_div_floatRight">
            <div class="ballStick-div-group">
                <div class="ballStick-div-modelBtn" v-bind:class="{ active: type=='ball' }" @click="changeModel('ball')">球棍模型</div>
                <div class="ballStick-div-modelBtn" v-bind:class="{ active: type=='stick'}" @click="changeModel('stick')">比例模型</div>
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
import {FerricViewHandler} from "./service/FerricViewHandler";

//Returned expression type   is not assignable to type Data
export default Vue.extend({
    components:{
        h_switch,h_button
    },
    data(){
      return {
          type:'ball',
      }
    },
    created(){
        ViewController.getInstance(new FerricViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted(){
        ViewController.getInstance().viewHandler.domReady();
    },
    watch:{
        uniformMagnetic:(val)=>{


        },
        isPlay:function(isPlay){

        }
    },
    methods: {
        changeBgColor(color:string){
            document.getElementById("3dContainer").style.backgroundColor = color;
        },
        changeModel(type:string){
            this.type = type;
            console.log(type)
            if(type === 'ball'){
                (ViewController.getInstance().viewHandler as FerricViewHandler).ferric3DModel.ballModel.visible = true;
                (ViewController.getInstance().viewHandler as FerricViewHandler).ferric3DModel.stickModel.visible = false;
            }else{
                (ViewController.getInstance().viewHandler as FerricViewHandler).ferric3DModel.ballModel.visible = false;
                (ViewController.getInstance().viewHandler as FerricViewHandler).ferric3DModel.stickModel.visible = true;
            }
        },
        reset(){

        }
    }
})
</script>

<style scoped="scoped">


</style>
