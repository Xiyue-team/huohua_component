<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div id="3dContainer" style="width: 100%;height: 100%"></div>
                  <div class="buttonContainer">
                    <div class="smallContainer buttonWidth1">
                        <buttonPrimary class="" v-bind:title="lang.buttonTitle[0]" type="ellipse" v-bind:actived="buttonActived[0].active" @click.native="buttonEvent1()"></buttonPrimary>
                        <div class="circleButton" v-bind:class="{'buttonActive': buttonActived[1].active}" @click="buttonEvent2()" v-show="buttonActived[0].active"></div>
                    </div>
                    <div class="smallContainer buttonWidth1">
                        <buttonPrimary class="" v-bind:title="lang.buttonTitle[1]" type="ellipse" v-bind:actived="buttonActived[2].active" @click.native="buttonEvent3"></buttonPrimary>
                        <div class="circleButton" v-bind:class="{'buttonActive': buttonActived[3].active}" @click="buttonEvent4" v-show="buttonActived[2].active"></div>
                    </div>
                    <div class="smallContainer buttonWidth1">
                        <buttonPrimary class="" v-bind:title="lang.buttonTitle[2]" type="ellipse" v-bind:actived="buttonActived[4].active" @click.native="buttonEvent5"></buttonPrimary>
                    </div>
                    <div class="smallContainer buttonWidth2">
                        <buttonPrimary class="" v-bind:title="lang.buttonTitle[3]" type="ellipse" v-bind:actived="buttonActived[5].active" @click.native="buttonEvent6"></buttonPrimary>
                        <div class="circleButton" v-bind:class="{'buttonActive': buttonActived[6].active}" @click="buttonEvent7" v-show="buttonActived[5].active"></div>
                    </div>
                    <div class="smallContainer buttonWidth2">
                        <buttonPrimary class="" v-bind:title="lang.buttonTitle[4]" type="ellipse" v-bind:actived="buttonActived[7].active" @click.native="buttonEvent8"></buttonPrimary>
                        <div class="circleButton" v-bind:class="{'buttonActive': buttonActived[8].active}" @click="buttonEvent9" v-show="buttonActived[7].active"></div>
                    </div>
                  </div>
                  <div class="title_text">{{title}}</div>

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
import buttonPrimary from '../../../../src/component/ui/buttonPrimary';

@Component({
  components: {
    fullScreensLayout,
    buttonPrimary
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
    }

    .buttonContainer{
        width: 192px;
        height: 260px;
        position: absolute;
        bottom: 26px;
        right: 12px;
    }

    @media screen and (max-width: 1280px) and (max-height: 730px){
        .buttonContainer{
            transform-origin: bottom right;
            transform: scale(0.7);
        }
    }
    .smallContainer{
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .buttonWidth1 {
        margin-left: 37px;
        width: 155px;
    }

    .buttonWidth2 {
        width: 190px;
    }

    .circleButton{
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: #EBEBEB;
    }

    .circleButton:hover{
        cursor: pointer;
    }

    .buttonActive {
        background-color: #0199FF;
    }
</style>
<style>

</style>
