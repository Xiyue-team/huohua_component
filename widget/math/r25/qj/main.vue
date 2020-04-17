<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">{{title}}</div>
                  <div id="3dContainer"></div>
                  <div class="controlSize" v-bind:class="{controlSize_Scale:isMobile}">
                      <div style="">
                          <buttonPrimary class="buttonSize" v-bind:title="buttonTitle[0]" type="ellipse" v-bind:actived="leftOpenActive" @click.native="leftOpen()"></buttonPrimary>
                          <buttonPrimary class='buttonSize buttonMargin' v-bind:title="buttonTitle[1]" type="ellipse" v-bind:actived="rightOpenActive" @click.native="rightOpen()"></buttonPrimary>
                          <buttonPrimary class='buttonSize buttonMargin' v-bind:title="buttonTitle[2]" type="ellipse" v-bind:actived="conceptActive" @click.native="concept()"></buttonPrimary>
                      </div>
                      <img src="./sub_static/table.png" class="imageStyle" alt=""  v-show="conceptActive">
                  </div>
                  <!--"-->
              </template>
              <template slot="controlPanel" slot-scope="controlPanel">

              </template>
          </fullScreensLayout>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
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
    .buttonMargin {
        margin-left: 26px
    }

    .buttonSize {
        width: 123px;
        height: 42px;
    }

    .controlSize {
        position: absolute;
        top: 38.2%;
        right: 92px;
        display: flex;
        flex-direction: column;
        width: 430px;
        transform-origin: right top;
    }

    .controlSize_Scale {
        transform: scale(0.5);
    }
    .imageStyle {
        width: 423px;
        height: 239px;
        margin-top: 50px;
    }

</style>
<style>

</style>
