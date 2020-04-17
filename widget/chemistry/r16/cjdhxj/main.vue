<template>
    <div id="pinmu" class="aspectration bg_white covered root_div_container ">
        <exerciseLayout v-bind="exerciseOption">
            <template slot="box" slot-scope="box">
                <div id="box" style="width: 100%;height: 100%;display: flex">

                    <div style="position: absolute; z-index: 2; bottom: 16px; right: 24px; width: 100px; height: 90px;" v-show="showButton1">
                        <a_button v-bind:steps="stepArry" v-model="num1"></a_button>
                    </div>


                    <div class="model_content">
                        <div id="3dModel" class="model3d_content transtaion_animation2" style="">

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
    import Component from "vue-class-component";
    import {MainVueComponent} from "./mainVueComponent";
    import a_button from '../../../../src/component/ui/buttonArrow';

    @Component({
        components: {
            exerciseLayout,
            h_button,
            a_button

        },
        mixins: [MainVueComponent]
    })
    export default class App extends Vue {
    }
</script>

<style scoped="scoped">
    .transtaion_animation2 {
        transition: all 0.3s ease-in-out;
    }

    .enableAnim:hover {
        cursor: pointer;
    }

    .model_content {
        width: 100%;
        height: 100%;

    }

    .model3d_content {
        position: relative;
    }

    h_button1{
        /*position: absolute;*/
        /*bottom: 2.8%;*/
        /*right: 16px;*/
        /*z-index: 2;*/
    }

</style>
