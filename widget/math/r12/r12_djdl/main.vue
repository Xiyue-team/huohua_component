<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <div class="control-panel_div_rt" style="height: 100%">
            <div style="display: flex;height: 100%">
               <div style="margin: auto;">
                   <label id="s1" for="checkbox-1" class="control-block_div_border switch" style="width: 220px;" v-on:mouseover="shou" v-on:mouseout="shubiao">
                       <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" v-model="axiom" checked>
                       <label for="checkbox-1">等角定理</label>
                   </label>
               </div>
                <div class="img_style" v-show="axiom">
                    空间中如果两个角的两边分别对应<br/>平行，那么这两个角相等或互补。
                </div>
            </div>
        </div>


            <div  class="control-panel_div_content">
                <span id="title" class="title_text">等角定理</span>
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
import {DjdlViewHandler} from './services/DjdlViewHandler';
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
      };
    },
    created() {
        ViewController.getInstance(new DjdlViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted() {
        ViewController.getInstance().domReady();
    },
    methods: {
        shou() {
            document.getElementById('s1').style.cursor = 'pointer';
        },
        shubiao() {
            document.getElementById('s1').style.cursor = 'default';
        },
    },
    watch: {
        axiom: function (axiom: boolean) {
            (ViewController.getInstance().viewHandler as DjdlViewHandler).djdl.toggleText(axiom)
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
.img_style{
    position: absolute;
    top: calc(50% + 40px);
    /*left: 17px;*/
    font-size: 16px;
    font-family: '宋体';
    color: #000000;
}


</style>
