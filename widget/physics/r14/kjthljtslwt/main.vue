<template>
  <div id="pinmu" class="aspectration bg_white covered root_div_container ">
    <exerciseLayout v-bind="exerciseOption">
      <template slot="box" slot-scope="box">
        <div  id="box" style="width: 100%;height: 100%;display: flex">
            <div class="button_Image">
               <label for="checkbox-1" id="s1" class="control-block_div_border switch enableAnim" style="margin-top:10px;width: 200px;color:#000000">
                <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" value="1" v-model="showImage" >
                <label for="checkbox-1">辅助图示</label>
              </label>
            </div>

            <div class="model_content">
                <div  id="3dModel" class="model3d_content transtaion_animation2" style="">

                </div>

                <div class="image1">
                    <img class="image_one" src="./sub_static/image1.png" style="" v-show="showImage"/>
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
import {SpringViewHandler} from './services/SpringViewHandler';
import exerciseLayout from '../../../../src/component/layout/exercise_layout.vue';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1Img from './sub_static/analytic1.png';

export default Vue.extend({

    data() {
        return{
            exerciseOption: {
                exercise: {},
                resizeCall: {}
            },
            showImage: false,
        };
    },

    components: {
         h_button, exerciseLayout

    },

    created() {
        const config = {
            question : {
                title : '空间弹簧连接体受力问题',
                coverImage : questionCoverImg
            },
            stepArray : [
                { coverImage: analytic1Img , call: () => {

                }},
            ]
        };
        this.exerciseOption.exercise = config;
        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as SpringViewHandler).moveDiv(); };

        (window as any).noMobile = true;
        ViewController.getInstance(new SpringViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as SpringViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    },

    watch: {

    },

    methods: {
        resetEvent() {
            (ViewController.getInstance().viewHandler as SpringViewHandler).reset();
        },
    }
});
</script>

<style scoped="scoped">
  .button_Image{
      position: absolute;
      bottom: 24px;
      right: 24px;
      z-index: 2;
  }

  .enableAnim:hover{
      cursor: pointer;
  }

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
      height: 26.4%;
      position: absolute;
      bottom: 84px;
      right: 24px;
  }

  .image_one{
      height: 100%;
  }

</style>
