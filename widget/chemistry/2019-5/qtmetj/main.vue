<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="title" class="title_text">{{title}}</div>
                <div id="3dContainer" class="Container"></div>
                <div class="checkBox">
                    <span style="display: inline-block;width: 100%; color: #fff;font-size: 21px;text-align: center;">{{text}}</span>
                    <div>
                        <label class="label-checkbox box1">
                            <input type="checkbox" name = "molecule" disabled v-model="list['0']" >
                            <span class="checkmark" @click="btnEvent('0')"></span>
                        </label>
                    </div>
                    <div>
                        <label class="label-checkbox box2">
                            <input type="checkbox" name = "molecule" disabled v-model="list['1']" >
                            <span class="checkmark" @click="btnEvent('1')"></span>
                        </label>
                    </div>
                    <div>
                        <label class="label-checkbox box3">
                            <input type="checkbox" name = "molecule" disabled v-model="list['2']" >
                            <span class="checkmark"  @click="btnEvent('2')"></span>
                        </label>
                    </div>
                </div>
                <img class="legend" src="./sub_static/UI/legend.png">
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
        components: {
            fullScreensLayout,
        },
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
        overflow-x: hidden;
        overflow-y: hidden;
    }

    ul, ol, li {
        list-style: none;
    }

    .title_text {
        font-size: 24px;
        color: #fff;
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 9;
    }
    .checkBox {
        z-index: 999;
        position: absolute;
        width: 150px;
        height: 200px;
        bottom: 100px;
        right: 85px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
        align-content: center;
    }
    .label-checkbox{
        height: 0;
        display: inline-block;
        margin-right: 0;
        padding-left: 0!important;
    }
    .checkmark{
        left: -50px!important;
    }
    .legend {
        position: absolute;
        width: 60px;
        height: auto;
        right: 100px;
        bottom: 60px;
    }
    @media (min-height: 450px) and (max-height: 550px) {
        .checkBox {
            transform: scale(0.7);
            bottom: 10px;
            right: 40px;
        }
        .legend {
            transform: scale(0.7);
            right: 65px;
            bottom: -13px;
        }
    }
    @media (max-height: 450px) {
        .checkBox {
            transform: scale(0.6);
            bottom: 10px;
            right: 40px;
        }
        .legend {
            transform: scale(0.6);
            right: 65px;
            bottom: -9px;
        }
    }
</style>
