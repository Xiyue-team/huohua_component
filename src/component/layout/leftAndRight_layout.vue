<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <div class="control-panel_div_rt" v-bind:class="widthClass" style="height: 100%;">
            <slot name="controlPanel">
                <div id="controlPanel">
                </div>
            </slot>
        </div>
        <div  class="control-panel_div_content">
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

    export default Vue.extend({
        props: {
            widthClass: {
                type: [String],
                default: ''
            },
        },

        components: {

        },
        name: 'leftAndRightLayout',

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
    body {
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
