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
        <div class="verification_style" @click="verificationEvent()">
            <SwitchButton v-bind:valueV="verificationActived">{{btntext}}</SwitchButton>
          </div>
          <div  v-show="msgShow"  class="msg" v-html="text"></div>
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
  import SwitchButton from './ui/SwitchButton.vue';
  @Component({
    components: {
      fullScreensLayout,
      SwitchButton
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
.title_text {
  font-size: 24px;
  line-height: 24px;
  color: #fff;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 3;
  pointer-events: none;
}
#Container {
  background-color: #f6f8fd;
}

#Container3d {
  position: absolute;
  width: 100%;
  height: 100%;
}
.verification_style{
  position: absolute;
  width: 110px;
  height: 42px;
  bottom: 40%;
  right: 32px;
}
.msg {
  position: absolute;
  background: #ffffff;
  padding: 24px;
  width: auto;
  height: auto;
  bottom: 48px;
  left: 72px;
  line-height: 36px;
  font-size: 24px;
  border-radius: 16px;
}
@media screen and (min-height: 600px) and (max-height: 800px) {
  .msg {
    padding: 18px;
    line-height: 18px;
    font-size: 18px;
  }
}

@media screen and (min-height: 450px) and (max-height: 599px) {
  .msg {
    padding: 12px;
    line-height: 14px;
    font-size: 14px;
    bottom: 24px;
    border-radius: 10px;
  }
}

@media screen and (max-height: 449px) {
  .msg {
    padding: 12px;
    line-height: 12px;
    font-size: 12px;
    bottom: 12px;
    border-radius: 8px;
  }
}

</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
</style>
