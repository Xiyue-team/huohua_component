<template>
    <div class="aspectration bg_white covered root_div_container ">
        <fullScreens_layout>
            <template slot="viewBox" slot-scope="viewBox">
                <div style="width: 100%; height: 100%; position: absolute; background-color: #2d2d2d">
                    <span class="title_induction">{{lang.title}}</span>
                    <div id="container" style="position: absolute; background-color: #FC933D">
                    </div>
                    <div style="position: absolute;  height: 50px ; top: 48.1%; right: 9%;">
                        <label_switch id="switchLab" class="lab"  :height="26" :width="100" :title="lang.switchlabel" v-model="isShowLabel">
                        </label_switch>
                    </div>
                    <!--<div class="formula" v-show="isShowLabel">-->
                        <!--{{lang.formula}}-->
                    <!--</div>-->
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
    import label_switch from "./switch.vue";

    @Component({
        components: {
            fullScreens_layout,
            label_switch
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
        color: #ffffff;
        line-height: 40px;
        position: absolute;
        left: 24px;
        top: 20px;
        z-index: 99;
    }

    .formula {
        width: 343px;
        height: 38px;
        font-size: 38px;
        color: #FFFFFF;
        line-height: 38px;
        text-align: center;
        transform-origin: bottom center;
        position: absolute;
        bottom: 54px;
        left: calc(50% - 171px);
    }


    @media screen and (max-width: 900px) {
        .title_induction {
            font-size: 24px;
            left: 24px;
            top: 20px;
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
</style>
