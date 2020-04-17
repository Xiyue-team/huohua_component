<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">
                      {{title}}
                  </div>
                  <div class="formulaText">
                      {{formulaTitle}}
                  </div>
                  <div id="3dContainer"></div>
                  <label for="checkbox-1" id="s1" class="control-block_div_border switch">
                      <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" v-model="powerArm">
                      <label for="checkbox-1"><span style="font-size: 16px;color: #000000">{{powerArmTitle}}</span></label>
                  </label>

                  <label for="checkbox-2" id="s2" class="control-block_div_border switch">
                      <input type="checkbox" name="checkbox-cats[]" id="checkbox-2" v-model="resistanceArm">
                      <label for="checkbox-2"><span style="font-size: 16px;color: #000000">{{resistanceArmTitle}}</span></label>
                  </label>
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
import h_switch from '../../../../src/component/ui/switch.vue';

@Component({
  components: {
    fullScreensLayout,
    buttonPrimary,
    h_switch
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_text{
        font-size: 24px;
        color: #000000;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:32px;
        left:32px;
    }

    .formulaText{
        position: absolute;
        left: 32px;
        top: 92px;
        font-size: 22px;
        color: #525252;
        text-align: center;
        line-height: 22px;
    }

    #s1{
        position: absolute;
        width: 150px;
        right: 24px;
        bottom: 120px;
        border-radius: 12px;
    }

    #s2{
        position: absolute;
        width: 150px;
        right: 24px;
        bottom: 50px;
        border-radius: 12px;
    }

</style>

