<template>
    <div   class="aspectration bg_white root_div_container"  >

        <div class="control-panel_div_floatRight">
            <div class="button_border" id="reset" @click="resetEvent">
                <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="../../../../static/images/chongzhi.png" alt="">
            </div>
        </div>

        <div class="control-panel_div_content fill_parent" >
            <div>
                <h3 class="title">方位角</h3>
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

//Returned expression type   is not assignable to type Data
export default Vue.extend({
    components: {
        h_button
    },
    created(){
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

    .button_border{
        width:48px;
        height:40px;
        /*float: right;*/
        /*margin-top: 20px;*/
        /*margin-right: 24px;*/
    }

  .view_div_content{
      width: 600px;
      height: 600px;
  /*    width: 766px;
      height: 430px;*/
      position: absolute;
      margin: 0;
  }

</style>
