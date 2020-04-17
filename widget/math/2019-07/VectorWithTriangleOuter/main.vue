<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <exerciseLayout v-bind="exerciseOption">
      <template slot="box">
        <div id="box" style="width: 100%;height: 100%;display: flex">
            <div id="Container" style="width: 100%; height: 100%;">
              <div id="Container3d" v-bind:style="styleContainer3d">
                <canvas
                  id="renderCanvas"
                  touch-action="none"
                  width="1920"
                  height="1080"
                  tabindex="1"
                  style="opacity: 1;"
                ></canvas>
              </div>
            </div>
            <div class="button_style1" @click="ButtonEvent()">
              <buttonPrimary
                style="width: 100%"
                v-bind:title="buttonTitle"
                v-bind:actived="buttonActived"
                type="ellipse"
              ></buttonPrimary>
            </div>
                <div id="tip" v-if="buttonActived" :style="`background-image: url(${pictip})`">
          </div>
        </div>
      </template>
    </exerciseLayout>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import Component from 'vue-class-component';
import { ViewModel } from './ViewModel';
import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';
import exerciseLayout from '../../../../src/component/layout/exercise_layout.vue';
@Component({
  components: {
    exerciseLayout,
    buttonPrimary
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped="scoped">
body {
  overflow: hidden !important;
}
#renderCanvas {
  width: 100%;
  height: 100%;
  outline: 0;
}

#Container3d{
	display: block;
	margin:0 auto;
}

.button_style1 {
  position: absolute;
  width: 100px;
  height: 42px;
  bottom: 124px;
  right: 68px;
}

#tip {
  position: absolute;
  width: 528px;
  height: 40px;
  bottom: 64px;
  right: 68px;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: right top;
  background-size: contain;
}
@media screen and (min-width: 801px) and (max-width: 1024px) {
  #tip {
    width: 396px;
    height: 30px;
    bottom: 64px;
  }
  .button_style1 {
    width: 100px;
    bottom: 114px;
  }
}

@media screen and (min-width: 480px) and (max-width: 800px) {
  #tip {
    width: 264px;
    height: 22px;
    bottom: 24px;
  }
  .button_style1 {
    width: 100px;
    bottom: 64px;
  }
}


</style>
