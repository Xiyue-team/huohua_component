<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <leftAndRightLayout >
            <template slot="viewBox" scope="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">NH₃和H₂O的结构比较</span>
                <div style="width: 100%; height: 100%; display: flex">
                    <div  id="3dContainer" style="margin: auto;width: 100%;height: 100%">

                    </div>
                </div>
            </template>
            <template slot="controlPanel" scope="viewBox" slot-scope="controlPanel">
                <div style="display: flex; height: 100%;">
                    <div style="width: 110px; position: absolute; bottom: calc(10% - 20px);right:12px ">
                        <div @click="addHEvent">
                            <p_button style="width: 110px; margin-top: 0px; margin-right: 0px" v-bind:title="newTitle1" type="ellipse" @click.native="newTitle1 = '构建分子'" v-bind:disabled="addHDisable">

                            </p_button>
                        </div>

                        <div @click="showBondAngle">
                            <p_button style="width: 110px; margin-top: 12px" v-bind:title="newTitle2" type="ellipse"
                                      @click.native="newTitle2 = '键角'" v-bind:disabled="disable" v-bind:actived="showBondAngleActived" >
                            </p_button>
                        </div>

                        <div @click="showElectronics">
                            <p_button style="width: 110px; margin-top: 12px" v-bind:title="newTitle3" type="ellipse"
                                      @click.native="newTitle3 = '孤对电子'" v-bind:disabled="disable" v-bind:actived="showElectronicsActived">
                            </p_button>
                        </div>

                        <div @click="contrastAnimation">
                            <p_button style="width: 110px; margin-top: 12px" v-bind:title="newTitle4" type="ellipse"
                                      @click.native="newTitle4 = '结构对比'" v-bind:disabled="disable" v-bind:actived="contrastAnimationActived">
                            </p_button>
                        </div>
                    </div>
                </div>
            </template>
        </leftAndRightLayout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import leftAndRightLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
    import Component from 'vue-class-component';
    import { MainVueComponent } from './mainVueComponent';
    import p_button from '../../../../src/component/ui/buttonPrimary.vue';

    @Component({
      components: {
        vueSlider,
        p_button,
        leftAndRightLayout,
      },
      mixins: [MainVueComponent]
    })
    export default class App extends Vue {}
</script>

<style scoped="scoped">
    body{
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    .title_text{
        font-size: 24px;
        color: #000000;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }
</style>
