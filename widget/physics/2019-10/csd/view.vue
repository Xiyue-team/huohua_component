<template>
    <div class="aspectration bgc root_div_container" data-ratio="16:9">
        <div  class="control-panel_div_content fill_parent">
            <div class="title">{{title}}</div>
            <div id="2dContainer" class="container">
                <canvas id="canvas"></canvas>
            </div>
            <div class="buttons">
                <div>
                    <button :class="{'button': true, 'event_disabled': leftButtonDisabled}" @click="movePole(1)">{{leftButton}}</button>
                </div>
                <div>
                    <button :class="{'button': true, 'event_disabled': rightButtonDisabled}" @click="movePole(2)">{{rightButton}}</button>
                </div>
                <div>
                    <button class="button" @click="movePole(3)">{{upDownButton}}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import Component from 'vue-class-component';
    import { ViewModel } from './ViewModel';

    @Component({
        components: {
            fullScreensLayout
        },
        mixins: [ViewModel]
    })
    export default class App extends Vue {}
</script>
<style scoped>
    .title{
        font-size: 24px;
        color: #FFFFFF;
        line-height: 40px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 20px;
        left: 24px;
    }
    .container {
        width: 100%;
        height: 100%;
    }
    .bgc {
        background: #3D4245;
        background-image: radial-gradient(50% 93%, rgba(255,255,255,0.21) 0%, rgba(0,0,0,0.00) 94%);
    }
    .buttons {
        position: absolute;
        right: 24px;
        top: 50%;
        margin-top: -93px;
        z-index: 98;
        text-align: center;
        
    }
    .button {
        border-radius: 21px;
        margin: 11px 0;
    }
</style>