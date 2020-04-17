<template>
  <div id="pinmu" class="aspectration bg_white covered root_div_container ">
    <exerciseLayout v-bind="exerciseOption">
      <template slot="box" slot-scope="box">
        <div  id="box" style="width: 100%;height: 100%;display: flex">
            <div class="model_content">
                <div  id="3dContainer" class="model3d_content transtaion_animation2" style="position: relative;">
                    <div class="animation_style" v-bind:class="{'animation_style_mobile': ismobile, 'animation_style_isElectron': isElectron}" v-show="animationCtrl1">
                        <div id="lottie" style=""></div>
                    </div>
                    <div class="animation_style1" v-bind:class="{'animation_style_mobile1': ismobile, 'animation_style_isElectron1': isElectron}" v-show="animationCtrl2">
                        <div id="lottie1" style=""></div>
                    </div>
                    <div class="animation_style1" v-bind:class="{'animation_style_mobile1': ismobile, 'animation_style_isElectron1': isElectron}" v-show="animationCtrl3">
                        <div id="lottie2" style=""></div>
                    </div>

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
import {MainVueComponent} from "./mainVueComponent.ts";
import switch2 from "../../../../src/component/ui/switch2.vue";
import p_button from "../../../../src/component/ui/buttonPrimary.vue";
import keyFrameAnimation from '../../../../src/component/layout/keyFrameAnimation.vue';

@Component({
    components: {
        h_button, exerciseLayout, switch2, p_button, keyFrameAnimation
    },

    mixins: [MainVueComponent]
})
export default class App extends Vue {}
</script>

<style scoped="scoped">
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

    .animation_style {
        position: absolute;
        width: 700px;
        height: 700px;
        top: calc(50% - 350px);
        left: calc(50% - 350px)
    }

    .animation_style1 {
        position: absolute;
        width: 700px;
        height: 700px;
        top: calc(50% - 200px);
        left: calc(50% - 350px)
    }

    .animation_style_mobile {
        width: 350px;
        height: 350px;
        top: calc(50% - 175px);
        left: calc(50% - 175px);
    }

    .animation_style_mobile1 {
        width: 350px;
        height: 350px;
        top: calc(50% - 100px);
        left: calc(50% - 175px);
    }

    .animation_style_isElectron {
        width: 300px;
        height: 300px;
        top: calc(50% - 150px);
        left: calc(50% - 150px);
    }

    .animation_style_isElectron1 {
        width: 300px;
        height: 300px;
        top: calc(50% - 85px);
        left: calc(50% - 150px);
    }

    #lottie{
        background-color:#fff;
        width:100%;
        height:100%;
        display:block;
        overflow: hidden;
        transform: translate3d(0,0,0);
        text-align: center;
        opacity: 1;
    }

</style>
