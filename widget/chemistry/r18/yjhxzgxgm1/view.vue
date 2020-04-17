<template>
  <div class="aspectration bg_white covered root_div_container backGroundImage">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <img src="./sub_static/modelImage1/bgImage.png" style="position: absolute; width: 100%; height: 100%"/>
        <!--<span class="title_induction">有机化学中共线共面 </span>-->
        <div id="box" class="stage centerDiv" v-show="true">
          <div class="threeModelImage centerDiv" v-show="coverModelStage">
            <div class="modelImage1" @click="modelImage1">
              <img src="./sub_static/modelImage1/model1.png"/>
            </div>
            <div class="modelImage2">
              <img src="./sub_static/modelImage1/model1.png"/>
            </div>
            <div class="modelImage3">
              <img src="./sub_static/modelImage1/model1.png"/>
            </div>
          </div>

          <div class="modelStage" v-show="specificModelStage1">
            <div class="threeSmallModel">
              <div class="smallModel mouseStylePointer" @click="smallModelStage11" v-bind:class="{ event_disabled: disableSmallModel1 }">
                <img src="./sub_static/modelImage1/smallModel1.png"/>
              </div>
              <div class="smallModel mouseStylePointer" @click="smallModelStage12" v-bind:class="{ event_disabled: disableSmallModel2 }">
                <img src="./sub_static/modelImage1/smallModel2.png"/>
              </div>
              <div class="smallModel mouseStylePointer" @click="smallModelStage13" v-bind:class="{ event_disabled: disableSmallModel3 }">
                <img src="./sub_static/modelImage1/smallModel3.png"/>
              </div>
            </div>

            <div class="bigModel centerDiv">
              <div class="bigModelImage" v-show="showBigModel === 1">
                <img src="./sub_static/bigModelImage/bigModel1.png"/>
              </div>

              <div class="bigModelImage" v-show="showBigModel === 2">
                <img src="./sub_static/bigModelImage/bigModel2.png"/>
              </div>

              <div class="bigModelImage" v-show="showBigModel === 3">
                <img src="./sub_static/bigModelImage/bigModel3.png"/>
              </div>

              <div class="bigModelImage" v-show="showBigModel === 4">
                <img src="./sub_static/bigModelImage/bigModel4.png"/>
              </div>

              <div class="bigModelImage" v-show="showBigModel === 5">
                <img src="./sub_static/bigModelImage/bigModel5.png"/>
              </div>

              <div class="bigModelImage" v-show="showBigModel === 6">
                <img src="./sub_static/bigModelImage/bigModel6.png"/>
              </div>

              <div class="bigModelImage" v-show="showBigModel === 7">
                <img src="./sub_static/bigModelImage/bigModel7.png"/>
              </div>

              <div class="bigModelImage" v-show="showBigModel === 8">
                <img src="./sub_static/bigModelImage/bigModel8.png"/>
              </div>

              <div class="bigModelImage" v-show="showBigModel === 9">
                <img src="./sub_static/bigModelImage/bigModel9.png"/>
              </div>

              <div class="bigModelImage" v-show="showBigModel === 10">
                <img src="./sub_static/bigModelImage/bigModel10.png"/>
              </div>

              <div class="rotateImage1 mouseStylePointer" @click="rotateImage1" v-show="showRotateImage1">
                <img src="./sub_static/modelImage1/rotateImage.png"/>
              </div>

              <div class="rotateImage2 mouseStylePointer" @click="rotateImage2" v-show="showRotateImage2">
                <img src="./sub_static/modelImage1/rotateImage.png"/>
              </div>

              <keyFrameAnimation class="keyFrameAnimation" v-bind="animationOption1"  ref="animate1" v-bind:isEnd.sync="isEnd1" v-show="showBigModel === 11">

              </keyFrameAnimation>

              <keyFrameAnimation class="keyFrameAnimation" v-bind="animationOption2"  ref="animate2" v-bind:isEnd.sync="isEnd2" v-show="showBigModel === 12" v-model="animateFrame">

              </keyFrameAnimation>
            </div>


          </div>
        </div>
      </template>
      <template slot="controlPanel" slot-scope="controlPanel">
        <div  id="controlPanel" >
          <div class="threeButton">
            <div @click="coplanarAtom" v-bind:class="{ event_disabled: disableCoplanarAtom }">
              <h_button class="h_button1" style="position: absolute; top: 0px"  title="共面原子" v-bind:isActive.sync="isActive1"
                        v-bind:clickNumber.sync="clickNumber1"></h_button>
            </div>

            <div @click="collinearAtom" v-bind:class="{ event_disabled: disableCollinearAtom }">
              <h_button class="h_button2" style="position: absolute; top: 50%; margin-top: -21px"  title="共线原子" v-bind:isActive.sync="isActive2"
                        v-bind:clickNumber.sync="clickNumber2"></h_button>
            </div>

            <div @click="rotatableKey" v-bind:class="{ event_disabled: disableRotatableKey }">
              <h_button class="h_button3" style="position: absolute; bottom: 0px"  title="可旋转键" v-bind:isActive.sync="isActive3"
                        v-bind:clickNumber.sync="clickNumber3"></h_button>
            </div>
          </div>
        </div>
      </template>
    </fullScreens_layout>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import h_button from '../../../../src/component/ui/buttonEllipse.vue';
import './view.css';
import fullScreens_layout from '../../../../src/component/layout/fullScreens_layout.vue';
import keyFrameAnimation from '../../../../src/component/layout/keyFrameAnimation';
import { ViewModel } from './ViewModel';
import Component from 'vue-class-component';

@Component({
  components: {
    fullScreens_layout, h_button, keyFrameAnimation

  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
  .title_induction{
    width: 520px;
    height:100px;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #000000;
    line-height: 24px;
    position: absolute;
    left: 24px;
    top: 24px;
  }
</style>
<style>

</style>
