<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <exerciseLayout v-bind="exerciseOption">
      <template slot="box" slot-scope="box">
        <div id="box" style="width: 100%;height: 100%;display: flex">
            <div id="Container" style="width: 100%; height: 100%;">
              <div id="3dContainer" style="width: 100%; height: 100%;">
               <div id="board-container" style="width: 100%; height:100%">

               </div>
              </div>
            </div>
            <div id="fps">fps</div>
        </div>
      </template>
    </exerciseLayout>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import exerciseLayout from '../../../../src/component/layout/exercise_layout.vue';
import { ViewModel } from './ViewModel';

@Component({
  components: {
    exerciseLayout
  },
  mixins: [ViewModel]
})

export default class App extends Vue {}
</script>

<style scoped>
body {
  overflow: hidden !important;
}
#renderCanvas {
  width: 100%;
  height: 100%;
  outline: 0;
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

img {
  width: 100%;
  height: 100%;
}
#Container {
  /* background-color: #333333; */
}
#fps {
  position: absolute;
  left: 20px;
  top: 5em;
  font-size: 20px;
  color: #fff;
  text-shadow: 2px 2px 0 #000;
  display: none;
}

</style>