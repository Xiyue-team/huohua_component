<template>
    <div class="aspectration bg_white root_div_container">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <img ondragstart="return false" class="title_style" src="./sub_static/biaoti.png" v-bind:class="{'imgStyleMobile': isMobile}">
                <div id="3dContainer" style="width: 100%;height: 100%">
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel" style="height: 100%" >
                    <div @click="Button1" >
                        <img ondragstart="return false" v-show="!show1" src="./sub_static/a21.png" style="width:82px;height: 42px;border-radius: 21px;bottom: 171px;right:14px;position: absolute">
                        <img ondragstart="return false" v-show="show1" src="./sub_static/a2.png" style="width:82px;height: 42px;border-radius: 21px;bottom: 171px;right:14px;position: absolute">
                    </div>

                    <div @click="Button2">
                        <img ondragstart="return false" v-show="!show" src="./sub_static/tu2.png" style="width:82px;height: 42px;border-radius: 21px;bottom: 111px;right:14px;position: absolute " >
                        <img ondragstart="return false" v-show="show" src="./sub_static/tu1.png" style="width:82px;height: 42px;border-radius: 21px;bottom: 111px;right:14px;position: absolute " >
                    </div>


                    <div style="width:82px; height: 42px; border-radius: 21px;position: absolute;right:14px;bottom: 51px;" @click="Button3" v-bind:class="{ event_disabled: disabled }" >
                        <img ondragstart="return false" v-show="!show2" src="./sub_static/sanjiaohanshuzhi1.png" style="width: 100%;height: 100%;">
                        <img ondragstart="return false" v-show="show2" src="./sub_static/sanjiaohanshuzhi.png" style="width:100%;height: 100%;">
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
  import h_switch from '../../../../src/component/ui/switch.vue';
  import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
  import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
  import {ZmdcgxViewHandler} from './services/ZmdcgxViewHandler';
  import { BrowserUtil } from '../../../../src/util/BrowserUtil';
  import { ViewOption } from '../../../../src/core/CoreInterface';
  export default Vue.extend({
    components: {
      vueSlider,
      h_button,
      h_switch,
      fullScreensLayout
    },
    data() {
      return {
        gaoliang1: false,
        disabled: true,
        isMobile: false,
        show: false,
        show1: false,
        show2: false,
      };
    },
    created() {
      const viewOption = new ViewOption();
      viewOption.showMobileExpandIco = false;
      viewOption.mobilePanelAlpha = true;
      viewOption.showReset = true;
      viewOption.showMobileResetIco = true;
      viewOption.adapterMobilePanel = false;
      ViewController.getInstance(new ZmdcgxViewHandler(this), viewOption);
      ViewController.getInstance(new ZmdcgxViewHandler(this));
      ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted() {
      if (BrowserUtil.getBrowserInfo().isSmallDevice) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
      ViewController.getInstance().domReady();
    },
    methods: {
      Button1() {
        this.show1 = !this.show1;
          if (this.show1) {
            (ViewController.getInstance().viewHandler as ZmdcgxViewHandler).zmdcgx.line2.visible = true;
          } else {
            (ViewController.getInstance().viewHandler as ZmdcgxViewHandler).zmdcgx.line2.visible = false;
          }

          if (this.show1 && this.show) {
            this.disabled = false;
          } else {
            this.disabled = true;
            this.show2 = false;
            (ViewController.getInstance().viewHandler as ZmdcgxViewHandler).hide();
          }
      },

      Button2() {
        this.show = !this.show;
        if (this.show) {
          (ViewController.getInstance().viewHandler as ZmdcgxViewHandler).zmdcgx.line3.visible = true;
        } else {
          (ViewController.getInstance().viewHandler as ZmdcgxViewHandler).zmdcgx.line3.visible = false;
        }

        if (this.show && this.show1) {
          this.disabled = false;
        } else {
          this.disabled = true;
          this.show2 = false;
          (ViewController.getInstance().viewHandler as ZmdcgxViewHandler).hide();
        }
      },

      Button3() {
        this.show2 = !this.show2;
        if (this.show2) {
          (ViewController.getInstance().viewHandler as ZmdcgxViewHandler).display();
        } else {
          (ViewController.getInstance().viewHandler as ZmdcgxViewHandler).hide();
        }
      }

    },
    watch: {

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
        width: 336px;
        height: 50px;
        position: absolute;
        left: 24px;
        top: 24px;
    }

    .imgStyleMobile {
        width: 200px;
        height: 30px;
        position: absolute;
        left: 24px;
        top: 24px;
    }

</style>
