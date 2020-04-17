<template>
  <div id="pinmu" class="aspectration bg_white covered root_div_container ">
    <exerciseLayout v-bind="exerciseOption">
      <template slot="box" slot-scope="box">
        <div  id="box" style="width: 100%;height: 100%;display: flex">
            <div style="position: absolute; z-index: 2; bottom: 16px; right: 16px; width: 100px; height: 100px;">
                <h_arrow v-bind:steps="stepArry" v-if="isStep1"></h_arrow>

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
import exerciseLayout from '../../../../src/component/layout/exercise_layout.vue';
import Component from 'vue-class-component';
import {MainVueComponent} from './mainVueComponent.ts';
import h_arrow from "../../../../src/component/ui/buttonArrow.vue";

@Component({
    components: {
        h_button, exerciseLayout,
        h_arrow
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

    h_button1{
        position: absolute;
        bottom: 2.8%;
        right: 16px;
        z-index: 2;
    }
    @media screen and (max-height: 500px) {
      button.begin_button{
          width: 180px !important;
      }
        div.button-arrow-content{
         transform: scale(0.8) !important;
            margin-top: 40px !important;
        }
    }
</style>
