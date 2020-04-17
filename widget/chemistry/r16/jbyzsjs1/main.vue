<template>
  <div id="pinmu" class="aspectration bg_white covered root_div_container ">
    <exerciseLayout v-bind="exerciseOption">
      <template slot="box" slot-scope="box">
        <div  id="box" style="width: 100%;height: 100%;display: flex">

            <div style="position: absolute; z-index: 2; bottom: 16px; right: 16px; width: 100px; height: 100px;">
                <div @click="cuttingEvent">
                    <h_button class="h_button1" style="margin-bottom: 0px" title="晶胞切割" v-bind:isActive.sync="isActive2" v-bind:clickNumber.sync="clickNumber2">

                    </h_button>
                </div>

                <div @click="juxtapositionEvent">
                    <h_button class="h_button2" style="margin-bottom: -16px;position: relative;top: 10px"  title="无隙并置" v-bind:isActive.sync="isActive1"
                              v-bind:clickNumber.sync="clickNumber1" v-bind:class="{ event_disabled: buttonDisable }"></h_button>
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
import h_button from '../../../../src/component/ui/buttonEllipse.vue';
import exerciseLayout from '../../../../src/component/layout/exercise_layout.vue';
import Component from 'vue-class-component';
import {MainVueComponent} from './mainVueComponent.ts';

@Component({
    components: {
        h_button, exerciseLayout
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
