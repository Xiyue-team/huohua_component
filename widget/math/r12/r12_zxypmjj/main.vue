<template>
    <div class="aspectration bg_white root_div_container">

        <div class="control-panel_div_rt" style="">
            <div style="display: flex;height: 100%">
                <div class='control-block_div_border' style='margin: auto'>
                    <label style="margin-left: 100px">角度</label>
                    <vue-slider ref='sliderC' v-model='sliderNum' v-bind='sliderOption'>
                    </vue-slider>
                </div>
            </div>
        </div>
        <span id="title"  class="title_text">直线与平面所成角</span>
        <div  class="control-panel_div_content" >
            <div id="3dContainer" class='view_div_content' style='background-color: white;' data-ratio='1:1'></div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import "../../../../src/assets/css/core.css"
    import "../../../../src/assets/css/layout.css"
    import {ViewController} from "../../../../src/core/ViewController";

    import h_button from '../../../../src/component/ui/button.vue';
    import h_switch from '../../../../src/component/ui/switch.vue';
    import {LineSurfaceAngleViewHandler} from "./services/LineSurfaceAngleViewHandler";
    import vueSlider from "../../../../src/component/ui/vue2-slider.vue";
    export default Vue.extend({
        components: {
            vueSlider,
            h_button,
            h_switch,
        },
        data(){
            return {
                isPlay: false,
                showImg: true,
                sliderNum: 45,
                sliderOption: {
                    width: '100%',
                    min: 0,
                    max: 90,
                    show: true,
                    style: {
                        'marginTop': '38px',
                        'marginLeft': '0px',
                    }
                },

            };
        },
        created(){
            ViewController.getInstance(new LineSurfaceAngleViewHandler(this));
            ViewController.getInstance().viewHandler.beforeRenderElement();
        },
        mounted(){
            ViewController.getInstance().domReady();
        },
        methods: {

        },
        watch: {
            sliderNum: function (sliderNum: number, lastSliderNum: number) { //滑条拖动事件
                let angle = sliderNum - lastSliderNum;
                (ViewController.getInstance().viewHandler as LineSurfaceAngleViewHandler).mountaion.changeSlider(sliderNum , angle);
            }
        },
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
    .reset_button{
        display:inline-block;
        width:48px;
        height:40px;
        position: absolute;
        top:20px;
        right:24px;
    }
    .reset_img{
        width: 24px;
        margin-top: 8px;
        margin-left: 12px
    }

    .control-block_div_border {
        width: 218px;
        height: 78px;
        margin-top: 174px;
    }

</style>
