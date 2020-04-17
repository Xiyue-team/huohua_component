<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreenslayout >
      <template slot="viewBox" slot-scope="viewBox">
          <div v-bind:class="{'set_scale7': isMobile}">
             <span class="title_style" >特殊函数构造及求导</span>
          </div>
        <div id="3dContainer" style="width: 100%;height: 100%"  >

                <div id="navigate" v-show="displayer" v-bind:class="{'set_scale': isMobile}">

                    <div  v-bind:class="{'set_scale5': isMobile}">
                    <span class="textFge" >原函数</span>
                    </div>

                    <!--创建原函数-->
                    <div v-bind:class="{'set_scale6': isMobile}">

                    <img src='../tshsgzjqd/sub_static/fgets1.png'  class="fgetes" v-show="display1" >
                    <img src='../tshsgzjqd/sub_static/fgets1s.png' class="fgetes" v-show="!display1" >

                    <img src='../tshsgzjqd/sub_static/fgets2.png'  class="fgetes" v-show="display2" >
                    <img src='../tshsgzjqd/sub_static/fgets2s.png' class="fgetes" v-show="!display2" >

                    <img src='../tshsgzjqd/sub_static/fgets3.png'  class="fgetes" v-show="display3" >
                    <img src='../tshsgzjqd/sub_static/fgets3s.png' class="fgetes" v-show="!display3" >

                    <img src='../tshsgzjqd/sub_static/fgets4.png'  class="fgetes" v-show="display4" >
                    <img src='../tshsgzjqd/sub_static/fgets4s.png' class="fgetes" v-show="!display4" >

                    <img src='../tshsgzjqd/sub_static/fgets5.png'  class="fgetes" v-show="display5" >
                    <img src='../tshsgzjqd/sub_static/fgets5s.png' class="fgetes" v-show="!display5" >

                    <img src='../tshsgzjqd/sub_static/fgets6.png'  class="fgetes" v-show="display6" >
                    <img src='../tshsgzjqd/sub_static/fgets6s.png' class="fgetes" v-show="!display6" >

                    </div>

                    <!--创建求导按钮  -->

                    <div v-bind:class="{'set_scale2': isMobile}">

                    <div @click="pushqiu1()" style="position: absolute;top: 120px;left: 42%;" v-show="displayqiu1">
                        <buttonPrimary  v-bind:title="title1" type="ellipse" v-bind:class="{active:gaoliang1}" style="font-size: 25px;width: 100px;height: 50px">
                        </buttonPrimary>
                    </div>

                    <div @click="pushqiu2()" style="position: absolute;top: 218px;left: 42%;" v-show="displayqiu2">
                        <buttonPrimary  v-bind:title="title1" type="ellipse" v-bind:class="{active:gaoliang2}" style="font-size: 25px;width: 100px;height: 50px">
                        </buttonPrimary>
                    </div>


                    <div @click="pushqiu3()" style="position: absolute;top: 325px;left: 42%;" v-show="displayqiu3">
                        <buttonPrimary  v-bind:title="title1" type="ellipse" v-bind:class="{active:gaoliang3}" style="font-size: 25px;width: 100px;height: 50px">
                        </buttonPrimary>
                    </div>

                    <div @click="pushqiu4()" style="position: absolute;top: 425px;left: 42%;" v-show="displayqiu4">
                        <buttonPrimary  v-bind:title="title1" type="ellipse" v-bind:class="{active:gaoliang4}" style="font-size: 25px;width: 100px;height: 50px">
                        </buttonPrimary>
                    </div>


                    <div @click="pushqiu5()" style="position: absolute;top: 520px;left: 42%;" v-show="displayqiu5">
                        <buttonPrimary  v-bind:title="title1" type="ellipse" v-bind:class="{active:gaoliang5}" style="font-size: 25px;width: 100px;height: 50px">
                        </buttonPrimary>
                    </div>


                    <div @click="pushqiu6()" style="position: absolute;top: 620px;left: 42%;" v-show="displayqiu6">
                        <buttonPrimary  v-bind:title="title1" type="ellipse" v-bind:class="{active:gaoliang6}" style="font-size: 25px;width: 100px;height: 50px">
                        </buttonPrimary>
                    </div>

                    </div>

                      <!--创建导数-->
                    <div v-bind:class="{'set_scale3': isMobile}">

                    <img src='../tshsgzjqd/sub_static/lead1.png' class="fgetesdao" v-show="displaydao1">
                    <img src='../tshsgzjqd/sub_static/lead1s.png' class="fgetesdao" v-show="displaydao1s">

                    <img src='../tshsgzjqd/sub_static/lead2.png' class="fgetesdao" v-show="displaydao2">
                    <img src='../tshsgzjqd/sub_static/lead2s.png' class="fgetesdao" v-show="displaydao2s">

                    <img src='../tshsgzjqd/sub_static/lead3.png' class="fgetesdao" v-show="displaydao3">
                    <img src='../tshsgzjqd/sub_static/lead3s.png' class="fgetesdao" v-show="displaydao3s">

                    <img src='../tshsgzjqd/sub_static/lead4.png' class="fgetesdao" v-show="displaydao4">
                    <img src='../tshsgzjqd/sub_static/lead4s.png' class="fgetesdao" v-show="displaydao4s">

                    <img src='../tshsgzjqd/sub_static/lead5.png' class="fgetesdao" v-show="displaydao5">
                    <img src='../tshsgzjqd/sub_static/lead5s.png' class="fgetesdao" v-show="displaydao5s">

                    <img src='../tshsgzjqd/sub_static/lead6.png' class="fgetesdao" v-show="displaydao6">
                    <img src='../tshsgzjqd/sub_static/lead6s.png' class="fgetesdao" v-show="displaydao6s">

                    </div>


                         <!--创建查看图像按钮-->
                    <div v-bind:class="{'set_scale4': isMobile}">

                    <div @click="pushview1()" style="position: absolute;top: 120px;left: 83%;"  v-show="displayview1">
                        <buttonPrimary  v-bind:title="title1s" type="ellipse" v-bind:class="{active:gaoliang1s}" style="font-size: 25px;width: 150px;height: 55px">
                        </buttonPrimary>
                    </div>

                    <div @click="pushview2()" style="position: absolute;top: 218px;left: 83%;"  v-show="displayview2">
                        <buttonPrimary  v-bind:title="title1s" type="ellipse" v-bind:class="{active:gaoliang2s}" style="font-size: 25px;width: 150px;height: 55px">
                        </buttonPrimary>
                    </div>

                    <div @click="pushview3()" style="position: absolute;top: 325px;left: 83%;"  v-show="displayview3">
                        <buttonPrimary  v-bind:title="title1s" type="ellipse" v-bind:class="{active:gaoliang3s}" style="font-size: 25px;width: 150px;height: 55px">
                        </buttonPrimary>
                    </div>


                    <div @click="pushview4()" style="position: absolute;top: 425px;left: 83%;"  v-show="displayview4">
                        <buttonPrimary  v-bind:title="title1s" type="ellipse" v-bind:class="{active:gaoliang4s}" style="font-size: 25px;width: 150px;height: 55px">
                        </buttonPrimary>
                    </div>


                    <div @click="pushview5()" style="position: absolute;top: 520px;left: 83%;"  v-show="displayview5">
                        <buttonPrimary  v-bind:title="title1s" type="ellipse" v-bind:class="{active:gaoliang5s}" style="font-size: 25px;width: 150px;height: 55px">
                        </buttonPrimary>
                    </div>


                    <div @click="pushview6()" style="position: absolute;top: 620px;left: 83%;"  v-show="displayview6">
                        <buttonPrimary  v-bind:title="title1s" type="ellipse" v-bind:class="{active:gaoliang6s}" style="font-size: 25px;width: 150px;height: 55px">
                        </buttonPrimary>
                    </div>

                    </div>

                       <!--创建固定点击区域-->
                    <div v-bind:class="{'set_scale6': isMobile}">

                    <div  v-on:click='push1()' style="position: absolute;width: 130px;height: 50px;top: 120px;left: 22%;"></div>
                    <div  v-on:click='push2()' style="position: absolute;width: 148px;height: 50px;top: 218px;left: 22%;"></div>
                    <div  v-on:click='push3()' style="position: absolute;width: 130px;height: 50px;top: 322px;left: 22%;"></div>
                    <div  v-on:click='push4()' style="position: absolute;width: 148px;height: 50px;top: 420px;left: 22%;"></div>
                    <div  v-on:click='push5()' style="position: absolute;width: 158px;height: 35px;top: 532px;left: 22%;"></div>
                    <div  v-on:click='push6()' style="position: absolute;width: 178px;height: 35px;top: 632px;left: 22%;"></div>

                    </div>

                </div>

                <!--创建坐标轴图层-->
                <div id="fix" style="height: 100%;width: 100%" v-show="!displayer" >

                    <img src='../tshsgzjqd/sub_static/functional1.png'   class="fgetesfunctional" v-on:click='back1()' v-bind:class="{'set_scale1': isMobile}" v-show="displayc1">
                    <img src='../tshsgzjqd/sub_static/functional2.png'   class="fgetesfunctional" v-on:click='back2()' v-bind:class="{'set_scale1': isMobile}" v-show="displayc2">
                    <img src='../tshsgzjqd/sub_static/functional3.png'   class="fgetesfunctional" v-on:click='back3()' v-bind:class="{'set_scale1': isMobile}" v-show="displayc3">
                    <img src='../tshsgzjqd/sub_static/functional4.png'   class="fgetesfunctional" v-on:click='back4()' v-bind:class="{'set_scale1': isMobile}" v-show="displayc4">
                    <img src='../tshsgzjqd/sub_static/functional5.png'   class="fgetesfunctional" v-on:click='back5()' v-bind:class="{'set_scale1': isMobile}" v-show="displayc5">
                    <img src='../tshsgzjqd/sub_static/functional6.png'   class="fgetesfunctional" v-on:click='back6()' v-bind:class="{'set_scale1': isMobile}" v-show="displayc6">

                    <div style="width:50%;height:15px;background-color: #F5F5F5"></div>
                </div>
        </div>
      </template>

      <template slot="controlPanel" slot-scope="controlPanel">
        <div id="controlPanel"></div>
      </template>

    </fullScreenslayout>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreenslayout from '../../../../src/component/layout/fullScreens_layout.vue';
import h_button from '../../../../src/component/ui/button.vue'
import buttonPrimary from '../../../../src/component/ui/buttonPrimary';
import {MainVueComponent} from './mainVueComponent.ts';
import Component from 'vue-class-component';

@Component({
   components: {
    h_button,
    fullScreenslayout,
    buttonPrimary

  },
  mixins: [MainVueComponent]
})
export default class App extends Vue {}

</script>

<style scoped="scoped">
  body {
    overflow: hidden !important;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .textFge {
    width: 100px;
    height: 50px;
    position: absolute;
    left: 10%;
    top: 130px;
    font-family: STSongti-SC-Regular;
    font-size: 30px;
    color: #000000;

  }

  .title_style {
    width: 336px;
    height: 24px;
    font-size: 30px;
    color: #000000;
    line-height: 24px;
    position: absolute;
    left: 24px;
    top: 24px;
  }

  .fgetes {
    position: absolute;
    width: 249px;
    height: 585px;
    top: 100px;
    left: 18%;
  }
  .fgetesqiu {
    position: absolute;
    width: 300px;
    height: 700px;
    top: 100px;
    left: 600px;
  }
  .fgetesdao {
    position: absolute;
    width: 249px;
    height: 585px;
    top: 100px;
    left: 55%;
  }
  .fgetesview {
    position: absolute;
    width: 300px;
    height: 700px;
    top: 100px;
    left: 1200px;
  }

    .fgetesfunctional {

        width: 100%;
        height: 100%;
    }

  .set_scale {
      position: absolute;
      transform: scale(0.5);
      margin-top: 15px;


  }

  .set_scale1 {
      position: absolute;
      transform: scale(1);
      margin-top: 15px;

  }
  .set_scale2 {
      position: absolute;
      transform: scale(0.8);
      margin-left:650px;

  }

  .set_scale3 {
      position: absolute;
      transform: scale(0.8);
      margin-left:750px;

  }

  .set_scale4 {
      position: absolute;
      transform: scale(0.8);
      margin-left:1000px;

  }

  .set_scale5 {
      position: absolute;
      transform: scale(0.8);
      margin-left: 300px;

  }
  .set_scale6 {
      position: absolute;
      transform: scale(0.8);
      margin-left:400px;


  }
  .set_scale7 {
      position: absolute;
      transform: scale(0.7);
      margin-left:0px;

  }


</style>
