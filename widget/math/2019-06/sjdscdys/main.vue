<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox" slot-scope="viewBox">
        <div id="title">{{title}}</div>
        <div class="box" :style="{zoom: zoom1}">
          <div class="colorbox" id="box"></div>
          <div class="sliderBox red">
            <div class="textTip">R</div>
            <vue-slider
              class="vueSlider"
              v-model="value1"
              v-bind="sliderOption1"
              :style="{zoom: zoom1}"
            ></vue-slider>
          </div>

          <div class="sliderBox">
            <div class="textTip">G</div>
            <vue-slider class="vueSlider" v-model="value2" v-bind="sliderOption2"></vue-slider>
          </div>

          <div class="sliderBox blue">
            <div class="textTip">B</div>
            <vue-slider class="vueSlider" v-model="value3" v-bind="sliderOption3"></vue-slider>
          </div>
        </div>
      </template>
    </fullScreensLayout>
  </div>
</template>


<script lang='ts'>
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
import Component from 'vue-class-component';
import vueSlider from 'vue-slider-component/dist-css/vue-slider-component.common.js';
import 'vue-slider-component/dist-css/vue-slider-component.css';
import 'vue-slider-component/theme/default.css';
import { MainVueComponent } from './mainVueComponent';
@Component({
  components: {
    fullScreensLayout,
    vueSlider
  }
})
export default class App extends MainVueComponent {}
</script>

<style scoped='scoped'>
* {
  margin: 0;
  padding: 0;
}
body {
  overflow: hidden !important;
}
#title {
  font-size: 24px;
  color: #fff;
  line-height: 24px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 9;
}
.vueSlider {
  position: absolute;
}
.box {
  width: 100%;
  height: 100%;
  background: #2c2c2c;
}
.colorbox {
  width: 30vw;
  height: 30vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgb(0, 0, 0);
  border-radius: 50%;
}
.sliderBox {
  position: absolute;
  width: 334px;
  height: 50px !important;
  top: 50%;
  right: 22px;
  z-index: 99;
}
.sliderBox .textTip {
  width: 20px;
  position: absolute;
  left: 0;
  font-size: 1.1vw;
  top: 0;
  bottom: 0;
  margin: auto;
  font-style: italic;
  line-height: 50px;
  color: #fff;
  font-family: TimesNewRomanPS-ItalicMT;
}
.sliderBox .vueSlider {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.red {
  top: 43%;
}
.blue {
  top: 57%;
}
@media (max-width: 855px)and (max-height: 535px) {
  .sliderBox{
    width: 148px;
  }
  .red {
    top: 42%;
  }
  .blue {
    top: 58%;
  }
}

@media (max-width: 730px) {
  .sliderBox{
    width: 134px;
  }
  .red {
    top:39%;
  }
  .blue {
    top: 60%;
  }
}
</style>
