<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span class="title_style">诱导公式（5、6）</span>
                <div id="3dContainer"></div>
                <img ondragstart="return false" class="gongshi" v-bind:class="{'gongshiMobile' : isMobile}" src="./sub_static/gongshi.png">
                <img ondragstart="return false" class="hanjian" v-bind:class="{'hanjianMobile' : isMobile}" src="./sub_static/2.png" v-show="(fuzhuxian && jians && !jias) || (fuzhuxian && jians && !jias)" >
                <img ondragstart="return false" class="hanjian" v-bind:class="{'hanjianMobile' : isMobile}" src="./sub_static/3.png" v-show="(fuzhuxian && !jians && jias) || (fuzhuxian && !jians && jias) || (fuzhuxian && jians && jias) || (fuzhuxian && jians && jias)">
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel" style="height: 100%">

                    <div v-show="showDiv">

                        <div id="jias" @click="bottonTwos()">
                            <img ondragstart="return false" v-show="!jias" class="jias" v-bind:class="{'jiasMobile' : isMobile}" src="./sub_static/jiayuantu.png" v-bind:style="imgstyle">
                            <img ondragstart="return false" v-show="jias" class="jias"  v-bind:class="{'jiasMobile' : isMobile}"  src="./sub_static/jia.png" >
                        </div>
                        <div id="jians" @click="bottonThrees()">
                            <img ondragstart="return false" v-show="!jians" class="jians" v-bind:class="{'jiansMobile' : isMobile}" src="./sub_static/jianyuantu.png" v-bind:style="imgstyle2">
                            <img ondragstart="return false" v-show="jians"  class="jians" v-bind:class="{'jiansMobile' : isMobile}" src="./sub_static/jian.png" >
                        </div>
                    </div>


                    <div id="hanshuDiv" class="divstyle" v-bind:class="{'divstyleMobile' : isMobile}">
                        <div @click="bottonOne()">
                            <buttonPrimary class="fuzhu"   v-bind:title="title" type="ellipse" v-bind:actived="color1" v-bind:disabled="disable">
                            </buttonPrimary>
                        </div>

                        <div id="duichenxian" @click="bottonLine()">
                        <img ondragstart="return false" v-show="!duichen" class="duichen" v-bind:class="{'duichenMobile' : isMobile}" src="./sub_static/duichenxian.png" >
                        <img ondragstart="return false" v-show="duichen" class="duichen"  v-bind:class="{'duichenMobile' : isMobile}" src="./sub_static/duichenBlue.png" >
                        </div>


                        <div id="jia" @click="bottonTwo()">
                        <img ondragstart="return false" v-show="!jia" class="jia" v-bind:class="{'jiaMobile' : isMobile}" src="./sub_static/jiaAngle.png" >
                        <img ondragstart="return false" v-show="jia" class="jia" v-bind:class="{'jiaMobile' : isMobile}"  src="./sub_static/jiasAngle.png" >
                        </div>


                        <div id="jian" @click="bottonThree()">
                        <img ondragstart="return false" v-show="!jian" class="jian" v-bind:class="{'jianMobile' : isMobile}" src="./sub_static/jianAngle.png" >
                        <img ondragstart="return false" v-show="jian"  class="jian" v-bind:class="{'jianMobile' : isMobile}" src="./sub_static/jiansAngle.png" >
                        </div>
                        <div id="yuan"  @click="bottonFour()">
                        <img ondragstart="return false"  v-show="!yuan" class="yuan" v-bind:class="{'yuanMobile' : isMobile}" src="./sub_static/fuyuan.png" >
                        <img ondragstart="return false" v-show="yuan" class="yuan"  v-bind:class="{'yuanMobile' : isMobile}" src="./sub_static/fusyuan.png" >
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
  import {ViewController} from '../../../../src/core/ViewController';
  import h_button from '../../../../src/component/ui/button.vue';
  import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
  import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
  import {Ydgs56ViewHandler} from './services/Ydgs56ViewHandler';
  import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';
  import { ViewOption } from '../../../../src/core/CoreInterface';
  // const vConsole = require('vconsole');

  export default Vue.extend({
    components: {
      vueSlider,
      h_button,
      fullScreensLayout,
      buttonPrimary
    },
    data() {
      return {

        showDiv: false,
        isMobile: false,
        duichen: false,
        fuzhuxian: false,
        jia: false,
        jias: false,
        jian: false,
        jians: false,
        yuan: false,
        yuans: false,
        disable: false,
        color1: false,
        title: '三角函数值',
        imgstyle: {
          opacity: 0
        },
        imgstyle2: {
          opacity: 0,
        },

      };
    },
    created() {
      // new vConsole();

      const viewOption = new ViewOption();
      viewOption.showMobileExpandIco = false;
      viewOption.mobilePanelAlpha = true;
      viewOption.showReset = true;
      viewOption.showMobileResetIco = true;
      viewOption.adapterMobilePanel = false;
      ViewController.getInstance(new Ydgs56ViewHandler(this), viewOption);
      ViewController.getInstance(new Ydgs56ViewHandler(this));
      ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted() {
     if ((window as any).env.browserInfo.isSmallDevice) {
        this.isMobile = true;
      } else {
       this.isMobile = false;
     }

      ViewController.getInstance().domReady();
    },
    methods: {

      bottonLine() {

        this.duichen = !this.duichen;

      },

      bottonOne() {

        if (!this.color1) {


          if ((window as any).env.browserInfo.isSmallDevice) {
            document.getElementById('hanshuDiv').style.bottom = '108px';
            setTimeout(() => {

              this.imgstyle.opacity = 1;
              this.showDiv = true;

            }, 100);

            setTimeout(() => {

              this.imgstyle2.opacity = 1;

            }, 150);

          } else {

            setTimeout(() => {

              this.imgstyle.opacity = 1;
              this.showDiv = true;

            }, 200);

            setTimeout(() => {

              this.imgstyle2.opacity = 1;

            }, 300);

            document.getElementById('hanshuDiv').style.bottom = '108px';
          }

        } else if (this.color1) {

          if ((window as any).env.browserInfo.isSmallDevice) {


            setTimeout(() => {

              this.imgstyle.opacity = 0;
              this.showDiv = false;
            }, 900);


            setTimeout(() => {

              this.imgstyle2.opacity = 0;

            }, 800);

            document.getElementById('hanshuDiv').style.bottom = '0px';
          } else {

            setTimeout(() => {

              this.imgstyle.opacity = 0;
              this.showDiv = false;
            }, 500);


            setTimeout(() => {

              this.imgstyle2.opacity = 0;

            }, 250);

            document.getElementById('hanshuDiv').style.bottom = '0px';
          }
        }
        this.color1 = !this.color1;
        this.fuzhuxian = !this.fuzhuxian;
        this.jias = false;
        this.jians = false;
      },

      bottonTwo() {
        this.jia = !this.jia;

      },

      bottonTwos() {
        this.jias = !this.jias;

        if (this.jians = true) {
          this.jians = false;
        }


      },

      bottonThree() {
        this.jian = !this.jian;

      },

      bottonThrees() {
        this.jians = !this.jians;

        if (this.jias = true) {
          this.jias = false;
        }


      },

      bottonFour() {
        this.yuan = !this.yuan;

      },


    },
    watch: {

      yuan: function(yuan: boolean) {
       (ViewController.getInstance().viewHandler as Ydgs56ViewHandler).PlayA(yuan);
      },

      jian: function(jian: boolean) {
        (ViewController.getInstance().viewHandler as Ydgs56ViewHandler).PlayB(jian);
      },

      jia: function(jia: boolean) {
        (ViewController.getInstance().viewHandler as Ydgs56ViewHandler).PlayC(jia);
      },

      duichen: function(duichen: boolean) {
        (ViewController.getInstance().viewHandler as Ydgs56ViewHandler).PlayD(duichen);
      },

    }
  });
</script>

<style scoped="scoped">
    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .title_style {
        font-size: 24px;
        color: #000000;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }

    .gongshi {
        width:96px;
        height: 76px;
        top: 20%;
        left:100px;
        position: absolute

    }
    .gongshiMobile {
        width:77px;
        height: 61px;
        left:40px;

    }

    .hanjian {
        width:186px;
        height: 168px;
        top: 15%;
        left:240px;
        position: absolute
    }

    .hanjianMobile {
        width: 149px;
        height: 135px;
        top: 13%;
        left: 120px;

    }

    .jias {
        width:74px;
        height: 42px;
        bottom: 51px;
        right:10px;
        position: absolute;
    }

    .jiasMobile {
        bottom: 51px;

    }

    .jians {
        width:74px;
        height: 42px;
        bottom: 108px;
        right:10px;
        position: absolute
    }

    .jiansMobile {
        bottom: 105px;

    }

    .divstyle {
        position: absolute;
        bottom: 0px;
        transition: all 1s;
        -moz-transition: all 1s;
        -webkit-transition: all 1s;
        -o-transition:all 1s;
    }

    .divstyleMobile {
        transition: all 1.5s;
        -moz-transition: all 1.5s;
        -webkit-transition: all 1.5s;
        -o-transition:all 1.5s;
    }

    .fuzhu {
        width:125px;
        height: 42px;
        bottom: 51px;
        right:-14px;
        border-radius: 21px;
        position: absolute
    }


    .duichen {
        width:98px;
        height: 42px;
        bottom: 111px;
        right:-14px;
        position: absolute
    }

    .duichenMobile {
        bottom: 101px;
    }

    .jia {
        width:98px;
        height: 42px;
        bottom: 171px;
        right:-14px;
        position: absolute
    }
    .jiaMobile {
        bottom: 150px;
    }

    .jian {
        width:98px;
        height: 42px;
        bottom: 231px;
        right:-14px;
        position: absolute
    }

    .jianMobile {
        bottom: 200px;
    }
    .yuan {
        width:98px;
        height: 42px;
        bottom: 291px;
        right:-14px;
        position: absolute
    }

    .yuanMobile {
        bottom: 251px;
    }


</style>
