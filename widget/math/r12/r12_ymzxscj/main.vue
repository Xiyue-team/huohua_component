<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <div class="control-panel_div_floatRight" style="height: 100%">
            <div class="button_border " style="width:48px;height:40px;position: absolute;top:20px;right:24px;" id="reset" @click="resetEvent">
                <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="../../../../static/images/chongzhi.png" alt="" >
            </div>
            <div id="flatLine" @click="panning" style="width: 240px;height: 44px;margin-top: 508px">
                <h_button  title="平移" style="width: 240px;height: 44px; "></h_button>
            </div>
        </div>
        <div class="control-panel_div_content fill_parent" style="background-color: #FFFFFF;color: #000000; font-size: 24px;">
            <span id="title" class="title_text">异面直线所成角</span>
            <div id="3dContainer" class="view_div_content">

            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import "../../../../src/assets/css/core.css";
    import "../../../../src/assets/css/layout.css";
    import {ViewController} from "../../../../src/core/ViewController";

    import h_button from '../../../../src/component/ui/button.vue';
    import h_switch from '../../../../src/component/ui/switch.vue';
    import {YmzxViewHandler} from "./services/YmzxViewHandler";
    import vueSlider from "../../../../src/component/ui/vue2-slider.vue";
    export default Vue.extend({
        components: {
            vueSlider,
            h_button,
            h_switch,
        },
        data(){
            return{
                axiom:false,
            }
        },
        created(){
            ViewController.getInstance(new YmzxViewHandler(this));
            ViewController.getInstance().viewHandler.beforeRenderElement();
        },
        mounted(){
            ViewController.getInstance().domReady();
        },
        methods: {
            resetEvent() {
                (ViewController.getInstance().viewHandler as YmzxViewHandler).reset();
                (ViewController.getInstance().viewHandler as YmzxViewHandler).ymzx.sceneReset();
            },
            panning() {
                (ViewController.getInstance().viewHandler as YmzxViewHandler).ymzx.resetAnimation();
                (ViewController.getInstance().viewHandler as YmzxViewHandler).ymzx.playAnimation();
            }
        },
        watch:{

        }
    })
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
    .img_style{
        position: absolute;
        top: 305px;
        left: 25px;
        margin: 0px;
        padding: 0px;
        font-size: 16px;
        font-family: '宋体';
        color: #000000;
        transform: scale(1);
    }


</style>
