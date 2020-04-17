<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">{{lang.title}}</div>
                  <div id="3dContainer">
                  </div>
                  <div class="diaphragm_movement_class" ondragstart="return false">
                      <keyFrameAnimation v-bind="diaphragm_movement" ref="diaphragmMovement" v-bind:isEnd.sync="isEnd" v-model='animationIndex'>
                      </keyFrameAnimation>
                  </div>

                  <div class="right_buttons">
                      <div class="click_once_style" @click="click_once_event()" v-bind:class="{ 'event_disabled': isEndFlag, 'disabledButton': disableBtn }">
                          <buttonPrimary v-bind:title="lang.once_click_title" type="ellipse" v-bind:actived="once_clickColor"></buttonPrimary>
                      </div>
                      <div class="continuous_play_style" @click="continuous_play_event()" v-bind:class="{ 'event_disabled': isEndFlag, 'disabledButton' : disableBtn}">
                          <buttonPrimary v-bind:title="lang.continuous_play_title" type="ellipse" v-bind:actived="continuous_playColor"></buttonPrimary>
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
import keyFrameAnimation from '../../../../src/component/layout/keyFrameAnimation.vue';
import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';

@Component({
  components: {
    fullScreensLayout, keyFrameAnimation, buttonPrimary
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
        top:24px;
        left:24px;
        transform-origin: left top;
        z-index: 8;
    }

    .diaphragm_movement_class {
        position: absolute;
        left: 0;
        top: 0;
    }

    .right_buttons {
        position: absolute;
        bottom: 60px;
        right: 24px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        transform-origin: right bottom;
    }

    .click_once_style {
        margin-bottom: 18px;
    }

    .disabledButton {
        pointer-events: none;
    }
</style>

