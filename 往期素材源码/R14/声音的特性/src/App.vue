<template>
    <div id="app">
        <h3 class="title" @click="play(sound)">{{title}}</h3>
        <modify-device @isLandscape="changeLandscape"></modify-device>
        <render-canvas></render-canvas>
        <sound></sound>
        <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    </div>
</template>
<script>
import uiBtn from './components/UI/uiBtn.vue'
import modifyDevice from './components/modifyDevice.vue'
import renderCanvas from './components/renderCanvas.vue'
import sound from './components/sound.vue'
import Bus from './assets/js/bus.js'
export default {
    name: 'App',
    components: {
        modifyDevice,
        renderCanvas,
        sound,
        uiBtn
    },
    data() {
        return {
            title: '声音的特性',
            isLandscape: true
        }
    },
    created() {
        document.onselectstart = function() {
            return false;
        };
        document.title = this.title;
    },
    mounted() {},
    methods: {
        reset() {
            Bus.$emit('reset');
        },
        changeLandscape(bool) {
            this.isLandscape = bool;
        }
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

</style>
