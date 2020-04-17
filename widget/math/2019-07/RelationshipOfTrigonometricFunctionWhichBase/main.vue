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
          <div class="button_style1" @click="ButtonEvent(1)">
            <buttonColorPrimary
              style="width: 100%"
              v-bind:title="btnTitle[0]"
              v-bind:actived="buttonActived1"
              type="ellipse"
            ></buttonColorPrimary>
          </div>
          <div class="button_style" @click="ButtonEvent(2)">
            <buttonColorPrimary
              style="width: 100%"
              v-bind:title="btnTitle[1]"
              v-bind:actived="buttonActived2"
              type="ellipse"
            ></buttonColorPrimary>
          </div>
          <div class="button_style" @click="ButtonEvent(3)">
            <buttonColorPrimary
              style="width: 100%"
              v-bind:title="btnTitle[2]"
              v-bind:actived="buttonActived3"
              type="ellipse"
            ></buttonColorPrimary>
          </div>
          <div class="button_style" @click="ButtonEvent(4)">
            <buttonColorPrimary
              style="width: 100%"
              v-bind:title="btnTitle[3]"
              v-bind:actived="buttonActived4"
              type="ellipse"
            ></buttonColorPrimary>
          </div>
          <div class="button_style" @click="ButtonEvent(5)">
            <buttonColorPrimary
              style="width: 100%"
              v-bind:title="btnTitle[4]"
              v-bind:actived="buttonActived5"
              type="ellipse"
            ></buttonColorPrimary>
          </div>
          <div class="button_style2" @click="ButtonEvent(6)">
            <buttonColorPrimary
              style="width: 100%"
              v-bind:title="btnTitle[5]"
              v-bind:actived="buttonActived6"
              type="ellipse"
            ></buttonColorPrimary>
          </div>
        </div>

        <div class="buttonG2">
          <div class="img_style1">
            <div id="tip1" v-if="buttonActived1" :style="`background-image: url(${pics[0]})`"></div>
          </div>
          <div class="img_style">
            <div id="tip2" v-if="buttonActived2" :style="`background-image: url(${pics[1]})`"></div>
          </div>
          <div class="img_style">
            <div id="tip3" v-if="buttonActived3" :style="`background-image: url(${pics[2]})`"></div>
          </div>
          <div class="img_style">
            <div id="tip4" v-if="buttonActived4" :style="`background-image: url(${pics[3]})`"></div>
          </div>
          <div class="img_style">
            <div id="tip5" v-if="buttonActived5" :style="`background-image: url(${pics[4]})`"></div>
          </div>
          <div class="img_style2">
            <div id="tip6" v-if="buttonActived6" :style="`background-image: url(${pics[5]})`"></div>
          </div>
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
import buttonColorPrimary from '../../../babylon/template/ui/buttonColorPrimary.vue';
@Component({
  components: {
    fullScreensLayout,
    buttonColorPrimary
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
  margin-left: 20%;
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
  width: 220px;
  height: 342px;
  right: 40px;
  bottom: 50%;
}
.buttonG2 {
  position: absolute;
  width: 188px;
  height: 370px;
  left: 40px;
  bottom: 50%;
}
.button_style1 {
  width: 170px;
  height: 42px;
  margin-left: 50px;
  margin-top: 171px;
}
.button_style {
  width: 170px;
  height: 42px;
  margin-left: 50px;
  margin-top: 20px;
}
.button_style2 {
  width: 220px;
  height: 42px;
  margin-top: 20px;
}

.img_style1 {
  width: 188px;
  height: 40px;
  margin-top: 185px;
}
.img_style {
  width: 188px;
  height: 40px;
  margin-top: 20px;
}

.img_style2 {
  width: 188px;
  height: 70px;
  margin-top: 20px;
}

#tip1,
#tip2,
#tip3,
#tip4,
#tip5,
#tip6 {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center left;
  background-size: contain;
   pointer-events: none;
}
@media screen and (min-height: 600px) and (max-height: 800px) {
  .buttonG {
  width: 220px;
  height: 282px;
  right: 24px;
  bottom: 50%;
}
  .buttonG2 {
  height: 282px;
  left: 24px;
  bottom: 50%;
}
.button_style1 {
    width: 170px;
    margin-left: 50px;
    margin-top: 141px;
  }
  .button_style {
    width: 170px;
    margin-left: 50px;
    margin-top: 6px;
  }

  .button_style2 {
    width: 220px;
    margin-left: 0px;
    margin-top: 6px;
  }
   .img_style1 {
     margin-top: 141px;
  }
  .img_style {
    margin-top: 6px;
  }

  .img_style2 {
    margin-top: 6px;
  }

}

@media screen and (min-height: 450px) and (max-height: 599px) {
  .buttonG {
    width: 220px;
    height: 282px;
    right: 24px;
    top: 80px;
  }
  .buttonG2 {
    height: 282px;
    left: 24px;
    top: 70px;
  }
  .button_style1 {
    width: 170px;
    margin-left: 50px;
    margin-top: 0px;
  }
  .button_style {
    width: 170px;
    margin-left: 50px;
    margin-top: 6px;
  }

  .button_style2 {
    width: 220px;
    margin-left: 0px;
    margin-top: 6px;
  }
   .img_style1 {
     margin-top: 0px;
  }
  .img_style {
    margin-top: 6px;
  }

  .img_style2 {
    margin-top: 6px;
  }

}

@media screen and (min-height: 300px) and (max-height: 449px) {
  .buttonG {
  width: 180px;
  height: 140px;
  right: 24px;
   bottom: 50%;
}
  .buttonG2 {
  height: 140px;
  left: 72px;
   bottom: 50%;
}

.button_style1 {
    width: 130px;
    height: 28px;
    margin-left: 50px;
    margin-top: 50px;
  }
  .button_style {
    width: 130px;
    height: 28px;
    margin-left: 50px;
    margin-top: 6px;
  }

  .button_style2 {
    width: 100%;
    height: 28px;
    margin-left: 0px;
    margin-top: 6px;
  }
   .img_style1 {
    height: 24px;
    margin-top: 50px;
  }
  .img_style {
    height: 24px;
    margin-top: 4px;
  }

  .img_style2 {
    height: 48px;
    margin-top: 4px;
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
