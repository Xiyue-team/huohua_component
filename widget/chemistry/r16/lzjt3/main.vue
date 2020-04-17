<template>
  <div id="pinmu" class="aspectration bg_white covered root_div_container ">
    <exerciseLayout v-bind="exerciseOption">
      <template slot="box" slot-scope="box">
        <div id="box" style="width: 100%;height: 100%;display: flex;align-items: center;"  >
            <div class="picture">
                <img src="./sub_static/F-Ca.png">
            </div>
            <div class="changeButton" v-show="isActive1">
                <h_arrow v-bind:steps="stepArry1" v-model ="data1"></h_arrow>
            </div>
            <div class="changeButton" v-show="isActive2">
                <h_arrow v-bind:steps="stepArry2" v-model="data2"></h_arrow>
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
import h_arrow from "../../../../src/component/ui/buttonArrow.vue";
import exerciseLayout from '../../../../src/component/layout/exercise_layout.vue';
import Component from 'vue-class-component';
import {MainVueComponent} from './mainVueComponent.ts';

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

    .picture{
        position: absolute;
        z-index: 1;
        right: 3%;
        top: 40%;
        height: 10%;
    }
    .picture img{
        height: 100%;
        display: block;
        margin: auto;
        background-size: 100% 100%;
    }
    .changeButton{
        position: absolute;
        z-index: 1;
        bottom: 24px;
        right: 24px;
        width: 100px;
        height: 50px;
    }
    .model_content{
        width: 100%;
        height: 100%;
    }
    .model3d_content{
        position: relative;
    }

</style>
