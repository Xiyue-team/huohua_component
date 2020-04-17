<template>
    <div>
        <div class="mask" v-if="isShow"> loading... </div>
    </div>
</template>
<script>
import BufferLoader from '../assets/js/BufferLoader.js';
import Bus from '../assets/js/bus.js';
export default {
    data() {
        return {
            isOpen: false,
            isShow: true
        }
    },
    created() {
        this.audioCtx = null;
        this.soundList = [];
        this.gainNode = null;
        this.curSound = null;
        this.preSound = null;
    },
    mounted() {
        this.initSound();
        Bus.$on('changeSound', this.changeSound);
        Bus.$on('changeVolume', this.changeVolume);
        Bus.$on('openSound', this.openSound);
        const viewHandler = {
            pause: this.pauseVolume,
            resume: this.resumeVolume,
            destroy: this.destoryVolume
        }
        window.viewHandler = viewHandler;
        console.log(window);
    },
    methods: {
        resumeVolume() {
            this.audioCtx.resume();
        },
        pauseVolume() {
            this.audioCtx.suspend();
        },
        destoryVolume() {
            this.audioCtx.close();
        },
        initSound() {
            let thiz = this;
            let AudioContext = window.AudioContext || window.webkitAudioContext
            this.audioCtx = new AudioContext();
            let bufferLoader = new BufferLoader(this.audioCtx, [
                require('../assets/sounds/1.mp3'),
                require('../assets/sounds/2.mp3'),
                require('../assets/sounds/3.mp3'),
                require('../assets/sounds/4.mp3'),
                require('../assets/sounds/5.mp3'),
                require('../assets/sounds/6.mp3')
            ], finishedLoading);
            bufferLoader.load();

            function finishedLoading(bufferList) {
                thiz.gainNode = thiz.audioCtx.createGain();
                for (let i = 0; i < bufferList.length; i++) {
                    thiz.soundList[i] = thiz.audioCtx.createBufferSource();
                    thiz.soundList[i].buffer = bufferList[i];
                    thiz.soundList[i].loop = true;
                    // thiz.soundList[i].start(0);
                }
                thiz.gainNode.connect(thiz.audioCtx.destination);
                thiz.preSound = thiz.curSound = thiz.soundList[2];
                thiz.changeVolume(100);
                thiz.isShow = false;
                Bus.$emit('hiddenTip');
            }
        },
        changeVolume(value) {
            value = 0.9 * (value - 50) + 10;
            this.gainNode.gain.value = value / 100;
        },
        changeSound(value) {
            this.isOpen && this.preSound.disconnect(this.gainNode);
            this.curSound = this.preSound = this.soundList[value];
            if (this.isOpen) {
                if (!this.curSound.isStart) {
                    this.curSound.start(0);
                    this.curSound.isStart = true;
                }
                this.curSound.connect(this.gainNode);
            }
        },
        openSound(bool, isReset) {
            this.isOpen = bool;
            if (bool) {
                if (!this.curSound.isStart) {
                    this.curSound.start(0);
                    this.curSound.isStart = true;
                }
                this.curSound.connect(this.gainNode);
            } else {
                isReset && this.curSound.disconnect(this.gainNode);
            }
        }
    },
    beforeDestroy() {
        this.curSound.disconnect(this.gainNode);
    },
    destroyed() {
        // this.openSound(false, true);
        this.curSound.disconnect(this.gainNode);
    }
}

</script>
<style scoped>
div.mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
}

</style>
