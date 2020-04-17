<template>
  <div class="aspectration bg_white covered root_div_container " style="background: #53585F">
      <fullScreensLayout >
              <template slot="viewBox" slot-scope="viewBox" >
                  <div class="title_text">{{title}}</div>
                  <div style="width: 100%; height: 100%;overflow: hidden;background: #2b2b2b">
                      <div class="rightLayout">
                          <div class="imageLayout" @click="changeImageEvent(0)" v-bind:class="{ 'active' : activeIndex == 0}">
                              <img src="./sub_static/beans.png" ondragstart="return false;">
                          </div>
                          <div class="imageLayout" @click="changeImageEvent(1)" v-bind:class="{ 'active' : activeIndex == 1}">
                              <img src="./sub_static/chili.png" ondragstart="return false;">
                          </div>
                          <div class="imageLayout" @click="changeImageEvent(2)" v-bind:class="{ 'active' : activeIndex == 2}">
                              <img src="./sub_static/radish.png" ondragstart="return false;">
                          </div>
                          <div class="imageLayout" @click="changeImageEvent(3)" v-bind:class="{ 'active' : activeIndex == 3}">
                              <img src="./sub_static/mosquitoes.png" ondragstart="return false;">
                          </div>
                          <div class="imageLayout" @click="changeImageEvent(4)" v-bind:class="{ 'active' : activeIndex == 4}">
                              <img src="./sub_static/cockroach.png" ondragstart="return false;">
                          </div>
                          <div class="imageLayout" @click="changeImageEvent(5)" v-bind:class="{ 'active' : activeIndex == 5}">
                              <img src="./sub_static/bee.png" ondragstart="return false;">
                          </div>
                          <div class="imageLayout" @click="changeImageEvent(6)" v-bind:class="{ 'active' : activeIndex == 6}">
                              <img src="./sub_static/butterfly.png" ondragstart="return false;">
                          </div>
                          <div class="imageLayout" @click="changeImageEvent(7)" v-bind:class="{ 'active' : activeIndex == 7}">
                              <img src="./sub_static/ant.png" ondragstart="return false;">
                          </div>
                          <div class="imageLayout" @click="changeImageEvent(8)" v-bind:class="{ 'active' : activeIndex == 8}">
                              <img src="./sub_static/leaf.png" ondragstart="return false;">
                          </div>
                          <div class="imageLayout" @click="changeImageEvent(9)" v-bind:class="{ 'active' : activeIndex == 9}">
                              <img src="./sub_static/fly.png" ondragstart="return false;">
                          </div>
                      </div>
                      <div class="leftLayout">
                          <div class="centerLayout">
                              <img src="./sub_static/beans_micro.png" ondragstart="return false;">
                          </div>
                          <div class="leftText">{{observeText}}</div>
                      </div>

                      <div id="3dContainer" style="position: absolute; top: 0;left:0px"></div>
                  </div>

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
        z-index: 99;
    }
    .leftLayout{
        position: absolute;
        top: 0;
        left: 0;
        width:76.2%;
        height: 100%;
    }
    .centerLayout{
        position: absolute;
        left: calc(50% - 215px);
        top: calc(50% - 215px);
        width:430px;
        height: 430px;
        border-radius: 50%;
        background: rgba(255,255,255,0.20);

    }
    .centerLayout img{
        width:100%;
        height: 100%;
    }
    .leftText{
        position: absolute;
        width: 100%;
        top: calc(50% + 235px);
        font-size: 28px;
        color: #FFFFFF;
        text-align: center;
    }
    .rightLayout{
       position: absolute;
       right: 0px;
       top: 0px;
       width: 23.8%;
       height: 100%;
       background: #4E4E4E;
       overflow-x: hidden;
       overflow-y: auto;
    }
    .imageLayout{
       width:60%;
       margin: 8% 20%;
       cursor: pointer;
       box-sizing: border-box;
       border-radius: 12px;
    }
    .imageLayout.active{
        border: 6px solid #0091FF;
    }
    .imageLayout img{
        width: 100%;
        height: 100%;
        border-radius: 6px;
    }
    .rightLayout::-webkit-scrollbar {
        display: none;
    }
    @media screen and (max-width: 610px), screen and (max-height: 610px) {
        .title_text {
            top: 12px;
            left: 12px;
            line-height: 18px;
            font-size: 18px;
        }
        .leftText{
            font-size: 18px;
        }
    }
</style>
<style>
.control_div_resetBtn {
    display: none;
}
</style>
