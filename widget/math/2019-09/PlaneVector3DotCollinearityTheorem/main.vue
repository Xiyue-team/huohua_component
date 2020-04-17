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
          <div class="button_style1" @click="ButtonEvent1()">
            <buttonPrimary
              style="width: 100%"
              v-bind:title="buttonTitle1"
              v-bind:actived="buttonActived1"
              type="ellipse"
            ></buttonPrimary>
          </div>
          <div class="button_style2" @click="ButtonEvent2()">
            <buttonPrimary
              style="width: 100%"
              v-bind:title="buttonTitle2"
              v-bind:actived="buttonActived2"
              type="ellipse"
            ></buttonPrimary>
          </div>
        </div>
        <div id="msg" v-if="buttonActived1" :style="`background-image: url(${picmsg})`">
        </div>
        <div id="tip" v-if="buttonActived2" :style="`background-image: url(${pictip})`">
        </div>
      </template>

      <template slot="controlPanel">
        <div id="controlPanel"></div>
      </template>
    </fullScreensLayout>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
import Component from 'vue-class-component';
import { ViewModel } from './ViewModel';
import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';

@Component({
  components: {
    fullScreensLayout,
    buttonPrimary
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
  width: 60%;
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
  pointer-events: none;
}

.buttonG {
  position: absolute;
  width: 80px;
  height: 122px;
  right: 40px;
  bottom: 50%;
}
.button_style1 {
  margin-top: 61px;
  width: 80px;
  height: 42px;
}

.button_style2 {
  width: 80px;
  height: 42px;
  margin-top: 38px;
}

#tip {
  position: absolute;
  width: 414px;
  height: 258px;
  top: 50%;
  margin-top: 19px;
  right: 128px;
  background-repeat: no-repeat;
  background-position: top right;
  background-size: contain;
  pointer-events: none;
}

#msg {
  position: absolute;
  width: 414px;
  height: 165px;
  bottom: 50%;
  right: 128px;
  margin-bottom: 19px;
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: contain;
  pointer-events: none;
}
@media screen and (min-height: 600px) and (max-height: 800px) {
  #tip {
    width: 300px;
    height: 200px;
    right: 110px;
    margin-top: 6px;
  }
  .buttonG {
    height: 96px;
    right: 24px;
  }
  .button_style1 {
    margin-top: 48px;
  }
  .button_style2 {
    margin-top: 12px;
  }
  #msg {
    width: 300px;
    height: 120px;
    margin-bottom: 6px;
    right: 110px;
  }
}
@media screen and (min-height: 450px) and (max-height: 599px) {
#tip {
    width: 235px;
    height: 200px;
    right: 110px;
    margin-top: 6px;
  }
  .buttonG {
    height: 96px;
    right: 24px;
  }
  .button_style1 {
    margin-top: 48px;
  }
  .button_style2 {
    margin-top: 12px;
  }
  #msg {
    width: 235px;
    height: 120px;
    margin-bottom: 6px;
    right: 110px;
  }
}

@media screen and (min-height: 300px) and (max-height: 449px) {
  #tip {
    width: 207px;
    height: 129px;
    right: 110px;
    margin-top: 6px;
  }
  .buttonG {
    height: 96px;
    right: 24px;
  }
  .button_style1 {
    margin-top: 48px;
  }
  .button_style2 {
    margin-top: 12px;
  }
  #Container3d{
    width: 50%;
    height: 100%;
  }
  #msg {
    width: 206px;
    height: 82.5px;
    margin-bottom: 6px;
    right: 110px;
  }
}

#Container {
  background-color: #333333;
}

</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
</style>
