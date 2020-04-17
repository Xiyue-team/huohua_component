<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="3dContainer" style="width: 100%;height: 100%; ">
                </div>
                <div class="buttonDiv" v-bind:class="{'buttonDivMobile': isMobile, 'buttonDivElectron': isElectron}">
                    <buttonPrimary class="button2"  type="ellipse" v-bind:title="buttonTitle1" v-bind:actived="isActive1" @click.native='button1'>
                    </buttonPrimary>
                    <buttonPrimary class="button1"  type="ellipse" v-bind:title="buttonTitle2" v-bind:actived= "isActive2" @click.native='button2'>
                    </buttonPrimary>
                </div>

                <div class="sliderBackground" v-bind:class="{'sliderBackgroundMoblie': isMobile, 'sliderBackgroundElectron': isElectron}">
                    <span style="position: absolute; top: 17px;left: 5px">弱</span>
                    <vue-slider ref="slider1th" v-model="slidernumber" v-bind="sliderOption" class="siliderStyle" v-bind:class="{'sliderStyleMobile': isMobile, 'sliderStyleElectron': isElectron}">
                        <template slot="tooltip" scope="tooltip">
                            <div v-if="false" class="custom-tooltip">
                            </div>
                        </template>
                    </vue-slider>
                    <span style="position: absolute; top: 17px;right: 5px">强</span>
                </div>
                <div class="title_text">总光合、净光合与呼吸速率</div>
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
  import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';
  import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
  @Component({
    components: {
        fullScreensLayout, buttonPrimary, vueSlider
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

    .button1 {
        width: 95px;
        height: 38px;
        position: absolute;
        top: 0px;
        left: 166px;
    }

    .button2 {
        width: 126px;
        height: 38px;
        position: absolute;
        top: 0px;
        left: 0px;
    }

    .buttonDiv {
        width: 258px;
        height: 38px;
        position: absolute;
        top: 25%;
        left: 25%;
    }

    .buttonDivMobile {
        width: 129px;
        height: 19px;
        position: absolute;
        top: 20%;
        left: 15%;
    }

    .buttonDivElectron {
        width: 129px;
        height: 19px;
        position: absolute;
        top: 20%;
        left: 15%;
    }

    .siliderStyle {
        position: absolute;
        top: calc(50% - 8px);
        left: calc(50% - 208px)
    }

    .sliderStyleMobile {
        position: absolute;
        top: calc(50% - 8px);
        left: calc(50% - 104px)
    }

    .sliderStyleElectron {
        position: absolute;
        top: calc(50% - 8px);
        left: calc(50% - 208px)
    }

    .sliderBackground {
        width: 497px;
        height: 60px;
        background: rgba(69,69,69,0.84);
        border: 1px solid rgba(151,151,151,0.20);
        border-radius: 8px;
        position: absolute;
        bottom: 25%;
        right: 13%;
    }


    .sliderBackgroundElectron {
        bottom: 15%;
        right: 1%;
    }

    .sliderBackgroundMoblie {
        width: 275px;
        height: 60px;
        background: rgba(69,69,69,0.84);
        border: 1px solid rgba(151,151,151,0.20);
        border-radius: 8px;
        position: absolute;
        bottom: 15%;
        right: 15%;
    }
    .sliderBackground > span {
        font-size: 18px;
        color: #FFFFFF;
    }

</style>
