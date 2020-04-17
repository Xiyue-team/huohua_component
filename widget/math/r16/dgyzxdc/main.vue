<template>
  <div id="pinmu" class="aspectration bg_white covered root_div_container ">
    <exerciseLayout v-bind="exerciseOption">
      <template slot="box" slot-scope="box">
        <div  id="box" style="width: 100%;height: 100%;display: flex">
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
import h_button from '../../../../src/component/ui/button.vue';
import {ViewController} from '../../../../src/core/ViewController';
import {DgyzxdcViewHandler} from './services/DgyzxdcViewHandler';
import exerciseLayout from '../../../../src/component/layout/exercise_layout.vue';

export default Vue.extend({

    data() {
        return{
            exerciseOption: {
                exercise: {},
                resizeCall: {}

            },
            showImage: false,
            currentIndex:0,
            resetCamera: false
        };
    },

    components: {
         h_button, exerciseLayout

    },

    created() {
        const config = {
            question : {
                title : '点关于直线对称',
            },
            stepArray : [
            ]
        };
        this.exerciseOption.exercise = config;
        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as DgyzxdcViewHandler).moveDiv(); };

        (window as any).noMobile = true;
        ViewController.getInstance(new DgyzxdcViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as DgyzxdcViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    },

    watch: {

    },

    methods: {
        resetEvent() {
            (ViewController.getInstance().viewHandler as DgyzxdcViewHandler).reset();
        },
    }
});
</script>

<style scoped="scoped">

    .transtaion_animation2 {
        transition: all 0.3s  ease-in-out;
    }

    .model_content{
        width: 100%;
        height: 100%;
    }

    .model3d_content{
        position: relative;
    }

</style>
