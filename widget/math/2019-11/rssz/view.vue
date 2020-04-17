<template user-scalable=no>
    <div class="aspectration bg_white covered root_div_container " user-scalable=no>
        <fullScreens_layout>
            <template slot="viewBox" slot-scope="viewBox">
                <div style="width: 100%; height: 100%; position: absolute; background-color: #2d2d2d">
                    <span class="title_induction">{{title}}</span>
                    <div id="rszbz" style="position: absolute; width: 100%; height: 100%; ">
                    </div>
                    <div class="sliderStyle" >
                        <div  @click="buttonClickEvent1" >
                            <i_button  id="orign"  class="orignbutton"  :title="buttonTitle1"
                                      v-bind:isActive.sync="isActive1" v-bind:clickNumber.sync="clickNumber1"  >
                            </i_button>
                        </div>
                        <div  @click="buttonClickEvent2">
                            <i_button id="positiveDirection " class="positiveDirectionbutton"  :title="buttonTitle2"
                                      v-bind:isActive.sync="isActive2" v-bind:clickNumber.sync="clickNumber2">
                            </i_button>
                        </div>
                        <div  @click="buttonClickEvent3">
                            <i_button id="unitLength"  class="unitLength"  :title="buttonTitle3"
                                      v-bind:isActive.sync="isActive3" v-bind:clickNumber.sync="clickNumber3">
                            </i_button>
                        </div>
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
    import i_button from "./buttonInXAxis.vue";

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
        color: #ffffff;
        line-height: 28px;
        position: absolute;
        left: 32px;
        top: 32px;
        z-index: 99;
    }
    .sliderStyle {
        position: absolute;
        width: 112px ;
        height: 159px ;
        bottom: 12.74%;
        right: 2.7%;
    }
    .orignbutton {
        width: 100% ;
        height: 43px ;
        margin: 5px;
        font-size: 16px
    }
    .positiveDirectionbutton {
        width: 100% ;
        height: 43px ;
        margin: 5px ;
        font-size: 16px
    }
    .unitLength {
        width: 100% ;
        height: 43px ;
        margin: 5px;
        font-size: 16px
    }


    @media screen and (max-width: 900px ) {
        .title_induction {
            font-size: 20px;
            left: 10px;
            top: 10px;
        }
        .sliderStyle {
            position: absolute;
            width:90px ;
            height: 110px ;
            bottom: 10.74%;
            right: 2.7%;
        }
        .orignbutton {
            width: 100% ;
            height: 37px ;
            margin: 3px;
            font-size: 13px
        }
        .positiveDirectionbutton {
            width: 100% ;
            height: 37px ;
            margin: 3px;
            font-size: 13px
        }
        .unitLength {
            width: 100% ;
            height: 37px ;
            margin: 3px;
            font-size: 13px
        }
    }

</style>

<style>
    #box {
        position: absolute;
        z-index: 98;
    }
    .control-panel_div_floatRight {
        display: none;
    }

    #container {
        position: absolute;
        z-index: 98;
    }

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
