<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">探究奇函数</div>
                  <img src="./sub_static/definition.png" alt="" class="definition"  v-bind:class="{'definitionMobile': isMobile}" v-show="delimit">
                  <buttonPrimary class="button1" v-bind:title="buttonTitle" v-bind:class="{'button1Mobile': isMobile}" v-bind:actived="symmetry" type="ellipse" @click.native="buttonEvent()">
                  </buttonPrimary>
                  <buttonPrimary class="button2" v-bind:title="definition" v-bind:class="{'button_Mobile': isMobile}" v-bind:actived="delimit" type="ellipse" @click.native="isShowDefinition()">
                  </buttonPrimary>
                  <div class="selectStyle" v-bind:class="{'selectMobile': isMobile}">
                      <div class="select_math_div" @click="selectIsShow()">
                          <img class="select_arrow_img" src="./sub_static/arrow.png" />
                          <img class="select_one_img" src="./sub_static/func1.png" />
                      </div>

                      <div class="option_math_div">
                          <div class="optionDiv1" @click="selectOption1()">
                              <img class="option_one_img" style="margin-top: -1px" src="./sub_static/wfunc1.png" />
                          </div>
                          <div class="optionDiv2" @click="selectOption2()">
                              <img class="option_two_img" src="./sub_static/func2.png" />
                          </div>
                      </div>
                  </div>
                  <div id="3dContainer"></div>
              </template>
              <template slot="controlPanel" slot-scope="controlPanel" style="width: 100%; height: 100%">
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


    .select_math_div{
        position: absolute;
        top:0px;
        background: #EBEBEB;
        border-radius: 21px;
        width: 104px;
        height: 42px;
    }
    .select_math_div:hover{
        cursor: pointer;
    }
    .select_math_div div {
        width: 108px;
        height: 42px;
        background: #EBEBEB;
        border-radius: 21px;
        border-radius: 21px;
    }
    .select_arrow_img{
        width: 16px;
        height: 14.5px;
        position:absolute;
        bottom: 11.5px;
        left: 82px;
    }

    .select_one_img {
        width: 56px;
        margin-top: 12px;
        margin-left: 20px;
    }
    .option_math_div{
        position: absolute;
        top: 0px;
        background: #EBEBEB;
        border-radius: 21px;
        width: 108px;
        height: 84px;
        display: none;
    }
    .option_math_div div {
        width: 108px;
        height: 42px;
        border-radius: 21px;
        border-radius: 21px;
        position: relative;
    }
    .option_math_div img{
        width: 56px;
        position: absolute;
        left: 24px;

    }

    .option_math_div img:hover{
        cursor: pointer;
    }
    .optionDiv1 {
        background: #00aaff;
    }
    .option_one_img {
        top: 12px;
    }
    .option_two_img {
        top: 8px;
    }
    .definition {
        position: absolute;
        width: 355px;
        right: 32px;
        bottom: 92px;
    }

    .button1 {
        position: absolute;
        top: 38.2%;
        right: 24px;
    }
    .button2 {
        position: absolute;
        top: calc(38.2% + 60px);
        right: 24px;
    }
    .selectStyle {
        width: 104px;
        height: 42px;
        position:absolute;
        top: calc(38.2% + 120px);
        right: 24px;
    }

    .button1Mobile {
        top: 21%;
        right: 12px;
    }

    .button_Mobile {
        top: calc(21% + 48px);
        right: 12px;
    }

    .selectMobile {
        top: calc(21% + 96px);
        right: 12px;
    }
    .definitionMobile {
        position: absolute;
        width: 177px;
        right: 12px;
        top: calc(21% + 180px);
    }
</style>
<style>

</style>
