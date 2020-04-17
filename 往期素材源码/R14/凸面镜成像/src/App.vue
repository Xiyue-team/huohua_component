<template>
    <div id="app">
        <h3 class="title">凸面镜成像</h3>
        <modify-device></modify-device>
        <render-canvas></render-canvas>
    </div>
</template>
<script>
import modifyDevice from './components/modifyDevice.vue'
import renderCanvas from './components/renderCanvas.vue'
export default {
    name: 'App',
    components: {
        modifyDevice,
        renderCanvas
    },
    data() {
        return {}
    },
    created() {

    },
    mounted() {
        document.onselectstart = function() {
            return false;
        };
    },
    methods: {

    }
}

</script>
<style>
#app {
    font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
}
.title {
    color: #FFFFFF
}

</style>
