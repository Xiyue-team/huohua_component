<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="Container" style="width: 100%; height: 100%;">
          <div id="Container3d">
            <canvas
              id="renderCanvas"
              touch-action="none"
              width="1920"
              height="1080"
              tabindex="1"
              style="opacity: 1;"
            ></canvas>
          </div>
        </div>
        <div class="buttonG">
          <p class="msg">{{message[0]}}</p>
          <p class="msg2">{{message[1]}}</p>
          <p class="msg">{{message[2]}}</p>
          <p class="msg2">{{message[3]}}</p>
          <p class="msg">{{message[4]}}</p>
          <p class="msg">{{message[5]}}</p>
          <p class="msg2">{{message[6]}}</p>
          <p class="msg">{{message[7]}}</p>
          <p class="msg2">{{message[8]}}</p>
          <p class="msg2">{{message[9]}}</p>
          <p class="msg">{{message[10]}}</p>
          <p class="msg2">{{message[11]}}</p>
          <p class="msg">{{message[12]}}</p>
          <div class="button_style" @click="dropDown()" >
            <BaseSelect @change="selectChange" :isOpen="boolOpen" :picList="picList" :currentShow="current"></BaseSelect>
          </div>
          <p class="msg">{{message[13]}}</p>
        </div>
      </template>

      <template slot="controlPanel">
        <div id="controlPanel"></div>
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
import buttonRadius from '../../../babylon/template/ui/buttonRadius.vue';
import BaseSelect from './components/BaseSelect.vue';
@Component({
  components: {
    fullScreensLayout,
    buttonRadius,
    BaseSelect
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped="scoped">
body {
  overflow: hidden !important;
}
#renderCanvas {
  width: 100%;
  height: 100%;
  outline: 0;
}
#Container3d{
  width: 70%;
  height: 100%;
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

.buttonG {
  position: absolute;
  width: 440px;
  height: auto;
  right: 60px;
  bottom: 60%;
}
.msg {
  float: left;
  font-family: SourceHanSansSC-Medium;
  font-size: 24px;
  color: #fcfdff;
  line-height: 36px;
  margin-top: 37px;
  margin-left: 8px;
}

.msg2 {
  float: left;
  font-family: "Times New Roman";
  font-size: 24px;
  font-style: italic;
  color: #fcfdff;
  line-height: 36px;
  margin-top: 37px;
  margin-left: 8px;
}

.button_style {
  float: left;
  width: auto;
  min-width: 240px;
  height: 42px;
  margin-left: 8px;
  margin-top: 37px;
}
@media screen and (min-width: 801px) and (max-width: 1024px) {
  .buttonG {
    width: 350px;
    right: 24px;
  }
#Container3d{
  width: 50%;
  height: 100%;
}
  .msg {
    font-size: 20px;
    line-height: 20px;
    margin-top: 12px;
    margin-left: 4px;
  }
  .msg2 {
    font-size: 20px;
    line-height: 20px;
    margin-top: 12px;
    margin-left: 4px;
  }
  .button_style {
    min-width: 200px;
    height: 30px;
    margin-left: 4px;
    margin-top: 12px;
  }
}
@media screen and (min-width: 480px) and (max-width: 800px) {
  .buttonG {
    width: 290px;
    right: 24px;
  }
#Container3d{
  width: 50%;
  height: 100%;
}
  .msg {
    font-size: 16px;
    line-height: 16px;
    margin-top: 8px;
    margin-left: 4px;
  }
  .msg2 {
    font-size: 16px;
    line-height: 16px;
    margin-top: 8px;
    margin-left: 4px;
  }
  .button_style {
    min-width: 160px;
    height: 21px;
    margin-left: 4px;
    margin-top: 8px;
  }
}

#Container {
  background-color: #333333;
}

img {
  width: 100%;
  height: 100%;
}

</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
</style>
