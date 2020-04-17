<template>
    <div class="aspectration bg_white root_div_container">
        <div class="control-panel_div_rt">
            <div>
                <div id="randomPoint" @click="randomPoint" style="width: 240px; height: 44px; margin-top: 52px" v-bind:class="{'button_disabled': rdp}">
                    <h_button  title="生成随机点" style="width: 240px;height: 44px;"></h_button>
                </div>
                <label for="checkbox-1" id="s1" class="control-block_div_border switch " style="margin-top:20px;" v-bind:class="{'event_disabled': gl2}"  v-on:mouseover="shou" v-on:mouseout="shubiao">
                    <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" v-model="axiom" >
                    <label for="checkbox-1">公理2</label>
                </label>
                <div  class="tuilun" v-show="axiom">
                    公理2：过不在一个平面上的三点，有<br/>且只有一个平面。
                </div>

                <label for="checkbox-2" id="s2" class="control-block_div_border switch " style="margin-top:12px;;" v-bind:class="{'event_disabled':tl1}"  v-on:mouseover="shou" v-on:mouseout="shubiao">
                    <input type="checkbox" name="checkbox-cats[]" id="checkbox-2" v-model="deduction1" >
                    <label for="checkbox-2">推论1</label>
                </label>
                <div  class="tuilun" v-show="deduction1">
                    推论1：经过一条直线和这个直线外的<br/>一点，有且只有一个平面。
                </div>
                <label for="checkbox-3" id="s3" class="control-block_div_border switch " style="margin-top:12px;" v-bind:class="{'event_disabled':tl2}"  v-on:mouseover="shou" v-on:mouseout="shubiao">
                    <input type="checkbox" name="checkbox-cats[]" id="checkbox-3" v-model="deduction2" >
                    <label for="checkbox-3">推论2</label>
                </label>
                <div class="tuilun" v-show="deduction2">
                    推论2：经过两条相交的直线，有且只<br/>
                    有一个平面。
                </div>
                <label for="checkbox-4" id="s4" class="control-block_div_border switch" style="margin-top:12px;" v-bind:class="{'event_disabled':tl3}"  v-on:mouseover="shou" v-on:mouseout="shubiao">
                    <input type="checkbox" name="checkbox-cats[]" id="checkbox-4" v-model="deduction3" >
                    <label for="checkbox-4">推论3</label>
                </label>
                <div  class="tuilun" v-show="deduction3">
                    推论3：经过两条平行直线，有且只有<br/>一个平面。
                </div>
            </div>

        </div>


        <div  class="control-panel_div_content">
            <span class="title_text">平面公理2</span>
            <!--<div>-->
                <!--<img src="./sub_static/gl2.png" v-show="axiom" style="width: 230px; position: absolute; left: 24px;top: 72px;">-->
                <!--<img src="./sub_static/tl1.png" v-show="deduction1" style="width: 230px; position: absolute; left: 24px;top: 72px;">-->
                <!--<img src="./sub_static/tl2.png" v-show="deduction2" style="width: 230px; position: absolute; left: 24px;top: 72px;">-->
                <!--<img src="./sub_static/tl3.png" v-show="deduction3" style="width: 230px; position: absolute; left: 24px;top: 72px;">-->
            <!--</div>-->
            <div id="3dContainer" class='view_div_content' style='background-color: white;' data-ratio='1:1'></div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import {ViewController} from '../../../../src/core/ViewController';

import h_button from '../../../../src/component/ui/button.vue';
import h_switch from '../../../../src/component/ui/switch.vue';
import {CentrumViewHandler} from './services/CentrumViewHandler';
/*let vueSlider = require('vue-slider-component');*/
import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
//Returned expression type   is not assignable to type Data
export default Vue.extend({
    components: {
        vueSlider,
        h_button,
        h_switch,
    },
    data() {
          return{
          axiom: false,
          deduction1: false,
          deduction2: false,
          deduction3: false,
          gl2       : false,
          tl1       : false,
          tl2       : false,
          tl3       : false,
          rdp       : false,

      };
    },
    created() {
        ViewController.getInstance(new CentrumViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted() {
        ViewController.getInstance().domReady();
    },
    methods: {
        shou(){
            document.getElementById('s1').style.cursor = 'pointer';
            document.getElementById('s2').style.cursor = 'pointer';
            document.getElementById('s3').style.cursor = 'pointer';
            document.getElementById('s4').style.cursor = 'pointer';
        },
        shubiao(){
            document.getElementById('s1').style.cursor = 'default';
            document.getElementById('s2').style.cursor = 'default';
            document.getElementById('s3').style.cursor = 'default';
            document.getElementById('s4').style.cursor = 'default';
        },
        randomPoint() {
            this.axiom = false;
            this.deduction1 = false;
            this.deduction2 = false;
            this.deduction3 = false;
            this.gl2 = false;
            this.tl1 = false;
            this.tl2 = false;
            this.tl3 = false;
            (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.createRandomPoint();
        }
    },
    watch: {
        axiom : function (axiom: boolean) {
                if (axiom) {
                    this.gl2 = true;
                    this.tl1 = true;
                    this.tl2 = true;
                    this.tl3 = true;
                    this.rdp = true;
                    this.deduction1 = false;
                    this.deduction2 = false;
                    this.deduction3 = false;
                    setTimeout(() => {
                        (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.changePlane();
                        (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.planeAnimation();
                        this.gl2 = true;
                        this.tl1 = false;
                        this.tl2 = false;
                        this.tl3 = false;
                        this.rdp = false;
                    }, 500);

                } else {
                    (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.disposePlane();
                }

        },
        deduction1: function (deduction1: boolean) {
            if (deduction1) {
                this.gl2 = true;
                this.tl1 = true;
                this.tl2 = true;
                this.tl3 = true;
                this.rdp = true;
                this.axiom = false;
                this.deduction2 = false;
                this.deduction3 = false;
                setTimeout(() => {
                    (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.deduction1Event(deduction1);
                    this.gl2 = false;
                    this.tl1 = true;
                    this.tl2 = false;
                    this.tl3 = false;
                    this.rdp = false;
                }, 500);

            } else {
                (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.deduction1Event(deduction1);
            }
        },
        deduction2: function (deduction2: boolean) {
           if (deduction2) {
               this.gl2 = true;
               this.tl1 = true;
               this.tl2 = true;
               this.tl3 = true;
               this.rdp = true;
               this.axiom = false;
               this.deduction1 = false;
               this.deduction3 = false;
               setTimeout(() => {
                   (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.deduction2Event(deduction2);
                   this.gl2 = false;
                   this.tl1 = false;
                   this.tl2 = true;
                   this.tl3 = false;
                   this.rdp = false;
               }, 500);

           } else {
               (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.deduction2Event(deduction2);
           }
        },
        deduction3: function (deduction3: boolean) {
            if (deduction3) {
                this.gl2 = true;
                this.tl1 = true;
                this.tl2 = true;
                this.tl3 = true;
                this.rdp = true;
                this.axiom = false;
                this.deduction1 = false;
                this.deduction2 = false;
                setTimeout(() => {
                    (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.deduction3Event(deduction3);
                    this.gl2 = false;
                    this.tl1 = false;
                    this.tl2 = false;
                    this.tl3 = true;
                    this.rdp = false;
                }, 500);
            } else {
                (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.deduction3Event(deduction3);
            }

        },
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

    .tuilun{
        margin-top: 10px;
        margin-left: -10px;
        transform: scale(0.9);
        font-size: 16px;
        font-family: '宋体';
        color: #000000;
        width: 280px;
        height: 40px;
    }

</style>
