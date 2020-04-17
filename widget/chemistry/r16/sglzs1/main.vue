<template>
  <div id="pinmu" class="aspectration bg_white covered root_div_container ">
    <exerciseLayout v-bind="exerciseOption">
      <template slot="box" slot-scope="box">
        <div  id="box" style="width: 100%;height: 100%;display: flex">
            <div class="style1" v-bind:class="{'style1_mobile': ismobile}" >
                <div class="text_style" v-bind:class="{'text_style_mobile': ismobile}">
                    <img src="./sub_static/zlzs.png"style="width: 80px;height: 16px;" alt="">
                </div>
                <buttonPrimary title="1" type="ellipse" v-bind:disabled="disable1" @click.native="click4" v-bind:actived.sync="hideCtrl4" class="button_style" v-bind:class="{'button_style_mobile': ismobile}"></buttonPrimary>
                <buttonPrimary title="2" type="ellipse" v-bind:disabled="disable2" @click.native="click5" v-bind:actived.sync="hideCtrl5" class="button_style" v-bind:class="{'button_style_mobile': ismobile}"></buttonPrimary>
                <buttonPrimary title="3" type="ellipse" v-bind:disabled="disable3" @click.native="click6" v-bind:actived.sync="hideCtrl6"></buttonPrimary>
            </div>

            <div class="style2" v-bind:class="{'style2_mobile': ismobile}">
                <div class="text_style" v-bind:class="{'text_style_mobile': ismobile}">
                    <img src="./sub_static/jlzs.png" style="width: 77px;height: 16px;" alt="">
                </div>
                <buttonPrimary title="0" type="ellipse" v-bind:disabled="disable4" @click.native="click1" v-bind:actived.sync="hideCtrl1" class="button_style"  v-bind:class="{'button_style_mobile': ismobile}"></buttonPrimary>
                <buttonPrimary title="1" type="ellipse" v-bind:disabled="disable5" @click.native="click2" v-bind:actived.sync="hideCtrl2" class="button_style"  v-bind:class="{'button_style_mobile': ismobile}"></buttonPrimary>
                <buttonPrimary title="2" type="ellipse" v-bind:disabled="disable6" @click.native="click3" v-bind:actived.sync="hideCtrl3"></buttonPrimary>
            </div>
            <div class="model_content">
                <div  id="3dContainer" class="model3d_content transtaion_animation2" style="">
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
import {MainVueComponent} from './mainVueComponent.ts';
import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';

@Component({
    components: {
        exerciseLayout, buttonPrimary
    },

    mixins: [MainVueComponent]
})
export default class App extends Vue {}
</script>

<style scoped="scoped">
    .transtaion_animation2 {
        transition: all 0.3s  ease-in-out;
    }

    model_content{
        width: 100%;
        height: 100%;
    }

    .model3d_content{
        position: relative;
    }

    h_button1{
        position: absolute;
        bottom: 2.8%;
        right: 16px;
        z-index: 2;
    }

    .text_style {
        text-align: right;
        margin-bottom: 12px;
    }

    .text_style_mobile {
        line-height: 12px;
        margin-bottom: 8px;
    }

    .style1 {
        position: absolute;
        bottom: 154px;
        right: 24px;
        height: 40px;
        z-index: 2;
    }
    .style1_mobile {
        right: 12px;
        bottom: 110px;
    }
    .style2 {
        position: absolute;
        bottom: 58px;
        right: 24px;
        height: 40px;
        z-index: 2;
    }
    .style2_mobile {
        right: 12px;
        bottom: 34px;
    }

    .button_style {
        margin-right: 8px;
    }
    .button_style_mobile {
        margin-right: 4px;
    }

</style>
