<template>
  <div id="pinmu" class="aspectration bg_white covered root_div_container ">
    <exerciseLayout v-bind="exerciseOption">
      <template slot="box" slot-scope="box">
        <div  id="box" style="width: 100%;height: 100%; display: flex">

            <div style="position: absolute;  bottom: 16px; right: 16px; width: 300px; height: 130px;">

                <div @click="clickEvent1" style="position: absolute; right: 0px; top: 0; z-index: 2;">
                    <p_button  v-bind:title="newTitle1" type="ellipse" @click.native="newTitle1 = '编号'" v-bind:actived="isActived1" ></p_button>
                </div>

                <span style="font-size: 16px; color: #999999; position: absolute; right: 2px; bottom: 55px; z-index: 2;">体对角线</span>

                <switch2 style="position: absolute; right: 0px; bottom: 0px; z-index: 2;" v-bind="switch2Option" v-model="switch2Model" v-bind:class="{event_disabled: disable}"></switch2>
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
import exerciseLayout from '../../../../src/component/layout/exercise_layout.vue';
import Component from 'vue-class-component';
import {MainVueComponent} from './mainVueComponent.ts';
import switch2 from '../../../../src/component/ui/switch2.vue';
import p_button from '../../../../src/component/ui/buttonPrimary.vue';

@Component({
    components: {
       exerciseLayout, switch2, p_button,
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
