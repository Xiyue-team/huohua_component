<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">{{title}}</div>
                  <div id="3dContainer"></div>
                  <label for="checkbox-1" id="s1" class="control-block_div_border switch">
                      <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" v-model="lightPath">
                      <label for="checkbox-1"><span style="font-size: 28px;color: #FFFFFF">{{lightPathTitle}}</span></label>
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

@Component({
  components: {
    fullScreensLayout
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

    #s1{
        position: absolute;
        width: 150px;
        right: 24px;
        bottom: 72px;
        background: none;
        box-shadow: none;
    }
</style>
<style>

</style>
