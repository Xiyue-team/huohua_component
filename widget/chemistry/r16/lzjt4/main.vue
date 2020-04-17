<template>
    <div id="pinmu" class="aspectration bg_white covered root_div_container ">
        <exerciseLayout v-bind="exerciseOption">
            <template slot="box" slot-scope="box">
                <div id="box" style="width: 100%;height: 100%;display: flex">
                    <div style="position: absolute; z-index: 2; bottom: 16px; right: 16px; width: 100px; height: 100px;">
                        <!--<h_arrow v-bind:steps="stepArry" v-if="isStep1"></h_arrow>-->
                    </div>

                    <div class="model_content">
                        <div id="3dModel" class="model3d_content transtaion_animation2" style="">
                            <img src="./sub_static/img.png" v-show="isStep4" :style="{'width':Cw+'px','height':Ch+'px'}"
                                 class="img1"/>
                            <img src="./sub_static/mark.png" v-show="!isStep4" class="mark"/>
                        </div>
                    </div>
                </div>
            </template>

        </exerciseLayout>
    </div>
</template>


<script lang="ts">
    import Vue from "vue";
    import h_button from "../../../../src/component/ui/buttonEllipse.vue";
    import exerciseLayout from "../../../../src/component/layout/exercise_layout.vue";
    import Component from "vue-class-component";
    import {MainVueComponent} from "./mainVueComponent.ts";
    import h_arrow from "../../../../src/component/ui/buttonArrow.vue";

    @Component({
        components: {
            h_button, exerciseLayout,
            h_arrow
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

    model_content {
        width: 100%;
        height: 100%;
    }

    .model3d_content {
        position: relative;
    }

    h_button1 {
        position: absolute;
        bottom: 2.8%;
        right: 16px;
        z-index: 2;
    }

    div.model_content img {
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }



    .img1 {
        position: absolute;
        left: 50%;

        transform: translateX(-50%);
    }

    img.mark {
        position: absolute;
        width: 125px !important;
        height: 125px !important;
        top: 50% !important;
        transform: translateY(-50%) !important;
        right: 20% !important;
        /*margin-top:-15%;*/
    }
    @media screen and (max-width: 1025px) {
        img.mark{
            position: absolute;
            width: 80px !important;
            height: 80px !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) ;
            margin-left: 20% !important;
            /*margin-top: -10% !important;*/
        }

    }
    @media screen and (max-height: 500px) {
        button.begin_button {
            width: 180px !important;
        }

        div.button-arrow-content {
            transform: scale(0.8) !important;
            margin-top: 40px !important;
        }
        img.mark{
            position: absolute;
            width: 60px !important;
            height: 60px !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) ;
            margin-left: 17% !important;
            /*margin-top: -10% !important;*/
        }

    }


</style>
