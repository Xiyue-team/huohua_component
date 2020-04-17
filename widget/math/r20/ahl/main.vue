<template>
  <div id="pinmu" class="aspectration bg_white covered root_div_container ">
    <exerciseLayout v-bind="exerciseOption" ref="model">
      <template slot="box" slot-scope="box">
        <div  id="box" style="width: 100%;height: 100%;display: flex">
            <button :class="{anniu:have,bule:ishave}" @click="change" v-if = 'show'>作图</button>
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
import h_arrow from "../../../../src/component/ui/buttonArrow.vue";
import {MainVueComponent} from './mainVueComponent';

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

    model_content{
        width: 100%;
        height: 100%;
    }

    .model3d_content{
        position: relative;
    }
    .anniu{
        width: 100px;
        height: 50px;
        position: absolute;
        bottom:15px;
        right:26px;
        z-index: 2;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #525252;
        text-align: center;
        line-height: 16px;
        background: #FFFFFF;
        border: 2px solid #EBEBEB;
        border-radius: 21px;
    }
    .bule{
        background:#0199FF;
        color: white!important;
    }
</style>
