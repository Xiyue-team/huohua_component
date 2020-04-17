<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="Container" style="width: 100%; height: 100%;">
          <div id="block" :style="`width: ${blockWidth}px;background-image: url(${picbg})`"></div>
          <div
            id="block"
            v-for="(item, index) in btns"
            v-show="item.show"
            :style="`width: ${blockWidth}px;background-image: url(${item.pic})`"
            :key="index"
          ></div>
          <div id="block">
            <div
              class="button_style"
              v-show="item.showIndex===bgbuttonActived"
              :style="`transform: rotate(${item.deg}deg);left: ${item.left}px; top:${item.top}px`"
              v-for="(item, index) in option"
              @click="buttonEvent(index)"
              :key="index" >
              <tipButton v-bind:title="item.text"></tipButton>
            </div>
          </div>
          <div class="buttonG">
            <div
              v-for="(item, index) in btns"
              class="buttonG_style"
              @click="bgbuttonEvent(index)"
              :key="index">
                <buttonImage 
                  v-bind:image="item.icon"
                  v-bind:text="item.text"
                  v-bind:actived="item.show"
                ></buttonImage>
            </div>
          </div>
          <transition name="fade">
            <div id="tcontainer" v-show="buttonActived>-1">
              <div class="back" @click="resetEvent()" :style="`background-image: url(${picback})`"/>
              <div class="frontimage" v-show="buttonActived === index" v-for="(item, index) in option" :style="`background-image: url(${item.bgSrc})`" :key="index">
                <div id="tip" v-html="item.tip"/>
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
  import tipButton from './ui/tipButton.vue';
  import buttonImage from './ui/buttonImage.vue';
@Component({
  components: {
    fullScreensLayout,
    buttonPrimary,
    buttonImage,
    tipButton
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
  color: #333333;
  position: absolute;
  font-weight: bold;
  letter-spacing:2px;
  top: 24px;
  left: 24px;
  z-index: 3;
}

#Container {
  background-color: #ffffff;
}

#block {
  float: left;
  height: 100%;
  left: 0;
  position: absolute;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.buttonG {
  position: absolute;
  width: 270px;
  background: #ffffff;
  height: 100%;
  right: 0;
  padding: 0 84px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-pack: center;
  -webkit-box-align: center;

  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-pack: center;
  -moz-box-align: center;

  display: -o-box;
  -o-box-orient: vertical;
  -o-box-pack: center;
  -o-box-align: center;

  display: -ms-box;
  -ms-box-orient: vertical;
  -ms-box-pack: center;
  -ms-box-align: center;

  display: box;
  box-orient: vertical;
  box-pack: center;
  box-align: center;
}

.buttonG_style {
  width: 100%;
  height: 56px;
  margin-top: 44px;
}

#tcontainer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: #ffffff;
  z-index: 4;
}

#tip {
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  font-size: 20px;
  color: #ffffff;
  line-height: 28px;
  padding: 24px;
  width: 392px;
  height: auto;
  right: 48px;
  bottom: 48px;
  border-radius: 2px;
  z-index: 999;
}


.frontimage {
  width: 100%;
  height: 100%;
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
}

.button_style {
  position: absolute;
  width: 0;
  height: 0;
  cursor: pointer;
}

.back {
  position: absolute;
  width: 60px;
  height: 60px;
  top: 12px;
  left: 12px;
  cursor: pointer;
  z-index: 999;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

@media screen and (min-height: 600px) and (max-height: 800px)
, screen and (min-width: 950px) and (max-width: 1500px) {
    .buttonG {
    width: 270px;
    padding: 0 24px;
  }
}

@media screen and (min-height: 450px) and (max-height: 599px)
, screen and (min-width: 700px) and (max-width: 949px)  {
  .title_text {
    font-size: 18px;
    line-height: 18px;
    letter-spacing:1px;
  }
  .buttonG {
    width: 200px;
    padding: 0 24px;
  }
  .buttonG_style {
    width: 100%;
    height: 42px;
    margin-top: 36px;
  }
  .fronttip{
    padding: 15px;
    font-size: 16px;
    line-height: 22px;
  }
}

@media screen and (max-height: 449px), 
screen and (max-width: 699px) {
  .title_text {
    font-size: 14px;
    line-height: 14px;
    top: 10px;
    left: 10px;
    letter-spacing:1px;
  }
  #tip {
    padding: 12px;
    width: 177px;
    font-size: 16px;
    line-height: 18px;
  }

  .buttonG {
    width: 200px;
    padding: 0 24px;
  }

  .buttonG_style {
    width: 100%;
    height: 42px;
    margin-top: 24px;
  }
  .fronttip{
    padding: 10px;
    font-size: 14px;
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
