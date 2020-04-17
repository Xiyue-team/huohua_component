<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <div style="width: 100%; height: 100%; position: absolute; background-color: #ffffff">
          <span class="title_induction">{{lang.title}}</span>
          <div id="box" style="position: absolute; width: 100%; height: 100%;">
            <canvas width="1200" height="675" id="cardImageCanvas" ></canvas>
          </div>
        </div>
        <div class="btn_group">
          <button class="custom_btn" type="button" :class="{'custom_btn_blue': upStatus}" @click="externalEar()">{{lang.button[0]}}</button>
          <button class="custom_btn" type="button" :class="{'custom_btn_blue': suspensionStatus}" @click="middleEar()">{{lang.button[1]}}</button>
          <button class="custom_btn" type="button" :class="{'custom_btn_blue': downStatus}"@click="innerEar()">{{lang.button[2]}}</button>
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
    fullScreens_layout,
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
    color: #737474;
    line-height: 28px;
    position: absolute;
    left: 32px;
    top: 32px;
    z-index: 99;
  }

  .custom_btn_blue {
    pointer-events: none;
    cursor: default;
  }

  .custom_btn {
    width: 72px;
    height: 42px;
    border-radius: 21px;
    font-size: 16px;
    color: #545454;
    background-color: white;
    border: 1px solid #EBEBEB;
  }

  .custom_btn:not(:first-child) {
    margin-top: 18px;
  }

  .btn_group {
    position: absolute;
    right: 82px;
    top: calc(50% - 80px);
    width: 72px;
  }
  .custom_btn:hover {
    cursor: pointer;
  }

</style>
<style>
    .control-panel_div_floatRight {
      display: none;
    }

    #box {
        position: absolute;
    }

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
