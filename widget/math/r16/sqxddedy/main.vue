<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span class="title_style">双曲线的第二定义</span>
                <div id="3dContainer" style="width: 100%;height: 100%;">
                    <img src="./sub_static/Fcs.png" class="Fcs"/>
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">
                    <div class="button1" id="button1" @click="clickenent" v-bind:class="{ event_disabled: disable }"
                    >
                        <button class="button" >绘制</button>
                    </div>
                </div>
            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import { ViewController } from "../../../../src/core/ViewController";
  import fullScreensLayout from "../../../../src/component/layout/fullScreens_layout.vue";
  import { SqxViewHandler } from "./services/SqxViewHandler";
  import { ViewOption } from "../../../../src/core/CoreInterface";
  import { BrowserUtil } from "../../../../src/util/BrowserUtil";

  export default Vue.extend({

    components: {
      fullScreensLayout
    },

    data() {
      return {
        exerciseOption: {
          exercise: {},
          resizeCall: {}
        },
        resetCamera: false,
        disable: false,
        isIOS: false
      };
    },

    created() {
      const viewOption = new ViewOption();
      ViewController.getInstance(new SqxViewHandler(this), viewOption);
      ViewController.getInstance().viewHandler.beforeRenderElement();

    },
    mounted() {

      if (BrowserUtil.getBrowserInfo().os === 'iOS') {
        this.isIOS = true;
      }
      ViewController.getInstance().domReady();
    },

    methods: {
      resetEvent() {
        (ViewController.getInstance().viewHandler as SqxViewHandler).reset();
      },

      clickenent() {
        this.disable = true;
        (ViewController.getInstance().viewHandler as SqxViewHandler).play();

      },
    },

    watch: {}

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

    .button {
        width: 72px;
        height: 42px;
        border-radius: 21px;
        bottom: 51px;
        right: 14px;
        position: absolute
    }
    .Fcs{
        position: absolute;
        width: 160px;
        margin-top: 80px;
        margin-left: 30px
    }
</style>
