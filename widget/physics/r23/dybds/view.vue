<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">{{title}}</div>
                <div class="button play_btn" v-bind:class="{'play_btn_mobile': isMobile}" style="bottom: 80px;" 
                    @click="randomNumber">
                    {{changeNumber}}
                </div>
                <div class="button play_btn" v-bind:class="{'play_btn_mobile': isMobile}" 
                    @click="range = !range">
                    {{changeRange}}
                </div>
                <div id="2dContainer" style="height:100%;"></div>
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
        position: absolute;
        display: inline-block;
        padding: 10px;
        width: 100%;
        bottom: 30px;
        z-index: 98;
        text-align: center;
    }
    .switch_btn {
        margin: 10px;
        display: inline-block;
        background: #FFFFFF;
        padding: 10px;
        border-radius: 22px;
        box-sizing: border-box;
        border: 0 solid rgba(0, 0, 0, 0.06);
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.24);
        cursor:pointer;
    }
    .switch_btn_s {
        background: #999999;
    }
    .play_btn {
        position: absolute;
        display: inline-block;
        border-radius: 21px;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.24);
        text-align: center;
        min-width: 80px;
        cursor:pointer;
        right: 24px;
        bottom: 30px;
        z-index: 99;
    }
    .play_btn_mobile {
        right: 30px;
    }

    .play_btn img {
        width: 37%;
        margin-left: 15px;
        margin-top: 13px;

    }
</style>
