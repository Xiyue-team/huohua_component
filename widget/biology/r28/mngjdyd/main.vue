<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">{{lang.title}}</div>
                  <div id="3dContainer" class="bg_class">
                  </div>
                  <div class="diaphragm_movement_class" ondragstart="return false">
                      <keyFrameAnimation v-bind="diaphragm_movement" ref="diaphragmMovement" v-bind:isEnd.sync="isEnd">
                      </keyFrameAnimation>
                      <div class="move_tips_arrow_class" v-show="tips_show">
                          <img src="./sub_static/moveTip.png" style="width: 100%; height: 100%;" ondragstart="return false"/>
                      </div>
                  </div>
                  <div class="moveArea_class" id="kCanvas">
                    <!--模拟拖拽区域-->
                  </div>
                  <div class="title_tips_class" v-show="move_tips_show">
                      {{moveTips_title}}
                  </div>
                  <div class="background_class" v-show="show_label_one">
                      <div class="line_label_class">
                          <img src="./sub_static/line.png" style="width: 100%; height: 100%;" ondragstart="return false"/>
                      </div>
                      <div class="glass_cover_class">
                          {{lang.glass_cover_title}}
                      </div>
                      <div class="rubber_film_class">
                          {{lang.rubber_film_title}}
                      </div>
                      <div class="glass_tube_class">
                          {{lang.glass_tube_title}}
                      </div>
                      <div class="balloon_class">
                          {{lang.balloon_title}}
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
import keyFrameAnimation from '../../../../src/component/layout/keyFrameAnimation.vue';

@Component({
  components: {
    fullScreensLayout, buttonPrimary, keyFrameAnimation
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
        z-index: 8;
    }

    .bg_class {
        width: 100%;
        height: 100%;
        background-image: url('./sub_static/background.png');
        background-size: 100% 100%;
    }

    .diaphragm_movement_class {
        position: absolute;
        left: calc(50% - 200px);
        top: calc(50% - 440px);
    }

    .moveArea_class {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 20%;
        z-index: 5;
    }

    .move_tips_arrow_class {
        position: absolute;
        width: 30px;
        height: 70px;
        bottom: -10px;
        right: calc(50% - 100px);
        z-index: 3;
    }

    .background_class {
        position: absolute;
        width: 619.32px;
        height: 524.16px;
        left: calc(50% - 351px);
        top: calc(50% - 381.2px);
    }

    .line_label_class {
        position: absolute;
        width: 619.32px;
        height: 524.16px;
        z-index: 2;
    }

    .glass_cover_class {
        position: absolute;
        font-size: 32px;
        color: #FFFFFF;
        top: 198px;
        left: -100px;
    }

    .rubber_film_class {
        position: absolute;
        font-size: 32px;
        color: #FFFFFF;
        top: 472px;
        left: -100px;
    }

    .glass_tube_class {
        position: absolute;
        font-size: 32px;
        color: #FFFFFF;
        top: 0px;
        right: -100px;
    }

    .balloon_class {
        position: absolute;
        font-size: 32px;
        color: #FFFFFF;
        top: 300px;
        right: -69px;
    }

    .title_tips_class {
        position: absolute;
        font-size: 32px;
        color: #FFFFFF;
        width: 420px;
        height: 50px;
        bottom: 40px;
        left: calc(50% - 210px);
    }

    @media screen and (min-width: 1024px) and (max-width: 1300px) {
        .diaphragm_movement_class, .background_class {
            transform-origin: center;
            transform: scale(0.7);
        }

        .diaphragm_movement_class {
            top: calc(50% - 410px);
        }

        .background_class {
            top: calc(50% - 343px);
            left: calc(50% - 333px);
        }

        .title_tips_class {
            font-size: 24px;
            bottom: 0px;
            left: calc(50% - 120px);
        }
    }

    @media screen and (min-width: 875px) and (max-width: 1024px) {
        .diaphragm_movement_class, .background_class {
            transform-origin: center;
            transform: scale(0.7);
        }

        .diaphragm_movement_class {
            top: calc(50% - 410px);
        }

        .moveArea_class {
            top: 13%;
        }

        .background_class {
            top: calc(50% - 343px);
            left: calc(50% - 333px);
        }

        .title_tips_class {
            font-size: 20px;
            bottom: 0px;
            left: calc(50% - 120px);
        }
    }

    @media screen and (max-width: 875px) {
        .diaphragm_movement_class, .background_class {
            transform-origin: center;
            transform: scale(0.4);
        }

        .diaphragm_movement_class {
            top: calc(50% - 410px);
        }

        .background_class {
            top: calc(50% - 333px);
            left: calc(50% - 328px);
        }

        .title_tips_class {
            font-size: 18px;
            bottom: 0px;
            left: calc(50% - 100px);
        }
    }

    @media screen and (max-width: 740px) {
        .diaphragm_movement_class, .background_class {
            transform-origin: center;
            transform: scale(0.4);
        }

        .diaphragm_movement_class {
            top: calc(50% - 410px);
        }

        .background_class {
            top: calc(50% - 333px);
            left: calc(50% - 328px);
        }

        .move_tips_arrow_class {
            bottom: -10px;
            right: calc(50% - 105px);
        }

        .title_tips_class {
            font-size: 18px;
            bottom: 0px;
            left: calc(50% - 100px);
        }

        .title_text {
            font-size: 18px;
        }
    }

    @media screen and (min-width: 640px) and (max-width: 730px){
        .diaphragm_movement_class, .background_class {
            transform-origin: center;
            transform: scale(0.3);
        }

        .diaphragm_movement_class {
            top: calc(50% - 395px);
        }

        .background_class {
            top: calc(50% - 310px);
            left: calc(50% - 322px);
        }

        .move_tips_arrow_class {
            bottom: -10px;
            right: calc(50% - 105px);
        }

        .title_tips_class {
            font-size: 18px;
            bottom: 0px;
            left: calc(50% - 100px);
        }

        .title_text {
            font-size: 18px;
        }
    }

</style>
<style>
    #keyFrameContainer {
        width: 400px !important;
        height: 720px !important;
    }
</style>

