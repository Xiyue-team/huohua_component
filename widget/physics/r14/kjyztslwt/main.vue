<template>
  <div id="pinmu" class="aspectration bg_white covered root_div_container ">
    <exerciseLayout v-bind="exerciseOption">
      <template slot="box" slot-scope="box">
        <div  id="box" style="width: 100%;height: 100%;display: flex">
            <div class="model_content">
                <div  id="3dModel" class="model3d_content transtaion_animation2" style="">

                </div>

                <div class="image1">
                    <img class="image_one" src="./sub_static/image1.png" v-show="showImageOne"/>
                </div>

                <div class="image2">
                    <img class="image_two" src="./sub_static/image2.png" v-show="showImageTwo"/>
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
import {CylinderViewHandler} from './services/CylinderViewHandler';
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
                resizeCall: {}
            },
            showImageOne: false,
            showImageTwo: false,
        };
    },

    components: {
         h_button, exerciseLayout

    },

    created() {
        const config = {
            question : {
                title : '空间圆柱体受力问题',
                coverImage : questionCoverImg
            },
            stepArray : [
                { coverImage: analytic1Img , call: () => {

                    (ViewController.getInstance().viewHandler as CylinderViewHandler).gltf.hideObj();
                    (ViewController.getInstance().viewHandler as CylinderViewHandler).gltf.showObj1();
                    this.showImageOne = false;
                    this.showImageTwo = false;
                }},

                { coverImage: analytic2Img , call: () => {

                    (ViewController.getInstance().viewHandler as CylinderViewHandler).gltf.hideObj();
                    (ViewController.getInstance().viewHandler as CylinderViewHandler).gltf.revertDiv();
                    this.showImageOne = true;
                    this.showImageTwo = false;
                }},

                { coverImage: analytic3Img , call: () => {
                    (ViewController.getInstance().viewHandler as CylinderViewHandler).gltf.moveCamera();

                    setTimeout(() => {
                        (ViewController.getInstance().viewHandler as CylinderViewHandler).gltf.hideObj();
                        (ViewController.getInstance().viewHandler as CylinderViewHandler).gltf.showObj1();
                        this.showImageOne = false;
                        this.showImageTwo = true;
                    }, 300);
                }},
            ]
        };
        this.exerciseOption.exercise = config;
        this.exerciseOption.resizeCall = () => {
            if (this.showImageTwo === true) {
                (ViewController.getInstance().viewHandler as CylinderViewHandler).gltf.moveDiv2();
            } else {
                (ViewController.getInstance().viewHandler as CylinderViewHandler).moveDiv();
            }

        };

        (window as any).noMobile = true;
        ViewController.getInstance(new CylinderViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';
        (ViewController.getInstance().viewHandler as CylinderViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    },

    watch: {

    },

    methods: {
        resetEvent() {
            (ViewController.getInstance().viewHandler as CylinderViewHandler).reset();
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

    .image1{
        height: 37.5%;
        position: absolute;
        right: 30%;
        top: 25%;
        z-index: 2;
    }

    .image_one{
        height: 100%;
    }

    .image2{
        height: 42.9%;
        position: absolute;
        right: 4.8%;
        top: 25%;
        z-index: 2;
    }

    .image_two{
        height: 100%;
    }
</style>
