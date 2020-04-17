<template>
  <div class='aspectration bg_white covered root_div_container '>

    <div class='control-panel_div_content' style='background-color: white;color: #FFFFFF;'>

      <h2 id="title" class='title_induction'>水的电离</h2>

      <div class='view_div_content' style='background-color: white;border: 1px solid #000000;' data-ratio='1:1' >
        <div id='box' style='width: 100%;height: 100%;'></div>

      </div>
    </div>
    <div class='control-panel_div_rt'>
      <div class='button_border ' style='display:inline-block;width:48px;height:40px;float: right;' id='reset'  @click='reset'>
        <img style='width: 24px;height: 24px;  margin-top: 8px;margin-left: 12px' src='../../../../static/images/chongzhi.png' alt=''>
      </div>
        <div class='button_option' style='margin-top: 70px;'>
          <div style="text-align: center;width: 240px;height: 200px;position: relative;">
            <img @click="temperatureChange" src="./sub_static/thermometer.png" class="thermometerImg" />
            <img v-bind:style="styleObject" src="./sub_static/line.png" class="temperatureLine"/>
          </div>

          <button @click="runHClAnimation" type='button' class='button' v-bind:class="{active:isActive}" style="height: 44px;width: 100%;margin-top: 18px;">滴加HCl</button>

          <!--<label  class="control-block_div_border"  id="s1" style="margin-top: 14px; padding-top: 10px ;padding-bottom: 10px ;" for="emjEnable" v-on:click="splitTriangleEvent">
            <input class="radio-default" type="radio" id="emjEnable" name="radio-group" >
            <label for="emjEnable">灵敏电流计</label>
          </label>-->
          <!--<label for="checkbox-3">-->
            <!--<div class="control-block_div_border switch" style="margin-top:10px;">-->
              <!--<input type="checkbox" name="checkbox-cats[]" id="checkbox-3" value="1" v-model="result">-->
              <!--<label for="checkbox-3">结论</label>-->
            <!--</div>-->
          <!--</label>-->

            <label for="checkbox-1" id="s1" class="control-block_div_border switch " style="margin-top: 14px;">
              <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" v-model="isShowGalvanometer" >
              <label for="checkbox-1">灵敏电流计</label>
            </label>

            <label for="checkbox-2" id="s2" class="control-block_div_border switch " style="margin-top: 14px;" >
              <input type="checkbox" name="checkbox-cats[]" id="checkbox-2" v-model="showEquation"  >
              <label for="checkbox-2">电离方程式</label>
            </label>


          <!--<label  class="control-block_div_border"  id="s2"  style="margin-top: 14px;padding-top: 10px ;padding-bottom: 10px ;" v-on:click="splicingTriangleEvent">
            <input class="radio-default" type="radio" id="bsjx"  name="radio-group" >
            <label for="bsjx">电离方程式</label>
          </label>-->

          <div style="text-align: center;margin-top: 26px;">
            <img v-show="showEquation" src="./sub_static/equation.png" style="width: 240px;height: 60px;"/>
          </div>

        </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import h_button from '../../../../src/component/ui/button.vue';
import h_switch from '../../../../src/component/ui/switch.vue';
import {SddjViewHandler} from './services/SddjViewHandler';
import {ViewController} from '../../../../src/core/ViewController';

export default Vue.extend({

    data() {
        return{
            temperature: 'down',
            showEquation: false,
            isActive: false,
            isShowGalvanometer: false,
            styleObject: {
                height: '18px'
            }
        };
    },
    components: {
      h_button,
      h_switch
    },

    created() {
        ViewController.getInstance(new SddjViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },

    mounted() {
        ViewController.getInstance().domReady();
    },

    watch: {
        isShowGalvanometer: function(val) {
            if(val) {
              (ViewController.getInstance().viewHandler as SddjViewHandler).sddjCanvasAnima.isShowText(1);
            } else {
              (ViewController.getInstance().viewHandler as SddjViewHandler).sddjCanvasAnima.isShowText(3);
            }

            (ViewController.getInstance().viewHandler as SddjViewHandler).sddjCanvasAnima.showGalvanometer(val);
        },
        showEquation: function(val) {
            if(val) {
              (ViewController.getInstance().viewHandler as SddjViewHandler).sddjCanvasAnima.isShowText(2);
            } else {
              (ViewController.getInstance().viewHandler as SddjViewHandler).sddjCanvasAnima.isShowText(3);
            }

        }
    },

    methods: {
      temperatureChange: function() {
              this.temperature = this.temperature === 'up' ? 'down' : 'up';
            if ( this.temperature === 'up') {
                (ViewController.getInstance().viewHandler as SddjViewHandler).sddjCanvasAnima.playHeatUp();
                this.styleObject.height = '85px';
            } else {
                (ViewController.getInstance().viewHandler as SddjViewHandler).sddjCanvasAnima.playHeatDown();
                this.styleObject.height = '18px';
            }
      },
      runHClAnimation: function() {
          if ( this.isActive  === true) {
              return;
          }
          (ViewController.getInstance().viewHandler as SddjViewHandler).sddjCanvasAnima.isShowText(0);
          (ViewController.getInstance().viewHandler as SddjViewHandler).sddjCanvasAnima.playHClAnimation();
          this.isActive = true;
      },
      reset: function() {
          this.isShowGalvanometer = false;
          this.showEquation = false;
          this.isActive = false;
          this.styleObject.height = '18px';
          this.temperature = 'down';
          (ViewController.getInstance().viewHandler as SddjViewHandler).sddjCanvasAnima.isShowText(3);
          (ViewController.getInstance().viewHandler as SddjViewHandler).reset();
      }
    }
});
</script>

<style scoped='scoped'>
  /*.control-block_div_border{*/
    /*padding-top: 20px;*/
    /*margin-top: 20px;*/
    /*background: #FFFFFF;*/
    /*border: 0 solid rgba(0,0,0,0.06);*/
    /*box-shadow: 0 1px 3px 0 rgba(0,0,0,0.20);*/
    /*border-radius: 6px;*/
  /*}*/


  .title_induction{
    width: 400px;
    height:100px;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #000000;
    line-height: 24px;
    position: absolute;
    left: 24px;
    top: 24px;
  }

  .view_div_content{
    width: 714px;
    height: 406px;
  }

.control-block_div_border:hover {
  cursor: pointer;
}
.temperatureLine {
  width: 9px;
  position: absolute;
  left: calc(50% - 18px);
  bottom: 68px;
  transition: height ease-in 1s;
}

.thermometerImg {
  width: 56px;
  height: 197px;
  position: absolute;
  left: calc(50% - 41px);
}

.thermometerImg:hover {
  cursor: pointer;
}

</style>
