<template>
  <div id="pinmu" class="aspectration bg_white covered root_div_container ">
    <exerciseLayout v-bind="exerciseOption">
      <template slot="box" slot-scope="box">
        <div  id="box" style="width: 100%;height: 100%;display: flex">
            <transition name="fade">
                <div class="box1" v-bind:class="{'box_bottom' : styleCtrl && !ismobile, 'box_bottom_mobile': styleCtrl && ismobile}" >
                    <switch2 class="button_Pc_Style buttom_style4" v-bind:class="{'button_Mobile_Style4': ismobile}" v-bind="switch1Option" v-model="switch1Model"></switch2>
                    <switch2 class="button_Pc_Style buttom_style3" v-bind:class="{'button_Mobile_Style3': ismobile}"v-bind="switch2Option" v-model="switch2Model"></switch2>
                    <div @click="cuttingEvent">
                        <buttonPrimary class="button_Pc_Style buttom_style1" v-bind:title="newTitle" type="ellipse" @click.native="newTitle = '切面模型'" v-bind:disabled="disable" >
                        </buttonPrimary>
                    </div>
                </div>
            </transition>

            <div style="position:absolute; z-index: 2; bottom: 12px; right: 12px; width: 250px; height: 42px;" v-show="ispws">
                <div @click="peiweishuEvent">
                    <buttonPrimary class="button_Pc_Style buttom_style2" v-bind:title="newTitle1" type="ellipse" v-bind:actived="color" >
                    </buttonPrimary>
                </div>
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
import exerciseLayout from '../../../../src/component/layout/exercise_layout.vue';
import Component from 'vue-class-component';
import {MainVueComponent} from "./mainVueComponent.ts";
import switch2 from "../../../../src/component/ui/switch2.vue";
import buttonPrimary from "../../../../src/component/ui/buttonPrimary.vue";

@Component({
    components: {
        exerciseLayout, switch2, buttonPrimary
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

    .button_Pc_Style{
        position: absolute;
        right: 0px;
    }
    .buttom_style1 {
        bottom: 0px;
    }

    .buttom_style2 {
        bottom: 0px;
    }
    .buttom_style3 {
        bottom: 54px
    }
    .buttom_style4 {
        bottom: 112px
    }

    .button_Mobile_Style3 {
        bottom: 50px;
    }
    .button_Mobile_Style4 {
        bottom: 102px;
    }
    .box1{
        position:absolute;
        z-index: 2;
        bottom: 12px;
        right: 12px;
        width: 250px;
        height: 46px;
    }
    .box_bottom {
        bottom: 66px;
    }
    .box_bottom_mobile {
        bottom: 62px;
    }
 /*   .box1_mobile {
        position:absolute;
        z-index: 2;
        bottom: 62px;
        right: 12px;
        width: 250px;
        height: 46px;
    }*/

</style>
