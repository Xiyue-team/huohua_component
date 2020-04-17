<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <meta name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span class="title_style">酶的抑制剂</span>
                <div id="3dContainer" class="Container">
                    <button id="right1" v-bind:class="{ btnctrl: isBtnctrl, active: isActive }" @click="btnEvent_1">
                        正常反应
                    </button>
                    <button id="right2" v-bind:class="{ btnctrl: isBtnctrl, active1: isActive1 }" @click="btnEvent_2">
                        竞争性抑制剂
                    </button>
                    <div v-bind:class="{ act: isA }" id="textImg">
                        <div id="text1">
                            竞争性抑制剂与反应中心结合,减少酶与底物的作用机会
                        </div>
                    </div>
                    <button id="right3" v-bind:class="{ btnctrl: isBtnctrl, active2: isActive2 }" @click="btnEvent_3">
                        非竞争性抑制剂
                    </button>
                    <div v-bind:class="{ act1: isA1 }" id="textImg1">
                        <div id="text2">
                            非竞争性抑制剂与酶活性中心以外的位点结合,导致酶不显活性
                        </div>
                    </div>
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
  import './sub_static/assets/css/style.css';
  import Component from 'vue-class-component';
  import { MainVueComponent } from './mainVueComponent';

  @Component({
    components: { fullScreensLayout },
    mixins: [MainVueComponent]
  })

  export default class App extends Vue {
  }
</script>

<style scoped="scoped">

</style>
