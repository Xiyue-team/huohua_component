<template>
    <div class="aspectration bg_white root_div_container" >
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="nucleus_title">粒子在磁场中做螺旋运动</div>
                <div id="3dContainer" class="view_div_content nucleus_backgroud">
                <img src="./sub_static/12.png" style="width: 100%;height: 100%;position: absolute"/>
                </div>

                <div id="rightToolBar"  class="right_toolBar_layer">
                    <div style="width: 120px; height: 50px; position: absolute;top:12px" >
                        <div style="display:block;width:56px;height:50px;float: right;">
                            <img style="width: 56px; height: 50px;" src="./sub_static/reset@2x.png" alt="">
                        </div>

                    </div>


                </div>
                <div style=" position: absolute;border-radius: 1000px;width: 6%;height: 0%;padding-bottom: 6%;bottom: 5%;right: 3.8%; z-index: 10" @click="clicka()">
                    <div  style="display:block;width:100%;height:auto;float: right;" >
                        <img style="width: 100%; height: auto;" :src='playSrc' alt="">
                    </div>
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
import  playSrc from './sub_static/play@2x.png';
import  pauseSrc from './sub_static/pause@2x.png';

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
          mack:0,
        alpha:false,
          pp:playSrc,
        playSrc:playSrc,
        pauseSrc:pauseSrc,
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

    },
    methods: {
        reset1(){
            this.playSrc = playSrc;
            this.isPlay = false;
            (ViewController.getInstance().viewHandler as NucleusViewHandler).reset();


        },
        clicka(){
        if(!this.isPlay){


            if((ViewController.getInstance().viewHandler as NucleusViewHandler).nucleusModel.mark == 0){

                this.playSrc = pauseSrc;
                (ViewController.getInstance().viewHandler as NucleusViewHandler).nucleusModel.markZ = 1;
                (ViewController.getInstance().viewHandler as NucleusViewHandler).nucleusModel.mark = 1;
                (ViewController.getInstance().viewHandler as NucleusViewHandler).nucleusModel.testModel.children[1].visible = true;
                (ViewController.getInstance().viewHandler as NucleusViewHandler).nucleusModel.animation1.playAnimation(0);


                (ViewController.getInstance().viewHandler as NucleusViewHandler).nucleusModel.play();


            }else{
                this.playSrc = playSrc;

                (ViewController.getInstance().viewHandler as NucleusViewHandler).nucleusModel.pause();
                (ViewController.getInstance().viewHandler as NucleusViewHandler).nucleusModel.animation1.pauseAnimation(0);
                (ViewController.getInstance().viewHandler as NucleusViewHandler).nucleusModel.mark = 0;

            }
        }
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
        z-index: 20;
    }
    .nucleus_backgroud{
        /*background-image: radial-gradient(circle at center,#490188,#04163e)*/
        background-image: url('./sub_static/12.png');

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
    canvas {
        z-index: 2;
        position: absolute;
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
