<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="Container">
          <div
            id="block"
            :style="`left: ${fullleft}px;width: ${fullwidth}px;background-image: url(${picbg})`"
          >
            <div
              class="button_style"
              :style="`left: ${item.left}px; top:${item.top}px`"
              :id="`button${index}`"
              v-for="(item, index) in option"
              @click="buttonEvent(index)"
              :key="index"
            >
              <buttonImage></buttonImage>
            </div>
          </div>
          <div class="lat_textL">30°N</div>
          <div class="lat_textR">30°N</div>
          <transition name="fade">
            <div id="tcontainer" v-show="buttonActived>-1">
              <div class="bg" @click="buttonEvent(-1)">
                <div
                  class="bgs"
                  :style="`left: ${fullleft}px;width: ${fullwidth}px;background-image: url(${picbgblur})`"
                />
              </div>
              <div
                class="weather-bg"
                v-for="(item, index) in showList"
                v-show="buttonActived===index"
                :style="`background-image: url(${item.bgSrc})`"
                :key="index"
              >
                <div id="tip">
                  <div class="title" v-html="item.title"></div>
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
  color: #ffffff;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 999;
}
#Container {
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 0;
  /* #0e0d49; */
}
#block {
  margin: 0;
  top: 0;
  height: 100%;
  position: absolute;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  touch-action: none;
  padding: 0px;

}

.lat_textL,
.lat_textR {
  position: absolute;
  font-size: 24px;
  line-height: 24px;
  color: #ffffff;
  top: 45%;
  z-index: 3;
}

.lat_textL {
  left: 24px;
}

.lat_textR {
  right: 24px;
}

.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.bgs {
  position: absolute;
  height: 100%;
  top: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.back {
  position: absolute;
  width: 20px;
  height: 20px;
  right: 24px;
  bottom: 24px;
  cursor: pointer;
  z-index: 999;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

#tcontainer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 998;
}
#tip {
  position: absolute;
  top: 72px;
  left: 72px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 24px;
  width: 401px;
  height: auto;
  border-radius: 2px;
  z-index: 998;
}

#tip p {
  font-size: 20px;
  color: #ffffff;
  line-height: 28px;
}
.title {
  font-size: 36px;
  line-height: 48px;
}

.weather-bg {
  position: absolute;
  width: 80%;
  height: 80%;
  top: 10%;
  left: 50%;
  margin-left: -40%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 8px;
  z-index: 998;
}

.button_style {
  position: absolute;
  width: 0;
  height: 0;
  background: #525252;
}

@media screen and (min-height: 600px) and (max-height: 800px) {
  #tip {
    top: 48px;
    left: 48px;
    padding: 12px;
    width: 321px;
  }

  .title {
    font-size: 24px;
    line-height: 28px;
  }

  #tip p {
    font-size: 16px;
    line-height: 20px;
  }
}

@media screen and (min-height: 450px) and (max-height: 599px) {
  #tip {
    top: 48px;
    left: 48px;
    padding: 12px;
    width: 321px;
  }

  .title {
    font-size: 24px;
    line-height: 28px;
  }

  #tip p {
    font-size: 16px;
    line-height: 20px;
  }
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
    width: 145px;
  }
  .weather-bg {
    height: 70%;
    top: 15%;
  }
  .title {
    font-size: 18px;
    line-height: 24px;
  }

  #tip p {
    font-size: 12px;
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
