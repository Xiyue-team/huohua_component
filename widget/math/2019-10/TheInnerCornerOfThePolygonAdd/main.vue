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
              <div id="msg" v-show="msgShow">
                <p v-html="text[6]"/>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="buttonG">
            <div class="button_style1" @click="selectMode(1)">
              <buttonRadius
                style="width: 100%"
                v-bind:title="btntext[0]"
                v-bind:actived="buttonActived===1"
              ></buttonRadius>
            </div>
            <div class="button_style" @click="selectMode(2)">
              <buttonRadius
                style="width: 100%"
                v-bind:title="btntext[1]"
                v-bind:actived="buttonActived===2"
              ></buttonRadius>
            </div>
            <div class="button_style" @click="selectMode(3)">
              <buttonRadius
                style="width: 100%"
                v-bind:title="btntext[2]"
                v-bind:actived="buttonActived===3"
              ></buttonRadius>
            </div>
          </div>
          <div class="stepG">
            <p>边数</p>
            <div class="dot_style" v-for="(item, index) in option" @click="sideEvent(item.id)">
              <buttonDot
                style="width: 100%"
                v-bind:title="`${item.id}`"
                v-bind:actived="sideActived===item.id"
                v-bind:disabled="3===item.id&&buttonActived===1"
                type="ellipse"
              ></buttonDot>
            </div>
            <div class="dot_style" :style="`background-image: url(${pic})`"></div>
            <div class="smallbtn" @click="inductionEvent()">
              <smallRadius
                style="width: 100%"
                v-bind:title="text[0]"
                v-bind:actived="inductionActived"
              ></smallRadius>
            </div>
          </div>
          <div class="msgG">
            <p>{{text[1]}}</p>
            <p class="num">{{`${msg.lineNumber}`}}</p>
            <p>{{text[2]}}</p>
          </div>
          <div class="msgG">
            <p>{{text[3]}}</p>
            <p class="num">{{`${msg.triangularNumber}`}}</p>
            <p>{{text[4]}}</p>
          </div>
          <div class="msgG">
            <p>{{text[5]}}</p>
            <p class="num">{{msg.angle}}</p>
          </div>
        </div>
        <transition name="fade">
          <div id="tcontainer" v-show="inductionActived" style="width: 100%; height: 100%;">
            <div class="weather-bg" :style="`background-image: url(${picInduction})`">
              <div class="back" @click="inductionEvent()"></div>
            </div>
          </div>
        </transition>
      </template>
    </fullScreensLayout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
import buttonRadius from './ui/buttonRadius.vue';
import buttonDot from './ui/buttonDot.vue';
import smallRadius from './ui/smallRadius.vue';
import Component from 'vue-class-component';
import { ViewModel } from './ViewModel';

@Component({
  components: {
    fullScreensLayout,
    buttonRadius,
    buttonDot,
    smallRadius
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
#Container3d {
  position: absolute;
  left: 0;
  right: 371px;
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

.panel {
  position: fixed;
  width: 339px;
  height: 200px;
  bottom: 50%;
  right: 32px;
}
.buttonG {
  width: 100%;
  height: 42px;
  margin-top: 100px;
}
.button_style1 {
  float: left;
  width: 80px;
  height: 100%;
  margin-left: 13px;
}
.button_style {
  float: left;
  width: 113px;
  height: 100%;
  margin-left: 10px;
}

.dot_style {
  float: left;
  width: 24px;
  height: 24px;
  margin: 18px 10px 18px 0px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.smallbtn {
  float: left;
  width: 60px;
  height: 24px;
  margin: 18px 0px 18px 0px;
}

.stepG {
  width: 326px;
  height: 60px;
  margin-left: 13px;
  margin-top: 24px;
  background: rgba(81, 81, 81, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 6px;
}

.stepG p {
  float: left;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
  line-height: 16px;
  margin: 22px 10px 22px 10px;
}

.msgG {
  width: 326px;
  height: 24px;
  margin-top: 24px;
  margin-left: 13px;
}
.msgG p {
  float: left;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
  line-height: 24px;
  margin-left: 0px;
}

.num {
  padding-left: 4px;
  padding-right: 4px;
  min-width: 36px;
  height: 22px;
  float: left;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
  line-height: 22px;
  background: rgba(81, 81, 81, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-left: 4px;
  margin-right: 4px;
}
#Container {
  background-color: #333333;
}

#tcontainer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: rgba(0, 0, 0, 0.91);
  z-index: 999;
}

.weather-bg {
  position: absolute;
  width: 1058px;
  height: 360px;
  left: 50%;
  top: 50%;
  margin-top: -180px;
  margin-left: -529px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.back {
  position: absolute;
  width: 40px;
  height: 40px;
  right: 4%;
  top: 0;
  cursor: pointer;
  z-index: 999;
}
#msg {
  position: absolute;
  width: 260px;
  height: 42px;
  margin-top: -22px;
  margin-left: 10px;
  z-index: 997;
}

#msg p {
  float: left;
  font-size: 16px;
  text-align: center;
  font-weight: 500;
  color: #ffffff;
  line-height: 30px;
  width: auto;
  height: 30px;
  padding: 5px 10px;
  background: rgba(81, 81, 81, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}
@media screen and (min-height: 450px) and (max-height: 599px), screen and (min-width: 850px) and (max-width: 1095px) {
  .panel {
    right: 24px;
  }
  #Container3d {
    right: 363px;
  }

  .weather-bg {
  position: absolute;
  width: 793.5px;
  height: 270px;
  margin-top: -135px;
  margin-left: -397px;
}
}
@media screen and (max-height: 449px), screen and (max-width: 849px) {
  .weather-bg {
  width: 529px;
  height: 180px;
  margin-top: -90px;
  margin-left: -264.5px;
}
.back {
  position: absolute;
  width: 28px;
  height: 28px;
}
  #Container3d {
    right: 297px;
  }

  .panel {
    width: 273px;
    height: 200px;
    bottom: 50%;
    right: 24px;
  }
  .buttonG {
    width: 100%;
    height: 28px;
    margin-top: 100px;
  }
  .button_style1 {
    float: left;
    width: 70px;
    height: 100%;
    margin-left: 13px;
  }
  .button_style {
    float: left;
    width: 87px;
    height: 100%;
    margin-left: 8px;
  }

  .dot_style {
    float: left;
    width: 20px;
    height: 20px;
    margin: 10px 6px 10px 0px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
  .smallbtn {
    float: left;
    width: 50px;
    height: 20px;
    margin: 10px 0px 10px 0px;
  }
  .stepG {
    width: 260px;
    height: 40px;
    margin-left: 13px;
    margin-top: 12px;
    border-radius: 5px;
  }

  .stepG p {
    float: left;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    height: 16px;
    line-height: 16px;
    margin: 12px 6px 12px 6px;
  }

  .msgG {
    width: 326px;
    height: 24px;
    margin-top: 12px;
    margin-left: 13px;
  }
  .msgG p {
    float: left;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    line-height: 24px;
    margin-left: 0px;
  }

  .num {
    margin-left: 4px;
    min-width: 36px;
    height: 22px;
    float: left;
    font-size: 12px;
    color: #ffffff;
    text-align: center;
    line-height: 22px;
    border-radius: 4px;
  }

  #msg {
  position: absolute;
  width: 160px;
  height: 20px;
  margin-top: -15px;
  margin-left: 10px;
}

#msg p {
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  height: 20px;
  padding: 2px 5px;
  border-radius: 4px;
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
