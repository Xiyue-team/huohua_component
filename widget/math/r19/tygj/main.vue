<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
       <exerciseLayout v-bind="exerciseOption">
            <template slot="box" slot-scope="box">
                <div  id="box" style="width: 100%;height: 100%;display: flex">
                    <div class="model_content" style="width: 100%;height: 100%;display: flex">
                        <div id="3dContainer" class="model3d_content transtaion_animation2" style="width: 100%;height: 100%;display: flex">
                          <h_button title="绘制" class="drawEllipse" v-show="showDraw" @click.native="drawEllipse"></h_button>
                        </div>
                    </div>
                </div>
            </template>

        </exerciseLayout>
    </div>
</template>

<script lang="ts">
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import exerciseLayout from '../../../../src/component/layout/exercise_layout.vue';
import h_button from '../../../../src/component/ui/button.vue';
import Component from 'vue-class-component';
import { MainVueComponent } from './mainVueComponent';

@Component({
  components: {
    exerciseLayout,
    h_button
  }
})
export default class App extends MainVueComponent {}
</script>

<style scoped="scoped">
* {
  margin: 0;
  padding: 0;
}

body {
  overflow: hidden !important;
  overflow-x: hidden;
  overflow-y: hidden;
}

ul,
ol,
li {
  list-style: none;
}
.drawEllipse{
  position: fixed;
  bottom: 20px;
  right:20px;
  padding: 7px 10px;
}
</style>
