<template>
    <div id="pinmu" class="aspectration bg_white covered root_div_container ">
        <exerciseLayout v-bind="exerciseOption" ref="model">
            <template slot="box" slot-scope="box">
                <div  id="box" style="width: 100%;height: 100%;display: flex">
                    <div class="model_content">
                        <div id="3dModel" class="model3d_content transtaion_animation2">
                            <div id="jlun" v-show="isactive">
                                <img :src="jielun" alt="" width="275px" height="78px" />
                            </div>
                            <button id="bot" v-show="jl" :class="{active: isactive}" @click="isactive=!isactive">
                                结论
                            </button>
                        </div>
                    </div>
                </div>
            </template>
        </exerciseLayout>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import exerciseLayout from '../../../../src/component/layout/exercise_layout.vue';
  import Component from 'vue-class-component';
  import {MainVueComponent} from './mainVueComponent';

  @Component({
    components: { exerciseLayout },
    mixins: [MainVueComponent]
  })
  export default class App extends Vue {}
</script>

<style scoped="scoped">
    * {
        margin: 0;
        padding: 0;
    }

    body {
        overflow: hidden !important;
    }

    .transtaion_animation2 {
        transition: all 0.3s  ease-in-out;
    }

    .model_content{
        width: 100%;
        height: 100%;
    }

    .model3d_content{
        position: relative;
    }

    #jlun {
        position: fixed;
        right: 95px;
        bottom: 20px;
    }

    #bot {
        position: fixed;
        right: 20px;
        bottom: 20px;
        height: 40px;
        width: 72px;
        border-radius: 21px;
        border: 1px solid rgba(0,0,0,0.12);
        color: black;
        background-color: white;
    }

    .active {
        color: white;
        background-color: #0199FF;
    }
</style>
