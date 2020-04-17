<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text" v-show="show_title">{{lang.title}}</div>
                  <div id="3dContainer" ></div>
                  <div style="width: 100%; height: 100%; background: #4D999D; position: absolute"></div>
                  <div class="show_poster">
                      <div class="top_row_rocks">
                          <div v-for="num in rock_row_number" class="top_row_rock" :key="num + '1'">
                              <img :src=top_rock_poster[num-1] style="width: 100%; height: 100%" ondragstart="return false" @click="show_top_rock_desc(num)"/>
                          </div>
                      </div>
                      <div class="center_row_rocks">
                          <div v-for="num in rock_row_number" class="center_row_rock" :key="num + '2'">
                              <img :src=center_rock_poster[num-1] style="width: 100%; height: 100%" ondragstart="return false" @click="show_center_rock_desc(num)"/>
                          </div>
                      </div>
                      <div class="bottom_row_rocks">
                          <div v-for="num in rock_row_number" class="bottom_row_rock" :key="num + '3'">
                              <img :src=bottom_rock_poster[num-1] style="width: 100%; height: 100%" ondragstart="return false" @click="show_bottom_rock_desc(num)"/>
                          </div>
                      </div>

                      <transition name="fade">
                          <div class="rock_detail_desc" v-show="show_rock_detail">
                              <div>
                                  <img :src="show_rock_detail_image" style="width: 100%; height: 100%;" ondragstart="return false"/>
                              </div>
                              <div class="rock_detail_text">
                                  <div class="desc_title">
                                      {{desc_title}}
                                  </div>
                                  <div class="desc_detail">
                                      {{desc_content}}
                                  </div>
                              </div>
                              <div class="quit_rock_detail_desc" @click="exit_desc()">
                                  <img src="./sub_static/exit.png" style="width: 100%; height: 100%" ondragstart="return false"/>
                              </div>
                          </div>
                      </transition>
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

@Component({
  components: {
    fullScreensLayout
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_text {
        font-size: 20px;
        color: #ffffff;
        line-height: 20px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
        transform-origin: left top;
        z-index: 6;
    }

    .show_poster {
        position: absolute;
        width: 918px;
        height: 534px;
        top: calc(50% - 267px);
        left: calc(50% - 459px);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .top_row_rocks, .center_row_rocks, .bottom_row_rocks {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }

    .top_row_rock, .center_row_rock, .bottom_row_rock {
        width: 200px;
        height: 150px;
        margin-left: 155px;
        position: relative;
        cursor: pointer;
    }

    .center_row_rock {
       margin-top: 40px;
       margin-bottom: 40px;
    }

    .rock_detail_desc {
        position: absolute;
        background: #4D999D;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 7;
    }

    .rock_detail_text {
        width: 422px;
        height: 310px;
        flex-direction: column;
    }

    .desc_title {
        font-size: 46px;
        color: #FFFFFF;
        letter-spacing: 8px;
        line-height: 46px;
    }

    .desc_detail {
        margin-top: 36px;
        font-size: 28px;
        color: #FFFFFF;
        line-height: 38px;
    }

    .quit_rock_detail_desc {
        position: absolute;
        width: 25px;
        height: 25px;
        right: 12px;
        top: 12px;
        z-index: 7;
        cursor: pointer;
    }

    .fade-enter-active, .fade-leave-active {
        transition: top 0.5s;
    }

    .fade-enter, .fade-leave-to {
        top: 100%;
    }
</style>
