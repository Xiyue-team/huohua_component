<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">挂钟</div>
                  <div id="3dContainer" style="width: 100%; height: 100%">

                  </div>
                  <buttonPrimary class="rotateCenter" v-bind:actived="flagOne" v-bind:title="rotCentTitle" @click.native="rotCenterEvent" type="ellipse">
                  </buttonPrimary>
                  <buttonPrimary class="rotateDirection" v-bind:actived="flagTwo" v-bind:title="rotDirTitle" @click.native="rotDirectionEvent" type="ellipse">
                  </buttonPrimary>
                  <buttonPrimary class="rotateAngle" v-bind:actived="flagThree" v-bind:title="rotAngTitle" @click.native="rotAngleEvent" type="ellipse">
                  </buttonPrimary>
              </template>
              <template slot="controlPanel" slot-scope="controlPanel">

              </template>
          </fullScreensLayout>

  </div>
</template>

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
    fullScreensLayout,
    buttonPrimary
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_text{
        font-size: 24px;
        color: #fff;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }

    .rotateCenter {
        position: absolute;
        top: 37.8%;
        right: 2.5%;
    }

    .rotateCenter:active {
        color: #000;
        background: #FFDB3B;
        border-color: #FFDB3B;
    }

    .rotateDirection {
        position: absolute;
        top: 47%;
        right: 2.5%;
    }

    .rotateDirection:active {
        color: #000;
        background: #FFDB3B;
        border-color: #FFDB3B;
    }

    .rotateAngle {
        position: absolute;
        top: 56.1%;
        right: 2.5%;
    }

    .rotateAngle:active {
        color: #000;
        background: #FFDB3B;
        border-color: #FFDB3B;
    }

    .button-ellipse.active {
        color: #000;
        background: #FFDB3B;
        border-color: #FFDB3B;
    }


</style>

