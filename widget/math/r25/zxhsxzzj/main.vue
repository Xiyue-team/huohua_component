<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">{{title}}</div>
                  <div class=" formulaPosition" v-bind:class="{'formulaPositionMobile': isMobile}">
                      <span class="formula">y = </span>
                      <span>sin </span>
                      <span class="formula">x</span>
                  </div>
                  <div id="3dContainer"></div>
                  <div class="controlStyle flexStyle" v-bind:class="{'mobileControlStyle': isMobile}">
                      <div class="boxSize flexBox">
                          <buttonPrimary class='buttonSize' v-bind:title="buttonTitle[4]" type="ellipse" v-bind:actived="parityActived" @click.native="parity()"></buttonPrimary>
                          <buttonPrimary class='buttonSize' v-bind:title="buttonTitle[5]" type="ellipse" v-bind:actived="periodicActived" @click.native="periodic()"></buttonPrimary>
                      </div>

                      <div class="boxSize flexBox">
                          <buttonPrimary class='buttonSize' v-bind:title="buttonTitle[2]" type="ellipse" v-bind:actived="monotonicActived" @click.native="monotonic()"></buttonPrimary>
                          <buttonPrimary class='buttonSize' v-bind:title="buttonTitle[3]" type="ellipse" v-bind:actived="symmetricCenterActived" @click.native="symmetricCenter()"></buttonPrimary>
                      </div>

                      <div class="boxSize flexBox">
                          <buttonPrimary class='buttonSize' v-bind:title="buttonTitle[0]" type="ellipse" v-bind:actived="domainActived" @click.native="domain()"></buttonPrimary>
                          <buttonPrimary class='buttonSize' v-bind:title="buttonTitle[1]" type="ellipse" v-bind:actived="symmetryAxisActived" @click.native="symmetryAxis()"></buttonPrimary>
                      </div>

                      <div class="textStyle">
                          <p class="textCentered" v-show="parityActived">
                            {{text}}
                          </p>
                          <img src="./sub_static/r.png" class="imageStyle" style="width: 20px;" alt="" v-show="domainActived">
                          <img src="./sub_static/monotonic.png" class="imageStyle" style="width: 220px;" alt="" v-show="monotonicActived">
                          <img src="./sub_static/axis.png" class="imageStyle" style="width: 228px;" alt="" v-show="symmetryAxisActived">
                          <img src="./sub_static/center.png" class="imageStyle" style="width: 202px;" alt="" v-show="symmetricCenterActived">
                          <img src="./sub_static/periodic.png" class="imageStyle" style="width: 95px;" alt="" v-show="periodicActived">
                      </div>

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
        color: #FFFFFF;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }

    .formulaPosition {
        width: 120px;
        height: 28px;
        line-height: 28px;
        position: absolute;
        top: 84px;
        left: 95px;
        font-size: 28px;
        color: #ffffff;
    }

    .controlStyle {
        width: 300px;
        height: 360px;
        background: rgba(255,255,255,0.10);
        border: 2px solid rgba(255,255,255,0.10);
        border-radius: 12px;
        border-radius: 12px;
        position: absolute;
        right: 72px;
        top: calc(50% - 180px);
    }
    .mobileControlStyle {
        transform: scale(0.5);
        top: calc(50% - 170px);
        right: -20px;
    }

    .buttonSize {
        width: 110px;
        height: 42px;
    }

    .flexStyle {
        display: flex;
        align-items: center;
        flex-direction: column-reverse;
    }

    .boxSize {
        width: 240px;
        height: 42px;
        margin-bottom: 24px;
    }

    .flexBox {
        display: flex;
        justify-content: space-between;
    }

    .textStyle{
        width: 220px;
        height: 90px;
        margin-bottom: 51px;
        display: flex;
    }

    .textCentered {
        font-size: 28px;
        color: #FFFFFF;
        margin: auto;
    }
    .imageStyle {
        margin: auto;
    }
    .formulaPositionMobile{
        top: 63px;
        left: 47px;
        transform: scale(0.5);
    }
</style>
<style scoped="scoped">
    .formula {
        font-style: italic;
        font-family: "Times New Roman";

    }
</style>
