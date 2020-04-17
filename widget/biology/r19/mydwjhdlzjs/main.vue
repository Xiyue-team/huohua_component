<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <meta name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span class="title_style">酶与底物结合的两种假说</span>
                <div id="3dContainer" class="Container">
                    <button id="right1" v-bind:class="{ active: isActive }" @click="btnEvent_1">
                        锁钥学说
                    </button>
                    <button id="right2" v-bind:class="{ active1: isActive1 }" @click="btnEvent_2" v-bind:style="{ pointerEvents: pointerEvents1 }">
                        诱导契合学说
                    </button>
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">
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
  import { MainVueComponent } from './mainVueComponent';

  @Component({
    components: { fullScreensLayout },
    mixins: [MainVueComponent]
  })
  export default class App extends Vue {
  }
</script>

<style scoped="scoped">
    * {
        margin: 0;
        padding: 0;
    }

    body {
        overflow: hidden !important;
    }

    .title_style {
        width: 336px;
        height: 24px;
        font-size: 24px;
        color: #000;
        line-height: 24px;
        position: absolute;
        left: 24px;
        top: 24px;
    }

    .active,
    .active1 {
        background: #0091FF !important;
        color: #fff;
    }

    #right1,
    #right2 {
        position: absolute;
        right: 2%;
        z-index: 9;
        width: 116px;
        height: 38px;
        font-size: 14px;
        background: #FFFFFF;
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 20px;
        text-align: center;
        cursor: pointer;
    }

    #right1 {
        bottom: 82px;
    }

    #right2 {
        bottom: 24px;
    }

    .Container {
        width: 100%;
        height: 100%;
        background-color: #f2f2f2;
    }

    @media (max-width: 1000px) {
        .title_style {
            left: 10px;
            top: 10px;
        }
    }
</style>
