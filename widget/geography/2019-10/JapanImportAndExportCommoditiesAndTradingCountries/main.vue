<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="Container" style="width: 100%; height: 100%;">
          <div class="block" :style="`background-image: url(${picbg})`"></div>
          <div class="block" v-show="buttonActived===0" :style="`background-image: url(${picpathIn})`"></div>
          <div class="block" v-show="buttonActived===1" :style="`background-image: url(${picpathOut})`"></div>
          <div class="block" v-for="(item, index) in frontList" v-show="item.active" :style="`background-image: url(${item.btn.front})`" :key="index"></div>
          <div class="panel">
            <div class="msg" v-show="buttonActived!==-1">{{msg}}</div>
            <div
              v-for="(item, index) in option"
              class="buttonG_style"
              :key="index" >
              <div
              class="button_text" @click="buttonEvent(index)" v-bind:class="{'active' : buttonActived===index}" v-html="item.title"></div>
              <div class="btnG" v-show="buttonActived===index">
              <div
                class="button_style"
                v-for="(item, index) in frontList"
                @click="buttonCellEvent(index)"
                :key="index">
                <buttonImage 
                  v-bind:image="item.btn.icon"
                  v-bind:text="item.btn.text"
                  v-bind:actived="item.active"
                ></buttonImage>
              </div>
              <div class="button_style" @click="buttonAllEvent(index)">
                  <buttonPrimary
                  style="width: 100%"
                  v-bind:title="btn"
                  v-bind:actived="buttonAllActived"
                  type="ellipse"
                ></buttonPrimary>
              </div>
            </div>
            </div>
          </div>
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
  import buttonImage from './ui/buttonImage.vue';
  import buttonPrimary from './ui/buttonPrimary.vue';
@Component({
  components: {
    fullScreensLayout,
    buttonImage,
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

.title_text {
  font-size: 24px;
  line-height: 24px;
  color: #525252;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 3;
}

#Container {
  background-color: #d4f4ff;
}

.block {
  left: 0;
  right: 400px;
  top: 5%;
  bottom: 5%;
  position: absolute;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.panel {
  position: absolute;
  top: 0;
  width: 376px;
  right: 0;
  bottom: 0;
  padding: 0 12px;
  background: #ffffff;

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

.msg {
  font-size: 18px;
  font-weight:500;
  color: #525252;
  padding: 72px 0px;
  line-height: 27px;
}


.buttonG_style {
  width: 100%;
  height: auto;
  margin-top: 24px;
  background: #FFFFFF;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
  border-radius: 21px;
}

.btnG {
  min-height: 100px;
  width: 100%;
  padding: 6px;
}

.button_style {
  float: left;
  width: 110px;
  height: 42px;
  margin: 0 6px 12px 6px;
  cursor: pointer;
}
.button_text{
  height: 42px;
  font-size: 16px;
  line-height: 42px;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
}

.button_text:active{
  font-size: 18px;
  font-weight: 900;
}

.button_text.active{
  font-size: 18px;
  font-weight: 900;
}


@media screen and (min-height: 600px) and (max-height: 800px) {
}

@media screen and (min-height: 450px) and (max-height: 599px) {
  .panel {
    width: 308px;
    padding: 0 8px 0 8px;
  }
  .block {
    left: 0px;
    right: 324px;
  }
  .btnG {
    min-height: 70px;
    width: 100%;
    padding: 3px;
  }
  .msg {
    padding: 36px 0px;
    font-size: 16px;
    line-height: 20px;
  }

  .button_style {
    width: 95px;
    height: 32px;
    margin: 0 3px 6px 3px;
  }
}

@media screen and (max-height: 449px) {
  .title_text {
    font-size: 16px;
    line-height: 20px;
    top: 10px;
    left: 10px;
  }
  .block {
    left: 36px;
    right: 270px;
  }
  .panel {
    width: 262px;
    padding: 38px 4px 0 4px;
  }

  .msg {
    padding: 4px 0px;
    font-size: 12px;
    line-height: 16px;
  }

  .btnG {
    min-height: 50px;
    width: 100%;
    padding: 2px;
  }

  .buttonG_style {
    margin-top: 8px;
    border-radius: 14px;
  }
  .button_text{
    height: 28px;
    font-size: 16px;
    line-height: 28px;
  }
  .button_style {
    width: 80px;
    height: 28px;
    margin: 0 2px 4px 2px;
  }
}

</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
</style>
