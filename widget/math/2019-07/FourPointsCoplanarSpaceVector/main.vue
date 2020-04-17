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
.title_text {
  font-size: 24px;
  line-height: 24px;
  color: #fff;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 3;
}


</style>
