<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">特殊函数构造及其求导</div>
                <div id="3dContainer" style="width: 100%; height: 100%;">

                </div>
                    <!--<div class="sub_title">原函数</div>-->
                    <div @click="derivationOneEvent()" v-show="derivationOne">
                        <buttonPrimary class="initialFormulaOneButton" v-bind:title="derivationTitle" type="ellipse" v-bind:actived="derivationOneColor">
                        </buttonPrimary>
                    </div>

                    <div @click="derivationTwoEvent()" v-show="derivationTwo">
                        <buttonPrimary class="initialFormulaTwoButton" v-bind:title="derivationTitle" type="ellipse" v-bind:actived="derivationTwoColor">
                        </buttonPrimary>
                    </div>

                    <div @click="derivationThreeEvent()" v-show="derivationThree">
                        <buttonPrimary class="initialFormulaThreeButton" v-bind:title="derivationTitle" type="ellipse" v-bind:actived="derivationThreeColor">
                        </buttonPrimary>
                    </div>

                    <div @click="derivationFourEvent()" v-show="derivationFour">
                        <buttonPrimary class="initialFormulaFourButton" v-bind:title="derivationTitle" type="ellipse" v-bind:actived="derivationFourColor">
                        </buttonPrimary>
                    </div>

                    <div @click="derivationFiveEvent()" v-show="derivationFive">
                        <buttonPrimary class="initialFormulaFiveButton" v-bind:title="derivationTitle" type="ellipse" v-bind:actived="derivationFiveColor">
                        </buttonPrimary>
                    </div>

                    <div @click="derivationSixEvent()" v-show="derivationSix">
                        <buttonPrimary class="initialFormulaSixButton" v-bind:title="derivationTitle" type="ellipse" v-bind:actived="derivationSixColor">
                        </buttonPrimary>
                    </div>

                    <div  @click="checkImageOneEvent()" v-show="checkImageOne">
                        <buttonPrimary class="checkImageOneButton" v-bind:title="formulaTitle" type="ellipse" v-bind:actived="FormulaOneColor">
                        </buttonPrimary>
                    </div>

                    <div @click="checkImageTwoEvent()" v-show="checkImageTwo">
                        <buttonPrimary class="checkImageTwoButton" v-bind:title="formulaTitle" type="ellipse" v-bind:actived="FormulaTwoColor">
                        </buttonPrimary>
                    </div>

                    <div @click="checkImageThreeEvent()" v-show="checkImageThree">
                        <buttonPrimary class="checkImageThreeButton" v-bind:title="formulaTitle" type="ellipse" v-bind:actived="FormulaThreeColor">
                        </buttonPrimary>
                    </div>

                    <div @click="checkImageFourEvent()" v-show="checkImageFour">
                        <buttonPrimary class="checkImageFourButton" v-bind:title="formulaTitle" type="ellipse" v-bind:actived="FormulaFourColor">
                        </buttonPrimary>
                    </div>

                    <div @click="checkImageFiveEvent()" v-show="checkImageFive">
                        <buttonPrimary class="checkImageFiveButton" v-bind:title="formulaTitle" type="ellipse" v-bind:actived="FormulaFiveColor">
                        </buttonPrimary>
                    </div>

                    <div @click="checkImageSixEvent()" v-show="checkImageSix">
                        <buttonPrimary class="checkImageSixButton" v-bind:title="formulaTitle" type="ellipse" v-bind:actived="FormulaSixColor">
                        </buttonPrimary>
                    </div>

                    <div @click="returnEvent()" v-show="showReturn">
                        <buttonPrimary class="returnButton" v-bind:title="returnTitle" type="ellipse">
                        </buttonPrimary>
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
  import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';

  @Component({
    components: {
       fullScreensLayout,
       buttonPrimary
    },
    mixins: [MainVueComponent]
  })
  export default class App extends Vue {}
</script>

<style scoped="scoped">
    body {
        overflow: hidden !important;
    }

    .title_text {
        font-size: 24px;
        line-height: 24px;
        color: #000;
        position: absolute;
        top:24px;
        left:24px;
        z-index: 3;
    }

    .initialFormulaOneButton {
        position: absolute;
        top: 19.3%;
        left: 43.2%;
    }

    .initialFormulaTwoButton {
        position: absolute;
        top: 30.9%;
        left: 43.2%;
    }

    .initialFormulaThreeButton {
        position: absolute;
        top: 42.5%;
        left: 43.2%;
    }

    .initialFormulaFourButton {
        position: absolute;
        top: 54.5%;
        left: 43.2%;
    }

    .initialFormulaFiveButton {
        position: absolute;
        top: 65.8%;
        left: 43.2%;
    }

    .initialFormulaSixButton {
        position: absolute;
        top: 77.4%;
        left: 43.2%;
    }

    .checkImageOneButton {
        position: absolute;
        top: 19.3%;
        left: 83.2%;
    }

    .checkImageTwoButton {
        position: absolute;
        top: 30.9%;
        left: 83.2%;
    }

    .checkImageThreeButton {
        position: absolute;
        top: 42.5%;
        left: 83.2%;
    }

    .checkImageFourButton {
        position: absolute;
        top: 54.5%;
        left: 83.2%;
    }

    .checkImageFiveButton {
        position: absolute;
        top: 65.8%;
        left: 83.2%;
    }

    .checkImageSixButton {
        position: absolute;
        top: 77.4%;
        left: 83.2%;
    }

    .returnButton {
        position: absolute;
        bottom: 4.7%;
        right: 2.4%;
    }

</style>
