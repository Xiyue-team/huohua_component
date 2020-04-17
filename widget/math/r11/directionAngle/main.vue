<template>
    <div   class="aspectration bg_white root_div_container"  >

        <div class="control-panel_div_floatRight">
            <div class="button_border" id="reset" @click="resetEvent">
                <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="../../../../static/images/chongzhi.png" alt="" >
            </div>
        </div>

        <div class="control-panel_div_content fill_parent" >
            <div>
                <h3 id="title" class="title">方向角</h3>
                <span id="statusBar" class="statusBar">北偏东45度</span>
            </div>
            <div id="box" class="view_div_content"  data-ratio="1:1" >
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
import {ViewController} from "../../../../src/core/ViewController";
import {JsxViewHandler} from "./services/JsxViewHandler";
//var VConsole = require('vconsole');
//Returned expression type   is not assignable to type Data
export default Vue.extend({
    components: {
        h_button
    },
    created(){
//        var vConsole = new VConsole();
        console.log("hello");
        ViewController.getInstance(new JsxViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted(){
        ViewController.getInstance().domReady();
    },
    watch:{

    },
    methods: {
        resetEvent(){
            console.log("被调用额");
            (ViewController.getInstance().viewHandler as JsxViewHandler).reset();
        }
    }
})
</script>

<style scoped="scoped">
  /*  .control-panel_div_content{
        height: 100%;
        width: 100%;
        display: inline;
        float: left;
    }*/

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
        /*position: absolute;*/
        /*right: 24px;*/
        /*top: 20px;*/
        /*float: right;*/
        /*margin-right: 24px;*/
        /*margin-top: 20px;*/

    }

    .view_div_content{
        width: 470px;
        height: 470px;
        position: absolute;
        top: 30px;
    }
</style>
