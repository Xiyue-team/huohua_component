<template>
    <div class="aspectration bg_white covered root_div_container ">
        <fullScreens_layout>
            <template slot="viewBox" slot-scope="viewBox">
                <div style="width: 100%; height: 100%; position: absolute; background-color: #2C2C2C">
                    <span class="title_induction">{{lang.title}}</span>
                    <div id="container" class="container-div"></div>

                    <div class="sliderStyle1" >
                        <div  @click="buttonClickEvent1">
                            <i_button class="button1"   :title="lang.button[0]"
                                      v-bind:isActive.sync="isActive1" v-bind:clickNumber.sync="clickNumber1">
                            </i_button>
                        </div>
                    </div>
                    <div class="sliderStyle2">
                        <div  @click="buttonClickEvent2">
                            <i_button  class="button2"  :title="lang.button[1]"
                                       v-bind:isActive.sync="isActive2" v-bind:clickNumber.sync="clickNumber2">
                            </i_button>
                        </div>
                    </div>

                </div>
            </template>
        </fullScreens_layout>
    </div>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import fullScreens_layout from '../../../../src/component/layout/fullScreens_layout.vue';
    import { ViewModel } from './ViewModel';
    import Component from 'vue-class-component';
    import 'vue-slider-component/dist-css/vue-slider-component.css'
    import 'vue-slider-component/theme/default.css'
    import i_button from "./buttonInXAxis.vue";

    @Component({
        components: {
            fullScreens_layout,
            i_button
        },
        mixins: [ViewModel]
    })
    export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_induction{
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

    .sliderStyle1 {
        position: absolute;
        width: 150px;
        height: 159px ;
        bottom: 14%;
        right: 10%;
        top: 65%;
    }
    .sliderStyle2 {
        position: absolute;
        width: 150px;
        height: 159px ;
        bottom: 12.74%;
        right: 10%;
        top: 75%;
    }
    .button1 {
        width: 100%;
        height: 43px ;
        margin: 5px;
        font-size: 16px;
    }
    .button2 {
        width: 100%;
        height: 43px ;
        margin: 5px;
        font-size: 16px
    }

    @media screen and (max-width: 1700px) {
        .sliderStyle1 {
            position: absolute;
            width: 150px;
            height: 159px ;
            bottom: 14%;
            right: 10%;
            top: 65%;
        }
        .sliderStyle2 {
            position: absolute;
            width: 150px;
            height: 159px ;
            bottom: 12.74%;
            right: 10%;
            top: 77%;
        }
    }

    @media screen and (max-width: 1450px) {
        .sliderStyle1 {
            right: 10%;
            top: 65%;
            transform: scale(0.90);
        }
        .sliderStyle2 {
            right: 10%;
            top: 77%;
            transform: scale(0.90);
        }
    }

    @media screen and (max-width: 1200px) {
        .sliderStyle1 {
            right: 10%;
            top: 63%;
            transform: scale(0.8);
        }
        .sliderStyle2 {
            right: 10%;
            top: 75%;
            transform: scale(0.8);
        }
    }

    @media screen and (max-width: 950px) {
        .sliderStyle1 {
            right: 10%;
            top: 61%;
            transform: scale(0.7);
        }
        .sliderStyle2 {
            right: 10%;
            top: 73%;
            transform: scale(0.7);
        }
    }

    @media screen and (max-width: 700px) {

        .sliderStyle1 {
            right: 10%;
            top: 59%;
            transform: scale(0.6);
        }
        .sliderStyle2 {
            right: 10%;
            top: 71%;
            transform: scale(0.6);
        }
    }

    /*@media screen and (max-width: 550px) {*/
    /*    .sliderStyle1 {*/
    /*        right: 10%;*/
    /*        top: 57%;*/
    /*        transform: scale(0.5);*/
    /*    }*/
    /*    .sliderStyle2 {*/
    /*        right: 10%;*/
    /*        top: 69%;*/
    /*        transform: scale(0.5);*/
    /*    }*/
    /*}*/

    #container{
        margin: 0 auto;
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
