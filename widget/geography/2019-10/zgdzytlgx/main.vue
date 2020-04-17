<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">{{lang.title}}</div>
                  <div id="3dContainer"></div>
                  <div class="bg_style_class">
                      <div v-for="num in general_line_count" class="general_railway_line" :key="num + '1'"  v-show="general_railway[num-1].show_line">
                          <img :src=general_railway_line[num-1] style="width: 100%; height: 100%" ondragstart="return false"/>
                      </div>

                      <div v-for="num in high_speed_line_count" class="high_speed_railway_line" :key="num + '2'"  v-show="high_speed_railway[num-1].show_line">
                          <img :src=high_speed_railway_line[num-1] style="width: 100%; height: 100%" ondragstart="return false"/>
                      </div>
                  </div>
                  <div class="right_top_buttons">
                      <div v-for="num in selectCount" class="select-item-top" :key="num + '1'" @click="general_railway_event(num)" :style="general_railway_show">
                          <div :id="top_circleId(num)" style="position: absolute; border: 2px solid #D0D0D0; border-radius: 50%; width: 13px; height: 13px; top: 3px;"></div>
                          <div :id="general_railwayId(num)" style="position: absolute; font-size: 16px; color: #000000; top: 0; left: 20px">
                              {{lang.general_railway_line_title[num-1]}}
                          </div>
                      </div>

                      <div class="general_railway_line_style" @click="general_railway_line_event()">
                          <buttonPrimary v-bind:title="lang.general_railway_title" type="ellipse" v-bind:actived="general_railwayColor"></buttonPrimary>
                      </div>
                      <div class="high_speed_railway_line_style" @click="high_speed_railway_line_event()">
                          <buttonPrimary v-bind:title="lang.high_speed_railway_title" type="ellipse" v-bind:actived="high_speed_railwayColor"></buttonPrimary>
                      </div>

                      <div v-for="num in selectCount" class="select-item-bottom" :key="num + '2'" @click="high_speed_railway_event(num)" :style="high_speed_railway_show">
                          <div :id="bottom_circleId(num)" style="position: absolute; border: 2px solid #D0D0D0; border-radius: 50%; width: 13px; height: 13px; top: 3px;"></div>
                          <div :id="high_speed_railwayId(num)" style="position: absolute; font-size: 16px; color: #000000; top: 0; left: 20px">
                              {{lang.high_speed_railway_line_title[num-1]}}
                          </div>
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
    }

    .bg_style_class {
        position: relative;
        width: 1006.5px;
        height: 786px;
        top: calc(50% - 393px);
        left: calc(50% - 503.25px);
        background-image: url('./sub_static/background1.png');
        background-size: 100% 100%;
    }

    .general_railway_line, .high_speed_railway_line {
        position: absolute;
        width: 1006.5px;
        height: 786px;
    }

    .right_top_buttons {
        position: absolute;
        width: 130px;
        top: 15%;
        right: 24px;
    }

    .select-item-top {
        position: relative;
        width: 130px;
        height: 24px;
        margin-bottom: 6px;
        cursor: pointer;
    }

    .general_railway_line_style {
        position: relative;
        margin-top: 16px;
    }

    .high_speed_railway_line_style {
        position: relative;
        margin-top: 10px;
        margin-bottom: 16px;
    }

    .select-item-bottom {
        position: relative;
        width: 130px;
        height: 24px;
        margin-bottom: 6px;
        cursor: pointer;
    }

    @media screen and (min-width: 1320px) {
        .right_top_buttons {
            transform: scale(1);
            transform-origin: center;
        }
    }

    @media screen and (min-width: 1200px) and (max-width: 1320px) {
        .right_top_buttons {
            transform: scale(0.8);
            transform-origin: center;
            top: 6%;
        }
    }

    @media screen and (min-width: 875px) and (max-width: 1200px) {
        .right_top_buttons {
            transform: scale(0.7);
            transform-origin: center;
            right: -12px;
            top: 6%;
        }
    }

    @media screen and (min-width: 740px) and (max-width: 875px) {
        .right_top_buttons {
            transform: scale(0.6);
            transform-origin: center;
            right: -12px;
            top: 6%;
        }
    }

    @media screen and (max-width: 740px) {
        .right_top_buttons {
            transform: scale(0.3);
            transform-origin: center;
            top: -30%;
            right: -12px;
        }
    }
</style>
<style>
    .button-ellipse {
        background: #F2F2F2;
    }
</style>