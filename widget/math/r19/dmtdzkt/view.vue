<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" scope="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">多面体的展开图</span>
                <div style="width: 100%; height: 100%; display: flex">
                    <div  id="3dContainer" style="margin: auto;width: 100%;height: 100%">

                    </div>

                    <div style="width: 208px; height: 48px; position: absolute; left: 0; right: 0; bottom: 32px; margin: auto;">
                        <div class="buttonImage" style="position: absolute; width: 48px; height: 100%" @click="lengZhuImageEvent">
                            <img src="./sub_static/lengZhuImage1.png" style="position: absolute; width: 100%" v-show="showButton !== 1"/>
                            <img src="./sub_static/lengZhuImage2.png" style="position: absolute; width: 100%" v-show="showButton === 1"/>
                        </div>

                        <div class="buttonImage" style="position: absolute; width: 48px; height: 100%; left: 0; right: 0; margin: auto" @click="lengZhuiImageEvent">
                            <img src="./sub_static/lengZhuiImage1.png" style="position: absolute; width: 100%" v-show="showButton !== 2"/>
                            <img src="./sub_static/lengZhuiImage2.png" style="position: absolute; width: 100%" v-show="showButton === 2"/>
                        </div>

                        <div class="buttonImage" style="position: absolute; width: 48px; height: 100%; right: 0;" @click="lengTaiImageEvent">
                            <img src="./sub_static/lengTaiImage1.png" style="position: absolute; width: 100%" v-show="showButton !== 3"/>
                            <img src="./sub_static/lengTaiImage2.png" style="position: absolute; width: 100%" v-show="showButton === 3"/>
                        </div>
                    </div>
                </div>
            </template>
            <template slot="controlPanel" scope="viewBox" slot-scope="controlPanel">

            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import h_button from '../../../../src/component/ui/buttonEllipse.vue';
    import Component from 'vue-class-component';
    import { ViewModel } from './ViewModel';

    @Component({
      components: {
        h_button,
        fullScreensLayout,
      },
      mixins: [ViewModel]
    })
    export default class App extends Vue {}
</script>

<style scoped="scoped">
    body{
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }

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

    .buttonImage:hover {
        cursor: pointer;
    }
</style>
