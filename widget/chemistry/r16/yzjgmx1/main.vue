<template>
  <div id="pinmu" class="aspectration bg_white covered root_div_container ">
    <exerciseLayout v-bind="exerciseOption">
      <template slot="box" slot-scope="box">
        <div  id="box" style="width: 100%;height: 100%;display: flex">

            <div class="model_content">
                <div  id="3dModel" class="model3d_content transtaion_animation2" style="">
                </div>
            </div>
            <div v-if="open" style="position: absolute; z-index: 2; bottom: 5px; right: 26px; width: 100px; height: 100px;"><h_button title="点击拍摄" id="cs" @mousedown.native="cc()" @mouseup.native="aa()" @touchstart.native="cc()" @touchend.native="aa()"></h_button></div>
        </div>
      </template>
    </exerciseLayout>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import exerciseLayout from '../../../../src/component/layout/exercise_layout.vue';
import Component from 'vue-class-component';
import {MainVueComponent} from './mainVueComponent';
import h_button from "../../../../src/component/ui/button.vue";

@Component({
    components: {
        exerciseLayout,h_button
    },
    mixins: [MainVueComponent]
})
export default class App extends Vue {}
</script>

<style scoped="scoped">
    .transtaion_animation2 {
        transition: all 0.3s  ease-in-out;
    }

    model_content{
        width: 100%;
        height: 100%;
    }

    .model3d_content{
        position: relative;
    }
    .imgBox{
        position: absolute;
        z-index: 2; 
        right: 26px; 
        top:40%;
        width: 100px; 
        height: 100px;
    }
    .minImg{
        width: 100px; 
        height: 50px;
    }
</style>
