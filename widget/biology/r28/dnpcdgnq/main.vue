<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div id="3dContainer"></div>

                  <div class="mainContainer" >
                      <div id="mainContainer">
                          <canvas id="storyCanvas" style="transform-origin: center"></canvas>
                      </div>
                  </div>
                  <div class="title_text">{{title}}</div>
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

@Component({
  components: {
    fullScreensLayout
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_text{
        font-size: 24px;
        color: #FFFFFF;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }
    .mainContainer {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url('./sub_static/background.png');
        background-size: 100% 100%;
    }
</style>
<style>

</style>
