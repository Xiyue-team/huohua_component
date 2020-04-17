<template>
  <div id="pinmu" class="aspectration bg_white covered root_div_container ">
    <exerciseLayout v-bind="exerciseOption">
      <template slot="box" slot-scope="box">
        <div  id="box" style="width: 100%;height: 100%;display: flex">
            <div style="position: absolute; z-index: 2; bottom: 16px; right: 16px; width: 300px; height: 90px;"  v-show="buttonCtrl">
                <buttonPrimary @click.native="modelEvent()" class="button_Pc_Style buttom_style1" v-bind:class="{'button_Mobile_Style': ismobile}" title="手性碳原子" v-bind:actived.sync="isActive" type="ellipse"  >
                </buttonPrimary>
            </div>
            <div style="position: absolute; z-index: 2; bottom: 16px; right: 16px; width: 300px; height: 90px;" v-show="buttonCtrl1">
                <buttonPrimary @click.native="model1Event()" class="button_Pc_Style buttom_style1" v-bind:class="{'button_Mobile_Style': ismobile}" title="电离" type="ellipse" v-bind:disabled="disable" >
                </buttonPrimary>
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
import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';
import a_button from '../../../../src/component/ui/buttonArrow';

@Component({
    components: {
        h_button, exerciseLayout, switch2, buttonPrimary, a_button
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

    .button_Pc_Style{
        position: absolute;
        right: 8px;

    }

    .button_Mobile_Style{
        position: absolute;
        right: 0px;
    }

    .buttom_style1 {
        bottom: 0px;
    }

</style>
