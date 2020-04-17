<template>
    <div>
        <keyFrameAnimation v-bind="frameOption" ref="animationFrame" style="width: 100%;height: 100%"></keyFrameAnimation>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import keyFrameAnimation from "../../../../src/component/layout/keyFrameAnimation.vue";

    export default Vue.extend({
        components : {
            keyFrameAnimation
        },
        data() {
            return {
                frameOption : {
                    imageArray  : [],
                    timeLine : [0,20,40,99],
                    label: ['点1','点2','点3','点4'],
                    total : 0,
                    showSlider: true,
                },
            };
        },
        created() {
        },
        mounted() {
            for (let i = 0; i < 100; i++) {
                const img1 = require(`./sub_static/png/${i + 1}.png`);
                this.frameOption.imageArray.push(img1);
            }
            this.frameOption.total = this.frameOption.imageArray.length;
        },
        methods: {

        },
        watch: {
        }
    });
</script>
