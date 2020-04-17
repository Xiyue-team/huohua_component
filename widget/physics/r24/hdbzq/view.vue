<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9" >
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox" >
                <div class="title_text">{{title}}</div>
                <div :class="{'tip': true, 'tip_mobile': isMobile}">
                    *{{tip}}
                </div>
                <div id="2dContainer" style="height: 100%">
                    <canvas id="canvas"></canvas>
                </div>
                <div :class="{'switch_content': true, 'switch_content_mobile': isMobile}">
                    <div class="switch_content_t">{{connectionMode}}</div>
                    <div class="switch_btn" :class="{'switch_btn_mobile': isMobile,'switch_btn_s': type === 1} " @click="connectionEvent(1)" >A、B</div>
                    <div class="switch_btn" :class="{'switch_btn_mobile': isMobile,'switch_btn_s': type === 2} " @click="connectionEvent(2)" >B、D</div>
                    <div class="switch_btn" :class="{'switch_btn_mobile': isMobile,'switch_btn_s': type === 3} " @click="connectionEvent(3)" >B、C</div>
                    <div class="switch_btn" :class="{'switch_btn_mobile': isMobile,'switch_btn_s': type === 4} " @click="connectionEvent(4)" >A、D</div>
                    <div class="switch_btn" :class="{'switch_btn_mobile': isMobile,'switch_btn_s': type === 5} " @click="connectionEvent(5)" >A、C</div>
                    <div class="switch_btn" :class="{'switch_btn_mobile': isMobile,'switch_btn_s': type === 6} " @click="connectionEvent(6)" >C、D</div>
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

  @Component({
    components: {
        fullScreensLayout
    },
    mixins: [ViewModel]
  })
  export default class App extends Vue {}
</script>

<style scoped="scoped">
    .title_text{
        font-size: 24px;
        color: #000000;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }
    .switch_content {
        font-size: 16px;
        position: absolute;
        display: inline-block;
        padding: 10px;
        right: 24px;
        bottom: 80px;
        z-index: 98;
        text-align: center;
    }
    .switch_content_t {
        font-weight: 500;
    }
    .switch_btn {
        margin: 10px;
        /* display: inline-block; */
        background: #FFFFFF;
        padding: 5px 20px;
        font-weight: 400;
        border-radius: 5px;
        box-sizing: border-box;
        border: 0 solid rgba(0, 0, 0, 0.06);
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.24);
        cursor:pointer;
    }
    .switch_content_mobile {
        font-size: 12px;
        right: 0px;
        bottom: 30px;
    }
    .switch_btn_mobile {
        right: 0px;
        padding: 3px 15px;
        margin: 8px;
    }
    .switch_btn_s {
        background: #2d8cf0;
        color: #FFFFFF;
    }
    .play_btn {
        position: absolute;
        display: inline-block;
        background: #FFFFFF;
        font-weight: 500;
        padding: 10px;
        min-width: 80px;
        text-align: center;
        border-radius: 22px;
        box-sizing: border-box;
        border: 0 solid rgba(0, 0, 0, 0.06);
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.24);
        cursor:pointer;
        right: 24px;
        bottom: 30px;
        z-index: 99;
    }
    .play_btn_hover { 
        background: #2d8cf0;
        color: #ffffff;
    }
    .play_btn_mobile {
        right: 30px;
    }

    .play_btn img {
        width: 37%;
        margin-left: 15px;
        margin-top: 13px;

    }
    .tip{
        color: #000000;
        font-size: 16px;
        font-weight: 500;
        position: absolute;
        left: 84px;
        bottom: 32px;
    }
    .tip_mobile {
        font-size: 14px;
        bottom: 15px;
    }
</style>
