<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <vue-slider class="vueSlider"
                            v-model="value"
                            v-bind="sliderOption"></vue-slider>
                <img class="formulaBox" :src = "formula">
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
    import {MainVueComponent} from './mainVueComponent';
    import vueSlider from 'vue-slider-component/dist-css/vue-slider-component.common.js';
    import 'vue-slider-component/dist-css/vue-slider-component.css';
    import 'vue-slider-component/theme/default.css';

    @Component({
        components: {
            fullScreensLayout, vueSlider
        },
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
        font-size: 24px;
        color: #FFF;
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
    }
    .vueSlider {
        position: absolute;
        right: 100px;
        top: 500px;
        z-index: 99;
    }
    .formulaBox {
        width: 90px;
        position: absolute;
        right: 250px;
        top: 450px;

    }
    @media (max-height: 1200px) and (min-height: 800px){
        .formulaBox {
            top: 412px;
        }
        .vueSlider {
            top: 480px;
        }
    }
    @media (max-height: 800px) and (min-height: 700px){
        .formulaBox {
            right: 180px;
            top: 244px;
        }
        .vueSlider {
            right: 30px;
            top: 312px;
        }
    }
    @media (max-height: 700px) and (min-height: 695px){
        .formulaBox {
            right: 170px;
            top: 220px;
        }
        .vueSlider {
            right: 30px;
            top: 290px;
        }
    }
    @media (max-height: 695px) and (min-height: 600px){
        .formulaBox {
            right: 180px;
            top: 244px;
        }
        .vueSlider {
            right: 30px;
            top: 312px;
        }
    }
    @media (max-height: 600px) and (min-height: 454px){
        .formulaBox {
            width: 66px;
            right: 119px;
            top: 177px;
        }
        .vueSlider {
            right: 30px;
            top: 228px;
        }
    }
    @media (max-height: 450px) {
        .formulaBox {
            width: 70px;
            right: 105px;
            top: 90px;
        }
        .vueSlider {
            right: 30px;
            top: 145px;
        }
    }

</style>
