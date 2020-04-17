<template>
  <div id="pinmu" class="aspectration bg_white covered root_div_container ">
    <exerciseLayout v-bind="exerciseOption">
      <template slot="box" slot-scope="box">
        <div  id="box" style="width: 100%;height: 100%;display: flex">
            <div style="position: absolute; z-index: 2; bottom: 16px; right: 16px; width: 150px; height: 90px;" v-show="ctrl">
                <a_button v-bind:steps="stepArry" v-model="num1"></a_button>
            </div>
            <div style="position: absolute; z-index: 2; bottom: 16px; right: 16px; width: 150px; height: 90px;" v-show="ctrl1">
                <a_button v-bind:steps="stepArry1" v-model="num2"></a_button>
            </div>
            <div class="model_content">
                <div  id="3dContainer" class="model3d_content transtaion_animation2" style="">
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
import switch2 from '../../../../src/component/ui/switch2.vue';
import p_button from '../../../../src/component/ui/buttonPrimary.vue';
import a_button from '../../../../src/component/ui/buttonArrow';

@Component({
    components: {
        h_button, exerciseLayout, switch2, p_button, a_button
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

</style>
