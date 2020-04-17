<template>
  <div id="pinmu" class="aspectration bg_white covered root_div_container ">
    <exerciseLayout v-bind="exerciseOption">
      <template slot="box" slot-scope="box">
        <div id="box" style="width: 100%;height: 100%;display: flex">
            <div class="cuttingButton" v-show="showButton1" @click="cuttingEvent">
                <h_button class="h_button" title="晶胞切割" v-bind:isActive.sync="isActive1"
                          v-bind:clickNumber.sync="clickNumber1">
                </h_button>
            </div>
            <div class="coordinationButton" v-show="showButton2" @click="coordinationEvent">
                <h_button class="h_button" title="配位数" v-bind:isActive.sync="isActive2"
                          v-bind:clickNumber.sync="clickNumber2">
                </h_button>
            </div>
            <div class="changeButton" v-show="showButton3">
                <h_arrow class="h_button" v-bind:steps="stepArry" v-model="data"></h_arrow>
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
import h_button from '../../../../src/component/ui/buttonEllipse.vue';
import h_arrow from '../../../../src/component/ui/buttonArrow.vue';
import exerciseLayout from '../../../../src/component/layout/exercise_layout.vue';
import Component from 'vue-class-component';
import {MainVueComponent} from './mainVueComponent.ts';

@Component({
    components: {
        h_button, h_arrow, exerciseLayout
    },

    mixins: [MainVueComponent]
})
export default class App extends Vue {}
</script>

<style scoped="scoped">
    .transtaion_animation2 {
        transition: all 0.3s  ease-in-out;
    }

    .cuttingButton {
        position: absolute;
        z-index: 2;
        bottom: 24px;
        right: 24px;
        width: 100px;
        height: 50px;
    }
    .coordinationButton {
        position: absolute;
        z-index: 2;
        bottom: 24px;
        right: 24px;
        width: 100px;
        height: 50px;
        /*border: solid 1px grey;*/
    }
    .changeButton{
        position: absolute;
        z-index: 2;
        bottom: 24px;
        right: 24px;
        width: 100px;
        height: 50px;
        /*border: solid 1px grey;*/
    }
    .model_content{
        width: 100%;
        height: 100%;
    }

    .model3d_content{
        position: relative;
    }

</style>
