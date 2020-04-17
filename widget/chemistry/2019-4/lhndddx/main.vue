<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title">氯化钠的导电性</div>
                <div id="3dContainer" class="Container">

                </div>
                <div id="anniu">
                    <button class="but1" @click="changeEvent(0)" :class="{active: active1}">NaCl固体</button>
                    <button class="but2" @click="changeEvent(1)" :class="{active: active2}">NaCl溶液</button>
                    <button class="but3" @click="changeEvent(2)" :class="{active: active3}">熔融态NaCl</button>
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import Component from 'vue-class-component';
    import {MainVueComponent} from './mainVueComponent';

    @Component({
        components: { fullScreensLayout, },
    })
    export default class App extends MainVueComponent {
    }
</script>

<style scoped="scoped">
    * {
        margin: 0;
        padding: 0;
    }

    body {
        overflow: hidden !important;
    }

    #title {
        position: absolute;
        left: 3%;
        top: 4%;
        font-size: 24px;
        color: #000000;
    }

    #anniu {
        position: absolute;
        bottom: 5%;
        right: 3%;
        width: 116px;
        height: 168px;
    }

    .but1,
    .but2,
    .but3 {
        height: 40px;
        width: 100px;
        border-radius: 21px;
        border: 1px solid rgba(0,0,0,0.12);
        color: #000000;
        background: #FFFFFF;
        margin: 8px;
        pointer-events: auto;
    }

    .active {
        color: #FFFFFF;
        background-color: #0199FF;
        pointer-events: none;
    }
</style>
