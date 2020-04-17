<template>
    <div id="pinmu" class="aspectration bg_white covered root_div_container ">
        <exerciseLayout v-bind="exerciseOption">
            <template slot="box" slot-scope="box">
                <div id="box" style="width: 100%;height: 100%;display: flex">
                    <div style="position: absolute; z-index: 2; bottom: 16px; right: 16px; width: 100px; height: 50px;">
                        <div v-on:click="cuttingEvent" v-show="showButton1">
                            <h_button class="h_button1" style="margin-bottom: 0px; margin-right: 0" title="堆积"
                                      v-bind:isActive.sync="isActive2"
                                       v-bind:clickNumber.sync="clickNumber2"
                                      v-bind:disabled.sync="disable">
                            </h_button>
                        </div>
                        <div v-on:click="duijiEvent" v-show="showButton2">
                            <h_button class="h_button1" style="margin-bottom: 0px; margin-right: 0" title="堆积"
                                      v-bind:isActive.sync="isActive3"
                                      v-bind:clickNumber.sync="clickNumber3"
                                      v-bind:disabled.sync="disable2">
                            </h_button>
                        </div>
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

    @Component({
        components: {
            exerciseLayout,
            h_button

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
