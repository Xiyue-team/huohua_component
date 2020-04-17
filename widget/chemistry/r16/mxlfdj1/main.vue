<template>
  <div id="pinmu" class="aspectration bg_white covered root_div_container ">
    <exerciseLayout v-bind="exerciseOption">
      <template slot="box" slot-scope="box">
        <div  id="box" style="width: 100%;height: 100%; display: flex">

            <div style="position: absolute; z-index: 2; bottom: 16px; right: 16px; width: 400px; height: 90px;">
                <!--<switch2 style="position: absolute; right: 24px;" v-bind="switch2Option" v-photo="switch2Model"></switch2>-->
                <switch2 style="position: absolute; right: 0px; bottom: 50px" v-bind="switch2Option" v-model="switch2Model"></switch2>

                <div @click="cuttingEvent" style="position: absolute; bottom: 0px; right: 0">
                    <p_button  v-bind:title="newTitle" type="ellipse" @click.native="newTitle = '切割模型'" v-bind:disabled="disable" >

                    </p_button>
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
import switch2 from "../../../../src/component/ui/switch2.vue";
import p_button from "../../../../src/component/ui/buttonPrimary.vue";

@Component({
    components: {
        h_button, exerciseLayout, switch2, p_button,
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
