<template>
  <div id="3dContainer" class="full_wh root_div_container">


      <div class="control-block_div_border switch slider_switch" style="margin-top:10px;">
          <input type="checkbox"  id="checkbox-1" v-model="showIsobar" checked>
          <label for="checkbox-1">等高面</label>
      </div>
      <div class="control-block_div_border slider_mount" v-if="showIsobar" style="margin-top:10px;">

        <vue-slider ref="slider" v-model="sliderNum" v-bind="sliderOption"  >
            <template slot="label" scope="{ label, active,index }">
                <span :class="['custom-label', { active }]" v-if="index === 0"> </span>
                <span :class="['custom-label', { active }]" v-if="index === 100"></span>
            </template>
        </vue-slider>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import "../../src/assets/css/core.css"
import "../../src/assets/css/layout.css"
import {BrowserUtil} from "../../src/util/BrowserUtil";
import {Gltf3DModel} from "../../src/three/Gltf3DModel";
import {ViewController} from "../../src/core/ViewController";
import {MountainViewHandler} from "./service/MountainViewHandler";
let vueSlider = require('vue-slider-component');
//Returned expression type   is not assignable to type Data
export default Vue.extend({
    components: {
        vueSlider
    },
    data(){
      return{
          showIsobar:false,
          sliderNum:1,
          sliderOption:{
              show: true,
              value: 0,
              min: 0,
              max: 100,
              piecewiseLabel: true,
              tooltip: false
          }
      }
    },
    created(){
        ViewController.getInstance(new MountainViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted(){
    /*    var vConsole = new VConsole();
        console.log('Hello world');*/
        ViewController.getInstance().domReady();
    },
    methods: {
    },
    watch:{
        sliderNum:(val)=>{
            ( ViewController.getInstance().viewHandler as any).mountaion.changePlanePositionY(val);
        },
        showIsobar:(val)=>{
            ( ViewController.getInstance().viewHandler as any).mountaion.enablePlaneMesh(val)
        }
    }
})
</script>

<style scoped="scoped">
body{
    overflow:hidden !important;
    overflow-x: hidden;
    overflow-y: hidden;

}

.slider_mount{
    position:absolute;
    width: 200px;
    bottom: 80px;
    right: 70px;
    padding-top: 30px;
}
.slider_switch{
    position:absolute;
    width: 200px;
    bottom: 180px;
    right: 70px;
}

</style>
