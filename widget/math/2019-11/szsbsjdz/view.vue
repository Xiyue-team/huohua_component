<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <div style="width: 100%; height: 100%; position: absolute; background-color: #2c2c2c">
          <span class="title_induction">{{title}}</span>
          <div id="container" style="position: absolute; width: 100%; height: 100%;">
        </div>
          <div class="sliderStyle" v-bind:class="{'sliderStylePhone': isPhone}">
            <div style="position: absolute; width: 112px ; height: 43px ; top: 65.2%; right: 2.7%;" @click="buttonClickEvent1">
              <i_button  id="orign"  class="button"  :title="buttonTitle1"
                         v-bind:isActive.sync="isActive1" v-bind:clickNumber.sync="clickNumber1" >
              </i_button>
            </div>
          </div>
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
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'
import i_button from './buttonView.vue';

@Component({
  components: {
    fullScreens_layout,
    i_button
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
  .title_induction{
    width: 100%;
    font-family: PingFangSC-Medium,serif;
    font-size: 32px;
    color: #f2f4f4;
    line-height: 40px;
    position: absolute;
    z-index: 99;
  }

    .title_induction {
      font-size: 33px;
      left: 35px;
      top: 28px;
    }
  /*基础按钮*/
  .button:hover {
    cursor: pointer;
  }

  .orignbutton {
    width: 20%;
    height: 30%;
    font-size: 10px;
  }

  .button {
    width: 100%;
    height: 100%;
    font-size: 16px;
  }

  .button.active{
    background: #179DF5;
    color: #FFFFFF;
  }

  @media screen and (max-width: 1200px){
    .title_induction {
      font-size: 25px;
      left: 25px;
      top: 18px;
    }
    .button {
      width: 85%;
      height: 90%;
      font-size: 14px;
    }
  }

  @media screen and (max-width: 900px){
    .title_induction {
      font-size: 21px;
      left: 21px;
      top: 14px;
    }

    .button {
      width: 66%;
      height: 92%;
      font-size: 10px;
    }
  }

</style>
<style>
    #reset {
        z-index: 99;
    }
</style>
