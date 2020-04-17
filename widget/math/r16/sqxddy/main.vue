<template>
    <div class="aspectration bg_white root_div_container">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span class="title_style">双曲线的定义</span>
                <div id="3dContainer" style="width: 100%;height: 100%">
                    <div style="position: absolute; left: 24px; top: 96px;" v-bind:class="{'set_scale': isMobile}"
                         v-if="show">
                        <img src="./sub_static/fangchengshi.png">
                    </div>
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel" style="height: 100%">
                    <div class="button1" id="button1" @click="HuiZhi" v-bind:class="{ event_disabled: disable }" >
                        <h_button title="绘制"
                                  style="width:72px;height: 42px;border-radius: 21px;bottom: 51px;right:14px;position: absolute "
                                   v-bind:class='{active: gaoliang1}'></h_button>
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
  import {SqxddyViewHandler} from './services/SqxddyViewHandler';
  import { BrowserUtil } from "../../../../src/util/BrowserUtil";
  export default Vue.extend({
    components: {
      vueSlider,
      h_button,
      h_switch,
      fullScreensLayout
    },
    data() {
      return {
        gaoliang1:false,
        disable: false,
        show: false,
        isMobile: false,
      };
    },
    created() {
      ViewController.getInstance(new SqxddyViewHandler(this));
      ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted() {
      if(BrowserUtil.getBrowserInfo().isSmallDevice){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
      ViewController.getInstance().domReady();
    },
    methods: {
      HuiZhi() {
        this.disable = true;
        this.show = true;
        (ViewController.getInstance().viewHandler as SqxddyViewHandler).huizhi();
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
        height: 24px;
        font-size: 24px;
        color: #000000;
        line-height: 24px;
        position: absolute;
        left: 24px;
        top: 24px;
    }

    .set_scale {
        position: absolute;
        transform: scale(0.5);
        margin-left: -70px;
        margin-top: -35px;
    }
</style>
