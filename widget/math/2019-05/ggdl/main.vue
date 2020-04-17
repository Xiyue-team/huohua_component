<template>
  <div id="pinmu" class="aspectration bg_white covered root_div_container ">
    <exerciseLayout v-bind="exerciseOption" ref="model">
      <template slot="box" slot-scope="box">
        <div class="imgBox" v-if="imgShow" :style="{zoom: zoom1}">
            <img :src="imgEx">
        </div>
        <div  id="box" style="width: 100%;height: 100%;display: flex">
            <div class="model_content">
                <div  id="3dModel" class="model3d_content transtaion_animation2"></div>
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
import {MainVueComponent} from './mainVueComponent';
@Component({
    components: {
         exerciseLayout
    },

    mixins: [MainVueComponent]
})
export default class App extends Vue {}
</script>

<style scoped="scoped">
    * {
            margin: 0;
            padding: 0;
      }
    body {
            overflow: hidden !important;
            overflow-x: hidden;
            overflow-y: hidden;
         }
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
        width: 175.2px;
        height: 48px;
        position: absolute;
        bottom: 10vh;
        right: 10vh;
        z-index: 100;
    }
    .imgBox>img{
        width: 100%;
        height: 100%;
    }
</style>
<style>
    .control_div_resetBtn{
        z-index: -1;
    }    
</style>
