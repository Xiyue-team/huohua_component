<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">直线的参数方程</div>
                <div class="box">
                    <div class="sliderBox" >
                        <div class="textTip" :style="{zoom:zoom1}">α</div>
                        <vue-slider class="vueSlider" v-model="value" v-bind="sliderOption" ></vue-slider>
                    </div>
                    <div :class="{btn:have,blueColor:ishave}"  @click="clickbutton" :style="{zoom:zoom1}">参数方程</div>
                    <div class="image" v-if="ishave" :style="{zoom:zoom1}"><img src="./sub_static/UI/1.png" style="width: 100%;height: 100%"></div>
                </div>
                <div id="3dContainer" class="Container"></div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
  import '../../../../src/assets/css/core.css';
  import '../../../../src/assets/css/layout.css';
  import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
  import Component from 'vue-class-component';
  import { MainVueComponent } from './mainVueComponent.ts';
  import vueSlider from 'vue-slider-component/dist-css/vue-slider-component.common.js';
  import 'vue-slider-component/dist-css/vue-slider-component.css';
  import 'vue-slider-component/theme/default.css';

  @Component({
    components: {
      fullScreensLayout,
      vueSlider
    }
  })
  export default class App extends MainVueComponent {
  }
</script>

<style scoped="scoped">
    * {
        margin: 0;
        padding: 0;
    }

    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    ul, ol, li {
        list-style: none;
    }

    .title_text {
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
        font-family: SourceHanSansSC-Medium;
        font-size: 28px;
        color: #FFFFFF;
        line-height: 24px;
    }
    .box{
        position: absolute;
        width: 230px;
        height: 380px;
        top: 40%;
        right: 4vw;
        /*display: flex;*/
        /*flex-direction: row;*/
    }
    .sliderBox {
        position: absolute;
        width: 230px;
        height: 50px !important;
        z-index: 99;
        display: flex;
        align-items: center;
    }
    .btn{
        width:104px ;
        height: 42px;
        position: absolute;
        right: 0;
        top: 15%;
        background:#EBEBEB ;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 21px ;
        font-family: SourceHanSansSC-Medium;
        font-size: 16px;
        color: #525252;
    }
    .blueColor{
        background:#0291FF ;
        color: #F9FFFF;
    }
    .image{
        width: 216px;
        height: 235px;
        position: absolute;
        right: 0;
        top: 30%;
    }
    .textTip {
        width: 13px;
        height: 26px;
        font-style: italic;
        line-height: 26px;
        font-family: TimesNewRomanPS-ItalicMT;
        font-size: 24px;
        color: #FFFFFF;
        position: absolute;
        top: 0;
        right: 220px;
        bottom: 0;
        margin: auto;
    }

    .sliderBox .vueSlider {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
    /*适配各种设备*/
    @media ( max-height: 376px) {
        .box{
            top: 30%;
        }
        .image{
            top: 25%;
        }
    }

</style>
