<template>
    <div class="aspectration root_div_container" data-ratio="16:9" >
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox" >
                <div class="title_text">{{title}}</div>
                <div class="button play_btn" v-bind:class="{'play_btn_mobile play_btn_mobile2': isMobile}"
                    @click="showFreeElectron" >
                    {{freeElectronBtn}}
                </div>
                <div class="button play_btn play_btn_2" v-bind:class="{'play_btn_mobile': isMobile}"
                    @click="electrify" >
                    {{electrifyBtn}}
                </div>
                <div id="2dContainer" class="bg">
                    <canvas id="canvas"></canvas>
                </div>
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
  import '../../../../src/assets/css/ui.css';
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
    .bg {
        height: 100%;
    }
    .title_text{
        margin: 0;
        padding:0;
        position: absolute;
        top:32px;
        left:32px;
        font-size: 28px;
        color: #FFFFFF;
        line-height: 28px;
    }
    .play_btn {
        position: absolute;
        display: inline-block;
        border-radius: 21px;
        text-align: center;
        width: 100px;
        cursor:pointer;
        right: 24px;
        bottom: 110px;
        z-index: 99;
    }
    .play_btn_2 {
        bottom: 45px;
    }

    .play_btn_mobile {
        padding: 8px 12px;
        font-size: 14px;
        bottom: 10px;
    }

    .play_btn_mobile2 {
        bottom:50px;
    }
</style>
