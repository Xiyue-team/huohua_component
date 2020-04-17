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
import {FootballViewHandler} from './services/FootballViewHandler';
import exerciseLayout from '../../../../src/component/layout/exercise_layout.vue';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1Img from './sub_static/analytic1.png';
import * as analytic2Img from './sub_static/analytic2.png';
import * as analytic3Img from './sub_static/analytic3.png';

export default Vue.extend({

    data() {
        return{
            exerciseOption: {
                exercise: {},
                resizeCall: {},
                analyticArray:['解析1']

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
                title : '空间足球受力问题',
                coverImage : questionCoverImg
            },
            analyticArray: [
                {
                    title:'解析一',
                    stepArray : [
                        { coverImage: analytic1Img , call: () => {
                                if(this.currentIndex == 0){
                                    return ;
                                }
                                this.currentIndex = 0;

                                (ViewController.getInstance().viewHandler as FootballViewHandler).gltf.hideObj();
                                (ViewController.getInstance().viewHandler as FootballViewHandler).gltf.showObj3();

                                if (this.resetCamera) {
                                    (ViewController.getInstance().viewHandler as FootballViewHandler).gltf.resetCamera();
                                    this.resetCamera = false;
                                }
                            }},

                        { coverImage: analytic2Img , call: () => {

                                if(this.currentIndex == 1){
                                    return ;
                                }
                                this.currentIndex = 1;
                                (ViewController.getInstance().viewHandler as FootballViewHandler).gltf.hideObj();
                                (ViewController.getInstance().viewHandler as FootballViewHandler).gltf.showObj1();
                                (ViewController.getInstance().viewHandler as FootballViewHandler).gltf.showObj3();

                                this.resetCamera = true;
                            }},

                        { coverImage: analytic3Img , call: () => {

                                if(this.currentIndex == 2){
                                    return ;
                                }
                                this.currentIndex = 2;
                                (ViewController.getInstance().viewHandler as FootballViewHandler).gltf.hideObj();
                                (ViewController.getInstance().viewHandler as FootballViewHandler).gltf.showObj2();

                                this.resetCamera = true;
                            }},
                    ]
                }
            ],


        };
        this.exerciseOption.exercise = config;
        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as FootballViewHandler).moveDiv(); };

        (window as any).noMobile = true;
        ViewController.getInstance(new FootballViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as FootballViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    },

    watch: {

    },

    methods: {
        resetEvent() {
            (ViewController.getInstance().viewHandler as FootballViewHandler).reset();
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
