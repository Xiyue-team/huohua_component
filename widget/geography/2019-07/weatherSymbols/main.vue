<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox" slot-scope="viewBox">
        <div class="title_text" v-if="!weatherNo">{{title_text}}</div>
        <div id="container" style="width: 100%; height: 100%;">
          <transition name="fade">
            <div class="weather-btn-group" v-if="!weatherNo">
              <div class="weather-btn" v-for="(item, index) in weatherList" :key="index">
                <img class="weather-btn-img" :src="item.iconSrc" @click="openModal(index + 1)" />
              </div>
            </div>
          </transition>
          <transition name="fade">
            <div
              v-if="weatherNo"
              class="weather-bg"
              :style="`background-image: url(${weatherList[weatherNo - 1].bgSrc})`"
            >
              <div class="left-half">
                <div>
                  <img :src="weatherList[weatherNo - 1].iconSrc" />
                  <h3>{{weatherList[weatherNo - 1].title}}</h3>
                  <p>{{weatherList[weatherNo - 1].desc}}</p>
                </div>
              </div>
              <div id="tip">
                <img :src="backicon" @click="resetEvent()" />
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
import { ViewModel } from './ViewModel';
@Component({
  components: {
    fullScreensLayout
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
  color: #fff;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 3;
}
#container {
  background: #99ccdd;
}
#tip {
  width: 60px;
  height: 60px;
  font-size: 14px;
  line-height: 48px;
  position: fixed;
  left: 12px;
  top: 12px;
  z-index: 999;
}

#tip img {
  width: 100%;
  height: 100%;
}

.weather-btn-group {
  box-sizing: border-box;
  width: 100%;
  padding: 70px;
  padding-top: 80px;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
}
.weather-btn {
  padding: 2%;
  box-sizing: border-box;
  width: 16.66%;
  height: 33.33%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.weather-btn-img {
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
}
.weather-bg {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.left-half {
  width: 50%;
  box-sizing: border-box;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.left-half div {
  width: 100%;
  height: 80%;
}
.left-half div img {
  max-width: 50%;
  max-height: 50%;
}
.left-half div h3 {
  color: #fff;
  font-size: 40px;
  margin: 5% 0;
}
.left-half div p {
  width: 70%;
  margin: auto;
  text-align: left;
  color: #fff;
  font-size: 26px;
}
@media screen and (min-width: 801px) and (max-width: 1024px) {
  .weather-btn-group {
    padding: 10%;
  }

  .left-half div img {
    max-width: 40%;
    max-height: 40%;
  }
  .left-half div h3 {
    font-size: 30px;
  }
  .left-half div p {
    font-size: 18px;
    width: 60%;
  }
}
@media screen and (min-width: 480px) and (max-width: 800px) {
  .weather-btn-group {
    padding: 10%;
  }
 
  .left-half div img {
    max-width: 40%;
    max-height: 40%;
  }
  .left-half div h3 {
    font-size: 20px;
  }
  .left-half div p {
    font-size: 14px;
    width: 60%;
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
