<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">向量的概念</div>
                  <div id="3dContainer"></div>
                  <div class="buttonBox" v-bind:class="{'buttonBoxMobile': isMobile}">
                      <buttonPrimary class='' v-bind:title="concept" type="ellipse" v-bind:actived="conceptActived" @click.native="conceptEvent()"></buttonPrimary>
                      <buttonPrimary class='conceptChild' v-show="conceptActived" v-bind:title="start" type="ellipse" v-bind:actived="startActived" @click.native="startPointEvent()"></buttonPrimary>
                      <buttonPrimary class='conceptChild' v-show="conceptActived" v-bind:title="length" type="ellipse" v-bind:actived="lengthActived" @click.native="lengthEvent()"></buttonPrimary>
                      <buttonPrimary class='conceptChild' v-show="conceptActived" v-bind:title="direction" type="ellipse" v-bind:actived="directionActived" @click.native="directionEvent()"></buttonPrimary>
                      <buttonPrimary class='angleButton' v-bind:title="angle" type="ellipse" v-bind:actived="angleActived" @click.native="angleEvent()"></buttonPrimary>
                  </div>
              </template>

              <template slot="controlPanel" slot-scope="controlPanel">

              </template>
          </fullScreensLayout>

  </div>
</template>
<script src="./sub_static/index.esm.min.js"></script>
<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
import { ViewModel } from './ViewModel';
import Component from 'vue-class-component';
import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';

@Component({
  components: {
    fullScreensLayout, buttonPrimary
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_text{
        font-size: 24px;
        color: #ffffff;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }
    .buttonBox {
        position: absolute;
        right: 32px;
        top: 42.4%;
        width: 135px;
        height: 254px;
        display: flex;
        flex-direction:  column;
        align-items: flex-end;
    }
    .buttonBoxMobile {
        transform: scale(0.8);
        right: 8px;
        top: 25%;
    }

    .conceptChild {
        margin-top: 8px;
    }

    .angleButton {
        margin-top: 20px;
    }
</style>
<style>

</style>
