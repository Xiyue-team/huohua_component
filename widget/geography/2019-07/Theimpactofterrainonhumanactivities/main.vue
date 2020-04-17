<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div id="container" style="width: 100%; height: 100%;">
          <swiper :options="swiperOption" ref="mySwiper" class="swiper-container">
            <div class="swiper-slide" v-for="item of swiperList" :key="item.id">
              <div class="title_desc" ref="title_desc">{{item.text.title}}</div>
              <div class="swiper-img1" :style="`background-image: url(${item.bgSrc1})`">
                <div id="tip" v-html="item.text.text1">
                </div>
              </div>
              <div class="swiper-img2" :style="`background-image: url(${item.bgSrc2})`">
                <div id="tip" v-html="item.text.text2">
                </div>
              </div>
            </div>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
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
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

@Component({
  components: {
    fullScreensLayout,
    swiper,
    swiperSlide
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped="scoped">
body {
  overflow: hidden !important;
}

#container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

#container > div.swiper {
  width: 100%;
  overflow: hidden;
}
.swiper-container {
  width: 100%;
  height: 100%;
}
.title_desc {
  position: absolute;
  font-size: 28px;
  top: 40px;
  width: 100%;
  height: auto;
  text-align: center;
  z-index: 999;
  color: #fff;
}
.swiper-slide {
  height: 100%;
  display: flex;
  justify-content: center;
}

.swiper-button-next {
  width: 44px;
  height: 44px;
  background-size: 44px;
  top: 53%;
  right: 3%;
  outline: 0px;
}

.swiper-button-prev {
  width: 44px;
  height: 44px;
  background-size: 44px;
  top: 53%;
  left: 3%;
  outline: 0px;
}

.swiper-img1 {
  position: relative;
  width: 50%;
  height: 80%;
  margin: 100px 15px 0px 30px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.swiper-img2 {
  position: relative;
  width: 50%;
  height: 80%;
  margin: 100px 30px 10px 15px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
#tip {
  position: absolute;
  color: #fff;
  width: 90%;
  bottom: 0px;
  margin-left:  20px;
  margin-right:  20px;
  height: 100px;
  z-index: 999;
  font-size: 24px;
}

.swiper-pagination-bullets {
  bottom: 16px;
}

@media screen and (min-height: 600px) and (max-height: 800px) {
  .title_desc {
    top: 20px;
  }
  #tip {
    height: 80px;
    font-size: 18px;
  }
  .swiper-img1 {
    margin: 80px 8px 24px 16px;
  }
  .swiper-img2 {
    margin: 80px 16px 24px 8px;
  }
}

@media screen and (min-height: 450px) and (max-height: 599px) {
  .title_desc {
    top: 16px;
  }
  #tip {
    height: 80px;
    font-size: 18px;
  }
  .swiper-img1 {
    margin: 60px 8px 24px 16px;
  }
  .swiper-img2 {
    margin: 60px 16px 24px 8px;
  }
}

@media screen and (min-height: 300px) and (max-height: 449px) {
  .title_desc {
    font-size: 16px;
    top: 12px;
  }
  #tip {
    height: 60px;
    font-size: 14px;
  }
  .swiper-img1 {
      height: 75%;
    margin: 44px 8px 0px 16px;
  }
  .swiper-img2 {
      height: 75%;
    margin: 44px 16px 0px 8px;
  }
  .swiper-pagination-bullets {
    bottom: 10px;
  }
}

/deep/ .swiper-pagination-bullet {
  border-radius: 4px;
}
/deep/ .swiper-pagination-bullet-active {
  width: 24px;
}
</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}

.swiper-pagination-bullet {
  outline: 0px;
}
@media screen and (min-height: 1001px) and (max-height: 1280px) {
  .swiper-pagination {
    position: absolute;
    bottom: 48px !important;
  }
}

@media screen and (min-height: 801px) and (max-height: 1000px) {
  .swiper-pagination {
    position: absolute;
    bottom: 48px !important;
  }
}

@media screen and (min-height: 600px) and (max-height: 800px) {
  .swiper-pagination {
    position: absolute;
    bottom: 20px !important;
  }
}
@media screen and (min-height: 450px) and (max-height: 599px) {
  .swiper-pagination {
    position: absolute;
    bottom: 16px !important;
  }
}

@media screen and (min-height: 300px) and (max-height: 449px) {
  .swiper-pagination {
    position: absolute;
    bottom: 16px !important;
  }
}
</style>