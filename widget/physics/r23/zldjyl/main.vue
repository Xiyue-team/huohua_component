<template>
  <div class="aspectration bg_white covered root_div_container " style="background: #53585F">
      <fullScreensLayout >
              <template slot="viewBox" slot-scope="viewBox" >
                  <div class="title_text">直流电动机原理</div>
                  <div id="3dContainer" style="background: #53585F">
                        <canvas id="canvas" width="100%" height="100%"></canvas>
                  </div>
                  <div class="forcePlay_button"><span>暂停</span></div>
                  <div class="forceControl_button"><span>力的示意</span></div>
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
        color: #ffffff;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }
    .forceControl_button{
        width:96px;
        height:42px;
        position: absolute;
        bottom: 24px;
        right: 24px;
        font-size: 18px;
        color: #1A1A1A;
        text-align: center;
        background: #FFFFFF;
        border-radius: 6px;
        z-index: 10;
    }
    .forceControl_button span{
        display: block;
        padding-top: 8px;
    }

    .forceControl_button.active{
        color: #FFFFFF;
        background: #0199FF;
    }
    .forcePlay_button{
        width:96px;
        height:42px;
        position: absolute;
        bottom: 80px;
        right: 24px;
        font-size: 18px;
        color: #1A1A1A;
        text-align: center;
        background: #FFFFFF;
        border-radius: 6px;
        z-index: 10;
    }
    .forcePlay_button span{
        display: block;
        padding-top: 8px;
    }
    .forcePlay_button.active{
        color: #FFFFFF;
        background: #0199FF;
    }
</style>
<style>
.canvas-container {
    margin: 0 auto;
}
.view_div_content {
    background: #53585F !important;
}
</style>
