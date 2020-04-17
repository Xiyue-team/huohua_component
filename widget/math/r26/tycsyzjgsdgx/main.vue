<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text" v-bind:class="{'set_scale_title': isMobile}">
                      <span>
                          {{title1}}
                      </span>
                      <span style="font-family: 'Times New Roman'; font-style: italic; margin-left: -5px">
                          F
                      </span>
                      <span style="margin-left: -5px">
                          ₁
                      </span>
                      <span style="font-family: 'Times New Roman'; font-style: italic; margin-left: -5px">
                          PF
                      </span>
                      <span style="margin-left: -5px">
                          ₂
                      </span>
                      <span style="margin-left: -5px">
                          {{title2}}
                      </span>
                  </div>

                  <div id="3dContainer" style="width: 100%; height: 100%">
                  </div>

                  <div class="descText" v-bind:class="{'set_scale_descText': isMobile}">
                      <p>{{descTopTitle}}</p>
                      <p>{{descBottomTitle}}</p>
                  </div>

                  <div class="textImage" v-bind:class="{'set_scale_textImage': isMobile}">
                      <div class="column">
                          <span class="leftTextTop">{{rightAngleTitle}}</span>
                          <span class="rightTextTop">0</span>
                      </div>
                      <div class="column">
                          <span class="leftTextBottom">{{paramTitle}}</span>
                          <span class="rightTextBottom">b > c</span>
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

@Component({
  components: {
    fullScreensLayout,
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_text {
        font-size: 24px;
        color: #000000;
        transparent: true;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }

    .descText {
        position: absolute;
        right: 24px;
        top: 25.3%;
        width: 298px;
        height: 72px;
        font-size: 24px;
        color: #000000;
    }

    .textImage {
        position: absolute;
        top: 37.5%;
        right: 24px;
        width: 224px;
        height: 144px;
        background: #FFFFFF;
        border: 1px solid rgba(0,0,0,0.10);
        box-shadow: 0 1px 6px 0 rgba(0,0,0,0.10);
        border-radius: 22px;
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
    }

    .column {
        flex-basis: 100%;
        display: flex;
        justify-content: space-between;
    }

    .leftTextTop {
        font-size: 24px;
        color: #333333;
        margin-left: 20px;
        margin-top: 22px;
    }

    .leftTextBottom {
        font-size: 24px;
        color: #333333;
        margin-left: 20px;
        margin-bottom: 23px;
    }

    .rightTextTop {
        font-size: 26px;
        color: #0199FF;
        margin-top: 26px;
        margin-right: 41.1px;
    }

    .rightTextBottom {
        font-family: 'Times New Roman';
        font-style: italic;
        font-size: 26px;
        color: #0199FF;
        line-height: 30px;
        margin-bottom: 25px;
        margin-right: 20.3px;
    }

    .set_scale_title {
        font-size: 18px;
    }

    .set_scale_descText {
        transform: scale(0.5);
        right: -50px;
    }

    .set_scale_textImage {
        transform: scale(0.5);
        right: -30px;
    }
</style>

