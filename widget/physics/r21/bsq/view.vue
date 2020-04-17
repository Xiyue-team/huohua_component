<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">半衰期</div>
                <div class="imgDiv" v-bind:class="{'tuliMobile': isMobile} ">
                    <img src="./sub_static/tishi.png" alt="" class="tuli" v-bind:class="{'tuliMobile': isMobile} " ondragstart="return false;">
                </div>
                <div class="play_btn" v-bind:class="{'play_btn_mobile': isMobile} " @click="isPlay = !isPlay" >
                    <img v-show="!isPlay"  src="../../../../static/images/play_icon.png" alt="">
                    <img v-show="isPlay"   src="../../../../static/images/pause_icon.png" alt="">
                </div>
                <div id="3dContainer"></div>

            </template>
            <template slot="controlPanel" slot-scope="controlPanel">

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
  import vueSlider from '../../../../src/component/ui/vue2-slider.vue';

  @Component({
    components: {
        fullScreensLayout, vueSlider
    },
    mixins: [ViewModel]
  })
  export default class App extends Vue {}
</script>

<style scoped="scoped">
    .title_text{
        font-size: 24px;
        color: #ffffff;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }
    .play_btn {
        position: absolute;
        display: inline-block;
        width: 44px;
        height: 44px;
        background: #FFFFFF;
        border-radius: 50%;
        box-sizing: border-box;
        border: 0 solid rgba(0, 0, 0, 0.06);
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.24);
        cursor:pointer;
        right: 135px;
        bottom: 30px;
    }
    .play_btn_mobile {
        right: 67px;
    }

    .play_btn img {
        width: 37%;
        margin-left: 15px;
        margin-top: 13px;

    }

    .imgDiv {
        position: absolute;
        width: 162px;
        height: 196px;
        right: 24px;
        bottom: 100px;
    }

    .tuli {
        width: 162px;
        height: 196px;
    }

    .tuliMobile {
        width: 81px;
        height: 98px;
    }
</style>
