<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" scope="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">四棱台</span>
                <div style="width: 100%; height: 100%; display: flex">
                    <div  id="3dContainer" style="margin: auto;width: 100%;height: 100%">

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
    import {ViewController} from '../../../../src/core/ViewController';
    import h_button from '../../../../src/component/ui/button.vue';
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import {FourPrismViewHandler} from './services/FourPrismViewHandler';
    import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
    import {ViewOption} from '../../../../src/core/CoreInterface';

    export default Vue.extend({
        components: {
            vueSlider,
            h_button,
            fullScreensLayout,
        },
        data() {
            return{

            };
        },
        computed: {
        },
        created() {
            const viewOption = new ViewOption();
            viewOption.showMobileExpandIco = false;
            ViewController.getInstance(new FourPrismViewHandler(this), viewOption);
            ViewController.getInstance().viewHandler.beforeRenderElement();
        },
        mounted() {
            ViewController.getInstance().domReady();
        },
        methods: {
            resetEvent() {
                (ViewController.getInstance().viewHandler as FourPrismViewHandler).FourPrism.reset();
            },
        },
        watch: {

        }
    });
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
