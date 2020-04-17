<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" scope="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">面动成体</span>
                <div style="width: 100%; height: 100%; display: flex">
                    <div  id="3dContainer" style="margin: auto;width: 100%;height: 100%">

                    </div>
                    <div style="position: absolute; z-index: 2; width: 16.8%; height: 4.3%; top: 41.7%; right: 41.5%;" v-show="showGuideLine">
                        <img style="width: 100%" src="./sub_static/guideLine2.png"/>
                    </div>

                    <div style="position: absolute; z-index: 2; width: 16.5%; height: 9.7%; top: 54.7%; right: 41.5%;" v-show="showGuideLine">
                        <img style="width: 100%" src="./sub_static/guideLine3.png"/>
                    </div>
                </div>
            </template>
            <template slot="controlPanel" scope="viewBox" slot-scope="controlPanel">

            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import Component from 'vue-class-component';
    import {MainVueComponent} from "./mainVueComponent.ts";
    import Vue from 'vue';

    @Component({
        components: {
            fullScreensLayout
        },

        mixins: [MainVueComponent]
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

</style>
