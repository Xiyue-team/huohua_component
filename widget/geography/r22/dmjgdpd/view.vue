<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <span class="title_induction">几种常见地貌景观的判断</span>
        <div id="box" style="width: 100%; height: 100%"></div>
      </template>

      <template slot="controlPanel" slot-scope="controlPanel">
        <div  id="controlPanel" >

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

@Component({
  components: {
    fullScreens_layout
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
  .title_induction{
    width: 520px;
    height:100px;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #000000;
    line-height: 24px;
    position: absolute;
    left: 24px;
    top: 24px;
  }
</style>
<style>

  .konvajs-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
