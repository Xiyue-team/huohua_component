<template>
    <div id="pinmu" class="aspectration bg_white covered root_div_container ">
        <exerciseLayout v-bind="exerciseOption">
            <template slot="box" slot-scope="box">
                <div  id="box" style="width: 100%;height: 100%;display: flex">
                    <div class="model_content">
                        <div  id="3dContainer" class="model3d_content transtaion_animation2" style="">
                        </div>
                        <buttonPrimary class="buttonStyle" v-bind:title="buttonTitle" type="ellipse" v-bind:actived="drawColor" @click.native="drawEvent()" v-show="buttonShow"></buttonPrimary>
                    </div>
                </div>
            </template>
        </exerciseLayout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';
    import exerciseLayout from '../../../../src/component/layout/exercise_layout.vue';
    import Component from 'vue-class-component';
    import { MainVueComponent } from './mainVueComponent';

    @Component({
          components: {
            buttonPrimary,
            exerciseLayout,
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

    .buttonStyle {
        position: absolute;
        right: 24px;
        bottom: 24px;
    }
</style>
