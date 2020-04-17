<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">特殊向量</div>
                  <div id="3dContainer"></div>
                  <div class="buttonBox" v-bind:class="{'buttonBox_Mobile': isMobile}">
                      <buttonPrimary class='zeroButton' v-bind:title="zeroVector" type="ellipse" v-bind:actived="zeroActived" @click.native="zeroEvent()"></buttonPrimary>
                      <buttonPrimary class='zeroButton buttonMargin' v-bind:title="unitVector" type="ellipse" v-bind:actived="unitActived" @click.native="unitEvent()"></buttonPrimary>
                      <buttonPrimary class='zeroButton buttonMargin' v-bind:title="equalVector" type="ellipse" v-bind:actived="equalActived" @click.native="equalEvent()"></buttonPrimary>
                      <buttonPrimary class='zeroButton buttonMargin' v-bind:title="oppositeVector" type="ellipse" v-bind:actived="oppositeActived" @click.native="oppositeEvent()"></buttonPrimary>
                      <buttonPrimary class='parallelButton buttonMargin' v-bind:title="parallelVector" type="ellipse" v-bind:actived="parallelActived" @click.native="parallelEvent()"></buttonPrimary>
                  </div>
                  <div class="smallButton" v-bind:class="{'smallButton_Mobile': isMobile}" v-show="parallelActived">
                    <div class="textStyle" v-bind:class="{'textOpacity': !positiveActived}" @click="positiveEvent()">同向</div>
                      <div style="width: 100%;height: 1px;background: #E0E0E0;"></div>
                    <div class="textStyle" v-bind:class="{'textOpacity': !reverseActived}" @click="reverseEvent()">反向</div>
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
        top: 32%;
        right: 32px;
        height: 390px;
        width: 147px;
        display: flex;
        flex-direction:  column;
        align-items: flex-end;
    }

    .buttonBox_Mobile {
        transform: scale(0.6);
        top: 5%;
        right: -16px;
    }

    .smallButton {
        background: #EBEBEB;
        border: 1px solid rgba(0,0,0,0.12);
        border-radius: 12px;
        width: 110px;
        height: 96px;
        position: absolute;
        top: calc(32% + 194px);
        right: 212px;
    }

    .smallButton_Mobile {
        transform: scale(0.6);
        top: calc(32% + 88px);
        right: 106px;
    }

    .zeroButton {
        width: 114px;
        height: 42px;
    }

    .buttonMargin {
        margin-top: 20px;
    }

    .buttonMargin1 {
        margin-top: 8px;
    }

    .parallelButton{
        width: 157px;
        height: 42px;
    }
    .direction {
        width: 82px;
        height: 42px;
    }

    .textStyle {
        height: 48px;
        font-size: 16px;
        text-align: center;
        color: #333333;
        line-height: 48px;
    }
    .textOpacity {
        opacity: 0.4;
    }
</style>
<style>

</style>
