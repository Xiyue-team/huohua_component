<template>
    <div id="pinmu" class="aspectration bg_white covered root_div_container ">
        <exerciseLayout v-bind="exerciseOption">
            <template slot="box" slot-scope="box">
                <div  id="box" style="width: 100%;height: 100%;display: flex">
                    <div class="model_content">
                        <div  id="3dContainer" class="model3d_content transtaion_animation2" style="">

                        </div>

                        <div class="sliderOne_Class" v-show="sliderOneShow">
                            <span style="position: absolute; bottom: 40px;left: -40px; color: #000; font-family: 'Times New Roman'; font-style: italic; font-size: 28px">m</span>
                            <span style="position: absolute; bottom: 25px;left: -10px; color: #CCCCCC">-10</span>
                            <vue-slider ref="slider1th" v-model="sliderOneNumber" v-bind="sliderOption" style="position: absolute; bottom: 41px; right: 14px;">
                            </vue-slider>
                            <span style="position: absolute; bottom: 25px;left: 150px; color: #CCCCCC">10</span>
                        </div>

                        <div class="sliderTwo_Class" v-show="sliderTwoShow">
                            <span style="position: absolute; bottom: 40px;left: -40px; color: #000; font-family: 'Times New Roman'; font-style: italic; font-size: 28px">α</span>
                            <span style="position: absolute; bottom: 25px;left: -10px; color: #CCCCCC">0</span>
                            <vue-slider ref="slider2th" v-model="sliderTwoNumber" v-bind="sliderOption2" style="position: absolute; bottom: 41px; right: 14px;">
                                <template slot="tooltip" scope="tooltip">
                                    <div class="custom-tooltip" style="color: #000">
                                        {{tooltip.value + '°'}}
                                    </div>
                                </template>
                            </vue-slider>
                            <span style="position: absolute; bottom: 25px;left: 150px; color: #CCCCCC">359</span>
                        </div>

                        <div class="sliderThree_Class" v-show="sliderThreeShow">
                            <span style="position: absolute; bottom: 40px;left: -40px; color: #000; font-family: 'Times New Roman'; font-style: italic; font-size: 28px">k</span>
                            <span style="position: absolute; bottom: 25px;left: -10px; color: #CCCCCC">-10</span>
                            <vue-slider ref="slider3th" v-model="sliderThreeNumber" v-bind="sliderOption3" style="position: absolute; bottom: 41px; right: 14px;">
                            </vue-slider>
                            <span style="position: absolute; bottom: 25px;left: 150px; color: #CCCCCC">10</span>
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
    import exerciseLayout from '../../../../src/component/layout/exercise_layout.vue';
    import Component from 'vue-class-component';
    import { MainVueComponent } from './mainVueComponent';
    import vueSlider from '../../../../src/component/ui/vue2-slider.vue';

    @Component({
          components: {
            h_button,
            exerciseLayout,
            vueSlider
          },
          mixins: [MainVueComponent]
    })
    export default class App extends Vue {}
</script>

<style scoped="scoped">
    .transtaion_animation2 {
        transition: all 0.3s  ease-in-out;
    }

    .enableAnim:hover{
        cursor: pointer;
    }

    .model_content{
        width: 100%;
        height: 100%;
    }

    .model3d_content{
        position: relative;
    }

    .sliderOne_Class {
        position: absolute;
        bottom: 38px;
        right: 24px;
        width: 180px;
    }

    .sliderTwo_Class {
        position: absolute;
        bottom: 38px;
        right: 24px;
        width: 180px;
    }

    .sliderThree_Class {
        position: absolute;
        bottom: 38px;
        right: 24px;
        width: 180px;
    }

</style>
