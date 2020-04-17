<template>
    <div class="aspectration bg_white covered root_div_container ">
        <fullScreens_layout>
            <template slot="viewBox" slot-scope="viewBox">
                <div style="width: 100%; height: 100%; position: absolute; background-color: #44989B">
                    <span class="title_induction">{{lang.title}}</span>
                    <div id="container" style="position: relative; width: 100%; height: 100%;">
                    </div>
                    <div class="buttonStyle" style="position: absolute; width: 80px; height: 40px ; top: 70%; right: 10%;" @click="buttonClickEvent1">
                        <i_button style="width: 100% ; height: 80% ; font-size: 16px; padding-top: 9px;" :title="lang.button[0]" v-bind:clickNumber.sync="clickNumber1" v-bind:isActive.sync="isActive1">
                        </i_button>
                    </div>
                </div>

            </template>
        </fullScreens_layout>
    </div>
</template>

<script lang='ts'>
    import Vue from "vue";
    import "../../../../src/assets/css/core.css";
    import "../../../../src/assets/css/layout.css";
    import fullScreens_layout from "../../../../src/component/layout/fullScreens_layout.vue";
    import {ViewModel} from "./ViewModel";
    import Component from "vue-class-component";
    import "vue-slider-component/dist-css/vue-slider-component.css";
    import "vue-slider-component/theme/default.css";
    import i_button from '../../../../src/component/ui/buttonEllipse';


    @Component({
        components: {
            fullScreens_layout,
            i_button
        },
        mixins: [ViewModel]
    })
    export default class App extends Vue {
    }
</script>

<style scoped='scoped'>
    .title_induction {
        width: 100%;
        font-family: PingFangSC-Medium;
        font-size: 28px;
        color: #FFFFFF;
        line-height: 28px;
        position: absolute;
        left: 32px;
        top: 32px;
        z-index: 99;
    }

    @media screen and (max-width: 900px) {
        .title_induction {
            font-size: 12px;
            left: 10px;
            top: 10px;
        }
    }
</style>
<style>

    #reset {
        z-index: 99;
    }

    canvas {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }

    .button{
        background: #FFE691;
    }
</style>
