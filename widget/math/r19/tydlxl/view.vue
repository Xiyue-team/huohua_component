<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">椭圆的离心率</div>
                <div style="position: absolute">
                    <div class="formula">
                        <img src="./sub_static/formula.png" v-show="showFormula" style="width: 120px; height: 33px" ondragstart='return false;'/>
                    </div>
                    <div class="quotient">
                        <img src="./sub_static/table.png" style="width: 141px; height: 133px" ondragstart='return false;'/>
                    </div>
                    <div>
                        <span class="displayE">{{displayE}}</span>
                    </div>
                    <div>
                        <span class="displayK">{{displayK}}</span>
                    </div>
                </div>
                <div id="3dContainer" style="width: 100%;height: 100%;">

                </div>
                <div @click="formula">
                    <buttonPrimary class="buttonP2" v-bind:title="newTitle" type="ellipse" v-bind:actived="color">
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
  import { ViewModel } from './ViewModel';
  import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';

  @Component({
    components: {
        fullScreensLayout,
        buttonPrimary
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

    .buttonP2 {
        position: absolute;
        width: 100px;
        height: 44px;
        bottom: 48px;
        right: 24px;
        font-size: 18px;
    }

    .formula {
        width: 120px;
        height: 33px;
        position: relative;
        margin-left: 24px;
        margin-top: 84px
    }

    .quotient {
        width: 141px;
        height: 133px;
        position: relative;
        margin-left: 24px;
        margin-top: 27px;
    }

    .displayE {
        background-color: #fff;
        font-size: 18px;
        position: absolute;
        margin-left: 117px;
        margin-top: -84px
    }

    .displayK {
        background-color: #fff;
        font-size: 18px;
        position: absolute;
        margin-left: 117px;
        margin-top: -34px
    }

</style>

