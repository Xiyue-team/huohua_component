<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <div class="control-panel_div_floatRight "  >
          <!--  <img @click="showControlPanel" src="../../../static/image/expand@2x.png" style="width: 56px;height: 50px;position: absolute; left: -68px;"/>-->
            <div id="parity" @click="parity" v-bind:class="{'event_disabled':disabled}">
                <h_button  title="奇偶性" style="height: 44px;width: 100px;position: absolute;right: 20px;bottom: 288px"></h_button>
            </div>
            <h_switch id="axymptote" v-bind="switchOption" v-model="dash" style="position: absolute;bottom: 168px;right: 20px;color: #4D4D4D;"></h_switch>
            <h_switch id="symcenter" v-bind="switchOptionone" v-model="center" style="position: absolute;bottom: 48px;right: 20px;color: #4D4D4D;"></h_switch>
            <div class="button_border " style="display:inline-block;width:48px;height:40px;position: absolute;top:20px;right:24px;float: right;" id="reset" @click="resetEvent">
                <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="../../../../static/images/chongzhi.png" alt="" >
            </div>
        </div>
        <div class="control-panel_div_content fill_parent" style="background-color: #FFFFFF;color: #000000; font-size: 24px;">
            <div style="position: absolute;left: 24px;top: 24px;" id="title">正切函数的奇偶性、对称中心</div>
            <div class="view_div_content" style="background-color: #FFFFFF;position: relative; " data-ratio="1:1" >
                <div id="box"style="width: 100%;height: 100%" v-bind:class="{'board_disabled':true}"></div>
                <canvas id="canvas" style="width: 100%;height: 100%;position:absolute;left:0px;top:0px;" ></canvas>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import Vue from 'vue'
import "../../../../src/assets/css/core.css"
import "../../../../src/assets/css/layout.css"
import {ViewController} from "../../../../src/core/ViewController";
import {JsxViewHandler} from "./services/JsxViewHandler";
import {SliderConfig} from "../../../../src/config/SliderConfig";
import h_button from '../../../../src/component/ui/button.vue';
import h_switch from '../../../../src/component/ui/switch.vue';
import {DashAnimation} from "./services/DashAnimation"
let vueSlider = require('vue-slider-component');
//Returned expression type   is not assignable to type Data
export default Vue.extend({

    data(){
        return{
            disabled:false,
            switchOption:{
                id:"dashLine",
                title:"渐进线",
                direction:'top',
                value:false
            },
            switchOptionone:{
                id:"center",
                title:"对称中心",
                direction:'top',
                value:false

            },
            dash:false,
            center:false,
            sliderNum:1,
            sliderOption:{
                width:"80%",
                data:[
                  0,1,2,3,4
                ],
                piecewise: false,
                piecewiseLabel: true,
                piecewiseStyle: {
                    "backgroundColor": "#ccc",
                    "visibility": "visible",
                    "width": "12px",
                    "height": "12px"
                },
                piecewiseActiveStyle: {
                    "backgroundColor": "#3498db"
                }
            },
            tooltipStyle:{
                "backgroundColor": "#666",
                "borderColor": "#666"
            },

        }
    },
    components: {
        vueSlider,
        h_button,
        h_switch,
    },
    created(){
        ViewController.getInstance(new JsxViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted(){
        ViewController.getInstance().domReady();
    },
    watch:{
        dash:function (dash:boolean) {
            const animation = new DashAnimation();
           if(dash){
                animation.showCanvas();
                animation.dashActive(6);
            /*   (ViewController.getInstance().viewHandler as YdfcViewHandler).createAsymptote();
               (ViewController.getInstance().viewHandler as YdfcViewHandler).moveToPoint();*/
           }else{
                animation.control = true;
                animation.hideDash();

               /*(ViewController.getInstance().viewHandler as YdfcViewHandler).hideAsymptote1th();*/
            /*   setTimeout(()=>{
                   (ViewController.getInstance().viewHandler as YdfcViewHandler).hideAsymptote2th();
               },10)*/
           }
        },

       center:function (center:boolean) {
           if(center){
           /*    if((ViewController.getInstance().viewHandler as YdfcViewHandler).pointc == null){

               }else {
                   /!*(ViewController.getInstance().viewHandler as YdfcViewHandler).showPoint();*!/
               }*/
               (ViewController.getInstance().viewHandler as JsxViewHandler).createPoint();

           }else {
               (ViewController.getInstance().viewHandler as JsxViewHandler).removePoint();
           }
       }
    },
    methods: {
        showControlPanel(){
            (document.getElementsByClassName("mobile_right_control")[0] as HTMLImageElement).style.right = "0";
        },
        resetEvent(){

            (ViewController.getInstance().viewHandler as JsxViewHandler).reset();
        },
        async parity(){
            try{
                if((ViewController.getInstance().viewHandler as JsxViewHandler).parityo==null){

                    this.disabled=true;
                    (ViewController.getInstance().viewHandler as JsxViewHandler).ParityEvent();
                    (ViewController.getInstance().viewHandler as JsxViewHandler).showTanFunction();
                    const status = await (ViewController.getInstance().viewHandler as JsxViewHandler).rotatebind();
                    setTimeout( () => {
                        this.disabled=false;
                    },100)



                }else{
                    this.disabled=true;
                    (ViewController.getInstance().viewHandler as JsxViewHandler).hideTanfunction()
                    setTimeout(async ()=>{
                        (ViewController.getInstance().viewHandler as JsxViewHandler).showTanFunction();
                        const f1= await (ViewController.getInstance().viewHandler as JsxViewHandler).rotatebind();
                        setTimeout( () => {
                            this.disabled=false;
                        },100)

                    },100);




                }




            }
            catch (e){

            }

        }
    }
})
</script>

<style scoped="scoped">
.view_div_content{
    width:655px;
    height:425px;
}
.board_disabled{
    pointer-events: none;
    cursor: default;
}
</style>
<style>
    .text_style{
        font-style:  italic;
    }
</style>
