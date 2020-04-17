<template>
  <div class="aspectration bg_white covered root_div_container " style="background: #FDFDFD">
      <fullScreensLayout >
              <template slot="viewBox" slot-scope="viewBox" >
                  <div class="title_text">{{title}}</div>
                  <div id="3dContainer" style="position: absolute;width: 100%; height: 100%;z-index: 1; background: #FDFDFD">
                        <canvas id="canvas" width="1200" height="675"></canvas>
                  </div>
                  <div @click="buttonEvent">
                      <buttonPrimary class="buttonStyle"
                                     v-show="isShow"
                                     v-bind:title="buttonTitle"
                                     v-bind:actived="isActive"
                                     type="ellipse"
                      ></buttonPrimary>
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
    fullScreensLayout,buttonPrimary
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_text{
        font-size: 28px;
        color: #342D2D;
        line-height: 28px;
        margin: 0;
        padding:0;
        position: absolute;
        top:32px;
        left:32px;
        z-index: 99;
    }
    .buttonStyle{
        width: 108px;
        position: absolute;
        right: 38px;
        bottom: 85px;
        cursor: pointer;
        z-index: 1;
        -webkit-user-select: none;
    }
    @media screen and (min-width: 1320px) {
        .title_text {
            left: 32px;
            top: 32px;
            font-size: 28px;
        }
        .buttonStyle {
            transform-origin: 120% 200%;
            transform: scale(1);
        }
    }

    @media screen and (min-width: 1200px) and (max-width: 1320px) {
        .title_text {
            left: 24px;
            top: 24px;
            font-size: 24px;
        }
        .buttonStyle {
            transform-origin: 120% 200%;
            transform: scale(0.8);
        }
    }

    @media screen and (min-width: 875px) and (max-width: 1200px) {
        .title_text {
            left: 16px;
            top: 16px;
            font-size: 22px;
        }
        .buttonStyle {
            transform-origin: 120% 200%;
            transform: scale(0.7);
        }
    }

    @media screen and (min-width: 740px) and (max-width: 875px) {
        .title_text {
            left: 14px;
            top: 14px;
            font-size: 20px;
        }
        .buttonStyle {
            transform-origin: 120% 200%;
            transform: scale(0.6);
        }
    }

    @media screen and (max-width: 740px) {
        .title_text {
            left: 12px;
            top: 12px;
            font-size: 18px;
        }
        .buttonStyle {
            transform-origin: 120% 200%;
            transform: scale(0.5);
        }
    }
</style>
<style>
@media screen and (min-width: 1320px) {
    .control_div_resetBtn {
        transform-origin: right top;
        transform: scale(1);
    }
}

@media screen and (min-width: 1200px) and (max-width: 1320px) {
    .control_div_resetBtn {
        transform-origin: right top;
        transform: scale(0.8);
    }
}

@media screen and (min-width: 875px) and (max-width: 1200px) {
    .control_div_resetBtn {
        transform-origin: right top;
        transform: scale(0.7);
    }
}

@media screen and (min-width: 740px) and (max-width: 875px) {
    .control_div_resetBtn {
        transform-origin: right top;
        transform: scale(0.6);
    }
}

@media screen and (max-width: 740px) {
    .control_div_resetBtn {
        transform-origin: right top;
        transform: scale(0.5);
    }
}
</style>
