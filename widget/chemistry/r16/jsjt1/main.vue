<template>
  <div id="pinmu" class="aspectration bg_white covered root_div_container ">
    <exerciseLayout v-bind="exerciseOption">
      <template slot="box" slot-scope="box">
        <div  id="box" style="width: 100%;height: 100%;display: flex">

            <div style="position: absolute; z-index: 2; bottom: 16px; right: 16px; width: 100px; height: 50px;"  v-show="showButton1">
                <div @click="cuttingEvent">
                    <h_button class="h_button1" style="margin-bottom: 0px; margin-right: 0" title="配位数" v-bind:isActive.sync="isActive2" v-bind:clickNumber.sync="clickNumber2">

                    </h_button>
                </div>
            </div>

            <div style="position: absolute; z-index: 2; bottom: 16px; right: 16px; width: 148px; height: 100px;" v-show="showButton3">
                <div @click="animation3">
                    <h_button class="h_button1" style="margin-bottom: 0;" title="六方最密堆积" v-bind:isActive.sync="isActive3" v-bind:clickNumber.sync="clickNumber3">

                    </h_button>
                </div>

                <div @click="animation4">
                    <h_button class="h_button2" style="margin-bottom: -16px;position: relative;top: 10px"  title="面心立方堆积" v-bind:isActive.sync="isActive4"
                              v-bind:clickNumber.sync="clickNumber4"></h_button>
                </div>
            </div>

            <div style="position: absolute; z-index: 2; bottom: 16px; right: 16px; width: 148px; height: 100px;" v-show="showButton4">
                <div @click="animation5">
                    <h_button class="h_button1" style="margin-bottom: 0;" title="简单立方堆积" v-bind:isActive.sync="isActive5" v-bind:clickNumber.sync="clickNumber5">

                    </h_button>
                </div>

                <div @click="animation6">
                    <h_button class="h_button2" style="margin-bottom: -16px;position: relative;top: 10px"  title="体心立方堆积" v-bind:isActive.sync="isActive6"
                              v-bind:clickNumber.sync="clickNumber6"></h_button>
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
