<template>
    <div class="aspectration bg_white root_div_container" >
        <div  class="control-panel_div_content fill_parent">
            <div class="control-panel_div_floatRight" style="height: 100%;">
                <slot name="controlPanel">
                    <div id="controlPanel">
                    </div>
                </slot>
            </div>
            <div class='view_div_content' style='background-color: white;' data-ratio='1:1'>
                <slot name="viewBox">
                    <div id="3dContainer" ></div>
                </slot>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import '../../../src/assets/css/core.css';
    import '../../../src/assets/css/layout.css';
    import '../../../src/assets/css/ui.css';
    export default Vue.extend({
        components: {
        },
        name: 'fullScreensLayout',

        data() {
            return{

            };
        },
        created() {
        },
        mounted() {
        },
        methods: {

        },
        watch: {

        }
    });
</script>

<style scoped="scoped">
    body{
        overflow:hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;

    }
    .close_div_rt{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
    }



</style>
