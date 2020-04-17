<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="Container" style="width: 100%; height: 100%;">
          <div id="Container3d">
            <div class="btn-group">
              <div class="btn" v-for="(item, index) in orderList" :key="index">
                <div class="orderTextdiv" @click="showItem(index)">
                  <div
                    class="orderText"
                    v-show="item.show"
                    v-html="columnsOrRows===2?item.textRows:item.textColumns"
                  />
                </div>
              </div>
            </div>
            <div class="left-sys">
              <div class="left-arrow" :style="`background-image: url(${pictop})`" />
              <div class="left-txt" v-html="btntext[4]" />
            </div>
            <div class="bottom-sys">
              <div class="bottom-arrow" :style="`background-image: url(${picright})`" />
              <div class="bottom-txt" v-html="btntext[5]" />
            </div>
            <div class="left-group">
              <div class="left-group-btn" v-for="(item, index) in numList" :key="index">
                <div class="group-txt" v-html="item.no" />
              </div>
            </div>
            <div class="bottom-group">
              <div class="bottom-group-btn" v-for="(item, index) in numbList" :key="index">
                <div class="group-txt" v-html="item.no" />
              </div>
            </div>
            <div class="table">
              <div class="orderText" v-html="btntext[2]" />
            </div>
            <div id="msg">
                <div class="arrow" :style="`background-image: url(${pic})`"/>
                <div class="line"/>
                <p v-html="btntext[3]"/>
            </div>
          </div>
        </div>
        <div class="buttonG">
          <div class="button_style" @click="columnsOrRowsEvent(1)">
            <buttonRadius
              style="width: 100%"
              v-bind:title="btntext[0]"
              v-bind:actived="columnsOrRows===1"
            ></buttonRadius>
          </div>
          <div class="button_style" @click="columnsOrRowsEvent(2)">
            <buttonRadius
              style="width: 100%"
              v-bind:title="btntext[1]"
              v-bind:actived="columnsOrRows===2"
            ></buttonRadius>
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
import buttonRadius from '../../../babylon/template/ui/buttonRadius.vue';
import Component from 'vue-class-component';
import { ViewModel } from './ViewModel';

@Component({
  components: {
    fullScreensLayout,
    buttonRadius
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
  color: #ffffff;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 3;
  pointer-events: none;
}
#Container {
  background-color: #2c2c2c;
}
#Container3d {
  position: absolute;
  top: 0;
  bottom: 100px;
  left: 100px;
  right: 176px;
}
.btn-group {
  position: absolute;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  margin-top: -224px;
  margin-left: -392px;
  width: 784px;
  height: 448px;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
}

.left-group {
  position: absolute;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  margin-top: -224px;
  margin-left: -435px;
  width: 43px;
  height: 448px;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
}

.left-sys {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -224px;
  margin-left: -435px;
  width: 3px;
  height: 548px;
  background: #ffffff;
  display: flex;
}
.left-arrow {
  position: absolute;
  margin-left: -9px;
  margin-top: -20px;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  pointer-events: none;
}
.left-txt {
  position: absolute;
  margin-left: -26px;
  margin-top: 0px;
  font-size: 22px;
  color: #ffffff;
}

.left-group-btn {
  box-sizing: border-box;
  width: 100%;
  height: 14.28%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.group-txt {
  width: 100%;
  height: 22px;
  font-size: 22px;
  color: #ffffff;
  text-align: center;
  line-height: 22px;
}

.bottom-group {
  position: absolute;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  margin-top: 224px;
  margin-left: -392px;
  width: 784px;
  height: 43px;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
}

.bottom-group-btn {
  box-sizing: border-box;
  width: 14.28%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bottom-sys {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 267px;
  margin-left: -492px;
  width: 884px;
  height: 3px;
  background: #ffffff;
}
.bottom-arrow {
  position: absolute;
  margin-left: 884px;
  margin-top: -9px;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  pointer-events: none;
}
.bottom-txt {
  position: absolute;
  margin-left: 858px;
  margin-top: 5px;
  font-size: 22px;
  color: #ffffff;
}

.table {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -75px;
  margin-top: 327px;
  width: 150px;
  height: 52px;
  background: #ffc566;
  border-radius: 8px;
}

.btn {
  box-sizing: border-box;
  width: 14.28%;
  height: 14.28%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.orderTextdiv {
  width: 100px;
  height: 52px;
  background: #ffc566;
  border-radius: 8px;
  cursor: pointer;
}

.orderText {
  width: 100%;
  height: 34px;
  margin-top: 9px;
  font-size: 24px;
  color: #20203f;
  text-align: center;
  line-height: 34px;
  font-weight: 500;
}

.buttonG {
  position: absolute;
  width: 120px;
  height: 104px;
  bottom: 60px;
  right: 56px;
}

.button_style {
  width: 100%;
  height: 42px;
  margin-top: 10px;
}

#msg {
  position: absolute;
  width: 260px;
  height: 42px;
  top: 50%;
  margin-top: -22px;
  left: 50%;
  margin-left: 404px;
  z-index: 997;

}

.arrow{
  float: left;
  width: 10px;
  height: 10px;
  margin-top: 16px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  pointer-events: none;
}
.line{
  float: left;
  width: 56px;
  height: 2px;
  background: #ffffff;
  margin-top: 20px;
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
@media screen and (min-height: 600px) and (max-height: 799px), screen and (min-width: 970px) and (max-width: 1300px) {
  #Container3d {
    top: 0;
    bottom: 100px;
    left: 100px;
    right: 176px;
  }

  .btn-group {
    margin-top: -207px;
    margin-left: -308px;
    width: 616px;
    height: 413px;
  }

  .left-group {
    margin-top: -207px;
    margin-left: -358px;
    width: 43px;
    height: 413px;
  }

  .left-sys {
    margin-top: -207px;
    margin-left: -368px;
    width: 2px;
    height: 563px;
  }
  .left-arrow {
    margin-left: -9px;
    margin-top: -20px;
  }
  .left-txt {
    margin-left: -26px;
    margin-top: 0px;
  }

  .bottom-group {
    margin-top: 207px;
    margin-left: -308px;
    width: 616px;
    height: 43px;
  }

  .bottom-sys {
    margin-top: 250px;
    margin-left: -468px;
    width: 766px;
  }
  .bottom-arrow {
    margin-left: 766px;
    margin-top: -9px;
  }
  .bottom-txt {
    margin-left: 740px;
    margin-top: 5px;
  }

  .table {
    margin-left: -75px;
    margin-top: 277px;
    width: 150px;
    height: 43px;
  }

  .orderTextdiv {
    width: 74px;
    height: 43px;
  }

  .orderText {
    width: 100%;
    height: 28px;
    font-size: 18px;
    line-height: 28px;
    margin-top: 8px;
  }

  .buttonG {
    width: 120px;
    height: 104px;
    bottom: 60px;
    right: 56px;
  }

  .button_style {
    width: 100%;
    height: 42px;
    margin-top: 10px;
  }

  #msg {
    width: 260px;
    height: 42px;
    margin-top: -22px;
    margin-left: 320px;
  }

  .arrow{
    width: 10px;
    height: 10px;
    margin-top: 16px;
  }
  .line{
    width: 40px;
    margin-top: 20px;
  }
  #msg p {
    font-size: 16px;
    line-height: 30px;
    height: 30px;
    padding: 5px 8px;
    border-radius: 6px;
  }
}

@media screen and (min-height: 450px) and (max-height: 599px), screen and (min-width: 780px) and (max-width: 969px) {
  .buttonG {
    bottom: 24px;
    right: 24px;
  }
  #Container3d {
    bottom: 70px;
    left: 100px;
    right: 148px;
  }

  .btn-group {
    margin-top: -140px;
    margin-left: -238px;
    width: 476px;
    height: 280px;
  }

  .orderTextdiv {
    width: 60px;
    height: 32px;
    border-radius: 6px;
  }

  .left-group {
    margin-top: -140px;
    margin-left: -280px;
    width: 43px;
    height: 280px;
  }

  .bottom-group {
    margin-top: 132px;
    margin-left: -238px;
    width: 476px;
    height: 43px;
  }
  .left-sys {
    margin-top: -140px;
    margin-left: -280px;
    width: 2px;
    height: 380px;
  }

  .left-arrow {
    margin-left: -4px;
    margin-top: -10px;
    width: 10px;
    height: 10px;
  }

  .left-txt {
    font-size: 16px;
    margin-left: -20px;
    margin-top: 0px;
  }
  .bottom-sys {
    margin-top: 175px;
    margin-left: -338px;
    width: 576px;
  }
  .bottom-arrow {
    margin-left: 576px;
    margin-top: -4px;
    width: 10px;
    height: 10px;
  }
  .bottom-txt {
    margin-left: 548px;
    margin-top: 5px;
    font-size: 16px;
  }
  .table {
    margin-left: -60px;
    margin-top: 210px;
    width: 120px;
    height: 32px;
    border-radius: 6px;
  }

  .orderText {
    width: 100%;
    height: 18px;
    font-size: 18px;
    line-height: 19px;
    margin-top: 7px;
  }

  #msg {
    width: 256px;
    height: 32px;
    margin-top: -16px;
    margin-left: 238px;
  }
  .arrow{
    width: 10px;
    height: 10px;
    margin-top: 11px;
  }
  .line{
    width: 30px;
    margin-top: 15px;
  }
  #msg p {
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    height: 22px;
    padding: 5px 5px;
    border-radius: 6px;
  }
}

@media screen and (max-height: 449px), screen and (max-width: 779px) {
  .title_text {
    font-size: 20px;
    line-height: 20px;
    top: 20px;
    left: 24px;
    z-index: 3;
  }
  .buttonG {
    bottom: 24px;
    right: 24px;
    width: 100px;
    height: 64px;
  }

  .button_style {
    width: 100%;
    height: 28px;
    margin-top: 8px;
  }

  #Container3d {
    bottom: 0;
    left: 72px;
    right: 144px;
  }

  .btn-group {
    margin-top: -116px;
    margin-left: -189px;
    width: 378px;
    height: 196px;
  }

  .orderTextdiv {
    width: 50px;
    height: 24px;
    border-radius: 4px;
  }

  .left-group {
    margin-top: -116px;
    margin-left: -217px;
    width: 28px;
    height: 196px;
  }
  .left-sys {
    margin-top: -116px;
    margin-left: -217px;
    width: 2px;
    height: 244px;
  }

  .left-arrow {
    margin-left: -4px;
    margin-top: -10px;
    width: 10px;
    height: 10px;
  }

  .left-txt {
    font-size: 16px;
    margin-left: -20px;
    margin-top: 0px;
  }
  .bottom-sys {
    margin-top: 105px;
    margin-left: -232px;
    width: 428px;
    height: 2px;
  }
  .bottom-arrow {
    margin-left: 428px;
    margin-top: -4px;
    width: 10px;
    height: 10px;
  }
  .bottom-txt {
    margin-left: 408px;
    margin-top: 5px;
    font-size: 16px;
  }
  .bottom-group {
    margin-top: 72px;
    margin-left: -189px;
    width: 378px;
    height: 43px;
  }
  .group-txt {
    height: 16px;
    font-size: 16px;
    line-height: 16px;
  }
  .table {
    margin-left: -50px;
    margin-top: 129px;
    width: 100px;
    height: 24px;
    border-radius: 4px;
  }
  .orderText {
    height: 24px;
    margin-top: 0;
    font-size: 14px;
    line-height: 24px;
  }

  #msg {
    width: 180px;
    height: 28px;
    margin-top: -32px;
    margin-left: 189px;
  }

  .arrow{
    width: 10px;
    height: 10px;
    margin-top: 9px;
  }
  .line{
    width: 25px;
    height: 2px;
    margin-top: 13px;
  }
  #msg p {
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    height: 18px;
    padding: 5px 5px;
    border-radius: 5px;
  }
}
</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
</style>
