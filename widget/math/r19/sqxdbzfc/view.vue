<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">双曲线的标准方程</div>
                <div @click="xAxis">
                        <buttonPrimary class="buttonXAxis" v-bind:title="XAxisTitle" type="ellipse" v-bind:actived="XAxiscolor">
                        </buttonPrimary>
                        <div style="position: absolute; left: 30px; top: 162px;" id="leftFormula">
                            <img src="./sub_static/formula1.png" style="width: 122px; height: 66px"/>
                        </div>
                </div>  

                <div @click="yAxis">
                        <buttonPrimary class="buttonYAxis" v-bind:title="YAxisTitle" type="ellipse" v-bind:actived="YAxiscolor">
                        </buttonPrimary>
                    <div style="position: absolute; right: 24px; top: 162px; opacity: 0.3" id="rightFormula">
                        <img src="./sub_static/formula2.png" style="width: 122px; height: 66px"/>
                    </div>
                </div>
                <div id="3dContainer" style="width: 100%;height: 100%;">

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

    .buttonXAxis {
        position: absolute;
        width: 130px;
        top: 96px;
        left: 24px;
        font-size: 18px;
    }

    .buttonYAxis {
        position: absolute;
        width: 130px;
        top: 96px;
        right: 24px;
        font-size: 18px;
    }

</style>

