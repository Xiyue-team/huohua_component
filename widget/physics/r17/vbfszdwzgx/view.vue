<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">探究<span style="font-family: 'Times New Roman'; font-style: italic">B、V、F</span>三者的位置关系</div>
                    <div id="3dContainer" style="width: 100%;height: 100%;" v-bind:class="{'isActived': isMobile}" v-show="backgroundControl">
                    </div>
                <div style="width: 100%;height: 100%; display: flex; justify-content: center; align-items: center;" v-show="backgroundControl2" >
                    <div id="3dContainer1" style="width: 400px;height: 400px; margin-right:  300px;"></div>
                    <div id="3dContainer2" style="width: 400px;height: 400px; margin-left: 300px"></div>
                </div>

            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">
                    <div class="buttonP1" v-bind:class="{'buttonP1_Mobile': isMobile}" v-show="isShowControl">

                        <div @click="magnetic">
                            <buttonPrimary class="buttonP2" v-bind:title="newTitle1" type="ellipse" v-bind:actived="color1" v-bind:disabled="isdisabled1">
                            </buttonPrimary>
                        </div>

                        <div @click="speed">
                            <buttonPrimary class="buttonP2" v-bind:title="newTitle2" type="ellipse" v-bind:actived="color2" v-bind:disabled="isdisabled2">
                            </buttonPrimary>
                        </div>

                        <div @click="force">
                            <buttonPrimary class="buttonP2" v-bind:title="newTitle3" type="ellipse" v-bind:actived="color3" v-bind:disabled="isdisabled3">
                            </buttonPrimary>
                        </div>

                        <div @click="archive" id="createImageData">
                            <buttonPrimary class="buttonP2" v-bind:title="newTitle4" type="ellipse" v-bind:actived="color4" v-bind:disabled="isdisabled4">
                            </buttonPrimary>
                        </div>

                        <div @click="rotate">
                            <buttonPrimary class="buttonP2" v-bind:title="newTitle5" type="ellipse" v-bind:actived="color5" v-bind:disabled="isdisabled5">
                            </buttonPrimary>
                        </div>
                    </div>
                    <div class="buttonStyleFor3d" v-show="!isShowControl">
                        <div @click="animation()">
                            <buttonPrimary class="buttonP3" v-bind:title="newTitle6" type="ellipse" v-bind:actived="color6">
                            </buttonPrimary>
                        </div>

                    </div>
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

    .buttonP1{
        
        position: absolute;
        width: 88px;
        bottom: 48px;
        right: 0px ;

    }

    .buttonP1_Mobile {
        bottom: 24px;
        right: 24px;
    }

    .buttonP2 {
        margin-top: 12px;
        float: right;
        width: 88px;
        height: 42px;
    }

    .buttonP3 {
        margin-top: 12px;
        float: right;
    }

    .isActived {
        transform: scale(0.9, 0.9);
        transform-origin: 50% 50%;
    }

    .buttonStyleFor3d {
        /*background: #000;*/
        width: 120px;
        height: 66px;
        position: absolute;
        bottom: 36px;
        right: 0px;
    }


</style>
