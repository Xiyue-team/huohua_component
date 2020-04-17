<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">{{title}}</div>
                <div id="2dContainer" style="height:100%;background: #000000 ;" v-bind:class="{'zz': active ==1 ,'yz': active ==2, 'gen' : active == 3}">
                    <div class="shl" v-bind:class="{'animation': hideAnimation === false }"  v-bind:style="{backgroundImage:'url(' + shlImg + ')'}"></div>
                    <div class="ltc" v-bind:class="{'animation': hideAnimation === false }"   v-bind:style="{backgroundImage:'url(' + ltcImg + ')'}"></div>

                </div>
                <buttonEllipse class="category1" :title="category1Txt" :isActive="active === 1" @click.native="active = 1" ></buttonEllipse>
                <buttonEllipse class="category2" :title="category2Txt"  :isActive="active === 2" @click.native="active = 2"></buttonEllipse>
                <buttonEllipse class="category3" :title="category3Txt"  :isActive="active === 3" @click.native="active = 3"></buttonEllipse>
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
  import buttonEllipse from '../../../../src/component/ui/buttonEllipse'

  @Component({
    components: {
        fullScreensLayout, buttonEllipse
    },
    mixins: [ViewModel]
  })
  export default class App extends Vue {}
</script>
<style>
    canvas {
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;

    }

    .title_text{
        font-size: 24px;
        color: #FFFFFF;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
        z-index: 3;
    }
    .category1 {
        position: absolute;
        right: 32px;
        bottom: 182px;
        z-index: 9;
    }

    .category2 {
        position: absolute;
        right: 32px;
        bottom: 122px;
        z-index: 9;
    }

    .category3 {
        position: absolute;
        right: 32px;
        bottom: 62px;
        z-index: 9;
    }
    .animation {
        transition: all 2s;
    }
    .ltc{
        display: inline-block;
        width: 49%;
        height: 100%;
        border: 1px solid #000;
        /*background: url('./sub_static/compress_ltc.png') no-repeat;*/
        background-repeat: no-repeat;
        /*transition: all 2s;*/
    }

    .shl {
        display: inline-block;
        width: 49%;
        height: 100%;
        border: 1px solid #000;
        background-repeat: no-repeat;
      /*  transition: all 2s;*/
    }
    .ltc:after {
        position: absolute;
        content: '';
        width: 50%;
        height: 100%;
        top: 0;
        left: 50%;
        box-shadow:0 0 50px 30px #000000 inset;
    }

    .shl:after {
        position: absolute;
        content: '';
        width: 50%;
        height: 100%;
        top: 0;
        left: 0;
        box-shadow:0 0 50px 30px #000000 inset;
    }

    .zz .ltc{
        background-size: auto 122%;
        background-position: 50% 0%;
    }

    .zz .shl {
        background-size: auto 50%;
        background-position: center;
    }

    .yz .ltc{
        background-size: auto 220%;
        background-position: 50% 16%;
    }

    .yz .shl {
        background-size: auto 100%;
        background-position: center;
    }

    .gen .shl {
        background-size: auto 230%;
        background-position: 50% 73%;
    }

    .gen .ltc {
        background-size: auto 260%;
        background-position: 50% 33%;
    }


</style>
