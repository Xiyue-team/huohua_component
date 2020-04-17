<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">{{lang.title}}</div>
                  <div id="3dContainer"></div>
                  <div class="bg_style_class"></div>
                  <div class="boundary_lines__map_style">
                      <div v-for="num in boundary_line_count" class="boundary_line_map" :key="num + '1'"  v-show="boundary_line_map_show[num-1].show_image">
                          <img :src=boundary_line_map[num-1] style="width: 100%; height: 100%;" ondragstart="return false"/>
                      </div>
                  </div>
                  <div class="boundary_lines__line_style">
                      <div v-for="num in boundary_line_count" class="boundary_line_line" :key="num + '1'"  v-show="boundary_line_line_show[num-1].show_image">
                          <img :src=boundary_line_line[num-1] style="width: 100%; height: 100%;" ondragstart="return false"/>
                      </div>
                      <div class="first_step_tip_style" v-show="first_step_tip_show">
                          <div class="first_step_text">
                            {{lang.first_step_tip_title}}
                          </div>
                          <div class="close_style" @click="first_step_tip_event()">
                              <img src="./sub_static/close.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                          </div>
                      </div>

                      <div class="second_step_tip_style" v-show="second_step_tip_show">
                          <div class="second_step_text">
                              {{lang.second_step_tip_title}}
                          </div>
                          <div class="close_style" @click="second_step_tip_event()">
                              <img src="./sub_static/close.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                          </div>
                      </div>

                      <div class="third_step_tip_style" v-show="third_step_tip_show">
                          <div class="third_step_text">
                              {{lang.third_step_tip_title}}
                          </div>
                          <div class="close_style" @click="third_step_tip_event()">
                              <img src="./sub_static/close.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                          </div>
                      </div>
                  </div>
                  <div class="mask_gray_div" v-show="show_mask"></div>

                  <div class="right_top_buttons">
                      <div class="first_step_style" @click="first_step_event()">
                          <buttonPrimary v-bind:title="lang.first_step_title" type="ellipse" v-bind:actived="first_stepColor"></buttonPrimary>
                      </div>
                      <div class="second_step_style" @click="second_step_event()">
                          <buttonPrimary v-bind:title="lang.second_step_title" type="ellipse" v-bind:actived="second_stepColor"></buttonPrimary>
                      </div>
                      <div class="third_step_style" @click="third_step_event()">
                          <buttonPrimary v-bind:title="lang.third_step_title" type="ellipse" v-bind:actived="third_stepColor"></buttonPrimary>
                      </div>
                      <toggle-button
                              :color   = "switchColor"
                              :sync   = "true"
                              :labels = "switchLable"
                              v-model = "switchValue"
                              :width   = switchSize.width
                              :height  = switchSize.height
                              style   = "font-size: 16px"
                      />
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
import { ToggleButton } from 'vue-js-toggle-button'

@Component({
  components: {
    fullScreensLayout, buttonPrimary,ToggleButton
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_text {
        font-size: 24px;
        color: #000000;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
        z-index: 7;
        transform-origin: left top;
    }

    .mask_gray_div {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        background: rgba(0,0,0,0.5);
    }

    .bg_style_class {
        position: relative;
        width: 1006.5px;
        height: 787.5px;
        top: calc(50% - 393.75px);
        left: calc(50% - 503.25px);
        background-image: url('./sub_static/background.png');
        background-size: 100% 100%;
    }

    .boundary_lines__map_style, .boundary_lines__line_style {
        position: absolute;
        width: 1006.5px;
        height: 787.5px;
        top: calc(50% - 393.75px);
        left: calc(50% - 503.25px);
    }

    .first_step_tip_style, .second_step_tip_style, .third_step_tip_style {
        position: absolute;
        width: 280px;
        height: 150px;
        padding-top: 15px;
        padding-left: 20px;
        padding-right: 26px;
        padding-bottom: 19px;
        text-align: left;
        line-height: 38px;
        border: 1px solid #979797;
        border-radius: 12px;
        font-size: 24px;
        color: #666666;
        background-color: #ffffff;
        z-index: 5;
        display: table;
    }

    .first_step_text, .second_step_text, .third_step_text {
        display:table-cell;
        vertical-align:middle;
    }

    .first_step_tip_style {
        top: 9%;
        left: 0;
    }

    .second_step_tip_style {
        top: 70%;
        right: 10%;
    }

    .third_step_tip_style {
        top: 9%;
        right: -10%;
    }

    .close_style {
        position: absolute;
        width: 38px;
        height: 38px;
        right: -19px;
        top: -19px;
        cursor: pointer;
    }

    .boundary_lines__map_style {
        z-index: 3;
    }

    .boundary_lines__line_style {
        z-index: 4;
    }

    .boundary_line_map, .boundary_line_line {
        position: absolute;
        width: 1006.5px;
        height: 787.5px;
    }

    .right_top_buttons {
        position: absolute;
        width: 130px;
        top: 64.3%;
        right: 24px;
        z-index: 7;
        transform-origin: top right;
    }

    .first_step_style, .second_step_style, .third_step_style {
        position: relative;
        margin-bottom: 12px;
    }
</style>
<style>
    .button-ellipse {
        background: #E4E4E4;
        color: #525252;
        border: none;
    }

    .button-ellipse:hover {
        background: #E4E4E4;
    }

    .button-ellipse.active:hover {
        background: #0199FF;
        color: #FFFFFF;
    }

    .option_math_div div:hover{
        cursor: pointer;
        background-color: #0199FF;
        color: #FFFFFF;
    }

    .v-right {
        color: #525252!important;
        right: 24px!important;
    }

    .v-left {
        left: 24px!important;
    }
</style>