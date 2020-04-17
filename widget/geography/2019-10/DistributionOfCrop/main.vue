<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="Container" style="width: 100%; height: 100%;">
          <div id="block" :style="`background-image: url(${picbg})`">
            <div class="button_style"
             :style="`left: ${item.left}px; top:${item.top}px`"
              :id="`button${index}`"
              v-for="(item, index) in option"
              @click="buttonEvent(index)" :key="index">
              <buttonImage v-bind:actived="item.active" v-bind="item.btn"></buttonImage>
            </div>
          </div>
          <transition name="fade">
            <div id="tcontainer" v-show="buttonActived>-1" @click="buttonEvent(-1)" style="width: 100%; height: 100%;">
                <div class="weather-bg"
                  v-for="(item, index) in showList"
                  v-show="buttonActived===index"
                  :style="`background-image: url(${item.bgSrc})`" :key="index">
                <div id="tip">
                    <p v-html="item.tip"></p>
                </div>
            </div>
            </div>
          </transition>
        </div>
      </template>
    </fullScreensLayout>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import '../../../../src/assets/css/core.css';
  import '../../../../src/assets/css/layout.css';
  import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
  import Component from 'vue-class-component';
  import buttonPrimary from '../../../babylon/template/ui/buttonPrimary.vue';
  import { ViewModel } from './ViewModel';
  import buttonImage from './ui/buttonImage.vue';
@Component({
  components: {
    fullScreensLayout,
    buttonPrimary,
    buttonImage
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped="scoped">
body {
  overflow: hidden !important;
}
.title_text {
  font-size: 24px;
  line-height: 24px;
  color: #525252;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 3;
}

#Container {
  background-color: #ffffff;
}

#block{ 
  float:left; 
  height:90%;
  width: 90%;
  left: 5%;
  top: 5%;
  position: absolute; 
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

#tcontainer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: #F6F8FD;
  z-index: 999;
}
#tip {
  position: absolute;
  top: 72px;
  left: 72px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 24px;
  width: 392px;
  height: auto;
  border-radius: 2px;
  z-index: 999;
}
#tip p {
  font-size: 20px;
  color: #FFFFFF;
  line-height: 28px;
}

.weather-bg {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
}

.button_style {
  position: absolute;
  width: 0;
  height: 0;
  background: #525252;
}

@media screen and (min-height: 600px) and (max-height: 800px) {
}

@media screen and (min-height: 450px) and (max-height: 599px) {

}

@media screen and (max-height: 449px) {
  .title_text {
    font-size: 20px;
    line-height: 20px;
    top: 20px;
    left: 20px;
  }

  #tip {
    top: 48px;
    left: 48px;
    padding: 12px;
    width: 150px;
  }
  #tip p {
    font-size: 16px;
    line-height: 18px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
</style>
