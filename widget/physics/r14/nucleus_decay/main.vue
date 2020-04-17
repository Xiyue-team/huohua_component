<template>
    <div class="aspectration bg_white root_div_container" >
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="nucleus_title">原子核的衰变</div>
                <div id="3dContainer" class="view_div_content nucleus_backgroud"></div>

                <div id="rightToolBar"  class="right_toolBar_layer">
                    <div style="width: 120px; height: 50px; position: absolute;top:12px">
                        <div @click="reset" style="display:block;width:56px;height:50px;float: right;">
                            <img style="width: 56px; height: 50px;" src="./sub_static/reset@2x.png" alt="">
                        </div>

                        <div @click="isFold = !isFold"style="display:block;width:56px;height:50px;float: right;margin-right: 8px" v-show="isMobile">
                            <img v-show="!isFold"  src="./sub_static/fold@2x.png" alt=""  class="foldlayer_btn">
                            <img v-show="isFold"   src="./sub_static/unfold@2x.png" alt="" class="foldlayer_btn">
                        </div>

                    </div>

                    <div v-show="isAppear" style="width: 120px;position: absolute; top: 74px;z-index: 9;">
                        <h_button class="block status_btn" v-bind:class="{ active: alpha }" title="α衰变" style="margin-left: 10px;"v-on:click.native="showAlpha"></h_button>
                        <h_button class="block status_btn" v-bind:class="{ active: beta }" title="β衰变" style="margin-top: 12px;margin-left: 10px;" v-on:click.native="showBeta"></h_button>

                        <h_switch v-bind="switchOption" v-model="uniformMagnetic" style="margin-top: 12px;margin-left:10px"></h_switch>

                        <div  id="playBtn" class="anim_play_btn" @click="isPlay = !isPlay" v-show="isShow">
                            <img v-show="!isPlay"  src="../../../../static/images/play_icon.png" alt="">
                            <img v-show="isPlay"   src="../../../../static/images/pause_icon.png" alt="">
                        </div>
                    </div>
                </div>
                <div id="nucleus_img" class="nucleus_img_layer">
                    <img v-show="alpha" src="./sub_static/aLegend.png" style="position:absolute; width: 120px;height: 145px"/>
                    <img v-show="beta" src="./sub_static/bLegend.png" style="position:absolute; width: 120px;height: 145px"/>
                </div>
            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import './sub_static/css/nucleus_layer.css';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/ui.css';
import '../../../../src/assets/css/layout.css';
import h_switch from '../../../../src/component/ui/switch.vue';
import h_button from '../../../../src/component/ui/button.vue';

import {ViewController} from '../../../../src/core/ViewController';
import {NucleusViewHandler} from './service/NucleusViewHandler';
import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout';
// const vConsole = require('vconsole');

//Returned expression type   is not assignable to type Data
export default Vue.extend({
    components:{
        h_switch,h_button,
        fullScreensLayout
    },
    data(){
      return {
        isMobile: true,
        isShow: false,
        isFold: false,
        isAppear: true,
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
        // new vConsole;
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
          if(this.isShow) {
            if(this.alpha || this.beta){
              if(isPlay){
                (ViewController.getInstance().viewHandler as NucleusViewHandler).playAnimation();
              }else{
                (ViewController.getInstance().viewHandler as NucleusViewHandler).pauseAnimation();
              }
            }
          }
        },
        isFold:function(isFold){
          if(isFold) {
            this.isAppear = true;
          }else {
            this.isAppear = false;
          }
        }
    },
    methods: {
        showAlpha(){
            //显示alpha衰变
            if(this.isShow === false){
              this.isShow = true;
            }
            this.isPlay = false;
            (ViewController.getInstance().viewHandler as NucleusViewHandler).nucleusModel.showAlphaModel();
            this.alpha = true;
            this.beta = false;
        },
        showBeta(){
            //显示beta衰变
            if(this.isShow === false){
              this.isShow = true;
            }
            this.isPlay = false;
            (ViewController.getInstance().viewHandler as NucleusViewHandler).nucleusModel.showBetaModel();
            this.alpha = false;
            this.beta = true;
        },
        reset(){
            this.isPlay = false;
            this.alpha = false;
            this.beta = false;
            this.uniformMagnetic = false;
            if(this.isMobile){
                this.isFold = false;
                this.isAppear = false;
            }
            (ViewController.getInstance().viewHandler as NucleusViewHandler).reset();
        }
    }
})
</script>

<style>
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
    .control-panel_div_floatRight {
        display: none;
    }
    #expandBtn{
        display: none;
    }

</style>
