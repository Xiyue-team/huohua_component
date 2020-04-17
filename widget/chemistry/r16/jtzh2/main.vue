<template>
  <div id="pinmu" class="aspectration bg_white covered root_div_container ">
    <exerciseLayout v-bind="exerciseOption">
      <template slot="box" slot-scope="box">
        <div  id="box" style="width: 100%;height: 100%;display: flex">
            <div style="position: absolute; z-index: 2; bottom: 5px; right: 26px; width: 100px; height: 100px;" :style="{zoom:zoom1}">
                <div>
                    <h_arrow v-bind:steps="stepArry" v-show='isActive' v-model ='data1'></h_arrow>
                </div>
                <div>
                    <h_arrow v-bind:steps="stepArry2" v-show='isActive2' v-model="data1_2"></h_arrow>
                </div>
            </div>
            <div class="model_content">
                <div  id="3dModel" class="model3d_content transtaion_animation2" style="">

                </div>
            </div>
        </div>
      </template>

    </exerciseLayout>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import exerciseLayout from '../../../../src/component/layout/exercise_layout.vue';
import Component from 'vue-class-component';
import h_arrow from "../../../../src/component/ui/buttonArrow.vue";
import {MainVueComponent} from './mainVueComponent';

@Component({
    components: {
        h_arrow, exerciseLayout
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

</style>
