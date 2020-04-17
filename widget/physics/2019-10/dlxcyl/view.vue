<template>
    <div class="aspectration root_div_container" data-ratio="16:9" >
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox" >
                <div class="title_text">{{title}}</div>
                <button class="button btn" v-bind:class="{'btn_mobile': isMobile, 'electrify': isElectrify}"
                    @click="electrify" >
                    {{electrifyBtn}}
                </button>
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
        background: #324c46;
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
    .btn {
        background: #FFFFFF;
        border: 0 solid rgba(0,0,0,0.06);
        box-shadow: 0 1px 3px rgba(0,0,0,0.12);
        padding: 12px 16px;
        font-size: 16px;
        color: #000000;
        line-height: 16px;
        position: absolute;
        display: inline-block;
        border-radius: 21px;
        text-align: center;
        width: 100px;
        cursor:pointer;
        right: 24px;
        bottom: 20px;
        z-index: 99;
    }

    .btn_mobile {
        padding: 8px 12px;
        font-size: 14px;
        bottom: 20px;
    }
    
    .electrify {
        background: #5CAEFD;
        color: #FFFFFF;
    }
</style>
