<template>
  <div id="pinmu" class="aspectration bg_white covered root_div_container ">
    <exerciseLayout v-bind="exerciseOption">
      <template slot="box" slot-scope="box">
        <div id="box" style="width: 100%;height: 100%;display: flex;align-items: center;"  >
            <div class="imgBox" v-show="imgBox1">
               <img src="./sub_static/si-c.png">
            </div>
            <div class="imgBox" v-show="imgBox2">
                <img src="./sub_static/si-o.png">
            </div>
            <div class="analytic3Box" v-show="imgBox3">
                <img src="./sub_static/analyticimg.png">
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

@Component({
    components: {
       exerciseLayout
    },
    mixins: [MainVueComponent]
})
export default class App extends Vue {}
</script>

<style scoped="scoped">
    .transtaion_animation2 {
        transition: all 0.3s  ease-in-out;
    }

    .imgBox{
        position: absolute;
        z-index: 1;
        left: 90%;
        top: 45%;
        height: 10%;
    }

    .imgBox img{
        height: 100%;
        display: block;
        margin: auto;
        background-size: 100% 100%;
    }

    .analytic3Box{
        position: absolute;
        z-index: 1;
        left: 50%;
        transform: translateX(-50%);
        height: 40%;
    }

    .analytic3Box img{
        height: 100%;
        display: block;
        margin: auto;
        background-size: 100% 100%;
    }
    .model_content{
        width: 100%;
        height: 100%;
    }
    .model3d_content{
        position: relative;
    }

</style>
