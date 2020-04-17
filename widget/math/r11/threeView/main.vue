<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <div class="control-panel_div_rt">
            <div class="button_border " style="display:inline-block;width:48px;height:40px;float: right;" id="reset" @click="resetEvent">
                <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="../../../../static/images/chongzhi.png" alt="">
            </div>


            <h_button title="切割" class="cutting" @click.native="cuttingEvent" v-bind:class="{'event_disabled':disabled}"></h_button>

            <h_button title="组合" class="combination" @click.native="combinationEvent" v-bind:class="{'event_disabled':disabled}"></h_button>

            <label for="checkbox-1" id="s1" class="control-block_div_border switch threeView" v-on:mouseover="shou1" v-on:mouseout="shubiao1">
                <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" value="1" v-model="threeView">
                <label for="checkbox-1" style="margin-top: 6px">三视图</label>
            </label>

            <label for="test1" id="s2" class="control-block_div_border view_test1" v-on:mouseover="shou2" v-on:mouseout="shubiao2" >
                <input class="radio-default" type="radio" id="test1" name="radio-group" value="1" v-model="view_angle">
                <label for="test1">正视角</label>
            </label>

            <label for="test2" id="s3" class="control-block_div_border view_test2" v-on:mouseover="shou3" v-on:mouseout="shubiao3" >
                <input class="radio-default" type="radio" id="test2" name="radio-group" value="0" v-model="view_angle">
                <label for="test2">侧视角</label>
            </label >

            <label for="test3" id="s4" class="control-block_div_border view_test3" v-on:mouseover="shou4" v-on:mouseout="shubiao4">
                <input class="radio-default" type="radio" id="test3" name="radio-group" value="-1" v-model="view_angle">
                <label for="test3">俯视角</label>
            </label >

            <div id="cuttingImage" v-show="viewImage" class="imageTwo">
                <img  class="cuttingImage1" v-show="cuttingShow" src="./sub_static/cutting.png" />
                <img  class="cuttingImage2" v-show="combinationShow" src="./sub_static/combination.png" />
            </div>
        </div>

        <span class="title">简单组合体的三视图</span>
        <div  class="control-panel_div_content" id="leftContent">
            <div id="3dContainer" class="container"></div>

        </div>
    </div>


</template>

<script lang="ts">
import Vue from 'vue'
import "../../../../src/assets/css/core.css"
import "../../../../src/assets/css/layout.css"
import {ViewController} from "../../../../src/core/ViewController";
import {ThreeViewHandler} from "./services/ThreeViewHandler";
import h_button from '../../../../src/component/ui/button.vue';
import vueSlider from "../../../../src/component/ui/vue2-slider.vue";
export default Vue.extend({
    components: {
        h_button,vueSlider
    },
    data(){
      return{
          disabled: false,
          threeView:false,
          viewImage:false,
          view_angle: " ",
          cuttingShow:true,
          combinationShow:false,
          timeout: null,
      }
    },
    created(){
        ViewController.getInstance(new ThreeViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted(){
        ViewController.getInstance().domReady();
    },
    methods: {
        shou1(){
            document.getElementById('s1').style.cursor = 'pointer';
        },
        shubiao1(){
            document.getElementById('s1').style.cursor = 'default';
        },

        shou2(){
            document.getElementById('s2').style.cursor = 'pointer';
        },
        shubiao2(){
            document.getElementById('s2').style.cursor = 'default';
        },

        shou3(){
            document.getElementById('s3').style.cursor = 'pointer';
        },
        shubiao3(){
            document.getElementById('s3').style.cursor = 'default';
        },

        shou4(){
            document.getElementById('s4').style.cursor = 'pointer';
        },
        shubiao4(){
            document.getElementById('s4').style.cursor = 'default';
        },

        cuttingEvent(){
            (ViewController.getInstance().viewHandler as any).pyramid.createPolyhedron();
            (ViewController.getInstance().viewHandler as any).pyramid.animationThreePyramid();
            this.disabled = true;
            this.cuttingShow = true;
            this.combinationShow = false;
            this.timeout = setTimeout(() => {
                this.disabled = false;
            },1500);

        },

        combinationEvent() {
            (ViewController.getInstance().viewHandler as any).pyramid.createAssembly();
            this.cuttingShow = false;
            this.combinationShow = true;
        },

        resetEvent(){
            ( ViewController.getInstance().viewHandler as any).pyramid.reset();

            this.cuttingShow = true;
            this.combinationShow = false;
            this.threeView = false;
            this.view_angle = null;
            this.disabled = false;

            clearInterval(this.timeout);
        }
    },
    watch:{
        threeView:function(value){
            this.viewImage = value;

//            document.getElementById('3dContainer').style.marginLeft = 300 as any;
        },

        view_angle:function(value){
            (ViewController.getInstance().viewHandler as any).pyramid.cameraXYZ(Number.parseInt(value));
        },
    }
})
</script>

<style scoped="scoped">
    body{
        overflow:hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;

    }

    .cutting{
        width: 240px;
        height: 50px;
        margin-top: 80px;
    }

    .combination{
        width: 240px;
        height: 50px;
        margin-top: 12px;
    }

    .threeView{
        width: 215px;
        height: 27px;
        margin-top: 20px;
    }

    .title{
        font-size: 24px;
        color: #000000;
        position: absolute;
        top: 24px;
        left: 24px;
    }

    .view_test1{
        width: 215px;
        margin-top: 20px;
    }

    .view_test2{
        width: 215px;
        margin-top: 12px;
    }

    .view_test3{
        width: 215px;
        margin-top: 12px;
    }

    .container{
        width: 700px;
        height: 700px;
    }

    .imageTwo{

        margin-top: 20px;

    }

    .cuttingImage1{
       width: 100%;
    }

    .cuttingImage2{

        width: 100%;
    }


</style>
